# 风格构成说明：星轨星云·极光流体 (Cosmic Nebula & Aurora Fluidity)

## 1. 风格概述 (Style DNA)
* **核心理念**：把多模态智能拟喻为深空中缓慢流动的极光星云——紫、蓝、青三色光团在黑曜石夜空里漂移，前景是一层层高透毛玻璃面板，信息像漂浮在星云之上的舷窗。
* **视觉情绪**：深邃、灵动、通透、克制的科技感、次时代旗舰气质。
* **适用场景**：AI 旗舰产品主页、多模态能力展示、开发者中心、高科技 SaaS 官网。
* **构图法则**：`#070913` 深空底色上固定铺设 3 颗超大高斯模糊光球（650/750/500px，`blur(100px)`）与 32px 点阵星尘；内容收在 `max-width: 1200px` 居中容器里，自上而下为「导航 → 居中 Hero（胶囊徽章 + 渐变大标题 + 双按钮 + 胶囊遥测条）→ 三列毛玻璃卡片 → 终端式推理面板 → 对话舱 → 页脚」；所有面板统一为半透明毛玻璃 + 1px 白色细边 + 顶部内高光，按钮与徽章全部胶囊化（`9999px`）。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色：深空与玻璃面 */
  --bg-deep-space: #070913;
  --bg-surface-dark: #0d111e;
  --bg-surface-glass: rgba(16, 22, 38, 0.65);

  /* 极光三原色 */
  --aurora-purple: #7928ca;
  --aurora-blue: #4285f4;
  --aurora-cyan: #00f0ff;

  /* 边框与辉光 */
  --border-glass: rgba(255, 255, 255, 0.12);
  --border-glass-glow: rgba(66, 133, 244, 0.4);
  --glow-cyan: rgba(0, 240, 255, 0.25);

  /* 文本层级 */
  --text-pure: #ffffff;
  --text-high: #f1f5f9;
  --text-dim: #94a3b8;
  --text-muted: #475569;

  /* 形态 */
  --radius-lg: 20px;
  --radius-pill: 9999px;

  /* 过渡：快速响应、柔和收尾 */
  --transition-smooth: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

* **点缀色（直接写在组件里）**：标题渐变 `#a855f7 → #38bdf8 → #2dd4bf`；区块标签/徽章文字 `#38bdf8`；版本标签 `#60a5fa`；Hero 胶囊文字 `#c084fc`；在线/延迟数据 `#34d399`；终端步骤 `#93c5fd`、步骤编号 `#a855f7`、结论高亮 `#22d3ee`。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Plus Jakarta Sans` 800，`3.5rem`，行高 `1.15`，字间距 `-0.035em`；第二行套 `.gradient-text` 渐变剪裁。移动端（≤768px）降为 `2.3rem`。
* **区块标题**：`2rem` / 700 / `-0.02em`；卡片标题 `1.2rem` / 700；品牌字 `1.35rem` / 800 / `-0.03em`。
* **正文 (Body)**：`Plus Jakarta Sans` 400/500，Hero 描述 `1.1rem` 行高 `1.65`，卡片正文 `0.9rem` 行高 `1.6`，颜色 `#94a3b8`。开启 `-webkit-font-smoothing: antialiased`。
* **数据/代码/标签 (Mono)**：`JetBrains Mono` 500/700。区块标签 `0.75rem` 大写 + `0.08em` 字距；遥测标签 `0.68rem` 大写 `#475569`、数值 `0.88rem` 700 白色；终端正文 `0.85rem` 行高 `1.8`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **极光光球层 (Aurora Orbs)**：`position: fixed` 背景容器，三颗径向渐变光球各自漂移。
  ```css
  .aurora-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.45; will-change: transform; }
  .orb-purple { width: 650px; height: 650px; top: -150px; left: 10%;
    background: radial-gradient(circle, #7928ca 0%, rgba(121,40,202,0) 70%);
    animation: floatPurple 16s ease-in-out infinite alternate; }
  .orb-blue   { width: 750px; height: 750px; top: 30%; right: -100px;  /* floatBlue 20s */ }
  .orb-cyan   { width: 500px; height: 500px; bottom: -100px; left: 25%; /* floatCyan 18s */ }
  .cosmic-noise { position: absolute; inset: 0; opacity: 0.35;
    background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px);
    background-size: 32px 32px; }
  ```
* **毛玻璃卡片 (Glass Card)**：
  ```css
  .glass-card {
    background: rgba(16, 22, 38, 0.65);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 20px; padding: 30px;
    box-shadow: 0 20px 40px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s, box-shadow 0.35s;
  }
  .glass-card:hover {
    border-color: rgba(66, 133, 244, 0.4);
    box-shadow: 0 25px 50px -10px rgba(66,133,244,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
  }
  ```
  卡片网格 `repeat(auto-fit, minmax(320px, 1fr))`，间距 `24px`；卡片图标为 48px 圆角 12px 方块，底色与描边用对应极光色的 15% / 40% 透明度。
* **渐变主按钮 / 玻璃次按钮**：
  ```css
  .btn-primary { padding: 12px 28px; border-radius: 9999px; border: none; font-weight: 700;
    background: linear-gradient(135deg, #7928ca 0%, #4285f4 100%);
    box-shadow: 0 10px 25px rgba(66,133,244,0.4); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(66,133,244,0.55); }
  .btn-glow:hover { background: rgba(255,255,255,0.12); box-shadow: 0 0 20px rgba(0,240,255,0.3); }
  ```
