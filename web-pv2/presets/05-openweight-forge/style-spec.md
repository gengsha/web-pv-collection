# 风格构成说明：开源熔炉 · 开放权重锻造厂 (Open Weight Forge)

## 1. 风格概述 (Style DNA)
* **核心理念**：以「开源锻造厂」为意象诠释 Qwen 的开放权重哲学——模型权重如熔钢在炉中锻打成器，铁匠铺把火种无偿分享予天下。重工机械结构 × 炽热熔炉火光 × 坦荡开源精神。
* **视觉情绪**：重工、炽热、坦荡、可靠、工业蓝图式的秩序感。
* **适用场景**：开源模型发布页、权重下载仓库、开发者工具站、技术社区主页。
* **构图法则**：铁黑底色上铺细线蓝图网格（工程图纸感）；所有卡片是「权重板条箱」——钢面基底、铆钉角饰、钢印标签、悬停时金属斜向高光扫过；关键数据用熔岩渐变热度条呈现；警示黄黑斜纹条作分区隔断；页面全程伴随炉口迸溅的橙黄火花粒子。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色：铁黑与钢面 */
  --iron-black: #0C0C0E;
  --steel-surface: #16181C;
  --steel-raised: #1C1F25;
  --steel-blue-grey: #3E4450;

  /* 熔炉主色：熔橙与熔岩渐变 */
  --molten-orange: #FF6B1A;
  --lava-gradient: linear-gradient(90deg, #FF3D00 0%, #FFB347 100%);

  /* 工业警戒黄（警示斜纹与印章） */
  --caution-yellow: #FFC53D;

  /* 文本层级 */
  --text-forge: #F2EFEA;
  --text-dim: #8B8E98;

  /* 边框与辉光 */
  --border-steel: rgba(255, 255, 255, 0.09);
  --border-ember: rgba(255, 107, 26, 0.45);
  --glow-ember: rgba(255, 107, 26, 0.35);

  /* 形态 */
  --radius-crate: 10px;

  /* 过渡：锻锤般短促有力 */
  --transition-forge: 0.25s cubic-bezier(0.2, 0.9, 0.25, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;700&family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Chakra Petch` 700，工业棱角感，字间距 `0.02em`，全大写英文配 `letter-spacing: 0.12em`；中文回退 `Noto Sans SC` 700。
* **正文 (Body)**：`Noto Sans SC` 400/500，行高 `1.7`，颜色 `#8B8E98`。
* **数据/代码/钢印 (Mono)**：`JetBrains Mono` 400/700，用于许可证徽章、终端命令、下载计数与钢印标签，关键数字加 `font-variant-numeric: tabular-nums`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **蓝图网格底纹 (Blueprint Grid)**：页面固定背景层，两层细线网格叠加微弱熔炉余晖。
  ```css
  background-image:
    radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255, 107, 26, 0.13), transparent 70%),
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 100% 100%, 44px 44px, 44px 44px;
  background-color: #0C0C0E;
  ```
* **工业警示斜纹条 (Hazard Stripe)**：分区隔断与按钮细节，45° 黄黑斜纹。
  ```css
  background: repeating-linear-gradient(45deg, #FFC53D 0 12px, #101012 12px 24px);
  ```
* **权重板条箱卡片 (Weight Crate Card)**：钢面基底 + 斜向金属高光扫掠伪元素 + 四角铆钉。
  ```css
  .crate-card {
    position: relative; overflow: hidden;
    background: linear-gradient(160deg, #1C1F25 0%, #16181C 60%);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 10px;
    box-shadow: 0 14px 30px -18px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }
  .crate-card::before { /* 金属斜向高光，悬停时扫过 */
    content: ""; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.14) 50%, transparent 60%);
    transform: translateX(-120%);
  }
  .crate-card:hover::before { transform: translateX(120%); transition: transform 0.9s ease; }
  .crate-card::after { /* 四角铆钉 */
    content: ""; position: absolute; inset: 0; pointer-events: none;
    background-image:
      radial-gradient(circle at 10px 10px, #3E4450 2.5px, transparent 3.5px),
      radial-gradient(circle at calc(100% - 10px) 10px, #3E4450 2.5px, transparent 3.5px),
      radial-gradient(circle at 10px calc(100% - 10px), #3E4450 2.5px, transparent 3.5px),
      radial-gradient(circle at calc(100% - 10px) calc(100% - 10px), #3E4450 2.5px, transparent 3.5px);
  }
  ```
* **钢印标签 (Stencil Tag)**：`JetBrains Mono` 大写、宽字距、细描边框，颜色依等级区分（许可证 `#8B8E98`、参数量 `#3E4450` 描边、权重 `#FF6B1A`）。
* **熔炉热度条 (Furnace Gauge)**：`--lava-gradient` 填充的进度条，附热浪抖动动画与条内流光。
  ```css
  .gauge-fill {
    background: linear-gradient(90deg, #FF3D00, #FFB347);
    animation: heatShiver 0.35s linear infinite;
  }
  @keyframes heatShiver {
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-0.5px); }
    75% { transform: translateY(0.5px); }
  }
  ```
* **仓库/许可证印章 (License Stamp)**：虚线描边、宽字距大写印章，如 `APACHE-2.0`、`OPEN WEIGHTS`、`COMMERCIAL OK`，悬停微微倾斜盖章。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **火花粒子系统 (Spark System)**：全屏 `canvas` 上持续从「炉口」迸溅橙黄火星（#FF3D00→#FFB347→#FFC53D），带重力加速度 `g ≈ 320px/s²` 与空气阻力，亮度随生命衰减淡出；卡片悬停时在光标处触发一小簇火花迸溅。
* **锻锤入场 (Forge Hammer Entrance)**：区块经 IntersectionObserver 触发入场——自上方 `24px` 短促砸落 + 落地瞬间 `scaleY(0.96)` 压缩回弹，贝塞尔 `cubic-bezier(0.2, 0.9, 0.25, 1)`，时长 `0.5s`，如同锻锤落下。
* **滚动计数 (Count-Up)**：下载数、衍生模型数等数据进入视口后以 `easeOutCubic` 缓动滚动到目标值，附 `tabular-nums` 防抖。
* **热度条充能**：热度条进入视口后从 0 宽度充能至目标百分比，条尾伴随热浪抖动。
* **终端复制反馈**：点击复制按钮后按钮文案切换为「已复制 ✓」并回弹一次，同时在按钮处迸出火花。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o）即可生成同款风格页面：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【开源熔炉 · 开放权重锻造厂 (Open Weight Forge)】风格，为开源大模型 Qwen 生成一个个人主页（纯原生 HTML + CSS + JS，单页，禁止任何第三方 JS 库）。

设计要求：
1. 视觉底色：铁黑 #0C0C0E，铺细线蓝图网格（44px 双线 grid，rgba(255,255,255,0.035)），顶部叠一层微弱熔橙余晖径向光。
2. 色彩体系：钢面卡片 #16181C，主色熔橙 #FF6B1A 与熔岩渐变 #FF3D00→#FFB347，警戒黄 #FFC53D（45° 黄黑斜纹条作分区/按钮细节），钢蓝灰 #3E4450 作铆钉与描边，文本 #F2EFEA / 弱 #8B8E98。
3. 字体：Google Fonts 引入 Chakra Petch（500/700，标题与英文大写）+ JetBrains Mono（400/700，代码/钢印/数据）+ Noto Sans SC（正文）。
4. 材质构件：权重板条箱卡片（钢面渐变基底、四角铆钉 radial-gradient 角饰、钢印式大写标签、悬停时金属斜向高光自左向右扫掠）；熔炉热度条（熔岩渐变进度 + 热浪抖动动画）；仓库印章（APACHE-2.0 / OPEN WEIGHTS 虚线印章）。
5. 核心板块：
   - 顶部导航 + Hero（口号「开源为炉，锻器予天下」+ 熔炉 SVG 徽标 + 两个按钮 + 关键遥测条）
   - 权重金库网格（模型仓库卡片：Qwen3-235B-A22B、Qwen3-32B、Qwen2.5-Coder-32B、QwQ-32B、Qwen2.5-VL-72B 等，每张标注参数量、许可证、下载数与热度条）
   - 一键取件终端（模拟 huggingface-cli / modelscope / git lfs 拉取命令的终端块，每行带复制按钮）
   - 开源影响力数据（衍生模型数、下载总量、社区 Star，滚动 count-up 动画）+ 页脚
6. 动效要求：全屏 canvas 火花粒子系统（炉口迸溅橙黄火星，重力下落淡出，悬停卡片迸出火花簇）；区块入场如锻锤落下般短促有力的位移回弹；数据滚动计数。页脚文字：Qwen Personal Site · Preset 05 Open Weight Forge。
```
