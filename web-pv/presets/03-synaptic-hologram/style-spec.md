# 风格构成说明：神经突触·全息色散 (Synaptic Holo-Chroma Lab)

## 1. 风格概述 (Style DNA)
* **核心理念**：把模型的认知网络具象化为一间全息实验舱——正交网格是实验台，CRT 扫描线与一道青品红扫描光束不断扫过屏幕，背后的 Canvas 上漂浮着彼此连线的神经突触节点，一键即可「激发脉冲」。
* **视觉情绪**：赛博全息、冷峻、精密、实验室 HUD 式的仪表感。
* **适用场景**：AI 实验室官网、模型架构/能力可视化、神经科学与计算生物学展示、技术发布会落地页。
* **构图法则**：`#030712` 近黑底上叠四层固定背景（40px 青色正交网格 → Canvas 突触网络 → 3px 周期横向扫描线 → 自上而下扫过的 8px 渐变光束）；内容收在 `max-width: 1100px` 的纵向 flex 容器里，自上而下为「HUD 顶栏（品牌 + 遥测读数）→ 居中 Hero（品红 Mono 胶囊 + 白→青渐变大标题 + 双按钮）→ 三列节点卡片 → 状态页脚」；卡片几乎无圆角，只在左上与右下各钉一个 8px 青色 L 形角标，底部带一条 4px 能量条。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色与面板 */
  --holo-bg: #030712;
  --holo-surface: rgba(10, 15, 29, 0.7);
  --holo-surface-hover: rgba(18, 26, 48, 0.85);

  /* 全息三色 */
  --holo-cyan: #22d3ee;
  --holo-magenta: #e879f9;
  --holo-lime: #a3e635;

  /* 边框与辉光 */
  --holo-border: rgba(56, 189, 248, 0.25);
  --holo-glow: 0 0 24px rgba(34, 211, 238, 0.35);

  /* 文本 */
  --text-main: #f8fafc;
  --text-dim: #94a3b8;
}
```

* **用法分工**：青 `#22d3ee` 为主信号色（网格、节点、角标、ID、主按钮描边）；品红 `#e879f9` 用于标签胶囊与次要读数；酸橙 `#a3e635` 只用于「CONNECTED / OPTIMIZED」等在线状态。三色分别填充三张卡片的能量条。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Chakra Petch` 700，`3.2rem`，字间距 `0.02em`，全大写英文；`linear-gradient(135deg, #ffffff, #22d3ee)` 渐变剪裁 + `text-shadow: 0 0 30px rgba(34,211,238,0.3)`。
* **HUD 品牌 / 卡片标题 / 按钮**：`Chakra Petch` 700；品牌 `1.25rem` 字距 `0.05em`（如 `BRAND // SYNAPTIC.LAB`），卡片标题 `1.15rem`，按钮 `0.9rem` 字距 `0.05em`。
* **正文 (Body)**：`Plus Jakarta Sans` 400/500，Hero 描述 `1.05rem` 行高 `1.65`，卡片正文 `0.85rem` 行高 `1.5`，颜色 `#94a3b8`。
* **读数/编号 (Mono)**：`JetBrains Mono`。HUD 标签 `0.65rem` 弱色、数值 `0.95rem` 700（青或品红）；节点 ID `0.72rem` 青色（如 `NODE_01 // OPTIC`）；状态 `0.65rem` 700 酸橙；标签胶囊 `0.75rem` 字距 `0.1em`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **正交网格 + 扫描线 + 扫描光束**：
  ```css
  .holo-grid-bg { position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(to right, rgba(56,189,248,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(56,189,248,0.06) 1px, transparent 1px);
    background-size: 40px 40px; }
  .scanline-overlay { position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: 0.6;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px); }
  .holo-scan-beam { position: fixed; left: 0; right: 0; height: 8px; opacity: 0.5; z-index: 2;
    background: linear-gradient(90deg, transparent, #22d3ee, #e879f9, transparent);
    box-shadow: 0 0 20px #22d3ee; animation: scanSweep 8s linear infinite; }
  ```
* **HUD 顶栏**：`border-bottom: 1px solid var(--holo-border)`，`background: rgba(3,7,18,0.6)` + `backdrop-filter: blur(8px)`；左侧小徽章 `HUD // ONLINE`（青字、10% 青底、圆角 4px），右侧两组右对齐读数。
* **全息节点卡片 (Holo Card)**：
  ```css
  .holo-card { background: rgba(10,15,29,0.7); border: 1px solid rgba(56,189,248,0.25);
    backdrop-filter: blur(12px); padding: 24px; position: relative; transition: all 0.3s; }
  .holo-card:hover { background: rgba(18,26,48,0.85); border-color: #22d3ee;
    box-shadow: 0 0 24px rgba(34,211,238,0.35); transform: translateY(-4px); }
  .card-corner { position: absolute; width: 8px; height: 8px; border-color: #22d3ee; }
  .card-corner.tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
  .card-corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }
  .node-meter { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; overflow: hidden; }
  ```
  网格 `repeat(auto-fit, minmax(280px, 1fr))`，间距 `20px`；卡片头部一行放节点 ID 与状态，底部能量条按百分比宽度填充（88% / 94% / 99%）。
