# 风格构成说明：市井烟火·胡同手记 (Hutong Warmth · Daily Companion)

## 1. 风格概述 (Style DNA)
* **核心理念**：把 GLM 5.3 拉下神坛，写进胡同口的生活流水账——它是街坊四邻眼里「那家好使的 AI」，手账体、拍立得、便利贴，处处是体温。
* **视觉情绪**：温暖、亲切、手作感、唠家常、热汤热茶的人间气。
* **适用场景**：AI 助手产品页、社区型工具、生活向博客、陪伴类 App 官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 暖底体系 */
  --cream-paper: #fff6e9;
  --wall-warm: #fbeed8;

  /* 烟火体系 */
  --persimmon: #e8662c;      /* 柿子橙 */
  --brick-brown: #8a5a44;    /* 砖暖 */
  --ink-warm: #453326;       /* 墨暖 */
  --ink-soft: #7a6552;

  /* 菜蔬点缀 */
  --cucumber-green: #7ca98f;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **手写标题 (Display)**：`Ma Shan Zheng` 毛笔手书，用于「胡同口那家 AI」等大标题与拍立得手注。
* **正文 (Body)**：`Noto Sans SC` 400，亲切不端着。
* **时间戳 (Mono)**：`JetBrains Mono`，手账时间与街坊门牌号。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **拍立得 (Polaroid)**：白框相纸（内图区为渐变色块示意 + 手写注脚），外投影 `0 14px 30px -12px rgba(69,51,38,0.35)`，整体 `rotate(-3deg ~ 3deg)` 随机倾角；顶角贴半透明和纸胶带（`rgba(232,102,44,0.5)`，两端锯齿）。
* **便利贴 (Sticky Note)**：暖黄便签（`#FFF3C4`→`#FFE9A3` 微渐变），底部左右两枚折角 `::before/::after` 三角，字为手写体。
* **手绘虚线 (Hand Dash)**：`border-bottom: 2px dashed rgba(138,90,68,0.4)`，圆角 `border-radius: 2px`，如钢笔随手一划。
* **灯泡辉光 (Lamp Glow)**：页面右上角径向暖光（`radial-gradient(circle, rgba(232,102,44,0.18), transparent)`，500px），如巷口路灯常亮。
* **手账页 (Diary Page)**：左侧装订线（双细线）+ 日期戳 + 撕页毛边（底部 `mask` 波形）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **拍立得起身**：悬停 `rotate(0) + translateY(-8px)` 投影加深，如拾起相纸细看。
* **便利贴揭角**：悬停右上折角放大（`transform: scale(1.6)`），如要揭下便签。
* **手账追写**：输入框回车后，新条目以 `max-height 0→auto` + 淡入「写」入手账流。
* **汤汽袅袅 (Steam)**：对话回复区上方两缕 CSS 蒸汽（`blur(2px)` 圆点上升渐隐，3s 循环）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【市井烟火·胡同手记 (Hutong Warmth · Daily Companion)】风格生成一个关于 GLM 5.3 的「胡同街坊 AI」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：暖奶油纸 #FFF6E9，右上角常亮一盏巷口路灯径向暖光（柿子橙 18% 透明度）。
2. 色彩体系：柿子橙 #E8662C 主色、砖暖棕 #8A5A44、墨暖 #453326 正文、菜蔬绿 #7CA98F 点缀。
3. 核心构件：拍立得相纸卡（白框 + 随机倾角 + 顶角和纸胶带 + 手写注脚）；便利贴留言墙（暖黄渐变 + 底部双折角）；手账页（左侧双线装订 + 日期戳 mono）；手绘虚线分隔（2px dashed 圆角）。
4. 字体排版：Ma Shan Zheng 毛笔手书做标题与拍立得注脚，Noto Sans SC 正文，JetBrains Mono 时间戳门牌号。
5. 核心板块：
   - Hero：手写大字「胡同口那家 AI」+ 三张拍立得拼贴（帮老张修代码 / 陪王奶奶唠嗑 / 替小李改简历）
   - 今日手记：三条时间戳流水账（可回车追写新条目）
   - 邻里留言便利贴墙：四张街坊评语便签
   - 一日三餐时间轴：晨报 / 午研 / 晚记
   - 小卖部窗口对话框（回复时蒸汽袅袅）
6. 动效要求：拍立得悬停起身正视、便利贴揭角放大、手账条目 max-height 展开写入、对话区 CSS 汤汽循环上升。整体温度高于精度，亲切先于炫技。
```
