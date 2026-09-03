// Preset 09 · Neon Rain Alley — 双档切换 / 雨滴涟漪 / 巷口对讲机
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '每层 K/V 各 4096×768，共 24 组 → 75,497,472 元素'],
      ['0.09s', 'FP16 × 2 字节 → 约 144 MB；batch=8 约 1.13 GB'],
      ['0.18s', '输出：单条 ≈144 MB（未计激活值与框架开销）']
    ],
    meta: { tok: '96', lat: '0.18s', step: '3' }
  },
  deep: {
    rows: [
      ['0.4s', '建模：KV = 层数 × 2 × 序列长 × 隐藏维 × 精度字节'],
      ['1.6s', '代值：12 × 2 × 4096 × 768 = 75,497,472 元素'],
      ['2.9s', '换算：×2B = 150,994,944 B ≈ 0.1406 GB ≈ 144 MB'],
      ['4.1s', '扩展：batch=8 → 约 1.125 GB'],
      ['5.3s', '自校验：GQA 按 kv_heads 缩减，此处为 MHA 上界'],
      ['6.4s', '结论：单条 ≈144 MB；GQA(8) 可降至 ≈18 MB/条']
    ],
    meta: { tok: '1,840', lat: '6.40s', step: '6' }
  }
};

const REPLIES = [
  '收到。结论先说：可以，改两处就够 —— 过程我留在深档里。',
  '拨到深档：六步推演 + 末尾自校，大约 6.4 秒。',
  '仓库看过了，改动集中在三个文件，测试一并补齐。',
  '四路并行检索后汇总，比串行少三轮往返。',
  '提醒：这个规模下 KV Cache 会先于权重顶到显存上限。'
];

// 双档切换
const swBtns = document.querySelectorAll('.big-switch');
const traceBox = document.getElementById('traceBox');
const mTok = document.getElementById('mTok');
const mLat = document.getElementById('mLat');
const mStep = document.getElementById('mStep');

function render(mode) {
  const d = TRACES[mode];
  traceBox.innerHTML = '';
  d.rows.forEach(([t, txt], i) => {
    const row = document.createElement('div');
    row.className = 't-row' + (i === d.rows.length - 1 ? ' final' : '');
    row.style.animationDelay = `${i * 80}ms`;
    row.innerHTML = `<span class="t-time">${t}</span><span class="t-txt">${txt}</span>`;
    traceBox.appendChild(row);
  });
  mTok.textContent = d.meta.tok;
  mLat.textContent = d.meta.lat;
  mStep.textContent = d.meta.step;
}
swBtns.forEach(b => b.addEventListener('click', () => {
  swBtns.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  render(b.dataset.mode);
}));
render('instant');

// 雨滴涟漪：点击任意位置
document.addEventListener('click', e => {
  const r = document.createElement('span');
  const size = 120 + Math.random() * 90;
  r.className = 'ripple';
  r.style.width = `${size}px`;
  r.style.height = `${size * 0.5}px`;
  r.style.left = `${e.clientX}px`;
  r.style.top = `${e.clientY}px`;
  document.body.appendChild(r);
  requestAnimationFrame(() => r.classList.add('go'));
  setTimeout(() => r.remove(), 1100);
});

// 倒影随光标横向偏移
const title = document.querySelector('.neon-title');
window.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 10;
  title.style.setProperty('--refl', `${cx}px`);
}, { passive: true });

// 对讲机
const log = document.getElementById('icLog');
const input = document.getElementById('icInput');
const send = document.getElementById('icSend');
let idx = 0;

function push(who, txt, isMe) {
  const row = document.createElement('div');
  row.className = 'ic-row' + (isMe ? ' me' : '');
  row.innerHTML = `<span class="ic-who">${who}</span><span class="ic-txt">${txt}</span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function talk() {
  const v = input.value.trim();
  if (!v) return;
  push('YOU', v, true);
  input.value = '';
  setTimeout(() => push('hy4', REPLIES[idx++ % REPLIES.length], false), 600);
}
send.addEventListener('click', talk);
input.addEventListener('keydown', e => { if (e.key === 'Enter') talk(); });

// 分数条
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
document.querySelectorAll('.s-bar i').forEach(b => io.observe(b));

// 导航
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaSigns').addEventListener('click', () =>
  document.getElementById('signs').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaSwitch').addEventListener('click', () => {
  document.getElementById('switch').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => swBtns[1].click(), 700);
});
document.getElementById('ctaTalk').addEventListener('click', () => {
  document.getElementById('intercom').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => input.focus(), 700);
});
