# 风格构成说明：量子矢量·拓扑网阵 (Quantum Vector & Lorentz Matrix)

## 1. 风格概述 (Style DNA)
* **核心理念**：回到算法与数学本身的美感。页面背景是一条实时数值积分出来的洛伦兹吸引子 (Lorenz Attractor) 混沌轨迹，它绕 Y 轴缓慢自转，并拖着逐渐消隐的残影。前景是带坐标角标的直角线框卡片、方程式页眉和一个可以直接改写方程参数 σ 的滑块，让「可调的数学」成为页面的主角。
* **视觉情绪**：严密、理性、精密、冷静、混沌中的秩序。
* **适用场景**：量子计算 / 科学计算项目、数学与物理研究主页、密码学或算法团队、技术白皮书落地页。
* **构图法则**：容器为 `max-width: 1100px`。页眉两端对齐：左侧是 Ψ 符号加品牌名，右侧是等宽的洛伦兹方程式，底部用一条 `rgba(96,165,250,0.2)` 细线分隔。接着是居中的 Hero（方括号等宽标签、两行大标题，第二行为蓝→紫渐变字、灰色副文、胶囊形 σ 参数滑块条）。下面是三列直角矢量卡片，每张卡片顶部有紫色坐标、底部有虚线分隔的状态读数。最底层是全屏洛伦兹 Canvas。卡片全部为直角（无圆角），只有滑块条用胶囊圆角。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 运算底色 */
  --quantum-bg: #090a0f;                    /* 碳素黑 */
  --quantum-surface: rgba(15, 18, 28, 0.7); /* 卡片与滑块条底 */

  /* 矢量光轨色 */
  --quantum-blue: #60a5fa;    /* 超导银蓝：轨迹线、标签、读数、悬停描边 */
  --quantum-purple: #c084fc;  /* 纠缠紫：坐标角标、轨迹头部粒子、渐变终点 */
  --quantum-border: rgba(96, 165, 250, 0.2);

  /* 文本 */
  --text-white: #f8fafc;
  --text-dim: #94a3b8;
}

/* Canvas 用色：残影遮罩 rgba(9, 10, 15, 0.2)；轨迹 rgba(96, 165, 250, 0.4)；头部粒子 #c084fc */
/* 卡片悬停阴影：0 10px 30px rgba(96, 165, 250, 0.15)                                          */
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **全站字体**：`Plus Jakarta Sans`，开启抗锯齿。
* **主标题**：`3.6rem` / `800` / `line-height: 1.15` / `letter-spacing: -0.03em`，居中两行。第二行为渐变字：
  ```css
  .vector-gradient { background: linear-gradient(135deg, #60a5fa, #c084fc);
                     -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  ```
* **副文**：`1.05rem` / `line-height: 1.7` / `#94a3b8`，Hero 最大宽度 `780px`。
* **卡片**：标题 `1.25rem` / `700`；正文 `0.88rem` / `line-height: 1.6`。
* **数学与读数 (Mono)**：`JetBrains Mono` 用在以下位置：
  * Ψ 符号：`1.2rem`，银蓝色。
  * 方程式页眉：`0.75rem`，灰色，内容为 `dx/dt = σ(y - x) // dy/dt = x(ρ - z) - y`。
  * 方括号标签：`0.75rem`，`letter-spacing: 0.1em`，银蓝色，如 `[ TOPOLOGY & LOGIC // ORDER ]`。
  * 坐标角标：`0.72rem`，紫色，如 `[X: +14.28 // Y: -08.12]`，带正负号并补零。
  * 状态读数：`0.7rem`，银蓝色，如 `STATE: COHERENT`。
  * 滑块条：`0.8rem`，数值 `700`、固定宽 `40px`，保留一位小数。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **洛伦兹 Canvas**：`#lorenzCanvas` 全屏固定，`pointer-events: none; z-index: 0`，内容层放在 `z-index: 1`。每帧不清空画布，而是先叠一层 20% 透明度的底色作为残影遮罩，再画轨迹，这样轨迹会自然留下拖尾。
* **吸引子积分与投影 (main.js)**：用欧拉法积分，参数为 `σ = 10`（滑块可调）、`ρ = 28`、`β = 8/3`、`dt = 0.008`，每帧推进 4 步，最多保留 1200 个点，超出时移除最旧的点。投影时先绕 Y 轴旋转（z 先减去 25 以居中），缩放系数为 `min(w, h) / 45`，中心点向下偏移 30px。
  ```js
  const dx = sigma * (y - x) * dt;
  const dy = (x * (rho - z) - y) * dt;
  const dz = (x * y - beta * z) * dt;
  // 投影
  const rx = p.x * cosY - (p.z - 25) * sinY;
  const px = centerX + rx * scale, py = centerY - p.y * scale;
  // 绘制
  ctx.fillStyle = 'rgba(9, 10, 15, 0.2)'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)'; ctx.lineWidth = 1;   // 整条轨迹一笔 stroke
  ctx.fillStyle = '#c084fc'; ctx.arc(px, py, 3, 0, Math.PI * 2);     // 头部 3px 紫色粒子
  ```
