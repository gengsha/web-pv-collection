# 风格构成说明：赛博灯市·电光国潮 (Neon Lantern Bazaar · Cyber Guochao)

## 1. 风格概述 (Style DNA)
* **核心理念**：把 GLM 5.3 的能力矩阵摆成一条夜市灯街——每个能力是一盏招牌、一个摊位、一张灯谜。烟火气 × 电光感，国潮与赛博的正面相撞。
* **视觉情绪**：喧闹、鲜亮、市井烟火、电音节奏、大排档式的热情。
* **适用场景**：AI 能力游乐场、活动运营页、开发者社区嘉年华、趣味产品官网。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  /* 灯市夜色 */
  --night-market: #0a0712;
  --alley-deep: #050308;

  /* 霓虹四色 */
  --neon-red: #ff2e5c;
  --neon-gold: #ffc233;
  --neon-cyan: #2ae8d5;
  --neon-magenta: #c13bff;

  /* 招牌板材 */
  --sign-board: #14091c;
}
```

---

## 3. 排版与字体系统 (Typography)

* **Google Fonts 引入**：
  ```html
  <link href="https://fonts.googleapis.com/css2?family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  ```
* **招牌体 (Display)**：`ZCOOL QingKe HuangYou` 布告体，用于霓虹大字与摊名，自带市井喉嗓。
* **正文 (Body)**：`Noto Sans SC` 400。
* **价目 (Mono)**：`JetBrains Mono`，用于「每千 Tokens 价目牌」。

---

## 4. 视觉材质与构件法则 (Materials & Geometry)

* **竖排霓虹招牌 (Vertical Neon Sign)**：`writing-mode: vertical-rl` 大字，`text-shadow` 三层叠加（外晕 12px / 中晕 6px / 芯光 1px 同色）。
* **霓虹管边框 (Tube Frame)**：`border: 2px` + `border-radius: 18px` + 同色 `box-shadow: 0 0 14px` 双层辉光。
* **灯笼 (Lantern)**：椭圆径向暖光体 + 竖排金字，`transform-origin: top` 摇摆。
* **票券摊位卡 (Ticket Stall)**：虚线撕边（`border-left: 2px dashed` 分隔票根）、票根副券标注「Token 券」。
* **跑马灯 (Marquee)**：顶部灯带通栏，文字横向无缝滚动。
* **灯谜卡 (Riddle Card)**：3D 翻转容器（`perspective: 900px`），正面谜面、背面谜底。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **霓虹闪烁 (Flicker)**：随机挑选招牌每 2~5s 触发一次 0.35s 的高频明暗抖动（`@keyframes flick`），如电压不稳。
* **灯笼摇曳**：`rotate(-4deg ↔ 4deg)` 3.5s 往复。
* **灯谜翻牌**：点击卡片 `rotateY(180deg)` 翻面，背面霓虹亮起。
* **跑马灯循环**：内容双份拼接 `translateX(-50%)` 无限滚（18s linear）。

---

## 6. 大模型直接复用 Prompt (LLM System Prompt)

> **请将以下 Prompt 复制并输入给任意大语言模型（如 Claude, GPT, Gemini, DeepSeek）即可生成同款风格页面：**

```markdown
你是一名顶级前端视觉架构师。请以【赛博灯市·电光国潮 (Neon Lantern Bazaar · Cyber Guochao)】风格生成一个关于 GLM 5.3 的「AI 夜市灯街」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：深夜市井 #0A0712 至暗巷 #050308 渐变；霓虹四色——绯红 #FF2E5C、鎏金 #FFC233、青碧 #2AE8D5、洋红 #C13BFF。
2. 核心构件：竖排霓虹招牌（writing-mode: vertical-rl，text-shadow 三层同色辉光）；霓虹管边框卡（2px 描边 + 双层 box-shadow 辉光）；票券摊位卡（dashed 撕边票根）；顶部跑马灯带；灯笼椭圆暖光体。
3. 字体排版：ZCOOL QingKe HuangYou 布告体做霓虹大字与摊名，Noto Sans SC 正文，JetBrains Mono 价目。
4. 核心板块：
   - Hero：一枚巨型竖排「智」字霓虹招牌 + 「GLM 5.3 灯市」霓虹标题 + 摇曳灯笼
   - 五个摊位票券：推理摊 / 代码摊 / 画皮摊（图像）/ 声腔摊（语音）/ 百晓摊（搜索）
   - 灯谜翻牌区：点击翻转揭示 GLM 谜底
   - Token 价目牌（Mono 表格）
5. 动效要求：招牌随机时间触发霓虹闪烁抖动、灯笼 3.5s 摇曳、灯谜点击 3D 翻面、跑马灯 18s 无限循环。整体高饱和但暗底衬托，热闹不刺眼。
```
