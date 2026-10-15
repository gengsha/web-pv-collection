// Web-PV4 Preset Directory Data & Hub Logic — 主题：hy4 个人网站
const PRESETS = [
  {
    id: "01-liquid-chrome",
    num: "01",
    name: "液态铬·流体镜面",
    enName: "Liquid Chrome & Fluid Reflection",
    cat: "future",
    tags: ["液态金属", "Y2K铬感", "镜面高光", "流体渐变"],
    desc: "熔融铬金属质感与 Y2K 镜面反射，高光随光标在液态表面上流动游走。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【液态铬·流体镜面 (Liquid Chrome)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：石墨黑底 #0B0B0F，铬银渐变（#FFFFFF → #C7CCDB → #6E7688 → #2A2E3A），色散边使用电蓝 #6E8BFF 与品红 #FF5CF0，文字 #F2F4F8 / #8B93A7。
2. 材质构件：液态金属文字（conic-gradient + background-clip:text + 背景位移动画）、镜面高光扫掠（::after 斜向白色渐变条 sweep）、金属拉丝边框（linear-gradient border-image）、液态 Blob 背景（filter: blur(60px) 的银蓝/品红光球）。
3. 字体排版：Space Grotesk 或 Archivo 800 超粗标题（字间距 -0.04em），正文 Inter，数据与标签 JetBrains Mono。
4. 交互与动效：光标移动驱动 --mx/--my 变量，让卡片表面高光反射斑实时跟随；按钮 hover 触发液态填充（从底部涌起的金属渐变）；过渡曲线 cubic-bezier(0.16,1,0.3,1)。
5. 内容板块：hy4 品牌 Hero（混合推理模型人设）、能力矩阵四卡（混合推理内核 / 全栈代码工程 / 256K 长上下文 / 并行工具调用）、Instant↔Deep 混合推理切换演示面板、对话终端、指标遥测条、页脚。`
  },
  {
    id: "02-neo-brutalist",
    num: "02",
    name: "新粗野主义·混凝土硬边",
    enName: "Neo-Brutalist Concrete Edge",
    cat: "brutal",
    tags: ["硬阴影", "3px黑框", "原色撞色", "跑马灯"],
    desc: "混凝土底色与 3px 纯黑硬边，硬阴影塌陷式按钮与高饱和原色区块对撞。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【新粗野主义·混凝土硬边 (Neo-Brutalism)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：混凝土米白 #EFECE3 底，纯黑 #0A0A0A 线条与文字，电光黄 #FFE600、信号红 #FF4D2E、钴蓝 #2B44FF 作为原色撞块。
2. 材质构件：3px solid #0A0A0A 描边，硬阴影 box-shadow: 6px 6px 0 #0A0A0A（无模糊、无圆角或 4px 微圆角），胶带贴纸（旋转 -2deg 的黄底黑字条），大写极粗标题，网格背景（1px 淡黑网格线）。
3. 字体排版：Archivo Black / Space Grotesk 900 超大标题（clamp(2.5rem, 7vw, 5rem)），正文 Work Sans 500，标签 JetBrains Mono 大写加粗。
4. 交互与动效：按钮 :active 时 translate(6px,6px) 且阴影塌陷为 0（真实按压感）；卡片 hover 轻微 rotate(-1.2deg)；顶部无限跑马灯（marquee）滚动标语；滚动进入视口元素做粗犷位移淡入。
5. 内容板块：hy4 品牌 Hero、能力矩阵硬边卡片、Instant/Deep 推理模式切换（用两个巨大方形切换按钮表现）、Benchmark 数据块、对话终端、页脚。`
  },
  {
    id: "03-risograph-paper",
    num: "03",
    name: "丝网印·纸品编辑",
    enName: "Risograph Print Studio",
    cat: "print",
    tags: ["双色叠印", "半调网点", "纸纹噪点", "套印错位"],
    desc: "Riso 双色套印与半调网点，纸纤维噪点与刻意错位的色层叠印质感。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【丝网印·纸品编辑 (Risograph Print)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：纸本米白 #F2EDE3 底，墨黑 #1A1815，Riso 荧光橘红 #FF5A36、Riso 亮蓝 #2E5BFF、叶绿 #00A95C 作为双色套印主色。
2. 材质构件：全局纸纹（SVG feTurbulence 生成的噪点 data-uri 叠加，opacity 0.35，mix-blend-mode: multiply）；半调网点（radial-gradient 点阵 background-size 6px）；套印错位（同一元素两层颜色用 mix-blend-mode: multiply 并偏移 2~4px）；无模糊阴影，仅用实色偏移。
3. 字体排版：Fraunces 或 DM Serif Display 做超大衬线标题，Work Sans 正文，JetBrains Mono 做页边批注与页码。
4. 交互与动效：卡片 hover 时两层色板错位距离加大（misregistration 0.4s 弹性）；点击按钮触发油墨扩散（圆圈 scale 放大 + 透明度递减）；滚动时标题做轻微 skew 摆动。
5. 内容板块：hy4 作为「本期特刊主角」的杂志式 Hero（含期号、栏目名）、能力矩阵（印刷色块卡片）、混合推理对开页说明、读者来信式对话终端、版权页脚。`
  },
  {
    id: "04-vaporwave-dusk",
    num: "04",
    name: "蒸汽波黄昏·VHS 回潮",
    enName: "Vaporwave Dusk & VHS Grid",
    cat: "retro",
    tags: ["落日网格", "VHS噪点", "色差抖动", "80s复兴"],
    desc: "落日圆盘与无限透视网格，VHS 扫描线、色差抖动与棕榈剪影的黄昏回潮。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【蒸汽波黄昏·VHS 回潮 (Vaporwave)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：夜空渐变 #1A0B2E → #3B1178 → #B14AED，落日盘 #FF6B9D → #FFB347，霓虹青 #22D3EE，网格亮粉 #FF3CAC，文字 #FDE9FF / #A88FD0。
2. 材质构件：巨型落日圆盘（渐变圆 + repeating-linear-gradient 横向切条遮罩）；无限透视网格地面（perspective + rotateX + background-position 滚动动画）；VHS 扫描线与噪点叠加层；大理石柱与棕榈剪影 SVG。
3. 字体排版：Monoton 或 Rubik Glitch 做霓虹 logo 大标题（带 RGB 色差 text-shadow），正文 Outfit，数据 JetBrains Mono。
4. 交互与动效：标题 glitch 抖动（clip-path 分段 + 左右偏移，周期性 0.2s 触发）；霓虹呼吸辉光；按钮 hover 出现色差重影；鼠标移动带来轻微视差位移。
5. 内容板块：hy4 霓虹招牌 Hero、能力矩阵（霓虹描边卡片）、混合推理「VHS 磁带双轨」切换器、对话终端（录像带 OSB 样式）、版权页脚。`
  },
  {
    id: "05-solarpunk-botany",
    num: "05",
    name: "太阳能乌托邦·有机温室",
    enName: "Solarpunk Botanical Greenhouse",
    cat: "organic",
    tags: ["植物剪影", "晨光奶油", "有机Blob", "光合作用呼吸"],
    desc: "晨光奶油底与植物叶脉剪影，有机圆润构件随呼吸律动与光斑缓慢漂移。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【太阳能乌托邦·有机温室 (Solarpunk Botany)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：晨光奶油 #FFF8EC 底，苔绿 #2F6B3F、叶绿 #6FBF4A、太阳能琥珀 #FFB627、陶土 #D9705A、墨绿文字 #1E3A2B。
2. 材质构件：有机不规则 Blob 形状（border-radius: 60% 40% 55% 45% / 50% 60% 40% 50% 并做 morph 动画）、奶油磨砂玻璃卡片（backdrop-filter: blur(18px) + 米白半透）、SVG 叶脉与藤蔓剪影装饰、柔和光斑（radial-gradient，blur 大）。
3. 字体排版：Fraunces 做温暖衬线标题，Work Sans 正文，JetBrains Mono 做标本编号标签（如 SPECIMEN No.04）。
4. 交互与动效：叶片随光标方向轻柔摆动（transform-origin: bottom + skew/rotate，弹簧回弹）；卡片 6 秒周期的「光合作用」呼吸光晕；背景光斑缓慢漂移；进度条以藤蔓生长方式填充。
5. 内容板块：hy4 温室 Hero（把模型比作可持续生长的智能生态）、能力矩阵（四株「植物标本卡」）、混合推理（光合作用/呼吸作用双模式切换）、对话终端（园艺笔记风格）、页脚。`
  },
  {
    id: "06-swiss-editorial",
    num: "06",
    name: "瑞士编辑·国际主义网格",
    enName: "Swiss Editorial Grid",
    cat: "print",
    tags: ["12列网格", "瑞士红", "极端理性", "编号系统"],
    desc: "12 列可见网格与瑞士红点缀，绝对左对齐的极端理性排版与编号索引系统。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【瑞士编辑·国际主义网格 (Swiss Editorial)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：纯白 #FFFFFF 底，排版黑 #0A0A0A，瑞士红 #E30613，中性灰 #8A8A8A，浅灰分隔线 #E4E4E4。
2. 构图系统：严格的 12 列 CSS Grid（gap 24px），可切换显示的对齐辅助线（1px 红色虚线列），所有元素左对齐、拒绝居中；章节以编号 01/02/03 与大字号年份标注。
3. 字体排版：Inter Tight 或 Helvetica 系 900 黑体超大标题（字间距 -0.045em，行高 0.92），正文 Inter 400/500，元数据用等宽小字；大量使用规则细线与留白分区。
4. 交互与动效：链接 hover 时红色下划线由左向右扫出；卡片 hover 时整块反白（黑底白字）；滚动时章节编号做数字滚动；网格辅助线开关按钮。
5. 内容板块：hy4 海报式 Hero（巨大标题左对齐出血）、能力矩阵（跨列错落排布）、混合推理双栏对照表、Benchmark 数据表格、页脚（含版本与网格说明）。`
  },
  {
    id: "07-dark-academia",
    num: "07",
    name: "暗夜学院·手稿档案馆",
    enName: "Dark Academia Archive",
    cat: "print",
    tags: ["羊皮纸", "索引卡片", "衬线古籍", "蜡封金箔"],
    desc: "深夜图书馆的羊皮纸与索引卡档案，衬线古籍排版与烛光呼吸的暖调档案室。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【暗夜学院·手稿档案馆 (Dark Academia)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：深夜墨蓝 #10131A / 皮革棕 #2A1E14 底，羊皮纸 #E8DCC4，褪色金 #C9A227，墨黑 #1A1611，蜡封暗红 #7A2E2E。
2. 材质构件：纸张纤维纹理（噪点 + 微微泛黄渐变）、图书馆索引卡片目录匣（卡片带顶部标签条与打孔圆点）、烫金细线边框（linear-gradient 金色描边）、书本装订线与页边批注、蜡封徽章（圆形径向渐变 + 内阴影）。
3. 字体排版：Cormorant Garamond / EB Garamond 做古典衬线大标题（含首字母下沉 Drop Cap），正文 Spectral，编号与索书号 JetBrains Mono。
4. 交互与动效：烛光光晕 5 秒周期柔和呼吸；卡片 hover 时从档案匣中向上抽出（translateY(-8px) + 阴影加深）；文字选中态为羊皮纸高亮；滚动做缓慢的暖光跟随。
5. 内容板块：hy4 作为「第 hy4 号馆藏手稿」的档案 Hero、能力矩阵（四张索引卡片）、混合推理（手稿正文与页边批注双栏）、借书卡式对话终端、馆藏页脚。`
  },
  {
    id: "08-isometric-blueprint",
    num: "08",
    name: "等轴测线框·工程蓝图",
    enName: "Isometric Blueprint Drafting",
    cat: "brutal",
    tags: ["等轴测", "工程标注", "全等宽", "描线生长"],
    desc: "深蓝图纸上的等轴测线框与工程尺寸标注，蓝图扫描光与描线生长动画。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【等轴测线框·工程蓝图 (Isometric Blueprint)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：蓝图深蓝 #071B33 底（可叠 #0B2545 渐变），图纸白线 #A8D0E6，高亮青 #4FC3F7，标注黄 #FFD166，修订红 #FF6B6B，文字 #D6E8F5 / #6E93B0。
2. 材质构件：工程坐标网格纸（双层 repeating-linear-gradient，细线 1px + 粗线每 5 格）；纯 SVG 等轴测线框（30° 斜角立方体 / 服务器机架 / 管道），stroke-dasharray 描线生长动画；尺寸标注（两端箭头 + 连线 + 数值）；右下角工程图标题栏（Title Block：项目名、比例、图号、日期）。
3. 字体排版：全站 IBM Plex Mono 等宽（标题可 IBM Plex Sans 600），全大写字母 + 字间距 0.08em，技术编号体系（如 DWG-04 / REV.B）。
4. 交互与动效：页面载入时 SVG 线框按 stroke-dashoffset 逐段绘制；一条青色扫描线自上而下循环扫过整张图纸；鼠标拖拽可微调等轴测机架角度；hover 构件时高亮并弹出标注气泡。
5. 内容板块：hy4 系统架构总装图 Hero、能力矩阵（四组等轴测构件说明）、混合推理（双路信号流线图）、技术规格参数表、图框页脚。`
  },
  {
    id: "09-neon-rain-alley",
    num: "09",
    name: "霓虹雨夜·湿巷反射",
    enName: "Neon Rain Alley Reflection",
    cat: "future",
    tags: ["霓虹发光", "雨丝斜线", "水面倒影", "闪烁招牌"],
    desc: "湿沥青上的霓虹倒影与斜落雨丝，多层光晕招牌与偶发闪烁的暗巷赛博夜景。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【霓虹雨夜·湿巷反射 (Neon Rain Alley)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：湿沥青黑 #07080D 底，霓虹品红 #FF2E88、电蓝 #00E5FF、紫外 #7B2CFF、钠灯橙 #FFA41B，文字 #F1F5F9 / #7C8AA0。
2. 材质构件：霓虹发光文字（4~6 层 text-shadow 由内白到外色，配合 box-shadow 光溢出）；玻璃卡片（低透明度深色 + backdrop-filter: blur(16px) + 1px 内发光边）；地面水反射（元素副本 scaleY(-1) + blur(6px) + mask 线性渐隐 + 竖向波纹位移）；雨丝（repeating-linear-gradient 斜线 animation 下落）；远处雾化光污染层。
3. 字体排版：Outfit 700/800 做招牌级大标题，正文 Inter，数据 JetBrains Mono；可有一处竖排霓虹小招牌。
4. 交互与动效：招牌霓虹不规则闪烁（opacity/text-shadow 阶梯 keyframes + 偶发 delay）；雨滴打在地面生成涟漪（点击处扩散圆环）；鼠标移动使水面倒影轻微横向偏移；hover 卡片时霓虹边框点亮并伴随电流抖动。
5. 内容板块：hy4 霓虹招牌 Hero、能力矩阵（四块发光招牌卡）、混合推理（霓虹双档开关：INSTANT / DEEP THINK）、对话终端（巷口对讲机风格）、页脚。`
  },
  {
    id: "10-clay-soft-pop",
    num: "10",
    name: "软陶拟物·粉彩立体",
    enName: "Claymorphism Soft Pop",
    cat: "organic",
    tags: ["粘土拟物", "粉彩", "弹性物理", "大圆角"],
    desc: "粉彩粘土构件与双层内阴影的软糯立体感，弹性按压与柔和光晕的可爱拟物。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【软陶拟物·粉彩立体 (Claymorphism)】风格为 hy4 生成个人官网代码（原生 HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：薰衣草灰 #EDE9FE 底，陶土粉 #FFB4A2、薄荷绿 #A0E7C8、天青蓝 #A7D8F0、奶油黄 #FFE7A3，深紫文字 #3B3355。
2. 材质构件：粘土拟物（border-radius: 36~56px；双层 inset 内阴影：inset -8px -8px 16px rgba(0,0,0,.12) + inset 8px 8px 16px rgba(255,255,255,.85)，外加 20px 30px 的柔和彩色外阴影）；零边框、零描边，完全依靠光影塑形；柔和的彩色 Blob 光斑背景。
3. 字体排版：Fredoka 或 Baloo 2 700 圆润标题，正文 Quicksand 600，标签 Nunito 等宽替代（可用 JetBrains Mono 圆角化呈现）。
4. 交互与动效：按钮 :active 下沉 squish（scale(0.96) + 内阴影反转），回弹使用 cubic-bezier(0.34,1.56,0.64,1)；卡片 hover 上浮 -8px 且外阴影扩大；跟随光标的柔和光晕 blob（blur 40px，阻尼跟随）。
5. 内容板块：hy4 圆润 Hero（把模型做成一颗软陶吉祥物）、能力矩阵（四块彩色粘土卡）、混合推理（软陶拨杆开关 SOFT / DEEP）、对话终端（气泡全部大圆角）、页脚。`
  },
  {
    id: "11-raymarch-sdf",
    num: "11",
    name: "光线步进·SDF 雕塑",
    enName: "SDF Raymarching",
    cat: "shader",
    tags: ["WebGL", "光线步进", "SDF", "零三角形"],
    desc: "整页没有一根三角形：每颗像素沿视线试探距离场，步进预算 64↔192 实时切换。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【SDF 光线步进】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏 canvas 置于底层（position:fixed），用单个全屏三角形 [-1,-1,3,-1,-1,3] 驱动片元着色器；DPR 上限 1.5。
2. 片元着色器实现：smin 形体融合（k=0.32~0.55）、球体/圆角盒/环面/八面体 SDF、常量上界 192 的步进循环（用 uniform u_steps 动态 break）、中心差分法线（ε=0.0016）、菲涅尔边缘光、镜面高光、距离衰减、色调映射 col/(1+col*0.55)。
3. 交互：鼠标拖拽旋转（累加进 u_rot）、滚轮推拉相机（u_cam 2.2~6.0）、INSTANT(64 步)↔DEEP(192 步) 切换时步数与配色用插值过渡。
4. UI：全站 JetBrains Mono + Space Grotesk 700 标题；顶部 sticky HUD 条显示 STEPS / FPS / SDF CALLS / GPU 型号；毛玻璃卡片（backdrop-filter: blur(16px)）悬浮在画布之上。
5. 配色：深空 #05060A 底，冰蓝 #8FD4FF、青 #34E5FF、品红 #FF5CF0、紫 #9B7CFF。内容板块：Hero、能力矩阵四卡、步进预算控制台、着色器终端、评测、页脚。`
  },
  {
    id: "12-gpu-particles",
    num: "12",
    name: "六万粒子·流场引擎",
    enName: "GPU Particle Field",
    cat: "shader",
    tags: ["gl.POINTS", "curl noise", "叠加混合", "TypedArray"],
    desc: "60,000 颗点共享同一条 curl 流场，叠加混合让高密度区自然过曝成流丝。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【GPU 粒子流场】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏 canvas 置底（position:fixed），WebGL1 上下文（alpha:false, depth:false, preserveDrawingBuffer:true），DPR 上限 1.5。
2. 粒子池用 Float32Array：interleaved 位置（DYNAMIC_DRAW，每帧 bufferSubData）、interleaved 速度、生命值、静态颜色缓冲。INSTANT 20,000 点 / DEEP 60,000 点。
3. 流场：curl 噪声近似 ang = sin(x*2.6 + t*0.35) * cos(y*2.6 - t*0.28) * 2π，加速度 0.0008；阻尼 0.985；光标 0.10 半径内加切向涡旋力，左键吸引、右键排斥。
4. 绘制：两套程序 —— quad 程序用 SRC_ALPHA/ONE_MINUS_SRC_ALPHA 刷半透明黑做拖尾（alpha .10/.055），point 程序用 SRC_ALPHA/ONE 叠加混合绘制 gl.POINTS。
5. UI：JetBrains Mono + Space Grotesk 700；sticky HUD 显示 PARTICLES/FPS；毛玻璃卡（blur 16px）浮于粒子之上；配色 #06050E 底 + 青 #3EF0FF / 品红 #FF3EA5 / 紫 #8B5CFF。内容板块：Hero、能力矩阵四卡、流场控制面板（规模切换 + 三滑块）、终端、评测、页脚。`
  },
  {
    id: "13-reaction-diffusion",
    num: "13",
    name: "反应扩散·Gray-Scott 培养皿",
    enName: "Reaction-Diffusion Culture",
    cat: "sim",
    tags: ["GPGPU", "ping-pong FBO", "拉普拉斯", "形态发生"],
    desc: "两个偏微分方程在 GPU 上自我组织，每帧 4~20 次拉普拉斯卷积，花纹是长出来的。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Gray-Scott 反应扩散】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 两张 256² 浮点纹理做 ping-pong（OES_texture_float → half_float → UNSIGNED_BYTE 三级降级，checkFramebufferStatus 校验），NEAREST 过滤，CLAMP_TO_EDGE。
2. 模拟着色器：9 点拉普拉斯 stencil（正交 0.2、对角 0.05，权重和 1.0），Gray-Scott 更新 Da=1.0/Db=0.5/dt=1.0，u_brush 半径内把 (a,b) 覆写为 (0.35,1.0) 实现接种。
3. 显示着色器：手写双线性插值上采样，smoothstep(0.06,0.40,b) 映射到 深绿→青绿→奶白 三段色阶，叠加 pow(v,3) 与 pow(v,9) 高光，再做径向暗角。
4. 参数：MITOSIS f=0.0367/k=0.0649（4 次迭代），CORAL f=0.0545/k=0.0620（20 次迭代），切换时 f/k 用插值过渡；拖动鼠标接种。
5. UI：Sora 700/800 标题 + IBM Plex Mono 正文，Hero kicker 直接写控制方程；sticky HUD 显示 FEED/KILL/ITER/FPS；毛玻璃卡浮于培养皿之上；配色 #04140F 底 + 青绿 #2FE0A8 / 薄荷 #9DFBD8 / 孢子黄 #D6FF5C。`
  },
  {
    id: "14-ascii-engine",
    num: "14",
    name: "实时字符化·ASCII 渲染管线",
    enName: "ASCII Render Pipeline",
    cat: "lab",
    tags: ["软件光栅", "z-buffer", "字符灰阶", "Canvas2D"],
    desc: "点云旋转 → 正交投影 → z-buffer → 朗伯着色 → 亮度量化，最后的像素是字符。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【ASCII 实时字符渲染】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，不用任何库）。
技术要求：
1. Canvas2D 软件渲染管线：Float32Array 亮度缓冲 + z-buffer（每帧 fill 复用），点云绕 Y/X 轴旋转矩阵，正交投影到 cols×rows 网格，z-buffer 取最近点消隐。
2. 着色：朗伯漫反射 max(0, N·L) + 边缘光 pow(1-|nz|, 3)*0.55，光源方向由鼠标位置实时计算（azimuth 0~2π，elevation 0.35~1.25）。
3. 字符映射：RAMP = ' .:-=+*#%@'，亮度量化后取整；逐行 fillText 整行字符串（textBaseline='top'），每行用 hsl(188 + t*62, 92%, 52 + sin(t*π)*22) 着色形成上下渐变；字号 fontPx = cellW / 0.6。
4. 双模式：INSTANT = Fibonacci 球 4,000 点 / 96 列；DEEP = 环面 200×60 = 12,000 点 / 200 列 + 边缘光；网格列数可滑块调节（60~260）。
5. UI：Chakra Petch 标题 + JetBrains Mono 正文，40px 网格背景，sticky HUD 显示 GRID/SAMPLES/FPS，毛玻璃卡浮于黑色之上；配色 #05060A 底 + 青 #5AD9FF / 蓝 #6F8CFF / 柠檬 #B8FF5C。`
  },
  {
    id: "15-terrain-flight",
    num: "15",
    name: "无限地形·噪声穿行",
    enName: "Infinite Terrain / Voxel Space",
    cat: "sim",
    tags: ["fBm 噪声", "Voxel Space", "画家算法", "等高线"],
    desc: "不存高度图只存一条噪声公式：四倍频 fBm 实时求值，相机永远向前飞。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Voxel Space 无限地形】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 高程场：value noise（smoothstep 插值 + 四点哈希）+ 四倍频 fBm（频率 ×2、振幅 ×0.5 递归 4 次），再做 Math.pow(h, 1.7) 山脊化，实时求值不缓存。
2. 渲染：Voxel Space 逐行投影 —— 从最远行向最近行循环，每行 samples 个采样点，scale = focal / zz，与上一行顶点闭合成多边形后填充（画家算法），再 stroke 一次脊线形成等高线。
3. 雾与配色：fog = 1 - i/rows 驱动 alpha 与颜色向背景收敛；颜色由行平均高度 hn 决定 rgb(7+60hn, 26+150hn, 52+150hn)。
4. 相机：camY 向 height(camX, camZ+6)+1.35 做 0.04 阻尼跟随；鼠标横向位置作为航向偏移；滚轮调速。双模式 CRUISE 80行/40样本/速度1.4，SURVEY 130行/72样本/速度0.6。
5. UI：Archivo 800 标题 + JetBrains Mono 正文，视口带坐标网格遮罩与高程图例，sticky HUD 显示 ROWS/SAMPLES/ALT/SPEED/FPS；配色 #030A18 底 + 青 #4FD8FF / 薄荷 #7CF5D5 / 冰白 #DFF3FF / 暖阳 #FFD9A0。`
  },
  {
    id: "16-audio-spectrum",
    num: "16",
    name: "音频频谱·Web Audio 引擎",
    enName: "Web Audio Spectrum",
    cat: "lab",
    tags: ["OscillatorNode", "FFT", "前瞻调度", "零音频文件"],
    desc: "底鼓、贝斯、琶音、踩镲全是实时合成的振荡器，再经 AnalyserNode 做 2048 点 FFT。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名音频与前端双栖的工程师。请以【Web Audio 实时频谱】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，无音频文件）。
技术要求：
1. 音频图：master gain → DynamicsCompressor → AnalyserNode(fftSize 2048) → destination；必须由用户点击后 resume()。
2. 实时合成：kick 用 sine 做 150→45Hz 指数下滑；hat 用白噪声 buffer 过 highpass 7.2kHz；bass 用 sawtooth 过 lowpass 220→900Hz 扫频；arp 用 triangle 走八音音阶。包络统一 setValueAtTime(0.0001) → linearRamp(peak) → exponentialRamp(0.0001)。
3. 前瞻调度器：setInterval(25ms) 检查未来 0.12s，nextTime += 0.16 精确排程，避免 setTimeout 抖动。
4. 可视化：径向频谱（HSL 沿角度从品红渐变到青）+ 底部线性柱与倒影 + 时域波形层；频谱用对数分箱 a = pow(i/bars,1.7)*usable（usable = bins*0.55）。
5. 双模式：INSTANT 32 柱/平滑 0.55/无波形，DEEP 128 柱/平滑 0.90/带波形与余晖；提供麦克风接入（失败回落合成器）；未启动时用正弦假频谱占位。
6. UI：Syne 800 标题 + JetBrains Mono 正文，sticky HUD 显示 FFT/BARS/SMOOTH/SRC/FPS；配色 #07050F 底 + 品红 #FF3EA5 / 青 #40E8FF / 紫 #9B5CFF / 柠檬 #C6FF5C。`
  },
  {
    id: "17-verlet-cloth",
    num: "17",
    name: "韦尔莱布料·物理实验室",
    enName: "Verlet Cloth Lab",
    cat: "sim",
    tags: ["Verlet 积分", "约束松弛", "撕裂", "应变染色"],
    desc: "816 个质点只记住上一帧的位置，形状靠反复松弛约束 —— 亮色实验室里的一块真布。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名物理与前端双栖的工程师。请以【Verlet 布料模拟】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 布料：34×24 质点，Verlet 积分（x' = 2x − x_prev + a·Δt²，damp 0.99），顶行每 4 列一个固定图钉 + 末角。
2. 约束：结构约束（横/竖，静息长度 = 网格间距），DEEP 档加入两组对角剪切约束；每次迭代做 Gauss-Seidel 松弛，两端各修正一半（固定点不动）。
3. 撕裂：结构约束长度超过静息 2.6 倍即断开；按住 Shift 拖动时删除光标 20px 半径内的约束。
4. 渲染：每条约束按应变染色 strain = (d/len − 1)×2.2，hue 从 222(蓝) 渐变到 12(红)；固定点画红色图钉；背景为点阵标尺。
5. 交互：拖动抓取 44px 内最近质点；ITERATIONS(1~12)/WIND/GRAVITY 滑块实时生效；双模式 INSTANT 1 次松弛无剪切，DEEP 8 次松弛 + 剪切 + 撕裂。
6. UI：DM Sans + Space Mono，明亮的实验室浅底 #F2F0EB，sticky HUD 显示 POINTS/LINKS/ITER/WIND/FPS，视口右下角应变图例条。`
  },
  {
    id: "18-mandelbrot-dive",
    num: "18",
    name: "分形深潜·Mandelbrot 观测台",
    enName: "Mandelbrot Dive",
    cat: "shader",
    tags: ["逃逸时间", "smooth iteration", "余弦调色板", "FP32 护栏"],
    desc: "z → z² + c，对数式自动深潜到 46,000×，HUD 诚实地标出 FP32 的精度极限。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名数学与图形双栖的工程师。请以【Mandelbrot 分形观测台】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，WebGL1）。
技术要求：
1. 全屏三角形驱动片元着色器，逃逸时间算法渲染 Mandelbrot 集合：z → z² + c，逃逸半径 R²=256。
2. smooth iteration count：n = i + 1 − log₂(log₂|z|²)·0.5，消除色带；集合内部近纯黑 vec3(0.004,0.005,0.010)。
3. IQ 余弦调色板 pal(t) = a + b·cos(2π(t + d))，uniform d 控制两套配色：INSTANT 金/青，DEEP 品红/蓝紫，切换时插值过渡。
4. 自动深潜：围绕 (-0.743643887037151, 0.131825904205330) 对数式缩放 scale = exp(mix(ln2.8, ln6e-5, lz))，中心带微幅摆动；拖动平移、滚轮缩放会关闭自动深潜；FP32 护栏 scale ∈ [4e-5, 3.2]。
5. UI：Newsreader 600 衬线标题（斜体强调）+ JetBrains Mono 正文，sticky HUD 显示 ZOOM/ITER/CENTER/PRECISION(FP32)/FPS；配色 #030408 底 + 金 #D9B452 / 青 #3FD9C0，毛玻璃卡浮于分形之上。`
  },
  {
    id: "19-text-morph",
    num: "19",
    name: "文字粒子·形变矩阵",
    enName: "Text Morph Matrix",
    cat: "lab",
    tags: ["alpha 掩码采样", "弹簧系统", "速度映射亮度", "拖尾"],
    desc: "文字不是画出来的：先栅格化成 alpha 掩码，再让几千颗粒子用弹簧各自归位。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【文字粒子形变矩阵】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 文字→粒子管线：离屏画布 320×90 绘制目标词（Manrope 800，超宽自动缩字号），getImageData 后按 alpha>128、步距 2px 采样成目标点，映射回主画布坐标。
2. 粒子池：Float32Array（px/py/vx/vy），INSTANT 4,000 粒子 / DEEP 9,000 粒子，认领规则 i % targets.length。
3. 物理：弹簧 k（0.06 硬 / 0.02 软）+ 阻尼（0.86 / 0.91）；鼠标 130px 半径线性衰减斥力 f = (1−d/130)·2.6·scatter。
4. 渲染：globalCompositeOperation='lighter'，1.6px 方块；速度映射亮度（快速粒子电光蓝 #6EA8FF，静止近白）；DEEP 档每帧 rgba(0,0,0,0.18) 覆盖做拖尾。
5. 交互：每 4.2s 自动轮播词表（HY4/INSTANT/DEEP/256K/×8），点击立即切换，输入框可覆写当前词（≤8 字符），「打乱重排」按钮给全粒子随机初速。
6. UI：Manrope 800 标题 + JetBrains Mono 正文，56px 网格背景（径向遮罩），sticky HUD 显示 PARTICLES/SPRING/NEXT WORD/FPS；纯黑底 #050506，UI 只用黑白灰 + 电光蓝 #6EA8FF / 蓝 #3D7BFF。`
  },
  {
    id: "20-metaball-lava",
    num: "20",
    name: "熔岩元球·标量场渲染",
    enName: "Metaball Scalar Field",
    cat: "sim",
    tags: ["标量场", "256 项 LUT", "等值带", "ABGR 直写"],
    desc: "每个像素对热核求平方反比场，越过 v=1.0 的部分自然融合成岩浆液滴。",
    prompt: `【使用说明】下文以 hy4 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名图形与前端双栖的工程师。请以【Metaball 标量场渲染】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，Canvas2D）。
技术要求：
1. 低分辨率离屏画布（INSTANT 180×100 / DEEP 300×168）逐像素求标量场 v = Σ rᵢ²/d²，3r 之外截断；putImageData 后 drawImage 双线性放大到全屏。
2. 颜色：10 停靠点（碳黑→暗红→橙→黄→白热）预插值出 256 项 LUT，场值 ×60 取索引；在 LUT 中把 |v−1.0|<0.035 的区间提亮 +34 形成等值带，DEEP 档再加 |v−1.6|<0.03 的内核亮线。
3. 性能：ImageData 用 Uint32Array 以 ABGR 打包直写（0xff000000 | b<<16 | g<<8 | r），避免逐通道赋值。
4. 物理：热核速度阻尼 0.96~0.999 + 中心弱回复 + 热噪声 + 边界反弹；按住鼠标全体向光标加速；「搅动岩浆」给随机冲量。
5. 双模式：INSTANT 8 热核/180×100/单等值线，DEEP 14 热核/300×168/双等值线；VISCOSITY / HEAT INPUT 滑块实时生效。
6. UI：Oxanium 800 标题 + JetBrains Mono 正文，sticky HUD 显示 BALLS/GRID/ISO/LUT/FPS；配色 #0C0507 底 + 橙 #FF6A00 / 黄 #FFC63F / 暗红 #8C1E1E / 白热 #FFF3D6，视口右下角放场值色标。`
  }
];

