# 风格构成说明：微缩浮岛·空间拟物 (Aero Spatial Computing UI)

## 1. 风格概述 (Style DNA)
* **核心理念**：从空间计算操作系统（visionOS 一类的 Spatial UI）中获取灵感。深空蓝黑底上漂浮着两团模糊的环境光，所有界面元素都是高透明度的「晶体玻璃」：大面积背景模糊、1px 亮色描边、顶部内高光，再叠两层深阴影，看起来像悬在空中的浮岛。卡片会随指针做 3D 倾斜，底部是固定的胶囊 Dock。
* **视觉情绪**：轻盈、通透、精致、安静的未来感、无边界。
* **适用场景**：空间计算 / XR 产品官网、智能体 OS 概念页、硬件发布页、沉浸式产品主页。
* **构图法则**：容器为 `max-width: 1100px`，底部预留 `100px` 给 Dock。顶部居中放一颗玻璃胶囊状态栏（Logo │ 分隔线 │ 等宽状态字），下面是居中的 Hero（等宽胶囊标签、两行超粗标题、灰蓝副文），接着是三列玻璃浮岛卡片，网格父级设 `perspective: 1000px`。左上和右下各固定一团 `blur(120px)` 的天蓝 / 靛紫环境光。页面底部中央固定一条玻璃 Dock。所有容器都用大圆角（28px 或胶囊 9999px）。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 空间底色与晶体玻璃 */
  --spatial-bg: #0b0f19;
  --spatial-glass: rgba(255, 255, 255, 0.08);
  --spatial-glass-hover: rgba(255, 255, 255, 0.14);

  /* 晶体边缘与内高光 */
  --specular-rim: 1px solid rgba(255, 255, 255, 0.22);
  --specular-glow: inset 0 1px 0 rgba(255, 255, 255, 0.35);

  /* 双层空间阴影 */
  --spatial-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 18px 36px -18px rgba(0, 0, 0, 0.5);

  /* 文本 */
  --text-white: #ffffff;
  --text-dim: #94a3b8;
}

/* 代码中直接使用的点睛色 */
/* 天蓝 #38bdf8：状态字、胶囊标签、卡片元数据、Dock 激活态     */
/*   胶囊标签底 rgba(56,189,248,0.12)、描边 rgba(56,189,248,0.3) */
/* 靛紫 #818cf8：右下环境光                                      */
/* Dock 底：rgba(20, 26, 40, 0.75)                               */
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
  ```
* **全站字体**：`Plus Jakarta Sans`，开启 `-webkit-font-smoothing: antialiased`。
* **主标题**：`3.5rem` / `800` / `line-height: 1.15` / `letter-spacing: -0.03em`，居中，两行（如「无界空间，<br>触手可及。」）。
* **副文**：`1.1rem` / `line-height: 1.65` / `#94a3b8`，Hero 最大宽度 `720px`。
* **卡片**：标题 `1.3rem` / `700`；正文 `0.92rem` / `line-height: 1.6` / 灰蓝。
* **Logo**：`0.85rem` / `700` / `letter-spacing: 0.05em`，前缀 `✦`。
* **系统元数据 (Mono)**：`JetBrains Mono`，`0.72–0.75rem`，天蓝色，用于跟踪状态（`EYE & HAND TRACKING: ACTIVE`）、胶囊标签和卡片底部指标（`LATENCY: < 2ms`）。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **环境光斑 (Ambient Light)**：两个固定的大圆，经过重度模糊后作为背景氛围，本身不动。
  ```css
  .spatial-ambient-light { position: fixed; border-radius: 50%; filter: blur(120px);
                           pointer-events: none; z-index: 0; opacity: 0.35; }
  .light-1 { width: 600px; height: 600px; top: 10%; left: 15%;
             background: radial-gradient(circle, #38bdf8, transparent 70%); }
  .light-2 { width: 500px; height: 500px; bottom: 10%; right: 15%;
             background: radial-gradient(circle, #818cf8, transparent 70%); }
  ```
* **晶体玻璃配方 (Specular Glass)**：所有浮层通用：半透明白底、背景模糊、1px 亮描边、顶部 1px 内高光，再叠两层深阴影。
  ```css
  .island-glass {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px);
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35),
                0 30px 60px -12px rgba(0, 0, 0, 0.55), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
    border-radius: 28px; padding: 36px 28px;
    transition: background 0.3s;
  }
  .spatial-island:hover .island-glass { background: rgba(255, 255, 255, 0.14); }
  ```
  顶部胶囊与 Dock 用同一配方，模糊值为 `blur(36px)`，圆角为 `9999px`。
