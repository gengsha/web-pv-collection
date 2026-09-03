# 风格构成说明：上元千灯 · 霓虹灯市 (Lantern Thousand Nights)

## 1. 风格概述 (Style DNA)
* **核心理念**：以「上元节灯会」为意象的深色暖调夜景美学。Qwen 被拟喻为照进人间烟火的那盏光——“一灯答一问，千灯照长夜”。技术的宏大叙事被转译为灯市的微观温情：每一个问题都是一盏被点亮的天灯。
* **视觉情绪**：温暖、节庆、有呼吸感的高级灯市夜景。夜青底色压住浮躁，多层暖金光晕（灯身内透光、远景 bokeh、canvas 天灯）营造浓郁而不艳俗的灯火氛围。
* **适用场景**：AI 助手个人主页、节庆主题官网、情感化产品落地页、城市文化/文旅数字展厅。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础夜色 */
  --night-ink: #0B0E1F;            /* 夜青底：页面主背景 */
  --night-ink-deep: #070912;       /* 夜空顶部加深 */
  --mountain-indigo: #1B2447;      /* 远山黛：近景山峦/卡片底色 */
  --mountain-shadow: #131A36;      /* 远山剪影更深一层 */

  /* 灯火暖色三阶 */
  --lantern-gold: #FFB84D;         /* 灯暖金：主强调色、数字与标题光 */
  --candle-orange: #FF8A3D;        /* 烛橙：渐变过渡、按钮与光晕 */
  --cinnabar-red: #E5484D;         /* 朱砂红：灯帽、幌子、节庆点缀 */

  /* 文本层级 */
  --moon-white: #FFF3E0;           /* 月光白：高亮文本 */
  --text-dim: #B8A98F;             /* 弱文本：正文与说明 */
  --text-faint: #7C7059;           /* 更弱的辅助信息 */

  /* 表面与光边 */
  --bg-stall: rgba(27, 36, 71, 0.5);
  --border-warm: rgba(255, 184, 77, 0.18);
  --border-warm-strong: rgba(255, 184, 77, 0.5);
  --glow-gold: rgba(255, 184, 77, 0.28);
  --glow-orange: rgba(255, 138, 61, 0.32);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=ZCOOL+QingKe+HuangYou&display=swap" rel="stylesheet">
  ```
* **展示大字 (Display)**：`ZCOOL QingKe HuangYou`（仅 400 字重），用于主标题、板块 H2、灯笼题字与摊位招牌——字形硬朗带雕版气，天然适配「匾额/幌子」语境，字距 `0.04em~0.12em`。
* **正文 (Body)**：`Noto Sans SC` 400/500/700，行高 `1.7~1.8`，颜色 `--text-dim`，承担所有叙述性文案。
* **数据/遥测 (Mono)**：`IBM Plex Mono` 500/700，用于今夜灯况数字、摊位编号徽章、时间戳，与暖色形成「理性账本 × 人间烟火」的反差。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **灯笼构件（纯 CSS，无图片）**：灯身为椭圆（`border-radius: 50% / 54%`）径向渐变 `#FFD9A0 → #FFB84D → #FF8A3D`，上下为朱砂红灯帽，底部流苏；内透光由 `::after` 高斯光核 + `box-shadow` 双层暖晕实现，并以 `corePulse` 呼吸脉动：
  ```css
  .lantern-body {
    border-radius: 50% / 54%;
    background: radial-gradient(ellipse at 50% 42%, #FFD9A0 0%, #FFB84D 36%, #FF8A3D 68%, #C2402E 100%);
    box-shadow: 0 0 34px rgba(255, 184, 77, 0.5), 0 0 90px rgba(255, 138, 61, 0.28),
      inset 0 -14px 30px rgba(150, 30, 20, 0.45), inset 0 10px 22px rgba(255, 243, 224, 0.3);
    animation: lanternBreathe 3.8s ease-in-out infinite;
  }
  ```
