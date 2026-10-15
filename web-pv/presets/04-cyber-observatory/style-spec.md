# 风格构成说明：双子深空天文台终端 (Retro Gemini Space Terminal)

## 1. 风格概述 (Style DNA)
* **核心理念**：把产品化身为一台部署在深空观测站里的复古琥珀色 CRT 终端——整页就是一块显示器，内容全部以遥测读数、ASCII 横幅和可输入命令的 CLI 呈现。
* **视觉情绪**：孤寂、硬核科幻、复古极客、怀旧数字工业感、单色的专注。
* **适用场景**：CLI 工具与开发者文档首页、极客个人主页、科学数据/遥测展示、黑客松作品页。
* **构图法则**：纯黑 `#000000` 页面正中放一台 `max-width: 960px` 的「显示器」（`#120d06` 屏幕底、2px `#996a00` 外框、圆角 12px、外琥珀辉光 + 内暗角），屏幕上覆盖 2px 周期扫描线；屏内纵向排列「虚线分隔的系统抬头 → VT323 ASCII 横幅 → 描边任务简报框 → 双列遥测卡片（数据行 + 填充条）→ 纯黑 CLI 输入区」。全页只用一个琥珀色相的明暗层级，没有第二种颜色。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 屏幕底色 */
  --crt-bg: #0a0804;
  --crt-inner: #120d06;

  /* 琥珀单色三级 */
  --amber-bright: #ffb000;
  --amber-dim: #996a00;
  --amber-dark: #332300;

  /* 荧光辉光 */
  --amber-glow: 0 0 8px rgba(255, 176, 0, 0.4);
}
```

* **用法分工**：`#ffb000` 用于所有正文、数值与填充条；`#996a00` 用于边框与虚线；`#332300` 用于卡片内分隔线与填充条底槽；CLI 提示符略偏橙 `#ff9900`；页面外围与 CLI 区为纯黑 `#000000`。关键数值与 ASCII 横幅叠加 `--amber-glow` 文字辉光模拟荧光粉。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=VT323&display=swap" rel="stylesheet">
  ```
* **全局字体**：`body` 统一 `JetBrains Mono`，整页只有等宽字。
* **ASCII 横幅 (Display)**：`VT323`，`1.15rem`，行高 `1.1`，居中，`text-shadow: 0 0 8px rgba(255,176,0,0.4)`；用 `<pre>` 排出 figlet 风格字符大标 + 一行 `[ ... TERMINAL v9.2 ]` 版本号。
* **层级字号**：系统抬头 `0.75rem`；任务简报 `0.82rem` 行高 `1.6`（每行以 `> ` 开头）；卡片标题 `0.78rem` / 700，以 `// ` 前缀（如 `// SPECTRAL ATTENTION`）；数据行 `0.75rem` 两端对齐；CLI 日志 `0.8rem` 行高 `1.5`，输入 `0.85rem`。
* **强调方式**：不换色，只用 `font-weight: 700` + 文字辉光（`.amber-highlight`）。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **CRT 显示器外壳与扫描线**：
  ```css
  .crt-monitor { width: 100%; max-width: 960px; background: #120d06;
    border: 2px solid #996a00; border-radius: 12px; position: relative; overflow: hidden; padding: 24px;
    box-shadow: 0 0 30px rgba(255,176,0,0.15), inset 0 0 40px rgba(0,0,0,0.9); }
  .crt-scanlines { position: absolute; inset: 0; pointer-events: none; z-index: 10;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4) 1px, transparent 1px, transparent 2px); }
  ```
  `body` 以 flex 居中显示器，`padding: 20px`，背景纯黑。
* **系统抬头**：左右两组 `[SYSTEM: ...]`、`ORBIT: ...` / `SIGNAL: ...`、`● ONLINE` 标签，组内 `gap: 16px`，底部 `1px dashed #996a00`。
* **任务简报框**：`border: 1px solid #996a00; padding: 14px; background: rgba(255,176,0,0.03);`。
* **遥测卡片与填充条**：
  ```css
  .telemetry-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .term-card { border: 1px solid #996a00; padding: 14px; background: rgba(0,0,0,0.4); }
  .card-title { font-size: 0.78rem; font-weight: 700; border-bottom: 1px solid #332300; padding-bottom: 6px; margin-bottom: 10px; }
  .data-row { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 6px; }
  .bar-gauge { height: 6px; background: #332300; margin-top: 10px; border: 1px solid #996a00; }
  .bar-gauge .fill { height: 100%; background: #ffb000; box-shadow: 0 0 8px rgba(255,176,0,0.4); }
  ```
  卡片全部直角，每张 3 行「标签 ↔ 数值」加一条百分比填充条（如 82%、91%）。
