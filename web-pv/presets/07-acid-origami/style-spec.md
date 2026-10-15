# 风格构成说明：酸性折纸·高能多维展开 (Acid Dimensional Origami)

## 1. 风格概述 (Style DNA)
* **核心理念**：以街头贴纸、Zine 拼贴与新粗野主义 (Neo-Brutalism) 为底层语言。高饱和酸性三原色（酸橙绿 / 电光粉 / 数码青）在炭黑底上直接撞色，配合粗黑描边、零模糊的硬投影和随机倾斜的贴纸，表达青年创作者打破常规的爆发力。「折纸」指一张可翻面的卡片，点击后切换为背面内容，同时换掉硬投影的颜色。
* **视觉情绪**：先锋、叛逆、高能、玩味、直给。
* **适用场景**：AI 创意工作室、潮流创作者主页、黑客松展台、青年品牌活动页、灵感工具。
* **构图法则**：单列居中（`max-width: 1000px`），区块间距统一为 `gap: 50px`。页眉两端各放一张倾斜贴纸（左侧品牌贴 `-2deg`，右侧徽章 `3deg`）。Hero 居中，从上到下依次是小贴纸行、超大 Syne 标题（中文高亮行带粉色错位硬影）、灰色副文和一对硬投影按钮。下方依次是一张带彩色硬投影的翻面卡片、一个带青色硬投影的灵感生成器。全页圆角为 0，所有阴影都不模糊。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 冲击底色 */
  --acid-bg: #0f1015;       /* 炭黑页面底 */
  --acid-surface: #1a1c24;  /* 折纸卡片底 */

  /* 高能酸性三原色 */
  --acid-lime: #ccff00;     /* 酸橙绿：品牌贴、主按钮、卡片硬影（折叠态）、高亮标题 */
  --acid-pink: #ff007f;     /* 电光粉：徽章、次按钮、标题错位影、卡片硬影（展开态） */
  --acid-cyan: #00ffff;     /* 数码青：贴纸、迷你标签文字、生成器硬影、收起按钮 */

  --text-white: #ffffff;
}

/* 代码中直接使用的辅助色值 */
/* 纯黑描边/硬影：#000          生成器底：#18181b          */
/* 副文灰：#a1a1aa  卡片正文：#d4d4d8  页脚：#71717a       */
```

* **用色原则**：彩色硬影和描边一律用纯黑 `#000`，不用半透明阴影。三种荧光色互相作为对方的「影子」或底色，例如绿字配粉影。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Syne` 800，`4rem`，`line-height: 1.05`，`letter-spacing: -0.03em`（紧排）。英文为全大写短句（如「FOLD REALITY.」），中文行包在 `.acid-highlight` 中：
  ```css
  .acid-highlight { color: #ccff00; text-shadow: 4px 4px 0 #ff007f; }
  ```
* **按钮 / 品牌贴 / 生成器标题**：`Syne` 800（按钮 `0.95rem`，品牌贴 `1.2rem`，生成器标题 `0.85rem`）。
* **正文与贴纸标签 (Body)**：`Space Grotesk`，`body` 默认字体；贴纸与标签用 700 大写、`0.7–0.75rem`；副文 `1.1rem` / `line-height: 1.6` / `#a1a1aa`。
* **折面编号 (Mono)**：`JetBrains Mono` 700，`0.72rem`，格式如 `FOLD 01 // FRONT`，正面为粉色，背面为绿色。
* **卡片标题**：`Syne` 800，`1.8rem`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **倾斜贴纸 (Sticker)**：纯色块、零圆角、黑色硬影，每张贴纸的旋转角度都不一样。
  ```css
  .sticker-brand { font-family: 'Syne'; font-weight: 800; background: #ccff00; color: #000;
                   padding: 6px 14px; transform: rotate(-2deg); box-shadow: 4px 4px 0 #000; }
  .pink-badge    { background: #ff007f; color: #fff; transform: rotate(3deg); box-shadow: 3px 3px 0 #000; }
  .sticker-chip  { background: #fff; color: #000; font-size: .75rem; font-weight: 700;
                   padding: 4px 10px; transform: rotate(-1deg); box-shadow: 3px 3px 0 #000; }
  .cyan-chip     { background: #00ffff; transform: rotate(2deg); }
  ```
* **硬投影按钮 (Brutal Button)**：2px 黑框加 5px 黑色硬影。悬停时按钮向左上抬起、影子变长；按下时向右下压、影子变短。
  ```css
  .acid-btn { font-family: 'Syne'; font-weight: 800; padding: 14px 28px;
              border: 2px solid #000; box-shadow: 5px 5px 0 #000; transition: all 0.15s; }
  .acid-btn:hover  { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 #000; }
  .acid-btn:active { transform: translate(2px, 2px);   box-shadow: 2px 2px 0 #000; }
  ```
* **翻面折纸卡 (Origami Card)**：3px 黑框加 10px 彩色硬影，父容器设 `perspective: 1200px`。卡片有正面和背面两个面，通过 `.folded` / `.unfolded` 类配合 `display: none` 切换显示哪一面；换面时先加 `.flipping`（`rotateX(-90deg)`，0.22s 加速曲线）把卡片折到侧面，换面后再用 0.6s 回弹曲线展开。展开后硬影由绿变粉。
  ```css
  .origami-section { perspective: 1200px; display: flex; justify-content: center; }
  .origami-card { max-width: 680px; min-height: 240px; background: #1a1c24;
                  border: 3px solid #000; box-shadow: 10px 10px 0 #ccff00; cursor: pointer;
                  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  .origami-card.unfolded { box-shadow: 10px 10px 0 #ff007f; }
  .origami-card.folded .face-inside,
  .origami-card.unfolded .face-front { display: none; }
  ```
