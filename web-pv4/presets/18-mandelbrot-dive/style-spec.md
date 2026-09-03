# 风格构成说明：分形深潜·Mandelbrot 观测台 (Mandelbrot Dive)

## 1. 风格概述 (Style DNA)

* **核心理念**：把页面主视觉交给一条只用三个符号写完的公式 `z → z² + c`。海岸线没有细节上限，但 FP32 有 —— 诚实地把"精度护栏"写在 HUD 上，是这个预设最炫技也最克制的地方。
* **技术锚点**：逃逸时间算法 / smooth iteration count（去色带）/ IQ 余弦调色板 / 对数式自动深潜 / FP32 精度护栏（min scale 4e-5）。
* **视觉情绪**：数学的优雅、观测台、衬线字与金青配色的学术气质。
* **适用场景**：科研机构、数据/复杂系统品牌、数学教育、需要"智识感"的任何产品。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --void: #030408;
  --glass: rgba(12, 14, 24, .6);
  --line: rgba(217, 180, 82, .18);

  --ink: #e9e6db;      /* 暖白（衬线正文） */
  --gold: #d9b452;     /* INSTANT 调色板主色 */
  --teal: #3fd9c0;
  --violet: #8f7bff;
  --rose: #ff6b9d;     /* DEEP 调色板主色 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题**：`Newsreader` 600（可变光学尺寸衬线，带斜体强调），营造学术期刊气质。
* **正文 / HUD / 公式**：`JetBrains Mono`。
* **数学装饰**：kicker 写判定条件 `‖z‖ > 2 ⟹ 逃逸`；章节名用「公理 01」、方程风格。
* **唯一斜体**：Hero 里的「海岸线」用衬线斜体 —— 数学文献式的强调。

---

## 4. 核心技术规程 (Escape-Time Shader)

```glsl
// ① 逃逸时间 + smooth iteration count（消除色带）
for (int i = 0; i < 512; i++) {
  if (float(i) >= u_iter) break;
  z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;
  float m = dot(z, z);
  if (m > 256.0) {
    n = float(i) + 1.0 - log2(log2(m)) * 0.5;   // 连续逃逸时间
    break;
  }
}

// ② IQ 余弦调色板：一个 uniform 切换整套配色
vec3 pal(float t){
  vec3 a = vec3(0.46, 0.44, 0.42);
  vec3 b = vec3(0.50);
  return a + b * cos(6.28318 * (t + u_palette));
}

// ③ 内部集合：接近纯黑，不做花哨内着色
col = vec3(0.004, 0.005, 0.010);
```

* **自动深潜**：对数式插值 `scale = exp(mix(log 2.8, log 6e-5, lz))`，围绕双螺旋谷坐标 `(-0.743643887037151, 0.131825904205330)` 缓慢摆动。
* **FP32 护栏**：`scale ∈ [4e-5, 3.2]` —— 低于此值 fp32 的像素间距大于特征尺寸，图形开始碎裂；HUD 实时显示放大倍率。
* **手动接管**：拖动平移、滚轮缩放都会关闭 `autoDive`，并把状态写回角标。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **深潜速度**：`dive` 滑块 0–2.0 控制 `sin(t·0.06·dive)` 的频率。
* **色彩循环**：`cycleT += 0.00035` 每帧缓慢漂移，边界颜色永不重复。
* **调色板过渡**：`u_palette` 相位在 0.5s 内插值，金/青 ↔ 品红/蓝紫无缝切换。
* **HUD**：ZOOM（1.0× → 46k× 自动换算 k）、ITER、CENTER（7 位小数）、FPS 每 400ms 更新。
* **过渡曲线**：所有状态插值 0.05–0.08/帧，观测台般平稳。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 480px WebGL Canvas + `FIG. I` 图版角标 |
| HUD | EQUATION / ZOOM / ITER / CENTER / PRECISION / FPS |
| Hero | 判定式 kicker → 双行衬线标题（斜体强调）→ 原理描述（含 FP32 自白）→ 双 CTA |
| 三条公理 | 4 张毛玻璃卡 |
| 深潜控制 | 左：双模式 + DIVE SPEED / COLOR CYCLE 滑块；右：推理流 |
| 研究手记 | `math>` 提示符 + 猜想流 |
| 评测 | 4 组衬线数值 + 金→青条 |
| Footer | 精度自白署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名数学与图形双栖的工程师。请以【Mandelbrot 分形观测台】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏三角形驱动片元着色器，逃逸时间算法渲染 Mandelbrot 集合：z → z² + c，逃逸半径 R²=256。
2. smooth iteration count：n = i + 1 − log₂(log₂|z|²)·0.5，消除色带；集合内部近纯黑 vec3(0.004,0.005,0.010)。
3. IQ 余弦调色板 pal(t) = a + b·cos(2π(t + d))，uniform d 控制两套配色：INSTANT 金/青，DEEP 品红/蓝紫，切换时插值过渡。
4. 自动深潜：围绕 (-0.743643887037151, 0.131825904205330) 对数式缩放 scale = exp(mix(ln2.8, ln6e-5, lz))，中心带微幅摆动；拖动平移、滚轮缩放会关闭自动深潜；FP32 护栏 scale ∈ [4e-5, 3.2]。
5. UI：Newsreader 600 衬线标题（斜体强调）+ JetBrains Mono 正文，sticky HUD 显示 ZOOM/ITER/CENTER/PRECISION(FP32)/FPS；配色 #030408 底 + 金 #D9B452 / 青 #3FD9C0，毛玻璃卡浮于分形之上。
```
