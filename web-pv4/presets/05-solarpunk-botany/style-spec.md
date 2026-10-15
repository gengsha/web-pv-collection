# 风格构成说明：太阳能乌托邦·有机温室 (Solarpunk Botanical Greenhouse)

## 1. 风格概述 (Style DNA)

* **核心理念**：把 AI 拟作一株可持续生长的植物。Instant 是光合作用（捕光即转化），Deep Think 是呼吸作用（夜里慢慢分解、自我校验）。技术不再是冰冷机器，而是有代谢节律的生命体。
* **视觉情绪**：温暖、治愈、生机、乐观的未来主义、手作与自然的结合。
* **适用场景**：可持续品牌、教育/科普产品、健康与冥想类应用、社区项目、儿童与自然主题站点。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --cream: #fff8ec;      /* 晨光奶油底 */
  --cream-2: #f6efdf;
  --sand: #ecdfc4;

  --moss: #2f6b3f;       /* 苔绿（主文字/描边） */
  --leaf: #6fbf4a;       /* 叶绿（强调） */
  --mint: #a0e7c8;       /* 薄荷（浅底块） */
  --amber: #ffb627;      /* 太阳能琥珀（能量） */
  --clay: #d9705a;       /* 陶土（点缀） */

  --ink: #1e3a2b;
  --ink-dim: #4f6b56;
  --ink-muted: #8a9a8e;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,600&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **Display**：`Fraunces` 600/700，允许使用**斜体**（`font-style: italic`）作为强调，字间距 `-.03em`。
* **正文**：`Work Sans` 400/500，行高 `1.85`。
* **标本编号 / 数据**：`JetBrains Mono`，小写编号 + 大写英文 + `letter-spacing: .12em`，如 `SPECIMEN No.03`。
* **语言气质**：多用生长、土壤、光照、代谢等自然隐喻，避免机械与军事词汇。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **有机圆角 (Organic Radius)**：卡片使用不对称大圆角，制造"叶片"轮廓。

```css
.leaf-card {
  border-radius: 34px 34px 34px 10px;   /* 左下小圆角 = 叶尖 */
}
```

* **光斑 (Sunspots)**：3 个 340–460px 径向渐变圆，`blur(70px)`，`opacity .4~.55`，20–30s 反向漂移。
* **磨砂奶油玻璃**：`rgba(255,255,255,.72)` + 1px 极淡绿描边 + `0 16px 34px rgba(47,107,63,.08)` 柔阴影（永不发黑）。
* **植物装饰**：SVG 叶脉/藤蔓剪影（`#2f6b3f` + `#6fbf4a` + `#a0e7c8` 三档绿），底部左右各一株，`transform-origin: bottom` 做摆动。
* **藤蔓页眉**：顶部 44px 的 `radial-gradient` 点阵藤蔓 + `mask-image` 向下淡出。
* **禁止**：纯黑阴影、霓虹色、硬直角、金属渐变。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **摆动 (Sway)**：`transform-origin: bottom center`，7–9s `ease-in-out alternate` 在 ±2.5deg 之间摆动；卡片随光标水平位置 `rotate(cx * 1.6deg)`。
* **呼吸 (Breathe)**：SVG 花苞 6s 周期 `scale(1 → 1.25)` + 透明度变化，模拟光合作用节律。
* **生长进度环**：SVG `stroke-dasharray: 540`，切换模式时 `stroke-dashoffset` 在 1.4s 内补间到目标深度（Inst .32 → Deep .95）。
* **光斑跟随**：卡片 `::after` 用 `--gx/--gy` 渲染 120px 琥珀色柔光，hover 时淡入。
* **入场**：`sprout`（`translateY(10px) scale(.98)` → 归位），500ms，像抽芽。
* **过渡曲线**：`cubic-bezier(0.16,1,0.3,1)`，位移幅度 4–10px，节奏舒缓。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 环境层 | 3 团光斑 + 左右两株 SVG 植物 + 顶部藤蔓页眉 |
| Nav | 圆形叶片徽标 + 手写感温室编号 + 锚点 + 描边叶形按钮 |
| Hero | 光照状态胶囊 → 双行大标题（斜体强调）→ 光合/呼吸隐喻描述 → 双 CTA → 4 张标本数据卡 |
| 标本架 | 4 张叶形卡，各带一枚 SVG 器官图标与 SPECIMEN 编号 |
| 代谢模式 | 光合/呼吸滑块 + 左侧 SVG 生长环与植株 + 右侧说明与三条路径清单 |
| 园艺笔记 | 奶油纸卡内的对话流（左右不同圆角）+ 播种输入框 |
| 产出记录 | 4 组收成数值 + 叶绿→琥珀渐变条 |
| Footer | 叶片徽标 + 光照署名 + GROWN, NOT BUILT. |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【太阳能乌托邦·有机温室 (Solarpunk Botany)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：晨光奶油 #FFF8EC 底，苔绿 #2F6B3F、叶绿 #6FBF4A、太阳能琥珀 #FFB627、陶土 #D9705A、墨绿文字 #1E3A2B。
2. 材质构件：有机不规则 Blob 形状（border-radius: 60% 40% 55% 45% / 50% 60% 40% 50% 并做 morph 动画）、奶油磨砂玻璃卡片（backdrop-filter: blur(18px) + 米白半透）、SVG 叶脉与藤蔓剪影装饰、柔和光斑（radial-gradient，blur 大）。
3. 字体排版：Fraunces 做温暖衬线标题，Work Sans 正文，JetBrains Mono 做标本编号标签（如 SPECIMEN No.04）。
4. 交互与动效：叶片随光标方向轻柔摆动（transform-origin: bottom + skew/rotate，弹簧回弹）；卡片 6 秒周期的「光合作用」呼吸光晕；背景光斑缓慢漂移；进度条以藤蔓生长方式填充。
5. 内容板块：hy4 温室 Hero（把模型比作可持续生长的智能生态）、能力矩阵（四株「植物标本卡」）、混合推理（光合作用/呼吸作用双模式切换）、对话终端（园艺笔记风格）、页脚。
```
