# 风格构成说明：瑞士编辑·国际主义网格 (Swiss Editorial Grid)

## 1. 风格概述 (Style DNA)

* **核心理念**：国际主义排版（International Typographic Style）。以网格为绝对骨架，一切元素左对齐、拒绝居中与装饰，用字号、字重与留白的对比建立层级。
* **视觉情绪**：理性、克制、精确、可信、博物馆级的信息秩序。
* **适用场景**：设计机构、学术/研究机构、数据产品、年报、需要强可信度的品牌官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --paper: #ffffff;   /* 纯白纸 */
  --ink: #0a0a0a;     /* 排版黑 */
  --red: #e30613;     /* 瑞士红（唯一强调色） */
  --grey: #8a8a8a;    /* 元数据灰 */
  --rule: #e4e4e4;    /* 分隔线 */

  --gutter: 24px;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **Display**：`Inter Tight` 900，字号 `clamp(3rem, 13vw, 11rem)`，行高 `.86`，字间距 `-.05em`，全大写。
* **次级标题**：`Inter Tight` 700，字间距 `-.03em`。
* **正文**：`Inter` 400，行高 `1.7`，正文灰度 `#444`。
* **元数据 / 表头**：`JetBrains Mono`，小写尺寸 + `letter-spacing: .12em`，全大写，颜色 `--grey`。
* **排版铁律**：禁止居中对齐；禁止描边圆角；禁止渐变；只用 1px / 3px 两种线宽。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **12 列栅格**：`grid-template-columns: repeat(12, 1fr)` + `gap: 24px`，卡片用 `grid-column: span 3/4/6` 错落排布。
* **可见辅助线**：全屏固定层，12 根 `rgba(227,6,19,.1)` 淡红色列 + 左右虚线，可一键开关。

```html
<div class="grid-overlay"><div class="cols"><i></i>×12</div></div>
```

* **顶部信息条**：`position: sticky` 的等宽元信息行（项目名 / 期号 / 栅格规格 / 网格开关），底部 1px 黑线。
* **区块编号**：每个区块头部 `01 / 02 / 03` 红色编号 + 粗标题 + 右侧英文小标，形成索引系统。
* **反色交互**：卡片 hover 时整块反白（黑底白字），并用负 margin + 等额 padding 保持文本位置不动。

```css
.cell:hover { background: #0a0a0a; color: #fff; padding: 0 12px; margin: 0 -12px; }
```

* **表格**：无竖线，只有 1px 横线；数值用 `Inter Tight` 900 大字号；相对值用红色实心条。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **链接扫出**：hover 时红色下划线从左向右 `scaleX(0→1)`。
* **反色切换**：`.cell:hover` 背景与文字 300ms 同时过渡，`padding/margin` 互补避免抖动。
* **数字滚动**：评测分进入视口后从 `0.0` 用 `requestAnimationFrame` + `easeOutCubic` 补间到目标值（1.1s）。
* **状态联动**：滚动时顶栏期号跟随当前区块编号更新。
* **过渡曲线**：`cubic-bezier(0.16,1,0.3,1)`，时长 250–350ms，绝不弹跳 —— 瑞士风格没有弹性。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 顶栏 | 等宽元信息 + 网格开关按钮，1px 黑线，sticky |
| 海报 Hero | 编号 + 横线 → 三行超大标题（第二行红色）→ 左侧导语 + 右侧事实清单表 |
| 能力矩阵 | 12 列栅格中 4 × span3 卡片，3px 黑色上边线 + 编号 + hover 反白 |
| 双模对照 | 左右两栏 A/B 对照（dl 定义列表 + 说明块）+ 底部选择按钮与状态行 |
| 直接提问 | 64px 标签列 + 文本列的网格化对话流 + 黑底提交按钮 |
| 评测表 | 四列数据表格 + 红色相对条 + 数字滚动 |
| 版本页脚 | EDITION / TYPEFACE / GRID / BUILD 四栏 colophon |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【瑞士编辑·国际主义网格 (Swiss Editorial)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：纯白 #FFFFFF 底，排版黑 #0A0A0A，瑞士红 #E30613，中性灰 #8A8A8A，浅灰分隔线 #E4E4E4。
2. 构图系统：严格的 12 列 CSS Grid（gap 24px），可切换显示的对齐辅助线（1px 红色虚线列），所有元素左对齐、拒绝居中；章节以编号 01/02/03 与大字号年份标注。
3. 字体排版：Inter Tight 或 Helvetica 系 900 黑体超大标题（字间距 -0.045em，行高 0.92），正文 Inter 400/500，元数据用等宽小字；大量使用规则细线与留白分区。
4. 交互与动效：链接 hover 时红色下划线由左向右扫出；卡片 hover 时整块反白（黑底白字）；滚动时章节编号做数字滚动；网格辅助线开关按钮。
5. 内容板块：hy4 海报式 Hero（巨大标题左对齐出血）、能力矩阵（跨列错落排布）、混合推理双栏对照表、Benchmark 数据表格、页脚（含版本与网格说明）。
```
