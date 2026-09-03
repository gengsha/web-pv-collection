/* ============================================================
   Preset 17 · Verlet Cloth
   Verlet 积分（仅记忆上一帧位置）+ 约束松弛 + 结构/剪切约束 + 撕裂
   ============================================================ */
const cv = document.getElementById('cloth');
const ctx = cv.getContext('2d');
let W = 0, H = 0;

let COLS = 34, ROWS = 24;
let pts = [], links = [];
let iter = 3, wind = 0.30, gravity = 0.55;
let shear = false, tearing = false, damp = 0.99;
let grabbed = -1, tearingNow = false;
let time = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = Math.floor(W * dpr);
  cv.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  build();
}
window.addEventListener('resize', resize);

function build() {
  pts = []; links = [];
  const ox = W * 0.16, oy = H * 0.12;
  const sx = (W * 0.68) / (COLS - 1);
  const sy = (H * 0.74) / (ROWS - 1);

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = ox + c * sx, y = oy + r * sy;
      const pinned = (r === 0 && (c % 4 === 0 || c === COLS - 1));
      pts.push({ x, y, px: x, py: y, pinned });
    }
  }
  const idx = (c, r) => r * COLS + c;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (c < COLS - 1) links.push({ a: idx(c, r), b: idx(c + 1, r), len: sx, dead: false, shear: false });
      if (r < ROWS - 1) links.push({ a: idx(c, r), b: idx(c, r + 1), len: sy, dead: false, shear: false });
      if (shear) {
        if (c < COLS - 1 && r < ROWS - 1) {
          links.push({ a: idx(c, r), b: idx(c + 1, r + 1), len: Math.hypot(sx, sy), dead: false, shear: true });
          links.push({ a: idx(c + 1, r), b: idx(c, r + 1), len: Math.hypot(sx, sy), dead: false, shear: true });
        }
      }
    }
  }
  document.getElementById('hPts').textContent = pts.length.toLocaleString('en-US');
  document.getElementById('hLinks').textContent = links.length.toLocaleString('en-US');
}

/* ---------- 交互 ---------- */
function locate(e) {
  const r = cv.getBoundingClientRect();
  return { x: e.clientX - r.left, y: e.clientY - r.top };
}
cv.addEventListener('mousedown', e => {
  const m = locate(e);
  tearingNow = e.shiftKey;
  if (!tearingNow) {
    let best = -1, bd = 1e9;
    for (let i = 0; i < pts.length; i++) {
      const d = (pts[i].x - m.x) ** 2 + (pts[i].y - m.y) ** 2;
      if (d < bd) { bd = d; best = i; }
    }
    if (bd < 44 * 44) grabbed = best;
  }
});
window.addEventListener('mouseup', () => { grabbed = -1; tearingNow = false; });
cv.addEventListener('mousemove', e => {
  const m = locate(e);
  if (grabbed >= 0 && !pts[grabbed].pinned) {
    pts[grabbed].x = m.x; pts[grabbed].y = m.y;
    pts[grabbed].px = m.x; pts[grabbed].py = m.y;
  }
  if (tearingNow) {
    for (const l of links) {
      if (l.dead) continue;
      const a = pts[l.a], b = pts[l.b];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      if ((mx - m.x) ** 2 + (my - m.y) ** 2 < 20 * 20) l.dead = true;
    }
  }
});

/* ---------- 物理 ---------- */
function physics() {
  time++;
  const gx = 0, gy = gravity * 0.55;
  const windF = wind * 0.12;

  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    if (p.pinned) continue;
    const vx = (p.x - p.px) * damp;
    const vy = (p.y - p.py) * damp;
    p.px = p.x; p.py = p.y;
    p.x += vx + gx + Math.sin(time * 0.02 + p.y * 0.01) * windF;
    p.y += vy + gy + Math.cos(time * 0.013 + p.x * 0.008) * windF * 0.4;
  }

  for (let it = 0; it < iter; it++) {
    for (let li = 0; li < links.length; li++) {
      const l = links[li];
      if (l.dead) continue;
      const a = pts[l.a], b = pts[l.b];
      let dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1e-6;

      if (tearing && !l.shear && d > l.len * 2.6) { l.dead = true; continue; }

      const diff = (d - l.len) / d * 0.5;
      const ox = dx * diff, oy = dy * diff;
      if (!a.pinned) { a.x += ox; a.y += oy; }
      if (!b.pinned) { b.x -= ox; b.y -= oy; }
    }
  }
}

