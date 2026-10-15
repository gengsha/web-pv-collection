# 风格构成说明：数字巴洛克·万物感知馆 (Digital Baroque & Museum of Synthetic Senses)

## 1. 风格概述 (Style DNA)
* **核心理念**：把产品当作一座数字美术馆来策展——酒红近黑的展厅里漂浮着上升的金箔微尘，作品被装进双层鎏金画框，罗马碑文体标题与古典衬线正文讲述「算法与人文」的交汇。
* **视觉情绪**：典雅、奢华、博学、庄重、带有戏剧性的暗调人文气息。
* **适用场景**：AI 艺术/生成作品画廊、文化与博物馆类项目、高端品牌发布页、文学音乐创作平台。
* **构图法则**：`#14050b` 酒红黑底上铺全屏 Canvas 金尘层；内容收在 `max-width: 1160px` 居中容器，完全中轴对称：「`✦ ✦ ✦` 纹饰 + Cinzel 馆名 + 斜体副标 → 居中 Hero（描边碑文胶囊 + 两行大标题，第二行鎏金渐变 + 金色主按钮）→ 三列画框展品 → 宽幅画框互动区 → 纹饰页脚」；所有容器直角无圆角，用 1px 暗金外框 + 12px 内衬 + 20% 金色内框形成「画框套画框」的装帧感。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 展厅底色与画框底 */
  --baroque-bg: #14050b;
  --baroque-card-bg: rgba(30, 10, 18, 0.75);

  /* 金箔三级 */
  --gold-foil: #eab308;
  --gold-champagne: #fde047;
  --gold-dim: #a16207;

  /* 文本 */
  --text-parchment: #fef3c7;
  --text-dim-gold: #d4af37;
  --text-muted: #881337;
}
```

* **点缀色（直接写在组件里）**：鎏金渐变 `linear-gradient(135deg, #fde047 0%, #ca8a04 50%, #fde047 100%)`（文字）与 `linear-gradient(135deg, #fde047 0%, #eab308 50%, #ca8a04 100%)`（按钮）；正文暖黄 `#fde68a`、`#fef08a`、`#fef9c3`；按钮文字用底色 `#14050b`。展品画面底为三种暗色径向渐变：紫 `#3b0764`、靛 `#1e1b4b`、褐 `#451a03`，均收边到 `#14050b`。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Cinzel` 900，`3.2rem`，行高 `1.2`，字间距 `0.04em`；第二行套 `.gold-text` 鎏金渐变剪裁。
* **碑文标签 (Cinzel)**：馆名 `1.4rem` / 700 / `0.15em` 字距 `#fde047`；Hero 胶囊 `0.75rem` / `0.2em`；展品编号 `0.7rem` / `0.15em`（如 `OPUS I // OIL & ALGORITHM`）；画框标题 `1.25rem`；底部金标 `0.72rem`；按钮 `0.95rem` / 700 / `0.1em`。
* **正文 (Body)**：`Playfair Display`（全站默认 `font-family`），Hero 引言 `1.05rem` 行高 `1.7` 色 `#fde68a` 透明度 0.85；展品描述 `0.9rem` 行高 `1.6`；副标与生成结果使用 `font-style: italic`。
* **纹饰**：`✦ ✦ ✦` 字符纹饰，`#eab308`，`1rem`，字间距 `0.5em`，透明度 0.8，置于页眉与页脚顶端。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **双层鎏金画框 (Art Frame)**：
  ```css
  .art-frame { background: rgba(30,10,18,0.75); border: 1px solid #a16207; padding: 12px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.6); position: relative;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s; }
  .art-frame:hover { border-color: #fde047; transform: translateY(-6px); }
  .frame-inner { border: 1px solid rgba(234,179,8,0.2); padding: 24px; height: 100%;
    display: flex; flex-direction: column; }
  ```
  画廊网格 `repeat(auto-fit, minmax(320px, 1fr))`，间距 `30px`。
* **展品画面 (Art Visual)**：`height: 140px`，`1px solid rgba(234,179,8,0.2)` 细框，背景为暗色径向渐变（如 `radial-gradient(circle, #3b0764 0%, #14050b 100%)`），中央放一枚 `2.8rem` 图形并加 `drop-shadow(0 4px 10px rgba(0,0,0,0.6))`。描述段 `flex: 1` 撑开，底部金标以 `border-top: 1px solid rgba(234,179,8,0.2)` 分隔。
* **鎏金按钮**：
  ```css
  .gold-btn { padding: 14px 36px; font-family: 'Cinzel', serif; font-weight: 700; letter-spacing: 0.1em;
    color: #14050b; background: linear-gradient(135deg, #fde047 0%, #eab308 50%, #ca8a04 100%);
    border: 1px solid #fef08a; box-shadow: 0 10px 30px rgba(234,179,8,0.3); transition: all 0.3s; }
  .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(234,179,8,0.5); }
  .gold-btn-small { padding: 0 24px; background: #eab308; color: #14050b; border: none; }
  ```
* **碑文胶囊**：直角，`1px solid #a16207`，`padding: 4px 16px`，Cinzel 宽字距金字（如 `COLLECTION MMXXVI`）。
* **互动转译区**：宽幅画框（`max-width: 860px` 居中）；输入框 `rgba(0,0,0,0.4)` 底、`1px solid #a16207`、Playfair 字体，聚焦时边框变 `#fde047`；输出框 `1px dashed #a16207`、`rgba(0,0,0,0.3)` 底，顶部居中 Cinzel 小标题 `✦ ... ✦`，正文斜体 `#fef9c3` 行高 `1.7`。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **金箔微尘 (main.js · Canvas)**：全屏固定 Canvas（随窗口 `resize`），生成 **40** 粒金尘：水平速度 `±0.2px/帧`、竖直速度 `-0.1 ~ -0.6px/帧`（缓慢上升）、半径 `1~3px`、透明度 `0.3~1.0`，填充 `rgba(234,179,8,α)`；飘出顶部后从底部随机横坐标重生，由 `requestAnimationFrame` 持续驱动。
* **画框悬停**：上浮 `6px` + 外框由暗金 `#a16207` 亮为香槟金 `#fde047`，曲线 `cubic-bezier(0.16, 1, 0.3, 1)`，时长 `0.35s`。主按钮悬停上浮 2px 并加深金色投影（`0.3s`）。
* **艺术转译 (main.js)**：点击「转译艺术」按钮时读取输入内容（为空则不响应），输出区先显示 `✦ 正在……转译… ✦` 的占位文案，`700ms` 后随机抽取一段预设的古典画派描述，以 `“针对命题【输入内容】：…”` 的格式写入（使用 `textContent`，避免注入）。
* **无障碍 / 减少动效**：在 `prefers-reduced-motion: reduce` 下停止金尘 Canvas 的持续循环（只绘制一帧静态金尘或直接隐藏），并取消画框与按钮的悬停位移，仅保留边框变色。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【数字巴洛克·万物感知馆 (Digital Baroque & Museum of Synthetic Senses)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 展厅底色酒红黑 #14050B；画框底 rgba(30,10,18,0.75)。
- 金箔三级：金 #EAB308、香槟金 #FDE047、暗金 #A16207；正文羊皮纸色 #FEF3C7 与暖黄 #FDE68A。
- 鎏金渐变：文字 #FDE047→#CA8A04→#FDE047（135deg），按钮 #FDE047→#EAB308→#CA8A04。
- 展品画面底用暗色径向渐变（紫 #3B0764 / 靛 #1E1B4B / 褐 #451A03 收边到底色）。

材质构件：
- 全部直角。双层画框：1px 暗金外框 + 12px 内衬 + 1px 20% 金色内框，阴影 0 16px 40px rgba(0,0,0,0.6)。
- 展品卡：Cinzel 编号小标 → 140px 暗色径向渐变画面（中央图形）→ 标题 → 描述 → 顶部细线分隔的金色标签。
- 鎏金主按钮（渐变底、深色字、浅金描边、金色投影）；碑文式描边胶囊；「✦ ✦ ✦」字符纹饰作为页眉页脚装饰。
- 互动区：宽幅画框内放暗底金框输入框（聚焦变香槟金）+ 金色按钮 + 虚线金框输出区。

字体排版：
- Google Fonts：Cinzel（500/700/900，标题与标签）+ Playfair Display（正文，含斜体）+ Plus Jakarta Sans（备用）。
- 主标题 Cinzel 900、3.2rem、字距 0.04em，第二行鎏金渐变剪裁；标签 Cinzel 宽字距 0.15–0.2em；副标与生成文本用斜体。

交互与动效：
- 全屏 Canvas：40 粒金尘缓慢上升（半径 1–3px，透明度 0.3–1），飘出顶部后从底部重生。
- 画框悬停上浮 6px、外框亮为香槟金（0.35s，cubic-bezier(0.16,1,0.3,1)）；按钮悬停上浮 2px 加深投影。
- 互动区点击按钮：先显示「✦ 正在转译… ✦」占位，约 700ms 后填入一段随机预设文案（引用用户输入）。
- prefers-reduced-motion 下停止金尘循环并取消悬停位移。

内容板块（示例，可按业务替换）：
- 页眉（纹饰 + {{品牌/产品名}} 馆名 + 斜体副标）
- Hero（碑文胶囊 + 两行大标题 + 引言 + 鎏金按钮）
- 三列展品画框（三件代表作品/能力，各含编号、画面、标题、描述、标签）
- 宽幅互动转译区（输入 → 生成结果）
- 页脚（纹饰 + 一行致辞）
```
