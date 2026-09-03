# 风格构成说明：双子对偶·极简阴阳分形 (Celestial Duality & Swiss Monolith)

## 1. 风格概述 (Style DNA)
* **核心理念**：呼应 Gemini 的“双生/对偶”哲学意象——理性与感性、代码逻辑与诗意生成、光明与黑暗的对称碰撞。
* **视觉情绪**：哲思、高反差、纯粹、瑞士国际排版网格、无声的智识张力。
* **适用场景**：AI 思想博客、架构师/艺术家个人主页、双模式创意作品集。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 理性极（Light Side） */
  --light-bg: #f8fafc;
  --light-surface: #ffffff;
  --light-text: #09090b;
  --light-muted: #71717a;
  --light-border: #e4e4e7;
  
  /* 感性极（Dark Side） */
  --dark-bg: #09090b;
  --dark-surface: #121215;
  --dark-text: #f8fafc;
  --dark-muted: #a1a1aa;
  --dark-border: #27272a;
  
  /* 对偶媒介点睛色 */
  --accent-dual-blue: #2563eb;
  --accent-dual-cyan: #06b6d4;
  
  /* 排版线宽 */
  --border-hairline: 1px;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Syne`, 800 超粗体, 负字间距 `-0.04em`。
* **正文 (Body)**：`Plus Jakarta Sans`, 400/500, 行高 `1.6`。
* **极客标注 (Mono)**：`JetBrains Mono`, 500 等宽。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **50/50 动态分屏构图**：
  页面主容器使用 flex 左右分屏，中轴线为 $1\text{px}$ 可拖拽分割把手（Split Handle）。
* **瑞士排版网格 (Swiss Grid)**：
  严格的无衬线与大字阶对比，极度克制，无杂乱渐变，使用极细的物理单线进行区域裁切。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **动态拖拽分割 (Dual Slider)**：鼠标拖拽中轴线可实时改变理智（白色）与感性（黑色）的占据比例。
* **反色光标跟随 (Difference Cursor)**：光标配有 `mix-blend-mode: difference` 圆环，在两极穿梭时产生自然反色。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【双子对偶·极简阴阳分形 (Celestial Duality & Swiss Monolith)】风格生成 Gemini 个人主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 构图核心：50/50 动态分屏，左半屏为【理性代码态】（纯白陶瓷底 #F8FAFC + 纯黑字），右半屏为【感性艺术态】（玄武黑底 #09090B + 纯白字）。
2. 瑞士国际排版：使用 Syne 巨型粗体作为大标题，辅以 Plus Jakarta Sans 与 JetBrains Mono，极细 1px 线框划分区域。
3. 交互机制：中间分割线支持鼠标按住自由左右拖拽，动态调节左右两极的展示宽度；配备 mix-blend-mode: difference 反色跟随光标。
4. 内容对仗：
   - 左侧展示：代码重构、数学张量、严格逻辑推理、算法架构。
   - 右侧展示：隐喻诗篇、多模态音乐声学、视觉想象力、情感共振。
```
