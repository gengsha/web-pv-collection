# 风格构成说明：星轨星云·极光流体 (Cosmic Nebula & Aurora Fluidity)

## 1. 风格概述 (Style DNA)
* **核心理念**：Google Gemini 官方品牌美学的深色演化形态。将超级多模态智能拟喻为在深邃宇宙中流动的多维星云与极光流体。
* **视觉情绪**：深邃、灵动、高维度、通透、次时代全能智能。
* **适用场景**：AI 旗舰主页、多模态认知展示、高科技产品官网、开发者中心。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础背景色 */
  --bg-deep-space: #070913;
  --bg-surface-dark: #0d111e;
  --bg-surface-glass: rgba(16, 22, 38, 0.65);
  
  /* 极光多模态流体三原色 */
  --aurora-purple: #7928ca;
  --aurora-blue: #4285f4;
  --aurora-cyan: #00f0ff;
  --aurora-gradient: linear-gradient(135deg, #7928ca 0%, #4285f4 50%, #00f0ff 100%);
  
  /* 边框与高光 */
  --border-glass: rgba(255, 255, 255, 0.12);
  --border-glass-glow: rgba(66, 133, 244, 0.4);
  --glow-cyan: rgba(0, 240, 255, 0.25);
  
  /* 文本层级 */
  --text-pure: #ffffff;
  --text-high: #f1f5f9;
  --text-dim: #94a3b8;
  --text-muted: #475569;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Plus Jakarta Sans`, 700/800 粗体, 负字间距 `-0.03em`, 渐变剪裁字体。
* **正文 (Body)**：`Plus Jakarta Sans`, 400/500, 行高 `1.65`, 颜色 `#94a3b8`。
* **数据/代码 (Mono)**：`JetBrains Mono`, 500 等宽。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **流体光球层 (Aurora Fluid Orbs)**：
  页面后置 3 个超大尺寸（$500\text{px}\sim700\text{px}$）的绝对定位渐变光斑，叠加 `filter: blur(100px)`，并在后台以不同周期柔和运动。
* **高透毛玻璃卡片 (Frosted Glass Container)**：
  ```css
  background: rgba(16, 22, 38, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  ```

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **光标引力牵引**：鼠标在屏幕移动时，最近的极光光球会有微妙的阻尼追踪（Spring Gravity）。
* **卡片内发光跟随 (Spotlight Border)**：鼠标掠过毛玻璃卡片时，卡片高光边框随光标坐标动态高亮。
* **过渡贝塞尔曲线**：`cubic-bezier(0.16, 1, 0.3, 1)`（超快响应与丝滑回弹）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT-4o, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【星轨星云·极光流体 (Cosmic Nebula & Aurora Fluidity)】风格生成一个关于 Gemini 的全能 AI 个人官网（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：深黑曜石宇宙夜空 (#070913)，使用 CSS/Canvas 渲染后台 3 颗流动的超大高斯模糊极光光斑（紫 #7928CA、蓝 #4285F4、青 #00F0FF，blur 100px）。
2. 材质体系：高透毛玻璃卡片（backdrop-filter: blur(24px)，边框 1px 细微半透白，内阴影 inset 0 1px 0 rgba(255,255,255,0.15)）。
3. 字体层次：使用 Plus Jakarta Sans 字体，主标题使用渐变文字剪裁（Linear-Gradient），副标配以 JetBrains Mono 等宽标签。
4. 核心板块：
   - Hero 导航与全息徽章（含 Gemini 星芒 SVG 图标与动效呼应）
   - 多模态感知矩阵（文字、视觉、代码、音频、深空科学）卡片网格
   - 动态思考流（Chain-of-Thought）交互式推理展示面板
   - 交互式对话体验终端（含多色流光输入框与发送按钮）
5. 动效要求：卡片悬停带有发光过渡，鼠标移动具有轻柔的极光视差引力效果。
```
