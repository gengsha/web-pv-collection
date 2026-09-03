# Web-PV4: 网页美术风格预设资源库 (Web Aesthetic Presets Vault)

> **Web-PV4 (Web Preset Vault 4)** 是一个面向 AI 驱动网页开发的美术风格规范与交互原型资源库。每个预设都提供一套开箱即用的高保真示例项目（HTML/CSS/JS），并配备《风格构成说明》（`style-spec.md`），用于为任意大语言模型提供标准化的系统级 Prompt，从而稳定复现同一套美学。

本期主题：**hy4 的个人网站**（混合推理模型人设 · 20 套互不雷同的视觉语言 · 不含国风元素）

> **01–10** 为美术风格篇（材质、排版、配色驱动）；**11–20** 为技术炫技篇（WebGL 着色器、GPGPU 模拟、物理引擎、实时渲染管线驱动）。两篇共用同一份内容骨架，仅视觉与引擎不同。

---

## 目录与风格矩阵

| 编号 | 预设代号 | 视觉风格名称 | 核心美学基因 | 对应目录 |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `liquid-chrome` | 液态铬·流体镜面 | 熔融金属、Y2K 铬感、镜面高光跟随、流体渐变 | [`presets/01-liquid-chrome/`](./presets/01-liquid-chrome/) |
| **02** | `neo-brutalist` | 新粗野主义·混凝土硬边 | 3px 黑描边、硬阴影塌陷、原色撞块、跑马灯 | [`presets/02-neo-brutalist/`](./presets/02-neo-brutalist/) |
| **03** | `risograph-paper` | 丝网印·纸品编辑 | Riso 双色套印、半调网点、纸纹噪点、套印错位 | [`presets/03-risograph-paper/`](./presets/03-risograph-paper/) |
| **04** | `vaporwave-dusk` | 蒸汽波黄昏·VHS 回潮 | 落日圆盘、无限透视网格、扫描线、色差抖动 | [`presets/04-vaporwave-dusk/`](./presets/04-vaporwave-dusk/) |
| **05** | `solarpunk-botany` | 太阳能乌托邦·有机温室 | 晨光奶油、植物剪影、有机 Blob、呼吸律动 | [`presets/05-solarpunk-botany/`](./presets/05-solarpunk-botany/) |
| **06** | `swiss-editorial` | 瑞士编辑·国际主义网格 | 12 列可见网格、瑞士红、极端左对齐、编号索引 | [`presets/06-swiss-editorial/`](./presets/06-swiss-editorial/) |
| **07** | `dark-academia` | 暗夜学院·手稿档案馆 | 羊皮纸、索引卡匣、古典衬线、蜡封与烛光呼吸 | [`presets/07-dark-academia/`](./presets/07-dark-academia/) |
| **08** | `isometric-blueprint` | 等轴测线框·工程蓝图 | 蓝图深蓝、等轴测 SVG、尺寸标注、描线生长 | [`presets/08-isometric-blueprint/`](./presets/08-isometric-blueprint/) |
| **09** | `neon-rain-alley` | 霓虹雨夜·湿巷反射 | 霓虹辉光、雨丝斜线、水面倒影、招牌闪烁 | [`presets/09-neon-rain-alley/`](./presets/09-neon-rain-alley/) |
| **10** | `clay-soft-pop` | 软陶拟物·粉彩立体 | Claymorphism、粉彩配色、弹性按压、柔和光晕 | [`presets/10-clay-soft-pop/`](./presets/10-clay-soft-pop/) |
| **11** | `raymarch-sdf` | 光线步进·SDF 雕塑 | WebGL 光线步进、smin 融合、步进预算 64↔192、零三角形 | [`presets/11-raymarch-sdf/`](./presets/11-raymarch-sdf/) |
| **12** | `gpu-particles` | 十万粒子·流场引擎 | gl.POINTS、curl 噪声流场、叠加混合拖尾、光标涡旋 | [`presets/12-gpu-particles/`](./presets/12-gpu-particles/) |
| **13** | `reaction-diffusion` | 反应扩散·Gray-Scott 培养皿 | ping-pong FBO、9 点拉普拉斯、形态发生、拖动接种 | [`presets/13-reaction-diffusion/`](./presets/13-reaction-diffusion/) |
| **14** | `ascii-engine` | 实时字符化·ASCII 渲染管线 | 软件光栅、z-buffer、朗伯着色、亮度量化字符映射 | [`presets/14-ascii-engine/`](./presets/14-ascii-engine/) |
| **15** | `terrain-flight` | 无限地形·噪声穿行 | fBm 高程场、Voxel Space 投影、画家算法、等高线 | [`presets/15-terrain-flight/`](./presets/15-terrain-flight/) |
| **16** | `audio-spectrum` | 音频频谱·Web Audio 引擎 | 振荡器实时合成、前瞻调度、FFT、径向/线性/波形三视图 | [`presets/16-audio-spectrum/`](./presets/16-audio-spectrum/) |
| **17** | `verlet-cloth` | 韦尔莱布料·物理实验室 | Verlet 积分、约束松弛、剪切与撕裂、应变染色 | [`presets/17-verlet-cloth/`](./presets/17-verlet-cloth/) |
| **18** | `mandelbrot-dive` | 分形深潜·Mandelbrot 观测台 | 逃逸时间渲染、smooth iteration、自动深潜、FP32 护栏 | [`presets/18-mandelbrot-dive/`](./presets/18-mandelbrot-dive/) |
| **19** | `text-morph` | 文字粒子·形变矩阵 | alpha 掩码采样、弹簧归位、鼠标斥力、速度映射亮度 | [`presets/19-text-morph/`](./presets/19-text-morph/) |
| **20** | `metaball-lava` | 熔岩元球·标量场渲染 | 逐像素平方反比场、256 项 LUT、等值带、ABGR 直写 | [`presets/20-metaball-lava/`](./presets/20-metaball-lava/) |

统一人设（所有预设共用同一份内容骨架，仅视觉语言不同）：

- **品牌**：hy4 — 混合推理模型（Hybrid Reasoning）
- **指标**：256K 上下文 · Instant / Deep Think 双模 · TTFT 0.18s · 并行工具调用
- **板块**：Hero 主视区 → 能力矩阵（4 卡）→ 混合推理演示面板 → 对话终端 → 指标遥测 → 页脚

---

## 预设子目录标准化结构

```
presets/[序号]-[风格代号]/
├── style-spec.md     # 风格构成说明（含大模型直接复用 Prompt、Design Tokens、材质与动效法则）
├── index.html         # 该风格下 hy4 个人网站的完整独立可运行示例
├── style.css          # 该风格的设计系统 CSS 变量、材质类与动画规则
└── main.js            # 该风格的微交互、粒子/物理/视差动画
```

---

## 快速使用指南

### 1. 浏览与预览
直接用浏览器打开根目录 `index.html`，即可启动 **Web-PV4 风格画廊工作台**：

- 实时切换并预览 10 款 hy4 个人网站预设，支持桌面 / 平板 / 手机视口切换；
- **一键复制大模型 Prompt**，粘贴给 Claude、GPT-4o、DeepSeek 等模型即可生成同款风格页面；
- 支持关键词搜索与美学分类筛选（未来金属 / 复古浪潮 / 印刷纸品 / 有机自然 / 粗野结构 / 着色器 / 物理模拟 / 引擎实验）。

### 2. 引导大模型生成页面
打开任意预设目录下的 `style-spec.md`，复制 **「大模型直接复用 Prompt」** 部分，再拼接你的业务需求，即可得到视觉高度一致的前端代码。
