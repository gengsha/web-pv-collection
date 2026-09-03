# 风格构成说明：等轴测线框·工程蓝图 (Isometric Blueprint Drafting)

## 1. 风格概述 (Style DNA)

* **核心理念**：把 hy4 当成一台可以被拆解、被标注、被制图的机器。整站就是一张工程图纸：坐标网格、等轴测线框、尺寸标注与技术图框，一应俱全。
* **视觉情绪**：精密、专业、冷静、可验证、工程师的浪漫。
* **适用场景**：基础设施/云产品、硬件与物联网、架构说明页、技术文档站、开发者平台。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --bp-deep: #071b33;    /* 蓝图深底 */
  --bp: #0b2545;
  --bp-2: #123258;

  --line: #a8d0e6;       /* 图纸白线 */
  --line-dim: #5d87a8;
  --cyan: #4fc3f7;       /* 高亮青（活跃通路） */
  --amber: #ffd166;      /* 标注黄 */
  --rev-red: #ff6b6b;    /* 修订红 */
  --ok-green: #6ee7b7;

  --text-hi: #d6e8f5;
  --text-dim: #8fb0c9;
  --text-muted: #5b7f9c;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&family=IBM+Plex+Sans:wght@400;600;700&display=swap" rel="stylesheet">
```

* **全站等宽**：`IBM Plex Mono` 是主字体 —— 标题、正文、标签、图号全用它，只在超大标题与数值上用 `IBM Plex Sans` 600/700。
* **大写与字距**：几乎所有文字都大写，`letter-spacing` 在 `.06em ~ .3em` 之间，模拟制图字的疏朗。
* **编号体系**：`DWG-04 / ITEM 01 / SHEET 02 / REV.B / FIG.01`，每一个构件都有可引用的编号。
* **SVG 内文字**：统一 `font-size: 11px`，`letter-spacing: .1em`，颜色 `--text-dim`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **坐标网格纸**：四层 `linear-gradient`（16px 细线 ×2 + 80px 粗线 ×2），透明度 `.07 / .13`。
* **等轴测线框 (30° Isometric)**：纯 SVG `polygon` 手工计算顶点。一个立方体的标准画法：

```
顶面：(x,y) (x+60,y+34) (x,y+68) (x-60,y+34)
左面：(x-60,y+34) (x,y+68) (x,y+68+h) (x-60,y+34+h)
右面：(x+60,y+34) (x,y+68) (x,y+68+h) (x+60,y+34+h)
```

* **描线生长 (Line Drawing)**：`stroke-dasharray: 900` + `stroke-dashoffset: 900 → 0`，JS 按元素顺序叠加 `animation-delay`（主图 55ms/条，小图 40ms/条）。

```css
.ln { stroke-dasharray: 900; stroke-dashoffset: 900; animation: draw 2.4s var(--ease) forwards; }
```

* **尺寸标注**：两端短横线 + 中间虚线 + 上方数值文字，颜色用标注黄。
* **图框**：`position: fixed; inset: 12px` 的 1px 外框 + `inset 0 0 0 4px` 内衬阴影。
* **标题栏 (Title Block)**：页脚六格表格（DRAWN BY / DWG NO. / SCALE / REV / DATE / SHEET）+ 一行通栏 TITLE。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **扫描光束**：高 160px 的青色渐变条，9s 从屏幕顶部穿到底部，模拟晒图机扫描。
* **流动虚线**：信号通路线条 `stroke-dasharray: 8 6` + `stroke-dashoffset` 每 1.2s 位移 -28，形成流动方向感。
* **通路切换**：未选中的通路整组 `opacity: .18`，选中通路恢复全亮，状态行同步更新跳数与延迟。
* **拖拽旋转**：在主图上按住拖动可 ±12° 旋转整张等轴测图（映射系数 0.08），双击复位。
* **数据条**：进入视口后 1.2s 补间到目标宽度（青色渐变 + 半透明底）。
* **过渡曲线**：`cubic-bezier(0.16,1,0.3,1)`；工程感要求所有动画"可预期"，不做弹跳。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 图头 | DWG 编号 + 图名 + 等宽锚点 + REV/SCALE/UNIT |
| 总装图 Hero | 左：图号 + 三行大标题 + 说明 + 按钮；右：等轴测 SVG（平台 + 三构件 + 两处尺寸标注） |
| 构件明细 | 4 张卡，各含一个等轴测小图 + ITEM 编号 + 说明 + 标签 |
| 信号流图 | 900×260 SVG，A 直通 / B 回授自校，可切换，未选中通路淡出 |
| 技术规格 | 工程表格（ITEM / BENCHMARK / VALUE / TOL / GRAPH） |
| 图纸终端 | `[001]` 序号 + 署名 + 正文 的三列日志 + `CMD>` 输入 |
| 标题栏 | 六格工程信息 + 通栏 TITLE |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【等轴测线框·工程蓝图 (Isometric Blueprint)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：蓝图深蓝 #071B33 底（可叠 #0B2545 渐变），图纸白线 #A8D0E6，高亮青 #4FC3F7，标注黄 #FFD166，修订红 #FF6B6B，文字 #D6E8F5 / #6E93B0。
2. 材质构件：工程坐标网格纸（双层 repeating-linear-gradient，细线 1px + 粗线每 5 格）；纯 SVG 等轴测线框（30° 斜角立方体 / 服务器机架 / 管道），stroke-dasharray 描线生长动画；尺寸标注（两端箭头 + 连线 + 数值）；右下角工程图标题栏（Title Block：项目名、比例、图号、日期）。
3. 字体排版：全站 IBM Plex Mono 等宽（标题可 IBM Plex Sans 600），全大写字母 + 字间距 0.08em，技术编号体系（如 DWG-04 / REV.B）。
4. 交互与动效：页面载入时 SVG 线框按 stroke-dashoffset 逐段绘制；一条青色扫描线自上而下循环扫过整张图纸；鼠标拖拽可微调等轴测机架角度；hover 构件时高亮并弹出标注气泡。
5. 内容板块：hy4 系统架构总装图 Hero、能力矩阵（四组等轴测构件说明）、混合推理（双路信号流线图）、技术规格参数表、图框页脚。
```
