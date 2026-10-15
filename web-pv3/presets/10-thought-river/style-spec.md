# 风格构成说明：思维长河·推理流光 (Thought River · Reasoning Stream)

## 1. 风格概述 (Style DNA)
* **核心理念**：将 GLM 5.3 的长思维链可视化为一条夜色中的大河——令牌是水流，推理是河床，六块步石踏出一道完整思维链。流光所至，答案自成。
* **视觉情绪**：绵长、静谧而奔涌、金波夜色、深度思考的仪式感。
* **适用场景**：推理能力展示、深度研究产品页、思维链可视化、AI 哲学叙事主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 夜河体系 */
  --river-night: #050e19;
  --river-deep: #030a12;

  /* 流光体系 */
  --current-gold: #f0d387;
  --stream-cyan: #3fd9e8;
  --foam: #eaf6fa;

  /* 河岸体系 */
  --bank: #14263a;
  --bank-dim: #0d1b2b;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **河题 (Display)**：`Outfit` 700 + `Noto Sans SC` 700 组合，大字「思如长河」，字间距 0.04em。
* **正文 (Body)**：`Noto Sans SC` 300，细而绵长。
* **令牌 (Token Mono)**：`JetBrains Mono`，令牌碎片、流速、河长指标。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **令牌流河 (Token River)**：全宽 `<canvas>` 横贯页面中部——发光令牌粒子（金 #F0D387 / 青 #3FD9E8，约 8% 为汉字令牌「思/流/光/推/理」）沿正弦波自左向右奔流，拖尾 6px 渐隐。
* **步石 (Step Stones)**：六枚椭圆石（`border-radius: 42%`）横跨河面，石间以流动虚线电流（`background: linear-gradient` + `animation` 位移动画）相连；激活石为金色辉光。
* **河岸 (Riverbank)**：页面上下两端以 `--bank` 色斜切收边（`clip-path: polygon`），如立于堤上看河。
* **反射 (Reflection)**：金色标题下方置倒影（`transform: scaleY(-1)` + `mask-image` 渐隐）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **奔流 (Flow)**：粒子速度随 X 位置微变（流速线），整体 60fps 顺滑。
* **踏石点亮 (Stone Lighting)**：滚动进度依次点亮六石——理解 → 拆解 → 检索 → 推演 → 校验 → 作答，每石点亮伴随一次金色脉冲。
* **涟漪 (Ripple)**：点击河面任意处泛起 2~3 圈扩散金环（`r` 递增 + 透明度递减）。
* **指尖拨水 (Finger Sweep)**：鼠标掠过河面，近处粒子受垂向斥力偏转，离开后弹性回位。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【思维长河·推理流光 (Thought River · Reasoning Stream)】风格生成一个关于 GLM 5.3 的「深度思考者」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：夜河深蓝 #050E19 至 #030A12；全宽 Canvas 令牌流河横贯页面——发光粒子（金 #F0D387 / 青 #3FD9E8，约 8% 为汉字令牌）沿正弦波自左向右奔流，带 6px 拖尾渐隐。
2. 核心构件：六枚步石横跨河面（理解 → 拆解 → 检索 → 推演 → 校验 → 作答），石间流动虚线电流相连；河岸以 #14263A 斜切收边；金色标题带 scaleY(-1) 倒影。
3. 字体排版：Outfit 700 + Noto Sans SC 700 大标题，Noto Sans SC 300 正文，JetBrains Mono 令牌与流速指标。
4. 核心板块：
   - Hero：「思如长河，昼夜不废」+ 倒影 + 河况指标条（河长 200K · 流速 128 tok/s · 六步成答）
   - 思维链步石区：随滚动逐一点亮六石并显示各步注解
   - 河岸对话台：输入如投石，回复如涌流
5. 动效要求：粒子正弦奔流、鼠标掠河产生垂向斥力偏转、点击河面泛起金色涟漪扩散环、步石逐一点亮并金色脉冲。整体静水深流，克制而绵长。
```
