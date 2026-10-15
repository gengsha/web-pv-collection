# 风格构成说明：天工开物·营造图则 (Tiangong Kaiwu · Craft Blueprint)

## 1. 风格概述 (Style DNA)
* **核心理念**：以明代《天工开物》的工艺百科与工程图纸美学承载 GLM 5.3 的「建造者」身份——写代码如营造，训练如制榫，交付如髹漆。每个能力都配一张施工图则。
* **视觉情绪**：匠心、笃实、木与纸的温度、工程制图的严谨、古籍批注的讲究。
* **适用场景**：开发者工具主页、工程博客、开源项目门户、技术方案展示页。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 图纸体系 */
  --kraft: #e7dcc2;
  --kraft-deep: #dbceac;

  /* 墨线体系 */
  --ink-brown: #3a2e1b;
  --ink-line: #4a3b24;
  --ink-faint: #8a7a5c;

  /* 批注体系 */
  --cinnabar-stamp: #a83226;   /* 朱印 */
  --wash-blue: #33557a;        /* 图则蓝批注 */
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Serif+SC:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  ```
* **图题 (Display)**：`ZCOOL XiaoWei`，用于「凡造智识」等大标题与工序名。
* **正文 (Body)**：`Noto Serif SC` 400，古籍排版气质。
* **尺寸标注 (Dims)**：`JetBrains Mono`，图纸尺寸、图号、比例。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **坐标纸 (Grid Paper)**：`repeating-linear-gradient` 双向 1px 线网（`rgba(74,59,36,0.08)`，间距 28px），如方眼绘图纸。
* **图框与图签 (Frame & Title Block)**：页面外框 3px 双线（4px 间隔）；右下角图签栏——表格化「项目 / 图号 / 比例 / 匠」四格。
* **榫卯卡 (Tenon Card)**：卡顶部两端设凸榫（`::before/::after` 12px 方凸块），卡底设卯眼虚线，卡片相连如木构咬合。
* **尺寸线 (Dimension Line)**：标题下横向标注线——两端箭头 + 中间 mono 数字（「比例 1:5.3」）。
* **木刻图标 (Woodcut Icons)**：SVG 单色线描（`stroke #4A3B24`，`stroke-width 1.6`，无填充），题材为工具与构件。
* **朱印 (Seal)**：`#A83226` 描边双框，内文「验讫」白字，`rotate(-6deg)`，投影如钤印压力。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **钤印 (Stamp)**：点击图纸任意处，于光标处盖下一枚朱印——`scale 1.4→1` + 短促下压（0.28s），带印泥扩散阴影。
* **尺寸线生长**：标题尺寸线进入视口时自中线向两端伸展（`scaleX 0→1`，0.7s）。
* **线描渐显**：木刻 SVG 图标随滚动 `stroke-dashoffset` 描线成形。
* **榫卯咬合**：悬停卡片时凸榫 `translateY(3px)` 下压，如敲入卯眼。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【天工开物·营造图则 (Tiangong Kaiwu · Craft Blueprint)】风格生成一个关于 GLM 5.3 的「营造匠」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：牛皮图纸 #E7DCC2，叠加 28px 间距的双向 1px 方眼坐标线网（8% 透明墨棕）。
2. 色彩体系：墨棕线 #4A3B24、正文深墨 #3A2E1B、朱印红 #A83226、图则蓝批注 #33557A。
3. 核心构件：页面外框为 3px 双线图框 + 右下角图签表格（项目 GLM 5.3 营造图则 / 图号 GLM-53-TK-001 / 比例 1:5.3 / 匠 智谱）；榫卯卡（顶部两枚 12px 凸榫、底部卯眼虚线）；标题下尺寸标注线（两端箭头 + mono 比例数字）；木刻风 SVG 单色线描图标。
4. 字体排版：ZCOOL XiaoWei 图题、Noto Serif SC 正文、JetBrains Mono 尺寸与图号。
5. 核心板块：
   - Hero：「凡造智识，天工开物」+ 尺寸线标注（比例 1:5.3）
   - 营造工序四榫卯卡：选材（数据）→ 制榫（训练）→ 合梁（对齐）→ 髹漆（强化），各配木刻线描图标与朱批小注
   - 器物清单 BOM 表（能力即物料：逻辑木 / 记忆铜 / 推理铁 / 语言漆）
   - 建造案例图则两幅 + 验讫盖章交互（点击图纸任意处钤一枚朱印）
6. 动效要求：尺寸线 scaleX 生长、SVG 描线渐显、卡片悬停榫头下压咬合、点击钤印带 scale 1.4→1 下压与印泥阴影。
```
