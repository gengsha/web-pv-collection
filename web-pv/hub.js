// Web-PV Preset Directory Data & Hub Logic
const PRESETS = [
  {
    id: "01-cosmic-nebula",
    num: "01",
    name: "星轨星云·极光流体",
    enName: "Cosmic Nebula & Aurora Fluidity",
    cat: "future",
    tags: ["官方演化", "极光流体", "毛玻璃", "深邃科技"],
    desc: "深邃黑曜夜空与高斯极光多模态流体，搭配精致透光毛玻璃与引力微交互。",
    prompt: `你是一名顶级前端视觉架构师。请以【星轨星云·极光流体 (Cosmic Nebula & Aurora Fluidity)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 底色深空 #070913，玻璃面 rgba(16,22,38,0.65)，边框 rgba(255,255,255,0.12)，悬停边框 rgba(66,133,244,0.4)。
- 极光三原色：紫 #7928CA、蓝 #4285F4、青 #00F0FF；标题渐变 #A855F7→#38BDF8→#2DD4BF。
- 文本：#FFFFFF / #F1F5F9 / 弱 #94A3B8 / 更弱 #475569；状态绿 #34D399，标签蓝 #38BDF8。

材质构件：
- 背景固定层：3 颗径向渐变光球（650/750/500px，filter: blur(100px)，opacity 0.45）+ 32px 点阵星尘（opacity 0.35）。
- 毛玻璃卡片：backdrop-filter: blur(24px)，圆角 20px，阴影 0 20px 40px -15px rgba(0,0,0,0.6) + inset 0 1px 0 rgba(255,255,255,0.1)；悬停改边框为蓝色并加蓝色外辉光。
- 按钮全部胶囊（9999px）：主按钮紫→蓝渐变 + 蓝色投影，次按钮半透明玻璃。
- Hero 下方放胶囊遥测条（3 组 Mono 标签 + 数值，竖线分隔）；终端面板带红黄绿三点、文件名与「● LIVE」状态。

字体排版：
- Google Fonts：Plus Jakarta Sans（300–800）+ JetBrains Mono（400/500/700）。
- 主标题 800、3.5rem、字距 -0.035em，第二行渐变剪裁；正文 1.1rem / 行高 1.65；标签与数据用 Mono 大写宽字距。

交互与动效：
- 三颗光球 CSS 往返漂移（16s/20s/18s，ease-in-out infinite alternate，带位移与缩放）。
- 鼠标移动时光球产生视差（系数 60 / -80 / 40，0.6s 阻尼过渡；视差写在外层包裹元素，避免与漂移动画冲突）。
- 卡片悬停 0.35s 发光过渡，曲线 cubic-bezier(0.16,1,0.3,1)。
- 对话舱：回车或点击发送后追加用户气泡，约 650ms 后追加一条预设回复并滚动到底。
- prefers-reduced-motion 下关闭光球漂移与视差。

内容板块（示例，可按业务替换）：
- 顶部导航（品牌图标 + 名称 + 版本徽章 + 4 个锚点 + 胶囊按钮）
- Hero（胶囊徽章 + 两行大标题 + 简介 + 双按钮 + 遥测条）
- 三列核心能力卡片（图标 + 标题 + 描述 + Mono 徽章）
- 终端式过程展示面板（分步日志 + 结论行）
- 交互式对话体验舱
- 页脚（{{品牌/产品名}} + 一句副标）`
  },
  {
    id: "02-celestial-duality",
    num: "02",
    name: "双子对偶·极简阴阳分形",
    enName: "Celestial Duality & Swiss Monolith",
    cat: "minimal",
    tags: ["50/50分屏", "瑞士排版", "黑白对偶", "哲思张力"],
    desc: "黑白 50/50 动态分割对偶张力，理性代码态与感性生成态的对称美学。",
    prompt: `你是一名顶级前端视觉架构师。请以【双子对偶·极简阴阳分形 (Celestial Duality & Swiss Monolith)】风格，为 {{品牌/产品名}} 生成一个单页主页（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 理性极：底 #F8FAFC、卡片 #FFFFFF、文字 #09090B、弱 #64748B、边框 #E2E8F0。
- 感性极：底 #09090B、卡片 #141418、文字 #F8FAFC、弱 #A1A1AA、边框 #27272A。
- 唯一强调色：拖拽轴悬停蓝 #2563EB；代码块 #0F172A + #38BDF8；引文边线 #818CF8。全页禁用渐变与彩色装饰。

材质构件：
- 全屏 flex 分屏（body 100vh、overflow hidden），左栏初始 50%，右栏 flex:1，两栏各自纵向滚动，内容列 max-width 540px、gap 32px。
- 页眉：Mono 编号 + 描边状态徽章，下边线 1px solid currentColor。
- 单体卡片：圆角 12px、1px 边框、极轻阴影；左卡内嵌深色代码块，右卡内嵌斜体诗句引文。
- 双列指标行（上边线分隔）；整宽按钮与所在面板反相（浅侧黑底、深侧白底）。
- 中轴：6px 灰条（#71717A）+ 32px 深色圆形把手，内含左右箭头。

字体排版：
- Google Fonts：Syne（700/800）+ Plus Jakarta Sans（300–700）+ JetBrains Mono（400/500）。
- 每侧主标题为一个全大写英文单词，Syne 800、3.2rem、行高 1、字距 -0.04em；指标数字 Syne 800 1.8rem。
- 弱化文字统一用 opacity 0.65–0.75，而非换色。

交互与动效：
- 32px 白色圆形光标，mix-blend-mode: difference，跟随鼠标零延迟，在黑白两侧自动反色。
- 按住中轴拖拽改变左栏宽度，范围钳制 20%–80%，拖拽中轴变蓝、页面光标为 col-resize。
- 按钮悬停上移 2px、透明度 0.9（0.2s）。不加任何循环动画。
- prefers-reduced-motion 下取消过渡与位移；补充 pointer 事件支持触屏拖拽。

内容板块（示例，可按业务替换）：
- 左极「理性」：编号页眉 → 大标题 → 副标 → 技术卡片（含代码片段）→ 两项硬指标 → 行动按钮
- 右极「感性」：编号页眉 → 大标题 → 副标 → 创意卡片（含诗句引文）→ 两项体验指标 → 行动按钮
- 两侧内容逐项对仗，分别代表 {{品牌/产品名}} 的两种能力或两种身份`
  },
  {
    id: "03-synaptic-hologram",
    num: "03",
    name: "神经突触·全息色散",
    enName: "Synaptic Holo-Chroma Lab",
    cat: "future",
    tags: ["全息投影", "RGB色散", "突触连线", "实验室"],
    desc: "赛博全息扫描线与棱镜色散，SVG 动态发光神经突触节点连线。",
    prompt: `你是一名顶级前端视觉架构师。请以【神经突触·全息色散 (Synaptic Holo-Chroma Lab)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 底色 #030712；面板 rgba(10,15,29,0.7)，悬停 rgba(18,26,48,0.85)；边框 rgba(56,189,248,0.25)。
- 全息三色：主信号青 #22D3EE、品红 #E879F9（标签/次读数）、酸橙 #A3E635（仅在线状态）。
- 文本 #F8FAFC / 弱 #94A3B8；辉光 0 0 24px rgba(34,211,238,0.35)。

材质构件：
- 四层固定背景：40px 青色正交网格（6% 透明度）、全屏 Canvas 突触网络、3px 周期横向扫描线（opacity 0.6）、8px 青→品红渐变扫描光束。
- HUD 顶栏：毛玻璃 blur(8px) + 底部细线，左侧 ONLINE 小徽章与品牌名，右侧两组 Mono 遥测读数。
- 节点卡片：几乎无圆角，blur(12px)，左上/右下 8px 青色 L 形角标，头部为 Mono 节点 ID + 酸橙状态，底部 4px 能量条（分别用青/品红/酸橙填充）。
- 按钮圆角 4px：主按钮半透明青品红渐变 + 青描边，悬停变实色渐变黑字；次按钮透明描边。

字体排版：
- Google Fonts：Chakra Petch（500–700，标题/按钮）+ JetBrains Mono（400–700，读数/ID）+ Plus Jakarta Sans（正文）。
- 主标题全大写英文，Chakra Petch 700、3.2rem，白→青渐变剪裁并加青色 text-shadow。

交互与动效：
- 扫描光束 8s linear infinite 自上而下循环扫过。
- Canvas：35 个青色节点缓慢漂移、边缘反弹，距离 <180px 两两连线，透明度随距离衰减。
- 点击主按钮进入 2 秒高脉冲态：连线变亮变粗、节点加速并呼吸，HUD 读数临时切换为「100.00% PULSING」后复原。
- 卡片悬停上浮 4px + 青色辉光（0.3s）。
- prefers-reduced-motion 下关闭扫描光束与 Canvas 循环，只保留静态网络。

内容板块（示例，可按业务替换）：
- HUD 顶栏（{{品牌/产品名}} // LAB + 两项实时指标）
- Hero（品红版本胶囊 + 英文大标题 + 一段说明 + 「激发脉冲」主按钮与次按钮）
- 三张能力节点卡片（如视觉 / 声学 / 推理，每张含节点 ID、状态、描述与能量条）
- 状态页脚（一行 Mono 系统状态文字）`
  },
  {
    id: "04-cyber-observatory",
    num: "04",
    name: "双子深空天文台",
    enName: "Retro Gemini Space Terminal",
    cat: "cyber",
    tags: ["琥珀CRT", "纯等宽", "ASCII艺术", "深空遥测"],
    desc: "90年代复古深空观测站终端，纯等宽字阶、ASCII 徽标与遥测数据流。",
    prompt: `你是一名顶级前端视觉架构师。请以【深空天文台终端 (Retro Space Terminal)】风格，为 {{品牌/产品名}} 生成一个单页主页（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 页面外围纯黑 #000000；显示器屏幕 #120D06（备用底 #0A0804）。
- 琥珀单色三级：亮 #FFB000（文字/数值/填充）、中 #996A00（边框/虚线）、暗 #332300（分隔线/条槽）；提示符 #FF9900。
- 荧光辉光 0 0 8px rgba(255,176,0,0.4)。全页只允许这一种色相。

材质构件：
- 一台居中的 CRT 显示器：max-width 960px，2px #996A00 外框，圆角 12px，外琥珀辉光 + inset 0 0 40px 暗角；屏幕上覆盖 2px 周期横向扫描线（rgba(0,0,0,0.4)）。
- 系统抬头：左右两组方括号系统标签，底部 1px 虚线。
- 任务简报框：细描边 + 3% 琥珀底，每行以「> 」开头。
- 双列遥测卡片：直角细描边，标题以「// 」开头，3 行左右对齐的数据行 + 一条 6px 带辉光的百分比填充条。
- 纯黑 CLI 区：日志区可滚动，底部虚线分隔的「user@host:~$」提示符 + 透明无边框输入框（autofocus）。

字体排版：
- Google Fonts：JetBrains Mono（400–800，全站唯一正文字体）+ VT323（ASCII 横幅）。
- 用 <pre> 排出 figlet 风格 ASCII 大标（VT323、1.15rem、行高 1.1、文字辉光）+ 一行版本号。
- 强调只用加粗 + 文字辉光，不换颜色。

交互与动效：
- 抬头「● ONLINE」以 1.2s 无限闪烁（opacity 1→0.3→1），这是唯一的循环动画。
- CLI：回车后回显命令，再输出对应响应；支持 help / status / scan / models / about / clear，未知命令提示输入 help；输出后自动滚动到底。
- 不做悬停动画、不做 CRT 抖动。
- prefers-reduced-motion 下关闭闪烁动画，指示灯常亮。

内容板块（示例，可按业务替换）：
- 系统抬头（{{品牌/产品名}} 系统名、位置、信号频率、在线状态）
- ASCII 横幅（{{品牌/产品名}} 字符画 + 版本号）
- 任务简报（两行使命与已加载模块）
- 双列遥测卡片（如核心指标 / 性能带宽，各 3 行数据 + 填充条）
- 可交互 CLI 终端（命令响应文案围绕 {{品牌/产品名}} 的功能撰写）`
  },
  {
    id: "05-digital-baroque",
    num: "05",
    name: "数字巴洛克·万物感知馆",
    enName: "Digital Baroque & Museum of Senses",
    cat: "art",
    tags: ["烫金浮雕", "天鹅绒暗底", "古典艺术", "3D画框"],
    desc: "古典重工烫金与古典画框景深，文艺复兴美学与现代生成艺术的共鸣。",
    prompt: `你是一名顶级前端视觉架构师。请以【数字巴洛克·万物感知馆 (Digital Baroque & Museum of Synthetic Senses)】风格，为 {{品牌/产品名}} 生成一个单页官网（纯原生 HTML + CSS + JS，禁止第三方 JS 库）。

色彩令牌：
- 展厅底色酒红黑 #14050B；画框底 rgba(30,10,18,0.75)。
- 金箔三级：金 #EAB308、香槟金 #FDE047、暗金 #A16207；正文羊皮纸色 #FEF3C7 与暖黄 #FDE68A。
- 鎏金渐变：文字 #FDE047→#CA8A04→#FDE047（135deg），按钮 #FDE047→#EAB308→#CA8A04。
- 展品画面底用暗色径向渐变（紫 #3B0764 / 靛 #1E1B4B / 褐 #451A03 收边到底色）。

材质构件：
- 全部直角。双层画框：1px 暗金外框 + 12px 内衬 + 1px 20% 金色内框，阴影 0 16px 40px rgba(0,0,0,0.6)。
- 展品卡：Cinzel 编号小标 → 140px 暗色径向渐变画面（中央图形）→ 标题 → 描述 → 顶部细线分隔的金色标签。
- 鎏金主按钮（渐变底、深色字、浅金描边、金色投影）；碑文式描边胶囊；「✦ ✦ ✦」字符纹饰作为页眉页脚装饰。
- 互动区：宽幅画框内放暗底金框输入框（聚焦变香槟金）+ 金色按钮 + 虚线金框输出区。

字体排版：
- Google Fonts：Cinzel（500/700/900，标题与标签）+ Playfair Display（正文，含斜体）+ Plus Jakarta Sans（备用）。
- 主标题 Cinzel 900、3.2rem、字距 0.04em，第二行鎏金渐变剪裁；标签 Cinzel 宽字距 0.15–0.2em；副标与生成文本用斜体。

交互与动效：
- 全屏 Canvas：40 粒金尘缓慢上升（半径 1–3px，透明度 0.3–1），飘出顶部后从底部重生。
- 画框悬停上浮 6px、外框亮为香槟金（0.35s，cubic-bezier(0.16,1,0.3,1)）；按钮悬停上浮 2px 加深投影。
- 互动区点击按钮：先显示「✦ 正在转译… ✦」占位，约 700ms 后填入一段随机预设文案（引用用户输入）。
- prefers-reduced-motion 下停止金尘循环并取消悬停位移。

内容板块（示例，可按业务替换）：
- 页眉（纹饰 + {{品牌/产品名}} 馆名 + 斜体副标）
- Hero（碑文胶囊 + 两行大标题 + 引言 + 鎏金按钮）
- 三列展品画框（三件代表作品/能力，各含编号、画面、标题、描述、标签）
- 宽幅互动转译区（输入 → 生成结果）
- 页脚（纹饰 + 一行致辞）`
  },
  {
    id: "06-zen-ethereal",
    num: "06",
    name: "禅境虚实·呼吸留白",
    enName: "Zen Minimalist & Ethereal Ink Flow",
    cat: "minimal",
    tags: ["东方水墨", "极度留白", "呼吸律动", "去噪心流"],
    desc: "极致东方留白与水墨自然晕染，4秒舒缓呼吸光律与心流减噪体验。",
    prompt: `你是一名顶级前端视觉架构师。请以【禅境虚实·呼吸留白 (Zen Minimalist & Ethereal Ink Flow)】风格，为 {{品牌/产品名}} 生成一个极简主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为宣纸灰白 #F8F9FA。墨色分三阶：浓墨 #111827（标题/正文）、淡墨 #4B5563（副文/卡片正文）、枯墨 #9CA3AF（序号/页脚）。
- 全页唯一的冷色是光晕中的 rgba(59,130,246,0.08)。禁止其他强调色、彩色按钮、实线边框和高对比元素。

二、材质构件
- 呼吸光环：position: fixed 的 600×600 圆，居中于视口，背景为 radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)，pointer-events: none，位于内容层之下。
- 无框墨卡：背景 rgba(255,255,255,0.7)，backdrop-filter: blur(16px)，圆角 16px，内边距 36px 28px，阴影 0 15px 35px -10px rgba(0,0,0,0.03)，不设 border。三列卡片网格使用 auto-fit minmax(240px,1fr)，gap 32px。
- 单线输入：输入框透明无边框，只留一条 1px rgba(0,0,0,0.15) 底线，文字居中，聚焦时底线变为 #111827。

三、字体排版
- Google Fonts 引入 Noto Serif SC（300/400/600/700），全站使用衬线体。Plus Jakarta Sans 可作为拉丁辅助字体。
- 主标题 3.4rem、字重 400（不加粗）、字距 0.08em、行高 1.35，居中并手动断成两行。副标题 1.05rem、行高 1.8、最大宽度 580px。
- 卡片序号使用汉字「一 二 三」，枯墨色。回应文字为斜体、淡墨色，用中文引号包裹。
- 单列居中，容器最大宽度 900px，区块间距 80–90px，留白要极度奢侈。

四、交互与动效
- 光环呼吸：@keyframes 从 scale(0.85)/opacity 0.5 到 scale(1.2)/opacity 0.9，8s ease-in-out infinite alternate。
- 墨卡悬停：translateY(-4px)，曲线 cubic-bezier(0.16,1,0.3,1)，时长 0.4s。
- 输入框按 Enter 且内容非空时，回应区淡出（opacity 0，transition 0.4s），400ms 后从预置的 3 条禅语中随机替换文本，再淡入。
- 在 prefers-reduced-motion: reduce 下关闭光环呼吸动画与悬停位移。

五、内容板块（示例，可按业务替换）
- 页眉：左侧为 {{品牌/产品名}} 的中文雅称，右侧为一句状态小字（如「心流常驻 · 虚室生白」）。
- 禅境 Hero：两行诗意大标题（如「风止水静，智识自明。」）加一句去喧嚣的副标题。
- 三段沉思墨卡：每张卡片含序号、四字标题和一句理念说明（如 无念而照 / 顺物自然 / 万籁归一），用来对应产品的三项核心能力。
- 心流对话入口：一个单线输入框，下方是斜体回应语。
- 页脚：一行枯墨小字（{{品牌/产品名}} · Zen Ethereal）。`
  },
  {
    id: "07-acid-origami",
    num: "07",
    name: "酸性折纸·高能多维展开",
    enName: "Acid Dimensional Origami",
    cat: "art",
    tags: ["酸性荧光", "3D折叠", "贴纸排版", "潮流先锋"],
    desc: "荧光酸绿与电粉的高能撞色，CSS 3D 折纸展开与弹性碰撞物理。",
    prompt: `你是一名顶级前端视觉架构师。请以【酸性折纸·高能多维展开 (Acid Dimensional Origami)】风格，为 {{品牌/产品名}} 生成一个潮流先锋主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 页面底色为炭黑 #0F1015，卡片底 #1A1C24，生成器底 #18181B。
- 三种酸性主色：酸橙绿 #CCFF00、电光粉 #FF007F、数码青 #00FFFF。
- 描边与硬影一律用纯黑 #000。辅助灰：副文 #A1A1AA、卡片正文 #D4D4D8、页脚 #71717A。
- 全页圆角为 0，所有阴影为零模糊的硬投影。

二、材质构件
- 倾斜贴纸：纯色块配大写小字，每张旋转角度不同（-2deg / 3deg / -1deg / 2deg），带 3–4px 黑色硬影。
- 硬投影按钮：2px 黑框，box-shadow 5px 5px 0 #000。悬停时 translate(-2px,-2px)、影子变为 7px；按下时 translate(2px,2px)、影子变为 2px。
- 翻面折纸卡：3px 黑框，box-shadow 10px 10px 0 #CCFF00，父容器 perspective: 1200px。卡片有正面和背面两个面，展开后显示背面，硬影改为电光粉。
- 灵感生成器面板：3px 黑框，box-shadow 8px 8px 0 #00FFFF，内容居中。

三、字体排版
- Google Fonts 引入 Syne（700/800）、Space Grotesk（500/700）、JetBrains Mono（700）。
- 主标题用 Syne 800，4rem，行高 1.05，字距 -0.03em。英文全大写，中文行为绿色，加 text-shadow: 4px 4px 0 #FF007F 形成错位重影。
- 正文与贴纸用 Space Grotesk。折面编号用 JetBrains Mono 0.72rem，格式「FOLD 01 // FRONT」。

四、交互与动效
- 按钮使用 transition: all 0.15s，带有抬起和按压的手感。
- 点击卡片或 Hero 主按钮时，在 folded 与 unfolded 之间切换；背面的收起按钮要阻止事件冒泡。可选用回弹曲线 cubic-bezier(0.175,0.885,0.32,1.275) 0.6s。
- 点击生成按钮后，文本缩放到 0.95，150ms 后随机替换为另一条预置创意，再恢复到 1。
- 在 prefers-reduced-motion: reduce 下取消位移与过渡。

五、内容板块（示例，可按业务替换）
- 页眉：左侧绿色品牌贴「{{品牌/产品名}} // ACID LAB」，右侧粉色徽章「★ NO RULES ★」。
- 潮流 Hero：两张小贴纸、两行大标题（英文口号 + 中文高亮行）、一句副文和两个按钮（主按钮为绿色，用来展开卡片）。
- 折纸卡片：正面是能力标题、提示语和两枚迷你标签，背面是被解锁的能力详情和收起按钮。
- 随机灵感生成器：标题、一条创意文本和一个「BOMB ANOTHER IDEA 💥」按钮，内置 4 条以上跨界创意。
- 页脚：一行大写小字（{{品牌/产品名}} // ACID ORIGAMI）。`
  },
  {
    id: "08-spatial-aerofloat",
    num: "08",
    name: "微缩浮岛·空间拟物",
    enName: "Aero Spatial Computing UI",
    cat: "future",
    tags: ["VisionOS", "晶体胶囊", "3D视差", "悬浮投影"],
    desc: "次时代空间计算体验，超清透高折射晶体卡片与 3D 陀螺仪视差倾斜。",
    prompt: `你是一名顶级前端视觉架构师。请以【微缩浮岛·空间拟物 (Aero Spatial Computing UI)】风格，为 {{品牌/产品名}} 生成一个空间计算主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为深空蓝黑 #0B0F19。玻璃底 rgba(255,255,255,0.08)，悬停时 0.14。
- 晶体描边 1px rgba(255,255,255,0.22)，顶部内高光 inset 0 1px 0 rgba(255,255,255,0.35)。
- 双层空间阴影：0 30px 60px -12px rgba(0,0,0,0.55), 0 18px 36px -18px rgba(0,0,0,0.5)。
- 文本白 #FFFFFF，弱文本 #94A3B8。点睛色为天蓝 #38BDF8；靛紫 #818CF8 只用于环境光。

二、材质构件
- 环境光斑：两个固定大圆（天蓝 600px 放在左上，靛紫 500px 放在右下），radial-gradient 加 filter: blur(120px)、opacity 0.35，置于内容层之下。
- 晶体玻璃：backdrop-filter: blur(36–40px) 加上述描边、内高光和双层阴影，卡片圆角 28px，胶囊圆角 9999px。
- 浮岛卡片：外层负责 3D 倾斜（transform-style: preserve-3d），内层负责玻璃材质。卡片内依次放 Emoji 图标、标题、正文，底部用 1px 顶线隔出一行等宽天蓝元数据。三列网格的父级设 perspective: 1000px。
- 顶部状态胶囊：Logo、1px 竖线分隔，再接一段等宽天蓝状态字。
- 悬浮 Dock：fixed 定位在底部居中，深色玻璃底 rgba(20,26,40,0.75)，内含 5 个 44px 圆形图标按钮；激活态为天蓝 25% 底加 0 0 15px 天蓝外发光。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（300–800）与 JetBrains Mono（500）。
- 主标题 3.5rem、字重 800、字距 -0.03em、行高 1.15，居中两行。副文 1.1rem、行高 1.65、弱文本色。
- 所有系统元数据（跟踪状态、胶囊标签、卡片指标）用 JetBrains Mono 0.72–0.75rem 天蓝色。

四、交互与动效
- 3D 陀螺仪倾斜：在卡片上 mousemove 时，以卡片中心为原点归一化，计算 rotateX = 偏移Y × -10°、rotateY = 偏移X × 10°，并 scale3d(1.02)；离开时复位，transition 0.1s ease-out。悬停时玻璃底色提亮。
- Dock 悬停：scale(1.15) translateY(-4px)，0.2s。点击时在按钮之间切换 active 态。
- 在 prefers-reduced-motion: reduce 下不绑定倾斜，并取消 Dock 的缩放位移。

五、内容板块（示例，可按业务替换）
- 顶部状态胶囊：「✦ {{品牌/产品名}}」加一段运行状态（如「TRACKING: ACTIVE」）。
- 空间 Hero：等宽胶囊标签、两行大标题（如「无界空间，触手可及。」）和一句副文。
- 三张浮岛卡片：每张对应一项核心能力（如 眼动意图预测 / 空间手势 / 环境声场），各带一个指标元数据（如 LATENCY: < 2ms）。
- 悬浮 Dock：5 个功能入口图标，中间一个默认激活。`
  },
  {
    id: "09-bioluminescent-abyss",
    num: "09",
    name: "深海冷光·发光仿生",
    enName: "Bioluminescent Abyss Ecology",
    cat: "art",
    tags: ["深海渊黑", "水母冷光", "水下焦散", "发光涟漪"],
    desc: "深海未知物种仿生美学，8000米渊黑与荧蓝自发光，水下焦散微光动效。",
    prompt: `你是一名顶级前端视觉架构师。请以【深海冷光·发光仿生 (Bioluminescent Abyss Ecology)】风格，为 {{品牌/产品名}} 生成一个深海主题主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 页面底使用 radial-gradient(circle at center, #020617 0%, #010409 100%)。
- 卡片底 rgba(8,20,44,0.65)，描边 rgba(56,189,248,0.2)。
- 生物冷光三色：水母荧蓝 #38BDF8（主色）、翡翠绿 #34D399、珊瑚粉 #FB7185（只用于点缀）。
- 主文本冷白 #F0F9FF；弱文本用浅天蓝 #7DD3FC，不用灰色。

二、材质构件
- 焦散 Canvas：全屏 fixed，opacity 0.45，不拦截事件。每帧画 6 条横向折线（步长 40px），颜色 rgba(56,189,248,0.08)、线宽 2，y = 基线 + sin(x*0.005+t+i)*35 + cos(x*0.01-t)*20，t 每帧加 0.015。
- 生物荚舱卡片：背景模糊 20px，圆角 24px，overflow hidden。右上角偏出 -40px 处放一团 120px、blur(40px)、opacity 0.5 的荧光，三张卡片依次用青 / 绿 / 珊瑚。
- 页眉光点：10px 荧蓝圆点，外发光 0 0 12px。胶囊标签：荧蓝 10% 底、30% 描边，圆角 9999px。
- 涟漪层：fixed 全屏、z-index 置顶、pointer-events: none。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（300–800）与 JetBrains Mono（400/500）。
- 主标题 3.6rem、字重 800、字距 -0.02em，居中两行。第二行为 135° 青→绿渐变文字，加 text-shadow: 0 0 30px rgba(56,189,248,0.4)。
- 所有仪表读数、器官编号和胶囊标签用 JetBrains Mono 0.72–0.75rem。

四、交互与动效
- 焦散用 requestAnimationFrame 持续流动，并响应 resize。
- 点击页面任意位置，在点击处生成 80px 荧蓝圆环（带 0 0 20px 外发光），用 keyframes 从 scale(0)/opacity 1 扩散到 scale(5)/opacity 0，1.2s ease-out，结束后移除节点。
- 页眉光点循环脉动：2s 内 scale 在 1 与 1.4 之间、opacity 在 0.8 与 1 之间往返。
- 卡片悬停：translateY(-6px)，曲线 cubic-bezier(0.16,1,0.3,1)，0.35s，描边变为满色荧蓝。
- 在 prefers-reduced-motion: reduce 下，焦散只绘制静态一帧，并停止光点脉动。

五、内容板块（示例，可按业务替换）
- 页眉：左侧光点加「{{品牌/产品名}} // HADAL ZONE」，右侧等宽读数（如「DEPTH: 8,420M // PRESSURE: 850 ATM」）。
- 深渊 Hero：胶囊标签「BIOLUMINESCENT EMERGENCE」、两行标题（如「渊深八千米，智识自发光。」）和一句副文。
- 三张感知器官卡片：每张含编号（ORGAN 01 // …）、标题和说明，对应产品的三项核心能力。
- 页脚：一行提示「点击屏幕任意位置激发冷光涟漪」，再加 {{品牌/产品名}} 署名。`
  },
  {
    id: "10-quantum-lattice",
    num: "10",
    name: "量子矢量·拓扑网阵",
    enName: "Quantum Vector & Lorentz Matrix",
    cat: "cyber",
    tags: ["洛伦兹场", "精密标尺", "超导银蓝", "数学真理"],
    desc: "纯粹算法与数学之美，动态 Canvas 洛伦兹吸引子三维力场与拓扑矩阵。",
    prompt: `你是一名顶级前端视觉架构师。请以【量子矢量·拓扑网阵 (Quantum Vector & Lorentz Matrix)】风格，为 {{品牌/产品名}} 生成一个数学 / 科学计算主题主页。要求纯原生 HTML + CSS + JS 单页，禁止使用任何第三方 JS 库。

一、色彩令牌
- 底色为碳素黑 #090A0F。卡片与控件底 rgba(15,18,28,0.7)，描边 rgba(96,165,250,0.2)。
- 超导银蓝 #60A5FA（主色），量子纠缠紫 #C084FC（坐标与点缀）。
- 文本 #F8FAFC，弱文本 #94A3B8。

二、材质构件
- 洛伦兹 Canvas：全屏 fixed，不拦截事件，位于内容之下。每帧先叠一层 rgba(9,10,15,0.2) 作为残影遮罩，再用 1px rgba(96,165,250,0.4) 线条一笔画出整条轨迹，轨迹头部画一个 3px 紫色粒子。
- 积分方式：欧拉法，σ=10、ρ=28、β=8/3、dt=0.008，每帧 4 步，最多保留 1200 点。投影时绕 Y 轴旋转（z 先减 25），缩放系数为 min(w,h)/45。
- 矢量卡片：直角无圆角，1px 细框，backdrop-filter: blur(16px)。顶部放紫色坐标角标（如 [X: +14.28 // Y: -08.12]），底部用 1px 虚线分隔出一行银蓝等宽状态读数。三列网格，gap 28px。
- 参数滑块条：胶囊形，依次放标签、原生 range 滑块（5–25，步长 0.5）和数值读数。

三、字体排版
- Google Fonts 引入 Plus Jakarta Sans（400–800）与 JetBrains Mono（400/500/700）。
- 主标题 3.6rem、字重 800、字距 -0.03em，居中两行；第二行为 135° 蓝→紫渐变文字。
- 页眉右侧用等宽字显示洛伦兹方程式；Ψ 符号、方括号标签、坐标、读数和滑块数值全部用 JetBrains Mono。

四、交互与动效
- 用 requestAnimationFrame 持续积分并绘制，视角每帧 angleY += 0.004 rad 缓慢自转，并响应 resize。
- 拖动滑块时实时改写 σ，读数保留一位小数，轨迹随之立即变形。
- 卡片悬停：translateY(-4px)，描边变为满色银蓝，并加 0 10px 30px rgba(96,165,250,0.15) 阴影，0.3s。
- 在 prefers-reduced-motion: reduce 下停止自转循环，只绘制一帧静态吸引子，调节滑块时再重绘。

五、内容板块（示例，可按业务替换）
- 页眉：「Ψ {{品牌/产品名}} // QUANTUM TENSOR」加方程式。
- 量子 Hero：标签「[ TOPOLOGY & LOGIC // ORDER ]」、两行标题（如「量子秩序，拓扑算力之美。」）、一句副文和 σ 参数滑块条。
- 三张矢量卡片：每张含坐标、能力标题、说明和一个状态读数（如 STATE: COHERENT / MANIFOLD: HYPERBOLIC / SYMMETRY: SU(3)×SU(2)）。
- 页脚：一行小字（{{品牌/产品名}} · Quantum Vector Lattice）。`
  }
];