* **迷你标签 (Mini Tag)**：黑底青字，`0.7rem` / 700，例如 `3D TRANSFORMS`、`SPRING PHYSICS`。
* **灵感生成器面板**：`#18181b` 底、3px 黑框、`box-shadow: 8px 8px 0 #00ffff`，内容居中。生成按钮为粉底白字，`box-shadow: 4px 4px 0 #000`。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **按钮压感**：`transition: all 0.15s`（默认 ease）。悬停时上浮 2px、影子加长；按下时下沉 2px、影子缩短，模拟实体贴纸被按压的手感。
* **折纸翻面 (main.js)**：点击卡片本身或 Hero 的「展开全维折纸」按钮都会调用 `toggleUnfold()`，在 `folded` 和 `unfolded` 之间切换；背面的「收起折叠」按钮会先 `stopPropagation()` 再强制回到 `folded`。切换时卡片先沿 X 轴折到 -90°（220ms），在侧面朝向观者、看不见的那一刻互换两面，再以 `cubic-bezier(0.175, 0.885, 0.32, 1.275)` 0.6s 回弹展开，带一点过冲；翻折进行中会忽略重复点击。硬影颜色从绿变粉。
* **灵感轰炸 (main.js)**：点击「BOMB ANOTHER IDEA」后，文本框先设 `transform: scale(0.95)`，`150ms` 后从 4 条预置跨界创意中随机替换文本，再恢复 `scale(1)`。`.idea-display` 使用 `transition: transform 0.3s` 加同一条回弹曲线，呈现为「缩一下再弹回」。
* **减弱动效**：本预设没有持续循环动画。在 `prefers-reduced-motion: reduce` 下跳过 3D 翻折，直接换面，并关闭按钮位移与过渡，只保留颜色和内容的切换。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【酸性折纸·高能多维展开 (Acid Dimensional Origami)】风格，为 {{品牌/产品名}} 生成一个潮流先锋主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 页面底色为炭黑 #0F1015，卡片底 #1A1C24，生成器底 #18181B。
- 三种酸性主色：酸橙绿 #CCFF00、电光粉 #FF007F、数码青 #00FFFF。
- 描边与硬影一律用纯黑 #000。辅助灰：副文 #A1A1AA、卡片正文 #D4D4D8、页脚 #71717A。
- 全页圆角为 0，所有阴影为零模糊的硬投影。

二、材质构件
- 倾斜贴纸：纯色块配大写小字，每张旋转角度不同（-2deg / 3deg / -1deg / 2deg），带 3–4px 黑色硬影。
- 硬投影按钮：2px 黑框，box-shadow 5px 5px 0 #000。悬停时 translate(-2px,-2px)、影子变为 7px；按下时 translate(2px,2px)、影子变为 2px。
- 翻面折纸卡：3px 黑框，box-shadow 10px 10px 0 #CCFF00，父容器 perspective: 1200px。卡片有正面和背面两个面，展开后显示背面，硬影改为电光粉。
- 灵感生成器面板：3px 黑框，box-shadow 8px 8px 0 #00FFFF，内容居中。

三、字体排版
- Google Fonts 引入 Syne（700/800）、Space Grotesk（500/700）、JetBrains Mono（700）。
- 主标题用 Syne 800，4rem，行高 1.05，字距 -0.03em。英文全大写，中文行为绿色，加 text-shadow: 4px 4px 0 #FF007F 形成错位重影。
- 正文与贴纸用 Space Grotesk。折面编号用 JetBrains Mono 0.72rem，格式「FOLD 01 // FRONT」。

四、交互与动效
- 按钮使用 transition: all 0.15s，带有抬起和按压的手感。
- 点击卡片或 Hero 主按钮时，在 folded 与 unfolded 之间切换；背面的收起按钮要阻止事件冒泡。可选用回弹曲线 cubic-bezier(0.175,0.885,0.32,1.275) 0.6s。
- 点击生成按钮后，文本缩放到 0.95，150ms 后随机替换为另一条预置创意，再恢复到 1。
- 在 prefers-reduced-motion: reduce 下取消位移与过渡。

五、内容板块（示例，可按业务替换）
- 页眉：左侧绿色品牌贴「{{品牌/产品名}} // ACID LAB」，右侧粉色徽章「★ NO RULES ★」。
- 潮流 Hero：两张小贴纸、两行大标题（英文口号 + 中文高亮行）、一句副文和两个按钮（主按钮为绿色，用来展开卡片）。
- 折纸卡片：正面是能力标题、提示语和两枚迷你标签，背面是被解锁的能力详情和收起按钮。
- 随机灵感生成器：标题、一条创意文本和一个「BOMB ANOTHER IDEA」按钮，内置 4 条以上跨界创意。
- 页脚：一行大写小字（{{品牌/产品名}} // ACID ORIGAMI）。
```
