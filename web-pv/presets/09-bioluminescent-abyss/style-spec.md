# 风格构成说明：深海冷光·发光仿生 (Bioluminescent Abyss Ecology)

## 1. 风格概述 (Style DNA)
* **核心理念**：以深渊带（超深海区）的生物冷光为意象，把智能体庞大又看不见的认知网络比作深海里自己会发光的未知物种。页面中心微亮、四周沉入漆黑；背景上有缓缓起伏的焦散光线，卡片角落透出模糊的荧光，用户点击任意位置都会激起一圈冷光涟漪。
* **视觉情绪**：神秘、幽暗深邃、有机、冷静、自发光。
* **适用场景**：深度学习 / 研究型项目展示、生物计算、海洋或探索类品牌、前沿实验室主页。
* **构图法则**：容器为 `max-width: 1100px`。页眉两端对齐（左侧是脉动光点加品牌名，右侧是等宽「深度/压强」读数），底部用一条 `rgba(56,189,248,0.15)` 细线分隔。接着是居中的 Hero（荧光胶囊标签、两行大标题，第二行为青→绿渐变字、浅天蓝副文）。下面是三列「生物荚舱」卡片，每张右上角都有一团不同颜色的模糊荧光。最底层是全屏焦散 Canvas，最顶层是不拦截事件的涟漪容器。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 深海底色 */
  --abyss-deep: #020617;                    /* 中心较亮的海水 */
  --abyss-black: #010409;                   /* 边缘渊黑 */
  --abyss-surface: rgba(8, 20, 44, 0.65);   /* 荚舱卡片底 */

  /* 生物冷光色阶 */
  --bio-cyan: #38bdf8;      /* 水母荧蓝：主冷光、涟漪、标签、光点 */
  --bio-emerald: #34d399;   /* 翡翠绿：渐变字终点、第二枚荧光 */
  --bio-coral: #fb7185;     /* 珊瑚粉：第三枚荧光 */

  /* 文本 */
  --text-biolight: #f0f9ff; /* 冷白主文本 */
  --text-dim: #7dd3fc;      /* 浅天蓝弱文本（副文、正文、读数） */
}

/* 页面底：radial-gradient(circle at center, #020617 0%, #010409 100%) */
/* 焦散线：rgba(56, 189, 248, 0.08)；卡片描边：rgba(56, 189, 248, 0.2) */
```

* **用色原则**：弱文本用的是带色相的浅天蓝 `#7dd3fc`，而不是灰色，这样整页都浸在冷蓝里。珊瑚粉只出现在一处荧光团中，作为色温上的点缀。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **全站字体**：`Plus Jakarta Sans`，开启抗锯齿。
* **主标题**：`3.6rem` / `800` / `line-height: 1.15` / `letter-spacing: -0.02em`，居中两行，第二行为渐变发光字：
  ```css
  .bio-gradient-text {
    background: linear-gradient(135deg, #38bdf8, #34d399);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(56, 189, 248, 0.4);
  }
  ```
* **副文**：`1.1rem` / `line-height: 1.7` / `#7dd3fc`，Hero 最大宽度 `740px`。
* **品牌名**：`0.95rem` / `700` / `letter-spacing: 0.05em`，格式如 `XXX // HADAL ZONE`。
* **卡片**：标题 `1.25rem` / `700`；正文 `0.9rem` / `line-height: 1.65`。
* **仪表读数 (Mono)**：`JetBrains Mono`，`0.72–0.75rem`，用于深度读数（`DEPTH: 8,420M // PRESSURE: 850 ATM`）、胶囊标签（`letter-spacing: 0.1em`）和器官编号（`ORGAN 01 // PHOTORECEPTOR`）。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **渊底渐变 + 焦散 Canvas**：`body` 使用中心微亮的径向渐变。`#causticsCanvas` 全屏固定，`opacity: 0.45`，`z-index: 0`，不拦截事件；内容层 `.abyss-app` 放在 `z-index: 1`。
* **焦散波纹算法 (main.js)**：每帧先清空画布，再横向画 6 条折线（采样步长 40px）。每条线的基线高度为 `height × (0.2 + i × 0.15)`，在此基础上叠加两组正弦/余弦波，相位随时间推进：
  ```js
  time += 0.015;
  ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)'; ctx.lineWidth = 2;
  const y = height * (0.2 + i * 0.15)
          + Math.sin(x * 0.005 + time + i) * 35
          + Math.cos(x * 0.01 - time) * 20;
  ```
* **生物荚舱卡片 (Bio Pod)**：深蓝半透明底、背景模糊、荧蓝细描边、24px 有机圆角，`overflow: hidden` 用来裁切右上角的荧光团。
  ```css
  .bio-pod {
    background: rgba(8, 20, 44, 0.65); backdrop-filter: blur(20px);
    border: 1px solid rgba(56, 189, 248, 0.2); border-radius: 24px;
    padding: 36px 28px; position: relative; overflow: hidden;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s;
  }
  .bio-pod:hover { transform: translateY(-6px); border-color: #38bdf8; }
  .pod-glow { position: absolute; top: -40px; right: -40px; width: 120px; height: 120px;
              border-radius: 50%; filter: blur(40px); opacity: 0.5; }
  .cyan-glow { background: #38bdf8; } .emerald-glow { background: #34d399; } .coral-glow { background: #fb7185; }
  ```
  三张卡片依次使用 青 / 绿 / 珊瑚 三色荧光团，荧光团本身是静态的。
