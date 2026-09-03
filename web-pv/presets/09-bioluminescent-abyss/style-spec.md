# 风格构成说明：深海冷光·发光仿生 (Bioluminescent Abyss Ecology)

## 1. 风格概述 (Style DNA)
* **核心理念**：深海 8000 米的生命涌现与未知智识。将超级 AI 庞大不可见但不断自我发光的认知神经，比喻为深海未知发光物种。
* **视觉情绪**：神秘、幽暗深邃、生物荧光、有机流动、自然涌现。
* **适用场景**：深度学习算法展示、生物计算、前沿未知探索主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 深海底色 */
  --abyss-deep: #020617;
  --abyss-black: #010409;
  --abyss-surface: rgba(8, 20, 44, 0.6);
  
  /* 生物冷光色阶 */
  --bio-cyan: #38bdf8;
  --bio-emerald: #34d399;
  --bio-coral: #fb7185;
  --bio-glow: 0 0 30px rgba(56, 189, 248, 0.4);
  
  /* 文本 */
  --text-biolight: #e0f2fe;
  --text-bio-dim: #7dd3fc;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **全站排版**：有机曲线容器与平滑现代无衬线体。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **水下焦散波纹 (Caustics Light Effect)**：
  背景层使用 Canvas 或 CSS 模拟微弱的光在水下折射的焦散微波。
* **发光冷光核**：
  卡片内部镶嵌呼吸明灭的生物冷光球。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **点击发光涟漪 (Bioluminescent Ripples)**：点击页面任意位置扩散一圈冷光水波。
* **水流轻推浮动**：卡片悬停时如浮游生物般缓慢漂移回弹。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【深海冷光·发光仿生 (Bioluminescent Abyss Ecology)】风格生成 Gemini 深海智能主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉基调：深海 8000 米渊黑底 (#020617 -> #010409)，搭配水母荧蓝 (#38BDF8) 与深海翡翠绿 (#34D399) 自发光。
2. 材质与动效：包含水下焦散光斑动效，点击页面触发一圈荧光水波涟漪，卡片具备有机圆角与内部发光冷光核。
3. 核心板块：
   - 深海渊底 Hero（神秘仿生大标题与深层感知指示器）
   - 深水多模态涌现矩阵卡片
   - 触角声波交互传感器
```
