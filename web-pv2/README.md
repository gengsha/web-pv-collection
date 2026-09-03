# Web-PV2: 网页美术风格预设资源库 (Web Aesthetic Presets Vault · Qwen Edition)

> **Web-PV2 (Web Preset Vault 2)** 是一个面向现代 AI 驱动网页开发的美术风格规范与交互原型资源库。每个预设不仅提供开箱即用的高保真示例项目（HTML/CSS/JS），还配备了详尽的《风格构成说明》（`style-spec.md`），旨在为大语言模型（LLM）提供标准化的系统级 Prompt，使任意 AI 都能精准生成符合该预设美学特征的页面。

---

## 目录与风格矩阵

本期收录了 10 套围绕 **「Qwen（通义千问 / 开源全能大模型 / 千问千答）」** 打造的顶级网页设计风格。从官方品牌紫到文人水墨，从开源熔炉到赛博敦煌，十个预设分别切入千问的不同气质侧面：

| 编号 | 预设代号 | 视觉风格名称 | 核心美学基因 | 对应目录 |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `ink-myriad-questions` | 墨海千问·文人水墨长卷 | 宣纸白底、水墨晕染、朱砂钤印、竖排侧批与卷轴展开 | [`presets/01-ink-myriad-questions/`](./presets/01-ink-myriad-questions/) |
| **02** | `violet-nexus` | 紫枢星穹·旗舰品牌演化 | 官方品牌紫渐变、深空极光流体、毛玻璃与星尘粒子 | [`presets/02-violet-nexus/`](./presets/02-violet-nexus/) |
| **03** | `bamboo-sutra-terminal` | 竹简代码经·亿万卷典籍终端 | 竹简竖列、韦编绳结、等宽注经流与青铜框线 | [`presets/03-bamboo-sutra-terminal/`](./presets/03-bamboo-sutra-terminal/) |
| **04** | `lantern-thousand-nights` | 上元千灯·霓虹灯市 | 天灯升空粒子、暖金灯市、灯笼轻摆与点灯交互 | [`presets/04-lantern-thousand-nights/`](./presets/04-lantern-thousand-nights/) |
| **05** | `openweight-forge` | 开源熔炉·Open Weight Forge | 熔岩火花、工业蓝图网格、铆钉权重金库与钢印标签 | [`presets/05-openweight-forge/`](./presets/05-openweight-forge/) |
| **06** | `thought-constellation` | 思纬星图·推理星座 | Canvas 推理星座、逐颗点亮连线、顿悟金色爆亮 | [`presets/06-thought-constellation/`](./presets/06-thought-constellation/) |
| **07** | `longriver-tokens` | 亿万词长河·百万词元长河 | 字符长河波光、时代横向卷轴与大海捞针检索演示 | [`presets/07-longriver-tokens/`](./presets/07-longriver-tokens/) |
| **08** | `prism-modalis` | 通义棱镜·多模态分光 | 白光棱镜七彩分光、亮色极简发丝线与全息虹彩 | [`presets/08-prism-modalis/`](./presets/08-prism-modalis/) |
| **09** | `luban-kite-workshop` | 鲁班机鸢·Agent 工坊 | 榫卯机关卡、黄铜齿轮联动、木鸢巡游与装配流水线 | [`presets/09-luban-kite-workshop/`](./presets/09-luban-kite-workshop/) |
| **10** | `cyber-dunhuang` | 赛博敦煌·飞天全息 | 矿物颜料壁画、飞天飘带流体、金箔流光与全息修复 | [`presets/10-cyber-dunhuang/`](./presets/10-cyber-dunhuang/) |

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
在本地以任意静态服务器（如 `python -m http.server`）打开根目录的 `index.html`，即可启动 **Web-PV2 风格画廊工作台**：
- 支持实时无缝切换并全屏预览 10 款预设（亦支持 ↑/↓ 方向键快速切换）；
- 支持**一键复制大模型专用 Prompt**，直接粘贴给 Qwen、Claude、GPT 等大模型生成同款风格页面；
- 支持按美学标签（前沿科技、人文东方、硬核极客）过滤与关键词搜索；
- 支持桌面 / 平板 / 手机三档视口预览。

### 2. 引导大模型生成页面
打开任意预设目录下的 `style-spec.md`，复制其中的 **「大模型直接复用 Prompt」** 部分，并拼接上您的业务需求，即可让任意大模型输出视觉完全一致的前端页面代码。

---

## 与 Web-PV（第一期）的关系

第一期 **Web-PV** 以 Gemini 为题材探索了星云、全息、巴洛克等 10 套风格；本期 **Web-PV2** 以 Qwen 为题材，转向更具东方叙事与开源精神的美学体系：文人水墨、典籍竹简、上元灯市、敦煌飞天与鲁班机关，并与紫枢旗舰、推理星座、词元长河等科技意象对仗呼应。
