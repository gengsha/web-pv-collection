# 风格构成说明：六万粒子·流场引擎 (GPU Particle Field)

## 1. 风格概述 (Style DNA)

* **核心理念**：用最底层的绘制原语（`gl.POINTS`）画出一整片流场。每一个点都是一条独立轨迹，数万条轨迹叠加出的"流丝"才是真正的主视觉 —— 形态不是设计出来的，是解算出来的。
* **技术锚点**：CPU 端 JS 积分（非 GPGPU，GPU 只负责绘制）/ TypedArray 粒子池 / curl 噪声近似流场 / 叠加混合（additive）拖尾 / 光标涡旋力场 / 每帧 480KB `bufferSubData`。
* **视觉情绪**：星云、湍流、密度感、实验物理的浪漫。
* **适用场景**：数据可视化产品、AI 基础设施、性能型 SaaS、科学计算品牌。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --void: #06050e;      /* 深紫黑 */
  --void-2: #0c0a1c;
  --glass: rgba(16, 12, 34, .6);
  --line: rgba(170, 140, 255, .16);

  --magenta: #ff3ea5;   /* 高速粒子 */
  --cyan: #3ef0ff;      /* 低速粒子 */
  --violet: #8b5cff;
  --amber: #ffc46b;     /* 少量点缀 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **HUD / 正文 / 终端**：`JetBrains Mono`（数据必须是等宽的）。
* **标题 / 数值**：`Space Grotesk` 700，字距 `-.035em`，渐变剪裁。
* **色序即速度**：粒子按索引着色（青→紫→品红），让密度与色彩天然分层。

---

## 4. 核心技术规程 (Particle Pipeline)

```js
// ① 无散度流场（curl noise 的廉价近似）：两组正交三角函数构造角度场
const ang = (Math.sin(x * 2.6 + T * 0.35) * Math.cos(y * 2.6 - T * 0.28)) * 6.28318 * turb;
vx += Math.cos(ang) * 0.0008 * turb;
vy += Math.sin(ang) * 0.0008 * turb;

// ② 光标涡旋（切向力）+ 径向吸引/排斥
vx += -dy * fall * 0.0022;
vy +=  dx * fall * 0.0022;

// ③ 拖尾：整屏半透明黑覆盖，叠加混合让高密度区自然过曝
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
gl.uniform4f(u_col, 0.024, 0.020, 0.055, fade);   // fade: .10 快速 / .055 深档
// 粒子：
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.drawArrays(gl.POINTS, 0, N);
```

* **缓冲策略**：位置 `DYNAMIC_DRAW` + 每帧 `bufferSubData`；颜色 `STATIC_DRAW` 只在重建时上传。
* **两套着色器**：quad 程序负责拖尾覆盖，point 程序负责绘制（`gl_PointSize` 随 DPR 放大 1.4 倍）。
* **生命周期**：`life--`，归零或越界即原地重生，保持场密度恒定。
* **容量**：INSTANT 20,000 / DEEP 60,000；DPR 上限 1.5。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **涡旋场**：光标周围 0.10 半径内施加切向力，形成天然涡核。
* **按压吸引 / 右键排斥**：`mousedown` 记录 `force = -1 / +1`，`contextmenu` 已屏蔽。
* **三档滑块**：TURBULENCE（场强）、DAMPING（0.94–0.999 黏性）、POINT SIZE（1.0–4.0）。
* **规模切换**：重建粒子池时生命上限与拖尾衰减同步切换（深档尾迹更长更稠）。
* **HUD**：每 500ms 采样 FPS，实时显示粒子数。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| Canvas | `position: fixed` 全屏底层，粒子在内容之后流动 |
| HUD | sticky 顶栏：PARTICLES / FPS / FIELD / DRAW / BLEND |
| Hero | 注释式 kicker → 双行渐变标题 → 原理描述 → 双 CTA → 操作提示 |
| 能力矩阵 | 4 张毛玻璃卡 + 光标跟随的品红柔光 |
| 流场控制 | 左：INSTANT/DEEP 规模切换；右：三个场参数滑块；下：推理流面板 |
| 终端 | `field>` 提示符 + 消息流 |
| 评测 | 4 组数值 + 青→品红条 |
| Footer | 规模署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【GPU 粒子流场】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏 canvas 置底（position:fixed），WebGL1 上下文（alpha:false, depth:false, preserveDrawingBuffer:true），DPR 上限 1.5。
2. 粒子池用 Float32Array：interleaved 位置（DYNAMIC_DRAW，每帧 bufferSubData）、interleaved 速度、生命值、静态颜色缓冲。INSTANT 20,000 点 / DEEP 60,000 点。
3. 流场：curl 噪声近似 ang = sin(x*2.6 + t*0.35) * cos(y*2.6 - t*0.28) * 2π，加速度 0.0008；阻尼 0.985；光标 0.10 半径内加切向涡旋力，左键吸引、右键排斥。
4. 绘制：两套程序 —— quad 程序用 SRC_ALPHA/ONE_MINUS_SRC_ALPHA 刷半透明黑做拖尾（alpha .10/.055），point 程序用 SRC_ALPHA/ONE 叠加混合绘制 gl.POINTS。
5. UI：JetBrains Mono + Space Grotesk 700；sticky HUD 显示 PARTICLES/FPS；毛玻璃卡（blur 16px）浮于粒子之上；配色 #06050E 底 + 青 #3EF0FF / 品红 #FF3EA5 / 紫 #8B5CFF。内容板块：Hero、能力矩阵四卡、流场控制面板（规模切换 + 三滑块）、终端、评测、页脚。
```
