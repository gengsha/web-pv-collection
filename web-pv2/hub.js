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
    prompt: `你是一名顶级前端视觉架构师。请以【墨海千问·文人水墨长卷】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：宣纸白 #F5F1E6 底、松烟墨 #1A1A1A 主字、朱砂红 #B03A2E 为唯一强点缀（印章与关键按钮），墨晕以不同透明度黑色径向渐变呈现。
2. 材质构件：宣纸噪点纹理背景（SVG feTurbulence），水墨晕染边缘，竖排文字（writing-mode: vertical-rl）侧批与装饰列，朱砂印章组件（红底白字圆角方块），细墨线分隔。
3. 字体：Noto Serif SC 主字 + Ma Shan Zheng 书法体展示大字。
4. 交互与微动效：区块入场如卷轴徐徐展开（clip-path 遮罩展开），文字由模糊晕染渐显（水墨入水），canvas 缓慢漂浮的淡墨颗粒，印章悬停"盖章下压"动画。
5. 内容：呈现千问如博学书斋学者的文人气质，含经史子集四部能力卡、竖排题跋数据与问答对诗交互。`
  },
  {
    id: "02-violet-nexus",
    num: "02",
    name: "紫枢星穹·旗舰品牌演化",
    enName: "Violet Nexus · Qwen Flagship",
    cat: "future",
    tags: ["官方品牌紫", "极光流体", "毛玻璃", "星尘粒子"],
    desc: "Qwen 官方品牌紫的深空演化：紫极光流体、毛玻璃与星尘粒子，旗舰级气场。",
    prompt: `你是一名顶级前端视觉架构师。请以【紫枢星穹·旗舰品牌演化】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩令牌：深空紫黑 #0A0616 底、表面 #130F26；品牌渐变 #615CED -> #9B8CFF -> #00D4FF；点缀品红 #FF6AD5；文本 #F4F2FF 与弱文本 #8B87A6。
2. 材质构件：3 颗超大高斯模糊极光光斑（紫/蓝/青，blur 90px+ 缓慢漂移），高透毛玻璃卡片（backdrop-filter: blur(24px)，1px 半透白边），渐变发丝边框，canvas 星尘粒子层。
3. 字体：Space Grotesk 展示 + JetBrains Mono 数据。
4. 交互与微动效：光标视差牵引极光光斑，卡片 spotlight 高光跟随鼠标，Q 形星芒 SVG stroke 描边入场，流光对话舱。
5. 内容：旗舰级全能智能气场，含模型族谱时间线（Qwen -> Qwen2.5 -> QwQ -> Qwen3）、五维能力矩阵与实时遥测条。`
  },
  {
    id: "03-bamboo-sutra-terminal",
    num: "03",
    name: "竹简代码经·亿万卷典籍终端",
    enName: "Bamboo Sutra Terminal",
    cat: "cyber",
    tags: ["竹简竖列", "等宽注经", "青铜框线", "卷轴横滚"],
    desc: "古简与等宽代码同轴：典籍被终端逐字注经，竹简收卷展开、横向成河。",
    prompt: `你是一名顶级前端视觉架构师。请以【竹简代码经·亿万卷典籍终端】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：深檀底 #100C08、竹黄 #C9A063、古铜 #8A6B3F、玉青 #6FA287、朱批 #B04A3A，文本 #E8DCC0。
2. 构件：竖向竹简列（竹纹渐变长条 + 顶部韦编绳结装饰），竖排诗句呈现于简列，青铜双线框与角饰，终端窗口构件（圆点 + 标题栏）。
3. 字体：JetBrains Mono 等宽主体 + Noto Serif SC 典籍大字。
4. 交互与微动效：打字机式吐字典籍与 token 标注流，竹简逐列"收卷展开"入场，横向卷轴区拖拽/滚轮横移，光标周期闪烁。
5. 内容：将千问叙事为"读万卷"的古今同轴典籍终端，含古文逐字注经演示、语料库卷数统计与问策奏对交互。`
  },
  {
    id: "04-lantern-thousand-nights",
    num: "04",
    name: "上元千灯·霓虹灯市",
    enName: "Lantern Festival Nights",
    cat: "art",
    tags: ["千灯升空", "暖金灯市", "灯笼轻摆", "点灯交互"],
    desc: "上元灯会的人间烟火：天灯升空、千灯答千问，暖光呼吸般的高级节庆夜景。",
    prompt: `你是一名顶级前端视觉架构师。请以【上元千灯·霓虹灯市】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：夜青底 #0B0E1F、远山黛 #1B2447；灯暖金 #FFB84D、烛橙 #FF8A3D、朱砂红 #E5484D；月光白文本 #FFF3E0。
2. 构件：CSS 灯笼组件（灯身渐变内透光 + 上下帽 + 流苏），多层远山剪影与明月，串灯光点，摊位卡片暖光描边。
3. 字体：ZCOOL QingKe HuangYou 展示大字 + Noto Sans SC 正文 + IBM Plex Mono 小数据。
4. 交互与微动效：canvas 天灯升空粒子系统（缓升、轻摆、渐远），悬挂灯笼 ±3° 轻摆，点击"点灯"释放一盏带字天灯，暖晕呼吸脉动。
5. 内容：一灯答一问，千灯照长夜——灯市摊位能力区、今夜灯况遥测与点灯许愿交互。`
  },
  {
    id: "05-openweight-forge",
    num: "05",
    name: "开源熔炉·Open Weight Forge",
    enName: "Open Weight Forge",
    cat: "cyber",
    tags: ["熔岩火花", "工业蓝图", "权重金库", "开源精神"],
    desc: "开源锻造厂把模型权重锻造成器：火花迸溅、钢印铆钉，锻造之火分享予天下。",
    prompt: `你是一名顶级前端视觉架构师。请以【开源熔炉·Open Weight Forge】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：铁黑 #0C0C0E、熔橙 #FF6B1A 与熔岩渐变 #FF3D00 -> #FFB347、钢蓝灰 #3E4450、警戒黄 #FFC53D，文本 #F2EFEA。
2. 构件：蓝图网格背景、45° 工业警示斜纹条、权重板条箱卡片（铆钉角饰 + 钢印 stencil 标签 + 金属高光扫掠）、熔炉热度条。
3. 字体：Chakra Petch 工业展示 + JetBrains Mono 数据 + Noto Sans SC。
4. 交互与微动效：canvas 炉口火花粒子（重力下落淡出），悬停金属扫光与火花微迸，下载数 count-up 滚动，区块入场如锻锤落下的短促位移。
5. 内容：开源开放权重精神——权重金库模型卡（参数量/许可证/下载量）、一键取件终端命令与开源影响力数据。`
  },
  {
    id: "06-thought-constellation",
    num: "06",
    name: "思纬星图·推理星座",
    enName: "Thought Constellation",
    cat: "future",
    tags: ["推理星座", "Canvas星图", "逐颗点亮", "顿悟金"],
    desc: "深度推理的每一步皆为一颗星：Canvas 星座逐颗点亮连线，顿悟时刻金色爆亮。",
    prompt: `你是一名顶级前端视觉架构师。请以【思纬星图·推理星座】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：深空藏蓝 #050816、星点青白 #CFF6FF、连线青 #38BDF8 / #4FD1C5、"顿悟"金 #F5C86E，文本 #E6EDF3。
2. 构件：全屏 canvas 星座图（星点闪烁 + 细连线 + 偶发流星），玻璃观测面板，星坐标标签（RA/DEC 式），十字准星与细刻度线。
3. 字体：Outfit 展示 + JetBrains Mono 数据。
4. 交互与微动效：推理链生长动画（节点逐颗点亮、连线逐段画出、终局"顿悟"金色爆亮），鼠标靠近星点点亮放大，推理步骤文本随节点同步浮现。
5. 内容：QwQ 式深度推理叙事——实时推演星图演示、基准成绩星等榜与交互拆解台。`
  },
  {
    id: "07-longriver-tokens",
    num: "07",
    name: "亿万词长河·百万词元长河",
    enName: "Long River of Tokens",
    cat: "art",
    tags: ["字符长河", "时代卷轴", "大海捞针", "百万上下文"],
    desc: "百万级上下文化作长河：字符如波光流动，时代长卷横展，可于词海中大海捞针。",
    prompt: `你是一名顶级前端视觉架构师。请以【亿万词长河·百万词元长河】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：深墨底 #060A0C 至河面青 #0E2A2E 渐变、文字波光 #E8DFC8、高亮青 #7FD8D0、金砂 #D9B36C。
2. 构件：canvas 字符长河（汉字/单词横向漂移 + 正弦浮动 + 波光高光线），时代横向滚动长卷（先秦至深空时代），细金分隔线，涟漪点击反馈。
3. 字体：Noto Serif SC 主字 + JetBrains Mono 数据。
4. 交互与微动效：长河持续流动（requestAnimationFrame），长卷拖拽横移且当前帧微放大，"大海捞针"检索交互点亮河中字符并弹出词元坐标，点击水面涟漪。
5. 内容：百万词元长上下文叙事——时代长卷、大海捞针演示台与河况数据（整河词元/一次可读页数）。`
  },
  {
    id: "08-prism-modalis",
    num: "08",
    name: "通义棱镜·多模态分光",
    enName: "Prism Modalis",
    cat: "future",
    tags: ["白光分光", "亮色极简", "全息虹彩", "发丝线工艺"],
    desc: "一束白光穿棱镜分出七彩模态：亮色极简、发丝线工艺与全息虹彩点缀。",
    prompt: `你是一名顶级前端视觉架构师。请以【通义棱镜·多模态分光】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：近纯白 #FAFBFF 底、墨字 #10121A、发丝线 #E3E7F0，柔和饱和度七彩光谱渐变（#FF5E5B -> #FFB400 -> #3DDC97 -> #3DA5FF -> #7B5CFF -> #FF6AD5），全息 conic 渐变锡纸。
2. 构件：Hero 棱镜分光 SVG（白光入射 -> 七彩谱带散出，谱带呼吸动画），1px 发丝线卡片，彩色折射投影，全息芯片标签，大留白几何网格。
3. 字体：Syne 展示 + Inter 正文 + JetBrains Mono。
4. 交互与微动效：分光光谱带呼吸流动，卡片 3D 微倾斜 + 全息背景随鼠标偏移，导航光谱下划线扫过，"分光台"交互将输入折射为彩色语块。
5. 内容：多模态分光叙事——文本/视觉/音频/视频/代码各为一条光谱带，统一 Tokenizer 可视化与分光台。`
  },
  {
    id: "09-luban-kite-workshop",
    num: "09",
    name: "鲁班机鸢·Agent 工坊",
    enName: "Luban Automata Workshop",
    cat: "art",
    tags: ["榫卯机关", "黄铜齿轮", "木鸢巡游", "装配台"],
    desc: "鲁班木鸢的 Agent 工坊：齿轮随滚动联动，榫卯卡咬合，木鸢沿虚线航迹巡游。",
    prompt: `你是一名顶级前端视觉架构师。请以【鲁班机鸢·Agent 工坊】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：胡桃木底 #17120E、木色 #A97142、黄铜 #D2A24C、铜绿 #4E8577、图纸米 #EFE3C8，文本 #F0E6D2。
2. 构件：榫卯卡（clip-path 缺口咬合造型），黄铜五金（铆钉/角包片），木纹背景（repeating-linear-gradient），虚线图纸航迹，齿轮与机关木鸢 inline SVG。
3. 字体：ZCOOL QingKe HuangYou 标题 + Noto Sans SC 正文 + IBM Plex Mono 工序编号。
4. 交互与微动效：滚动进度驱动齿轮组联动旋转（大小齿轮反向不同速），木鸢沿虚线航迹巡游并轻拍翅膀，工具卡翻盖展开，装配台流水线逐格点亮。
5. 内容：Qwen-Agent 叙事——机关工具墙（检索/代码/日历/浏览器）、装配台工序演示与工坊日志。`
  },
  {
    id: "10-cyber-dunhuang",
    num: "10",
    name: "赛博敦煌·飞天全息",
    enName: "Cyber Dunhuang Hologram",
    cat: "art",
    tags: ["矿物壁画", "飞天飘带", "金箔流光", "全息修复"],
    desc: "敦煌矿物色遇上全息：飞天飘带流动、金箔流光、壁画在扫描线中全息修复。",
    prompt: `你是一名顶级前端视觉架构师。请以【赛博敦煌·飞天全息】风格为 Qwen（通义千问）生成个人主页代码（HTML+CSS+JS）。
设计规范与美学基因：
1. 色彩：岩壁暗底 #1A1410，矿物颜料石青 #2A6F97、石绿 #3E8E7E、土红 #C1543C、赭黄 #D9A441、金箔 #E8C87A，文本 #F3E9D2。
2. 构件：壁画噪点与裂纹肌理，多层同心背光光环，canvas 飞天渐变飘带，金箔流光扫过，全息修复扫描线。
3. 字体：Noto Serif SC 主字 + Ma Shan Zheng 题记 + Cormorant Garamond 拉丁点缀。
4. 交互与微动效：飞天飘带（2~3 条平滑贝塞尔色带）持续流动，背光缓慢旋转 + 金粉粒子上升，壁画卡悬停触发"全息修复"（色彩增强 + 扫描线掠过），区块入场如窟门双开。
5. 内容：敦煌文化 × AI 全息叙事——壁画殿能力廊（九色鹿=视觉、飞天=生成、琵琶=语音、狮舞=智能体）、修复台交互与传承遥测。`
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