* **胶囊遥测条 (Telemetry Bar)**：毛玻璃胶囊（`blur(20px)`，`padding: 12px 30px`），内含 3 组「Mono 小标签 + 粗数值」，以 1px × 28px 竖线分隔；移动端改为纵向堆叠、圆角 20px、隐藏分隔线。
* **推理终端面板**：玻璃卡片 `padding: 0`，头部 `rgba(0,0,0,0.4)` 底 + 红黄绿三点（`#ef4444 / #f59e0b / #10b981`）+ 文件名 + `● LIVE REASONING` 绿字；正文为分级日志行，结论行上方 `1px dashed` 分隔。
* **对话舱**：消息头像为紫→蓝渐变圆；AI 气泡 `rgba(255,255,255,0.05)` 左上角 4px 切角；用户气泡紫蓝 40% 渐变、右上角切角并 `row-reverse`；输入条为暗色胶囊 + 40px 紫→青渐变圆形发送键（悬停 `scale(1.05)` + 青色辉光）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **光球漂移 (CSS Keyframes)**：三颗光球以 `ease-in-out infinite alternate` 往返，周期 16s / 20s / 18s 错开，避免同步感。
  ```css
  @keyframes floatPurple { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(120px, 80px) scale(1.15); } }
  @keyframes floatBlue   { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-100px, 120px) scale(0.9); } }
  @keyframes floatCyan   { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(80px, -90px) scale(1.1); } }
  ```
* **光标视差 (main.js)**：`mousemove` 时取归一化坐标（-0.5~0.5），分别给三颗光球写入独立的 CSS `translate` 属性（系数 60 / -80 / 40），蓝球反向移动形成层次；光球带 `transition: translate 0.6s cubic-bezier(0.16,1,0.3,1)` 作阻尼。由于漂移动画用的是 `transform`，视差用独立的 `translate` 属性，两者可以叠加而不互相覆盖。
* **悬停反馈**：卡片悬停只改边框色与辉光阴影（0.35s）；主按钮上浮 2px；导航链接由 `#94a3b8` 过渡到白色；统一曲线 `cubic-bezier(0.16, 1, 0.3, 1)`。
* **对话模拟 (main.js)**：点击发送或按 Enter，先把用户输入（经 HTML 转义）追加为用户气泡并清空输入框，`650ms` 后随机抽取一条预设回答追加为 AI 气泡，每次追加后滚动到底部（消息区 `max-height: 280px; overflow-y: auto`）。
* **无障碍 / 减少动效**：在 `@media (prefers-reduced-motion: reduce)` 下关闭三颗光球的持续漂移动画（`animation: none`），并停用光标视差与 hover 位移，只保留颜色变化。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【星轨星云·极光流体 (Cosmic Nebula & Aurora Fluidity)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 底色深空 #070913，玻璃面 rgba(16,22,38,0.65)，边框 rgba(255,255,255,0.12)，悬停边框 rgba(66,133,244,0.4)。
- 极光三原色：紫 #7928CA、蓝 #4285F4、青 #00F0FF；标题渐变 #A855F7→#38BDF8→#2DD4BF。
- 文本：#FFFFFF / #F1F5F9 / 弱 #94A3B8 / 更弱 #475569；状态绿 #34D399，标签蓝 #38BDF8。

材质构件：
- 背景固定层：3 颗径向渐变光球（650/750/500px，filter: blur(100px)，opacity 0.45）+ 32px 点阵星尘（opacity 0.35）。
- 毛玻璃卡片：backdrop-filter: blur(24px)，圆角 20px，阴影 0 20px 40px -15px rgba(0,0,0,0.6) + inset 0 1px 0 rgba(255,255,255,0.1)；悬停改边框为蓝色并加蓝色外辉光。
- 按钮全部胶囊（9999px）：主按钮紫→蓝渐变 + 蓝色投影，次按钮半透明玻璃。
- Hero 下方放胶囊遥测条（3 组 Mono 标签 + 数值，竖线分隔）；终端面板带红黄绿三点、文件名与「● LIVE」状态。

字体排版：
- Google Fonts：Plus Jakarta Sans（300–800）+ JetBrains Mono（400/500/700）。
- 主标题 800、3.5rem、字距 -0.035em，第二行渐变剪裁；正文 1.1rem / 行高 1.65；标签与数据用 Mono 大写宽字距。

交互与动效：
- 三颗光球 CSS 往返漂移（16s/20s/18s，ease-in-out infinite alternate，带位移与缩放）。
- 鼠标移动时光球产生视差（系数 60 / -80 / 40，0.6s 阻尼过渡；视差用独立的 translate 属性，与漂移动画的 transform 叠加）。
- 卡片悬停 0.35s 发光过渡，曲线 cubic-bezier(0.16,1,0.3,1)。
- 对话舱：回车或点击发送后追加用户气泡，约 650ms 后追加一条预设回复并滚动到底。
- prefers-reduced-motion 下关闭光球漂移与视差。

内容板块（示例，可按业务替换）：
- 顶部导航（品牌图标 + 名称 + 版本徽章 + 4 个锚点 + 胶囊按钮）
- Hero（胶囊徽章 + 两行大标题 + 简介 + 双按钮 + 遥测条）
- 三列核心能力卡片（图标 + 标题 + 描述 + Mono 徽章）
- 终端式过程展示面板（分步日志 + 结论行）
- 交互式对话体验舱
- 页脚（{{品牌/产品名}} + 一句副标）
```
