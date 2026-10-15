# 风格构成说明：赛博敦煌 · 飞天全息 (Cyber Dunhuang · Apsara Hologram)

## 1. 风格概述 (Style DNA)
* **核心理念**：敦煌壁画的矿物五色与金箔，遇上数字时代的「全息修复术」。将 Qwen（通义千问）的多模态智能拟喻为光影中起舞的飞天与逐帧重亮的壁画——千年文明厚重磅礴，数字灵性一瞬即至。
* **视觉情绪**：庄严、矿彩、神圣、全息流光、文明回响、岩窟幽深而金芒暗涌。
* **适用场景**：大模型个人主页、文化数字化主题站点、东方美学 AI 品牌旗舰页、数字遗产叙事专题。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 岩壁基底：石窟幽暗的暖褐黑 */
  --bg-rock: #1A1410;      /* 岩壁暗底 */
  --bg-cave: #241B14;      /* 窟壁表层 */
  --bg-panel: rgba(36, 27, 20, 0.88);

  /* 敦煌矿物五色 */
  --mineral-blue: #2A6F97;   /* 石青 */
  --mineral-green: #3E8E7E;  /* 石绿 */
  --mineral-red: #C1543C;    /* 土红 */
  --mineral-ochre: #D9A441;  /* 赭黄 */
  --gold-leaf: #E8C87A;      /* 金箔 */

  /* 文本层级：暖白砂色与风化褐 */
  --text-primary: #F3E9D2;
  --text-dim: #9C8A70;

  /* 边框与辉光 */
  --border-cave: rgba(232, 200, 122, 0.16);
  --border-cave-strong: rgba(232, 200, 122, 0.45);
  --glow-gold: rgba(232, 200, 122, 0.25);

  /* 几何与动效 */
  --radius-lg: 18px;
  --radius-pill: 9999px;
  --ease-dune: cubic-bezier(0.22, 1, 0.36, 1); /* 沙丘缓落曲线 */
}
```

配色法则：矿物色必须「纯正而克制」——石青、石绿只作主视觉与飘带，土红仅作点睛（按钮起势、进度条首段），大面积留白交给岩壁暗底，金色只以「箔」的形态出现（细线、描边、流光），严禁铺满。

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;900&family=Ma+Shan+Zheng&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Noto Serif SC` 900，字距 `+0.06em`，行高 `1.28`；庄重碑刻感。
* **正文 (Body)**：`Noto Serif SC` 600，行高 `2.0+`，颜色 `#9C8A70`（弱）/ `#F3E9D2`（主），疏朗如经文排版。
* **飞天题记 (Inscription)**：`Ma Shan Zheng` 手写体，用于题记、壁画大字（鹿/飛/琶/獅）、竖排铭文；颜色取金箔 72% 透明度。
* **拉丁点缀 (Latin Accent)**：`Cormorant Garamond` 斜体 500/600，用于标签、日志标题与遥测注脚，字距放宽 `0.1~0.22em`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **壁画肌理 (Mural Texture)**：全页覆盖一层内联 SVG `feTurbulence` 噪点（金粉颗粒，alpha ≤ 0.05）叠加三组不同角度的 `repeating-linear-gradient` 细裂纹；卡片视觉区另铺一层深色剥落噪点（alpha 0.6），悬停修复时淡出。
  ```css
  background-image:
    repeating-linear-gradient(104deg, transparent 0 52px, rgba(243,233,210,0.014) 52px 53px),
    repeating-linear-gradient(23deg, transparent 0 84px, rgba(0,0,0,0.14) 84px 85px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.91 0 0 0 0 0.78 0 0 0 0 0.48 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23g)'/%3E%3C/svg%3E");
  ```
