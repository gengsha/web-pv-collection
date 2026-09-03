// Preset 02 · Neo-Brutalist — 硬边交互 / 推理模式切换 / 终端
const TRACES = {
  instant: {
    meta: 'STEPS 03 · 96 TOK · 0.18s',
    rows: [
      ['0.02s', '每层 K/V 各 4096×768，共 2×12 组 → 75,497,472 元素'],
      ['0.09s', 'FP16 × 2 字节 → 约 144 MB；batch=8 约 1.13 GB'],
      ['0.18s', '输出结论：单条 ≈144 MB（未计激活值与框架开销）']
    ]
  },
  deep: {
    meta: 'STEPS 06 · 1,840 TOK · 6.40s',
    rows: [
      ['0.4s', '建模：KV = 层数 × 2 × 序列长 × 隐藏维 × 精度字节'],
      ['1.6s', '代值：12 × 2 × 4096 × 768 = 75,497,472 元素'],
      ['2.9s', '换算：× 2B = 150,994,944 B ≈ 0.1406 GB ≈ 144 MB'],
      ['4.1s', '扩展：batch=8 → 144 MB × 8 ≈ 1.125 GB'],
      ['5.3s', '自校验：GQA 会按 kv_heads 缩减，当前为 MHA 上界'],
      ['6.4s', '结论：单条 ≈144 MB；batch=8 ≈1.13 GB；启用 GQA(8) 降至 ≈18 MB/条']
    ]
  }
};

const REPLIES = [
  '收到。先给结论，再给可验证推导 —— 要展开哪一步？',
  '切到 DEEP。这个任务我拆成三段：定位约束、枚举方案、给出取舍。',
  '仓库约定已读取，改动集中在三个文件，测试我一并补上了。',
  '并行发起 4 路检索后汇总，能省掉三轮往返。',
  '这个规模下 KV Cache 会先于权重成为瓶颈，先上 GQA 再谈批处理。'
];

// 推理模式切换
const slabs = document.querySelectorAll('.mode-slab');
const traceBody = document.getElementById('traceBody');
const traceMeta = document.getElementById('traceMeta');

function renderTrace(mode) {
  const data = TRACES[mode];
  traceMeta.textContent = data.meta;
  traceBody.innerHTML = '';
  data.rows.forEach(([time, txt], i) => {
    const row = document.createElement('div');
    row.className = 't-row' + (i === data.rows.length - 1 ? ' final' : '');
    row.style.animationDelay = `${i * 70}ms`;
    row.innerHTML = `<span class="t-time">${time}</span><span class="t-txt">${txt}</span>`;
    traceBody.appendChild(row);
  });
}

slabs.forEach(slab => {
  slab.addEventListener('click', () => {
    slabs.forEach(s => s.classList.remove('active'));
    slab.classList.add('active');
    renderTrace(slab.dataset.mode);
  });
});
renderTrace('instant');

// 终端
const log = document.getElementById('consoleLog');
const input = document.getElementById('consoleInput');
const send = document.getElementById('consoleSend');
let idx = 0;

function push(who, txt, isMe) {
  const el = document.createElement('div');
  el.className = 'line' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="who ${isMe ? 'me' : 'bot'}">${who}</span><span class="txt">${txt}</span>`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function run() {
  const v = input.value.trim();
  if (!v) return;
  push('you', v, true);
  input.value = '';
  setTimeout(() => push('hy4', REPLIES[idx++ % REPLIES.length], false), 480);
}
send.addEventListener('click', run);
input.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });

// 评测条填充
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

// 导航锚点
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('ctaCap').addEventListener('click', () =>
  document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaCon').addEventListener('click', () => {
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => input.focus(), 600);
});

// 跑马灯：鼠标悬停暂停
const track = document.getElementById('marqueeTrack');
document.querySelector('.marquee').addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
document.querySelector('.marquee').addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
