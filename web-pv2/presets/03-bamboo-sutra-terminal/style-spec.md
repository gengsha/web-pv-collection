# 风格构成说明：竹简代码经 · 亿万卷典籍终端 (Bamboo Sutra Terminal)

## 1. 风格概述 (Style DNA)

* **核心理念**：把 Qwen（通义千问）想象成一座"古今同轴"的数字化典籍库——先秦竹简与等宽代码编联在同一根韦编轴上，古文与 token 流在同一屏对勘注疏。读万卷，答千问。
* **视觉情绪**：深邃、古朴、庄重、带书卷气的"暗色典籍终端"，既古又新。
* **适用场景**：AI 个人主页、语料库/典籍展示、东方美学科技站点、知识库产品官网。
* **关键词**：竹简材质 · 韦编缝合 · 青铜双线框 · 朱批印章 · 玉青注记 · 等宽数据流。

---

## 2. 色彩令牌 (:root CSS 变量)

```css
:root {
  /* 基底 · 深檀暗色 */
  --bg-deepest: #100C08;
  --bg-panel: #1A140D;
  --bg-terminal: #15100A;
  --bg-surface: rgba(26, 20, 13, 0.72);

  /* 主色 · 竹黄与古铜 */
  --bamboo: #C9A063;          /* 竹黄 · 主强调 */
  --bamboo-bright: #E4C98F;   /* 浅竹黄 · 高亮/数字 */
  --bronze: #8A6B3F;          /* 古铜 · 框线/编绳 */
  --bronze-deep: #5A4425;     /* 深古铜 · 滚动条/阴影 */

  /* 点缀 */
  --jade: #6FA287;            /* 玉青 · 注记/存活态 */
  --jade-bright: #93C4AB;
  --vermilion: #B04A3A;       /* 朱批 · 印章/问句/连词 */
  --vermilion-bright: #D0705C;

  /* 文本层级 */
  --ink: #E8DCC0;             /* 主文本 · 绢帛白 */
  --ink-dim: #7A6A4F;         /* 弱文本 · 陈墨 */
  --ink-faint: #4A3D28;       /* 极弱 · 刻痕 */

  /* 边框 */
  --border-bronze: rgba(138, 107, 63, 0.4);
  --border-bronze-soft: rgba(138, 107, 63, 0.22);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Serif+SC:wght@600;900&display=swap" rel="stylesheet">
  ```