let currentPresetIndex = 0;

// DOM 元素引用
const presetNavList = document.getElementById('presetNavList');
const previewIframe = document.getElementById('previewIframe');
const currentPresetIndexEl = document.getElementById('currentPresetIndex');
const currentPresetTitleEl = document.getElementById('currentPresetTitle');
const currentPresetSubtitleEl = document.getElementById('currentPresetSubtitle');
const openExternalBtn = document.getElementById('openExternalBtn');
const copyPromptBtn = document.getElementById('copyPromptBtn');
const viewSpecBtn = document.getElementById('viewSpecBtn');
const specDrawer = document.getElementById('specDrawer');
const specBackdrop = document.getElementById('specBackdrop');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');
const specTitleEl = document.getElementById('specTitle');
const specSubtitleEl = document.getElementById('specSubtitle');
const specContentEl = document.getElementById('specContent');
const toastEl = document.getElementById('toast');
const iframeWrapper = document.getElementById('iframeWrapper');
const presetSearch = document.getElementById('presetSearch');
const categoryPills = document.getElementById('categoryPills');

// 渲染侧边栏预设列表
function renderPresetList(filterText = '', filterCat = 'all') {
  presetNavList.innerHTML = '';
  
  const filtered = PRESETS.filter(p => {
    const matchText = !filterText || 
      p.name.toLowerCase().includes(filterText.toLowerCase()) ||
      p.enName.toLowerCase().includes(filterText.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(filterText.toLowerCase())) ||
      p.desc.toLowerCase().includes(filterText.toLowerCase());
    
    const matchCat = filterCat === 'all' || p.cat === filterCat;
    return matchText && matchCat;
  });

  if (filtered.length === 0) {
    presetNavList.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.8rem;">未找到匹配的预设风格</div>`;
    return;
  }

  filtered.forEach((preset) => {
    const originalIndex = PRESETS.findIndex(p => p.id === preset.id);
    const item = document.createElement('button');
    item.className = `preset-item ${originalIndex === currentPresetIndex ? 'active' : ''}`;
    item.onclick = () => selectPreset(originalIndex);

    item.innerHTML = `
      <span class="item-num">${preset.num}</span>
      <div class="item-info">
        <div class="item-title-row">
          <span class="item-title">${preset.name}</span>
        </div>
        <p class="item-desc">${preset.desc}</p>
        <div class="item-tags">
          ${preset.tags.map(t => `<span class="item-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    presetNavList.appendChild(item);
  });
}

