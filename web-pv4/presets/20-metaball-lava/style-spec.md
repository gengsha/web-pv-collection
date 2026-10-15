# 风格构成说明：熔岩元球·实时标量场渲染 (Metaball Scalar Field)

## 1. 风格概述 (Style DNA)

* **核心理念**：岩浆既不是视频也不是粒子系统 —— 每个像素都对所有热核求一个平方反比标量场 `v = Σ rᵢ²/d²`，越过等值面 `v = 1.0` 的部分自然融合成液滴。液体是"一个喜欢自己的函数"。
* **技术锚点**：逐像素标量场 / 256 项颜色 LUT / 等值带（iso-band）模拟等值线 / `Uint32Array` ABGR 直写 / 低分辨率求值 + 双线性放大。
* **视觉情绪**：熔炉、热成像、地质剖面、高温下的沉稳。
* **适用场景**：能源/材料品牌、流体与仿真产品、游戏工作室、需要"温度感"的技术页面。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --char: #0c0507;      /* 碳黑底 */
  --glass: rgba(30, 10, 12, .58);
  --line: rgba(255, 106, 0, .16);

  --lava: #ff6a00;      /* 主橙 */
  --amber: #ffc63f;     /* 高温黄 */
  --ember: #8c1e1e;     /* 低温红 */
  --cream: #fff3d6;     /* 白热 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 数值**：`Oxanium` 700/800（科技切角，自带仪表感）。
* **HUD / 正文 / 终端**：`JetBrains Mono`。
* **公式即装饰**：Hero kicker 写场方程 `v(p) = Σᵢ rᵢ² / ‖p − cᵢ‖²`。
* **色标**：视口右下角 `2.4 — 0.0` 的色带标尺，向观众解释 LUT 映射。

---

## 4. 核心技术规程 (Scalar Field Renderer)

```js
// ① 逐像素求和（3r 之外截断，省掉绝大部分无效计算）
let v = 0;
for (const b of balls) {
  const dx = x - b.x, dy = y - b.y;
  const d2 = dx*dx + dy*dy;
  if (d2 < b.r2 * 9) v += b.r2 / (d2 + 0.9);
}

// ② LUT 索引 + ABGR 打包直写（绕过逐通道赋值）
let idx = (v * 60) | 0;                       // 场值 0~4.2 → 0~255
if (idx > 255) idx = 255;
data[p++] = 0xff000000 | (LUT[c+2] << 16) | (LUT[c+1] << 8) | LUT[c];
```

* **等值带**：在 LUT 里把 `|v − 1.0| < 0.035` 的区间整体提亮 +34，就得到一条"画"出来的等值线 —— 不需要 Marching Squares。DEEP 档在 `v = 1.6` 再开一条内核亮线。
* **低分辨率策略**：在 `GW×GH`（180×100 / 300×168）的离屏画布求值，`putImageData` 后用 `drawImage` 双线性放大到全屏 —— 像素级场计算只有 2~5ms。
* **色带**：10 个停靠点（碳黑→暗红→橙→黄→白热）线性插值出 256 项 LUT，构建一次、逐像素 O(1) 查表。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **热核运动**：速度阻尼 `visc`（0.96–0.999）+ 中心弱回复 + 热噪声，边界反弹 —— 永不熄灭。
* **按住吸引**：`attract = true` 时所有热核向光标加速（0.05·heat）。
* **搅动岩浆**：一键给所有热核 ±2 的随机冲量。
* **双模式**：INSTANT 8 核 / 180×100 / 单等值线；DEEP 14 核 / 300×168 / 双等值线。
* **HUD**：BALLS / GRID / ISO / LUT / FPS 实时更新。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 460px Canvas + `CROSS-SECTION 04` 角标 + 场值色标 |
| HUD | FIELD / BALLS / GRID / ISO / LUT / FPS |
| Hero | 场方程 kicker → 双行标题 → 原理描述 → 双 CTA → 操作提示 |
| 四个热核舱室 | 4 张毛玻璃卡 |
| 热力学参数 | 左：双模式 + VISCOSITY / HEAT INPUT 滑块；右：推理流 |
| 遥测 | `core>` 提示符 + 指令流 |
| 评测 | 4 组数值 + 红→橙→黄条 |
| Footer | 场方程署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Metaball 标量场渲染】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 低分辨率离屏画布（INSTANT 180×100 / DEEP 300×168）逐像素求标量场 v = Σ rᵢ²/d²，3r 之外截断；putImageData 后 drawImage 双线性放大到全屏。
2. 颜色：10 停靠点（碳黑→暗红→橙→黄→白热）预插值出 256 项 LUT，场值 ×60 取索引；在 LUT 中把 |v−1.0|<0.035 的区间提亮 +34 形成等值带，DEEP 档再加 |v−1.6|<0.03 的内核亮线。
3. 性能：ImageData 用 Uint32Array 以 ABGR 打包直写（0xff000000 | b<<16 | g<<8 | r），避免逐通道赋值。
4. 物理：热核速度阻尼 0.96~0.999 + 中心弱回复 + 热噪声 + 边界反弹；按住鼠标全体向光标加速；「搅动岩浆」给随机冲量。
5. 双模式：INSTANT 8 热核/180×100/单等值线，DEEP 14 热核/300×168/双等值线；VISCOSITY / HEAT INPUT 滑块实时生效。
6. UI：Oxanium 800 标题 + JetBrains Mono 正文，sticky HUD 显示 BALLS/GRID/ISO/LUT/FPS；配色 #0C0507 底 + 橙 #FF6A00 / 黄 #FFC63F / 暗红 #8C1E1E / 白热 #FFF3D6，视口右下角放场值色标。
```
