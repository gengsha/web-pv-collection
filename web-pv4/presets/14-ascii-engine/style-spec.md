# 风格构成说明：实时字符化·ASCII 渲染管线 (ASCII Render Pipeline)

## 1. 风格概述 (Style DNA)

* **核心理念**：把一整套软件渲染管线搬到浏览器里跑，最后一步的"像素"不是方块，而是字符。观众看到的每个字母，都是一次亮度量化的结果。
* **技术锚点**：点云旋转矩阵 / 正交投影 / z-buffer 消隐 / 朗伯漫反射 + 边缘光 / 亮度量化字符映射 / 逐行 HSL 着色。
* **视觉情绪**：极客、克制、终端美学、把复杂藏在最朴素的表达后面。
* **适用场景**：开发者工具、CLI 产品、技术博客、终端/编辑器品牌、需要"硬核可信"气质的页面。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --bg: #05060a;        /* 终端黑 */
  --bg-2: #0a0c14;
  --glass: rgba(12, 16, 26, .62);

  --ink: #d8f6ff;       /* 字符主色 */
  --cyan: #5ad9ff;      /* 强调（顶部字符） */
  --blue: #6f8cff;      /* 底部字符 */
  --lime: #b8ff5c;      /* 数值/标签 */
  --amber: #ffc46b;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 按钮**：`Chakra Petch` 600/700（自带机械切角的科技无衬线）。
* **正文 / HUD / 终端**：`JetBrains Mono`。
* **渲染字体**：Canvas 内同样用 `JetBrains Mono`，字号由格宽反推 `fontPx = cellW / 0.6`（等宽字符宽高比约 0.6）。
* **关键**：`ctx.textBaseline = 'top'`，逐行 `fillText(整行字符串)` —— 每行一次调用，60fps 毫无压力。

---

## 4. 核心技术规程 (Software Rasterizer)

```js
// ① 旋转（先绕 Y，再绕 X）
let x = p.x * cosY + p.z * sinY;
let z = -p.x * sinY + p.z * cosY;
const y2 = p.y * cosP - z * sinP;
const z2 = p.y * sinP + z * cosP;   // 法线同步旋转

// ② 正交投影 + z-buffer
const sx = Math.floor((cx + x * scale) / cellW);
const sy = Math.floor((cy - y2 * scale) / cellH);
if (z2 <= zbuf[idx]) continue;      // 近者胜
zbuf[idx] = z2;

// ③ 朗伯 + 边缘光
const diff = Math.max(0, nx*lx + ny*ly + nz*lz);
const rim  = Math.pow(1 - Math.abs(nz), 3) * 0.55;
cells[idx] = Math.min(1, 0.10 + diff * 0.85 + rim);

// ④ 量化到字符灰阶
const RAMP = ' .:-=+*#%@';
ch = RAMP[Math.round(v * (RAMP.length - 1))];
```

* **几何**：球用 Fibonacci 分布（4,000 点）；环面用 `(R + r·cos v)·cos u` 参数网格（200×60 = 12,000 点）。
* **缓冲**：`Float32Array(cols*rows)` 两个（亮度 + z），每帧 `fill(0)` / `fill(-1e9)` 复用，零 GC。
* **着色技巧**：逐行用 `hsl(188 + t*62, 92%, 52 + sin(t·π)*22)`，让字符从上到下由青转蓝紫，中部最亮 —— 一次调用就得到"打光"效果。
* **空行跳过**：`if (!str.trim()) continue;` 省掉大量无意义绘制。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **自转 + 拖拽**：`yaw += 0.012`，拖动时 `yaw/pitch` 累加（pitch 夹在 ±1.2）。
* **光源跟随光标**：`lightAz` 由光标 X 映射 0–2π，`lightEl` 由光标 Y 映射 0.35–1.25 —— 转动鼠标就是转动灯光。
* **呼吸位移**：投影中心 Y 轴以 `sin(t*0.0006)` 轻微浮动。
* **模式切换**：INSTANT = 球 / 96 列 / 4,000 点；DEEP = 环面 / 200 列 / 12,000 点 + 边缘光。
* **HUD**：GRID、SAMPLES、RAMP、FPS 实时更新。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 420px 高 Canvas + 左上角 `// VIEWPORT 01` 角标 + 扫描线叠加 |
| HUD | PIPELINE / GRID / SAMPLES / RAMP / FPS |
| Hero | 管线注释 kicker → 标题（渐变"压成"）→ 管线自述 → 双 CTA → 操作提示 |
| 渲染阶段 | 4 张毛玻璃卡（能力矩阵） |
| 采样控制台 | 左：模式 + GRID COLS / LIGHT AZIMUTH 滑块；右：推理流 |
| 终端 | `render>` 提示符 + 消息流 |
| 评测 | 4 组数值 + 青→柠檬条 |
| Footer | 管线署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【ASCII 实时字符渲染】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，不用任何库）。
技术要求：
1. Canvas2D 软件渲染管线：Float32Array 亮度缓冲 + z-buffer（每帧 fill 复用），点云绕 Y/X 轴旋转矩阵，正交投影到 cols×rows 网格，z-buffer 取最近点消隐。
2. 着色：朗伯漫反射 max(0, N·L) + 边缘光 pow(1-|nz|, 3)*0.55，光源方向由鼠标位置实时计算（azimuth 0~2π，elevation 0.35~1.25）。
3. 字符映射：RAMP = ' .:-=+*#%@'，亮度量化后取整；逐行 fillText 整行字符串（textBaseline='top'），每行用 hsl(188 + t*62, 92%, 52 + sin(t*π)*22) 着色形成上下渐变；字号 fontPx = cellW / 0.6。
4. 双模式：INSTANT = Fibonacci 球 4,000 点 / 96 列；DEEP = 环面 200×60 = 12,000 点 / 200 列 + 边缘光；网格列数可滑块调节（60~260）。
5. UI：Chakra Petch 标题 + JetBrains Mono 正文，40px 网格背景，sticky HUD 显示 GRID/SAMPLES/FPS，毛玻璃卡浮于黑色之上；配色 #05060A 底 + 青 #5AD9FF / 蓝 #6F8CFF / 柠檬 #B8FF5C。
```
