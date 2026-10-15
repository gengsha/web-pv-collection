# 风格构成说明：夜园月门·移步换景 (Moonlit Garden · Scenic Turns)

## 1. 风格概述 (Style DNA)
* **核心理念**：以苏州园林的「夜游」体验承载 GLM 5.3 的智能体叙事——每过一道月门，便见一景；每推进一步，智识便深入一层。移步换景，即 Agent 的任务分解。
* **视觉情绪**：静谧、深邃、月色清辉、园林哲思、可游可居的东方空间感。
* **适用场景**：AI 智能体平台、沉浸式作品集、文化体验页、冥想型工具官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 夜园体系 */
  --night-garden: #0b1410;
  --pond-deep: #060b09;
  --mist-veil: rgba(243, 237, 220, 0.06);

  /* 月色体系 */
  --moon-cream: #f3eddc;
  --moon-dim: #b9b39e;
  --moon-glow: rgba(243, 237, 220, 0.14);

  /* 园中点缀 */
  --moss: #3d5c4a;
  --lantern-amber: #d9a441;
  --jade: #7fb6a4;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;700&family=Ma+Shan+Zheng&display=swap" rel="stylesheet">
  ```
* **诗题 (Poetry Display)**：`Ma Shan Zheng` 毛笔手书，用于月门内的诗句与景题，`letter-spacing: 0.2em`。
* **正文 (Body)**：`Noto Serif SC` 300/400，细笔宋体如月下清谈。
* **景号 (Section Mark)**：`Noto Serif SC` 600 小字「一进 · 问」格式。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **月门 (Moon Gate)**：正圆构图（`aspect-ratio: 1; border-radius: 50%`），门环以 2px 月白双环线勾边，内部为发光的景深渐变（`radial-gradient` 由 `--moon-glow` 渐入夜色）。
* **远山剪影层 (Silhouette Layers)**：三层 `border-radius` 有机弧形色块（由深至浅 `#060B09 → #0B1410 → #12241B`），以 `translateZ` 分层视差。
* **花窗漏影 (Lattice)**：`background-image` 双向 `linear-gradient` 1px 线网（间隔 26px，12% 透明度），模拟窗棂漏月光。
* **步石 (Stepping Stones)**：页面右侧固定的椭圆石径（6 枚），随滚动逐一点亮为 `--lantern-amber`。
* **灯笼 (Lantern)**：椭圆暖光体（`radial-gradient` 琥珀），悬于月门一侧，`transform-origin: top` 轻摆。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **月呼吸 (Moon Breathing)**：月门辉光 6s 周期明暗（`opacity 0.75 ↔ 1`），如云过月。
* **游园视差**：鼠标位移驱动三层远山以 0.01 / 0.02 / 0.03 系数反向缓移，如举步观山。
* **步石点亮**：滚动进度映射 6 枚步石依次 `--moss → --lantern-amber`，并伴随轻微上浮。
* **灯笼夜摆**：`rotate(-3deg ↔ 3deg)` 4.5s 往复，悬停时摆幅增大。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【夜园月门·移步换景 (Moonlit Garden · Scenic Turns)】风格生成一个关于 GLM 5.3 的「智能体夜园」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：墨绿夜园 #0B1410 至深潭 #060B09 的纵向渐变；文字用月白 #F3EDDC 与月灰 #B9B39E。
2. 核心构件：月门正圆构图（border-radius: 50%，2px 月白双环勾边，内部 radial-gradient 景深辉光）；三层远山有机剪影（深浅递进色块）；花窗漏影（双向 1px linear-gradient 线网 12% 透明度）；右侧固定 6 枚椭圆步石。
3. 字体排版：Ma Shan Zheng 毛笔体作诗题景题，Noto Serif SC 300 细宋正文。
4. 核心板块（游园三进）：
   - 一进 · 问：月门内嵌 Hero 诗句「夜园深处，有一盏灯」
   - 二进 · 思：三景卡片——曲水流觞（多轮对话）、借景（检索增强）、移步换景（任务分解）
   - 三进 · 行：水榭对话台（灯笼辉光输入框）
5. 动效要求：月门辉光 6s 呼吸、鼠标三层视差、滚动步石逐一点亮为琥珀色 #D9A441、灯笼 4.5s 夜摆。整体氛围静谧克制，忌高饱和。
```
