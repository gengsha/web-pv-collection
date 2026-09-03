# 风格构成说明：微缩浮岛·空间拟物 (Aero Spatial Computing UI)

## 1. 风格概述 (Style DNA)
* **核心理念**：次时代空间操作系统（Spatial UI / VisionOS 灵感）的悬浮视界。模拟超清透晶体、双层柔焦阴影、悬浮浮岛与 3D 陀螺仪视差物理。
* **视觉情绪**：轻盈、通透、未来空间感、极致精致、无边界视界。
* **适用场景**：空间计算 App 官网、下一代智能体 OS、沉浸式产品主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 空间底色与环境光 */
  --spatial-bg: #0b0f19;
  --spatial-glass: rgba(255, 255, 255, 0.08);
  --spatial-glass-hover: rgba(255, 255, 255, 0.14);
  
  /* 晶体边缘与内高光 */
  --specular-rim: 1px solid rgba(255, 255, 255, 0.25);
  --specular-glow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
  
  /* 空间阴影 */
  --spatial-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
  
  /* 品牌点睛 */
  --spatial-blue: #38bdf8;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
  ```
* **全站排版**：大圆角胶囊组件结合 `Plus Jakarta Sans`，字重柔和轻盈。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **超清透高折射晶体 (Ultra Glassmorphism)**：
  `backdrop-filter: blur(36px)`，大圆角（$24\text{px}\sim9999\text{px}$）。
* **悬浮 Dock 栏**：
  底部浮动胶囊导航条，随鼠标悬停触发图标放大与反光光斑。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **3D 视差倾斜 (3D Parallax Tilt)**：卡片随鼠标移动实时计算 $X/Y$ 轴旋转与内反光斑偏移。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【微缩浮岛·空间拟物 (Aero Spatial Computing UI)】风格生成 Gemini 空间计算主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉材质：超清透晶体毛玻璃 (backdrop-filter: blur(36px))，大圆角胶囊容器，双层深层柔焦阴影与 1px 细微内反光。
2. 空间排版：使用 Plus Jakarta Sans，采用悬浮浮岛卡片与悬浮 Dock 导航栏。
3. 3D 物理微动效：鼠标在卡片上移动时，卡片产生真实的 3D 陀螺仪倾斜视差（Tilt Effect）与表面反射光移动。
4. 核心板块：
   - 空间计算 Hero（浮空胶囊标题与空间感知指示器）
   - 空间感知浮岛卡片（眼动意图捕捉、空间多屏交互、手势合成）
   - 浮动交互 Dock 控制栏
```