* **全息按钮**：圆角仅 `4px`。
  ```css
  .holo-btn.primary { background: linear-gradient(135deg, rgba(34,211,238,0.2), rgba(232,121,249,0.2));
    border: 1px solid #22d3ee; color: #fff; box-shadow: 0 0 20px rgba(34,211,238,0.3); }
  .holo-btn.primary:hover { background: linear-gradient(135deg, #22d3ee, #e879f9); color: #000;
    box-shadow: 0 0 30px rgba(34,211,238,0.6); }
  .holo-btn.secondary { background: transparent; border: 1px solid rgba(56,189,248,0.25); color: #94a3b8; }
  ```
* **标签胶囊**：品红字、`rgba(232,121,249,0.1)` 底、`rgba(232,121,249,0.3)` 描边、圆角 20px。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **扫描光束 (CSS)**：`linear 8s infinite`，从顶端匀速扫到底端后瞬间回到顶部。
  ```css
  @keyframes scanSweep { 0% { top: -20px; } 100% { top: 100vh; } }
  ```
* **突触网络 (main.js · Canvas)**：全屏 Canvas（随窗口 `resize`），生成 **35** 个节点，速度分量 `±0.4px/帧`、半径 `1.5~4px`，碰到视口边缘反弹；每帧对距离 **< 180px** 的节点两两连线，线色 `rgba(34,211,238, α)`，`α = (1 - d/180) × 0.25`、线宽 `0.8`；节点填充 `#22d3ee`，由 `requestAnimationFrame` 持续驱动。
* **脉冲激发 (main.js)**：点击主按钮「激发脉冲」进入高脉冲态 **2000ms**——连线透明度系数提升到 `0.8`、线宽 `1.5`，节点移动速度 ×2，节点半径随 `sin(pulse)` 呼吸 ±2px；同时 HUD 读数文字从 `99.98%` 切换为 `100.00% PULSING`，结束后恢复。
* **悬停反馈**：卡片 `0.3s` 上浮 4px + 青色描边与外辉光；按钮 `0.2s` 由半透明渐变切换为实色青→品红渐变、文字变黑。
* **无障碍 / 减少动效**：在 `prefers-reduced-motion: reduce` 下关闭扫描光束动画（`animation: none` 或隐藏），Canvas 只绘制一帧静态网络、不再循环 `requestAnimationFrame`，脉冲态仅更新读数文字。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【神经突触·全息色散 (Synaptic Holo-Chroma Lab)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 底色 #030712；面板 rgba(10,15,29,0.7)，悬停 rgba(18,26,48,0.85)；边框 rgba(56,189,248,0.25)。
- 全息三色：主信号青 #22D3EE、品红 #E879F9（标签/次读数）、酸橙 #A3E635（仅在线状态）。
- 文本 #F8FAFC / 弱 #94A3B8；辉光 0 0 24px rgba(34,211,238,0.35)。

材质构件：
- 四层固定背景：40px 青色正交网格（6% 透明度）、全屏 Canvas 突触网络、3px 周期横向扫描线（opacity 0.6）、8px 青→品红渐变扫描光束。
- HUD 顶栏：毛玻璃 blur(8px) + 底部细线，左侧 ONLINE 小徽章与品牌名，右侧两组 Mono 遥测读数。
- 节点卡片：几乎无圆角，blur(12px)，左上/右下 8px 青色 L 形角标，头部为 Mono 节点 ID + 酸橙状态，底部 4px 能量条（分别用青/品红/酸橙填充）。
- 按钮圆角 4px：主按钮半透明青品红渐变 + 青描边，悬停变实色渐变黑字；次按钮透明描边。

字体排版：
- Google Fonts：Chakra Petch（500–700，标题/按钮）+ JetBrains Mono（400–700，读数/ID）+ Plus Jakarta Sans（正文）。
- 主标题全大写英文，Chakra Petch 700、3.2rem，白→青渐变剪裁并加青色 text-shadow。

交互与动效：
- 扫描光束 8s linear infinite 自上而下循环扫过。
- Canvas：35 个青色节点缓慢漂移、边缘反弹，距离 <180px 两两连线，透明度随距离衰减。
- 点击主按钮进入 2 秒高脉冲态：连线变亮变粗、节点加速并呼吸，HUD 读数临时切换为「100.00% PULSING」后复原。
- 卡片悬停上浮 4px + 青色辉光（0.3s）。
- prefers-reduced-motion 下关闭扫描光束与 Canvas 循环，只保留静态网络。

内容板块（示例，可按业务替换）：
- HUD 顶栏（{{品牌/产品名}} // LAB + 两项实时指标）
- Hero（品红版本胶囊 + 英文大标题 + 一段说明 + 「激发脉冲」主按钮与次按钮）
- 三张能力节点卡片（如视觉 / 声学 / 推理，每张含节点 ID、状态、描述与能量条）
- 状态页脚（一行 Mono 系统状态文字）
```