* **CLI 终端区**：
  ```css
  .cli-section { border: 1px solid #996a00; background: #000; padding: 14px; border-radius: 4px; min-height: 160px; }
  .cli-log { font-size: 0.8rem; line-height: 1.5; display: flex; flex-direction: column; gap: 6px; max-height: 140px; overflow-y: auto; }
  .cli-entry.sys { color: #ffb000; opacity: 0.8; }
  .cli-input-row { display: flex; gap: 8px; margin-top: 10px; border-top: 1px dashed #332300; padding-top: 8px; }
  #cliInput { flex: 1; background: transparent; border: none; outline: none; color: #ffb000;
    font-family: 'JetBrains Mono', monospace; text-shadow: 0 0 8px rgba(255,176,0,0.4); }
  ```
  输入框前固定一段提示符 `user@host:~$`（`#ff9900`），输入框带 `autofocus`、关闭拼写检查与自动补全。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **在线指示灯闪烁 (CSS)**：抬头里的 `● ONLINE` 持续呼吸闪烁，是全页唯一的循环动画。
  ```css
  .pulse-indicator { animation: blink 1.2s infinite; }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
  ```
* **CLI 命令解析 (main.js)**：在输入框按 Enter 时，命令去空格并转小写；空命令忽略。先回显一行 `提示符 + 命令`，再按字典输出 `> 响应` 行（系统行 `opacity: 0.8`）。内置命令：`help`（列出命令）、`status`、`scan`、`models`、`about`，以及 `clear`（清空日志、不输出响应）；未知命令输出 `> 未知指令 'xxx'。输入 'help' 获取支持命令列表。`。每次输出后日志区滚动到底部。
* **静态质感**：扫描线、暗角与文字辉光均为静态 CSS，不做闪烁或抖动；页面没有悬停动效与过渡。
* **无障碍 / 减少动效**：在 `prefers-reduced-motion: reduce` 下关闭 `● ONLINE` 的 `blink` 循环动画（`animation: none`，保持常亮）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【深空天文台终端 (Retro Space Terminal)】风格，为 {{品牌/产品名}} 生成一个单页主页（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 页面外围纯黑 #000000；显示器屏幕 #120D06（备用底 #0A0804）。
- 琥珀单色三级：亮 #FFB000（文字/数值/填充）、中 #996A00（边框/虚线）、暗 #332300（分隔线/条槽）；提示符 #FF9900。
- 荧光辉光 0 0 8px rgba(255,176,0,0.4)。全页只允许这一种色相。

材质构件：
- 一台居中的 CRT 显示器：max-width 960px，2px #996A00 外框，圆角 12px，外琥珀辉光 + inset 0 0 40px 暗角；屏幕上覆盖 2px 周期横向扫描线（rgba(0,0,0,0.4)）。
- 系统抬头：左右两组方括号系统标签，底部 1px 虚线。
- 任务简报框：细描边 + 3% 琥珀底，每行以「> 」开头。
- 双列遥测卡片：直角细描边，标题以「// 」开头，3 行左右对齐的数据行 + 一条 6px 带辉光的百分比填充条。
- 纯黑 CLI 区：日志区可滚动，底部虚线分隔的「user@host:~$」提示符 + 透明无边框输入框（autofocus）。

字体排版：
- Google Fonts：JetBrains Mono（400–800，全站唯一正文字体）+ VT323（ASCII 横幅）。
- 用 <pre> 排出 figlet 风格 ASCII 大标（VT323、1.15rem、行高 1.1、文字辉光）+ 一行版本号。
- 强调只用加粗 + 文字辉光，不换颜色。

交互与动效：
- 抬头「● ONLINE」以 1.2s 无限闪烁（opacity 1→0.3→1），这是唯一的循环动画。
- CLI：回车后回显命令，再输出对应响应；支持 help / status / scan / models / about / clear，未知命令提示输入 help；输出后自动滚动到底。
- 不做悬停动画、不做 CRT 抖动。
- prefers-reduced-motion 下关闭闪烁动画，指示灯常亮。

内容板块（示例，可按业务替换）：
- 系统抬头（{{品牌/产品名}} 系统名、位置、信号频率、在线状态）
- ASCII 横幅（{{品牌/产品名}} 字符画 + 版本号）
- 任务简报（两行使命与已加载模块）
- 双列遥测卡片（如核心指标 / 性能带宽，各 3 行数据 + 填充条）
- 可交互 CLI 终端（命令响应文案围绕 {{品牌/产品名}} 的功能撰写）
```
