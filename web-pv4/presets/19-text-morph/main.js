/* ============================================================
   Preset 19 · Text Morph Matrix
   文字 → alpha 掩码采样 → 目标点云 → 弹簧归位 + 鼠标斥力
   ============================================================ */
const cv = document.getElementById('morph');
const ctx = cv.getContext('2d');
const off = document.createElement('canvas');
const octx = off.getContext('2d', { willReadFrequently: true });

let W = 0, H = 0;
const WORDS = ['HY4', 'INSTANT', 'DEEP', '256K', '×8'];
let wordIdx = 0;
let targets = [];
let px, py, vx, vy, n = 4000;
let spring = 0.06, damp = 0.86, scatter = 1.0, trail = 0;
let mx = -999, my = -999;
let nextAt = performance.now() + 4200;

const WORD_FONT = '"Manrope", "Arial Black", sans-serif';

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = Math.floor(W * dpr);
  cv.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  sample(WORDS[wordIdx]);
  build(n);
}
window.addEventListener('resize', resize);

/* ---------- 文字 → 目标点 ---------- */
function sample(word) {
  const ow = 320, oh = 90;
  off.width = ow; off.height = oh;
  octx.clearRect(0, 0, ow, oh);
  octx.fillStyle = '#fff';

  let size = 72;
  octx.font = `800 ${size}px ${WORD_FONT}`;
  let tw = octx.measureText(word).width;
  if (tw > ow * 0.92) {
    size = Math.floor(size * (ow * 0.92) / tw);
    octx.font = `800 ${size}px ${WORD_FONT}`;
  }
  octx.textAlign = 'center';
  octx.textBaseline = 'middle';
  octx.fillText(word, ow / 2, oh / 2);

  const data = octx.getImageData(0, 0, ow, oh).data;
  targets = [];
  const stride = 2;                                   // 采样步距
  for (let y = 0; y < oh; y += stride) {
    for (let x = 0; x < ow; x += stride) {
      if (data[(y * ow + x) * 4 + 3] > 128) {
        targets.push([
          (x / ow - 0.5) * W * 0.86 + W / 2,
          (y / oh - 0.5) * (W * 0.86) * (oh / ow) + H * 0.46
        ]);
      }
    }
  }
}

/* ---------- 粒子池 ---------- */
function build(count) {
  n = count;
  px = new Float32Array(n);
  py = new Float32Array(n);
  vx = new Float32Array(n);
  vy = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    px[i] = Math.random() * W;
    py[i] = Math.random() * H;
    vx[i] = 0; vy[i] = 0;
  }
  document.getElementById('hPts').textContent = n.toLocaleString('en-US');
}

function reassign() {
  if (!targets.length) return;
  document.getElementById('hNext').textContent =
    WORDS[(wordIdx + 1) % WORDS.length];
}

function nextWord(word) {
  if (word) { WORDS[wordIdx] = word; }               // 覆写当前词
  sample(WORDS[wordIdx]);
  reassign();
}

/* ---------- 物理 ---------- */
function step() {
  const T = targets;
  const tn = T.length;
  for (let i = 0; i < n; i++) {
    const t = T[i % tn] || [W / 2, H / 2];
    const dx = px[i] - mx, dy = py[i] - my;
    const d2 = dx * dx + dy * dy;

    // 鼠标斥力
    if (d2 < 16900) {                                 // 130px²
      const d = Math.sqrt(d2) || 1;
      const f = (1 - d / 130) * 2.6 * scatter;
      vx[i] += dx / d * f;
      vy[i] += dy / d * f;
    }

    // 弹簧归位
    vx[i] += (t[0] - px[i]) * spring;
    vy[i] += (t[1] - py[i]) * spring;
    vx[i] *= damp; vy[i] *= damp;
    px[i] += vx[i]; py[i] += vy[i];
  }
}

/* ---------- 渲染 ---------- */
function draw() {
  if (trail > 0) {
    ctx.fillStyle = `rgba(0, 0, 0, ${trail})`;
    ctx.fillRect(0, 0, W, H);
  } else {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);
  }

  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < n; i++) {
    const sp = Math.min(1, (Math.abs(vx[i]) + Math.abs(vy[i])) * 0.16);
    // 快速移动的粒子带电光蓝，静止的接近纯白
    const r = 200 + Math.round(sp * 55);
    const g = 210 + Math.round(sp * 45);
    const b = 255;
    ctx.fillStyle = `rgba(${r},${g},${b},${0.55 + sp * 0.45})`;
    ctx.fillRect(px[i], py[i], 1.6, 1.6);
  }
  ctx.globalCompositeOperation = 'source-over';
}

let frames = 0, fpsT = performance.now();
function loop(now) {
  if (now > nextAt) {                                 // 自动轮播
    wordIdx = (wordIdx + 1) % WORDS.length;
    nextWord();
    nextAt = now + 4200;
  }
  step();
  draw();
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}

