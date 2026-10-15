# 风格构成说明：蒸汽波黄昏·VHS 回潮 (Vaporwave Dusk & VHS Grid)

## 1. 风格概述 (Style DNA)

* **核心理念**：80 年代录像带美学 + 无限黄昏。把 hy4 的「Instant / Deep」双模包装成磁带的 A/B 两面，用落日、网格与扫描线构建一个永远停在黄昏的接口。
* **视觉情绪**：怀旧、梦核、暧昧、浪漫化的技术感、微醺的孤独。
* **适用场景**：音乐/视觉项目主页、复古潮牌、活动专题、创意个人站、概念产品页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --night-1: #1a0b2e;        /* 夜空顶 */
  --night-2: #3b1178;        /* 夜空中段 */
  --night-3: #b14aed;        /* 地平线紫 */

  --sun-pink: #ff6b9d;       /* 落日粉 */
  --sun-orange: #ffb347;     /* 落日橙 */
  --grid-pink: #ff3cac;      /* 网格亮粉 */
  --neon-cyan: #22d3ee;      /* 霓虹青 */
  --neon-blue: #6d8cff;

  --text-pure: #fde9ff;
  --text-dim: #c4a9e8;
  --text-muted: #8a76b5;
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Monoton&family=Outfit:wght@300;400;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

* **Display / Logo**：`Monoton`（网格状复古装饰字），仅用于 logo、大标题与分数数字，绝不用于正文。
* **标题 / 正文**：`Outfit` 800 / 400，正文行高 `1.8`。
* **OSB / 时间码 / 按钮**：`JetBrains Mono`，大写 + `letter-spacing: .12em~.3em`。
* **多语言小彩蛋**：副标题混入日文片假名（`ハイブリッド推論`）强化 VHS 进口带气质。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **落日圆盘 (Sun Disc)**：420px 圆形线性渐变（橙→粉→洋红），叠加 `repeating-linear-gradient` 横条与 `mask-image` 让条纹只出现在下半部。

```css
.sun-slits {
  background: repeating-linear-gradient(to bottom, transparent 0 26px, rgba(26,11,46,.92) 26px 32px);
  mask-image: linear-gradient(to bottom, transparent 42%, #000 48%);
}
```

* **无限透视网格 (Infinite Grid)**：`perspective: 320px` + `rotateX(74deg)`，双层 `linear-gradient` 网格，`background-position` 每 2.6s 平移一格形成向前无限延伸。
* **霓虹辉光 (Neon Glow)**：多层 `text-shadow`（4/12/26/52px 由白到粉）+ 呼吸动画。
* **Glitch 标题**：`::before / ::after` 复制 `data-text`，青/粉双色，用 `clip-path: inset()` 分段 + `steps()` 关键帧做偶发撕裂。
* **扫描线与噪点**：`repeating-linear-gradient` 扫描线（`mix-blend-mode: multiply`）+ SVG `feTurbulence` 噪点层，0.4s `steps(3)` 位移抖动。
* **棕榈剪影**：纯 SVG path 填充 `#12062a`，左/右各一株（右侧 `scaleX(-1)` 镜像）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **换轨**：SIDE A/B 按钮切换时推理流整段重绘，逐行 `animation-delay` 80ms 从左侧滑入。
* **磁带转盘**：`3.2s linear infinite` 匀速旋转，切换模式时保持转动（暗示机器一直在跑）。
* **VU 电平**：12 根电平条每 220ms 随机点亮 4–11 根，模拟音频电平跳动。
* **时间码**：`HH:MM:SS` 每秒递增，颜色为落日橙。
* **视差**：落日随光标位移 ±22px / ±16px，两株棕榈反向移动 ±26px。
* **过渡曲线**：`cubic-bezier(0.16,1,0.3,1)`，但 glitch/噪点使用 `steps()` 制造机械抖动。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 背景层 | 落日圆盘 + 星点 + 透视网格地面 + 双棕榈 + 扫描线 + 噪点 |
| Nav | Monoton 霓虹 logo + 大写锚点 + INSERT 按钮 |
| Hero | SIDE A 磁带标签 → 双行 glitch 大标题 → 多语种副标 → 描述 → 双 CTA → OSB 四格遥测 |
| 能力矩阵 | 4 张霓虹描边半透卡（内部带扫描线纹理） |
| 双卡带混音台 | 左右磁带转盘 + 中间推理流 + 底部 VU 电平与时间码 |
| 直播热线 | 霓虹渐变 who 标签 + 闪烁光标 + SEND |
| 评分板 | Monoton 发光数字 + 青→粉渐变条 |
| Footer | 霓虹大 logo + 频率署名 + END OF TAPE |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【蒸汽波黄昏·VHS 回潮 (Vaporwave)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：夜空渐变 #1A0B2E → #3B1178 → #B14AED，落日盘 #FF6B9D → #FFB347，霓虹青 #22D3EE，网格亮粉 #FF3CAC，文字 #FDE9FF / #A88FD0。
2. 材质构件：巨型落日圆盘（渐变圆 + repeating-linear-gradient 横向切条遮罩）；无限透视网格地面（perspective + rotateX + background-position 滚动动画）；VHS 扫描线与噪点叠加层；大理石柱与棕榈剪影 SVG。
3. 字体排版：Monoton 或 Rubik Glitch 做霓虹 logo 大标题（带 RGB 色差 text-shadow），正文 Outfit，数据 JetBrains Mono。
4. 交互与动效：标题 glitch 抖动（clip-path 分段 + 左右偏移，周期性 0.2s 触发）；霓虹呼吸辉光；按钮 hover 出现色差重影；鼠标移动带来轻微视差位移。
5. 内容板块：hy4 霓虹招牌 Hero、能力矩阵（霓虹描边卡片）、混合推理「VHS 磁带双轨」切换器、对话终端（录像带 OSB 样式）、版权页脚。
```
