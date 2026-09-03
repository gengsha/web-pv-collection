// Preset 08 · Isometric Blueprint — 描线生长 / 通路切换 / 图纸终端
const REPLIES = [
  '变更请求已受理。结论：可实施，改动两处，已附注公差。',
  '已切至通路 B：六跳 + 回授自校，预计 6.40s 出图。',
  '仓库结构已解析，改动集中在三个文件，测试一并生成。',
  '并行八路执行，较串行少三轮往返。',
  '提示：此规模下 KV Cache 将先于权重触顶，建议改用 GQA。'
];

const FLOW_STAT = {
  instant: 'A · 1 HOP · 96 TOK · 0.18s',
  deep: 'B · 6 HOPS + FEEDBACK · 1,840 TOK · 6.40s'
};

// 描线生长：按元素顺序错开延迟
document.querySelectorAll('.iso-main .ln').forEach((el, i) => {
  el.style.animationDelay = `${300 + i * 55}ms`;
});
document.querySelectorAll('.iso-mini .ln').forEach((el, i) => {
  el.style.animationDelay = `${i * 40}ms`;
});

// 拖拽微调等轴测视角
const isoMain = document.querySelector('.iso-main');
let dragging = false, startX = 0, angle = 0;
isoMain.addEventListener('mousedown', e => { dragging = true; startX = e.clientX; isoMain.style.cursor = 'grabbing'; });
window.addEventListener('mouseup', () => { dragging = false; isoMain.style.cursor = 'grab'; });
window.addEventListener('mousemove', e => {
  if (!dragging) return;
  angle = Math.max(-12, Math.min(12, (e.clientX - startX) * 0.08));
  isoMain.style.transform = `rotate(${angle}deg)`;
});
isoMain.style.cursor = 'grab';
isoMain.addEventListener('dblclick', () => { angle = 0; isoMain.style.transform = 'rotate(0deg)'; });

// 通路切换
const flBtns = document.querySelectorAll('.fl-btn');
const flStat = document.getElementById('flStat');
flBtns.forEach(btn => btn.addEventListener('click', () => {
  flBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const mode = btn.dataset.mode;
  document.querySelector('.path.instant').classList.toggle('muted', mode !== 'instant');
  document.querySelector('.path.deep').classList.toggle('muted', mode !== 'deep');
  flStat.textContent = FLOW_STAT[mode];
}));

// 图纸终端
const log = document.getElementById('termLog');
const input = document.getElementById('termInput');
const send = document.getElementById('termSend');
let n = 1, idx = 0;

function push(who, txt, isMe) {
  const row = document.createElement('div');
  row.className = 'trow' + (isMe ? ' me' : '');
  row.innerHTML = `<span class="t-id">[${String(n++).padStart(3, '0')}]</span><span class="t-who">${who}</span><span class="t-txt">${txt}</span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function exec() {
  const v = input.value.trim();
  if (!v) return;
  push('USER', v, true);
  input.value = '';
  setTimeout(() => push('HY4', REPLIES[idx++ % REPLIES.length], false), 520);
}
send.addEventListener('click', exec);
input.addEventListener('keydown', e => { if (e.key === 'Enter') exec(); });

// 规格条
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const bar = en.target;
      bar.style.setProperty('--w', bar.dataset.w);
      bar.classList.add('fill');
      io.unobserve(bar);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.gbar i').forEach(b => io.observe(b));

// 构件 hover 时显示图号提示
document.querySelectorAll('.part-card').forEach((card, i) => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = `0 0 0 1px rgba(79,195,247,.5), 0 12px 30px rgba(0,0,0,.4)`;
  });
  card.addEventListener('mouseleave', () => { card.style.boxShadow = ''; });
});

// 导航
document.querySelectorAll('.dn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.dn').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaAsm').addEventListener('click', () =>
  document.getElementById('assemblies').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaFlow').addEventListener('click', () => {
  document.getElementById('flow').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => document.querySelectorAll('.fl-btn')[1].click(), 700);
});
