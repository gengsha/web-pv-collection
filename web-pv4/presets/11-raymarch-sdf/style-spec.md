# 风格构成说明：光线步进·SDF 解析雕塑 (SDF Raymarching)

## 1. 风格概述 (Style DNA)

* **核心理念**：整个页面没有任何网格模型。主视觉是一段全屏片元着色器 —— 每个像素沿视线反复试探一个**有符号距离函数（SDF）**，直到撞上距离的零点。几何由数学定义，精度由预算决定。
* **技术锚点**：WebGL1 全屏三角形 / GLSL 光线步进 / `smooth-min` 形体融合 / 中心差分法线 / 菲涅尔边缘光 / 步进预算可实时调节。
* **视觉情绪**：冷峻、精密、实验室级、带虹彩金属反射的深空雕塑。
* **适用场景**：图形/引擎公司官网、WebGL 作品集、技术品牌 Landing、GPU 产品页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --void: #05060a;      /* 深空底 */
  --void-2: #0a0d16;
  --glass: rgba(14, 18, 30, 0.62);

  --ice: #8fd4ff;        /* 冰蓝（INSTANT） */
  --cyan: #34e5ff;       /* 主强调 */
  --magenta: #ff5cf0;    /* 品红（DEEP） */
  --violet: #9b7cff;

  --text-hi: #eaf2ff;
  --text-dim: #8fa3c0;
  --text-muted: #5b6b85;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

* **全站等宽**：`JetBrains Mono`（HUD、正文、终端全用），仅在标题与数值上用 `Space Grotesk` 700。
* **HUD 语义**：`<i>` 为维度名（0.56rem，字距 .18em，全大写），`<b>` 为实时数值（青色加粗）。
* **虹彩标题**：多停靠点渐变 + `background-clip: text` + 7s 背景位移动画。

---

## 4. 核心技术规程 (Shader Pipeline)

```glsl
// ① 形体融合：smooth-min 让两个 SDF 长出"焊接"般的过渡
float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// ② 步进主循环：常量上界 + 动态 break（GLSL ES 1.0 要求循环边界为常量）
for (int i = 0; i < 192; i++) {
  if (float(i) >= u_steps) break;      // u_steps: 64 ←→ 192
  p = ro + rd * t;
  d = map(p);
  if (d < 0.0012 || t > 11.0) break;
  t += d;                               // 沿距离场安全推进
}

// ③ 法线：中心差分，ε = 0.0016
vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)));
}
```

* **渲染目标**：单个全屏三角形 `[-1,-1, 3,-1, -1,3]`（比 quad 少一次光栅化接缝）。
* **着色模型**：`漫反射 + 填充光 + 菲涅尔边缘（pow(1-dot(n,-rd),3)） + 镜面 pow(...,28) + 距离衰减`。
* **后处理**：`col/(1+col*0.55)` 色调映射 + 暗角 + CSS 扫描线叠加。
* **DPR 上限 1.5**：`steps × 像素` 达千万级，必须限制。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **步进预算切换**：INSTANT 64 步 / DEEP 192 步，`steps` 用插值平滑过渡（0.12/帧），HUD 实时显示步数与 `SDF CALLS`（百万次）。
* **拖拽旋转**：鼠标位移累加进 `u_rot`（0.006 rad/px），与自转叠加。
* **滚轮推拉**：`u_cam` 在 2.2–6.0 之间，改变透视强度。
* **Morph 滑块**：0→1 时形体从「盒 + 球」融合切换为「环面 + 八面体」融合，配色由冰蓝转向品红。
* **FPS 采样**：每 500ms 统计一次，写入 HUD。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| WebGL 画布 | `position: fixed` 全屏底层，内容以毛玻璃 HUD 悬浮其上 |
| HUD 条 | sticky 顶栏：RENDER / STEPS / FPS / SDF CALLS / GPU（取自 `WEBGL_debug_renderer_info`） |
| Hero | 着色器注释式 kicker → 双行标题（虹彩强调）→ 原理性描述 → 双 CTA → 操作提示 |
| 能力内核 | 4 张毛玻璃卡，左侧 2px 渐变竖条 |
| 步进控制台 | 左：两个模式按钮 + 自转/Morph 滑块；右：推理流 + 迷你 HUD |
| 着色器终端 | `glsl>` 提示符 + 消息流 |
| 评测 | 4 组数值 + 青→品红渐变条 |
| Footer | 技术署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【SDF 光线步进】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏 canvas 置于底层（position:fixed），用单个全屏三角形 [-1,-1,3,-1,-1,3] 驱动片元着色器；DPR 上限 1.5。
2. 片元着色器实现：smin 形体融合（k=0.32~0.55）、球体/圆角盒/环面/八面体 SDF、常量上界 192 的步进循环（用 uniform u_steps 动态 break）、中心差分法线（ε=0.0016）、菲涅尔边缘光、镜面高光、距离衰减、色调映射 col/(1+col*0.55)。
3. 交互：鼠标拖拽旋转（累加进 u_rot）、滚轮推拉相机（u_cam 2.2~6.0）、INSTANT(64 步)↔DEEP(192 步) 切换时步数与配色用插值过渡。
4. UI：全站 JetBrains Mono + Space Grotesk 700 标题；顶部 sticky HUD 条显示 STEPS / FPS / SDF CALLS / GPU 型号；毛玻璃卡片（backdrop-filter: blur(16px)）悬浮在画布之上。
5. 配色：深空 #05060A 底，冰蓝 #8FD4FF、青 #34E5FF、品红 #FF5CF0、紫 #9B7CFF。内容板块：Hero、能力矩阵四卡、步进预算控制台、着色器终端、评测、页脚。
```
