# 风格构成说明：聚变环芯·等离子跃迁 (Fusion Core · Plasma Surge)

## 1. 风格概述 (Style DNA)
* **核心理念**：把 GLM 5.3 的推理能级跃迁拟为可控核聚变装置——思维是等离子体，注意力是约束磁场，推理深度是约束时间。点火一刻，能量沿轨道喷薄。
* **视觉情绪**：能量感、高密度、硬核实验室、仪表美学、跃迁的临界张力。
* **适用场景**：AI 性能发布页、技术白皮书门户、开发者大会页、算力平台官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 真空腔体系 */
  --void: #04060b;
  --chamber: #080d16;

  /* 等离子三色 */
  --plasma-violet: #a24dff;
  --plasma-pink: #ff3d8a;
  --ion-cyan: #35e7ff;

  /* 辉光 */
  --plasma-glow: rgba(162, 77, 255, 0.35);
  --ion-glow: rgba(53, 231, 255, 0.3);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **工程标题 (Display)**：`Space Grotesk` 700，大写、字间距 0.08em，如腔体铭牌。
* **正文 (Body)**：`Noto Sans SC` 300/400。
* **遥测 (Telemetry)**：`JetBrains Mono`，数值读数、单位、状态码，全大写标签。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **托卡马克环 (Tokamak Rings)**：三重同心圆环，`conic-gradient` 弧段辉光（紫→粉→青），以 26s/17s/11s 差速旋转。
* **等离子芯 (Plasma Core)**：中心径向渐变球体，双层辉光投影，`scale 0.96↔1.05` 呼吸脉动。
* **HUD 角括 (Corner Brackets)**：卡片四角 L 形 2px 青色括线，替代完整边框。
* **能级表 (Energy Gauge)**：分段式能量条（10 段块，间隔 4px），填充色自青→紫→粉按能级映射。
* **遥测面板 (Telemetry Panel)**：`rgba(8,13,22,0.8)` 底 + 1px 青色 30% 边框，内为 mono 实时读数。
* **粒子场 (Particle Field)**：`<canvas>` 置底，等离子粒子沿椭圆轨道流动，鼠标是外加磁场会扭曲轨道。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **粒子轨道流**：粒子极坐标运动（半径微扰 + 角速度），鼠标距离小于 160px 时受磁斥力偏转。
* **核心脉冲**：4s 周期 `scale` 呼吸 + 辉光强度同步。
* **遥测刷新**：每 900ms 更新一次约束时间/能级读数（小抖动 ±3%），营造仪表真实感。
* **能级充能**：滚动进入视口时，量规分 10 段依次点亮（每段 60ms）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【聚变环芯·等离子跃迁 (Fusion Core · Plasma Surge)】风格生成一个关于 GLM 5.3 的「聚变实验装置」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：真空暗腔 #04060B 至腔壁 #080D16；全屏 Canvas 粒子场——等离子粒子（紫 #A24DFF / 粉 #FF3D8A / 青 #35E7FF）沿椭圆轨道流动，鼠标如外加磁场使近距粒子轨道偏转。
2. 核心构件：托卡马克三环（conic-gradient 弧段辉光，26s/17s/11s 差速旋转）+ 中心等离子芯（径向渐变球，4s 呼吸脉动）；HUD 四角 L 形青色括线卡；分段式能级量规（10 段块按能级青→紫→粉）；mono 遥测面板。
3. 字体排版：Space Grotesk 700 大写工程标题（字距 0.08em）、Noto Sans SC 正文、JetBrains Mono 遥测读数。
4. 核心板块：
   - Hero：反应堆主体 +「点火 IGNITION」+ 实时遥测（约束时间 38.2s · 能级 LV.5.3 · 输出稳定）
   - 磁场参数：深度推理 / 代码 / 智能体 / 多模态四路分段能量表（滚动依次点亮）
   - Q 值对比：输入 token 与输出能量的代际增益图
   - 控制台对话框（青色辉光输入，回复如遥测流）
5. 动效要求：粒子轨道流动 + 鼠标磁场扰动、核心呼吸脉冲、遥测数字每 900ms 微刷新、量规分段充能。整体硬核仪表美学，克制而高能。
```
