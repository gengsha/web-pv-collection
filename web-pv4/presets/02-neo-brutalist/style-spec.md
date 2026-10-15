# 风格构成说明：新粗野主义·混凝土硬边 (Neo-Brutalist Concrete Edge)

## 1. 风格概述 (Style DNA)

* **核心理念**：把网页还原成「结构本身」。拒绝圆角、渐变、阴影模糊这些拟物糖衣，用最直白的边框、色块与文字层级表达信息。
* **视觉情绪**：粗粝、直接、自信、反精致、带一点幽默的挑衅感。
* **适用场景**：开发者工具官网、创意工作室、独立产品 Landing、技术博客、招聘页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --concrete: #efece3;        /* 混凝土米 */
  --concrete-dark: #e2ded1;
  --ink: #0a0a0a;             /* 纯黑线条 */

  --yellow: #ffe600;          /* 电光黄 */
  --red: #ff4d2e;             /* 信号红 */
  --blue: #2b44ff;            /* 钴蓝 */
  --mint: #00c48c;            /* 薄荷绿 */

  --line: 3px;                /* 统一描边宽度 */
  --hard: 8px;                /* 硬阴影偏移 */
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@500;700&family=Work+Sans:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
```

* **Display**：`Archivo Black`（无小写变体，天生海报感），全大写，`letter-spacing: -.03em`，行高 `.95`。
* **次级标题 / 按钮**：`Space Grotesk` 700。
* **正文**：`Work Sans` 500，行高 `1.75`。
* **数据 / 标签**：`JetBrains Mono` 700，全大写 + `letter-spacing: .1em`。
* **排版铁律**：几乎不使用居中；标题允许 `-1.5deg ~ -2deg` 的轻微歪斜以打破呆板。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **硬阴影 (Hard Shadow)**：零模糊位移阴影，是整套风格的识别符号。

```css
.btn-brutal {
  border: 3px solid #0a0a0a;
  box-shadow: 8px 8px 0 #0a0a0a;
}
.btn-brutal:active {
  transform: translate(8px, 8px);
  box-shadow: 0 0 0 #0a0a0a;   /* 阴影塌陷 = 真实按压 */
}
```

* **卡片的随机感**：同组卡片按 `:nth-child()` 交替填充 `--mint / --yellow / #cdd6ff`，并在初始态给偶数项 `rotate(-1deg)`。
* **胶带贴纸 (Tape)**：`JetBrains Mono` 小字 + 黄底 + 2px 黑边 + `rotate(1.5deg)`，用于版本号与口号。
* **网格底纹**：44px 双轴 `linear-gradient` 细线，`rgba(10,10,10,.06)`，营造图纸/草稿纸氛围。
* **顶栏跑马灯**：黑底黄字，`width: max-content` + `translateX(-50%)` 无限滚动，hover 暂停。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **按压优先**：所有可点击元素必须有 `translate(offset, offset)` + 阴影归零的 `:active` 状态（120ms，极快）。
* **Hover 抬升**：卡片 `translate(-6px,-6px) rotate(-1.2deg)` 同时阴影放大到 `14px`，形成「被拎起来」的错觉。
* **入场动效**：`slamIn`（从左侧 -14px 硬切入，350ms），逐行 `animation-delay` 70ms，拒绝柔和淡入。
* **进度条**：粗黑描边容器 + 纯红填充块，`width` 在 1s 内补间；进入视口才触发。
* **过渡曲线**：交互反馈 120–180ms，位移类 250–300ms，绝不拖沓。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 跑马灯 | 黑底黄字无限滚动标语，hover 暂停 |
| Nav | 歪斜黑底 logo + 黄色胶带版本号 + 全大写锚点 + 硬边主按钮 |
| Hero | 黑色标语块 → 三行超大海报标题（黄/红高亮块）→ 左边框引言 → 双 CTA → 四格数据块 |
| 能力矩阵 | 4 张硬边卡，交替填色，右上角带序号章 |
| 混合推理 | 两块巨大 SLAB 开关（A/B）+ 推理流帧 + 黑底元信息条 |
| 终端 | `$` 提示符 + 白底黑框输入框 + RUN 按钮 |
| 评测 | 4 组粗描边数据块 + 红色进度条 |
| Footer | 黑底大 logo + 胶带标语 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【新粗野主义·混凝土硬边 (Neo-Brutalism)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：混凝土米白 #EFECE3 底，纯黑 #0A0A0A 线条与文字，电光黄 #FFE600、信号红 #FF4D2E、钴蓝 #2B44FF 作为原色撞块。
2. 材质构件：3px solid #0A0A0A 描边，硬阴影 box-shadow: 6px 6px 0 #0A0A0A（无模糊、无圆角或 4px 微圆角），胶带贴纸（旋转 -2deg 的黄底黑字条），大写极粗标题，网格背景（1px 淡黑网格线）。
3. 字体排版：Archivo Black / Space Grotesk 900 超大标题（clamp(2.5rem, 7vw, 5rem)），正文 Work Sans 500，标签 JetBrains Mono 大写加粗。
4. 交互与动效：按钮 :active 时 translate(6px,6px) 且阴影塌陷为 0（真实按压感）；卡片 hover 轻微 rotate(-1.2deg)；顶部无限跑马灯（marquee）滚动标语；滚动进入视口元素做粗犷位移淡入。
5. 内容板块：hy4 品牌 Hero、能力矩阵硬边卡片、Instant/Deep 推理模式切换（用两个巨大方形切换按钮表现）、Benchmark 数据块、对话终端、页脚。
```
