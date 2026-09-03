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
    prompt: `你是一名顶级前端视觉架构师。请以【曙光旗舰·智谱蓝调 (Dawn Flagship · Zhipu Blue)】风格为 GLM 5.3（智谱旗舰大模型）生成个人官网代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：晨曦蓝白底 #F6F8FD、纯白表面 #FFFFFF、墨蓝主文字 #0B1226；品牌渐变自靛蓝 #2E4CE0 流向紫罗兰 #7C5CFC（120deg），辅以天青 #4F8DF7 高光。
2. 材质体系：轻透玻璃卡片（rgba(255,255,255,0.78) + backdrop-filter: blur(20px)，边框 1px rgba(11,18,38,0.06)，投影 0 24px 48px -20px rgba(46,76,224,0.18)）；大标题使用渐变文字剪裁（background-clip: text）。
3. 字体排版：Outfit（主标题 800 粗、字间距 -0.03em）+ Noto Sans SC（正文）+ JetBrains Mono（数据指标）。
4. 核心板块：版本胶囊徽章（GLM-5.3）、渐变 Hero 巨字、能力 Bento 网格（深度推理/智能体/多模态/代码）、评测成绩条形图（数字滚动动画）、对话终端入口、页脚。
5. 动效要求：滚动渐显（IntersectionObserver）、指标数字滚动递增、卡片悬停上浮 6px 且边框泛起渐变光晕、背景两颗超大柔光球随鼠标轻微视差漂移。`
  },
  {
    id: "02-movable-type",
    num: "02",
    name: "活字格物·墨阵排印",
    enName: "Movable Type · Ink Matrix Press",
    cat: "art",
    tags: ["宋体巨字", "活字矩阵", "朱砂方印", "排印工坊"],
    desc: "毕昇活字工坊美学：宣纸底、铅字字库矩阵、按压回弹与朱砂印章，排版即建筑。",
    prompt: `你是一名顶级前端视觉架构师。请以【活字格物·墨阵排印 (Movable Type · Ink Matrix Press)】风格为 GLM 5.3 生成「语言文字工匠」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：宣纸暖白 #F4EFE3、深宣纸 #EDE6D5、松烟墨 #1B1710、墨灰 #57503F、朱砂印红 #B3382C、洒金 #A98118。
2. 排版系统：Noto Serif SC 900 巨型宋体标题（可竖排 writing-mode: vertical-rl）、正文 Noto Serif SC 400 行高 1.8；纸面叠加细微织物纹理（repeating-linear-gradient 半透明层）。
3. 核心构件：活字字块（深墨底、内凹浮雕字、letterpress 双向投影 inset 0 2px rgba(255,255,255,.14) / inset 0 -2px rgba(0,0,0,.55)）、朱文方印（rotate -3deg、篆意）、竖排批注栏。
4. 交互与动效：活字块悬停如铅字受压下沉（translateY 2px + 阴影收拢）、点击翻转显示释义；输入文字可「组版」为一版活字阵列；滚动内容如墨迹晕染显影。
5. 内容叙事：将 GLM 5.3 的语言生成能力拟为活字工坊——字库矩阵（智/思/文/码/声/图等能力字）、组版演示、朱砂落款对话框。`
  },
  {
    id: "03-qinghua-porcelain",
    num: "03",
    name: "青花釉彩·瓷上生花",
    enName: "Qinghua Porcelain · Generative Glaze",
    cat: "art",
    tags: ["瓷白钴蓝", "开片冰裂", "缠枝纹样", "窑变叙事"],
    desc: "青花瓷生成美学：瓷白釉面、钴蓝双勾、缠枝莲 SVG 描线与窑变版本史卷轴。",
    prompt: `你是一名顶级前端视觉架构师。请以【青花釉彩·瓷上生花 (Qinghua Porcelain · Generative Glaze)】风格为 GLM 5.3 生成「生成艺术瓷窑」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：瓷釉白 #FBF8F1、釉阴 #F1EBDD、青花钴蓝 #1E4B9C、深钴 #123064、水色青花 #6E93C9、釉里红点缀 #96382B。
2. 材质与构件：青花双勾边框（外 1px 深钴 + 内 1px 水蓝双线）、开片冰裂纹叠加层（SVG pattern 极淡 6% 透明度）、缠枝莲纹 SVG 描线装饰、海水江崖波浪分隔线、圆形瓷盘构图（radial 纹样居中）。
3. 字体排版：ZCOOL XiaoWei（标题宋韵）+ Noto Serif SC 正文 + JetBrains Mono 窑温数据。
4. 动效要求：缠枝纹样随滚动 stroke-dashoffset 描线生长、瓷盘悬停缓旋并掠过釉面高光扫光（shine sweep）、开片纹理微妙闪现。
5. 内容叙事：以「入窑一色，出窑万彩」为 Hero；生成纹样画册（文生图/图生视频/语音三瓷盘）、釉色谱系、GLM 版本窑变史（1.0 → 5.3 的烧成曲线）、落款对话框。`
  },
  {
    id: "04-moonlit-garden",
    num: "04",
    name: "夜园月门·移步换景",
    enName: "Moonlit Garden · Scenic Turns",
    cat: "minimal",
    tags: ["月门构图", "墨绿夜园", "步石进度", "层叠剪影"],
    desc: "苏州夜园美学：月门圆形构图、墨绿夜色、层叠山石剪影视差与步石滚动进度。",
    prompt: `你是一名顶级前端视觉架构师。请以【夜园月门·移步换景 (Moonlit Garden · Scenic Turns)】风格为 GLM 5.3 生成「园中智者」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：夜园墨绿 #0B1410、深潭 #060B09、月色米白 #F3EDDC、月昏 #BDB7A4、苔绿 #3D5C4A、灯笼琥珀 #D9A441、玉青 #7FB6A4。
2. 空间构图：超大圆形月门作为 Hero 构图框（径向月光内辉光 radial-gradient + 呼吸律动）；内容分区沿「一进·问 / 二进·思 / 三进·行」的游园动线展开；右侧步石进度点随滚动点亮。
3. 材质构件：花窗漏格装饰板（CSS repeating-linear-gradient 网格镂空意象）、层叠山石/树影剪影（多层 SVG blob，随鼠标产生不同速度视差漂移）、竖排诗题（Ma Shan Zheng 毛笔字）。
4. 动效要求：月光呼吸（8s 周期）、月门随滚动由 0.9 缩放至 1 缓缓「敞开」、各景层以 4-8px 位移差响应鼠标移动；接近视口时内容如夜色中渐次点灯显影。
5. 内容叙事：曲水流觞（多轮对话）、借景（检索增强）、移步换景（智能体任务流）皆化作园中景致；亭中设一轮对月对话框。`
  },
  {
    id: "05-neon-lantern",
    num: "05",
    name: "赛博灯市·电光国潮",
    enName: "Neon Lantern Bazaar · Cyber Guochao",
    cat: "cyber",
    tags: ["竖排霓虹", "灯笼辉光", "灯谜翻转", "跑马灯市"],
    desc: "国潮夜市美学：竖排霓虹招牌、电光红金撞色、灯谜翻转卡与跑马灯市声。",
    prompt: `你是一名顶级前端视觉架构师。请以【赛博灯市·电光国潮 (Neon Lantern Bazaar · Cyber Guochao)】风格为 GLM 5.3 生成「夜市摊主」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：深夜市 #0A0712、巷底 #050308、霓虹正红 #FF2E5C、电光金 #FFC233、霓虹青 #2AE8D5、洋红紫 #C13BFF、招牌板 #14091C。
2. 材质与构件：竖排霓虹招牌（writing-mode: vertical-rl + 多层 text-shadow 辉光）、CSS 灯笼（radial-gradient 灯体 + 摇曳 sway）、霓虹管边框（大圆角边框 + 双层 box-shadow 外发光）、票根摊位卡（虚线撕票边）、顶部跑马灯带。
3. 字体排版：ZCOOL QingKe HuangYou（布告体标题）+ Noto Sans SC + JetBrains Mono 价签。
4. 动效与交互：霓虹随机闪烁（flicker keyframes 不规则 opacity）、灯笼悬停摇曳加剧、灯谜卡点击 3D 翻转揭示答案、跑马灯无限滚动。
5. 内容叙事：GLM 5.3 是灯市里「什么都会一点的摊主」——推理摊/代码摊/画皮摊/声腔摊/百晓摊各设一卡；灯谜即 Prompt；牌价即 tokens 消耗表。`
  },
  {
    id: "06-star-chart",
    num: "06",
    name: "石刻星图·观天授时",
    enName: "Stone Star Chart · Cosmic Observatory",
    cat: "cyber",
    tags: ["深靛星幕", "星官连线", "浑仪环阵", "古籍朱批"],
    desc: "古代天文台美学：Canvas 星幕闪烁、金星星官连线谱系、浑仪环阵与历表朱批。",
    prompt: `你是一名顶级前端视觉架构师。请以【石刻星图·观天授时 (Stone Star Chart · Cosmic Observatory)】风格为 GLM 5.3 生成「观星智识」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：深靛星幕 #080D1B、星穹底 #040814、星光金 #E8C868、星子白 #D9E2F2、暗星 #7C89A6、经纬金线 rgba(232,200,104,0.22)、朱批红 #B3432F。
2. 材质与构件：HTML5 Canvas 星幕（300+ 星子随机分布、错峰闪烁 twinkle、偶发流星划过）；GLM 谱系星官连线（SVG 折线将 GLM-130B → ChatGLM → GLM-4 → GLM-5 → GLM-5.3 逐星相连，线段随滚动 stroke-dashoffset 逐段点亮）；三重浑仪环阵（CSS 同心圆环以不同周期缓慢旋转，环上刻度点）；古籍注疏排版（两侧小字竖排批注 + 朱砂圈点）。
3. 字体排版：Noto Serif SC（刻石宋韵）+ JetBrains Mono（星官坐标/历表数据）。
4. 动效要求：星子闪烁错峰呼吸、流星每 6-14 秒随机划过、星官连线点亮时星子短暂增亮放大、鼠标移动令最近星子微偏移（视差）。
5. 内容叙事：GLM 5.3 为今夜最亮新星；观测记录（深度研究案例）作古籍条目；授时历表呈现评测成绩（精度如历法）；拜星台下设一轮问星对话框。`
  },
  {
    id: "07-fusion-core",
    num: "07",
    name: "聚变环芯·等离子跃迁",
    enName: "Fusion Core · Plasma Surge",
    cat: "future",
    tags: ["托卡马克环", "等离子流", "能级仪表", "遥测HUD"],
    desc: "可控聚变美学：托卡马克环阵、等离子粒子风暴、能级仪表盘与实时遥测 HUD。",
    prompt: `你是一名顶级前端视觉架构师。请以【聚变环芯·等离子跃迁 (Fusion Core · Plasma Surge)】风格为 GLM 5.3 生成「聚变点火」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：真空黑 #04060B、腔壁 #080D16、等离子紫 #A24DFF、聚变粉 #FF3D8A、离子青 #35E7FF、辉光 rgba(162,77,255,0.35)。
2. 材质与构件：托卡马克环阵（3-4 重同心环，conic-gradient 发光描边，各环以 12s/20s/32s 差速旋转）；中央等离子核心（径向渐变脉动核 + 多层 box-shadow 辉光呼吸）；分段式能级仪表条（发光分段 progress）；HUD 四角括号框（L 形边角线）；等宽遥测面板（键值对逐行刷新）。
3. 字体排版：Space Grotesk（标题）+ Noto Sans SC + JetBrains Mono（遥测数据）。
4. 动效要求：Canvas 等离子粒子沿轨道环绕中心流动，鼠标作为「外加磁场」扭曲粒子轨道（斥力/吸引）；核心以 4s 脉动周期膨胀收缩；遥测数值每 800ms 随机微调刷新；能级条滚动触发逐段充能。
5. 内容叙事：GLM 5.3 = 能级跃迁——上下文规模作「磁约束半径」、推理深度作「约束时间」、性能代际作「Q 值（输出/输入）」、智能体作「磁场控制器」；控制台输入框以离子青辉光。`
  },
  {
    id: "08-tiangong-blueprint",
    num: "08",
    name: "天工开物·营造图则",
    enName: "Tiangong Kaiwu · Craft Blueprint",
    cat: "cyber",
    tags: ["牛皮图纸", "榫卯构件", "尺寸标注", "图签验讫"],
    desc: "明代工坊制图美学：牛皮纸坐标网格、榫卯卡扣构件、朱批尺寸线与图签验讫印章。",
    prompt: `你是一名顶级前端视觉架构师。请以【天工开物·营造图则 (Tiangong Kaiwu · Craft Blueprint)】风格为 GLM 5.3 生成「数字大匠营造手册」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：牛皮纸 #E7DCC2、深浆纸 #DBCEAC、墨褐 #3A2E1B、图线褐 #4A3B24、朱砂批注 #A83226、图则蓝 #33557A。
2. 材质与构件：全页包裹图框（双细线边框 + 右下角图签栏：项目名/图号 GLM-53-TK-001/比例 1:5.3/匠人 智谱）；背景坐标纸网格（repeating-linear-gradient 1px 细线，25px 方格）；榫卯卡扣卡片（伪元素凸榫与凹槽咬合意象，悬停时「合榫」位移 4px）；尺寸标注线（水平细线 + 端部箭头 + 居中数字）；木刻线稿图标（SVG 单线勾勒，stroke-dashoffset 随滚动描线成画）。
3. 字体排版：ZCOOL XiaoWei（图题）+ Noto Serif SC 正文 + JetBrains Mono（尺寸与工料数据）。
4. 动效与交互：滚动触发布线「逐笔绘制」；点击页面任意处盖下一枚旋转朱砂「验讫」印章（带印泥不均匀质感 radial-gradient 遮罩）；朱批注解随段落渐次浮现。
5. 内容叙事：把 GLM 5.3 的训练炼成写作营造工序——选材（数据）、制榫（预训练）、合梁（对齐）、髹漆（强化学习）；能力清单作「工料清单 BOM」；代码案例作营造图则卡片。`
  },
  {
    id: "09-hutong-diary",
    num: "09",
    name: "市井烟火·胡同手记",
    enName: "Hutong Warmth · Daily Companion",
    cat: "minimal",
    tags: ["手写手账", "拍立得拼贴", "暖灯辉光", "胶带便利贴"],
    desc: "胡同烟火美学：手写体手账、拍立得与胶带拼贴、暖灯辉光与邻里留言便利贴。",
    prompt: `你是一名顶级前端视觉架构师。请以【市井烟火·胡同手记 (Hutong Warmth · Daily Companion)】风格为 GLM 5.3 生成「胡同街坊 AI」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：奶油纸 #FFF7EA、暖墙 #FBEED8、柿子橙 #E8662C、砖褐 #8A5A44、暖墨 #453326、软墨 #7A6552、葱绿点缀 #7CA98F。
2. 材质与构件：拍立得相卡（白边 + 轻微 rotate(-2deg~2deg) + 顶部半透明和纸胶带）；便利贴留言（微卷角 + 微投影）；手账撕页日历头；手绘虚线分隔（dashed 波浪）；页面右上角暖灯辉光（radial-gradient 橙光渐隐）；圆点贴纸。
3. 字体排版：Ma Shan Zheng（毛笔手写标题）+ Noto Sans SC（正文，行高 1.75）+ JetBrains Mono（票根小字）。
4. 动效与交互：拍立得悬停抬起旋转（translateY -8px + rotate 归正）；便利贴悬停轻晃（wiggle 旋转 -1deg~1deg）；手记表单可追加当日新条目；胶带悬停微「掀起」。
5. 内容叙事：GLM 5.3 是胡同口那家 AI——手记条目记着今天帮老张修了代码、替小李改了简历、陪王奶奶读体检报告；拍立得拼贴展示日常瞬间；邻里便利贴是用户原声好评；小卖部窗口式对话框收尾。`
  },
  {
    id: "10-thought-river",
    num: "10",
    name: "思维长河·推理流光",
    enName: "Thought River · Reasoning Stream",
    cat: "future",
    tags: ["令牌流河", "思维步石", "金色波光", "涟漪交互"],
    desc: "思维链具象美学：Canvas 令牌粒子流河、六步思维链步石、金色波光与点击涟漪。",
    prompt: `你是一名顶级前端视觉架构师。请以【思维长河·推理流光 (Thought River · Reasoning Stream)】风格为 GLM 5.3 生成「深度思考」主题个人主页代码（纯原生 HTML + CSS + JS）。

设计规范与美学基因：
1. 色彩令牌：长河夜蓝 #050E19、河底 #030A12、流金 #F0D387、川流青 #3FD9E8、浪沫白 #EAF6FA、岸石 #14263A。
2. 核心视觉：HTML5 Canvas 令牌之河——数百枚发光字符粒子（汉字/代码符号/音符随机）自左向右沿正弦波面流动，随流速产生拖尾辉光；点击河面激起一圈金色涟漪并向外扩散衰减。
3. 构件系统：思维链步石（六枚圆石横跨河面：理解→拆解→检索→推演→校验→作答，随滚动逐一点亮并向下一石发出流光连线）；河面反射渐变层；上下文窗口作「河长 200K」度量条；河岸对话输入框（青光内嵌）。
4. 字体排版：Outfit（标题）+ Noto Sans SC + JetBrains Mono（令牌字符/流速数据）。
5. 动效要求：粒子流受鼠标扰动（轻推偏航）、步石点亮伴随水波扩散动画、流速指标（tokens/s）实时微调；整页节奏舒缓如夜航。
6. 内容叙事：GLM 5.3 的深度推理如长河——不息、不弃、绕石而行、终归大海作答。`
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