// 选中某个预设
function selectPreset(index) {
  currentPresetIndex = index;
  const p = PRESETS[index];

  // 更新头部信息
  currentPresetIndexEl.textContent = p.num;
  currentPresetTitleEl.textContent = p.name;
  currentPresetSubtitleEl.textContent = p.enName;

  // 更新 Iframe 与外链
  const pageUrl = `presets/${p.id}/index.html`;
  previewIframe.src = pageUrl;
  openExternalBtn.href = pageUrl;

  // 刷新侧边栏激活状态
  const items = presetNavList.querySelectorAll('.preset-item');
  items.forEach(el => el.classList.remove('active'));
  // 匹配当前序号高亮
  const activeBtn = Array.from(items).find(el => el.querySelector('.item-num')?.textContent === p.num);
  if (activeBtn) activeBtn.classList.add('active');
}

// 复制大模型系统级 Prompt
copyPromptBtn.addEventListener('click', async () => {
  const p = PRESETS[currentPresetIndex];
  try {
    await navigator.clipboard.writeText(p.prompt);
    showToast(`已复制「${p.name}」的大模型 Prompt！`);
  } catch (err) {
    // 降级使用 textarea
    const ta = document.createElement('textarea');
    ta.value = p.prompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`已复制「${p.name}」的大模型 Prompt！`);
  }
});