* **远景层峦 + 明月**：页面底部固定两层 `preserveAspectRatio="none"` 的 SVG 波浪山峦（`#131A36` / `#1B2447`），右上悬一轮月光白明月（双层 `box-shadow` 光晕）；地平线处一道暖橙 `radial-gradient` 暗示「灯市在下方开市」。
* **灯市摊位卡片**：暖光描边（`--border-warm`）+ 顶部朱砂×暖金条纹雨棚（`::before` `repeating-linear-gradient`）+ 以两根细线「悬挂」的招牌式标题（`--font-display` + 朱砂半透明底），悬停时上浮并增强暖光投影。
* **串灯光点**：一排 7px 发光圆点交替错落（奇数点下移 7px），错相位 `twinkle` 闪烁，模拟檐下灯串。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **天灯升空粒子系统（Canvas，核心亮点）**：暖色发光点自画面底部缓缓升起，速度 `7~24px/s` 按景深分级；水平方向做正弦摇摆（振幅 5~22px，周期约 7~18s），亮度随 `flicker` 相位轻微闪烁；景深越远半径越小、透明度越低（“远处变小变暗”）。用户「点灯」后生成一盏大号带字天灯：竖排书写心愿文字，`36~46px/s` 升起，入场 0.9s 淡入、接近天顶渐隐，底部同步迸发一小簇金色火花。
* **悬挂灯笼摆动**：`transform-origin: top center`，`rotate(-3deg) → rotate(3deg)`，`ease-in-out alternate`，周期 3.8~5.4s 错相位，模拟无风夜里的轻摆。
* **灯光暖晕呼吸**：灯身与「最暖一问」卡片的 `box-shadow` 以 3.8~4.2s 周期脉动，光晕半径与强度同步涨落，如烛焰呼吸。
* **数字滚动计数**：今夜灯况数字经 `IntersectionObserver` 触发，`1 - (1-p)^3` 缓动 1.6s 滚至目标值。
* **过渡贝塞尔曲线**：`cubic-bezier(0.22, 1, 0.36, 1)`（轻快起步、柔和落定），明月与山峦随光标做 ±16px 视差。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT-4o, DeepSeek, Qwen）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【上元千灯 · 霓虹灯市 (Lantern Thousand Nights)】风格，为 Qwen（通义千问）生成一个个人主页单页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

主题文案基调：上元节灯会，Qwen 是照进人间烟火的那盏光——“一灯答一问，千灯照长夜”。文案需有人间烟火气。

设计要求：
1. 视觉底色：夜青夜空 (#0B0E1F) 纵向渐深，页面底部固定多层山峦剪影 (#131A36 / #1B2447) 与一轮月光白明月 (#FFF3E0)，地平线处有灯市暖光晕染，辅以多层暖光 bokeh。
2. 核心氛围：Canvas 天灯粒子系统——暖色发光天灯 (#FFB84D / #FF8A3D / #E5484D) 自画面底部缓缓升起，带正弦摇摆与亮度闪烁，景深越远越小越暗。
3. 构件体系：纯 CSS 灯笼（椭圆径向渐变灯身 + 朱砂红上下帽 + 流苏，内透光 box-shadow 呼吸脉动，transform-origin: top 的 ±3° 悬挂摆动）；灯市摊位卡片（暖光描边、条纹雨棚、两根细线悬挂的招牌式标题）；串灯光点（错相位闪烁）。
4. 字体层次：ZCOOL QingKe HuangYou 作展示大字与招牌，Noto Sans SC 400/500/700 作正文，IBM Plex Mono 作遥测数字与徽章。
5. 核心板块：
   - Hero：一盏 CSS 大灯笼 + 主旨「一灯答一问，千灯照长夜」+ 串灯装饰
   - 灯市摊位能力区：对话摊、代码摊、丹青摊、百译摊四张卡片
   - 今夜灯况遥测：今夜已答问题数、点亮城市数、灯市暖度（数字滚动动画）+ 「今夜最暖一问」暖光卡片
   - 点灯许愿交互区：用户写下问题/心愿后，生成一盏带字天灯自屏幕底部升起，并许下灯笺
   - 页脚：Qwen Personal Site · Preset 04 Lantern Thousand Nights
6. 动效要求：灯光暖晕呼吸（box-shadow 脉动）、卡片悬停暖光增强、明月山峦轻微视差、交互按钮点灯反馈。
```
