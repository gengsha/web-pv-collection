# 风格构成说明：文字粒子·形变矩阵 (Text Morph Matrix)

## 1. 风格概述 (Style DNA)

* **核心理念**：文字不是画出来的，是几千颗粒子各自归位的结果。字形先被栅格化成 alpha 掩码，再采样成目标点云 —— 每颗粒子都在解同一个弹簧方程。
* **技术锚点**：离屏画布栅格化 / alpha 掩码采样 / 弹簧-阻尼系统 / 鼠标斥力场 / 速度映射亮度 / `lighter` 叠加拖尾。
* **视觉情绪**：极简、黑底、白字被拆成星尘、冷静里带一点电。
* **适用场景**：开发者工具、AI 品牌、数据产品、任何想要"文字有生命"的极简站点。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --bg: #050506;       /* 纯黑 */
  --glass: rgba(18, 18, 24, .6);
  --line: rgba(255, 255, 255, .1);

  --ink: #f2f2f5;      /* 粒子主色（近白） */
  --electric: #6ea8ff; /* 高速粒子电光蓝 */
  --blue: #3d7bff;     /* UI 强调 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 粒子字形**：`Manrope` 800（几何感强，笔画粗，适合点阵采样）。
* **HUD / 正文 / 终端**：`JetBrains Mono`。
* **采样即字形**：粒子渲染时不用字体 —— 字形完全来自离屏掩码，所以 UI 字体和"粒子字体"可以不同。
* **黑白灰纪律**：UI 只允许黑/白/灰 + 一支电光蓝，把所有颜色都留给粒子的速度映射。

---

## 4. 核心技术规程 (Morph Pipeline)

```js
// ① 栅格化：自动缩放字号以适配画布
octx.font = `800 ${size}px ${WORD_FONT}`;
if (tw > ow * 0.92) size = Math.floor(size * (ow * 0.92) / tw);

// ② alpha 掩码采样（stride=2）
for (let y = 0; y < oh; y += 2)
  for (let x = 0; x < ow; x += 2)
    if (data[(y * ow + x) * 4 + 3] > 128) targets.push([mapX(x), mapY(y)]);

// ③ 粒子认领目标：i % targets.length（多余粒子重叠填充，密度自然不均）
const t = T[i % tn];
vx[i] += (t[0] - px[i]) * spring;
vy[i] += (t[1] - py[i]) * spring;
vx[i] *= damp; vy[i] *= damp;

// ④ 鼠标斥力场
if (d2 < 16900) {                       // 130px
  const f = (1 - d / 130) * 2.6 * scatter;
  vx[i] += dx / d * f; vy[i] += dy / d * f;
}
```

* **渲染**：`globalCompositeOperation = 'lighter'` + 1.6px 方块；速度映射亮度 `sp = min(1, (|vx|+|vy|)·0.16)`，快速粒子偏电光蓝。
* **拖尾**：DEEP 档每帧 `rgba(0,0,0,0.18)` 覆盖（不用 clearRect），形成运动残影。
* **词轮播**：每 4.2s 自动切换；点击舞台立即切；用户输入可覆写当前词。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **双模式弹簧**：INSTANT `k=0.06 / damp=0.86`（硬，干脆就位）；DEEP `k=0.02 / damp=0.91`（软，可见形变过程）。
* **打乱重排**：一键给所有粒子随机初速 ±13，看它们重新收敛到字形 —— 涌现的最直观演示。
* **鼠标斥力**：130px 半径线性衰减，`scatter` 滑块 0–2.0 控制力度。
* **HUD**：PARTICLES / SPRING / NEXT WORD / FPS 实时更新。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 460px 黑色舞台 + 管线角标 + 底部操作提示 |
| HUD | ENGINE / PARTICLES / SPRING / NEXT WORD / FPS |
| Hero | 管线注释 kicker → 双行大标题 → 原理描述 → 双 CTA → 操作提示 |
| 粒子周期表 | 4 张毛玻璃卡 |
| 形变控制 | 左：双模式 + SPRING k / SCATTER FORCE 滑块；右：推理流 |
| 用粒子说话 | 单行输入框（≤8 字符）→ 回车即时上屏 |
| 评测 | 4 组数值 + 白→蓝条 |
| Footer | 涌现署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【文字粒子形变矩阵】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 文字→粒子管线：离屏画布 320×90 绘制目标词（Manrope 800，超宽自动缩字号），getImageData 后按 alpha>128、步距 2px 采样成目标点，映射回主画布坐标。
2. 粒子池：Float32Array（px/py/vx/vy），INSTANT 4,000 粒子 / DEEP 9,000 粒子，认领规则 i % targets.length。
3. 物理：弹簧 k（0.06 硬 / 0.02 软）+ 阻尼（0.86 / 0.91）；鼠标 130px 半径线性衰减斥力 f = (1−d/130)·2.6·scatter。
4. 渲染：globalCompositeOperation='lighter'，1.6px 方块；速度映射亮度（快速粒子电光蓝 #6EA8FF，静止近白）；DEEP 档每帧 rgba(0,0,0,0.18) 覆盖做拖尾。
5. 交互：每 4.2s 自动轮播词表（HY4/INSTANT/DEEP/256K/×8），点击立即切换，输入框可覆写当前词（≤8 字符），「打乱重排」按钮给全粒子随机初速。
6. UI：Manrope 800 标题 + JetBrains Mono 正文，56px 网格背景（径向遮罩），sticky HUD 显示 PARTICLES/SPRING/NEXT WORD/FPS；纯黑底 #050506，UI 只用黑白灰 + 电光蓝 #6EA8FF / 蓝 #3D7BFF。
```
