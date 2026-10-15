# 风格构成说明：反应扩散·Gray-Scott 培养皿 (Reaction-Diffusion)

## 1. 风格概述 (Style DNA)

* **核心理念**：页面中央是一片正在生长的化学培养基。没有一张图、没有一个关键帧 —— 屏幕上所有花纹都是两个偏微分方程在 GPU 上自我组织出来的结果。
* **技术锚点**：WebGL1 帧缓冲 ping-pong / 浮点纹理 / 9 点拉普拉斯 stencil / Gray-Scott 模型 / 手动双线性上采样。
* **视觉情绪**：科学、冷静、有机、显微视角下的生命感。
* **适用场景**：生物科技、材料科学、AI 研究机构、数据密集型产品、实验性品牌页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --deep: #04140f;      /* 培养皿暗底 */
  --deep-2: #071c16;
  --glass: rgba(8, 32, 26, .58);
  --line: rgba(80, 230, 190, .16);

  --cyto: #2fe0a8;      /* 菌落主体 */
  --mint: #9dfbd8;      /* 高浓度核心 */
  --teal: #1ba890;
  --spore: #d6ff5c;     /* 孢子点缀（HUD 数值） */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=IBM+Plex+Mono:wght@300;400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 数值**：`Sora` 700/800（几何无衬线，带科技感）。
* **正文 / HUD / 公式**：`IBM Plex Mono`，行高 `1.95`。
* **装饰**：把控制方程 `∂a/∂t = Dₐ∇²a − ab² + f(1−a)` 直接当作 Hero 的 kicker —— 公式即装饰。

---

## 4. 核心技术规程 (GPGPU Pipeline)

```glsl
// ① Gray-Scott 更新（片元着色器，逐像素 = 逐格点）
vec2 lap = vec2(0.0);
lap += S(uv + vec2(-1,0)*texel) * 0.2;   // 正交权重 0.2
lap += S(uv + vec2( 1,0)*texel) * 0.2;
lap += S(uv + vec2(0,-1)*texel) * 0.2;
lap += S(uv + vec2(0, 1)*texel) * 0.2;
lap += S(uv + vec2(-1,-1)*texel) * 0.05; // 对角权重 0.05（抑制各向异性）
lap += S(uv + vec2( 1,-1)*texel) * 0.05;
lap += S(uv + vec2(-1, 1)*texel) * 0.05;
lap += S(uv + vec2( 1, 1)*texel) * 0.05;
lap -= c;                                 // 权重和恰为 1.0

float abb = a * b * b;
na = a + (1.0 * lap.x - abb + f * (1.0 - a)) * dt;   // Da = 1.0
nb = b + (0.5 * lap.y + abb - (f + k) * b) * dt;     // Db = 0.5
```

* **Ping-pong**：两张 `SIZE²` 浮点纹理（RGBA，`.rg` 存 a/b），每帧迭代 N 次后交换，最后一次结果显示。
* **能力探测**：`OES_texture_float` → `OES_texture_half_float` → `UNSIGNED_BYTE`，并在 `checkFramebufferStatus` 失败时自动降级。
* **上采样**：浮点纹理只开 `NEAREST`，显示着色器里手写双线性插值（4 次采样 + `fract` 权重），保证任何设备都平滑。
* **接种**：`u_brush` 在半径内把 `(a,b)` 覆写为 `(0.35, 1.0)`，只在每帧第一次迭代生效。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **培养基切换**：Feed / Kill 用插值（0.05/帧）平滑过渡，形态会连续分岔而不是突变。
  - MITOSIS `f=0.0367 / k=0.0649`，4 次迭代
  - CORAL `f=0.0545 / k=0.0620`，20 次迭代
* **拖动接种**：在皿中按住拖动即播撒新菌落。
* **接种按钮**：重新生成随机种子（shader 内 `hash` 阈值 0.9962 的稀疏点 + 中心圆盘）。
* **HUD**：FEED / KILL 每 500ms 同步真实数值，ITER/FRAME 显示迭代次数。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 培养皿 | 全屏 canvas + CSS 观察环 + 噪点叠加层 |
| HUD | MODEL / GRID / ITER PER FRAME / FEED / KILL / FPS |
| Hero | 公式 kicker → 双行渐变标题 → 原理描述 → 双 CTA → 操作提示 |
| 四株菌 | 4 张毛玻璃卡，编号用孢子黄 |
| 培养参数 | 左：两个培养基预设 + Feed/Kill 滑块；右：推理流（模拟过程自述） |
| 实验记录 | `lab>` 提示符 + 观测流 |
| 评测 | 4 组数值 + 青→孢子黄条 |
| Footer | 培养皿编号 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Gray-Scott 反应扩散】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 两张 256² 浮点纹理做 ping-pong（OES_texture_float → half_float → UNSIGNED_BYTE 三级降级，checkFramebufferStatus 校验），NEAREST 过滤，CLAMP_TO_EDGE。
2. 模拟着色器：9 点拉普拉斯 stencil（正交 0.2、对角 0.05，权重和 1.0），Gray-Scott 更新 Da=1.0/Db=0.5/dt=1.0，u_brush 半径内把 (a,b) 覆写为 (0.35,1.0) 实现接种。
3. 显示着色器：手写双线性插值上采样，smoothstep(0.06,0.40,b) 映射到 深绿→青绿→奶白 三段色阶，叠加 pow(v,3) 与 pow(v,9) 高光，再做径向暗角。
4. 参数：MITOSIS f=0.0367/k=0.0649（4 次迭代），CORAL f=0.0545/k=0.0620（20 次迭代），切换时 f/k 用插值过渡；拖动鼠标接种。
5. UI：Sora 700/800 标题 + IBM Plex Mono 正文，Hero kicker 直接写控制方程；sticky HUD 显示 FEED/KILL/ITER/FPS；毛玻璃卡浮于培养皿之上；配色 #04140F 底 + 青绿 #2FE0A8 / 薄荷 #9DFBD8 / 孢子黄 #D6FF5C。
```
