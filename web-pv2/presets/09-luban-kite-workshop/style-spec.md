# 风格构成说明：鲁班机鸢 · Agent 工坊 (Luban Kite Workshop)

## 1. 风格概述 (Style DNA)
* **核心理念**：将 Qwen-Agent 智能体拟喻为鲁班的机关木鸢——榫卯机关、应令而作、自主成事。整站是一间烛光下的机关工坊：暖木为骨、黄铜为心、图纸为令、齿轮为动。你落下一道指令，工坊便应声开工。
* **视觉情绪**：温暖、笃实、手作匠心；烛光摇曳中的可靠感，机关联动的灵巧感。
* **适用场景**：Agent 智能体主页、开发者工具站、个人作品集、品牌叙事页、工艺/匠题文化站点。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 木质基底 */
  --bg-walnut: #17120E;        /* 胡桃木底色 */
  --bg-bench: #221A12;         /* 工作台面 */
  --bg-bench-deep: #1C150E;    /* 台面深处 / 卡槽 */

  /* 木与铜 */
  --wood: #A97142;             /* 木色 */
  --wood-dark: #7A4E2B;        /* 深木 / 影部 */
  --brass: #D2A24C;            /* 黄铜主色 */
  --brass-bright: #E8C169;     /* 黄铜高光 */
  --bronze: #B08D57;           /* 暗铜 / 走线 */
  --verdigris: #4E8577;        /* 铜绿 / 完成态 */

  /* 图纸与文本 */
  --paper: #EFE3C8;            /* 图纸米 */
  --text-high: #F0E6D2;        /* 主文本 */
  --text-dim: #9A876C;         /* 弱文本 */

  /* 边框与光 */
  --border-brass: rgba(210, 162, 76, 0.28);
  --border-brass-strong: rgba(210, 162, 76, 0.55);
  --glow-candle: rgba(232, 193, 105, 0.16);  /* 烛光晕 */
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```
* **主标题 (Display)**：`ZCOOL QingKe HuangYou`，仅用于 H1/H2/品牌名与印章，字距 `0.03em`，带金石刻字的拙朴力度。
* **正文 (Body)**：`Noto Sans SC` 400/500/700，行高 `1.75`，颜色 `#9A876C`（弱）/ `#F0E6D2`（强）。
* **工序编号 / 台账 (Mono)**：`IBM Plex Mono` 500，用于「工序 01」、台账标签、日志时辰、打字机说明流。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **木纹背景**：胡桃木底叠两层 `repeating-linear-gradient`（宽木板拼缝 + 细密木纹）与一层噪点圆点网格，烛光以 `radial-gradient` 呼吸晕染：
  ```css
  body {
    background-color: #17120E;
    background-image:
      repeating-linear-gradient(90deg, rgba(169,113,66,.05) 0 2px, transparent 2px 120px),
      repeating-linear-gradient(0deg, rgba(169,113,66,.028) 0 1px, transparent 1px 8px);
  }
  ```
* **榫卯卡 (Notched Mortise-Tenon Card)**：用 `clip-path` 在四角切出阶梯缺口，模拟榫卯咬合；因 clip-path 会裁掉 box-shadow，阴影改用 `filter: drop-shadow()`：
  ```css
  .sunmao-card {
    --notch: 10px;
    clip-path: polygon(
      0 var(--notch), var(--notch) var(--notch), var(--notch) 0,
      calc(100% - var(--notch)) 0, calc(100% - var(--notch)) var(--notch), 100% var(--notch),
      100% calc(100% - var(--notch)), calc(100% - var(--notch)) calc(100% - var(--notch)),
      calc(100% - var(--notch)) 100%, var(--notch) 100%,
      var(--notch) calc(100% - var(--notch)), 0 calc(100% - var(--notch)));
    filter: drop-shadow(0 18px 24px rgba(0,0,0,.45));
  }
  ```