/* ---------- 渲染：按应变染色 ---------- */
function draw() {
  ctx.clearRect(0, 0, W, H);
  // 背景标尺点
  ctx.fillStyle = 'rgba(30, 40, 70, .07)';
  for (let x = 24; x < W; x += 48) for (let y = 24; y < H; y += 48) ctx.fillRect(x, y, 2, 2);

  ctx.lineWidth = 1.4;
  ctx.lineCap = 'round';
  for (const l of links) {
    if (l.dead) continue;
    const a = pts[l.a], b = pts[l.b];
    const d = Math.hypot(b.x - a.x, b.y - a.y);
    const strain = Math.min(1, Math.max(0, (d / l.len - 1) * 2.2));   // 0 松弛 → 1 绷紧
    const hue = 222 - strain * 210;                                    // 蓝 → 红
    ctx.strokeStyle = `hsla(${hue}, ${60 + strain * 30}%, ${38 + strain * 12}%, ${0.5 + strain * 0.5})`;
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  }

  // 固定点（图钉）
  ctx.fillStyle = '#ff5a3c';
  for (const p of pts) if (p.pinned) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2); ctx.fill();
  }
  // 抓取点
  if (grabbed >= 0) {
    const p = pts[grabbed];
    ctx.strokeStyle = 'rgba(43, 76, 140, .8)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, Math.PI * 2); ctx.stroke();
  }
}

let frames = 0, fpsT = performance.now();
function loop(now) {
  physics();
  draw();
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}
resize();
requestAnimationFrame(loop);

/* ============ 求解器参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', 'Verlet 积分：x\' = 2x − x_prev + a·Δt²，速度隐式'],
      ['0.09s', '结构约束松弛 1 次 —— 高频误差全部残留'],
      ['0.18s', '输出：布会塌成一张网，但动量守恒是对的']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '加入 4 组对角剪切约束，面内刚度提升'],
      ['1.6s', '松弛 8 次 × 3,164 约束 ≈ 25,312 次投影/帧'],
      ['2.9s', '撕裂判定：长度超过静息 2.6 倍即断开（仅结构约束）'],
      ['4.1s', '风场：sin(t·0.02 + y·0.01) 沿 X 施加，随高度相位偏移'],
      ['5.3s', '自校验：对比 16 次松弛基准，末端摆幅差 < 2%'],
      ['6.4s', '输出：垂坠褶皱、剪切稳定、可撕裂的真实织物感']
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
  iter = deep ? 8 : 1;
  shear = deep;
  tearing = deep;
  wind = deep ? 0.45 : 0.30;
  document.getElementById('hIter').textContent = iter;
  document.getElementById('sIter').value = iter;
  document.getElementById('vIter').textContent = iter;
  document.getElementById('sWind').value = Math.round(wind * 100);
  document.getElementById('vWind').textContent = wind.toFixed(2);
  document.getElementById('vpMeta').textContent = deep
    ? 'GRAVITY 980 · DAMP 0.99 · SHEAR ON · TEAR ON'
    : 'GRAVITY 980 · DAMP 0.99';
  build();
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sIter').addEventListener('input', e => {
  iter = +e.target.value;
  document.getElementById('vIter').textContent = iter;
  document.getElementById('hIter').textContent = iter;
});
document.getElementById('sWind').addEventListener('input', e => {
  wind = e.target.value / 100;
  document.getElementById('vWind').textContent = wind.toFixed(2);
  document.getElementById('hWind').textContent = wind.toFixed(2);
});
document.getElementById('sGrav').addEventListener('input', e => {
  gravity = e.target.value / 100;
  document.getElementById('vGrav').textContent = gravity.toFixed(2);
});
document.getElementById('ctaReset').addEventListener('click', build);

/* ============ 实验日志 ============ */
const REPLIES = [
  '已记录。结论：垂坠形状主要由约束迭代次数决定，与积分步长关系不大。',
  '切到全求解：8 次松弛 + 剪切，末端摆幅与 16 次基准差 2% 以内。',
  '仓库读完了，改动集中在三个文件，测试一并补上。',
  '四路并行执行，比串行少三轮往返。',
  '提示：这个规模下 KV Cache 会先于权重顶到显存上限。'
];
const log = document.getElementById('logBox');
const input = document.getElementById('inp');
let ri = 0;
function push(who, txt, isMe) {
  const el = document.createElement('div');
  el.className = 'row' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="who">${who}</span><span class="txt">${txt}</span>`;
  log.appendChild(el); log.scrollTop = log.scrollHeight;
}
function run() {
  const v = input.value.trim();
  if (!v) return;
  push('观测者', v, true); input.value = '';
  setTimeout(() => push('hy4', REPLIES[ri++ % REPLIES.length], false), 540);
}
document.getElementById('send').addEventListener('click', run);
input.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });

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
document.getElementById('ctaMaterials').addEventListener('click', () =>
  document.getElementById('materials').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaSolver').addEventListener('click', () =>
  document.getElementById('solver').scrollIntoView({ behavior: 'smooth' }));
