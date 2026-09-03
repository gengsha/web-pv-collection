/* ============================================================
   Preset 20 · Metaball Scalar Field
   逐像素平方反比场 Σr²/d² + 256 项颜色 LUT + 等值带 + 低分辨率放大
   ============================================================ */
const cv = document.getElementById('lava');
const ctx = cv.getContext('2d');
const off = document.createElement('canvas');
const octx = off.getContext('2d');

let GW = 180, GH = 100;                 // 低分辨率网格
let balls = [], NB = 8;
let img, buf32;
let visc = 0.995, heat = 1.0;
let dualContour = false;
let mx = -9999, my = -9999, attract = false;
let W = 0, H = 0;

/* ---------- 颜色 LUT：场值 0..~4.2 → 熔岩色带 ---------- */
const LUT = new Uint8Array(256 * 3);
(function buildLUT() {
  const stops = [
    [0.00, [10, 3, 6]],
    [0.45, [38, 6, 12]],
    [0.85, [70, 12, 20]],
    [1.00, [120, 22, 26]],     // 等值面附近：暗红
    [1.35, [190, 46, 24]],
    [1.70, [255, 106, 0]],     // 橙
    [2.10, [255, 170, 30]],
    [2.55, [255, 198, 63]],    // 黄
    [3.10, [255, 236, 170]],
    [3.80, [255, 243, 214]]    // 白热
  ];
  for (let i = 0; i < 256; i++) {
    const v = (i / 255) * 4.0;
    let c = stops[stops.length - 1][1];
    for (let s = 0; s < stops.length - 1; s++) {
      if (v >= stops[s][0] && v <= stops[s + 1][0]) {
        const t = (v - stops[s][0]) / (stops[s + 1][0] - stops[s][0]);
        c = [
          stops[s][1][0] + (stops[s + 1][1][0] - stops[s][1][0]) * t,
          stops[s][1][1] + (stops[s + 1][1][1] - stops[s][1][1]) * t,
          stops[s][1][2] + (stops[s + 1][1][2] - stops[s][1][2]) * t
        ];
        break;
      }
    }
    // 等值带：v≈1.0 与 v≈1.6 处略提亮，形成可见等值线
    const band1 = Math.abs(v - 1.0) < 0.035 ? 34 : 0;
    const band2 = dualContour && Math.abs(v - 1.6) < 0.03 ? 22 : 0;
    LUT[i * 3] = Math.min(255, c[0] + band1 + band2);
    LUT[i * 3 + 1] = Math.min(255, c[1] + band1 + band2);
    LUT[i * 3 + 2] = Math.min(255, c[2] + band1);
  }
})();

/* ---------- 热核 ---------- */
function build(nBalls) {
  NB = nBalls;
  balls = [];
  for (let i = 0; i < NB; i++) {
    const r = 24 + Math.random() * 22;
    balls.push({
      x: Math.random() * GW,
      y: Math.random() * GH,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      r,
      r2: r * r
    });
  }
  document.getElementById('hBalls').textContent = NB;
}

function layout() {
  off.width = GW; off.height = GH;
  img = octx.createImageData(GW, GH);
  buf32 = new Uint32Array(img.data.buffer);
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = Math.floor(W * dpr);
  cv.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize);

/* ---------- 物理 ---------- */
function physics() {
  for (const b of balls) {
    // 边界回弹 + 中心微弱束缚
    if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx); }
    if (b.x > GW - b.r) { b.x = GW - b.r; b.vx = -Math.abs(b.vx); }
    if (b.y < b.r) { b.y = b.r; b.vy = Math.abs(b.vy); }
    if (b.y > GH - b.r) { b.y = GH - b.r; b.vy = -Math.abs(b.vy); }

    if (attract) {
      const dx = mx - b.x, dy = my - b.y;
      const d = Math.hypot(dx, dy) || 1;
      b.vx += dx / d * 0.05 * heat;
      b.vy += dy / d * 0.05 * heat;
    } else {
      // 向中心的弱回复 + 热噪声，保持运动不熄灭
      b.vx += (GW / 2 - b.x) * 0.00006 * heat + (Math.random() - 0.5) * 0.02 * heat;
      b.vy += (GH / 2 - b.y) * 0.00006 * heat + (Math.random() - 0.5) * 0.02 * heat;
    }
    b.vx *= visc; b.vy *= visc;
    b.x += b.vx; b.y += b.vy;
  }
}

/* ---------- 场渲染 ---------- */
function renderField() {
  const data = buf32;
  let p = 0;
  const iso = 60;                          // LUT 索引阈值：v = 1.0
  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      let v = 0;
      for (let i = 0; i < NB; i++) {
        const b = balls[i];
        const dx = x - b.x, dy = y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < b.r2 * 9) v += b.r2 / (d2 + 0.9);     // 3r 之外截断，省时
      }
      let idx = (v * 60) | 0;
      if (idx > 255) idx = 255;
      const c = idx * 3;
      // ABGR 打包（小端）
      data[p++] = 0xff000000 | (LUT[c + 2] << 16) | (LUT[c + 1] << 8) | LUT[c];
    }
  }
  octx.putImageData(img, 0, 0);
}