* **主标题 / 典籍 (Serif)**：`Noto Serif SC` 900，字距 `0.06em~0.12em`，用于 Hero 大字、节标题与简列竖排典籍；中文衬线自带碑刻感。
* **竖排典籍**：`writing-mode: vertical-rl; text-orientation: upright;` 衬线 600，列从右向左排布，字号 1.05rem、字距 `0.28em`。
* **数据 / 代码 / 日志 (Mono)**：`JetBrains Mono` 400/500/700，用于 token 标注、计数器、终端流、遥测与页脚。
* **正文**：`Noto Serif SC` 600，行高 `1.85` 以上，颜色 `--ink-dim` (#7A6A4F)。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **竹简列 (Bamboo Slip)**：细长竖条（约 66×420px），四层渐变叠加——顶部两个编绳穿孔（径向黑点）+ 横向明暗柱面 + 纵向纤维细纹 + 横向竹节带；底部叠加磨损暗化渐变，边缘内阴影模拟简缝：
  ```css
  .bamboo-slip {
    width: 66px; height: 420px; border-radius: 5px;
    background:
      radial-gradient(circle 3px at 12px 34px, rgba(0,0,0,.85) 98%, transparent),
      radial-gradient(circle 3px at calc(100% - 12px) 34px, rgba(0,0,0,.85) 98%, transparent),
      linear-gradient(90deg, rgba(0,0,0,.5) 0%, rgba(226,190,130,.14) 12%, rgba(0,0,0,.12) 46%, rgba(0,0,0,.55) 100%),
      repeating-linear-gradient(90deg, rgba(255,235,200,.045) 0 2px, transparent 2px 9px),
      repeating-linear-gradient(180deg, #2A2010 0 9px, #241A0C 9px 18px);
    box-shadow: inset 0 0 0 1px rgba(0,0,0,.55), inset 0 0 14px rgba(0,0,0,.55), 0 14px 22px -10px rgba(0,0,0,.8);
  }
  ```
* **韦编缝合**：整条书架轨道用一条横向斜纹编绳（`repeating-linear-gradient(105deg, #6E5230 0 5px, #4A3722 5px 10px)`）贯穿全部简列顶部，每简另有绳结块与双穿孔，形成"韦编"意象。
* **青铜边框 (Bronze Frame)**：`border: 3px double rgba(138,107,63,.55)`，配合 `::before / ::after` 在左上、右下各加一枚竹黄 L 形角饰，印章式不对称留白。
* **终端窗口**：三圆点标题栏（朱批 / 竹黄 / 玉青三色），等宽文件名 + `● LIVE` 状态（呼吸闪烁），本体 `#15100A` 深底、等宽日志流、自动滚底、细竹色滚动条。
* **背景材质**：深檀底 + 竖向竹丝噪点 + 极淡青铜/玉青双光斑缓漂 + 四角暗角晕影，营造灯下展卷氛围。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **打字机典籍流**：典籍句与 token 标注交替逐字吐入终端（典籍行慢速 ≈85ms/字，注记/代码行快速 ≈30ms/字），正文随流自动滚动，一轮结束清空重新开卷。
* **横向卷轴**：书架 `overflow-x`，滚轮纵向输入转横向位移，鼠标按住可拖拽（pointer events + setPointerCapture），简列逐列排开。
* **收卷展开入场**：简列 `transform-origin: top` + `scaleY(0.04 → 1.03 → 1)` 带回弹 keyframes，模拟展开卷册；每列错帧 90ms。
* **光标周期闪烁**：竹黄色块状光标以 `steps(1)` 约 1.06s 周期闪烁，出现在流式输出、注疏引擎与奏对回复末尾。
* **悬停微交互**：卡片/简列悬停上浮 4~6px 并泛竹黄边光；按钮悬停古铜外辉光。
* **过渡曲线**：`cubic-bezier(0.22, 1, 0.36, 1)`（展卷感：先快后缓，尾段柔和落定）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（Qwen / GPT / Claude 等），即可生成同款风格的 Qwen 个人主页：**

```markdown
你是一名顶级前端视觉架构师。请以【竹简代码经 · 亿万卷典籍终端 (Bamboo Sutra Terminal)】风格，为大模型"通义千问 Qwen"生成一个个人主页（纯原生 HTML + CSS + JS，单页三文件，禁止任何第三方库）。

创意设定：把 Qwen 想象成一座"古今同轴"的数字化典籍库——先秦竹简与等宽代码编联在同一根轴上。读万卷，答千问。

设计要求：
1. 色彩：深檀底 (#100C08 / #1A140D)；竹黄 #C9A063 主强调、古铜 #8A6B3F 框线、玉青 #6FA287 注记、朱批 #B04A3A 印章与问句、文本 #E8DCC0、弱文本 #7A6A4F。
2. 字体：Google Fonts 引入 Noto Serif SC (600/900) 作典籍标题与竖排文字，JetBrains Mono (400/500/700) 作数据与终端流。
3. 材质构件：竖向竹简列（细长条渐变竹纹 + 顶部编绳"韦编"缝合装饰 + 穿孔绳结）、竖排文字 (writing-mode: vertical-rl)、青铜双线边框 (border: 3px double) 加角饰、三圆点标题栏终端窗口。
4. 板块结构：
   - 顶部导航 + Hero（青铜徽记、主标"读万卷，答千问"，朱批印章块点缀，遥测条）
   - 注经终端：打字机流式交替输出《道德经》片段与 token 标注；右侧《论语》"学而不思则罔"被逐字点亮标注并输出语义解析
   - 语料库统计：经、史、子、集、代码、论文、百科的卷数与 token 数，数字滚动动画 + 进度条
   - 万卷横轴：竹简逐列排开，拖拽或滚轮横移，入场"收卷展开"动画
   - 问策控制台：输入问题，模拟古雅"奏对"逐字输出 + 页脚
5. 动效：打字机数据流、光标周期闪烁、收卷展开 keyframes (transform-origin: top, scaleY 回弹)、悬停上浮泛光；过渡曲线 cubic-bezier(0.22, 1, 0.36, 1)。
6. 文案须古雅，穿插真实典籍句（《道德经》《论语》《礼记》）；保证控制台零报错，并通过 390px / 768px 基础响应式。
```