* **脉动光点 (Bio Dot)**：10px 圆点，荧蓝色，带 `box-shadow: 0 0 12px #38bdf8`。
* **荧光胶囊标签**：`rgba(56,189,248,0.1)` 底、`rgba(56,189,248,0.3)` 描边、`9999px` 圆角、`padding: 4px 14px`。
* **冷光涟漪 (Ripple)**：2px 荧蓝圆环，带 `box-shadow: 0 0 20px #38bdf8` 外发光，挂在 `position: fixed; inset: 0; z-index: 100; pointer-events: none` 的容器里。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **焦散流动**：`requestAnimationFrame` 持续驱动，每帧 `time += 0.015`。6 条光线以不同相位缓慢起伏，同时监听 `resize` 让画布始终铺满视口。
* **点击冷光涟漪 (main.js)**：在 `window` 上监听 `click`，在点击坐标处创建一个 80×80 的 `.bio-ripple`，1200ms 后移除。
  ```css
  .bio-ripple { animation: rippleExpand 1.2s ease-out forwards; }
  @keyframes rippleExpand {
    0%   { transform: translate(-50%, -50%) scale(0); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
  }
  ```
* **光点脉动**：页眉光点循环播放 `pulseDot 2s infinite`。
  ```css
  @keyframes pulseDot { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.4); opacity: 1; } }
  ```
* **荚舱上浮**：悬停时上浮 `-6px`，曲线 `cubic-bezier(0.16, 1, 0.3, 1)`，时长 `0.35s`，同时描边由 20% 透明度变为满色荧蓝。
* **减弱动效**：在 `prefers-reduced-motion: reduce` 下，焦散 Canvas 只绘制一帧静态画面（不进入 rAF 循环），`.bio-dot` 设 `animation: none`。涟漪可以保留为即时淡出，也可以直接关闭。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【深海冷光·发光仿生 (Bioluminescent Abyss Ecology)】风格，为 {{品牌/产品名}} 生成一个深海主题主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 页面底使用 radial-gradient(circle at center, #020617 0%, #010409 100%)。
- 卡片底 rgba(8,20,44,0.65)，描边 rgba(56,189,248,0.2)。
- 生物冷光三色：水母荧蓝 #38BDF8（主色）、翡翠绿 #34D399、珊瑚粉 #FB7185（只用于点缀）。
- 主文本冷白 #F0F9FF；弱文本用浅天蓝 #7DD3FC，不用灰色。

二、材质构件
- 焦散 Canvas：全屏 fixed，opacity 0.45，不拦截事件。每帧画 6 条横向折线（步长 40px），颜色 rgba(56,189,248,0.08)、线宽 2，y = 基线 + sin(x*0.005+t+i)*35 + cos(x*0.01-t)*20，t 每帧加 0.015。
- 生物荚舱卡片：背景模糊 20px，圆角 24px，overflow hidden。右上角偏出 -40px 处放一团 120px、blur(40px)、opacity 0.5 的荧光，三张卡片依次用青 / 绿 / 珊瑚。
- 页眉光点：10px 荧蓝圆点，外发光 0 0 12px。胶囊标签：荧蓝 10% 底、30% 描边，圆角 9999px。
- 涟漪层：fixed 全屏、z-index 置顶、pointer-events: none。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（300–800）与 JetBrains Mono（400/500）。
- 主标题 3.6rem、字重 800、字距 -0.02em，居中两行。第二行为 135° 青→绿渐变文字，加 text-shadow: 0 0 30px rgba(56,189,248,0.4)。
- 所有仪表读数、器官编号和胶囊标签用 JetBrains Mono 0.72–0.75rem。

四、交互与动效
- 焦散用 requestAnimationFrame 持续流动，并响应 resize。
- 点击页面任意位置，在点击处生成 80px 荧蓝圆环（带 0 0 20px 外发光），用 keyframes 从 scale(0)/opacity 1 扩散到 scale(5)/opacity 0，1.2s ease-out，结束后移除节点。
- 页眉光点循环脉动：2s 内 scale 在 1 与 1.4 之间、opacity 在 0.8 与 1 之间往返。
- 卡片悬停：translateY(-6px)，曲线 cubic-bezier(0.16,1,0.3,1)，0.35s，描边变为满色荧蓝。
- 在 prefers-reduced-motion: reduce 下，焦散只绘制静态一帧，并停止光点脉动。

五、内容板块（示例，可按业务替换）
- 页眉：左侧光点加「{{品牌/产品名}} // HADAL ZONE」，右侧等宽读数（如「DEPTH: 8,420M // PRESSURE: 850 ATM」）。
- 深渊 Hero：胶囊标签「BIOLUMINESCENT EMERGENCE」、两行标题（如「渊深八千米，智识自发光。」）和一句副文。
- 三张感知器官卡片：每张含编号（ORGAN 01 // …）、标题和说明，对应产品的三项核心能力。
- 页脚：一行提示「点击屏幕任意位置激发冷光涟漪」，再加 {{品牌/产品名}} 署名。
```
