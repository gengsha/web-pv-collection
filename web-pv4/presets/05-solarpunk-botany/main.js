// Preset 05 · Solarpunk Botany — 代谢模式 / 叶片摆动 / 园艺笔记
const MODES = {
  photo: {
    tag: 'PHOTOSYNTHESIS',
    title: '光合：捕光即答',
    desc: '捕捉到光照就直接转化为糖分。短路径、低消耗，适合事实查询、格式转换与明确指令。',
    list: [
      '路径长度：1–3 步，几乎不分叉',
      '能量消耗：约 96 tokens，0.18s 出糖',
      '适合：检索、改写、格式化、短代码补全'
    ],
    tok: '96', lat: '0.18s', yield: '高频',
    ring: 0.32
  },
  respi: {
    tag: 'RESPIRATION',
    title: '呼吸：夜里慢想',
    desc: '在暗中把储备慢慢分解。长路径、多分支，会在结尾做一次自校验，把误差留在夜里消化掉。',
    list: [
      '路径长度：6 步以上，允许自我否定与回溯',
      '能量消耗：约 1,840 tokens，6.4s 出结果',
      '适合：数学推导、架构设计、长文结构与复杂重构'
    ],
    tok: '1,840', lat: '6.40s', yield: '高质',
    ring: 0.95
  }
};

const REPLIES = [
  '种子收到了。这个土壤偏酸，建议先把依赖理清再种 —— 我给三条路径。',
  '切到呼吸模式：慢一点，但我会在结尾自己验算一遍。',
  '仓库的根系已经摸清，改动集中在三个文件，测试一并补上。',
  '并行 4 路检索后汇总，比串行少三轮往返，省水省肥。',
  '提醒：这个规模下 KV Cache 会先于权重成为瓶颈。'
];

// 代谢模式切换
const btns = document.querySelectorAll('.meta-btn');
const thumb = document.getElementById('metaThumb');
const ring = document.getElementById('metaRing');
const el = {
  tag: document.getElementById('metaTag'),
  title: document.getElementById('metaTitle'),
  desc: document.getElementById('metaDesc'),
  list: document.getElementById('metaList'),
  tok: document.getElementById('metaTok'),
  lat: document.getElementById('metaLat'),
  yield: document.getElementById('metaYield')
};

function applyMode(mode) {
  const m = MODES[mode];
  el.tag.textContent = m.tag;
  el.title.textContent = m.title;
  el.desc.textContent = m.desc;
  el.list.innerHTML = m.list.map(i => `<li>${i}</li>`).join('');
  el.tok.textContent = m.tok;
  el.lat.textContent = m.lat;
  el.yield.textContent = m.yield;
  ring.style.strokeDashoffset = String(540 * (1 - m.ring));
}

function moveThumb(btn) {
  thumb.style.width = `${btn.offsetWidth}px`;
  thumb.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
}

btns.forEach(btn => btn.addEventListener('click', () => {
  btns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  moveThumb(btn);
  applyMode(btn.dataset.mode);
}));

window.addEventListener('load', () => {
  const first = document.querySelector('.meta-btn.active');
  moveThumb(first);
  applyMode(first.dataset.mode);
});
window.addEventListener('resize', () => {
  const active = document.querySelector('.meta-btn.active');
  if (active) moveThumb(active);
});

// 叶片随光标摆动 + 光斑跟随
const swayEls = document.querySelectorAll('[data-sway]');
window.addEventListener('mousemove', e => {
  const cx = e.clientX / window.innerWidth - 0.5;
  swayEls.forEach(card => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--gx', `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty('--gy', `${((e.clientY - r.top) / r.height) * 100}%`);
    card.style.transform = `rotate(${cx * 1.6}deg) translateY(${-Math.abs(cx) * 4}px)`;
  });
  document.querySelectorAll('.leaf-deco').forEach((d, i) => {
    d.style.transform = `rotate(${cx * (i ? -4 : 4)}deg)`;
  });
}, { passive: true });

// 园艺笔记
const log = document.getElementById('notesLog');
const input = document.getElementById('notesInput');
const sendBtn = document.getElementById('notesSend');
let idx = 0;

function push(from, text, isMe) {
  const el = document.createElement('div');
  el.className = 'note' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="n-from">${from}</span><p>${text}</p>`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}
function plant() {
  const v = input.value.trim();
  if (!v) return;
  push('你 · 播种', v, true);
  input.value = '';
  setTimeout(() => push('hy4 · 温室日志', REPLIES[idx++ % REPLIES.length], false), 640);
}
sendBtn.addEventListener('click', plant);
input.addEventListener('keydown', e => { if (e.key === 'Enter') plant(); });

// 产出条
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const bar = en.target;
      bar.style.setProperty('--w', bar.dataset.w);
      bar.classList.add('fill');
      io.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.y-bar i').forEach(b => io.observe(b));

// 导航
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaSpec').addEventListener('click', () =>
  document.getElementById('specimens').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaMeta').addEventListener('click', () => {
  document.getElementById('metabolism').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => btns[1].click(), 700);
});
document.getElementById('ctaPlant').addEventListener('click', () => {
  document.getElementById('notes').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => input.focus(), 700);
});
