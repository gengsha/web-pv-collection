// Web-PV2 Preset Directory Data & Hub Logic (Qwen 专题)
const PRESETS = [
  {
    id: "01-ink-myriad-questions",
    num: "01",
    name: "墨海千问·文人水墨长卷",
    enName: "Ink Myriad Questions · Literati Scroll",
    cat: "art",
    tags: ["宣纸白底", "水墨晕染", "朱砂印章", "竖排文字"],
    desc: "宣纸长卷以墨为思：竖排侧批、朱砂钤印与水墨晕染入场，千问的文人气质。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【墨海千问 · 文人水墨长卷 (Ink Myriad Questions · Literati Ink-Wash Long Scroll)】风格，为通义千问（Qwen，阿里巴巴大模型）生成一个文人气质的个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 视觉基调：亮色系水墨。宣纸白 #F5F1E6 为底，用内联 SVG feTurbulence data-URI 铺宣纸噪点（mix-blend-mode: multiply），叠加黛青 #5C7A78 / 淡墨 / 朱砂的超大径向渐变墨晕（blur 70px 缓慢漂移），并用 Canvas 绘制缓慢漂浮的淡墨颗粒与飞白笔触——背景必须分为"纸纹理 + 淡墨渐变 + 动态墨粒"三层。
2. 色彩体系：宣纸白 #F5F1E6、陈纸 #EDE6D6、松烟墨 #1A1A1A、墨灰 #55524A、淡墨 #8C877A、印章朱砂 #B03A2E（悬停加深 #96291E）、黛青 #5C7A78。
3. 字体层次：Google Fonts 引入 Noto Serif SC（400/600/900）作正文与标题，Ma Shan Zheng 书法体作 Hero 大字、印章文字与题答墨迹。
4. 核心构件：朱砂印章（圆角方块 + 白色书法字 + writing-mode: vertical-rl 竖排，如「千問」「通義」）；竖排侧批与挂轴式数据卡；细墨线分隔线；陈纸色卡片（右下角淡水印字，悬停泛朱砂）。
5. 核心板块：
   - Hero 书法大字「问千问，问道于一」+ 大印「千問」与竖排批注
   - 经史子集四部能力卡（对话 / 代码 / 视觉 / 多模态）
   - 卷末题跋：上下文长度、模态、语言等数据以竖排挂轴卡呈现
   - 问答题字交互区：用户输入一句问题，Qwen 以毛笔字风格流式逐字"题答"（前端模拟，随机抽取数条风雅回答）
   - 页脚钤印一排
6. 动效要求：区块入场如卷轴徐徐展开（clip-path 横向 mask + 文字由模糊晕染变清晰）；印章悬停"盖章下压"（scale + 阴影）；所有卡片与按钮均有悬停微交互；缓动曲线 cubic-bezier(0.22, 1, 0.36, 1)。
7. 文案气质：围绕千问 / 通义 / 博学笃问展开，古雅而不呆板，中文为主。`
  },
  {
    id: "02-violet-nexus",
    num: "02",
    name: "紫枢星穹·旗舰品牌演化",
    enName: "Violet Nexus · Qwen Flagship",
    cat: "future",
    tags: ["官方品牌紫", "极光流体", "毛玻璃", "星尘粒子"],
    desc: "Qwen 官方品牌紫的深空演化：紫极光流体、毛玻璃与星尘粒子，旗舰级气场。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【紫枢星穹 · Violet Nexus】风格，为 Qwen（通义千问）生成一个官方品牌旗舰级个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库），页脚标注 "Qwen Personal Site · Preset 02 Violet Nexus"。

设计要求：
1. 视觉底色：深空紫黑 #0A0616。背景必须严格分三层——canvas 星尘粒子层（缓慢漂移闪烁）；3 颗超大高斯模糊极光光斑（紫 #615CED、蓝 #9B8CFF、青 #00D4FF，blur 90px+，后台缓慢漂移并受光标视差牵引）；细噪点层。
2. 材质体系：高透毛玻璃卡片（rgba(24,18,46,0.6) + backdrop-filter: blur(24px)）；由伪元素 + mask 实现的 1px 品牌渐变描边（#615CED -> #9B8CFF -> #00D4FF）；发光 Pill 徽章；点缀品红 #FF6AD5；文本主色 #F4F2FF、弱色 #8B87A6。
3. 字体层次：Google Fonts 引入 Space Grotesk（500/700）做标题，JetBrains Mono（400/500/700）做数据与徽章，中文使用系统字回退；主标题关键词使用品牌渐变文字剪裁。
4. 核心板块：
   - Hero：Q 形星芒 SVG 以 stroke-dashoffset 描边入场，发光 Pill 徽章 + 标语「问未知，答未问」
   - 遥测条：上下文 1,000,000 Tokens（数字滚动）/ 模态 / 推理延迟
   - 能力矩阵：推理、代码、视觉、语音、智能体 5 张毛玻璃卡片，悬停有 spotlight 高光跟随鼠标
   - 模型族谱时间线：Qwen -> Qwen2.5 -> QwQ -> Qwen3 横向发光节点（当前世代加强辉光）
   - 对话体验舱：流光彩虹输入框（渐变光晕 + hue-rotate 循环），模拟流式逐字打字回答
5. 动效要求：滚动逐块上浮显现（IntersectionObserver），所有卡片/按钮具备悬停微交互，统一缓动 cubic-bezier(0.16, 1, 0.3, 1)，文案呈现旗舰级全能智能气场；390px / 768px 响应式。`
  },
  {
    id: "03-bamboo-sutra-terminal",
    num: "03",
    name: "竹简代码经·亿万卷典籍终端",
    enName: "Bamboo Sutra Terminal",
    cat: "cyber",
    tags: ["竹简竖列", "等宽注经", "青铜框线", "卷轴横滚"],
    desc: "古简与等宽代码同轴：典籍被终端逐字注经，竹简收卷展开、横向成河。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【竹简代码经 · 亿万卷典籍终端 (Bamboo Sutra Terminal)】风格，为大模型"通义千问 Qwen"生成一个个人主页（纯原生 HTML + CSS + JS，单页三文件，禁止任何第三方库）。

创意设定：把 Qwen 想象成一座"古今同轴"的数字化典籍库——先秦竹简与等宽代码编联在同一根轴上。读万卷，答千问。

设计要求：
1. 色彩：深檀底 (#100C08 / #1A140D)；竹黄 #C9A063 主强调、古铜 #8A6B3F 框线、玉青 #6FA287 注记、朱批 #B04A3A 印章与问句、文本 #E8DCC0、弱文本 #7A6A4F。
2. 字体：Google Fonts 引入 Noto Serif SC (600/900) 作典籍标题与竖排文字，JetBrains Mono (400/500/700) 作数据与终端流。
3. 材质构件：竖向竹简列（细长条渐变竹纹 + 顶部编绳"韦编"缝合装饰 + 穿孔绳结）、竖排文字 (writing-mode: vertical-rl)、青铜双线边框 (border: 3px double) 加角饰、三圆点标题栏终端窗口。
4. 板块结构：
   - 顶部导航 + Hero（青铜徽记、主标"读万卷，答千问"，朱批印章块点缀，遥测条）
   - 注经终端：打字机流式交替输出《道德经》片段与 token 标注；右侧《论语》"学而不思则罔"被逐字点亮标注并输出语义解析
   - 语料库统计：经、史、子、集、代码、论文、百科的卷数与 token 数，数字滚动动画 + 进度条
   - 万卷横轴：竹简逐列排开，拖拽或滚轮横移，入场"收卷展开"动画
   - 问策控制台：输入问题，模拟古雅"奏对"逐字输出 + 页脚
5. 动效：打字机数据流、光标周期闪烁、收卷展开 keyframes (transform-origin: top, scaleY 回弹)、悬停上浮泛光；过渡曲线 cubic-bezier(0.22, 1, 0.36, 1)。
6. 文案须古雅，穿插真实典籍句（《道德经》《论语》《礼记》）；保证控制台零报错，并通过 390px / 768px 基础响应式。`
  },
  {
    id: "04-lantern-thousand-nights",
    num: "04",
    name: "上元千灯·霓虹灯市",
    enName: "Lantern Festival Nights",
    cat: "art",
    tags: ["千灯升空", "暖金灯市", "灯笼轻摆", "点灯交互"],
    desc: "上元灯会的人间烟火：天灯升空、千灯答千问，暖光呼吸般的高级节庆夜景。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【上元千灯 · 霓虹灯市 (Lantern Thousand Nights)】风格，为 Qwen（通义千问）生成一个个人主页单页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

主题文案基调：上元节灯会，Qwen 是照进人间烟火的那盏光——“一灯答一问，千灯照长夜”。文案需有人间烟火气。

设计要求：
1. 视觉底色：夜青夜空 (#0B0E1F) 纵向渐深，页面底部固定多层山峦剪影 (#131A36 / #1B2447) 与一轮月光白明月 (#FFF3E0)，地平线处有灯市暖光晕染，辅以多层暖光 bokeh。
2. 核心氛围：Canvas 天灯粒子系统——暖色发光天灯 (#FFB84D / #FF8A3D / #E5484D) 自画面底部缓缓升起，带正弦摇摆与亮度闪烁，景深越远越小越暗。
3. 构件体系：纯 CSS 灯笼（椭圆径向渐变灯身 + 朱砂红上下帽 + 流苏，内透光 box-shadow 呼吸脉动，transform-origin: top 的 ±3° 悬挂摆动）；灯市摊位卡片（暖光描边、条纹雨棚、两根细线悬挂的招牌式标题）；串灯光点（错相位闪烁）。
4. 字体层次：ZCOOL QingKe HuangYou 作展示大字与招牌，Noto Sans SC 400/500/700 作正文，IBM Plex Mono 作遥测数字与徽章。
5. 核心板块：
   - Hero：一盏 CSS 大灯笼 + 主旨「一灯答一问，千灯照长夜」+ 串灯装饰
   - 灯市摊位能力区：对话摊、代码摊、丹青摊、百译摊四张卡片
   - 今夜灯况遥测：今夜已答问题数、点亮城市数、灯市暖度（数字滚动动画）+ 「今夜最暖一问」暖光卡片
   - 点灯许愿交互区：用户写下问题/心愿后，生成一盏带字天灯自屏幕底部升起，并许下灯笺
   - 页脚：Qwen Personal Site · Preset 04 Lantern Thousand Nights
6. 动效要求：灯光暖晕呼吸（box-shadow 脉动）、卡片悬停暖光增强、明月山峦轻微视差、交互按钮点灯反馈。`
  },
  {
    id: "05-openweight-forge",
    num: "05",
    name: "开源熔炉·Open Weight Forge",
    enName: "Open Weight Forge",
    cat: "cyber",
    tags: ["熔岩火花", "工业蓝图", "权重金库", "开源精神"],
    desc: "开源锻造厂把模型权重锻造成器：火花迸溅、钢印铆钉，锻造之火分享予天下。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【开源熔炉 · 开放权重锻造厂 (Open Weight Forge)】风格，为开源大模型 Qwen 生成一个个人主页（纯原生 HTML + CSS + JS，单页，禁止任何第三方 JS 库）。

设计要求：
1. 视觉底色：铁黑 #0C0C0E，铺细线蓝图网格（44px 双线 grid，rgba(255,255,255,0.035)），顶部叠一层微弱熔橙余晖径向光。
2. 色彩体系：钢面卡片 #16181C，主色熔橙 #FF6B1A 与熔岩渐变 #FF3D00→#FFB347，警戒黄 #FFC53D（45° 黄黑斜纹条作分区/按钮细节），钢蓝灰 #3E4450 作铆钉与描边，文本 #F2EFEA / 弱 #8B8E98。
3. 字体：Google Fonts 引入 Chakra Petch（500/700，标题与英文大写）+ JetBrains Mono（400/700，代码/钢印/数据）+ Noto Sans SC（正文）。
4. 材质构件：权重板条箱卡片（钢面渐变基底、四角铆钉 radial-gradient 角饰、钢印式大写标签、悬停时金属斜向高光自左向右扫掠）；熔炉热度条（熔岩渐变进度 + 热浪抖动动画）；仓库印章（APACHE-2.0 / OPEN WEIGHTS 虚线印章）。
5. 核心板块：
   - 顶部导航 + Hero（口号「开源为炉，锻器予天下」+ 熔炉 SVG 徽标 + 两个按钮 + 关键遥测条）
   - 权重金库网格（模型仓库卡片：Qwen3-235B-A22B、Qwen3-32B、Qwen2.5-Coder-32B、QwQ-32B、Qwen2.5-VL-72B 等，每张标注参数量、许可证、下载数与热度条）
   - 一键取件终端（模拟 huggingface-cli / modelscope / git lfs 拉取命令的终端块，每行带复制按钮）
   - 开源影响力数据（衍生模型数、下载总量、社区 Star，滚动 count-up 动画）+ 页脚
6. 动效要求：全屏 canvas 火花粒子系统（炉口迸溅橙黄火星，重力下落淡出，悬停卡片迸出火花簇）；区块入场如锻锤落下般短促有力的位移回弹；数据滚动计数。页脚文字：Qwen Personal Site · Preset 05 Open Weight Forge。`
  },
  {
    id: "06-thought-constellation",
    num: "06",
    name: "思纬星图·推理星座",
    enName: "Thought Constellation",
    cat: "future",
    tags: ["推理星座", "Canvas星图", "逐颗点亮", "顿悟金"],
    desc: "深度推理的每一步皆为一颗星：Canvas 星座逐颗点亮连线，顿悟时刻金色爆亮。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【思纬星图 · 推理星座 (Thought Constellation)】风格，为 Qwen（通义千问）生成一个「深度推理」主题的个人官网（纯原生 HTML + CSS + JS，单页，禁止任何第三方 JS 库）。

核心意象：思维的每一步都是一颗星，推理链连成星座。页面是一座深空观测站，冷静、精密、带一点诗意的科学感。

设计要求：
1. 色彩：深空藏蓝底 #050816，面板 #0A101F；星点青白 #CFF6FF，推理连线青 #38BDF8 / #4FD1C5，「顿悟」金 #F5C86E（只用于最终节点与结论），文本 #E6EDF3 / 弱化 #6B7A90。禁止紫粉极光色。
2. 全屏背景 Canvas：约百颗星点正弦闪烁，偶发流星划出渐隐尾迹，鼠标靠近的星点被点亮放大。
3. 字体：Google Fonts 引入 Outfit（300~700）做标题正文，JetBrains Mono（400/500）做坐标、状态、日志。
4. 材质构件：玻璃观测面板卡片（暗色半透 + backdrop-filter blur + 1px 冷光边）；赤经/赤纬式坐标小标签（如 RA 05h34m / DEC +22°00′）；十字准星与细刻度线装饰；缓慢自转的虚线目镜圆环。
5. 页面结构：顶部导航 → Hero（主标语「思有纬，星有痕」+ 推演启动按钮）→ 实时推理星图（面板内 Canvas + 侧栏思维碎片：演示一道数学题被逐步拆解「审题→设元→列式→验算→作答」，点击推演后节点逐颗点亮、连线逐段生长、最终金色顿悟爆亮，文本随节点逐条浮现）→ 星等基准榜（MATH / GPQA / AIME 成绩做成带辉光的星等亮度条）→ 交互拆解台（输入任意问题，模拟输出逐步推理星链日志）→ 页脚。
6. 动效基准：星点闪烁、连线生长、顿悟爆亮三阶段必须细腻；文本与节点严格联动；统一缓动曲线 cubic-bezier(0.22, 1, 0.36, 1)；支持 390px / 768px 响应式。`
  },
  {
    id: "07-longriver-tokens",
    num: "07",
    name: "亿万词长河·百万词元长河",
    enName: "Long River of Tokens",
    cat: "art",
    tags: ["字符长河", "时代卷轴", "大海捞针", "百万上下文"],
    desc: "百万级上下文化作长河：字符如波光流动，时代长卷横展，可于词海中大海捞针。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【亿万词长河 · Long River of Tokens】风格，为 Qwen（通义千问）生成一个展示百万词元超长上下文的个人主页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 视觉底色：深墨 #060A0C 到河面青 #0E2A2E 的纵向渐变；全屏 Canvas 绘制"文字长河"：数十个汉字（先秦诗词、江河名句）与英文词元（token / attention / context…）分远中近三层横向漂移，带正弦上下浮动与透明度明灭模拟波光，并叠加一层快速横移的高光细线表现水面粼光。
2. 色彩体系：文字波光 #E8DFC8、高亮青 #7FD8D0、金砂 #D9B36C；正文 #DFE8E6、弱文本 #64797A；板块之间使用 1px 金色渐变细分隔线；卡片为深青毛玻璃（backdrop-filter: blur(18px)，青灰细边框）。
3. 字体层次：标题 Noto Serif SC 900（宋体刀锋感），正文 400/600，数据与日志用 JetBrains Mono 400/500。
4. 核心板块：
   - Hero："亿万字为河，一眼见底" + 1,000,000 Tokens 巨字（入场计数动画）与源流遥测条
   - 时代长卷：先秦→汉唐→宋元→明清→工业时代→信息时代→深空时代的横向滚动卡片列（每帧一个时代 + 代表典籍），支持拖拽与滚轮横移，中心帧轻微放大
   - 大海捞针演示台：输入关键词（如"烛之武"）后，长河中对应字符被光柱扫描并点亮，弹出"在 xxx,xxx 词元处找到"提示，伴随涟漪
   - 河况数据：整河词元 / 一次可读页数 / 等效朗读时长三张数据卡
5. 动效要求：河水以 requestAnimationFrame 恒久流动；点击页面任意处泛起椭圆水面涟漪；所有过渡使用 cubic-bezier(0.22, 1, 0.36, 1)；页脚署名 "Qwen Personal Site · Preset 07 Long River of Tokens"。`
  },
  {
    id: "08-prism-modalis",
    num: "08",
    name: "通义棱镜·多模态分光",
    enName: "Prism Modalis",
    cat: "future",
    tags: ["白光分光", "亮色极简", "全息虹彩", "发丝线工艺"],
    desc: "一束白光穿棱镜分出七彩模态：亮色极简、发丝线工艺与全息虹彩点缀。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【通义棱镜 · 多模态分光 (Prism Modalis)】风格，为阿里巴巴大模型 Qwen（通义千问）生成一个个人官网首页（纯原生 HTML + CSS + JS，单页、无第三方库）。

设计要求：
1. 视觉基调：亮色极简派。画布近纯白 #FAFBFF，卡片纯白 #FFFFFF，墨字 #10121A / 弱字 #5B6172，全部边框为 1px 发丝线 #E3E7F0；大面积留白、12 栏几何网格底纹；投影必须是极淡的彩色折射影（如 0 24px 60px -20px rgba(123,92,255,.25)），禁止纯黑投影。
2. 光谱体系：六色光谱渐变 #FF5E5B → #FFB400 → #3DDC97 → #3DA5FF → #7B5CFF → #FF6AD5（柔和饱和度）；全息点缀使用柔和马卡龙 conic-gradient 锡纸（配白字与白色内高光）。
3. 字体层次：Google Fonts 引入 Syne（600/700/800，标题）+ Inter（400/500/600，正文）+ JetBrains Mono（400，小标签与数据注记）。
4. 核心构件——Hero 棱镜分光：一个三角棱镜 SVG，一束白光自左侧入射（虚线光子流动动画），出射端散出 6 条渐变光谱带，谱带绕出射点做缓慢角度/透明度呼吸；主标题「通义，一束光的全部颜色」使用光谱渐变剪裁文字。
5. 页面板块：
   - 顶部导航（悬停出现光谱渐变下划线扫过）
   - Hero 主视区 + 棱镜分光动画
   - 光谱能力区：文本=红、视觉=橙、音频=绿、视频=蓝、代码=紫，每条谱带一行卡片，悬停/点击展开说明
   - 统一 Tokenizer 可视化：一条混合输入被切成彩色 token 序列的演示条（45ms 阶梯入场 + 扫描线）
   - 分光台交互：输入任意一段话，前端模拟把中文/字母/数字/拟声词/颜色词折射成不同光谱色块流
   - 页脚（含一条细光谱分隔线）
6. 动效要求：卡片悬停做 3D 微倾斜（rotateX≤5°、rotateY≤6°）并让全息背景 background-position 随鼠标偏移；全站缓动 cubic-bezier(0.16,1,0.3,1)；动效幅度克制、精致、干净。`
  },
  {
    id: "09-luban-kite-workshop",
    num: "09",
    name: "鲁班机鸢·Agent 工坊",
    enName: "Luban Automata Workshop",
    cat: "art",
    tags: ["榫卯机关", "黄铜齿轮", "木鸢巡游", "装配台"],
    desc: "鲁班木鸢的 Agent 工坊：齿轮随滚动联动，榫卯卡咬合，木鸢沿虚线航迹巡游。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

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
6. 动效要求：齿轮滚动联动与木鸢巡游为灵魂动画必须流畅；所有交互有黄铜辉光反馈；页脚文字「Qwen Personal Site · Preset 09 Luban Kite Workshop」。`
  },
  {
    id: "10-cyber-dunhuang",
    num: "10",
    name: "赛博敦煌·飞天全息",
    enName: "Cyber Dunhuang Hologram",
    cat: "art",
    tags: ["矿物壁画", "飞天飘带", "金箔流光", "全息修复"],
    desc: "敦煌矿物色遇上全息：飞天飘带流动、金箔流光、壁画在扫描线中全息修复。",
    prompt: `【使用说明】下文以 Qwen（通义千问） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【赛博敦煌 · 飞天全息 (Cyber Dunhuang & Apsara Hologram)】风格，为 Qwen（通义千问）生成一个个人官网单页（纯原生 HTML + CSS + JS，禁止任何第三方 JS 库）。

设计要求：
1. 色彩体系：岩壁暗底 #1A1410 / 窟壁 #241B14；敦煌矿物五色——石青 #2A6F97、石绿 #3E8E7E、土红 #C1543C、赭黄 #D9A441、金箔 #E8C87A；文本 #F3E9D2、弱文本 #9C8A70。矿物色要纯正克制，金色只作细线、描边与流光，严禁大面积铺金。
2. 字体层次：Google Fonts 引入 Noto Serif SC（600/900，标题与正文）、Ma Shan Zheng（飞天题记与壁画大字）、Cormorant Garamond 斜体（拉丁标签与注脚）。
3. 材质构件：
   - 全页壁画肌理：内联 SVG feTurbulence 金粉噪点 + 细裂纹 repeating-linear-gradient；
   - Hero 背光光环：多层同心圆（径向金晕内核 + 虚线旋转环 + repeating-conic-gradient 刻度光环 mask 成环），80s 级极慢旋转；
   - 全息飘带：全屏 Canvas 用 lighter 混合模式绘制 3 条平滑贝塞尔色带（石青/石绿/金），双正弦波驱动，外晕+带身+中央高光线三层，光标阻尼牵引；同时渲染缓缓上升、明暗闪烁的金粉粒子；
   - 壁画卡片「全息修复」：默认低饱和+剥落噪点，悬停时饱和度/亮度提升、噪点淡出、一道金白扫描线自上而下掠过。
4. 页面板块：
   - 顶部导航（Qwen 印章式 SVG 徽标 + 石窟金线分隔）；
   - Hero：背光环居中，主标语「千年一瞬，万象全息」，金色流光渐变字，题记式小字（手写体）+ 竖排铭文；
   - 壁画殿 · 四壁能力廊：九色鹿=视觉理解、飞天=生成创作、琵琶=语音交互、狮舞=智能体编排，四张修复卡，各配壁龛标签与手写大字；
   - 修复台交互：输入残卷意象 → 模拟「全息重现」输出（扫描线掠过 + 打字机逐字显影 + 状态语仪式文案）；
   - 传承遥测：窟数、壁画面积、彩塑数量滚动计数 + 数字化进度条点亮；
   - 页脚：Qwen Personal Site · Preset 10 Cyber Dunhuang。
5. 动效要求：区块入场使用 clip-path 双开遮罩，如窟门缓缓开启；主按钮悬停有金箔流光扫过；所有缓动使用 cubic-bezier(0.22, 1, 0.36, 1)；必须支持 prefers-reduced-motion 降级；390px / 768px 响应式。`
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
  const escaped = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  let html = escaped
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/```[\w]*\n([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
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

// 键盘上下方向键切换预设
document.addEventListener('keydown', (e) => {
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || specDrawer.classList.contains('open')) return;
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectPreset((currentPresetIndex + 1) % PRESETS.length);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectPreset((currentPresetIndex - 1 + PRESETS.length) % PRESETS.length);
  }
});

// 初始化
renderPresetList();
selectPreset(0);
