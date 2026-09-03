# Web-PV: 网页美术风格预设资源库 (Web Aesthetic Presets Vault)

> **Web-PV (Web Preset Vault)** 是一个面向现代 AI 驱动网页开发的美术风格规范与交互原型资源库。每个预设不仅提供开箱即用的高保真示例项目（HTML/CSS/JS），还配备了详尽的《风格构成说明》（`style-spec.md`），旨在为大语言模型（LLM）提供标准化的系统级 Prompt，使任意 AI 都能精准生成符合该预设美学特征的页面。

---

## 目录与风格矩阵

本期收录了 10 套围绕 **「Gemini（双子座 / 多模态超级 AI / 宇宙智识）」** 打造的顶级网页设计风格：

| 编号 | 预设代号 | 视觉风格名称 | 核心美学基因 | 对应目录 |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `cosmic-nebula` | 星轨星云·极光流体 | 官方品牌演化、深空黑曜、高斯极光流体、高透毛玻璃 | [`presets/01-cosmic-nebula/`](./presets/01-cosmic-nebula/) |
| **02** | `celestial-duality` | 双子对偶·极简阴阳分形 | 50/50 动态分割、瑞士排版、理智与感性反色张力 | [`presets/02-celestial-duality/`](./presets/02-celestial-duality/) |
| **03** | `synaptic-hologram` | 神经突触·全息色散 | CRT 扫描线、RGB 棱镜色散、动态突触流光连线 | [`presets/03-synaptic-hologram/`](./presets/03-synaptic-hologram/) |
| **04** | `cyber-observatory` | 双子深空天文台终端 | 琥珀色/荧光绿 CRT、纯等宽排版、ASCII 艺术与遥测流 | [`presets/04-cyber-observatory/`](./presets/04-cyber-observatory/) |
| **05** | `digital-baroque` | 数字巴洛克·万物感知馆 | 天鹅绒暗底、烫金浮雕边框、典雅衬线与 3D 画框景深 | [`presets/05-digital-baroque/`](./presets/05-digital-baroque/) |
| **06** | `zen-ethereal` | 禅境虚实·呼吸留白 | 水墨呼吸晕染、无边框极度留白、舒缓心流律动 | [`presets/06-zen-ethereal/`](./presets/06-zen-ethereal/) |
| **07** | `acid-origami` | 酸性折纸·高能多维展开 | 荧光酸绿强碰撞、3D 折叠卡片、倾斜贴纸与弹性物理 | [`presets/07-acid-origami/`](./presets/07-acid-origami/) |
| **08** | `spatial-aerofloat` | 微缩浮岛·空间拟物 | VisionOS 晶体胶囊、超大柔焦阴影、3D 陀螺仪视差倾斜 | [`presets/08-spatial-aerofloat/`](./presets/08-spatial-aerofloat/) |
| **09** | `bioluminescent-abyss` | 深海冷光·发光仿生 | 8000米渊黑、水母荧蓝冷光、水下焦散波纹与涟漪 | [`presets/09-bioluminescent-abyss/`](./presets/09-bioluminescent-abyss/) |
| **10** | `quantum-lattice` | 量子矢量·拓扑网阵 | 碳素黑底、超导银蓝精细线条、动态洛伦兹吸引子力场 | [`presets/10-quantum-lattice/`](./presets/10-quantum-lattice/) |

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
直接在浏览器中打开根目录的 `index.html`，即可启动 **Web-PV 风格画廊工作台**：
- 支持实时无缝切换并全屏预览 10 款预设；
- 支持**一键复制大模型专用 Prompt**，直接粘贴给 Claude、GPT-4o、DeepSeek 等大模型生成同款风格页面；
- 支持按美学标签（极简、未来、科幻、艺术等）过滤与筛选。

### 2. 引导大模型生成页面
打开任意预设目录下的 `style-spec.md`，复制其中的 **「大模型直接复用 Prompt」** 部分，并拼接上您的业务需求，即可让任意大模型输出视觉完全一致的前端页面代码。
