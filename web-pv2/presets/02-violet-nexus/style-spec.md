# 风格构成说明：紫枢星穹·Qwen 官方品牌旗舰演化 (Violet Nexus · Qwen Flagship Evolution)

## 1. 风格概述 (Style DNA)
* **核心理念**：Qwen（通义千问）官方品牌美学的深空演化形态。将「旗舰级全能智能」拟喻为深空中缓缓流转的紫色星穹极光——品牌紫为骨、星光青为锋、品红为点睛，以绝对正统的官方气场诠释「问未知，答未问」。
* **视觉情绪**：正统、深邃、旗舰感、秩序与涌现并存、官方级可信度。
* **适用场景**：大模型官方个人主页、旗舰产品发布页、开发者大会主视觉、品牌能力矩阵与模型族谱展示。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础空间色 */
  --bg-void: #0A0616;                 /* 深空紫黑底色 */
  --bg-surface: #130F26;              /* 表面/次级面板 */
  --bg-glass: rgba(24, 18, 46, 0.6);  /* 毛玻璃表面 */

  /* 品牌极光三色（官方渐变） */
  --brand-violet: #615CED;
  --brand-lavender: #9B8CFF;
  --brand-cyan: #00D4FF;
  --brand-gradient: linear-gradient(120deg, #615CED 0%, #9B8CFF 48%, #00D4FF 100%);

  /* 点缀色 */
  --accent-magenta: #FF6AD5;

  /* 边框与辉光 */
  --border-glass: rgba(255, 255, 255, 0.12);
  --glow-violet: rgba(97, 92, 237, 0.45);
  --glow-cyan: rgba(0, 212, 255, 0.3);

  /* 文本层级 */
  --text-primary: #F4F2FF;
  --text-dim: #8B87A6;

  /* 形态与动效 */
  --radius-lg: 20px;
  --radius-pill: 9999px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Space Grotesk` 700，负字间距 `-0.02em`，中文回退 `"PingFang SC", "Hiragino Sans GB", "Microsoft YaHei"` 系统字；品牌关键词使用 `--brand-gradient` 渐变剪裁（`-webkit-background-clip: text`）。
* **正文 (Body)**：`Space Grotesk` 500 + 中文系统字，行高 `1.7`，颜色 `#8B87A6`。
* **数据/徽标 (Mono)**：`JetBrains Mono` 400/500/700，用于遥测数值、Pill 徽章、时间线版本号与终端标题，常配 `letter-spacing: 0.08em~0.14em`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **分层背景（强制三层，缺一不可）**：
  1. `canvas` 星尘粒子层：约 70~180 颗微星（薰衣草白 / 青 / 品红三色），缓慢漂移 + 正弦闪烁，随光标产生深度视差；
  2. 三颗超大高斯模糊极光光斑：紫 `#615CED` / 蓝 `#9B8CFF` / 青 `#00D4FF`，尺寸 560~760px，`filter: blur(110px)`，外层 `orb-track` 承接光标视差，内层以 16~22s 周期呼吸漂移；
  3. 细噪点层：`radial-gradient` 微点阵，透明度 ≤ 0.32。
* **高透毛玻璃卡片 (Frosted Glass Container)**：
  ```css
  background: rgba(24, 18, 46, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-radius: 20px;
  box-shadow: 0 20px 44px -18px rgba(4, 2, 12, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.07);
  ```
* **渐变描边（伪元素法则）**：卡片/舱体不直接设边框色，由 `::before` 以 1px padding + mask 挖空渲染品牌渐变描边，悬停时整体提亮：
  ```css
  .glass-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(140deg, rgba(97,92,237,.6), rgba(155,140,255,.2) 46%, rgba(0,212,255,.5));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
  }
  ```
* **发光 Pill 徽章**：`border-radius: 9999px`，品牌紫半透底 + 1px 半透薰衣草边 + `box-shadow: 0 0 22px var(--glow-violet)`，并以 3.2s 周期呼吸脉冲。
* **Spotlight 高光（::after 法则）**：卡片高光跟随鼠标坐标变量：
  ```css
  .glass-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(240px circle at var(--spot-x, 50%) var(--spot-y, 50%),
      rgba(155, 140, 255, 0.16), rgba(0, 212, 255, 0.05) 45%, transparent 70%);
    opacity: 0;
    pointer-events: none;
  }
  .glass-card:hover::after { opacity: 1; }
  ```
* **流光彩虹输入框**：对话舱输入栏外层 `::before` 铺设品牌四色渐变并施加 `blur(8px)`，以 `hue-rotate(0deg -> 360deg)` 6s 线性循环形成流光虹环。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **光标视差牵引**：三颗极光光斑以不同方向系数（约 ±46~66px）经阻尼插值（每帧 `lerp 0.055`）追踪光标，形成深空引力感；星尘粒子按深度叠加同向微视差。
* **卡片 Spotlight**：鼠标掠过任意毛玻璃卡片，`--spot-x / --spot-y` 驱动高光与渐变描边同步移动。
* **Q 形星芒描边入场**：Hero 的 Q 徽标使用 `pathLength="1"` + `stroke-dasharray: 1; stroke-dashoffset: 1 -> 0`，星环、品红尾迹与八向星芒按 0.12s~1.35s 错峰生长。
* **滚动逐块浮现**：`.reveal` 元素经 IntersectionObserver 施加 `translateY(28px) -> 0` + 透明度 `0 -> 1`，多级子块以 `transition-delay` 阶梯入场。
* **对话舱流式应答**：输入框虹环常亮流光；回答以约 22ms/字 的速率逐字打字，伴随青色 `stream-caret` 闪烁。
* **时间线节点**：横向族谱节点以 `nodePulse` 辉光脉冲，当前世代（Qwen3）加强青光，悬停放大 1.35 倍并点亮描述。
* **统一缓动**：`cubic-bezier(0.16, 1, 0.3, 1)`（超快响应与丝滑回弹）；全站尊重 `prefers-reduced-motion`。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT、DeepSeek、Qwen）即可生成同款风格页面：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【紫枢星穹 · Violet Nexus】风格，为 Qwen（通义千问）生成一个官方品牌旗舰级个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库），页脚标注 "Qwen Personal Site · Preset 02 Violet Nexus"。

设计要求：
1. 视觉底色：深空紫黑 #0A0616。背景必须严格分三层——canvas 星尘粒子层（缓慢漂移闪烁）；3 颗超大高斯模糊极光光斑（紫 #615CED、蓝 #9B8CFF、青 #00D4FF，blur 90px+，后台缓慢漂移并受光标视差牵引）；细噪点层。
2. 材质体系：高透毛玻璃卡片（rgba(24,18,46,0.6) + backdrop-filter: blur(24px)）；由伪元素 + mask 实现的 1px 品牌渐变描边（#615CED -> #9B8CFF -> #00D4FF）；发光 Pill 徽章；点缀品红 #FF6AD5；文本主色 #F4F2FF、弱色 #8B87A6。
3. 字体层次：Google Fonts 引入 Space Grotesk（500/700）做标题，JetBrains Mono（400/500/700）做数据与徽章，中文使用系统字回退；主标题关键词使用品牌渐变文字剪裁。
4. 核心板块：
   - Hero：Q 形星芒 SVG 以 stroke-dashoffset 描边入场，发光 Pill 徽章 + 标语「问未知，答未问」
   - 遥测条：上下文 1,000,000 Tokens（数字滚动）/ 模态 / 推理延迟
   - 能力矩阵：推理、代码、视觉、语音、智能体 5 张毛玻璃卡片，悬停有 spotlight 高光跟随鼠标
   - 模型族谱时间线：Qwen -> Qwen2.5 -> QwQ -> Qwen3 横向发光节点（当前世代加强辉光）
   - 对话体验舱：流光彩虹输入框（渐变光晕 + hue-rotate 循环），模拟流式逐字打字回答
5. 动效要求：滚动逐块上浮显现（IntersectionObserver），所有卡片/按钮具备悬停微交互，统一缓动 cubic-bezier(0.16, 1, 0.3, 1)，文案呈现旗舰级全能智能气场；390px / 768px 响应式。
```