* **背光光环 (Mandala Halo)**：Hero 中央多层同心圆——内核径向金晕 + 虚线中环（`haloSpinReverse 56s`）+ 外圈 `repeating-conic-gradient` 刻度光环（`mask` 成环，`haloSpin 80s`），底层光晕以 `haloBreath 9s` 呼吸。旋转必须极慢，产生「似动非动」的禅意。
* **全息飘带 (Apsara Ribbon)**：固定全屏 Canvas 上以 `globalCompositeOperation: 'lighter'` 绘制 3 条贝塞尔色带（石青 / 石绿 / 金），每条由外晕、带身、中央高光线三层叠成；采样点 `step ≈ 22px`，二次贝塞尔中点法平滑；波参数双正弦叠加，宽度随正弦呼吸。
* **金箔流光 (Gold Sweep)**：金色渐变文字 `background-size: 200%` 循环位移（`goldShine 5.5s linear`）；主按钮悬停时一道 105° 高光以 `translateX(-130% → 130%)` 扫过。
* **全息修复卡片 (Restoration Card)**：默认 `filter: saturate(0.58) brightness(0.8)` + 剥落噪点层；`:hover` 时饱和度升至 1.15、噪点淡出至 0，同时一道 42% 高的金白渐变扫描线以 `scanSweep 1.25s` 自上而下掠过（`top: -50% → 118%`，首尾淡入淡出）。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **飘带流体**：`y = base·H + A₁sin(k₁x + s₁t + φ) + A₂sin(k₂x − s₂t + 1.7φ)`，振幅 16~46px、波数 0.0016~0.0061、角速度 0.00026~0.00058；光标位置经 0.04 阻尼插值后牵引飘带 ±70px，产生「吴带当风」的随手感。金粉粒子（40~110 颗，随屏面积伸缩）以 0.12~0.54px/帧 匀速上升，叠加正弦横摆与明暗闪烁，出顶即回底循环。
* **窟门双开入场**：每个区块 `.gate` 初始 `clip-path: inset(-6% 50% -6% 50%)`（双门闭合），进入视口后由 IntersectionObserver 触发 `inset(-6% -2% -6% -2%)`，1.15s `cubic-bezier(0.22,1,0.36,1)` 向两侧推开，同步透明度 0.3→1。
* **修复台仪式**：点击「全息重现」→ 状态语切换「扫描线掠过 · 矿物颗粒逐帧归位」→ 输出区扫描线掠过 1.7s → 结果以 26ms/2 字打字机显现 → 落款「全息重现完成 · 矿彩已固色」。
* **遥测滚数**：进入视口后 1.8s 三次缓出滚动计数，进度条宽度 1.8s 沙丘曲线点亮。
* **无障碍降级**：`prefers-reduced-motion` 下 Canvas 定格单帧、关闭所有循环动画、入场遮罩直通、打字机直出全文。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Qwen、Claude、GPT-4o、DeepSeek）即可生成同款风格的 Qwen 个人主页：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【赛博敦煌 · 飞天全息 (Cyber Dunhuang & Apsara Hologram)】风格，为 Qwen（通义千问）生成一个个人官网单页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 色彩体系：岩壁暗底 #1A1410 / 窟壁 #241B14；敦煌矿物五色——石青 #2A6F97、石绿 #3E8E7E、土红 #C1543C、赭黄 #D9A441、金箔 #E8C87A；文本 #F3E9D2、弱文本 #9C8A70。矿物色要纯正克制，金色只作细线、描边与流光，严禁大面积铺金。
2. 字体层次：Google Fonts 引入 Noto Serif SC（600/900，标题与正文）、Ma Shan Zheng（飞天题记与壁画大字）、Cormorant Garamond 斜体（拉丁标签与注脚）。
3. 材质构件：
   - 全页壁画肌理：内联 SVG feTurbulence 金粉噪点 + 细裂纹 repeating-linear-gradient；
   - Hero 背光光环：多层同心圆（径向金晕内核 + 虚线旋转环 + repeating-conic-gradient 刻度光环 mask 成环），80s 级极慢旋转；
   - 全息飘带：全屏 Canvas 用 lighter 混合模式绘制 3 条平滑贝塞尔色带（石青/石绿/金），双正弦波驱动，外晕+带身+中央高光线三层，光标阻尼牵引；同时渲染缓缓上升、明暗闪烁的金粉粒子；
   - 壁画卡片「全息修复」：默认低饱和+剥落噪点，悬停时饱和度/亮度提升、噪点淡出、一道金白扫描线自上而下掠过。
4. 页面板块：
   - 顶部导航（Qwen 印章式 SVG 徽标 + 石窟金线分隔）；
   - Hero：背光环居中，主标语「千年一瞬，万象全息」，金色流光渐变字，题记式小字（手写体）+ 竖排铭文；
   - 壁画殿 · 四壁能力廊：九色鹿=视觉理解、飞天=生成创作、琵琶=语音交互、狮舞=智能体编排，四张修复卡，各配壁龛标签与手写大字；
   - 修复台交互：输入残卷意象 → 模拟「全息重现」输出（扫描线掠过 + 打字机逐字显影 + 状态语仪式文案）；
   - 传承遥测：窟数、壁画面积、彩塑数量滚动计数 + 数字化进度条点亮；
   - 页脚：Qwen Personal Site · Preset 10 Cyber Dunhuang。
5. 动效要求：区块入场使用 clip-path 双开遮罩，如窟门缓缓开启；主按钮悬停有金箔流光扫过；所有缓动使用 cubic-bezier(0.22, 1, 0.36, 1)；必须支持 prefers-reduced-motion 降级；390px / 768px 响应式。
```
