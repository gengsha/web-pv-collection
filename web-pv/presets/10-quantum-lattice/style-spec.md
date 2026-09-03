# 风格构成说明：量子矢量·拓扑网阵 (Quantum Vector & Lorentz Matrix)

## 1. 风格概述 (Style DNA)
* **核心理念**：回归纯粹的算法之美与数学真理。以动态量子力场、3D 洛伦兹吸引子（Lorenz Attractor）、拓扑流形与精密矢量坐标为骨架。
* **视觉情绪**：严密逻辑、量子算力、数学纯美、终极秩序。
* **适用场景**：量子计算、密码学、深度科学计算、数理研究主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 运算底色 */
  --quantum-bg: #090a0f;
  --quantum-surface: rgba(18, 20, 30, 0.7);
  
  /* 矢量光轨色 */
  --quantum-blue: #60a5fa;
  --quantum-purple: #c084fc;
  --quantum-laser: #ffffff;
  
  /* 标尺与微光 */
  --quantum-grid: rgba(96, 165, 250, 0.12);
  --quantum-glow: 0 0 16px rgba(96, 165, 250, 0.4);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题与数据**：`Plus Jakarta Sans` 与 `JetBrains Mono`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **3D 洛伦兹吸引子 Canvas (Lorenz Attractor)**：
  在三维空间中实时计算常微分方程组并投影绘制双翼混沌吸引子。
* **精密标尺角标**：
  卡片四角带有 `[x: 42.00, y: 18.24]` 风格的拓扑坐标标注。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **引力场鼠标引力**：光标移动时在引力场中引发局部流线偏转。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【量子矢量·拓扑网阵 (Quantum Vector & Lorentz Matrix)】风格生成 Gemini 量子算力与数学美学主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉基调：精密碳素黑 (#090A0F)，超导银蓝 (#60A5FA) 与量子纠缠紫 (#C084FC) 矢量线条。
2. 动态数学场：使用 HTML5 Canvas 实时渲染动态三维洛伦兹吸引子（Lorenz Attractor）微粒力场。
3. 几何与标尺：卡片具备 1px 精细线框与拓扑坐标标注（[RA: 37.42, DEC: -122.08]）。
4. 核心板块：
   - 量子力场 Hero（数学常微分方程、吸引子动态旋转）
   - 量子张量算力核心三维矩阵
   - 交互式引力场参数调节器
```
