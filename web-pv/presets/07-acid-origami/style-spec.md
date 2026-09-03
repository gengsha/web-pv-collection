# 风格构成说明：酸性折纸·高能多维展开 (Acid Dimensional Origami)

## 1. 风格概述 (Style DNA)
* **核心理念**：代表年轻创作者、前卫潮流与打破常规维度的爆发力。采用高饱和酸性撞色（荧光酸绿、电光粉、数码青）与 CSS 3D 折纸空间展开动效。
* **视觉情绪**：先锋、叛逆、高能量、多维折叠、潮流创意。
* **适用场景**：AI 创意工作室、青年艺术家、潮流创作者个人主页、黑客松展台。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 冲击底色 */
  --acid-bg: #0f1015;
  --acid-surface: #1a1c24;
  
  /* 高能酸性三原色 */
  --acid-lime: #ccff00;
  --acid-pink: #ff007f;
  --acid-cyan: #00ffff;
  
  /* 文本与边框 */
  --acid-text-light: #ffffff;
  --acid-border-raw: 2px solid #000000;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Syne`, 800 极粗，配合倾斜角度（Skew / Rotate）。
* **贴纸标签**：`Space Grotesk`, 700 纯大写高对比标签。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **贴纸排版 (Sticker Layout)**：
  标签与构件带有随机的微角度倾斜（`transform: rotate(-2deg)`）、厚黑边与硬阴影（`box-shadow: 4px 4px 0 #000`）。
* **3D 折叠面 (Origami Flaps)**：
  卡片运用 `transform-style: preserve-3d` 与 `perspective: 1000px`，交互时展开多维折面。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **弹性阻尼展开**：点击卡片时，折面以弹簧曲线（Spring Curve）平滑展开并露出内部隐藏的创造者工具箱。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【酸性折纸·高能多维展开 (Acid Dimensional Origami)】风格生成 Gemini 潮流先锋个人主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉基调：深冷炭黑底 (#0F1015)，高饱和酸橙绿 (#CCFF00) 与电光粉 (#FF007F) 撞色，黑色硬投影与粗黑描边。
2. 排版构件：使用 Syne / Space Grotesk 字体，大倾斜角度贴纸排版，带有粗粝潮流贴纸和折痕。
3. 3D 折纸机制：使用 CSS 3D 与 transform 制作可展开/折叠的多层卡片。
4. 核心板块：
   - 潮流酸性 Hero（大字标、旋转贴纸、爆破光斑）
   - 3D 折纸创作者实验模块（折纸卡片交互展示）
   - 灵感爆发生成器（点击生成跨界潮流创意）
```