* **浮岛卡片结构**：外层 `.spatial-island.tilt-card`（`border-radius: 28px; transform-style: preserve-3d; transition: transform 0.1s ease-out`）负责倾斜，内层 `.island-glass` 负责材质。卡片内从上到下依次是：Emoji 图标（`2.2rem`）、标题、正文（`flex: 1` 撑满），最后是以 `1px rgba(255,255,255,0.1)` 顶线隔开的等宽元数据行。网格为 `repeat(auto-fit, minmax(300px, 1fr))`，`gap: 28px`。
* **顶部状态胶囊**：`inline-flex`，`gap: 14px`，`padding: 10px 24px`，中间是一条 `1px × 16px`、`rgba(255,255,255,0.2)` 的竖向分隔线。
* **悬浮 Dock**：`position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%)`，底色 `rgba(20,26,40,0.75)`，`padding: 8px 16px`。内含 5 个 44px 圆形 Emoji 按钮。
  ```css
  .dock-item { width: 44px; height: 44px; border-radius: 50%; border: none; background: transparent;
               transition: transform 0.2s, background 0.2s; }
  .dock-item:hover  { transform: scale(1.15) translateY(-4px); background: rgba(255, 255, 255, 0.15); }
  .dock-item.active { background: rgba(56, 189, 248, 0.25); box-shadow: 0 0 15px rgba(56, 189, 248, 0.4); }
  ```

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **3D 陀螺仪倾斜 (main.js)**：在 `.tilt-card` 上监听 `mousemove`，以卡片中心为原点，把指针的偏移量归一化后映射为最大 ±10° 的旋转，并整体放大 1.02 倍。指针离开时复位。外层的 `transition: transform 0.1s ease-out` 让跟随过程顺滑。
  ```js
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  // mouseleave → rotateX(0) rotateY(0) scale3d(1,1,1)
  ```
  同时，玻璃底色在 `0.3s` 内由 8% 提亮到 14%。demo **没有**实现跟随指针的反光斑，倾斜时只有角度和底色两项变化。
* **Dock 放大**：悬停按钮 `scale(1.15) translateY(-4px)`，同时出现 15% 白色圆底，时长 `0.2s`。
* **Dock 激活切换 (main.js)**：点击任一 Dock 按钮，先移除所有按钮的 `.active`，再给当前按钮加上，激活态带天蓝底和外发光。
* **减弱动效**：本预设没有持续循环动画，环境光是静止的。在 `prefers-reduced-motion: reduce` 下，应跳过倾斜脚本（不绑定 `mousemove`），并取消 Dock 的缩放位移，只保留底色变化。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【微缩浮岛·空间拟物 (Aero Spatial Computing UI)】风格，为 {{品牌/产品名}} 生成一个空间计算主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为深空蓝黑 #0B0F19。玻璃底 rgba(255,255,255,0.08)，悬停时 0.14。
- 晶体描边 1px rgba(255,255,255,0.22)，顶部内高光 inset 0 1px 0 rgba(255,255,255,0.35)。
- 双层空间阴影：0 30px 60px -12px rgba(0,0,0,0.55), 0 18px 36px -18px rgba(0,0,0,0.5)。
- 文本白 #FFFFFF，弱文本 #94A3B8。点睛色为天蓝 #38BDF8；靛紫 #818CF8 只用于环境光。

二、材质构件
- 环境光斑：两个固定大圆（天蓝 600px 放在左上，靛紫 500px 放在右下），radial-gradient 加 filter: blur(120px)、opacity 0.35，置于内容层之下。
- 晶体玻璃：backdrop-filter: blur(36–40px) 加上述描边、内高光和双层阴影，卡片圆角 28px，胶囊圆角 9999px。
- 浮岛卡片：外层负责 3D 倾斜（transform-style: preserve-3d），内层负责玻璃材质。卡片内依次放 Emoji 图标、标题、正文，底部用 1px 顶线隔出一行等宽天蓝元数据。三列网格的父级设 perspective: 1000px。
- 顶部状态胶囊：Logo、1px 竖线分隔，再接一段等宽天蓝状态字。
- 悬浮 Dock：fixed 定位在底部居中，深色玻璃底 rgba(20,26,40,0.75)，内含 5 个 44px 圆形图标按钮；激活态为天蓝 25% 底加 0 0 15px 天蓝外发光。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（300–800）与 JetBrains Mono（500）。
- 主标题 3.5rem、字重 800、字距 -0.03em、行高 1.15，居中两行。副文 1.1rem、行高 1.65、弱文本色。
- 所有系统元数据（跟踪状态、胶囊标签、卡片指标）用 JetBrains Mono 0.72–0.75rem 天蓝色。

四、交互与动效
- 3D 陀螺仪倾斜：在卡片上 mousemove 时，以卡片中心为原点归一化，计算 rotateX = 偏移Y × -10°、rotateY = 偏移X × 10°，并 scale3d(1.02)；离开时复位，transition 0.1s ease-out。悬停时玻璃底色提亮。
- Dock 悬停：scale(1.15) translateY(-4px)，0.2s。点击时在按钮之间切换 active 态。
- 在 prefers-reduced-motion: reduce 下不绑定倾斜，并取消 Dock 的缩放位移。

五、内容板块（示例，可按业务替换）
- 顶部状态胶囊：「✦ {{品牌/产品名}}」加一段运行状态（如「TRACKING: ACTIVE」）。
- 空间 Hero：等宽胶囊标签、两行大标题（如「无界空间，触手可及。」）和一句副文。
- 三张浮岛卡片：每张对应一项核心能力（如 眼动意图预测 / 空间手势 / 环境声场），各带一个指标元数据（如 LATENCY: < 2ms）。
- 悬浮 Dock：5 个功能入口图标，中间一个默认激活。
```