// 显示 Toast
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2800);
}

// 打开风格规范抽屉
viewSpecBtn.addEventListener('click', async () => {
  const p = PRESETS[currentPresetIndex];
  specTitleEl.textContent = `${p.num}. ${p.name}`;
  specSubtitleEl.textContent = `presets/${p.id}/style-spec.md`;
  
  specContentEl.innerHTML = `<div style="text-align:center; padding: 30px; color: var(--text-muted);">正在加载风格规范文件...</div>`;
  specDrawer.classList.add('open');
  specBackdrop.classList.add('open');

  try {
    const res = await fetch(`presets/${p.id}/style-spec.md`);
    if (res.ok) {
      const text = await res.text();
      // 简单 Markdown 转 HTML
      specContentEl.innerHTML = parseMarkdownSimple(text);
    } else {
      specContentEl.innerHTML = `
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px;">
          <h4>大模型系统 Prompt</h4>
          <pre>${p.prompt}</pre>
        </div>
      `;
    }
  } catch (e) {
    specContentEl.innerHTML = `<pre>${p.prompt}</pre>`;
  }
});

// 关闭抽屉
function closeDrawer() {
  specDrawer.classList.remove('open');
  specBackdrop.classList.remove('open');
}
drawerCloseBtn.addEventListener('click', closeDrawer);
specBackdrop.addEventListener('click', closeDrawer);

// 简单 Markdown 渲染器
function parseMarkdownSimple(md) {
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    .replace(/\n\n/gim, '<br/><br/>');
  return html;
}

// 视口尺寸切换
document.querySelectorAll('.vp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vp-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const vp = btn.dataset.vp;
    iframeWrapper.style.width = vp;
  });
});

// 分类筛选切换
categoryPills.addEventListener('click', (e) => {
  if (e.target.classList.contains('pill')) {
    categoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    renderPresetList(presetSearch.value, e.target.dataset.cat);
  }
});

// 搜索框事件
presetSearch.addEventListener('input', (e) => {
  const activeCat = categoryPills.querySelector('.pill.active')?.dataset.cat || 'all';
  renderPresetList(e.target.value, activeCat);
});

// 初始化
renderPresetList();
selectPreset(0);
