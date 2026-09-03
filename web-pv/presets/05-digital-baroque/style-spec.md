# 风格构成说明：数字巴洛克·万物感知馆 (Digital Baroque & Museum of Synthetic Senses)

## 1. 风格概述 (Style DNA)
* **核心理念**：当超级 AI 成为人类艺术与文明记忆的守门人——将 17 世纪巴洛克时期的奢华重工装帧、古典油画质感与现代数字生成艺术交织。
* **视觉情绪**：典雅、奢华、博学、深邃人文、跨世纪生成艺术。
* **适用场景**：AI 艺术馆、多模态创意画廊、高级文化沙龙、生成式音乐与文学官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色 */
  --baroque-bg: #14050b;
  --baroque-surface: rgba(36, 12, 22, 0.7);
  
  /* 烫金与锦缎 */
  --gold-foil: #eab308;
  --gold-champagne: #fde047;
  --gold-gradient: linear-gradient(135deg, #ca8a04 0%, #fde047 50%, #a16207 100%);
  --gold-border: 1px solid rgba(234, 179, 8, 0.4);
  
  /* 文本层级 */
  --text-parchment: #fef3c7;
  --text-dim-gold: #d4af37;
  --text-muted-ruby: #881337;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Cinzel`, 700/900 罗马大写衬线。
* **副标与引文 (Quote)**：`Playfair Display`, 斜体 (Italic)。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **烫金浮雕边框 (Gilded Frame)**：
  卡片采用双层细金线与四角古典装饰符号（Ornament Accents）。
* **古典画框 3D 景深**：
  卡片悬停时呈现 3D 透视倾斜与柔和深色天鹅绒阴影。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **金箔粒子拖尾**：鼠标滑过时激发金色微粒光晕。
* **油画光泽扫光**：画作卡片周期性掠过一层微弱的流光。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【数字巴洛克·万物感知馆 (Digital Baroque & Museum of Synthetic Senses)】风格生成 Gemini 艺术博物馆主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉基调：深天鹅绒红底 (#14050B)，搭配巴洛克烫金渐变 (#EAB308 / #FDE047) 与羊皮纸米白字 (#FEF3C7)。
2. 排版构件：使用 Cinzel 与 Playfair Display 优雅衬线体，卡片具备双层细金线框与古典角饰。
3. 核心板块：
   - 博物馆主殿 Hero（巴洛克大标题与金色铭文）
   - 多模态生成艺术藏品展区（油画合成、交响乐理、古希腊诗学）
   - 交互式「万物感知转译器」（输入一段思绪，转译为古典油画与巴洛克奏鸣曲）
```
