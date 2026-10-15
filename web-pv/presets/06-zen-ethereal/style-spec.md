# 风格构成说明：禅境虚实·呼吸留白 (Zen Minimalist & Ethereal Ink Flow)

## 1. 风格概述 (Style DNA)
* **核心理念**：以东方禅意与「虚室生白」为意象，把智能体呈现为一种宁静的沉思状态。不用硬边框，不用高饱和色，也没有密集信息。页面只靠宣纸灰白底、松烟墨字、超大留白和一枚缓慢呼吸的淡蓝光晕来营造心流。
* **视觉情绪**：宁静、空灵、去噪、克制、温润如玉。
* **适用场景**：极简个人主页、冥想与专注工具、长文阅读站、思维笔记、品牌理念页。
* **构图法则**：单列居中布局（容器 `max-width: 900px`）。顶部是两端对齐的极简页眉（品牌名 + 状态小字）。中部依次排列：居中衬线大标题（手动 `<br>` 断成两行），三列无边框半透明「墨卡」（汉字序号 一 / 二 / 三），最后是只有一条下划线的对话输入框。页脚只留一行灰色小字。页面正中固定一枚 600px 的径向蓝光晕，在所有内容之下缓慢呼吸。各区块之间以 80–90px 的大间距隔开，全页没有任何实线边框。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 宣纸底色与墨卡 */
  --zen-bg: #f8f9fa;                       /* 宣纸灰白 */
  --zen-card-bg: rgba(255, 255, 255, 0.7); /* 半透明墨卡底 */

  /* 墨色三阶 */
  --zen-ink-black: #111827;  /* 松烟浓墨：标题、正文主色、输入框聚焦线 */
  --zen-ink-dim: #4b5563;    /* 淡墨：副标题、卡片正文、回应文字 */
  --zen-ink-light: #9ca3af;  /* 枯墨：序号、页脚 */
}

/* 代码中直接使用的辅助色值（未入令牌） */
/* 呼吸光晕：rgba(59, 130, 246, 0.08) → rgba(248, 249, 250, 0)  */
/* 墨卡阴影：0 15px 35px -10px rgba(0, 0, 0, 0.03)                */
/* 输入下划线：rgba(0, 0, 0, 0.15)，聚焦时变为 #111827           */
```

* **用色原则**：全页只有一处冷色，就是光晕里 8% 透明度的蓝（`rgb(59,130,246)`），其余一律是灰阶墨色。不要再加强调色、按钮色或彩色图标。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  ```
* **全站字体**：`body` 与输入框统一使用 `'Noto Serif SC', serif`（宋体衬线，古意空灵），并开启 `-webkit-font-smoothing: antialiased`。`Plus Jakarta Sans` 虽已引入，但 demo 中没有元素实际使用它，可留作拉丁文辅助字体。
* **主标题**：`3.4rem` / 字重 `400`（刻意不加粗）/ `letter-spacing: 0.08em` / `line-height: 1.35`，居中，两行断句（如「风止水静，<br>智识自明。」）。
* **副标题**：`1.05rem` / `line-height: 1.8` / 颜色 `#4b5563` / `max-width: 580px` 居中。
* **品牌名**：`1.1rem` / `600` / `letter-spacing: 0.1em`。状态小字为 `0.8rem` / `0.05em` / 淡墨色。
* **墨卡**：序号使用汉字「一 二 三」，`1.2rem` / `600` / 枯墨色 `#9ca3af`；卡片标题 `1.25rem` / `600` / `0.04em`；卡片正文 `0.88rem` / `line-height: 1.8`。
* **回应文字**：`0.95rem` / `font-style: italic` / `line-height: 1.7` / 淡墨色，内容用中文引号「“…”」包裹。
* **页脚**：`0.75rem`，枯墨色。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **呼吸光环 (Breathing Halo)**：一个 `position: fixed` 的 600×600 圆形，在视口正中通过 `translate(-50%, -50%)` 居中，设 `pointer-events: none; z-index: 0`，内容层放在 `z-index: 1` 上方。
  ```css
  .zen-halo {
    position: fixed; top: 50%; left: 50%;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(248, 249, 250, 0) 70%);
    animation: zenBreathe 8s ease-in-out infinite alternate;
    pointer-events: none; z-index: 0;
  }
  ```
* **无框墨卡 (Ink Card)**：用半透明白底、毛玻璃和极淡的长阴影来区分卡片与背景，**不使用任何 border**。网格为 `repeat(auto-fit, minmax(240px, 1fr))`，`gap: 32px`。
  ```css
  .ink-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    padding: 36px 28px;
    border-radius: 16px;
    box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.03);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .ink-card:hover { transform: translateY(-4px); }
  ```
