# 风格构成说明：禅境虚实·呼吸留白 (Zen Minimalist & Ethereal Ink Flow)

## 1. 风格概述 (Style DNA)
* **核心理念**：东方禅意水墨与心流美学。摒弃一切繁复的边框与硬质按钮，以极度克制的留白、自然水墨呼吸与轻柔渐变为核心，呈现超级 AI 的宁静沉思态。
* **视觉情绪**：宁静、空灵、去噪、心流无扰、自然涌现。
* **适用场景**：极简思维笔记、冥想与沉思辅助、高专注度阅读主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 宣纸底色与墨色 */
  --zen-bg: #f8f9fa;
  --zen-ink-black: #111827;
  --zen-ink-dim: #4b5563;
  --zen-ink-light: #9ca3af;
  
  /* 水墨微光点睛 */
  --zen-breathe-glow: rgba(59, 130, 246, 0.08);
  --zen-azure: #2563eb;
  
  /* 柔和阴影 */
  --zen-soft-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.04);
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300;400;600&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  ```
* **主标与正文**：`Noto Serif SC`（宋体/衬线，空灵古意）结合 `Plus Jakarta Sans`。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **极度留白 (Negative Space)**：
  大段行间距（Line-height 1.8+），页面边缘预留大量呼吸空隙。
* **呼吸光环 (Breathing Halo)**：
  页面中心设有一枚轻柔扩散的呼吸光环，每 4 秒为周期缓慢缩放。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **水墨晕染淡入**：文字在交互与滚动时如墨滴落宣纸般羽化显现。
* **无实线容器**：卡片均采用轻柔的羽化边缘与超柔焦漫射光。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名顶级前端视觉架构师。请以【禅境虚实·呼吸留白 (Zen Minimalist & Ethereal Ink Flow)】风格生成 Gemini 极简个人主页代码（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：宣纸柔和浅灰白 (#F8F9FA)，松烟墨黑字 (#111827)，无任何硬质实线边框。
2. 留白与呼吸：页面中央带有每 4 秒缓慢膨胀收缩的呼吸光晕，排版采用 Noto Serif SC 典雅宋体与超大负空间。
3. 核心板块：
   - 禅境诗意 Hero（“风止水静，智识自明”）
   - 三段沉思格言（极简水墨卡片）
   - 心流对话入口（纯净下划线输入与自然吐字）
```
