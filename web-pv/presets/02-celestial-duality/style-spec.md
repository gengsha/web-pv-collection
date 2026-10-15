# 风格构成说明：双子对偶·极简阴阳分形 (Celestial Duality & Swiss Monolith)

## 1. 风格概述 (Style DNA)
* **核心理念**：以「对偶」为唯一母题——理性与感性、逻辑与诗意、白昼与黑夜被一条可拖拽的中轴线劈成两半，两侧内容逐项对仗，让用户亲手调整两极的比重。
* **视觉情绪**：哲思、高反差、纯粹、瑞士国际主义排版式的克制与张力。
* **适用场景**：思想博客、双身份个人主页（工程师 × 艺术家）、产品「双模式」对比页、创意作品集。
* **构图法则**：全屏 `100vh × 100vw` 的 flex 左右分屏，左侧 `#f8fafc` 浅色理性极、右侧 `#09090b` 深色感性极，中间 6px 灰色拖拽轴配 32px 圆形把手；两侧各自独立纵向滚动，内容收在 `max-width: 540px` 列中，按「Mono 编号页眉 → Syne 巨型英文单词标题 → 中文副标 → 单体卡片 → 双列指标 → 整宽按钮」严格镜像排布；整个页面上方漂浮一枚 `mix-blend-mode: difference` 的白色圆形光标，在黑白两侧自动反色。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 理性极（Light Side） */
  --light-bg: #f8fafc;
  --light-surface: #ffffff;
  --light-text: #09090b;
  --light-muted: #64748b;
  --light-border: #e2e8f0;

  /* 感性极（Dark Side） */
  --dark-bg: #09090b;
  --dark-surface: #141418;
  --dark-text: #f8fafc;
  --dark-muted: #a1a1aa;
  --dark-border: #27272a;
}
```

* **点缀色（直接写在组件里）**：拖拽轴静止 `#71717a`、悬停/拖拽中 `#2563eb`；把手 `#18181b` 底 + `#3f3f46` 描边；代码块 `#0f172a` 底 + `#38bdf8` 字；诗句引文左边线 `#818cf8`、文字 `#e2e8f0`。除此之外不使用任何渐变——黑、白、灰与一抹蓝是全部色彩。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Syne` 800，`3.2rem`，行高 `1`，字间距 `-0.04em`，全大写英文单词（如 RATIONALITY / CREATIVITY）作为两极的「名字」。
* **指标数字**：`Syne` 800，`1.8rem`，行高 `1`；下方标签 `0.75rem`，`opacity: 0.65`。
* **正文 (Body)**：`Plus Jakarta Sans`，副标 `1.05rem` 行高 `1.5`、卡片正文 `0.88rem` 行高 `1.6`，均以 `opacity: 0.75` 取弱色而非换色，保证两侧同一套规则可镜像。卡片标题 `1.15rem` / 700。
* **页眉/状态 (Mono)**：`JetBrains Mono`，页眉编号 `0.78rem` / 700 / `0.05em` 字距（如 `01 // LOGIC & SYNTAX`）；状态徽章 `0.7rem` / 700，1px 描边、圆角 4px（如 `RIGOROUS 100%`、`EMERGENCE ∞`）。
* **按钮**：`Syne` 700 `0.9rem`；诗句引文为 `italic 0.95rem`、行高 `1.7`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **分屏容器与两极面板**：
  ```css
  body { height: 100vh; overflow: hidden; user-select: none; }
  .split-container { display: flex; height: 100vh; width: 100vw; position: relative; }
  .split-pane { height: 100%; overflow-y: auto; padding: 48px; display: flex; flex-direction: column; }
  .pane-light { width: 50%; background: #f8fafc; color: #09090b; }
  .pane-dark  { flex: 1;    background: #09090b; color: #f8fafc; }
  .pane-content { max-width: 540px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 32px; }
  ```
* **瑞士页眉线**：`border-bottom: 1px solid currentColor; padding-bottom: 12px; opacity: 0.85;`——用 `currentColor` 让同一条规则在黑白两侧自动反色。
* **单体卡片 (Monolith Card)**：
  ```css
  .card-monolith { background: #ffffff; border: 1px solid #e2e8f0; padding: 24px;
    border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.04); }
  .card-monolith.dark { background: #141418; border-color: #27272a; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
  ```
  左卡内嵌深色代码块（`#0f172a`，`#38bdf8`，Mono `0.78rem`，圆角 8px）；右卡内嵌斜体诗句（`border-left: 2px solid #818cf8; padding-left: 14px`）。
