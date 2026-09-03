// Preset 01 · Liquid Chrome — 镜面高光跟随 / 液态推理流 / 对话终端
const TRACES = {
  instant: {
    lines: [
      ['0.02s', '每层 K/V 各 4096×768，共 2×12 组矩阵 → 75,497,472 元素'],
      ['0.09s', 'FP16 单元素 2 字节 → 约 144 MB；批量 8 时约 1.13 GB'],
      ['0.18s', '答案：单条约 144 MB，批量 8 约 1.13 GB（未计入激活值与框架开销）']
    ],
    meta: { tokens: '96', latency: '0.18s', steps: '3' }
  },
  deep: {
    lines: [
      ['0.4s', '解析问题：KV Cache = 层数 × 2(K,V) × 序列长 × 隐藏维 × 精度字节'],
      ['1.6s', '代值：12 × 2 × 4096 × 768 = 75,497,472 → FP16 下 150,994,944 B'],
      ['2.9s', '换算：除以 1024³ ≈ 0.1406 GB ≈ 144 MB（单条序列）'],
      ['4.1s', '批处理扩展：batch=8 → 144 MB × 8 ≈ 1.125 GB'],
      ['5.3s', '误差校验：GQA 分组查询会按 kv_heads 缩减，此处按 MHA 上界估算'],
      ['6.4s', '结论：单条 ≈144 MB；batch=8 ≈1.13 GB；若启用 GQA(8 heads) 可降至约 18 MB/条']
    ],
    meta: { tokens: '1,840', latency: '6.4s', steps: '6' }
  }
};

const REPLIES = [
  '收到。我先给出结论，再补上可验证的推导过程 —— 需要我展开哪一部分？',
  '已进入 Deep Think。这个任务我会拆成三步：先定位约束，再枚举方案，最后给出取舍建议。',
  '已读取上下文。你这份代码库的命名约定我沿用了，改动集中在三个文件。',
  '可以。并行发起 4 路检索后我再汇总，能省掉三轮往返。',
  '提示：这个规模下 KV Cache 会先于权重成为瓶颈，建议先启用 GQA 再谈批处理。'
];

// 镜面高光跟随
document.querySelectorAll('[data-spotlight]').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// 卡片轻微 3D 倾斜
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// 混合推理模式切换
const modeBtns = document.querySelectorAll('.mode-btn');
const thumb = document.getElementById('switchThumb');
const traceBox = document.getElementById('traceBox');
const metaTokens = document.getElementById('metaTokens');
const metaLatency = document.getElementById('metaLatency');
const metaSteps = document.getElementById('metaSteps');

function moveThumb(btn) {
  thumb.style.width = `${btn.offsetWidth}px`;
  thumb.style.transform = `translateX(${btn.offsetLeft - 5}px)`;
}

function renderTrace(mode) {
  const data = TRACES[mode];
  traceBox.innerHTML = '';
  data.lines.forEach(([time, txt], i) => {
    const div = document.createElement('div');
    div.className = 'trace-line' + (i === data.lines.length - 1 ? ' final' : '');
    div.style.animationDelay = `${i * 90}ms`;
    div.innerHTML = `<span class="t-time">${time}</span><span class="t-txt">${txt}</span>`;
    traceBox.appendChild(div);
  });
  metaTokens.textContent = data.meta.tokens;
  metaLatency.textContent = data.meta.latency;
  metaSteps.textContent = data.meta.steps;
}

modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    moveThumb(btn);
    renderTrace(btn.dataset.mode);
  });
});

window.addEventListener('load', () => {
  const first = document.querySelector('.mode-btn.active');
  if (first) { moveThumb(first); renderTrace(first.dataset.mode); }
});
window.addEventListener('resize', () => {
  const active = document.querySelector('.mode-btn.active');
  if (active) moveThumb(active);
});

// 对话终端
const log = document.getElementById('consoleLog');
const input = document.getElementById('consoleInput');
const sendBtn = document.getElementById('consoleSend');
let replyIdx = 0;

function pushLine(who, text, isMe) {
  const div = document.createElement('div');
  div.className = 'line' + (isMe ? ' me' : '');
  div.innerHTML = `<span class="who">${who}</span><span class="txt">${text}</span>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function send() {
  const val = input.value.trim();
  if (!val) return;
  pushLine('you', val, true);
  input.value = '';
  const reply = REPLIES[replyIdx % REPLIES.length];
  replyIdx++;
  setTimeout(() => pushLine('hy4', reply, false), 520);
}
sendBtn.addEventListener('click', send);
input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });

// 评测条入场动画
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.bar i').forEach(b => io.observe(b));

// 导航平滑滚动高亮
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('ctaExplore')?.addEventListener('click', () =>
  document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaBench')?.addEventListener('click', () =>
  document.getElementById('bench').scrollIntoView({ behavior: 'smooth' }));
