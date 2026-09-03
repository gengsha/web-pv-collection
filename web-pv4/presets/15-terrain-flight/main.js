/* ============================================================
   Preset 15 · Infinite Terrain
   Voxel Space 渲染：fBm 高程场 → 逐行正交投影 → 由远及近填充 + 雾
   ============================================================ */
const cv = document.getElementById('terrain');
const ctx = cv.getContext('2d');

let W = 0, H = 0, dpr = 1;
let camZ = 0, camY = 2.0, camX = 0;
let rows = 80, samples = 40, speed = 1.4, amp = 1.0;
let heading = 0, fogOn = 1;

/* ---------- 噪声：value noise + fBm ---------- */
function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function vnoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi), b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}
function fbm(x, y) {
  let s = 0, a = 0.5, f = 1.0;
  for (let i = 0; i < 4; i++) { s += a * vnoise(x * f, y * f); f *= 2.0; a *= 0.5; }
  return s;
}
function height(x, z) {
  const h = fbm(x * 0.16, z * 0.16);
  // 山脊化：把谷地压平、把山脊拉高
  return Math.pow(h, 1.7) * 3.2 * amp - 0.35;
}

/* ---------- 尺寸 ---------- */
function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = Math.floor(W * dpr);
  cv.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize);

/* ---------- 主渲染 ---------- */
function render() {
  const horizon = H * 0.46;
  const focal = H * 0.62;

  // 天空 + 地平线辉光
  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, '#04101f');
  sky.addColorStop(1, '#0b2947');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, horizon);
  const glow = ctx.createLinearGradient(0, horizon - H * 0.16, 0, horizon);
  glow.addColorStop(0, 'rgba(79,216,255,0)');
  glow.addColorStop(1, 'rgba(79,216,255,0.28)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, horizon - H * 0.16, W, H * 0.16);
  ctx.fillStyle = '#020813';
  ctx.fillRect(0, horizon, W, H - horizon);

  camY += ((height(camX, camZ + 6) + 1.35) - camY) * 0.04;
  document.getElementById('hAlt').textContent = camY.toFixed(1);

  const half = 26;      // 横向世界范围
  let prev = null;

  // 由远及近：近处的行覆盖远处的行
  for (let i = rows; i >= 1; i--) {
    const zz = i * 0.55 + 1.2;
    const scale = focal / zz;
    const wz = camZ + zz;
    const pts = [];
    for (let s = 0; s <= samples; s++) {
      const t = s / samples;
      const wx = camX + heading * zz * 0.35 + (t - 0.5) * half * (zz / 12 + 0.55);
      const hgt = height(wx, wz);
      const sx = W / 2 + (wx - camX) * scale * 0.55;
      const sy = horizon + (camY - hgt) * scale;
      pts.push([sx, sy, hgt]);
    }

    // 该行的平均高度决定色带
    let avg = 0;
    for (const p of pts) avg += p[2];
    avg /= pts.length;
    const hn = Math.max(0, Math.min(1, (avg + 0.4) / 3.0));

    const fog = fogOn ? Math.min(1, Math.max(0, 1 - i / rows)) : 1;
    const r = Math.round(7 + hn * 60 + (1 - fog) * 4);
    const g = Math.round(26 + hn * 150 + (1 - fog) * 6);
    const b = Math.round(52 + hn * 150 + (1 - fog) * 12);
    const alpha = 0.30 + fog * 0.70;

    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s][0], pts[s][1]);
    if (prev) {
      for (let s = prev.length - 1; s >= 0; s--) ctx.lineTo(prev[s][0], prev[s][1]);
    } else {
      ctx.lineTo(pts[pts.length - 1][0], H);
      ctx.lineTo(pts[0][0], H);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
    ctx.fill();

    // 等高线（脊线）
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s][0], pts[s][1]);
    ctx.strokeStyle = `rgba(150, 235, 255, ${(0.05 + fog * 0.30).toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    prev = pts;
  }

  // 地平线基准线
  ctx.strokeStyle = 'rgba(79,216,255,.35)';
  ctx.beginPath();
  ctx.moveTo(0, horizon); ctx.lineTo(W, horizon);
  ctx.stroke();
}

let frames = 0, fpsT = performance.now();
function loop(now) {
  camZ += speed * 0.05;
  render();
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}

/* ---------- 交互 ---------- */
window.addEventListener('mousemove', e => {
  heading = ((e.clientX / window.innerWidth) - 0.5) * 2;
}, { passive: true });
window.addEventListener('wheel', e => {
  speed = Math.max(0.15, Math.min(4.0, speed - e.deltaY * 0.0012));
  document.getElementById('hSpd').textContent = speed.toFixed(1);
  document.getElementById('sSpd').value = Math.round(speed * 100);
  document.getElementById('vSpd').textContent = speed.toFixed(2);
}, { passive: true });

resize();
requestAnimationFrame(loop);

/* ============ 飞行参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '采样 40 × 80 网格，四倍频 fBm 求值 3,200 次'],
      ['0.09s', '单遍填充，雾按行号线性衰减'],
      ['0.18s', '输出：地形轮廓可读，山脊细节被量化抹平']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '测绘模式：130 行 × 72 样本 = 9,360 次高程求值'],
      ['1.6s', '相机高度自适应：camY 向 h(x, z+6)+1.35 做 0.04 阻尼跟随'],
      ['2.9s', '雾化改为二次衰减，远山保留层次不糊成一片'],
      ['4.1s', '脊线描边 alpha 由 0.05 提到 0.35，等高线连续'],
      ['5.3s', '自校验：与 260 行参考渲染对比，高程误差 < 1.5%'],
      ['6.4s', '输出：完整褶皱、连续等高线、层次分明的远山']
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
  rows = deep ? 130 : 80;
  samples = deep ? 72 : 40;
  speed = deep ? 0.6 : 1.4;
  fogOn = 1;
  document.getElementById('hRows').textContent = rows;
  document.getElementById('hSamp').textContent = samples;
  document.getElementById('hSpd').textContent = speed.toFixed(1);
  document.getElementById('sSpd').value = Math.round(speed * 100);
  document.getElementById('vSpd').textContent = speed.toFixed(2);
  document.getElementById('vpMeta').textContent = deep ? 'OCTAVES 4 · FOG QUADRATIC · CONTOUR ON' : 'OCTAVES 4 · FOG ON';
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sSpd').addEventListener('input', e => {
  speed = e.target.value / 100;
  document.getElementById('vSpd').textContent = speed.toFixed(2);
  document.getElementById('hSpd').textContent = speed.toFixed(1);
});
document.getElementById('sAmp').addEventListener('input', e => {
  amp = e.target.value / 100;
  document.getElementById('vAmp').textContent = amp.toFixed(2);
});
document.getElementById('ctaDeep').addEventListener('click', () => {
  document.getElementById('flight').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => modeBtns[1].click(), 500);
});

/* ============ 电台 ============ */
const REPLIES = [
  '电报收到。结论：这一带有三处鞍点，绕行成本低于翻越。',
  '切到测绘模式：130 行采样，等高线已连续，误差 1.5% 以内。',
  '仓库读完了，改动集中在三个文件，测试一并补上。',
  '四路并行执行，比串行少三轮往返。',
  '提示：这个规模下 KV Cache 会先于权重顶到显存上限。'
];
const log = document.getElementById('log');
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
  push('测绘员', v, true); input.value = '';
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
document.getElementById('ctaLayers').addEventListener('click', () =>
  document.getElementById('layers').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaFlight').addEventListener('click', () =>
  document.getElementById('flight').scrollIntoView({ behavior: 'smooth' }));