* **双列指标行**：`grid-template-columns: 1fr 1fr; gap: 16px; border-top: 1px solid var(--light-border); padding-top: 20px;`，深色侧换 `--dark-border`。
* **反相按钮**：浅色侧按钮为黑底白字，深色侧为白底黑字（`border: none; border-radius: 8px; padding: 14px`），永远与所在面板反相。
* **拖拽中轴与把手**：
  ```css
  .split-divider { width: 6px; background: #71717a; cursor: col-resize; z-index: 50;
    display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
  .split-divider:hover, .split-divider.dragging { background: #2563eb; }
  .divider-handle { width: 32px; height: 32px; border-radius: 50%; background: #18181b;
    border: 1px solid #3f3f46; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
  ```
  把手内放左右两个 14px 箭头 SVG（`stroke-width: 2.5`）。
* **反色光标**：
  ```css
  .diff-cursor { position: fixed; width: 32px; height: 32px; border-radius: 50%; background: #ffffff;
    mix-blend-mode: difference; pointer-events: none; transform: translate(-50%, -50%); z-index: 9999;
    transition: width 0.2s, height 0.2s; }
  ```

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **反色光标跟随 (main.js)**：`mousemove` 时把光标的 `left/top` 直接设为 `clientX/clientY`，无缓动、零延迟；`difference` 混合让它在白底呈黑、黑底呈白。
* **分屏拖拽 (main.js)**：在中轴 `mousedown` 开始拖拽并添加 `.dragging`（轴变蓝）、`body` 光标改为 `col-resize`；`mousemove` 时左栏宽度 = `clientX / 容器宽 × 100%`，并钳制在 **20% ~ 80%**；`mouseup` 结束拖拽并复原光标。右栏为 `flex: 1` 自动填满剩余宽度。
* **按钮悬停**：`transform: translateY(-2px); opacity: 0.9;`，过渡 `0.2s`；中轴颜色过渡 `0.2s`。
* **克制原则**：整页没有任何持续循环动画、渐变或粒子，动感完全来自用户的拖拽与光标反色。
* **无障碍 / 减少动效**：本预设无持续动画；在 `prefers-reduced-motion: reduce` 下仍应取消按钮位移与过渡，并可隐藏自定义光标、恢复系统光标。复刻时建议补充触摸事件（`pointerdown/pointermove`）以支持移动端拖拽。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【双子对偶·极简阴阳分形 (Celestial Duality & Swiss Monolith)】风格，为 {{品牌/产品名}} 生成一个单页主页（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 理性极：底 #F8FAFC、卡片 #FFFFFF、文字 #09090B、弱 #64748B、边框 #E2E8F0。
- 感性极：底 #09090B、卡片 #141418、文字 #F8FAFC、弱 #A1A1AA、边框 #27272A。
- 唯一强调色：拖拽轴悬停蓝 #2563EB；代码块 #0F172A + #38BDF8；引文边线 #818CF8。全页禁用渐变与彩色装饰。

材质构件：
- 全屏 flex 分屏（body 100vh、overflow hidden），左栏初始 50%，右栏 flex:1，两栏各自纵向滚动，内容列 max-width 540px、gap 32px。
- 页眉：Mono 编号 + 描边状态徽章，下边线 1px solid currentColor。
- 单体卡片：圆角 12px、1px 边框、极轻阴影；左卡内嵌深色代码块，右卡内嵌斜体诗句引文。
- 双列指标行（上边线分隔）；整宽按钮与所在面板反相（浅侧黑底、深侧白底）。
- 中轴：6px 灰条（#71717A）+ 32px 深色圆形把手，内含左右箭头。

字体排版：
- Google Fonts：Syne（700/800）+ Plus Jakarta Sans（300–700）+ JetBrains Mono（400/500）。
- 每侧主标题为一个全大写英文单词，Syne 800、3.2rem、行高 1、字距 -0.04em；指标数字 Syne 800 1.8rem。
- 弱化文字统一用 opacity 0.65–0.75，而非换色。

交互与动效：
- 32px 白色圆形光标，mix-blend-mode: difference，跟随鼠标零延迟，在黑白两侧自动反色。
- 按住中轴拖拽改变左栏宽度，范围钳制 20%–80%，拖拽中轴变蓝、页面光标为 col-resize。
- 按钮悬停上移 2px、透明度 0.9（0.2s）。不加任何循环动画。
- prefers-reduced-motion 下取消过渡与位移；补充 pointer 事件支持触屏拖拽。

内容板块（示例，可按业务替换）：
- 左极「理性」：编号页眉 → 大标题 → 副标 → 技术卡片（含代码片段）→ 两项硬指标 → 行动按钮
- 右极「感性」：编号页眉 → 大标题 → 副标 → 创意卡片（含诗句引文）→ 两项体验指标 → 行动按钮
- 两侧内容逐项对仗，分别代表 {{品牌/产品名}} 的两种能力或两种身份
```