* **黄铜五金**：铆钉为径向渐变小圆点（高光偏左上 + 内阴影）；角包片是 45° 直角铜片贴在卡片四角；拉牌是带孔黄铜胶囊，用于「翻开/开工」等可操作提示。
* **虚线图纸走线**：航迹与流水线连接件一律用暗铜虚线（SVG `stroke-dasharray` 或 `repeating-linear-gradient`），走线运行时以 `stroke-dashoffset` / `background-position` 流动。
* **齿轮与木鸢**：全部 inline SVG。齿轮 = 圆周均布 rotate 的圆角矩形齿 + 主体圆 + 深色轮毂孔；木鸢 = 木质鱼身 + 双翼（独立分组以便拍动）+ 黄铜喙与铆钉眼。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **齿轮滚动联动（灵魂动画）**：滚动进度 `progress = scrollY / (scrollHeight - innerHeight)` 映射为基础角度，rAF 循环以 `0.08` 阻尼插值后乘以各齿轮的转速系数（大轮 +1、小轮 -2.4/+2.1），实现转速不同、方向相反、带惯性手感的联动旋转。
* **木鸢巡游**：Hero 舞台内 `.kite-track` 以 26s `ease-in-out` alternate 沿虚线航迹平移俯仰，嵌套 `.kite-bob` 4.2s 上下轻浮；双翼以各自铰点为 `transform-origin`（`transform-box: view-box`）做 1.5s 交替轻拍。交付完成时短暂进入 `kite-burst` 急促拍翅。
* **工具箱翻盖**：工具卡点击后 `.tool-lid` 以 `perspective: 1000px` + `transform-origin: top` 做 `rotateX(-72deg)` 翻起，下方 `.tool-body` 以 `max-height` 延时展开。
* **流水线逐格点亮**：「开工」后工序站点依次进入 `.active`（黄铜辉光 + LED 闪烁 + 打字机 24ms/字），完成后转 `.done`（铜绿常亮）；连接虚线整体流动。
* **其它**：烛火 5s 不规则明暗呼吸、余烬粒子上浮、卡片悬停上浮 3px、按钮提示抖动（shake）、导航滚过 24px 后压深加模糊。
* **过渡贝塞尔曲线**：`cubic-bezier(0.22, 1, 0.36, 1)`（木工刨推般的顺滑收势）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT-4o, DeepSeek, Qwen）即可生成同款风格页面：**

```markdown
【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【鲁班机鸢 · Agent 工坊 (Luban Kite Workshop)】风格，生成一个关于 Qwen（通义千问）的智能体个人主页（纯原生 HTML + CSS + JS，单页、无第三方库）。

设计要求：
1. 视觉底色：胡桃木深底 (#17120E) 与工作台面 (#221A12)，用 repeating-linear-gradient 叠出木板拼缝与细木纹，再铺一层低透明噪点；页面上方用 radial-gradient 渲染烛光暖晕并做不规则明暗呼吸。
2. 色彩体系：木色 #A97142、黄铜 #D2A24C / 高光 #E8C169、暗铜 #B08D57、铜绿 #4E8577、图纸米 #EFE3C8；文本 #F0E6D2 / 弱 #9A876C。
3. 材质构件：卡片用 clip-path 切四角阶梯缺口做「榫卯卡」（阴影用 filter: drop-shadow）；黄铜五金以径向渐变铆钉、45° 角包片、带孔拉牌呈现；航迹与流程连线全部用暗铜虚线。
4. 字体层次：标题用 ZCOOL QingKe HuangYou（Google Fonts），正文 Noto Sans SC (400/500/700)，工序编号与台账用 IBM Plex Mono。
5. 核心板块：
   - 顶部导航 + Hero「机关木鸢，应心而成」：舞台内含 inline SVG 齿轮组（滚动进度驱动联动旋转，大小齿轮转速不同方向相反）与一只沿虚线航迹巡游、翅膀轻拍的机关木鸢；
   - 机关工具墙：4 张 Agent 工具卡（检索/代码/日历/浏览器），点击如工具箱翻盖般 perspective rotateX 展开详情；
   - 装配台交互：勾选 2~3 件机关工具后点「开工」，工序流水线（规划→取件→加工→交付）逐格点亮，每格说明以打字机逐字浮现；
   - 工坊日志：思考痕迹式日志条目，虚线走线与时辰戳。
6. 动效要求：齿轮滚动联动与木鸢巡游为灵魂动画必须流畅；所有交互有黄铜辉光反馈；页脚文字「Qwen Personal Site · Preset 09 Luban Kite Workshop」。
```
