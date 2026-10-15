# 风格构成说明：亿万词长河 · 百万词元长河 (Long River of Tokens)

## 1. 风格概述 (Style DNA)
* **核心理念**：将 Qwen（通义千问）的百万级超长上下文拟喻为一条奔流不息的墨色长河——从《易经》《楚辞》的源头，一路流经汉唐诗词、宋元史鉴、工业与信息时代，直至量子论文的深空河口。一屏读尽，一口饮尽。
* **视觉情绪**：沉静、渊博、川流不息；暗色河面上的粼粼波光与金砂细线，营造"古籍 × 长上下文工程"的双重质感。
* **适用场景**：长上下文能力主页、知识库/检索产品官网、人文气质 AI 品牌页、阅读与文献类产品。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础背景：深墨 -> 河面青 纵向渐变 */
  --ink-deep: #060A0C;
  --river-teal: #0E2A2E;
  --surface-glass: rgba(9, 22, 26, 0.58);
  --surface-deep: rgba(4, 10, 12, 0.72);

  /* 河光三色 */
  --glint-cream: #E8DFC8;   /* 文字波光（暖白） */
  --glow-cyan: #7FD8D0;     /* 高亮青（命中/交互） */
  --gold-sand: #D9B36C;     /* 金砂（分隔线/时代标签） */

  /* 文本层级 */
  --text-main: #DFE8E6;
  --text-faint: #64797A;

  /* 边框与辉光 */
  --border-water: rgba(127, 216, 208, 0.16);
  --border-water-strong: rgba(127, 216, 208, 0.42);
  --border-gold: rgba(217, 179, 108, 0.38);
  --glow-cyan-soft: rgba(127, 216, 208, 0.22);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Noto Serif SC` 900，宋体刀锋质感，字距微收 `0.02em`；关键词用「波光渐变」剪裁（`#E8DFC8 -> #7FD8D0 -> #D9B36C`）。
* **正文 (Body)**：`Noto Serif SC` 400/600，行高 `1.7`，颜色 `--text-main`，弱化说明用 `--text-faint`。
* **数据/代码 (Mono)**：`JetBrains Mono` 400/500，用于巨字 `1,000,000`、词元坐标、终端日志与时代纪年。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **Canvas 文字长河（全页灵魂）**：全屏固定 `canvas` 位于 `z-index: 0`，数十个汉字（江河诗词）与英文词元（token / attention…）分远中近三层横向漂移，正弦上下浮动 + 透明度明灭模拟波光，另有一层更快的"高光细线"粒子横掠水面。
  ```css
  .river-canvas { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
  .river-veil  { position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background: linear-gradient(180deg, rgba(6,10,12,.42), rgba(6,10,12,.12) 42%, rgba(14,42,46,.34)); }
  ```
* **临水玻璃卡片**：
  ```css
  background: rgba(9, 22, 26, 0.58);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(127, 216, 208, 0.16);
  border-radius: 18px;
  box-shadow: 0 20px 44px -18px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(232, 223, 200, 0.07);
  ```
* **细金分隔线**：板块之间以 1px 金砂渐变断水。
  ```css
  .gold-divider { height: 1px; border: 0;
    background: linear-gradient(90deg, transparent, rgba(217,179,108,.55), transparent); }
  ```
* **时代卷轴**：`overflow-x` 横向滚动 + 边缘 `mask-image` 淡出，卡片 `min-width: 264px`，中心帧 `.is-center` 轻微放大 1.045 并点亮金边；隐藏原生滚动条，以"拖拽 / 滚轮"提示代偿。
* **命中浮标 (find-toast)**：青金玻璃小签，锚定在被点亮字符上方，`translate(-50%,-100%)` 弹出。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **河水恒流**：`requestAnimationFrame` 驱动；字符速度随层级 8~46px/s，垂直 `sin(t·freq + phase)` 浮动 3~12px，透明度以独立频率明灭，形成"波光粼粼"的三层景深。
* **时代卷轴物理**：鼠标按住拖拽（Pointer Events），滚轮纵向增量映射为横向位移；`scroll` 事件经 rAF 节流后计算离中心最近的卡片并放大。
* **大海捞针（戏剧性检索）**：输入关键词 -> 全河微暗（其余字符降透明度）-> 一道青色光柱自左向右扫过 -> 命中字符骤然点亮（辉光放大 1.9 倍）-> 水面激起椭圆涟漪 -> 浮标弹出"在 874,203 词元处找到"。
* **水滴涟漪**：点击页面任意水面，Canvas 绘制扁平椭圆涟漪（`r, r*0.42`），ease-out 扩散并衰减。
* **过渡贝塞尔曲线**：`cubic-bezier(0.22, 1, 0.36, 1)`（河水推浪般的先急后缓）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT-4o, DeepSeek, Qwen）即可生成同款风格页面：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【亿万词长河 · Long River of Tokens】风格，为 Qwen（通义千问）生成一个展示百万词元超长上下文的个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 视觉底色：深墨 #060A0C 到河面青 #0E2A2E 的纵向渐变；全屏 Canvas 绘制"文字长河"：数十个汉字（先秦诗词、江河名句）与英文词元（token / attention / context…）分远中近三层横向漂移，带正弦上下浮动与透明度明灭模拟波光，并叠加一层快速横移的高光细线表现水面粼光。
2. 色彩体系：文字波光 #E8DFC8、高亮青 #7FD8D0、金砂 #D9B36C；正文 #DFE8E6、弱文本 #64797A；板块之间使用 1px 金色渐变细分隔线；卡片为深青毛玻璃（backdrop-filter: blur(18px)，青灰细边框）。
3. 字体层次：标题 Noto Serif SC 900（宋体刀锋感），正文 400/600，数据与日志用 JetBrains Mono 400/500。
4. 核心板块：
   - Hero："亿万字为河，一眼见底" + 1,000,000 Tokens 巨字（入场计数动画）与源流遥测条
   - 时代长卷：先秦→汉唐→宋元→明清→工业时代→信息时代→深空时代的横向滚动卡片列（每帧一个时代 + 代表典籍），支持拖拽与滚轮横移，中心帧轻微放大
   - 大海捞针演示台：输入关键词（如"烛之武"）后，长河中对应字符被光柱扫描并点亮，弹出"在 xxx,xxx 词元处找到"提示，伴随涟漪
   - 河况数据：整河词元 / 一次可读页数 / 等效朗读时长三张数据卡
5. 动效要求：河水以 requestAnimationFrame 恒久流动；点击页面任意处泛起椭圆水面涟漪；所有过渡使用 cubic-bezier(0.22, 1, 0.36, 1)；页脚署名 "Qwen Personal Site · Preset 07 Long River of Tokens"。
```