let currentPresetIndex = 0;

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

function renderPresetList(filterText = '', filterCat = 'all') {
  presetNavList.innerHTML = '';

  const filtered = PRESETS.filter(p => {
    const kw = filterText.toLowerCase();
    const matchText = !kw ||
      p.name.toLowerCase().includes(kw) ||
      p.enName.toLowerCase().includes(kw) ||
      p.tags.some(t => t.toLowerCase().includes(kw)) ||
      p.desc.toLowerCase().includes(kw);
    const matchCat = filterCat === 'all' || p.cat === filterCat;
    return matchText && matchCat;
  });

  if (filtered.length === 0) {
    presetNavList.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: .8rem;">未找到匹配的预设风格</div>`;
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
        <div class="item-title-row"><span class="item-title">${preset.name}</span></div>
        <p class="item-desc">${preset.desc}</p>
        <div class="item-tags">${preset.tags.map(t => `<span class="item-tag">${t}</span>`).join('')}</div>
      </div>`;
    presetNavList.appendChild(item);
  });
}

function selectPreset(index) {
  currentPresetIndex = index;
  const p = PRESETS[index];

  currentPresetIndexEl.textContent = p.num;
  currentPresetTitleEl.textContent = p.name;
  currentPresetSubtitleEl.textContent = p.enName;

  const pageUrl = `presets/${p.id}/index.html`;
  previewIframe.src = pageUrl;
  openExternalBtn.href = pageUrl;

  renderPresetList(presetSearch.value, categoryPills.querySelector('.pill.active')?.dataset.cat || 'all');
}

copyPromptBtn.addEventListener('click', async () => {
  const p = PRESETS[currentPresetIndex];
  try {
    await navigator.clipboard.writeText(p.prompt);
    showToast(`已复制「${p.name}」的大模型 Prompt！`);
  } catch (err) {
    const ta = document.createElement('textarea');
    ta.value = p.prompt;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(`已复制「${p.name}」的大模型 Prompt！`);
  }
});

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2800);
}

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
      specContentEl.innerHTML = `<pre><code>${p.prompt}</code></pre>`;
    }
  } catch (e) {
    specContentEl.innerHTML = `<pre><code>${p.prompt}</code></pre>`;
  }
});

function closeDrawer() {
  specDrawer.classList.remove('open');
  specBackdrop.classList.remove('open');
}
drawerCloseBtn.addEventListener('click', closeDrawer);
specBackdrop.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

function parseMarkdownSimple(md) {
  return md
    .replace(/^#### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^---$/gim, '<hr/>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/`([^`\n]+)`/gim, '<code>$1</code>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/gim, '<br/><br/>');
}

document.querySelectorAll('.vp-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vp-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    iframeWrapper.style.width = btn.dataset.vp;
  });
});

categoryPills.addEventListener('click', (e) => {
  if (e.target.classList.contains('pill')) {
    categoryPills.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    e.target.classList.add('active');
    renderPresetList(presetSearch.value, e.target.dataset.cat);
  }
});

presetSearch.addEventListener('input', (e) => {
  const activeCat = categoryPills.querySelector('.pill.active')?.dataset.cat || 'all';
  renderPresetList(e.target.value, activeCat);
});

renderPresetList();
selectPreset(0);
