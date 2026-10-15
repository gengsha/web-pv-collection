# 风格构成说明：韦尔莱布料·物理实验室 (Verlet Cloth Lab)

## 1. 风格概述 (Style DNA)

* **核心理念**：把页面中央挂一块真实的布。它没有刚体引擎、没有弹簧公式 —— 每个质点只记住上一帧的位置，"速度"由两帧差值隐式推出，形状靠反复松弛约束得到。
* **技术锚点**：Verlet 积分 / 位置约束松弛（Gauss-Seidel）/ 结构 + 剪切约束 / 阈值撕裂 / 应变染色渲染。
* **视觉情绪**：明亮的物理实验室、标本卡、工程师的白板。
* **适用场景**：教育/科普、仿真引擎官网、工业设计、服装与材料品牌、任何需要"可信的物理"的产品页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --paper: #f2f0eb;     /* 实验室浅底（全库唯一亮色主题之一） */
  --card: #fbfaf7;
  --line: rgba(30, 40, 70, .14);

  --cloth: #2b4c8c;     /* 松弛的织物 */
  --cloth-2: #4f7fd0;
  --stress: #ff5a3c;    /* 绷紧/应力 */
  --accent: #ff8a3c;    /* 橙色标签 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

* **标题 / 正文**：`DM Sans`（干净、几何、实验室感）。
* **HUD / 公式 / 图例**：`Space Mono`（略带打印味的等宽体）。
* **公式即装饰**：Hero kicker 直接写 Verlet 积分式 `x' = 2x − x_prev + a·Δt²`。
* **图例**：视口右下角 STRAIN 渐变条（蓝→橙→红），解释织物的染色规则。

---

## 4. 核心技术规程 (Solver)

```js
// ① Verlet 积分：速度 = 当前位置 − 上一帧位置（隐式，永不爆炸）
const vx = (p.x - p.px) * damp;
const vy = (p.y - p.py) * damp;
p.px = p.x; p.py = p.y;
p.x += vx + gx + windX;
p.y += vy + gy + windY;

// ② 约束松弛：把两个端点各修正一半（Gauss-Seidel）
const diff = (d - l.len) / d * 0.5;
a.x += dx * diff; a.y += dy * diff;
b.x -= dx * diff; b.y -= dy * diff;

// ③ 撕裂：结构约束长度超过静息 2.6 倍即失效
if (!l.shear && d > l.len * 2.6) l.dead = true;
```

* **约束拓扑**：结构（横 + 竖）34×24 = 1,582 条；剪切（两组对角）在 DEEP 档加入，把面内刚度提上来。
* **固定方式**：顶行每 4 列一个图钉 + 末角，让布形成自然垂坠的扇形褶皱。
* **风场**：`sin(t·0.02 + y·0.01)` 沿 X 施加，随高度相位偏移 —— 波会从上往下扫过布面。
* **渲染即诊断**：每条约束按应变 `strain = (d/len − 1) × 2.2` 染色，`hue = 222 → 12`（蓝→红），应力分布一目了然。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **拖拽**：按下时抓取 44px 内最近质点，鼠标直接改写其位置（`px/py` 同步，避免反向弹射）。
* **Shift + 拖动 = 撕裂**：光标 20px 半径内的约束标记为 `dead`，布会出现真实的破口。
* **迭代滑块**：1–12 次，实时改变织物硬度（1 次塌软、8 次挺括）。
* **风/重力滑块**：0–1.5 / 0–2.0，风压与重量实时对抗。
* **HUD**：POINTS / LINKS / ITER / WIND / FPS 全部实时。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 440px Canvas + 标本卡角标 + 应变图例 + 标尺点阵背景 |
| HUD | SOLVER / POINTS / LINKS / ITER / WIND / FPS |
| Hero | 公式 kicker → 双行标题 → 原理描述 → 双 CTA → 操作提示 |
| 四种材料 | 4 张卡片（能力矩阵） |
| 求解器参数 | 左：双模式 + ITERATIONS / WIND / GRAVITY 滑块；右：深色推理流 |
| 实验日志 | `lab>` 提示符 + 观测流 |
| 评测 | 4 组数值 + 蓝→红条 |
| Footer | 质点/约束数署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名物理与前端双栖的工程师。请以【Verlet 布料模拟】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 布料：34×24 质点，Verlet 积分（x' = 2x − x_prev + a·Δt²，damp 0.99），顶行每 4 列一个固定图钉 + 末角。
2. 约束：结构约束（横/竖，静息长度 = 网格间距），DEEP 档加入两组对角剪切约束；每次迭代做 Gauss-Seidel 松弛，两端各修正一半（固定点不动）。
3. 撕裂：结构约束长度超过静息 2.6 倍即断开；按住 Shift 拖动时删除光标 20px 半径内的约束。
4. 渲染：每条约束按应变染色 strain = (d/len − 1)×2.2，hue 从 222(蓝) 渐变到 12(红)；固定点画红色图钉；背景为点阵标尺。
5. 交互：拖动抓取 44px 内最近质点；ITERATIONS(1~12)/WIND/GRAVITY 滑块实时生效；双模式 INSTANT 1 次松弛无剪切，DEEP 8 次松弛 + 剪切 + 撕裂。
6. UI：DM Sans + Space Mono，明亮的实验室浅底 #F2F0EB，sticky HUD 显示 POINTS/LINKS/ITER/WIND/FPS，视口右下角应变图例条。
```
