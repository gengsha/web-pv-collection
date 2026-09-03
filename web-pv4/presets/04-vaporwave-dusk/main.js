// Preset 04 · Vaporwave Dusk — 双卡带换轨 / VU 电平 / 直播热线
const TRACES = {
  instant: {
    meta: 'TRACK 01 · 96 TOK · 0.18s',
    rows: [
      ['0.02s', '每层 K/V 各 4096×768，共 24 组 → 75,497,472 元素'],
      ['0.09s', 'FP16 × 2 字节 → 约 144 MB；batch=8 约 1.13 GB'],
      ['0.18s', '输出：单条 ≈144 MB（未计激活值与框架开销）']
    ]
  },
  deep: {
    meta: 'TRACK 02 · 1,840 TOK · 6.40s',
    rows: [
      ['0.4s', '建模：KV = 层数 × 2 × 序列长 × 隐藏维 × 精度字节'],
      ['1.6s', '代值：12 × 2 × 4096 × 768 = 75,497,472 元素'],
      ['2.9s', '换算：×2B = 150,994,944 B ≈ 0.1406 GB ≈ 144 MB'],
      ['4.1s', '扩展：batch=8 → 约 1.125 GB'],
      ['5.3s', '自校验：GQA 按 kv_heads 缩减，此处为 MHA 上界'],
      ['6.4s', '结论：单条 ≈144 MB；GQA(8) 可降至 ≈18 MB/条']
    ]
  }
};

const REPLIES = [
  '信号收到。结论先行，推导放在 SIDE B —— 要我翻面吗？',
  '已切到 DEEP：六步推演，末尾附自校验，磁带正在慢放。',
  '仓库约定已读取，改动集中在三个文件，测试一并补齐。',
  '四路检索并行汇总，比串行少三轮往返。',
  '注意：这个规模下 KV Cache 会先于权重成为瓶颈。'
];

// 换轨
const trackBtns = document.querySelectorAll('.track-btn');
const traceBody = document.getElementById('traceBody');
const deckMeta = document.getElementById('deckMeta');

function renderTrace(mode) {
  const data = TRACES[mode];
  deckMeta.textContent = data.meta;
  traceBody.innerHTML = '';
  data.rows.forEach(([time, txt], i) => {
    const row = document.createElement('div');
    row.className = 't-row' + (i === data.rows.length - 1 ? ' final' : '');
    row.style.animationDelay = `${i * 80}ms`;
    row.innerHTML = `<span class="t-time">${time}</span><span class="t-txt">${txt}</span>`;
    traceBody.appendChild(row);
  });
}
trackBtns.forEach(btn => btn.addEventListener('click', () => {
  trackBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTrace(btn.dataset.mode);
}));
renderTrace('instant');

// VU 电平抖动
const vuBars = document.querySelectorAll('.vu i');
setInterval(() => {
  const level = 4 + Math.floor(Math.random() * 8);
  vuBars.forEach((b, i) => b.classList.toggle('on', i < level));
}, 220);

// 时间码
const timeCode = document.getElementById('timeCode');
let sec = 0;
setInterval(() => {
  sec = (sec + 1) % 86400;
  const h = String(Math.floor(sec / 3600)).padStart(2, '0');
  const m = String(Math.floor(sec / 60) % 60).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  timeCode.textContent = `${h}:${m}:${s}`;
}, 1000);

// 直播热线
const log = document.getElementById('consoleLog');
const input = document.getElementById('consoleInput');
const sendBtn = document.getElementById('consoleSend');
let idx = 0;

function push(who, text, isMe) {
  const el = document.createElement('div');
  el.className = 'line' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="who">${who}</span><span class="txt">${text}</span>`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}
function send() {
  const v = input.value.trim();
  if (!v) return;
  push('YOU', v, true);
  input.value = '';
  setTimeout(() => push('HY4', REPLIES[idx++ % REPLIES.length], false), 560);
}
sendBtn.addEventListener('click', send);
input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

// 评分条
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
document.querySelectorAll('.b-bar i').forEach(b => io.observe(b));

// 视差：落日与棕榈随光标轻微移动
const sun = document.querySelector('.sun');
const palms = document.querySelectorAll('.palm');
window.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth - 0.5);
  const cy = (e.clientY / window.innerHeight - 0.5);
  sun.style.transform = `translate(calc(-50% + ${cx * 22}px), calc(-50% + ${cy * 16}px))`;
  palms.forEach((p, i) => {
    p.style.transform = `translateX(${cx * (i ? -26 : 26)}px) ${i ? 'scaleX(-1)' : ''}`;
  });
}, { passive: true });

// 导航锚点
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaMatrix').addEventListener('click', () =>
  document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaReasoning').addEventListener('click', () => {
  document.querySelectorAll('.track-btn')[1].click();
  document.getElementById('reasoning').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('playBtn').addEventListener('click', () =>
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' }));
