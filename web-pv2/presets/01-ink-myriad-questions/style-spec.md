# 风格构成说明：墨海千问 · 文人水墨长卷 (Ink Myriad Questions · Literati Ink-Wash Long Scroll)

## 1. 风格概述 (Style DNA)
* **核心理念**：以通义千问（Qwen）的文人气质为魂——一轴宣纸长卷，以墨为思、以朱砂为心。Qwen 是书斋中那位"问遍经史子集"的学者：博学之、审问之、慎思之、明辨之、笃行之。
* **视觉情绪**：亮色系水墨、宣纸暖调、古雅而灵动、书卷气与一点朱砂的郑重。
* **适用场景**：AI 个人主页、文化气质产品官网、知识阅读品牌、东方美学展示页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 纸底 */
  --paper-white: #F5F1E6;   /* 宣纸白：页面基底 */
  --paper-aged: #EDE6D6;    /* 陈纸：卡片与卷面 */
  --paper-deep: #E4DBC6;    /* 深陈纸：绫边与头栏 */

  /* 墨系 */
  --ink-black: #1A1A1A;     /* 松烟墨：主文字 */
  --ink-gray: #55524A;      /* 墨灰：次级文字 */
  --ink-faint: #8C877A;     /* 淡墨：辅助与落款 */

  /* 印与缀 */
  --seal-red: #B03A2E;      /* 印章朱砂：主行动色 */
  --seal-red-deep: #96291E; /* 朱砂悬停加深 */
  --dai-cyan: #5C7A78;      /* 黛青：点缀与标签 */

  /* 边框与投影 */
  --border-ink: rgba(26, 26, 26, 0.18);
  --border-ink-faint: rgba(26, 26, 26, 0.09);
  --shadow-paper: 0 14px 32px -20px rgba(26, 26, 26, 0.4);
  --shadow-paper-hover: 0 26px 48px -22px rgba(26, 26, 26, 0.5);
  --shadow-seal: 0 8px 18px -6px rgba(176, 58, 46, 0.55);

  /* 圆角与动效 */
  --radius-card: 8px;
  --radius-seal: 9px;
  --ease-scroll: cubic-bezier(0.22, 1, 0.36, 1); /* 卷轴缓展曲线 */
  --transition-smooth: 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;600;900&display=swap" rel="stylesheet">
  ```
* **书法展示 (Display)**：`Ma Shan Zheng`（仅 400），用于 Hero 大字、印章文字、竖排侧批与题答墨迹，字距 `0.08em` 以上，求笔意疏朗。
* **标题 (Heading)**：`Noto Serif SC` 900/600，字距 `0.1em` 左右，庄重而不板滞。
* **正文 (Body)**：`Noto Serif SC` 400，行高 `2.0` 上下，字距 `0.05em`，颜色 `--ink-gray`，如抄录经卷。
* **竖排系统**：侧批、挂轴数据一律 `writing-mode: vertical-rl`，自上而下、自右而左，合传统阅读序。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **背景三层法则（必须分层）**：
  1. 纸底：`body` 以宣纸白为基，叠数道极淡的黛青/淡墨/朱砂 `radial-gradient` 墨晕；
  2. 宣纸噪点：内联 SVG `feTurbulence` data-URI 平铺，`mix-blend-mode: multiply`；
  3. 动态层：Canvas 缓慢漂浮的淡墨颗粒与飞白笔触。

  ```css
  .paper-noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.42 0 0 0 0 0.4 0 0 0 0 0.34 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23paperNoise)'/%3E%3C/svg%3E");
    opacity: 0.5;
    mix-blend-mode: multiply;
  }
  ```
* **墨晕光团 (Ink Wash Orbs)**：三个超大 `radial-gradient` 圆斑（黛青、淡墨、朱砂），`filter: blur(70px)`，以不同周期缓慢漂移，如淡墨在纸上洇开。
* **印章构件 (Seal)**：朱砂圆角方块 + 白色书法字，`writing-mode: vertical-rl` 使双字竖排如真印；内叠高光与噪点、内阴影模拟印泥厚度。
  ```css
  .seal {
    display: inline-flex; align-items: center; justify-content: center;
    writing-mode: vertical-rl;
    font-family: 'Ma Shan Zheng', serif;
    color: #F7F3E8;
    background-color: var(--seal-red);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: var(--radius-seal);
    box-shadow: var(--shadow-seal), inset 0 0 8px rgba(150, 41, 30, 0.5);
  }
  ```
* **陈纸卡片 (Paper Card)**：陈纸渐变底、细墨线边框、纸影；右下角以 `::after + attr(data-char)` 埋一枚巨大淡水印字（经/史/子/集），悬停时水印泛起朱砂色。
* **挂轴数据卡 (Scroll Card)**：`writing-mode: vertical-rl`，顶部 `::before` 作深木色天杆，整卡如悬轴。
* **细墨线分隔**：`height: 1px` 的两端透明渐变横线，代替一切粗重分割。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **墨粒长卷 (Canvas)**：淡墨颗粒与飞白长笔触以极低透明度（0.02~0.14）缓慢漂移、轻微正弦摆动，透明度随呼吸周期脉动，如空中浮墨。
* **卷轴入场 (Scroll Reveal)**：区块初始 `clip-path: inset(0 100% 0 0)` + `filter: blur(9px)` + 低透明，进入视口后横向 mask 徐徐展开、文字由晕染变清晰（水墨入水感），过渡曲线 `--ease-scroll`。
* **印章下压 (Stamp Press)**：印章悬停即"盖章下压"——`translateY(3px) scale(0.93)`、投影收紧、朱砂加深为 `#96291E`；点击触发 `stampPress` 关键帧（扬起—压下—回稳，弹性回弹）。
* **毛笔题答**：回答逐字以 `inkCharIn`（模糊放大 → 清晰落笔）显现，遇句读停顿更久，模拟运笔节奏；墨点光标以 `brushBlink` 闪烁。
* **通用微交互**：卡片悬停上浮 + 水印变色；按钮悬停加深/浮起、按下回落；导航链接悬停自中央洇出朱砂细线。
* **缓动基准**：`cubic-bezier(0.22, 1, 0.36, 1)`（快起缓收，如笔锋提按）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek、Qwen）即可生成同款风格页面：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【墨海千问 · 文人水墨长卷 (Ink Myriad Questions · Literati Ink-Wash Long Scroll)】风格，为通义千问（Qwen，阿里巴巴大模型）生成一个文人气质的个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 视觉基调：亮色系水墨。宣纸白 #F5F1E6 为底，用内联 SVG feTurbulence data-URI 铺宣纸噪点（mix-blend-mode: multiply），叠加黛青 #5C7A78 / 淡墨 / 朱砂的超大径向渐变墨晕（blur 70px 缓慢漂移），并用 Canvas 绘制缓慢漂浮的淡墨颗粒与飞白笔触——背景必须分为"纸纹理 + 淡墨渐变 + 动态墨粒"三层。
2. 色彩体系：宣纸白 #F5F1E6、陈纸 #EDE6D6、松烟墨 #1A1A1A、墨灰 #55524A、淡墨 #8C877A、印章朱砂 #B03A2E（悬停加深 #96291E）、黛青 #5C7A78。
3. 字体层次：Google Fonts 引入 Noto Serif SC（400/600/900）作正文与标题，Ma Shan Zheng 书法体作 Hero 大字、印章文字与题答墨迹。
4. 核心构件：朱砂印章（圆角方块 + 白色书法字 + writing-mode: vertical-rl 竖排，如「千問」「通義」）；竖排侧批与挂轴式数据卡；细墨线分隔线；陈纸色卡片（右下角淡水印字，悬停泛朱砂）。
5. 核心板块：
   - Hero 书法大字「问千问，问道于一」+ 大印「千問」与竖排批注
   - 经史子集四部能力卡（对话 / 代码 / 视觉 / 多模态）
   - 卷末题跋：上下文长度、模态、语言等数据以竖排挂轴卡呈现
   - 问答题字交互区：用户输入一句问题，Qwen 以毛笔字风格流式逐字"题答"（前端模拟，随机抽取数条风雅回答）
   - 页脚钤印一排
6. 动效要求：区块入场如卷轴徐徐展开（clip-path 横向 mask + 文字由模糊晕染变清晰）；印章悬停"盖章下压"（scale + 阴影）；所有卡片与按钮均有悬停微交互；缓动曲线 cubic-bezier(0.22, 1, 0.36, 1)。
7. 文案气质：围绕千问 / 通义 / 博学笃问展开，古雅而不呆板，中文为主。
```
