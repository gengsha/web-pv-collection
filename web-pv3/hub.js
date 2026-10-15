// Web-PV3 Preset Directory Data & Hub Logic
const PRESETS = [
  {
    id: "01-dawn-flagship",
    num: "01",
    name: "曙光旗舰·智谱蓝调",
    enName: "Dawn Flagship · Zhipu Blue",
    cat: "future",
    tags: ["官方旗舰", "晨曦蓝白", "渐变文字", "轻透玻璃"],
    desc: "GLM 5.3 官方发布级美学：晨曦蓝白底、靛紫渐变大标题、轻透玻璃卡片与数字滚动指标。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【曙光旗舰·智谱蓝调 (Dawn Flagship · Zhipu Blue)】风格生成一个关于 GLM 5.3（智谱旗舰大模型）的个人官网（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：晨曦蓝白 #F6F8FD，纯白表面 #FFFFFF；页面后置 2 颗超大低饱和柔光球（靛蓝 #2E4CE0 与紫罗兰 #7C5CFC，blur 90px，opacity 0.35）随鼠标视差漂移。
2. 材质体系：轻透玻璃卡片（backdrop-filter: blur(20px)，边框 1px rgba(11,18,38,0.06)，投影 0 24px 48px -20px rgba(46,76,224,0.18)）。
3. 字体层次：Outfit 主标题使用 120deg 靛→紫渐变文字剪裁，中文正文 Noto Sans SC，数据用 JetBrains Mono。
4. 核心板块：
   - 顶部导航 + 版本胶囊徽章「GLM-5.3」+ 巨型渐变 Hero 标题
   - 能力 Bento 网格（深度推理 / 智能体 / 多模态 / 代码）
   - 评测成绩条形图（数字自 0 滚动递增动画）
   - 对话终端入口（辉光输入框 + 发送按钮）
5. 动效要求：滚动渐显（IntersectionObserver）、指标数字滚动、卡片悬停上浮 6px 泛渐变光晕。`
  },
  {
    id: "02-movable-type",
    num: "02",
    name: "活字格物·墨阵排印",
    enName: "Movable Type · Ink Matrix Press",
    cat: "art",
    tags: ["宋体巨字", "活字矩阵", "朱砂方印", "排印工坊"],
    desc: "毕昇活字工坊美学：宣纸底、铅字字库矩阵、按压回弹与朱砂印章，排版即建筑。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【活字格物·墨阵排印 (Movable Type · Ink Matrix Press)】风格生成一个关于 GLM 5.3 的「语言文字工匠」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：宣纸暖白 #F4EFE3，叠加极淡帘纹肌理（repeating-linear-gradient）；文字以松烟墨 #1B1710 为主。
2. 核心构件：活字字块——深墨底 #1B1710、白字浮雕（inset 双向投影模拟铅字凸起）；朱砂方印（#B3382C 旋转 -3deg，内白文）。
3. 字体排版：Noto Serif SC 900 巨型宋体标题（可竖排 writing-mode: vertical-rl 作侧栏批注）；字库编号用 JetBrains Mono。
4. 核心板块：
   - 巨字 Hero：一枚超大「智」字活字块 + 竖排诗题「字字如铸，落笔生根」
   - 字库矩阵：16 枚活字（智/思/文/码/声/图…）悬停受压下沉、点击翻面显示能力释义
   - 组版工坊：输入任意短句，点击「组版」逐枚铅字落版成阵
   - 朱砂落款对话框
5. 动效要求：铅字按压回弹、翻转 0.5s 3D transition、滚动内容如墨迹晕染显影（blur→clear）。`
  },
  {
    id: "03-qinghua-porcelain",
    num: "03",
    name: "青花釉彩·瓷上生花",
    enName: "Qinghua Porcelain · Generative Glaze",
    cat: "art",
    tags: ["瓷白钴蓝", "开片冰裂", "缠枝纹样", "窑变叙事"],
    desc: "青花瓷生成美学：瓷白釉面、钴蓝双勾、缠枝莲 SVG 描线与窑变版本史卷轴。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【青花釉彩·瓷上生花 (Qinghua Porcelain · Generative Glaze)】风格生成一个关于 GLM 5.3 的「生成艺术瓷窑」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：瓷釉白 #FBF8F1，可叠加极淡开片冰裂 SVG pattern（6% 透明度）与径向釉面光泽渐变。
2. 色彩体系：青花钴蓝 #1E4B9C 主色、深钴 #123064、水色青花 #6E93C9、釉里红点缀 #96382B。
3. 核心构件：青花双勾边框卡片（外深内浅双 1px 线）；圆形瓷盘构图（border-radius: 50%，同心环纹 + 中心 SVG 缠枝莲纹样）；海水江崖波脚分隔线。
4. 字体排版：ZCOOL XiaoWei 标题 + Noto Serif SC 正文 + JetBrains Mono 窑温数据。
5. 核心板块：
   - Hero：「入窑一色，出窑万彩」大标题 + 一枚带缠枝纹的大瓷盘
   - 生成纹样画册：文生图 / 图生视频 / 声音复刻三枚瓷盘，纹样 SVG 随滚动描线生长
   - 釉色谱系色卡 + GLM 版本窑变史时间轴（1.0 → 5.3 烧成曲线）
   - 釉下落款对话框（钴蓝辉光输入框）
6. 动效要求：SVG stroke-dashoffset 描线动画、卡片悬停釉面扫光、瓷盘缓旋、纹路精细克制不喧宾。`
  },
  {
    id: "04-moonlit-garden",
    num: "04",
    name: "夜园月门·移步换景",
    enName: "Moonlit Garden · Scenic Turns",
    cat: "minimal",
    tags: ["月门构图", "墨绿夜园", "步石进度", "层叠剪影"],
    desc: "苏州夜园美学：月门圆形构图、墨绿夜色、层叠山石剪影视差与步石滚动进度。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【夜园月门·移步换景 (Moonlit Garden · Scenic Turns)】风格生成一个关于 GLM 5.3 的「智能体夜园」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：墨绿夜园 #0B1410 至深潭 #060B09 的纵向渐变；文字用月白 #F3EDDC 与月灰 #B9B39E。
2. 核心构件：月门正圆构图（border-radius: 50%，2px 月白双环勾边，内部 radial-gradient 景深辉光）；三层远山有机剪影（深浅递进色块）；花窗漏影（双向 1px linear-gradient 线网 12% 透明度）；右侧固定 6 枚椭圆步石。
3. 字体排版：Ma Shan Zheng 毛笔体作诗题景题，Noto Serif SC 300 细宋正文。
4. 核心板块（游园三进）：
   - 一进 · 问：月门内嵌 Hero 诗句「夜园深处，有一盏灯」
   - 二进 · 思：三景卡片——曲水流觞（多轮对话）、借景（检索增强）、移步换景（任务分解）
   - 三进 · 行：水榭对话台（灯笼辉光输入框）
5. 动效要求：月门辉光 6s 呼吸、鼠标三层视差、滚动步石逐一点亮为琥珀色 #D9A441、灯笼 4.5s 夜摆。整体氛围静谧克制，忌高饱和。`
  },
  {
    id: "05-neon-lantern",
    num: "05",
    name: "赛博灯市·电光国潮",
    enName: "Neon Lantern Bazaar · Cyber Guochao",
    cat: "cyber",
    tags: ["竖排霓虹", "灯笼辉光", "灯谜翻转", "跑马灯市"],
    desc: "国潮夜市美学：竖排霓虹招牌、电光红金撞色、灯谜翻转卡与跑马灯市声。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

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
5. 动效要求：招牌随机时间触发霓虹闪烁抖动、灯笼 3.5s 摇曳、灯谜点击 3D 翻面、跑马灯 18s 无限循环。整体高饱和但暗底衬托，热闹不刺眼。`
  },
  {
    id: "06-star-chart",
    num: "06",
    name: "石刻星图·观天授时",
    enName: "Stone Star Chart · Cosmic Observatory",
    cat: "cyber",
    tags: ["深靛星幕", "星官连线", "浑仪环阵", "古籍朱批"],
    desc: "古代天文台美学：Canvas 星幕闪烁、金星星官连线谱系、浑仪环阵与历表朱批。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【石刻星图·观天授时 (Stone Star Chart · Cosmic Observatory)】风格生成一个关于 GLM 5.3 的「天文台观测者」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：深靛天幕 #080D1B 至 #040814；全屏 Canvas 星野（静态星点 + 随机相位闪烁 + 每 4~8s 一道金色流星）。
2. 色彩体系：星光金 #E8C868、星白 #D9E2F2、暗星 #7C89A6、朱批红 #B3432F、经线金色 22% 透明度。
3. 核心构件：浑仪三环（三重同心 border 圆环 60s/40s/26s 反向缓转，中心主星徽）；星官连线谱（SVG polyline 串联 GLM-130B → ChatGLM → GLM-4 → GLM-5 → GLM-5.3，主星四芒金晕，随滚动 stroke-dashoffset 描线生成）。
4. 字体排版：Noto Serif SC 900 碑刻大标题（字距 0.24em）、300 细宋正文、JetBrains Mono 星表坐标。
5. 核心板块：
   - Hero：浑仪环 + 中心 GLM 5.3 主星 +「观星千年，今夜最亮」碑题
   - 星官谱系：模型版本演进连线图（每星标注年份 mono 小字）
   - 观测记录：三条深度研究条目（古籍排版 + 朱批结论）
   - 授时历表：能力评测表（mono 对齐，金色数值）
6. 动效要求：星闪呼吸、流星轨迹渐隐、浑仪反向缓转、SVG 描线生长。整体如星夜碑刻，庄重克制。`
  },
  {
    id: "07-fusion-core",
    num: "07",
    name: "聚变环芯·等离子跃迁",
    enName: "Fusion Core · Plasma Surge",
    cat: "future",
    tags: ["托卡马克环", "等离子流", "能级仪表", "遥测HUD"],
    desc: "可控聚变美学：托卡马克环阵、等离子粒子风暴、能级仪表盘与实时遥测 HUD。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【聚变环芯·等离子跃迁 (Fusion Core · Plasma Surge)】风格生成一个关于 GLM 5.3 的「聚变实验装置」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：真空暗腔 #04060B 至腔壁 #080D16；全屏 Canvas 粒子场——等离子粒子（紫 #A24DFF / 粉 #FF3D8A / 青 #35E7FF）沿椭圆轨道流动，鼠标如外加磁场使近距粒子轨道偏转。
2. 核心构件：托卡马克三环（conic-gradient 弧段辉光，26s/17s/11s 差速旋转）+ 中心等离子芯（径向渐变球，4s 呼吸脉动）；HUD 四角 L 形青色括线卡；分段式能级量规（10 段块按能级青→紫→粉）；mono 遥测面板。
3. 字体排版：Space Grotesk 700 大写工程标题（字距 0.08em）、Noto Sans SC 正文、JetBrains Mono 遥测读数。
4. 核心板块：
   - Hero：反应堆主体 +「点火 IGNITION」+ 实时遥测（约束时间 38.2s · 能级 LV.5.3 · 输出稳定）
   - 磁场参数：深度推理 / 代码 / 智能体 / 多模态四路分段能量表（滚动依次点亮）
   - Q 值对比：输入 token 与输出能量的代际增益图
   - 控制台对话框（青色辉光输入，回复如遥测流）
5. 动效要求：粒子轨道流动 + 鼠标磁场扰动、核心呼吸脉冲、遥测数字每 900ms 微刷新、量规分段充能。整体硬核仪表美学，克制而高能。`
  },
  {
    id: "08-tiangong-blueprint",
    num: "08",
    name: "天工开物·营造图则",
    enName: "Tiangong Kaiwu · Craft Blueprint",
    cat: "cyber",
    tags: ["牛皮图纸", "榫卯构件", "尺寸标注", "图签验讫"],
    desc: "明代工坊制图美学：牛皮纸坐标网格、榫卯卡扣构件、朱批尺寸线与图签验讫印章。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

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
6. 动效要求：尺寸线 scaleX 生长、SVG 描线渐显、卡片悬停榫头下压咬合、点击钤印带 scale 1.4→1 下压与印泥阴影。`
  },
  {
    id: "09-hutong-diary",
    num: "09",
    name: "市井烟火·胡同手记",
    enName: "Hutong Warmth · Daily Companion",
    cat: "minimal",
    tags: ["手写手账", "拍立得拼贴", "暖灯辉光", "胶带便利贴"],
    desc: "胡同烟火美学：手写体手账、拍立得与胶带拼贴、暖灯辉光与邻里留言便利贴。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【市井烟火·胡同手记 (Hutong Warmth · Daily Companion)】风格生成一个关于 GLM 5.3 的「胡同街坊 AI」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：暖奶油纸 #FFF6E9，右上角常亮一盏巷口路灯径向暖光（柿子橙 18% 透明度）。
2. 色彩体系：柿子橙 #E8662C 主色、砖暖棕 #8A5A44、墨暖 #453326 正文、菜蔬绿 #7CA98F 点缀。
3. 核心构件：拍立得相纸卡（白框 + 随机倾角 + 顶角和纸胶带 + 手写注脚）；便利贴留言墙（暖黄渐变 + 底部双折角）；手账页（左侧双线装订 + 日期戳 mono）；手绘虚线分隔（2px dashed 圆角）。
4. 字体排版：Ma Shan Zheng 毛笔手书做标题与拍立得注脚，Noto Sans SC 正文，JetBrains Mono 时间戳门牌号。
5. 核心板块：
   - Hero：手写大字「胡同口那家 AI」+ 三张拍立得拼贴（帮老张修代码 / 陪王奶奶唠嗑 / 替小李改简历）
   - 今日手记：三条时间戳流水账（可回车追写新条目）
   - 邻里留言便利贴墙：四张街坊评语便签
   - 一日三餐时间轴：晨报 / 午研 / 晚记
   - 小卖部窗口对话框（回复时蒸汽袅袅）
6. 动效要求：拍立得悬停起身正视、便利贴揭角放大、手账条目 max-height 展开写入、对话区 CSS 汤汽循环上升。整体温度高于精度，亲切先于炫技。`
  },
  {
    id: "10-thought-river",
    num: "10",
    name: "思维长河·推理流光",
    enName: "Thought River · Reasoning Stream",
    cat: "future",
    tags: ["令牌流河", "思维步石", "金色波光", "涟漪交互"],
    desc: "思维链具象美学：Canvas 令牌粒子流河、六步思维链步石、金色波光与点击涟漪。",
    prompt: `【使用说明】下文以 GLM 5.3（智谱） 作为示例主角。复用时请把其中的品牌名、版本号、文案与「内容板块」替换为 {{品牌/产品名}} 和你的业务需求；色彩、材质、字体、动效等风格规范保持不变。

你是一名顶级前端视觉架构师。请以【思维长河·推理流光 (Thought River · Reasoning Stream)】风格生成一个关于 GLM 5.3 的「深度思考者」个人主页（纯原生 HTML + CSS + JS）。

设计要求：
1. 视觉底色：夜河深蓝 #050E19 至 #030A12；全宽 Canvas 令牌流河横贯页面——发光粒子（金 #F0D387 / 青 #3FD9E8，约 8% 为汉字令牌）沿正弦波自左向右奔流，带 6px 拖尾渐隐。
2. 核心构件：六枚步石横跨河面（理解 → 拆解 → 检索 → 推演 → 校验 → 作答），石间流动虚线电流相连；河岸以 #14263A 斜切收边；金色标题带 scaleY(-1) 倒影。
3. 字体排版：Outfit 700 + Noto Sans SC 700 大标题，Noto Sans SC 300 正文，JetBrains Mono 令牌与流速指标。
4. 核心板块：
   - Hero：「思如长河，昼夜不废」+ 倒影 + 河况指标条（河长 200K · 流速 128 tok/s · 六步成答）
   - 思维链步石区：随滚动逐一点亮六石并显示各步注解
   - 河岸对话台：输入如投石，回复如涌流
5. 动效要求：粒子正弦奔流、鼠标掠河产生垂向斥力偏转、点击河面泛起金色涟漪扩散环、步石逐一点亮并金色脉冲。整体静水深流，克制而绵长。`
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
