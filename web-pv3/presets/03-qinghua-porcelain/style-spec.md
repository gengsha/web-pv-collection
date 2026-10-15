# 风格构成说明：青花釉彩·瓷上生花 (Qinghua Porcelain · Generative Glaze)

## 1. 风格概述 (Style DNA)
* **核心理念**：以青花瓷的「生成美学」映射 GLM 5.3 的多模态生成能力——入窑一色，出窑万彩。钴蓝纹样在瓷白釉面上生长，如同提示词在模型中绽放。
* **视觉情绪**：温润、典雅、生成感、手作与算法共舞的东方器物美学。
* **适用场景**：AI 生成艺术平台、多模态能力展示、文创科技品牌、数字藏品页面。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 瓷面体系 */
  --porcelain: #fbf8f1;
  --porcelain-shade: #f1ebdd;

  /* 青花体系 */
  --cobalt: #1e4b9c;
  --cobalt-deep: #123064;
  --cobalt-wash: #6e93c9;
  --indigo-ash: #a9b8ce;

  /* 点睛体系 */
  --glaze-red: #96382b;   /* 釉里红 */
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **标题 (Display)**：`ZCOOL XiaoWei`，宋韵今书，用于「入窑一色」等大标题与瓷盘题字。
* **正文 (Body)**：`Noto Serif SC` 400，行高 1.9，衬线温润。
* **窑温数据 (Mono)**：`JetBrains Mono`，用于烧成温度与版本号。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **青花双勾边框 (Double-line Border)**：外线 1px `#123064` + 间距 3px + 内线 1px `#6E93C9`，构成瓷绘勾线的骨法。
* **开片冰裂 (Crackle Overlay)**：SVG `<pattern>` 极淡（6% 透明度）不规则 polyline 网眼，覆盖在瓷白表面模拟哥窑开片。
* **缠枝纹样 (Scrolling Vine)**：SVG 贝塞尔藤蔓 + 莲纹圆点，`stroke-dasharray` 初始等于路径全长，随滚动描线生长。
* **瓷盘构图 (Plate Frame)**：圆形容器（`border-radius: 50%`），内部同心环纹 + 中心纹样，悬停时缓旋掠过釉面高光。
* **海水江崖分隔线 (Wave Divider)**：`radial-gradient` 重复波脚，作为区块之间的水缘。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **纹样描线 (Line Drawing)**：IntersectionObserver 触发 `stroke-dashoffset` 从全长至 0，1.4s ease。
* **釉面扫光 (Glaze Shine)**：卡片悬停时一道 120deg 白色柔光带（20% 透明度）自左掠过（transform: translateX）。
* **瓷盘缓旋**：`transform: rotate(0→8deg)` 8s 往复，如同转盘审瓷。
* **窑火呼吸**：落款按钮辉光以 3s 周期明暗。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【青花釉彩·瓷上生花 (Qinghua Porcelain · Generative Glaze)】风格生成一个关于 GLM 5.3 的「生成艺术瓷窑」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：瓷釉白 #FBF8F1，可叠加极淡开片冰裂 SVG pattern（6% 透明度）与径向釉面光泽渐变。
2. 色彩体系：青花钴蓝 #1E4B9C 主色、深钴 #123064、水色青花 #6E93C9、釉里红点缀 #96382B。
3. 核心构件：青花双勾边框卡片（外深内浅双 1px 线）；圆形瓷盘构图（border-radius: 50%，同心环纹 + 中心 SVG 缠枝莲纹样）；海水江崖波脚分隔线。
4. 字体排版：ZCOOL XiaoWei 标题 + Noto Serif SC 正文 + JetBrains Mono 窑温数据。
5. 核心板块：
   - Hero：「入窑一色，出窑万彩」大标题 + 一枚带缠枝纹的大瓷盘
   - 生成纹样画册：文生图 / 图生视频 / 声音复刻三枚瓷盘，纹样 SVG 随滚动描线生长
   - 釉色谱系色卡 + GLM 版本窑变史时间轴（1.0 → 5.3 烧成曲线）
   - 釉下落款对话框（钴蓝辉光输入框）
6. 动效要求：SVG stroke-dashoffset 描线动画、卡片悬停釉面扫光、瓷盘缓旋、纹路精细克制不喧宾。
```
