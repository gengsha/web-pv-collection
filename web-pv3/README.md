# Web-PV3: 网页美术风格预设资源库 (Web Aesthetic Presets Vault · Vol.3)

> **Web-PV3** 是面向现代 AI 驱动网页开发的美术风格规范与交互原型资源库。每个预设不仅提供开箱即用的高保真示例项目（HTML/CSS/JS），还配备了详尽的《风格构成说明》（`style-spec.md`），旨在为大语言模型（LLM）提供标准化的系统级 Prompt，使任意 AI 都能精准生成符合该预设美学特征的页面。

---

## 目录与风格矩阵

本期收录了 10 套围绕 **「GLM 5.3（智谱 · 全能旗舰模型 · 通用语言智能）」** 打造的顶级网页设计风格：

| 编号 | 预设代号 | 视觉风格名称 | 核心美学基因 | 对应目录 |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `dawn-flagship` | 曙光旗舰·智谱蓝调 | 官方旗舰发布美学、晨曦蓝白、靛紫渐变文字、轻透玻璃 | [`presets/01-dawn-flagship/`](./presets/01-dawn-flagship/) |
| **02** | `movable-type` | 活字格物·墨阵排印 | 宋体巨字、活字字库矩阵、朱砂方印、宣纸排印 | [`presets/02-movable-type/`](./presets/02-movable-type/) |
| **03** | `qinghua-porcelain` | 青花釉彩·瓷上生花 | 瓷白钴蓝双勾、开片冰裂、缠枝生成纹样、窑变叙事 | [`presets/03-qinghua-porcelain/`](./presets/03-qinghua-porcelain/) |
| **04** | `moonlit-garden` | 夜园月门·移步换景 | 月门圆形构图、墨绿夜园、花窗漏影、步石进度叙事 | [`presets/04-moonlit-garden/`](./presets/04-moonlit-garden/) |
| **05** | `neon-lantern` | 赛博灯市·电光国潮 | 竖排霓虹招牌、灯笼辉光、灯谜翻转卡、跑马灯市声 | [`presets/05-neon-lantern/`](./presets/05-neon-lantern/) |
| **06** | `star-chart` | 石刻星图·观天授时 | 深靛星幕、金星星官连线、浑仪环阵、古籍朱批注疏 | [`presets/06-star-chart/`](./presets/06-star-chart/) |
| **07** | `fusion-core` | 聚变环芯·等离子跃迁 | 托卡马克环阵、等离子粒子流、能级仪表、遥测 HUD | [`presets/07-fusion-core/`](./presets/07-fusion-core/) |
| **08** | `tiangong-blueprint` | 天工开物·营造图则 | 牛皮图纸网格、榫卯卡扣构件、朱批尺寸线、图签验讫 | [`presets/08-tiangong-blueprint/`](./presets/08-tiangong-blueprint/) |
| **09** | `hutong-diary` | 市井烟火·胡同手记 | 手写体手账、拍立得拼贴、暖灯辉光、胶带便利贴 | [`presets/09-hutong-diary/`](./presets/09-hutong-diary/) |
| **10** | `thought-river` | 思维长河·推理流光 | Canvas 令牌流河、思维链步石、金色波光、涟漪交互 | [`presets/10-thought-river/`](./presets/10-thought-river/) |

---

## 预设子目录标准化结构

每个预设子文件夹均遵循以下统一规范：

```
presets/[序号]-[风格代号]/
├── style-spec.md     # 风格构成说明（包含给其他大模型的 System Prompt、设计规范与 CSS Tokens）
├── index.html         # 该风格的高保真完整独立可运行示例
├── style.css          # 该风格的设计系统 CSS 变量、材质类与动画规则
└── main.js            # 该风格的微交互、动态粒子/物理动画
```

---

## 快速使用指南

### 1. 浏览与预览
直接在浏览器中打开根目录的 `index.html`，即可启动 **Web-PV3 风格画廊工作台**：
- 支持实时无缝切换并全屏预览 10 款预设；
- 支持**一键复制大模型专用 Prompt**，直接粘贴给 Claude、GPT、Gemini、DeepSeek 等大模型生成同款风格页面；
- 支持按美学标签（前沿科技、极简人文、人文艺术、硬核极客等）过滤与筛选。

### 2. 引导大模型生成页面
打开任意预设目录下的 `style-spec.md`，复制其中的 **「大模型直接复用 Prompt」** 部分，并拼接上您的业务需求，即可让任意大模型输出视觉完全一致的前端页面代码。

---

## 与前作的关系

- **Web-PV (Vol.1)**：Gemini（双子座）专题 —— 星云极光、对偶分屏、深海冷光等 10 套；
- **Web-PV3 (Vol.3)**：GLM 5.3（智谱）专题 —— 以东方美学基因 × 前沿科技叙事双螺旋展开的 10 套全新风格，与前作零重复。
