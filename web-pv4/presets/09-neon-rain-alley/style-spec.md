# 风格构成说明：霓虹雨夜·湿巷反射 (Neon Rain Alley Reflection)

## 1. 风格概述 (Style DNA)

* **核心理念**：一条永远在下雨的赛博小巷。hy4 是巷子里那几块彻夜不熄的霓虹招牌 —— Instant 是常亮的红灯，Deep Think 是雨夜里慢慢洇开的水痕。一切都湿、都反光、都带电流噪声。
* **视觉情绪**：潮湿、孤独、迷离、都市夜行、危险又迷人。
* **适用场景**：夜生活/酒吧/演出、赛博朋克主题、游戏官网、潮流品牌、音乐人主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --asphalt: #07080d;     /* 湿沥青黑 */
  --asphalt-2: #0c0f18;

  --mag: #ff2e88;         /* 霓虹品红 */
  --cyan: #00e5ff;        /* 电蓝 */
  --violet: #7b2cff;      /* 紫外 */
  --amber: #ffa41b;       /* 钠灯橙 */

  --text-hi: #f1f5f9;
  --text-dim: #9fb0c4;
  --text-muted: #64748b;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **Display**：`Outfit` 800/900，字距 `-.02em ~ -.03em`，全部发光。
* **正文**：`Outfit` 400，行高 `1.85`，颜色 `#9fb0c4`。
* **数据 / 状态**：`JetBrains Mono`，`letter-spacing: .1em~.22em`。
* **竖排招牌**：`writing-mode: vertical-rl` + `letter-spacing: .3em`，是这套风格的标志性构件。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **多层霓虹辉光**：由内到外「白 → 本色 → 本色 → 深本色」四层 `text-shadow`，是霓虹管的核心画法。

```css
.neon-title span {
  color: #fff;
  text-shadow: 0 0 6px #fff, 0 0 18px var(--mag), 0 0 44px var(--mag), 0 0 88px #ff0f6d;
}
```

* **湿地面倒影**：`::after` 复制 `data-text`，`scaleY(-1)` + `blur(3px)` + 自上而下的 `mask-image` 渐隐，再加 `skewX` 周期摆动模拟水面。

```css
.neon-title::after {
  content: attr(data-text);
  position: absolute; top: 100%; left: 0;
  transform: scaleY(-1);
  filter: blur(3px);
  mask-image: linear-gradient(to bottom, rgba(0,0,0,.55), transparent 62%);
  animation: rippleSkew 5s ease-in-out infinite alternate;
}
```

* **雨丝**：两层 `repeating-linear-gradient`（14° / 20° 斜线），分别以 0.9s 与 1.5s 向下位移，形成视差雨。
* **光污染**：三团 520–620px 的 `blur(110px)` 品红/电蓝/钠灯橙径向渐变，各自 7–11s 呼吸。
* **玻璃卡片**：`rgba(8,11,18,.72)` + `backdrop-filter: blur(12px)` + `inset 0 1px 0 rgba(255,255,255,.05)` —— 永远有"被雨打湿的边"。
* **竖排招牌**：右侧固定的竖向霓虹盒（品红描边 + 内发光 + 琥珀副标）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **招牌闪烁**：`steps(1, end)` 的不规则 keyframes（如 `0%,42%,44%,62%,64%,100%`），在 43% / 63% 处瞬间掉到 `.35 / .55` 透明度，并同步削弱 text-shadow —— 模拟接触不良的霓虹管。
* **雨滴涟漪**：点击任意位置生成一枚 `border-radius: 50%` 且宽高比 2:1 的椭圆环（模拟透视水面），1s 内 `scale(0→1)` 并淡出。
* **倒影偏移**：光标水平位置写入 `--refl`，倒影随之横向摆动 ±10px。
* **双档开关**：巨大方形开关（左侧带一颗灯泡指示灯），激活档位整块点亮对应色的外发光与内发光；同时推理流整段重绘（逐行 80ms）。
* **数据条**：青→品红渐变 + 外发光，进入视口后 1.3s 补间。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 环境层 | 三团霓虹光污染 + 两层雨丝 + 底部湿地渐变 + 右侧竖排招牌 |
| Nav | 闪烁霓虹 logo + 锚点 + 描边霓虹按钮 |
| Hero | 状态胶囊 → 双行发光大标题（品红/电蓝各一行）+ 湿地倒影 → 描述 → 双 CTA → 四格水洼遥测 |
| 四块招牌 | 4 张玻璃卡，各绑定一个霓虹色变量 `--c`，hover 用 `color-mix()` 生成对应辉光 |
| 霓虹双档 | 两个巨型开关（灯泡指示 + 主副标题）+ 推理流面板 + Token/延迟/步数 |
| 巷口对讲机 | 品红描边面板 + 霓虹渐变 who 标签 + 呼吸中的麦克风点 |
| 分数牌 | 紫外发光数字 + 青→品红渐变条 |
| Footer | 发光大 logo + 巷名署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【霓虹雨夜·湿巷反射 (Neon Rain Alley)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：湿沥青黑 #07080D 底，霓虹品红 #FF2E88、电蓝 #00E5FF、紫外 #7B2CFF、钠灯橙 #FFA41B，文字 #F1F5F9 / #7C8AA0。
2. 材质构件：霓虹发光文字（4~6 层 text-shadow 由内白到外色，配合 box-shadow 光溢出）；玻璃卡片（低透明度深色 + backdrop-filter: blur(16px) + 1px 内发光边）；地面水反射（元素副本 scaleY(-1) + blur(6px) + mask 线性渐隐 + 竖向波纹位移）；雨丝（repeating-linear-gradient 斜线 animation 下落）；远处雾化光污染层。
3. 字体排版：Outfit 700/800 做招牌级大标题，正文 Inter，数据 JetBrains Mono；可有一处竖排霓虹小招牌。
4. 交互与动效：招牌霓虹不规则闪烁（opacity/text-shadow 阶梯 keyframes + 偶发 delay）；雨滴打在地面生成涟漪（点击处扩散圆环）；鼠标移动使水面倒影轻微横向偏移；hover 卡片时霓虹边框点亮并伴随电流抖动。
5. 内容板块：hy4 霓虹招牌 Hero、能力矩阵（四块发光招牌卡）、混合推理（霓虹双档开关：INSTANT / DEEP THINK）、对话终端（巷口对讲机风格）、页脚。
```
