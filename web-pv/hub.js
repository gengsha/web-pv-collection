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
    prompt: `你是一名顶级前端视觉架构师。请以【星轨星云·极光流体】风格为 Gemini（多模态超级 AI）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：主背景 #080B14、暗物质蓝 #0F172A；极光流体渐变（#7928CA -> #4285F4 -> #00F0FF）；高光文字 #F8FAFC 与星尘灰 #94A3B8。
2. 材质与构件：大范围径向高斯模糊流体层（blur 80px~120px），高透毛玻璃容器（backdrop-filter: blur(24px)，边框 1px solid rgba(255,255,255,0.12)），发光 Pill 胶囊徽章。
3. 字体排版：主标题 Plus Jakarta Sans / Outfit，副标题与数据使用 JetBrains Mono 等宽字体。
4. 交互与微动效：鼠标悬停触发内发光提升与外发光光晕扩散，光标移动带动背景流体做柔和的弹性引力微形变。
5. 呈现 Gemini 作为新一代全能多模态 AI 的旗舰风范，包含多模态感知能力展示、思维链推理演示模块与交互式对话入口。`
  },
  {
    id: "02-celestial-duality",
    num: "02",
    name: "双子对偶·极简阴阳分形",
    enName: "Celestial Duality & Swiss Monolith",
    cat: "minimal",
    tags: ["50/50分屏", "瑞士排版", "黑白对偶", "哲思张力"],
    desc: "黑白 50/50 动态分割对偶张力，理性代码态与感性生成态的对称美学。",
    prompt: `你是一名顶级前端视觉架构师。请以【双子对偶·极简阴阳分形】风格为 Gemini 生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 构图哲学：采用 50/50 动态可拖拽分屏设计，左侧为「理性与逻辑」（纯白陶瓷底 #FAFAFA + 纯黑字），右侧为「感性与创造」（玄武黑底 #0A0A0A + 纯白字）。
2. 瑞士国际排版：使用超大字阶衬线标题（Playfair Display 或 Syne），严格的极细 1px 网格对齐线，去除冗余装饰。
3. 交互与动效：屏幕中线支持鼠标自由拖拽调节两极比例，光标具备 mix-blend-mode: difference 反色效果，两边内容随分屏实时缩放流体流动。
4. 内容表现：左侧展示 Gemini 严格的代码编译、数学推理、逻辑矩阵；右侧展示文学创作、诗意隐喻、多模态艺术感知。`
  },
  {
    id: "03-synaptic-hologram",
    num: "03",
    name: "神经突触·全息色散",
    enName: "Synaptic Holo-Chroma Lab",
    cat: "future",
    tags: ["全息投影", "RGB色散", "突触连线", "实验室"],
    desc: "赛博全息扫描线与棱镜色散，SVG 动态发光神经突触节点连线。",
    prompt: `你是一名顶级前端视觉架构师。请以【神经突触·全息色散】风格为 Gemini 生成前沿认知实验室个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩系统：冷钛合金黑底 #030712，全息高光色阶（青色 #22D3EE、洋红 #E879F9、酸橙绿 #A3E635），半透明全息辅助线 #38BDF820。
2. 材质与纹理：细密 CRT 扫描线背景，正交网格（Orthographic Grid），悬浮 3D 棱镜组件与 RGB 色散（Chromatic Aberration）文字抖动。
3. 交互与动效：数据节点之间采用 SVG 贝塞尔曲线动态绘制发光突触流光，鼠标移动时激发周围突触节点的级联高亮与全息光扫掠。
4. 内容模块：Gemini 多模态突触矩阵、千亿级参数认知神经流、跨模态实时信号转译器。`
  },
  {
    id: "04-cyber-observatory",
    num: "04",
    name: "双子深空天文台",
    enName: "Retro Gemini Space Terminal",
    cat: "cyber",
    tags: ["琥珀CRT", "纯等宽", "ASCII艺术", "深空遥测"],
    desc: "90年代复古深空观测站终端，纯等宽字阶、ASCII 徽标与遥测数据流。",
    prompt: `你是一名顶级前端视觉架构师。请以【双子深空天文台】风格为 Gemini 生成深空观测站终端代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 视觉基调：深空真空纯黑 #000000，高照度单色琥珀暖黄 #FFB000（或荧光绿 #00FF66），警示脉冲红 #FF334B。
2. 排版构件：纯等宽字体（JetBrains Mono / Space Mono），ASCII 艺术字大标，工业级机械倒角按钮，坐标刻度标尺，CRT 凸面微弯曲与扫描线。
3. 交互与动效：字符打字机实时吐字动效，光标周期闪烁，十六进制天文遥测数据流高速滚屏与可交互控制台命令（CLI Shell）。
4. 内容叙事：将 Gemini 拟人化为位于日地拉格朗日 L2 点的深空超级智识观测者，实时监测宇宙多模态射线与智慧信号。`
  },
  {
    id: "05-digital-baroque",
    num: "05",
    name: "数字巴洛克·万物感知馆",
    enName: "Digital Baroque & Museum of Senses",
    cat: "art",
    tags: ["烫金浮雕", "天鹅绒暗底", "古典艺术", "3D画框"],
    desc: "古典重工烫金与古典画框景深，文艺复兴美学与现代生成艺术的共鸣。",
    prompt: `你是一名顶级前端视觉架构师。请以【数字巴洛克·万物感知馆】风格为 Gemini 生成艺术馆级个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 调色体系：天鹅绒酒红 #1C060E、暗金墨绿 #061811、巴洛克烫金 #EAB308 与羊皮纸米白 #F5F0E6。
2. 构件与排版：古典装饰衬线字体（Cinzel / Cormorant Garamond），精密烫金浮雕线框，多层古典重工画框与悬浮磨砂玻璃的叠合。
3. 物理微动效：鼠标滑过激发金色粉尘/流光粒子拖尾，画框具备 3D 透视翻转与真实景深光影（Perspective & Box Shadow）。
4. 叙事内容：展示 Gemini 在诗歌、交响乐、古典油画、多模态合成艺术维度的造诣与藏品画廊。`
  },
  {
    id: "06-zen-ethereal",
    num: "06",
    name: "禅境虚实·呼吸留白",
    enName: "Zen Minimalist & Ethereal Ink Flow",
    cat: "minimal",
    tags: ["东方水墨", "极度留白", "呼吸律动", "去噪心流"],
    desc: "极致东方留白与水墨自然晕染，4秒舒缓呼吸光律与心流减噪体验。",
    prompt: `你是一名顶级前端视觉架构师。请以【禅境虚实·呼吸留白】风格为 Gemini 生成宁静冥想态个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩与留白：宣纸柔白 #F8F9FA、松烟黑 #111827，辅以若隐若现的霁蓝 #3B82F6 与月魄微光。
2. 构件设计：极宽广负空间（Negative Space），摒弃一切硬质实线框与浮夸按钮，采用极其柔和的环境渐变遮罩与水墨边缘羽化。
3. 呼吸动效：背景环境光以每 4 秒为周期做类似深呼吸的柔和律动（Breathe In / Out），文字在滚动时如水墨入池般自然晕染显现。
4. 核心心智：呈现 Gemini 无扰、智慧、纯净、如流水般顺应人类心流的“静默助理”形态。`
  },
  {
    id: "07-acid-origami",
    num: "07",
    name: "酸性折纸·高能多维展开",
    enName: "Acid Dimensional Origami",
    cat: "art",
    tags: ["酸性荧光", "3D折叠", "贴纸排版", "潮流先锋"],
    desc: "荧光酸绿与电粉的高能撞色，CSS 3D 折纸展开与弹性碰撞物理。",
    prompt: `你是一名顶级前端视觉架构师。请以【酸性折纸·高能多维展开】风格为 Gemini 生成前卫潮流创作者主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩系统：深冷炭黑 #121216 底色，超高饱和荧光酸绿 #CCFF00、极光电粉 #FF007F、高亮数码青 #00FFFF 撞色。
2. 布局构件：倾斜网格（Skew / Rotate）、粗暴巨型无衬线标题（Syne Heavy / Druk）、潮流贴纸标签与折痕纹理。
3. 3D 折叠物理：卡片支持多段 CSS 3D 折纸展开/收合（Folded Origami UI），带有真实的弹性阻尼物理反馈（Spring Easing）。
4. 品牌人设：代表 Gemini 打破常规、多维重组、跨界生成的年轻潮酷与爆发力。`
  },
  {
    id: "08-spatial-aerofloat",
    num: "08",
    name: "微缩浮岛·空间拟物",
    enName: "Aero Spatial Computing UI",
    cat: "future",
    tags: ["VisionOS", "晶体胶囊", "3D视差", "悬浮投影"],
    desc: "次时代空间计算体验，超清透高折射晶体卡片与 3D 陀螺仪视差倾斜。",
    prompt: `你是一名顶级前端视觉架构师。请以【微缩浮岛·空间拟物】风格为 Gemini 生成次时代空间操作系统主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 材质模型：借鉴 VisionOS 风格的高折射率晶体毛玻璃（backdrop-filter: blur(36px)），双层超柔焦深层阴影（Drop Shadow 40px + Ambient Shadow 80px），精细内反光（Rim Highlight）。
2. 布局构件：大圆角胶囊组件（border-radius: 28px）、浮空悬浮 Dock 栏、分层深度 Z-Index 视界。
3. 视差物理：卡片随鼠标移动实时呈现微小的三维倾角（3D Tilt 视差），光标掠过触发晶体表面高光反射斑跟随。
4. 场景应用：展示 Gemini 在多模态空间计算、眼动/手势意图感知与虚拟空间智能协同能力。`
  },
  {
    id: "09-bioluminescent-abyss",
    num: "09",
    name: "深海冷光·发光仿生",
    enName: "Bioluminescent Abyss Ecology",
    cat: "art",
    tags: ["深海渊黑", "水母冷光", "水下焦散", "发光涟漪"],
    desc: "深海未知物种仿生美学，8000米渊黑与荧蓝自发光，水下焦散微光动效。",
    prompt: `你是一名顶级前端视觉架构师。请以【深海冷光·发光仿生】风格为 Gemini 生成深海智识生态主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩体系：深海冥蓝 #020617 到漆黑 #010409 渐变，水母荧蓝 #38BDF8、深海翡翠冷绿 #34D399 与磷光珊瑚粉 #FB7185 自发光。
2. 构件与纹理：柔性有机水波纹遮罩，水下焦散光斑（Caustics Light）流动层，有机胶囊与半透发光核。
3. 交互与动效：点击触发一圈如水面波纹般向外扩散的荧光涟漪，元素悬停如浮游生物般被水流轻推柔和回弹。
4. 叙事隐喻：将超级 AI 庞大不可见但不断自发光的认知神经，比作深海 8000 米处的自涌发生态系统。`
  },
  {
    id: "10-quantum-lattice",
    num: "10",
    name: "量子矢量·拓扑网阵",
    enName: "Quantum Vector & Lorentz Matrix",
    cat: "cyber",
    tags: ["洛伦兹场", "精密标尺", "超导银蓝", "数学真理"],
    desc: "纯粹算法与数学之美，动态 Canvas 洛伦兹吸引子三维力场与拓扑矩阵。",
    prompt: `你是一名顶级前端视觉架构师。请以【量子矢量·拓扑网阵】风格为 Gemini 生成量子算力与数学美学主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 运算底色：精密碳素黑 #090A0F，矢量光轨超导银蓝 #60A5FA、量子纠缠紫 #C084FC、激光纯白 #FFFFFF。
2. 几何构件：精密坐标角标（如 [37.422, -122.084]）、正交矢量标尺、纯几何 1px 线框卡片与拓扑多边形。
3. 动态物理力场：背景使用 HTML5 Canvas 实时计算并渲染三维洛伦兹吸引子（Lorenz Attractor）或粒子引力场，鼠标交互可扭曲空间度规。
4. 核心主题：呈现 Gemini 在严密逻辑推理、量子矩阵乘法、数理拓扑与终极算力层面的纯粹秩序之美。`
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