* **矢量卡片 (Vector Card)**：半透明底、背景模糊、1px 蓝色细框、**无圆角**。网格为 `repeat(auto-fit, minmax(300px, 1fr))`，`gap: 28px`。
  ```css
  .vector-card {
    background: rgba(15, 18, 28, 0.7); backdrop-filter: blur(16px);
    border: 1px solid rgba(96, 165, 250, 0.2); padding: 32px 28px; position: relative;
    transition: transform 0.3s, border-color 0.3s;
  }
  .vector-card:hover { transform: translateY(-4px); border-color: #60a5fa;
                       box-shadow: 0 10px 30px rgba(96, 165, 250, 0.15); }
  .card-mono-stat { font-family: 'JetBrains Mono'; font-size: .7rem; color: #60a5fa;
                    border-top: 1px dashed rgba(96, 165, 250, 0.2); padding-top: 10px; }
  ```
  注意：box-shadow 没有写进 transition，所以悬停时阴影是瞬间出现的。
* **参数滑块条 (Control Bar)**：`inline-flex` 胶囊，依次放标签、原生 `<input type="range">`（`min=5 max=25 step=0.5 value=10`）和数值读数。
  ```css
  .slider-control-bar { display: inline-flex; align-items: center; gap: 14px;
    background: rgba(15, 18, 28, 0.7); border: 1px solid rgba(96, 165, 250, 0.2);
    padding: 10px 24px; border-radius: 9999px; font-family: 'JetBrains Mono'; font-size: .8rem; }
  ```

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **吸引子演化**：由 `requestAnimationFrame` 持续驱动。每帧积分 4 步，视角 `angleY += 0.004` rad 缓慢自转；20% 遮罩让旧轨迹逐帧消隐，紫色粒子始终标记轨迹最前端的位置。画布监听 `resize` 铺满视口。
* **σ 参数实时调节 (main.js)**：滑块触发 `input` 事件时，直接改写积分参数 `sigma`，读数同步显示为 `toFixed(1)`。轨迹形态会立刻随参数变化，这是本页唯一的主动交互。
* **卡片悬停**：上浮 `-4px`，描边由 20% 透明度变为满色银蓝，并出现蓝色柔光阴影，时长 `0.3s`（默认 ease）。
* **注意**：demo **没有**实现鼠标引力场或指针扰动，Canvas 不响应鼠标。
* **减弱动效**：在 `prefers-reduced-motion: reduce` 下，停止 rAF 自转与持续积分：可以一次性预积分约 1200 点后绘制一帧静态吸引子；拖动滑块时再整体重绘一次静态图。卡片悬停位移也一并取消。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【量子矢量·拓扑网阵 (Quantum Vector & Lorentz Matrix)】风格，为 {{品牌/产品名}} 生成一个数学 / 科学计算主题主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为碳素黑 #090A0F。卡片与控件底 rgba(15,18,28,0.7)，描边 rgba(96,165,250,0.2)。
- 超导银蓝 #60A5FA（主色），量子纠缠紫 #C084FC（坐标与点缀）。
- 文本 #F8FAFC，弱文本 #94A3B8。

二、材质构件
- 洛伦兹 Canvas：全屏 fixed，不拦截事件，位于内容之下。每帧先叠一层 rgba(9,10,15,0.2) 作为残影遮罩，再用 1px rgba(96,165,250,0.4) 线条一笔画出整条轨迹，轨迹头部画一个 3px 紫色粒子。
- 积分方式：欧拉法，σ=10、ρ=28、β=8/3、dt=0.008，每帧 4 步，最多保留 1200 点。投影时绕 Y 轴旋转（z 先减 25），缩放系数为 min(w,h)/45。
- 矢量卡片：直角无圆角，1px 细框，backdrop-filter: blur(16px)。顶部放紫色坐标角标（如 [X: +14.28 // Y: -08.12]），底部用 1px 虚线分隔出一行银蓝等宽状态读数。三列网格，gap 28px。
- 参数滑块条：胶囊形，依次放标签、原生 range 滑块（5–25，步长 0.5）和数值读数。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（400–800）与 JetBrains Mono（400/500/700）。
- 主标题 3.6rem、字重 800、字距 -0.03em，居中两行；第二行为 135° 蓝→紫渐变文字。
- 页眉右侧用等宽字显示洛伦兹方程式；Ψ 符号、方括号标签、坐标、读数和滑块数值全部用 JetBrains Mono。

四、交互与动效
- 用 requestAnimationFrame 持续积分并绘制，视角每帧 angleY += 0.004 rad 缓慢自转，并响应 resize。
- 拖动滑块时实时改写 σ，读数保留一位小数，轨迹随之立即变形。
- 卡片悬停：translateY(-4px)，描边变为满色银蓝，并加 0 10px 30px rgba(96,165,250,0.15) 阴影，0.3s。
- 在 prefers-reduced-motion: reduce 下停止自转循环，只绘制一帧静态吸引子，调节滑块时再重绘。

五、内容板块（示例，可按业务替换）
- 页眉：「Ψ {{品牌/产品名}} // QUANTUM TENSOR」加方程式。
- 量子 Hero：标签「[ TOPOLOGY & LOGIC // ORDER ]」、两行标题（如「量子秩序，拓扑算力之美。」）、一句副文和 σ 参数滑块条。
- 三张矢量卡片：每张含坐标、能力标题、说明和一个状态读数（如 STATE: COHERENT / MANIFOLD: HYPERBOLIC / SYMMETRY: SU(3)×SU(2)）。
- 页脚：一行小字（{{品牌/产品名}} · Quantum Vector Lattice）。
```