function draw() {
  ctx.imageSmoothingEnabled = true;
  ctx.clearRect(0, 0, W, H);
  ctx.drawImage(off, 0, 0, GW, GH, 0, 0, W, H);
}

let frames = 0, fpsT = performance.now();
function loop(now) {
  physics();
  renderField();
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
  mx = (e.clientX - r.left) / r.width * GW;
  my = (e.clientY - r.top) / r.height * GH;
}, { passive: true });
cv.addEventListener('mousedown', () => attract = true);
window.addEventListener('mouseup', () => attract = false);
cv.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });

document.getElementById('ctaShuffle').addEventListener('click', () => {
  for (const b of balls) {
    b.vx += (Math.random() - 0.5) * 4;
    b.vy += (Math.random() - 0.5) * 4;
  }
});

/* ---------- 初始化 ---------- */
function setMode(instant) {
  NB = instant ? 8 : 14;
  GW = instant ? 180 : 300;
  GH = instant ? 100 : 168;
  dualContour = !instant;
  layout();
  build(NB);
  // 重建 LUT 以刷新双等值带
  buildLUT2();
  document.getElementById('hGrid').textContent = `${GW}×${GH}`;
  document.getElementById('vpMeta').textContent = instant
    ? 'DUAL CONTOUR OFF'
    : 'DUAL CONTOUR ON · ISO 1.00 / 1.60';
}

function buildLUT2() {
  // 与 buildLUT 相同的色带，但等值带开关不同
  const stops = [
    [0.00, [10, 3, 6]], [0.45, [38, 6, 12]], [0.85, [70, 12, 20]],
    [1.00, [120, 22, 26]], [1.35, [190, 46, 24]], [1.70, [255, 106, 0]],
    [2.10, [255, 170, 30]], [2.55, [255, 198, 63]],
    [3.10, [255, 236, 170]], [3.80, [255, 243, 214]]
  ];
  for (let i = 0; i < 256; i++) {
    const v = (i / 255) * 4.0;
    let c = stops[stops.length - 1][1];
    for (let s = 0; s < stops.length - 1; s++) {
      if (v >= stops[s][0] && v <= stops[s + 1][0]) {
        const t = (v - stops[s][0]) / (stops[s + 1][0] - stops[s][0]);
        c = [
          stops[s][1][0] + (stops[s + 1][1][0] - stops[s][1][0]) * t,
          stops[s][1][1] + (stops[s + 1][1][1] - stops[s][1][1]) * t,
          stops[s][1][2] + (stops[s + 1][1][2] - stops[s][1][2]) * t
        ];
        break;
      }
    }
    const band1 = Math.abs(v - 1.0) < 0.035 ? 34 : 0;
    const band2 = dualContour && Math.abs(v - 1.6) < 0.03 ? 22 : 0;
    LUT[i * 3] = Math.min(255, c[0] + band1 + band2);
    LUT[i * 3 + 1] = Math.min(255, c[1] + band1 + band2);
    LUT[i * 3 + 2] = Math.min(255, c[2] + band1);
  }
}

/* ============ 热力学参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '180×100 = 18,000 像素 × 8 热核，平方反比场'],
      ['0.09s', '3r 之外截断，单像素最多 3~4 次有效求和'],
      ['0.18s', '输出：液滴融合正确，等值带清晰']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '网格加密到 300×168 = 50,400 像素 × 14 热核'],
      ['1.6s', '双等值线：v=1.00 主面 + v=1.60 内核亮线'],
      ['2.9s', 'LUT 混色：10 个停靠点线性插值出 256 项色表'],
      ['4.1s', 'ABGR 打包直写 Uint32Array，绕过逐通道赋值'],
      ['5.3s', '自校验：与 Marching Squares 等值线对比，面积差 < 1%'],
      ['6.4s', '输出：更细的液滴融合、内核亮线、完整的熔融质感']
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
  setMode(b.dataset.mode === 'instant');
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sVisc').addEventListener('input', e => {
  visc = e.target.value / 1000;
  document.getElementById('vVisc').textContent = visc.toFixed(3);
});
document.getElementById('sHeat').addEventListener('input', e => {
  heat = e.target.value / 100;
  document.getElementById('vHeat').textContent = heat.toFixed(1);
});

/* ============ 遥测 ============ */
const REPLIES = [
  '指令已下发。结论：融合半径由场强决定，与热核数量弱相关。',
  '切到熔融档：50,400 像素 × 14 热核，双等值线已点亮。',
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
  push('操作员', v, true); input.value = '';
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
document.getElementById('ctaCores').addEventListener('click', () =>
  document.getElementById('cores').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaThermal').addEventListener('click', () =>
  document.getElementById('thermal').scrollIntoView({ behavior: 'smooth' }));

resize();
setMode(true);
requestAnimationFrame(loop);
