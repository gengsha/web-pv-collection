# 风格构成说明：活字格物·墨阵排印 (Movable Type · Ink Matrix Press)

## 1. 风格概述 (Style DNA)
* **核心理念**：将 GLM 5.3 的语言生成能力拟为毕昇活字工坊。每一个字都是一枚铸好的铅字，生成即「组版」——排版即建筑，字阵即智识。
* **视觉情绪**：书卷、笃定、金石之力、纸墨温度、汉字建筑的仪式感。
* **适用场景**：AI 语言能力展示、个人文字博客、中文创作工具、文化科技品牌主页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 纸面体系 */
  --paper: #f4efe3;
  --paper-deep: #ede6d5;
  --paper-shadow: rgba(27, 23, 16, 0.08);

  /* 墨色体系 */
  --ink: #1b1710;
  --ink-dim: #57503f;
  --ink-faint: #9a917c;

  /* 点睛体系 */
  --cinnabar: #b3382c;      /* 朱砂印红 */
  --gold-leaf: #a98118;     /* 洒金 */
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
  ```
* **巨字 (Display)**：`Noto Serif SC` 900，用于「智」「字字如铸」等汉字建筑主角，字间距宽绰（0.12em）。
* **竖排批注 (Vertical)**：`writing-mode: vertical-rl`，Noto Serif SC 400，用于侧栏诗句与批语。
* **数据 (Mono)**：`JetBrains Mono`，用于字库编号（甲-001 式）。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **活字字块 (Type Tile)**：深墨底 `#1B1710`，字面微凸浮雕——双向投影 `inset 0 2px rgba(255,255,255,0.14)` 与 `inset 0 -3px rgba(0,0,0,0.55)`；外缘纸色描边 1px。
* **纸面肌理**：底层叠加 `repeating-linear-gradient(45deg, transparent 0 6px, rgba(27,23,16,0.015) 6px 7px)` 模拟宣纸帘纹。
* **朱文方印 (Seal)**：朱砂红方块、内白文「智」字、`rotate(-3deg)`，印泥质感用 radial-gradient 斑驳遮罩。
* **字库矩阵**：`grid-template-columns: repeat(8, 1fr)`，块间距 10px，如整版铅字字盘。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **铅字受压**：活字块悬停时 `translateY(2px)` 下沉、浮雕阴影收拢，如手指按下铅字。
* **翻面释义**：点击字块 3D 翻转（`rotateY(180deg)`，0.5s ease），背面为宣纸色释义卡。
* **组版动画**：输入文字后逐枚铅字「落版」——依次从上方 12px 落下并伴随短暂按压回弹。
* **墨迹显影**：滚动渐显使用 `filter: blur(6px)→0` + 位移，如墨在纸上晕开成形。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【活字格物·墨阵排印 (Movable Type · Ink Matrix Press)】风格生成一个关于 GLM 5.3 的「语言文字工匠」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：宣纸暖白 #F4EFE3，叠加极淡帘纹肌理（repeating-linear-gradient）；文字以松烟墨 #1B1710 为主。
2. 核心构件：活字字块——深墨底 #1B1710、白字浮雕（inset 双向投影模拟铅字凸起）；朱砂方印（#B3382C 旋转 -3deg，内白文）。
3. 字体排版：Noto Serif SC 900 巨型宋体标题（可竖排 writing-mode: vertical-rl 作侧栏批注）；字库编号用 JetBrains Mono。
4. 核心板块：
   - 巨字 Hero：一枚超大「智」字活字块 + 竖排诗题「字字如铸，落笔生根」
   - 字库矩阵：16 枚活字（智/思/文/码/声/图…）悬停受压下沉、点击翻面显示能力释义
   - 组版工坊：输入任意短句，点击「组版」逐枚铅字落版成阵
   - 朱砂落款对话框
5. 动效要求：铅字按压回弹、翻转 0.5s 3D transition、滚动内容如墨迹晕染显影（blur→clear）。
```