* **单线输入 (Underline Input)**：输入框透明，只保留一条底线，文字居中，字体沿用衬线体。
  ```css
  #zenInput {
    background: transparent; border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding: 14px 4px; font-family: 'Noto Serif SC', serif;
    font-size: 1.05rem; text-align: center; outline: none;
    transition: border-color 0.3s;
  }
  #zenInput:focus { border-color: #111827; }
  ```
* **留白尺度**：页面外边距 `60px 24px`，页眉下方 `80px`，Hero 下方 `90px`，卡片区下方 `80px`。对话区 `max-width: 600px`。正文行高不低于 `1.7`。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **光晕呼吸 (zenBreathe)**：单程 8s，`ease-in-out infinite alternate` 往返，完整一呼一吸约 16s，节奏非常慢。
  ```css
  @keyframes zenBreathe {
    0%   { transform: translate(-50%, -50%) scale(0.85); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(1.2);  opacity: 0.9; }
  }
  ```
* **墨卡浮起**：悬停时卡片上浮 `-4px`，曲线 `cubic-bezier(0.16, 1, 0.3, 1)`（快起缓停的 expo-out），时长 `0.4s`。卡片没有阴影或颜色变化。
* **输入聚焦**：下划线在 `0.3s` 内由 `rgba(0,0,0,0.15)` 加深为浓墨 `#111827`。
* **禅语回应 (main.js)**：在输入框按 `Enter` 后，如果内容非空，回应区先设 `opacity: 0`，`400ms` 后从 3 条预置禅语中随机挑一条替换文本，再恢复 `opacity: 1`。注意 demo 的 `.zen-reply` 没有声明 `transition`，所以实际效果是「消隐→换字→出现」的切换。如果要做成羽化淡入，可以补一行 `transition: opacity 0.4s`。
* **减弱动效**：在 `@media (prefers-reduced-motion: reduce)` 下，给 `.zen-halo` 设 `animation: none`，停止持续呼吸，光晕静止为中间态。墨卡悬停位移也一并取消。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【禅境虚实·呼吸留白 (Zen Minimalist & Ethereal Ink Flow)】风格，为 {{品牌/产品名}} 生成一个极简主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为宣纸灰白 #F8F9FA。墨色分三阶：浓墨 #111827（标题/正文）、淡墨 #4B5563（副文/卡片正文）、枯墨 #9CA3AF（序号/页脚）。
- 全页唯一的冷色是光晕中的 rgba(59,130,246,0.08)。禁止其他强调色、彩色按钮、实线边框和高对比元素。

二、材质构件
- 呼吸光环：position: fixed 的 600×600 圆，居中于视口，背景为 radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)，pointer-events: none，位于内容层之下。
- 无框墨卡：背景 rgba(255,255,255,0.7)，backdrop-filter: blur(16px)，圆角 16px，内边距 36px 28px，阴影 0 15px 35px -10px rgba(0,0,0,0.03)，不设 border。三列卡片网格使用 auto-fit minmax(240px,1fr)，gap 32px。
- 单线输入：输入框透明无边框，只留一条 1px rgba(0,0,0,0.15) 底线，文字居中，聚焦时底线变为 #111827。

三、字体排版
- Google Fonts 引入 Noto Serif SC（300/400/600/700），全站使用衬线体。Plus Jakarta Sans 可作为拉丁辅助字体。
- 主标题 3.4rem、字重 400（不加粗）、字距 0.08em、行高 1.35，居中并手动断成两行。副标题 1.05rem、行高 1.8、最大宽度 580px。
- 卡片序号使用汉字「一 二 三」，枯墨色。回应文字为斜体、淡墨色，用中文引号包裹。
- 单列居中，容器最大宽度 900px，区块间距 80–90px，留白要极度奢侈。

四、交互与动效
- 光环呼吸：@keyframes 从 scale(0.85)/opacity 0.5 到 scale(1.2)/opacity 0.9，8s ease-in-out infinite alternate。
- 墨卡悬停：translateY(-4px)，曲线 cubic-bezier(0.16,1,0.3,1)，时长 0.4s。
- 输入框按 Enter 且内容非空时，回应区淡出（opacity 0，transition 0.4s），400ms 后从预置的 3 条禅语中随机替换文本，再淡入。
- 在 prefers-reduced-motion: reduce 下关闭光环呼吸动画与悬停位移。

五、内容板块（示例，可按业务替换）
- 页眉：左侧为 {{品牌/产品名}} 的中文雅称，右侧为一句状态小字（如「心流常驻 · 虚室生白」）。
- 禅境 Hero：两行诗意大标题（如「风止水静，智识自明。」）加一句去喧嚣的副标题。
- 三段沉思墨卡：每张卡片含序号、四字标题和一句理念说明（如 无念而照 / 顺物自然 / 万籁归一），用来对应产品的三项核心能力。
- 心流对话入口：一个单线输入框，下方是斜体回应语。
- 页脚：一行枯墨小字（{{品牌/产品名}} · Zen Ethereal）。
```
