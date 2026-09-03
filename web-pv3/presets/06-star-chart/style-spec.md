# 风格构成说明：石刻星图·观天授时 (Stone Star Chart · Cosmic Observatory)

## 1. 风格概述 (Style DNA)
* **核心理念**：以宋代苏州石刻天文图的「观测者姿态」呈现 GLM 5.3——千百年观星者与今夜最亮的一颗星。模型版本史即星官谱系，深度研究即观测记录。
* **视觉情绪**：深邃、庄重、古今天文对话、金石刻痕、精密如历法。
* **适用场景**：模型版本编年史、深度研究平台、数据观测面板、科技考古叙事页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 天幕体系 */
  --sky-slate: #080d1b;
  --sky-deep: #040814;

  /* 星光体系 */
  --starlight: #e8c868;
  --star-pale: #d9e2f2;
  --star-dim: #7c89a6;

  /* 刻线与批注 */
  --meridian: rgba(232, 200, 104, 0.22);
  --annotation: #b3432f;   /* 朱批 */
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **碑题 (Display)**：`Noto Serif SC` 900，如碑刻大字「观星千年」，字间距 0.24em。
* **古籍正文 (Body)**：`Noto Serif SC` 300，行距疏朗（2.0）。
* **星表 (Mono)**：`JetBrains Mono`，星名、赤经坐标、版本年份。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **星野 (Starfield)**：`<canvas>` 全屏置底，静态星点随机分布 + 闪烁呼吸 + 偶发流星。
* **浑仪环 (Armillary Rings)**：三重同心圆环（`border: 1px` 金色），以不同速度反向缓转，中心为模型徽星。
* **星官连线 (Constellation)**：SVG `polyline` 串联各版本节点，节点为金色圆点，最新版为四芒主星（`filter: drop-shadow` 金晕）。
* **经纬刻线 (Meridian Grid)**：金色 22% 透明度细线，纵向等距排布。
* **卷轴边 (Scroll Edges)**：页面上下通栏深色横幅，饰以云纹刻线。
* **朱批 (Vermilion Note)**：观测记录条目的批语使用 `--annotation` 朱色小字。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **星闪 (Twinkle)**：每颗星以随机相位在 2~5s 内做 `opacity 0.3 ↔ 1` 呼吸。
* **流星 (Shooting Star)**：每 4~8s 一道金色轨迹自右上向左下掠过（0.9s，带渐隐尾迹）。
* **浑仪缓转**：外中内三环分别以 60s / 40s / 26s 反向旋转。
* **连线生成 (Line Drawing)**：星官谱 SVG 进入视口时 `stroke-dashoffset` 自全长递减至 0（1.8s ease）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【石刻星图·观天授时 (Stone Star Chart · Cosmic Observatory)】风格生成一个关于 GLM 5.3 的「天文台观测者」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：深靛天幕 #080D1B 至 #040814；全屏 Canvas 星野（静态星点 + 随机相位闪烁 + 每 4~8s 一道金色流星）。
2. 色彩体系：星光金 #E8C868、星白 #D9E2F2、暗星 #7C89A6、朱批红 #B3432F、经线金色 22% 透明度。
3. 核心构件：浑仪三环（三重同心 border 圆环 60s/40s/26s 反向缓转，中心主星徽）；星官连线谱（SVG polyline 串联 GLM-130B → ChatGLM → GLM-4 → GLM-5 → GLM-5.3，主星四芒金晕，随滚动 stroke-dashoffset 描线生成）。
4. 字体排版：Noto Serif SC 900 碑刻大标题（字距 0.24em）、300 细宋正文、JetBrains Mono 星表坐标。
5. 核心板块：
   - Hero：浑仪环 + 中心 GLM 5.3 主星 +「观星千年，今夜最亮」碑题
   - 星官谱系：模型版本演进连线图（每星标注年份 mono 小字）
   - 观测记录：三条深度研究条目（古籍排版 + 朱批结论）
   - 授时历表：能力评测表（mono 对齐，金色数值）
6. 动效要求：星闪呼吸、流星轨迹渐隐、浑仪反向缓转、SVG 描线生长。整体如星夜碑刻，庄重克制。
```
