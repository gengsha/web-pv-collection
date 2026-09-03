# 风格构成说明：双子深空天文台终端 (Retro Gemini Space Terminal)

## 1. 风格概述 (Style DNA)
* **核心理念**：将 Gemini 拟人化为一个部署在深空拉格朗日 L2 点的超长寿命天文观测终端。采用 90 年代科幻复古琥珀色 CRT 显示屏与纯等宽纯粹极客美学。
* **视觉情绪**：深空孤寂、硬核科幻、高精度遥测、复古极客、怀旧数字工业感。
* **适用场景**：CLI 工具文档、极客工程师主页、深空科学数据展示。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色 */
  --crt-bg: #0c0a06;
  --crt-screen-inner: #151007;
  
  /* 琥珀色调 */
  --amber-bright: #ffb000;
  --amber-dim: #b37b00;
  --amber-dark: #4d3500;
  --amber-glow: 0 0 10px rgba(255, 176, 0, 0.45);
  
  /* 警示与点缀 */
  --pulse-alert: #ff334b;
  --crt-border: #3d2b07;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=VT323&display=swap" rel="stylesheet">
  ```
* **标题与 ASCII (Title/ASCII)**：`VT323` 或 `JetBrains Mono` 粗体。
* **正文与遥测 (Body/Data)**：`JetBrains Mono` 纯等宽。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **CRT 荧光屏畸变与扫描线**：
  使用 CSS 径向渐变与紧密扫描线模拟老式阴极射线管屏幕的微曲面与发光残影。
* **ASCII Art 艺术字大标**：
  使用字符艺术绘制 GEMINI 标志性徽章与系统状态面板。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **字符打字机输出**：系统启动或执行命令时以微秒间隔逐字吐出。
* **交互式命令输入框**：支持输入 `help`, `status`, `scan`, `clear` 等终端指令。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【双子深空天文台终端 (Retro Gemini Space Terminal)】风格生成纯等宽极客个人主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉基调：纯黑/深褐黑 (#0C0A06) CRT 荧光屏，全站主色为高照度琥珀金黄色 (#FFB000)，带有 CRT 扫描线与荧光辉光。
2. 字体构件：全站采用 JetBrains Mono 或 VT323 纯等宽字体，包含 ASCII Art 艺术字的大标题与天体坐标刻度标尺。
3. 核心板块：
   - 顶部深空遥测抬头（包含天体坐标、接收频率、内存占用）
   - 中部 ASCII 艺术徽章与使命介绍
   - 交互式终端命令行（CLI Shell，支持敲击 help/scan/status 触发交互）
   - 实时滚动的多模态深空信号解码日志
```
