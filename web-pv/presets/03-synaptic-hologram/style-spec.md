# 风格构成说明：神经突触·全息色散 (Synaptic Holo-Chroma Lab)

## 1. 风格概述 (Style DNA)
* **核心理念**：将超级 AI 的百亿参数认知网络具象化为一个高精度全息实验室。包含细密扫描线、棱镜光学色散、正交网格与动态神经突触光流。
* **视觉情绪**：赛博全息、生化计算、冷峻前沿、全维度感知实验室。
* **适用场景**：AI 实验室官网、计算生物学/神经科学可视化、多模态转译器。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色 */
  --holo-bg: #030712;
  --holo-surface: rgba(15, 23, 42, 0.75);
  --holo-grid-line: rgba(56, 189, 248, 0.08);
  
  /* 全息色阶 */
  --holo-cyan: #22d3ee;
  --holo-magenta: #e879f9;
  --holo-lime: #a3e635;
  --holo-gradient: linear-gradient(90deg, #22d3ee, #e879f9, #a3e635);
  
  /* 辉光与扫描线 */
  --glow-holo: 0 0 20px rgba(34, 211, 238, 0.35);
  --scanline-color: rgba(0, 0, 0, 0.3);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">
  ```
* **标题 (Heading)**：`Chakra Petch`, 700 机械切割感字体，带有全息 RGB 色散微抖动。
* **数据/编码 (Mono)**：`JetBrains Mono`, 500 等宽。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **全息扫描线与正交网格**：
  使用 CSS linear-gradient 创建 $2\text{px}$ 扫描线与 $30\text{px}\times30\text{px}$ 的蓝色正交网格。
* **神经突触连线网络 (Synaptic SVG Mesh)**：
  背景实时绘制带有渐变发光的 SVG 贝塞尔曲线，连接各个感知计算节点。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **色散扫描动画 (Holo Scan)**：页面定期掠过一道自上而下的全息激光扫描带。
* **节点激发反应**：悬停任一认知节点，相连的突触连线会爆发高能脉冲流光。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【神经突触·全息色散 (Synaptic Holo-Chroma Lab)】风格生成 Gemini 认知实验室代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：冷钛合金黑 (#030712)，叠加 CRT 扫描线和正交网格。
2. 色散与辉光：使用 Chakra Petch 字体与全息色彩渐变（青 #22D3EE、洋红 #E879F9、酸橙 #A3E635），卡片边缘带有全息 RGB 投影。
3. 突触网络：使用 SVG/Canvas 在背景动态渲染发光的神经突触流动网络。
4. 核心模块：
   - 全息抬头 HUD 仪表（含参数状态、突触激活率）
   - 多模态突触节点矩阵（文本感知元、视觉编码器、跨感官转译器）
   - 交互式突触脉冲触发器
```
