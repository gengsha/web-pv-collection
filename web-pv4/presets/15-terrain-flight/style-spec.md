# 风格构成说明：无限地形·噪声穿行 (Infinite Terrain / Voxel Space)

## 1. 风格概述 (Style DNA)

* **核心理念**：不存高度图，只存一条噪声公式。相机永远向前飞，地形在视锥里实时生成又实时消失 —— 无限，因为从未被存储。
* **技术锚点**：value noise + 四倍频 fBm / Voxel Space 逐行投影 / 由远及近的画家算法 / 二次雾衰减 / 相机高度阻尼跟随。
* **视觉情绪**：测绘、远征、冷静的科学观察、数字高程模型（DEM）的质感。
* **适用场景**：地理信息（GIS）、自动驾驶、无人机、气象与气候产品、探索类品牌。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --deep: #030a18;     /* 夜空 */
  --mid: #071a33;
  --glass: rgba(8, 26, 48, .58);

  --cyan: #4fd8ff;     /* 等高线 / HUD */
  --aqua: #7cf5d5;     /* 高海拔 */
  --ice: #dff3ff;      /* 雪线 */
  --sun: #ffd9a0;      /* 地平线余晖 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 按钮**：`Archivo` 700/800（紧凑的工业无衬线）。
* **正文 / HUD**：`JetBrains Mono` —— 所有坐标、参数、公式都等宽。
* **公式即装饰**：Hero kicker 直接写 `h(x,z) = Σ aᵢ · valueNoise(2ⁱx, 2ⁱz)`。
* **地图配件**：视口右下角高程图例条、左上角 `DEM TILE 04 · SECTOR 37.42N / -122.08W`。

---

## 4. 核心技术规程 (Voxel Space Renderer)

```js
// ① value noise（双三次平滑插值）+ fBm 四倍频
function vnoise(x, y){
  const xi = Math.floor(x), yi = Math.floor(y);
  const u = (x-xi)**2 * (3 - 2*(x-xi));        // smoothstep
  const v = (y-yi)**2 * (3 - 2*(y-yi));
  return lerp4(hash(xi,yi), hash(xi+1,yi), hash(xi,yi+1), hash(xi+1,yi+1), u, v);
}
function fbm(x, y){ let s=0,a=.5,f=1; for(let i=0;i<4;i++){ s+=a*vnoise(x*f,y*f); f*=2; a*=.5; } return s; }
function height(x, z){ return Math.pow(fbm(x*.16, z*.16), 1.7) * 3.2 * amp - 0.35; }  // 幂次山脊化

// ② 逐行投影：z 越大，缩放越小
const scale = focal / zz;
const sx = W/2 + (wx - camX) * scale * 0.55;
const sy = horizon + (camY - hgt) * scale;

// ③ 画家算法：由远及近，用上一行的顶点闭合多边形再填充
for (let i = rows; i >= 1; i--) { ...; ctx.fill(); prev = pts; }
```

* **雾**：`fog = 1 - i/rows`，同时驱动 `fill` 的 alpha 与色相向背景收敛。
* **脊线**：每行单独 stroke 一次，alpha `0.05 + fog*0.30`，自然形成等高线。
* **相机跟随**：`camY += (height(camX, camZ+6) + 1.35 - camY) * 0.04` —— 平滑爬坡，永不穿模。
* **航线偏移**：`wx = camX + heading*zz*0.35 + ...`，鼠标横向位置即航向。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **前进**：`camZ += speed * 0.05`，滚轮调速（0.15–4.0）。
* **航向**：鼠标 X 映射 ±1 的 `heading`，横向切片随之偏移，产生转向感。
* **模式切换**：CRUISE（80 行 / 40 样本 / 速度 1.4）↔ SURVEY（130 行 / 72 样本 / 速度 0.6 + 等高线加强）。
* **振幅滑块**：0.2–2.2 实时改变 `amp`，从丘陵到雪山。
* **HUD**：ALT 显示实时相机高度，FPS 每 500ms 采样。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 440px Canvas + 上部渐隐坐标网格 + 角标 + 高程图例 |
| HUD | ENGINE / ROWS / SAMPLES / ALT / SPEED / FPS |
| Hero | 公式 kicker → 双行标题 → 原理描述 → 双 CTA → 操作提示 |
| 四层地层 | 4 张毛玻璃卡（能力矩阵） |
| 飞行参数 | 左：双模式 + SPEED / AMPLITUDE 滑块；右：推理流 |
| 野外电台 | `radio>` 提示符 + 电报流 |
| 评测 | 4 组数值 + 青→薄荷条 |
| Footer | 地形署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Voxel Space 无限地形】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 高程场：value noise（smoothstep 插值 + 四点哈希）+ 四倍频 fBm（频率 ×2、振幅 ×0.5 递归 4 次），再做 Math.pow(h, 1.7) 山脊化，实时求值不缓存。
2. 渲染：Voxel Space 逐行投影 —— 从最远行向最近行循环，每行 samples 个采样点，scale = focal / zz，与上一行顶点闭合成多边形后填充（画家算法），再 stroke 一次脊线形成等高线。
3. 雾与配色：fog = 1 - i/rows 驱动 alpha 与颜色向背景收敛；颜色由行平均高度 hn 决定 rgb(7+60hn, 26+150hn, 52+150hn)。
4. 相机：camY 向 height(camX, camZ+6)+1.35 做 0.04 阻尼跟随；鼠标横向位置作为航向偏移；滚轮调速。双模式 CRUISE 80行/40样本/速度1.4，SURVEY 130行/72样本/速度0.6。
5. UI：Archivo 800 标题 + JetBrains Mono 正文，视口带坐标网格遮罩与高程图例，sticky HUD 显示 ROWS/SAMPLES/ALT/SPEED/FPS；配色 #030A18 底 + 青 #4FD8FF / 薄荷 #7CF5D5 / 冰白 #DFF3FF / 暖阳 #FFD9A0。
```
