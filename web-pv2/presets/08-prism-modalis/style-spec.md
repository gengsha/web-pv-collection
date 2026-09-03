# 风格构成说明：通义棱镜 · 多模态分光 (Prism Modalis · Multimodal Dispersion)

## 1. 风格概述 (Style DNA)
* **核心理念**：一束白光穿过三角棱镜，被折射成完整光谱——通义千问（Qwen）的多模态能力即是一次折射：文本、视觉、音频、视频、代码各是一条光谱带，同源而入、分色而出。
* **视觉情绪**：洁净、精确、克制、大留白、实验室级的几何秩序，辅以彩虹全息点缀。这是整套预设库中唯一的亮色极简派。
* **适用场景**：AI 个人主页、多模态能力展示、亮色系科技产品官网、开发者文档门户、品牌设计系统演示。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基底：近纯白与卡面 */
  --bg-canvas: #FAFBFF;
  --bg-card: #FFFFFF;

  /* 墨色文本层级 */
  --ink-strong: #10121A;
  --ink-weak: #5B6172;
  --ink-faint: #9AA1B2;

  /* 发丝线（Hairline） */
  --hairline: #E3E7F0;

  /* 七彩光谱（柔和饱和度） */
  --spec-red: #FF5E5B;     /* 文本 */
  --spec-amber: #FFB400;   /* 视觉 */
  --spec-green: #3DDC97;   /* 音频 */
  --spec-blue: #3DA5FF;    /* 视频 */
  --spec-purple: #7B5CFF;  /* 代码 */
  --spec-pink: #FF6AD5;    /* 多模态融合 */
  --spectrum-gradient: linear-gradient(90deg, #FF5E5B 0%, #FFB400 20%, #3DDC97 40%, #3DA5FF 60%, #7B5CFF 80%, #FF6AD5 100%);

  /* 全息锡纸（柔和马卡龙 conic） */
  --holo-conic: conic-gradient(from 210deg at 50% 50%, #FFC2D4, #FFE3B0, #C8F5DF, #C6E2FF, #D9CCFF, #FFCDEF, #FFC2D4);

  /* 彩虹折射投影（极淡彩色） */
  --shadow-refract: 0 24px 60px -20px rgba(123, 92, 255, 0.25);

  /* 几何与动效 */
  --radius-lg: 20px;
  --radius-pill: 9999px;
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Syne` 700/800，字间距 `-0.02em`（中文回落系统黑体），强调短语使用光谱渐变剪裁文字。
* **正文 (Body)**：`Inter` 400/500，行高 `1.7`，颜色 `#5B6172`；大段留白，单行不超过 42 字。
* **标注/数据 (Mono)**：`JetBrains Mono` 400，全大写小标签、字距 `0.12em`，用于坐标式注记（如 `white-light → prism → spectrum[6]`）。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **发丝线卡片 (Hairline Card)**：1px 边框 + 大圆角 + 彩虹折射淡影，亮色系的骨架。
  ```css
  background: var(--bg-card);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 60px -28px rgba(123, 92, 255, 0.28);
  ```
* **彩虹折射阴影**：所有投影必须带极淡彩色倾向（紫 / 蓝），禁止纯黑投影：
  ```css
  box-shadow: 0 24px 60px -20px rgba(123, 92, 255, 0.25); /* 紫调 */
  box-shadow: 0 18px 44px -22px rgba(61, 165, 255, 0.25); /* 蓝调 */
  ```
* **全息芯片标签 (Holo Chip)**：conic 渐变马卡龙锡纸底 + 白字 + 白色内高光，是页面唯一的"彩虹全息"出口：
  ```css
  background: conic-gradient(from 210deg, #FF9AA8, #FFC46B, #7FE3B6, #8CC0FF, #B49BFF, #FF9EE0, #FF9AA8);
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(16, 18, 26, 0.35);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
  ```
* **Hero 棱镜 SVG**：三角棱镜（玻璃质感线性渐变 + 发丝线描边），一束白光自左侧入射，出射端散出 6 条光谱带。每条谱带是 `rx=4` 的渐变矩形，统一绕出射点旋转：
  ```css
  .band { transform-box: view-box; transform-origin: 342px 180px;
          animation: bandBreath 5.5s ease-in-out infinite alternate; }
  @keyframes bandBreath {
    0%   { transform: rotate(calc(var(--r) - 0.9deg)); opacity: 0.62; }
    100% { transform: rotate(calc(var(--r) + 0.9deg)); opacity: 1; }
  }
  ```
* **12 栏几何网格感**：画布置底两层 1px 发丝网格（76px 栅格，透明度约 0.03），叠加顶部淡紫 / 淡蓝径向光晕，保持"纸面实验室"气息。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **棱镜分光（全页灵魂）**：入射白光用 `stroke-dasharray` 做光子流动（`beamFlow` 1.1s linear 循环）；六条谱带以负延迟错峰呼吸（±0.9° 角度 + 透明度 0.62→1）；出射点与入射点做节点脉冲。
* **卡片 3D 微倾斜 + 全息偏移**：`perspective(900px)` 下 rotateX ≤ 5° / rotateY ≤ 6°；同时把鼠标归一化坐标写入 `--hx / --hy`，驱动卡面全息 conic 层的 `background-position`，产生"锡纸随光转"的效果。
* **导航光谱下划线**：悬停时 2px 光谱渐变条自左 `scaleX(0→1)` 扫过，随后 `background-position` 持续滑移。
* **分光台 (Dispersion Bench)**：输入一段话，前端模拟统一切分——中文 / 字母 / 数字 / 拟声词 / 颜色词被折射成不同谱带色的 token 块，以 45ms 阶梯延迟迸出，并有一道光谱扫描线掠过。
* **统一缓动**：全站 `cubic-bezier(0.16, 1, 0.3, 1)`；亮色系动效幅度要小（位移 ≤ 18px，角度 ≤ 6°），保持"轻拿轻放"的物理感。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude、GPT-4o、DeepSeek、Qwen）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【通义棱镜 · 多模态分光 (Prism Modalis)】风格，为阿里巴巴大模型 Qwen（通义千问）生成一个个人官网首页（纯原生 HTML + CSS + JS，单页、无第三方库）。

设计要求：
1. 视觉基调：亮色极简派。画布近纯白 #FAFBFF，卡片纯白 #FFFFFF，墨字 #10121A / 弱字 #5B6172，全部边框为 1px 发丝线 #E3E7F0；大面积留白、12 栏几何网格底纹；投影必须是极淡的彩色折射影（如 0 24px 60px -20px rgba(123,92,255,.25)），禁止纯黑投影。
2. 光谱体系：六色光谱渐变 #FF5E5B → #FFB400 → #3DDC97 → #3DA5FF → #7B5CFF → #FF6AD5（柔和饱和度）；全息点缀使用柔和马卡龙 conic-gradient 锡纸（配白字与白色内高光）。
3. 字体层次：Google Fonts 引入 Syne（600/700/800，标题）+ Inter（400/500/600，正文）+ JetBrains Mono（400，小标签与数据注记）。
4. 核心构件——Hero 棱镜分光：一个三角棱镜 SVG，一束白光自左侧入射（虚线光子流动动画），出射端散出 6 条渐变光谱带，谱带绕出射点做缓慢角度/透明度呼吸；主标题「通义，一束光的全部颜色」使用光谱渐变剪裁文字。
5. 页面板块：
   - 顶部导航（悬停出现光谱渐变下划线扫过）
   - Hero 主视区 + 棱镜分光动画
   - 光谱能力区：文本=红、视觉=橙、音频=绿、视频=蓝、代码=紫，每条谱带一行卡片，悬停/点击展开说明
   - 统一 Tokenizer 可视化：一条混合输入被切成彩色 token 序列的演示条（45ms 阶梯入场 + 扫描线）
   - 分光台交互：输入任意一段话，前端模拟把中文/字母/数字/拟声词/颜色词折射成不同光谱色块流
   - 页脚（含一条细光谱分隔线）
6. 动效要求：卡片悬停做 3D 微倾斜（rotateX≤5°、rotateY≤6°）并让全息背景 background-position 随鼠标偏移；全站缓动 cubic-bezier(0.16,1,0.3,1)；动效幅度克制、精致、干净。
```
