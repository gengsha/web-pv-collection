# 风格构成说明：丝网印·纸品编辑 (Risograph Print Studio)

## 1. 风格概述 (Style DNA)

* **核心理念**：把网页当成一本 Riso 双色印刷的独立刊物。所有元素都要能被「印」出来：有限油墨、网点、纸纹，以及不可避免的套印偏移。
* **视觉情绪**：手工、温暖、编辑感、不完美但讲究、带出版物的权威与亲切。
* **适用场景**：独立杂志、作品集、播客/Newsletter 官网、活动主视觉、文化机构页面。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --paper: #f2ede3;          /* 80g 米白纸 */
  --paper-2: #e9e3d5;
  --ink-black: #1a1815;      /* 墨黑 */

  --riso-red: #ff5a36;       /* 荧光橘红（主油墨） */
  --riso-blue: #2e5bff;      /* 亮蓝（副油墨） */
  --riso-green: #00a95c;     /* 叶绿（点缀油墨） */
  --riso-purple: #6b3fa0;    /* 两色叠印后的产物 */

  --text-dim: #55504a;
  --text-muted: #8b8479;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **Display**：`Fraunces` 900（可变光学尺寸衬线），字间距 `-.03em`，行高 `1.02`。
* **正文**：`Work Sans` 400/500，行高 `1.85`，颜色 `#55504a`。
* **栏目标签 / 页码**：`JetBrains Mono`，大写 + `letter-spacing: .1em`。
* **编辑部细节**：首字母下沉（Drop Cap）、点线引导线（leader dots）、虚线折页线、印章。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **纸纹噪点**：SVG `feTurbulence` 生成的内联 data-uri，铺满全屏、`mix-blend-mode: multiply`、`opacity: .38`。

```css
.paper-grain {
  position: fixed; inset: 0; z-index: 90; pointer-events: none;
  opacity: .38; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
}
```

* **双色套印 (Overprint)**：标题用两个色层叠加，`::after` 复制文字并以 `mix-blend-mode: multiply` 偏移叠印，重叠处自然产生第三色。

```css
.riso-text { position: relative; color: var(--riso-blue); }
.riso-text::after {
  content: attr(data-text);
  position: absolute; left: 0; top: 0;
  color: var(--riso-red);
  mix-blend-mode: multiply;
  transform: translate(var(--regx, 3px), var(--regy, 2px));
}
```

* **半调网点 (Halftone)**：`radial-gradient(circle, currentColor 1.6px, transparent 1.8px)` + `background-size: 8px 8px`，用于色板与分隔条。
* **油墨渗透底**：两团大半径 `radial-gradient`（红/蓝，透明度 .12）模拟纸张吸墨。
* **禁止**：不要 `box-shadow` 模糊、不要 `backdrop-filter`、不要纯圆角卡片 —— 一切都要像印在纸上。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **套印漂移**：光标位置写入 `--regx/--regy`（幅度 ±4px / ±3px），副色层随之轻微错位，像送纸不稳。
* **Hover 加剧错位**：卡片 hover 时 `::after` 额外偏移 3px，OFFSET 感被放大。
* **油墨扩散**：`[data-ink]` 按钮点击时在光标处生成一个 `mix-blend-mode: multiply` 的圆形墨点，0.6s 内 `scale(0→1)` 并淡出。
* **滚动摆动**：封面标题按滚动量做 ±0.6deg 的 `skewX`，模拟纸面轻微变形。
* **过渡曲线**：统一 `cubic-bezier(0.16,1,0.3,1)`，位移幅度控制在 4–8px 内，保持"纸"的克制。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 刊头 | 期号 + 刊名（套印）+ 栏目锚点 + 定价/日期，底部 3px 黑线 |
| 封面 | 粗黑规则线 → 栏目条（含网点分隔）→ 双行套印大标题 → 首字下沉导语 + 四格数据框 → 油墨按钮 |
| 能力矩阵 | 4 张半调色板卡，右上角黑底序号章 |
| 双栏对开 | 左页 INSTANT / 右页 DEEP THINK，中间折页虚线，可"选这一版" |
| 读者来信 | 纸卡内的信件流 + 下划线输入框 + 投递按钮 |
| 版本页 | 点线引导线的评测表 + 印刷说明 + 蜡封印章 |
| Footer | 刊物署名 + END OF ISSUE |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【丝网印·纸品编辑 (Risograph Print)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：纸本米白 #F2EDE3 底，墨黑 #1A1815，Riso 荧光橘红 #FF5A36、Riso 亮蓝 #2E5BFF、叶绿 #00A95C 作为双色套印主色。
2. 材质构件：全局纸纹（SVG feTurbulence 生成的噪点 data-uri 叠加，opacity 0.35，mix-blend-mode: multiply）；半调网点（radial-gradient 点阵 background-size 6px）；套印错位（同一元素两层颜色用 mix-blend-mode: multiply 并偏移 2~4px）；无模糊阴影，仅用实色偏移。
3. 字体排版：Fraunces 或 DM Serif Display 做超大衬线标题，Work Sans 正文，JetBrains Mono 做页边批注与页码。
4. 交互与动效：卡片 hover 时两层色板错位距离加大（misregistration 0.4s 弹性）；点击按钮触发油墨扩散（圆圈 scale 放大 + 透明度递减）；滚动时标题做轻微 skew 摆动。
5. 内容板块：hy4 作为「本期特刊主角」的杂志式 Hero（含期号、栏目名）、能力矩阵（印刷色块卡片）、混合推理对开页说明、读者来信式对话终端、版权页脚。
```
