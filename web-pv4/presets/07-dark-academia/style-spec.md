# 风格构成说明：暗夜学院·手稿档案馆 (Dark Academia Archive)

## 1. 风格概述 (Style DNA)

* **核心理念**：深夜图书馆的一间手稿阅览室。把 hy4 包装成一份「第 hy4 号馆藏手稿」：有索书号、有批注、有借阅登记卡，知识以被保管、被誊抄、被批注的方式呈现。
* **视觉情绪**：沉静、古典、 scholarly、温暖的烛光与寒冷的石墙并存、时间感厚重。
* **适用场景**：学术项目、写作工具、出版社/书店、知识库、人文类个人站、课程内容页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --ink-night: #10131a;       /* 深夜墨蓝（底） */
  --leather: #2a1e14;         /* 皮革棕 */
  --ink-deep: #1a1611;        /* 墨黑（羊皮纸上的字） */

  --parchment: #e8dcc4;       /* 羊皮纸 */
  --parchment-2: #dccfb2;
  --gold: #c9a227;            /* 褪色金（唯一金属色） */
  --gold-dim: #8f7420;
  --wax: #7a2e2e;             /* 蜡封暗红 */

  --text-hi: #f0e6d2;
  --text-dim: #b9ad97;
  --text-muted: #7d7466;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Spectral:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题**：`Cormorant Garamond` 700（含斜体变体用于强调），正文行高宽松。
* **正文**：`Spectral` 300/400，行高 `1.9`，颜色暖灰。
* **索书号 / 编号**：`JetBrains Mono`，大写 + `letter-spacing: .16em~.3em`，金色。
* **古籍细节**：首字下沉（Drop Cap，蜡封红）、章节用 `CAPUT I / II / III` 编号、大量斜体旁注、虚线点引导。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **羊皮纸卡片 (Parchment)**：暖黄渐变 + 金色描边 + 内部 `inset 0 0 60px rgba(140,110,60,.18)` 做旧。

```css
.folio {
  background: linear-gradient(160deg, rgba(232,220,196,.97), rgba(220,207,178,.95));
  border: 1px solid var(--gold-dim);
  box-shadow: 0 40px 80px rgba(0,0,0,.6), inset 0 0 60px rgba(140,110,60,.18);
}
```

* **金线双轨**：`.folio::before/::after` 在上下 12px 处各画一条「透明→金→透明」的细线，模拟烫金压印。
* **烛光层**：顶部 900×700 的暖橙径向渐变，5.5s 周期做 `opacity .72→1` + `scale .98→1.04` 的不规则闪烁（`flicker`）。
* **暗角与纸噪**：`radial-gradient` 暗角 + SVG `feTurbulence` 噪点（`mix-blend-mode: overlay`，`opacity .3`）。
* **索引卡匣**：卡片顶部一条暗红标签条（负 margin 出血），底部中央一个打孔圆点（径向渐变 + 内阴影）。
* **蜡封章**：96px 圆形径向渐变（`#a83b3b → #7a2e2e → #5a1f1f`）+ 内圈白线 + `rotate(-7deg)`。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **烛光呼吸**：不规则 keyframes（35% / 62% 两个不规则停靠点）避免机械感；并随光标水平偏移 ±30px。
* **卡片抽出**：索引卡 hover 时 `translateY(-10px)` + 阴影加深 + 金色外发光，像从抽屉里被抽出。
* **批注聚焦**：切换到 DEEP 时页边批注从 `opacity .35 + grayscale` 恢复全彩，并逐条重播 `inkIn` 动画（70ms 递延）。
* **借阅登记**：每行带当日日期戳（`09·02` 格式），新行以点线分隔追加。
* **成绩誊抄**：金色细条进入视口后 1.3s 补间到目标宽度。
* **过渡曲线**：`cubic-bezier(0.16,1,0.3,1)`，位移克制（6–10px）。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 页眉 | 金色徽章 SVG + Cormorant logo + 等宽馆名 + 斜体锚点 |
| 馆藏 Hero | 索书号/日期 → 大字距刊头 → 双行标题（斜体强调）→ 首字下沉正文 → 蜡封按钮 → 四格装帧信息 |
| 馆藏目录 | 4 张索引卡（暗红标签条 + 打孔 + 架位信息） |
| 正文与批注 | 左：手稿正文；右：五条页边旁注（i.–v.）+ 下方抄本/批注切换 |
| 借阅登记 | 三列登记卡（日期 / 署名 / 正文）+ 下划线输入 |
| 版本记录 | 四行点线引导成绩 + 金色细条 + 蜡封版本说明 |
| Footer | 馆名 + FINIS |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【暗夜学院·手稿档案馆 (Dark Academia)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：深夜墨蓝 #10131A / 皮革棕 #2A1E14 底，羊皮纸 #E8DCC4，褪色金 #C9A227，墨黑 #1A1611，蜡封暗红 #7A2E2E。
2. 材质构件：纸张纤维纹理（噪点 + 微微泛黄渐变）、图书馆索引卡片目录匣（卡片带顶部标签条与打孔圆点）、烫金细线边框（linear-gradient 金色描边）、书本装订线与页边批注、蜡封徽章（圆形径向渐变 + 内阴影）。
3. 字体排版：Cormorant Garamond / EB Garamond 做古典衬线大标题（含首字母下沉 Drop Cap），正文 Spectral，编号与索书号 JetBrains Mono。
4. 交互与动效：烛光光晕 5 秒周期柔和呼吸；卡片 hover 时从档案匣中向上抽出（translateY(-8px) + 阴影加深）；文字选中态为羊皮纸高亮；滚动做缓慢的暖光跟随。
5. 内容板块：hy4 作为「第 hy4 号馆藏手稿」的档案 Hero、能力矩阵（四张索引卡片）、混合推理（手稿正文与页边批注双栏）、借书卡式对话终端、馆藏页脚。
```