/* ---------- 交互 ---------- */
cv.addEventListener('mousemove', e => {
  const r = cv.getBoundingClientRect();
  mx = e.clientX - r.left; my = e.clientY - r.top;
}, { passive: true });
cv.addEventListener('mouseleave', () => { mx = -999; my = -999; });
cv.addEventListener('click', () => {
  wordIdx = (wordIdx + 1) % WORDS.length;
  nextWord();
  nextAt = performance.now() + 4200;
});

/* ============ 形变控制 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '离屏 320×90 绘制字形 → getImageData 按 alpha>128 采样'],
      ['0.09s', '步距 2px，4,000 粒子按 i % targets.length 认领目标'],
      ['0.18s', '弹簧 k=0.06 / 阻尼 0.86 —— 硬弹簧，迅速就位']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '粒子扩容到 9,000，弹簧放软到 k=0.02，阻尼 0.91'],
      ['1.6s', '拖尾开启：每帧 rgba(0,0,0,0.18) 覆盖，形成运动残影'],
      ['2.9s', '速度映射亮度：快速粒子带电光蓝，静止粒子纯白'],
      ['4.1s', '鼠标 130px 斥力场，f = (1−d/130)·2.6·scatter'],
      ['5.3s', '自校验：与 20,000 粒子基准对比，字形重合度 > 96%'],
      ['6.4s', '输出：可见的形变过程 + 电光拖尾 + 词间流动']
    ]
  }
};
const modeBtns = document.querySelectorAll('.mode');
const traceBox = document.getElementById('traceBox');

function renderTrace(mode) {
  traceBox.innerHTML = '';
  TRACES[mode].rows.forEach(([t, txt], i) => {
    const row = document.createElement('div');
    row.className = 'tr' + (i === TRACES[mode].rows.length - 1 ? ' fin' : '');
    row.style.animationDelay = `${i * 70}ms`;
    row.innerHTML = `<span class="tt">${t}</span><span class="tx">${txt}</span>`;
    traceBox.appendChild(row);
  });
}
modeBtns.forEach(b => b.addEventListener('click', () => {
  modeBtns.forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  const deep = b.dataset.mode === 'deep';
  spring = deep ? 0.02 : 0.06;
  damp = deep ? 0.91 : 0.86;
  trail = deep ? 0.18 : 0;
  build(deep ? 9000 : 4000);
  document.getElementById('hSpring').textContent = spring.toFixed(2);
  document.getElementById('sSpring').value = Math.round(spring * 100);
  document.getElementById('vSpring').textContent = spring.toFixed(2);
  document.getElementById('vpMeta').textContent = deep
    ? 'SPRING 0.02 · TRAILS ON · 9,000 PTS'
    : 'SPRING 0.06 · NO TRAILS';
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sSpring').addEventListener('input', e => {
  spring = e.target.value / 100;
  document.getElementById('vSpring').textContent = spring.toFixed(2);
  document.getElementById('hSpring').textContent = spring.toFixed(2);
});
document.getElementById('sScat').addEventListener('input', e => {
  scatter = e.target.value / 100;
  document.getElementById('vScat').textContent = scatter.toFixed(1);
});
document.getElementById('ctaMorph').addEventListener('click', () => {
  // 打乱重排：给所有粒子一个随机初速
  for (let i = 0; i < n; i++) {
    vx[i] += (Math.random() - 0.5) * 26;
    vy[i] += (Math.random() - 0.5) * 26;
  }
});

/* ============ 用粒子说话 ============ */
const REPLIES = [
  '上屏了。字形重合度取决于目标点密度，字越大点越多。',
  '切到软弹簧：你能看到粒子从旧词流向新词的全过程。',
  '仓库读完了，改动集中在三个文件，测试一并补上。',
  '四路并行执行，比串行少三轮往返。',
  '提示：这个规模下 KV Cache 会先于权重顶到显存上限。'
];
const log = document.getElementById('logBox');
const wordInput = document.getElementById('wordInput');
let ri = 0;
function push(who, txt, isMe) {
  const el = document.createElement('div');
  el.className = 'row' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="who">${who}</span><span class="txt">${txt}</span>`;
  log.appendChild(el); log.scrollTop = log.scrollHeight;
}
document.getElementById('wordSend').addEventListener('click', () => {
  const w = (wordInput.value.trim() || 'HY4').toUpperCase();
  WORDS[wordIdx] = w;
  nextWord();
  wordInput.value = '';
  push('你', `上屏：${w}`, true);
  setTimeout(() => push('hy4', REPLIES[ri++ % REPLIES.length], false), 540);
});
wordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('wordSend').click();
});

/* ============ 其它 ============ */
const io = new IntersectionObserver(en => en.forEach(e => {
  if (e.isIntersecting) {
    const b = e.target; b.style.setProperty('--w', b.dataset.w); b.classList.add('fill'); io.unobserve(b);
  }
}), { threshold: 0.5 });
document.querySelectorAll('.bb i').forEach(b => io.observe(b));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaAtoms').addEventListener('click', () =>
  document.getElementById('atoms').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaMorph2').addEventListener('click', () =>
  document.getElementById('morph').scrollIntoView({ behavior: 'smooth' }));

resize();
requestAnimationFrame(loop);
