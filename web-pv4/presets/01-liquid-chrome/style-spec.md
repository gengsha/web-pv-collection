# 风格构成说明：液态铬·流体镜面 (Liquid Chrome & Fluid Reflection)

## 1. 风格概述 (Style DNA)

* **核心理念**：Y2K 金属美学的当代进化版。把 hy4 的「混合推理」拟喻为一团可流动的熔融铬液 —— 表面既是镜面（反射环境），又是流体（随时重塑形态）。
* **视觉情绪**：冷冽、高级、流动、精密、略带未来复古的奢侈品质感。
* **适用场景**：AI 旗舰产品官网、硬件/芯片发布页、高端工具型 Landing Page、个人品牌主站。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 底色：石墨黑 */
  --graphite: #0b0b0f;
  --graphite-2: #12131a;
  --surface: rgba(255, 255, 255, 0.045);

  /* 铬金属色阶（从高光到暗部） */
  --chrome-1: #ffffff;
  --chrome-2: #c7ccdb;
  --chrome-3: #7d8598;
  --chrome-4: #2a2e3a;

  /* 色散边（Chromatic Dispersion） */
  --disperse-blue: #6e8bff;
  --disperse-pink: #ff5cf0;

  /* 文本层级 */
  --text-pure: #f2f4f8;
  --text-dim: #9aa2b5;
  --text-muted: #636b80;

  --radius: 22px;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **Display / 品牌标识**：`Space Grotesk` 700，字间距 `-0.045em`，行高 `1.1`。
* **正文**：`Inter` 400/500，行高 `1.75`，颜色 `#9aa2b5`。
* **数据 / 代码 / 标签**：`JetBrains Mono`，大写 + 字间距 `0.1em`。
* **签名技法**：**液态铬文字** —— 多停靠点线性渐变 + `background-clip: text` + 背景位移动画。

```css
.chrome-text {
  background: linear-gradient(100deg,#ffffff 0%,#cfd6e6 18%,#5c6478 34%,#ffffff 50%,#8e97ad 64%,#dfe4f0 82%,#6b7387 100%);
  background-size: 260% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: chromeFlow 9s linear infinite;
}
```

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **流体光斑背景 (Liquid Blobs)**：3 个 520–620px 径向渐变圆，`filter: blur(90px)`，`opacity` 控制在 `.28~.55`，各自以 18–22s 周期反向漂移。
* **双层边框金属卡 (Chrome Card)**：使用 `padding-box + border-box` 双背景技法做出「金属描边 + 玻璃内芯」。

```css
.chrome-card {
  background:
    linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.02)) padding-box,
    linear-gradient(140deg, rgba(255,255,255,.5), rgba(255,255,255,.05) 40%, rgba(110,139,255,.35)) border-box;
  border: 1px solid transparent;
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 50px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.16);
}
```

* **镜面扫光 (Shine Sweep)**：按钮 `::after` 为一条 `skewX(-20deg)` 的白色高光带，`hover` 时 `left` 从 `-140%` 冲到 `160%`。
* **颗粒叠加**：3px 点阵噪点 + `mix-blend-mode: overlay`，`opacity: .28`，避免金属感过于塑料。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **光标高光跟随**：所有 `[data-spotlight]` 元素监听 `mousemove`，写入 `--mx/--my`，`::before` 渲染 340px 径向柔光。
* **3D 微倾斜**：`[data-tilt]` 按光标偏心量做 `rotateY/rotateX` 各 `±6deg`，离开即回正。
* **模式切换滑块**：滑块宽高与位移由 JS 读取按钮 `offsetWidth / offsetLeft` 动态计算，切换曲线 `.45s cubic-bezier(0.16,1,0.3,1)`。
* **推理流逐行动画**：每行 `animation-delay` 递增 90ms，配合 `translateX(-8px)` 淡入。
* **数据条入场**：`IntersectionObserver` 触发 `.in`，`width` 在 1.4s 内补间到 `--w`。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| Nav | 品牌 `hy4` + 版本胶囊 + 四个锚点 + 液态主按钮 |
| Hero | 状态胶囊 → 双行大标题 → 人设描述 → 双 CTA → 四格遥测指标条 |
| 能力矩阵 | 4 张金属卡：混合推理内核 / 全栈代码工程 / 256K 长上下文 / 并行工具调用 |
| 混合推理演示 | INSTANT ↔ DEEP THINK 滑块开关 + 推理流面板 + Token/延迟/步数元数据 |
| 对话终端 | 命令行式消息流（› 光标）+ 胶囊输入框 |
| 评测 | 4 组数值 + 渐变进度条 |
| Footer | 金属大 logo + 预设署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

> **复制以下内容给任意大模型（Claude / GPT-4o / DeepSeek），即可生成同款风格页面：**

```markdown
【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【液态铬·流体镜面 (Liquid Chrome)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：石墨黑底 #0B0B0F，铬银渐变（#FFFFFF → #C7CCDB → #6E7688 → #2A2E3A），色散边使用电蓝 #6E8BFF 与品红 #FF5CF0，文字 #F2F4F8 / #8B93A7。
2. 材质构件：液态金属文字（conic-gradient + background-clip:text + 背景位移动画）、镜面高光扫掠（::after 斜向白色渐变条 sweep）、金属拉丝边框（linear-gradient border-image）、液态 Blob 背景（filter: blur(60px) 的银蓝/品红光球）。
3. 字体排版：Space Grotesk 或 Archivo 800 超粗标题（字间距 -0.04em），正文 Inter，数据与标签 JetBrains Mono。
4. 交互与动效：光标移动驱动 --mx/--my 变量，让卡片表面高光反射斑实时跟随；按钮 hover 触发液态填充（从底部涌起的金属渐变）；过渡曲线 cubic-bezier(0.16,1,0.3,1)。
5. 内容板块：hy4 品牌 Hero（混合推理模型人设）、能力矩阵四卡（混合推理内核 / 全栈代码工程 / 256K 长上下文 / 并行工具调用）、Instant↔Deep 混合推理切换演示面板、对话终端、指标遥测条、页脚。
```
