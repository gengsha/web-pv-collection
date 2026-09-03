# 风格构成说明：曙光旗舰·智谱蓝调 (Dawn Flagship · Zhipu Blue)

## 1. 风格概述 (Style DNA)
* **核心理念**：GLM 5.3 官方旗舰发布页美学。以「曙光初照」为意象——靛蓝渐变如晨光穿过大气，克制、高级、可信，是智谱品牌视觉的系统化延伸。
* **视觉情绪**：明亮、通透、旗舰感、值得信赖、次世代工程美学。
* **适用场景**：模型官方主页、旗舰产品发布页、开发者平台首页、年度 Keynote 页面。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 基础底色 */
  --bg-dawn: #f6f8fd;
  --bg-surface: #ffffff;
  --bg-glass: rgba(255, 255, 255, 0.78);

  /* 品牌渐变三原色 */
  --glm-indigo: #2e4ce0;
  --glm-violet: #7c5cfc;
  --glm-sky: #4f8df7;
  --glm-gradient: linear-gradient(120deg, #2e4ce0 0%, #7c5cfc 55%, #4f8df7 100%);

  /* 边框与辉光 */
  --border-soft: rgba(11, 18, 38, 0.06);
  --border-glow: rgba(124, 92, 252, 0.4);
  --glow-violet: rgba(124, 92, 252, 0.25);

  /* 文本层级 */
  --ink-primary: #0b1226;
  --ink-secondary: #4a5578;
  --ink-muted: #8a93b2;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Noto+Sans+SC:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`Outfit`, 700/800, 负字间距 `-0.03em`, 渐变剪裁字体（`background-clip: text`）。
* **中文正文 (Body)**：`Noto Sans SC`, 400/500, 行高 `1.7`, 颜色 `#4a5578`。
* **数据指标 (Mono)**：`JetBrains Mono`, 600 等宽，用于评测数字与版本号。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **轻透玻璃卡片 (Light Glass Card)**：
  ```css
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(11, 18, 38, 0.06);
  border-radius: 20px;
  box-shadow: 0 24px 48px -20px rgba(46, 76, 224, 0.18);
  ```
* **曙光柔光球 (Dawn Orbs)**：页面后置 2 颗超大（500px~650px）低饱和渐变光斑，`filter: blur(90px)`，透明度 0.35，随光标缓慢反向漂移。
* **能力 Bento 网格**：`grid-template-columns: repeat(12, 1fr)`，卡片跨 3/4/6 列混排，形成旗舰发布会常见的节奏感拼图。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **滚动渐显**：`IntersectionObserver` 触发 `.reveal` → `translateY(24px)→0` + `opacity 0→1`，贝塞尔 `cubic-bezier(0.16, 1, 0.3, 1)`。
* **指标数字滚动**：评测数字自 0 递增至目标值（800ms, easeOut）。
* **卡片上浮**：悬停 `translateY(-6px)` 且边框泛起 `--border-glow` 渐变光晕。
* **柔光球视差**：光标位移乘以 -0.04 系数，光球以 CSS 变量插值跟随。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【曙光旗舰·智谱蓝调 (Dawn Flagship · Zhipu Blue)】风格生成一个关于 GLM 5.3（智谱旗舰大模型）的个人官网（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：晨曦蓝白 #F6F8FD，纯白表面 #FFFFFF；页面后置 2 颗超大低饱和柔光球（靛蓝 #2E4CE0 与紫罗兰 #7C5CFC，blur 90px，opacity 0.35）随鼠标视差漂移。
2. 材质体系：轻透玻璃卡片（backdrop-filter: blur(20px)，边框 1px rgba(11,18,38,0.06)，投影 0 24px 48px -20px rgba(46,76,224,0.18)）。
3. 字体层次：Outfit 主标题使用 120deg 靛→紫渐变文字剪裁，中文正文 Noto Sans SC，数据用 JetBrains Mono。
4. 核心板块：
   - 顶部导航 + 版本胶囊徽章「GLM-5.3」+ 巨型渐变 Hero 标题
   - 能力 Bento 网格（深度推理 / 智能体 / 多模态 / 代码）
   - 评测成绩条形图（数字自 0 滚动递增动画）
   - 对话终端入口（辉光输入框 + 发送按钮）
5. 动效要求：滚动渐显（IntersectionObserver）、指标数字滚动、卡片悬停上浮 6px 泛渐变光晕。
```
