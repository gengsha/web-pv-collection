/* ============================================================
   Preset 14 · ASCII Render Pipeline
   软件渲染：点云旋转 → 正交投影 → z-buffer → 朗伯着色 → 亮度量化 → 字符映射
   ============================================================ */
const cv = document.getElementById('ascii');
const ctx = cv.getContext('2d');

const RAMP = ' .:-=+*#%@';
let cols = 96, rows = 40;
let cells, zbuf, lines = [];
let shape = 'sphere', pts = [];
let yaw = 0, pitch = 0.42, spin = 0.012;
let lightAz = 0.6, lightEl = 0.75;
let drag = false, lastX = 0, lastY = 0;

/* ---------- 几何体 ---------- */
function buildSphere(n) {
  const out = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = ga * i;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    out.push({ x, y, z, nx: x, ny: y, nz: z });
  }
  return out;
}
function buildTorus(nu, nv) {
  const out = [], R = 1.0, r = 0.38;
  for (let i = 0; i < nu; i++) {
    const u = (i / nu) * Math.PI * 2;
    for (let j = 0; j < nv; j++) {
      const v = (j / nv) * Math.PI * 2;
      const cu = Math.cos(u), su = Math.sin(u), cvv = Math.cos(v), sv = Math.sin(v);
      out.push({
        x: (R + r * cvv) * cu,
        y: (R + r * cvv) * su,
        z: r * sv,
        nx: cvv * cu, ny: cvv * su, nz: sv
      });
    }
  }
  return out;
}

function setShape(s) {
  shape = s;
  pts = s === 'sphere' ? buildSphere(4000) : buildTorus(200, 60);
  document.getElementById('hPts').textContent = pts.length.toLocaleString('en-US');
  document.getElementById('vpMeta').textContent =
    `SHAPE: ${s.toUpperCase()} · SAMPLES ${pts.length.toLocaleString('en-US')} · ${cols}×${rows}`;
}

/* ---------- 网格 ---------- */
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth, h = cv.clientHeight;
  cv.width = Math.floor(w * dpr);
  cv.height = Math.floor(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  layout();
}
function layout() {
  const w = cv.clientWidth, h = cv.clientHeight;
  const cellW = w / cols;
  const fontPx = cellW / 0.6;
  rows = Math.max(8, Math.floor(h / fontPx));
  cells = new Float32Array(cols * rows);
  zbuf = new Float32Array(cols * rows);
  document.getElementById('hGrid').textContent = `${cols} × ${rows}`;
  if (pts.length) document.getElementById('vpMeta').textContent =
    `SHAPE: ${shape.toUpperCase()} · SAMPLES ${pts.length.toLocaleString('en-US')} · ${cols}×${rows}`;
}
window.addEventListener('resize', resize);

/* ---------- 渲染 ---------- */
function render(time) {
  const w = cv.clientWidth, h = cv.clientHeight;
  const cellW = w / cols, cellH = h / rows;
  cells.fill(0); zbuf.fill(-1e9);

  yaw += spin;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);

  const lx = Math.cos(lightAz) * Math.cos(lightEl);
  const ly = Math.sin(lightEl);
  const lz = Math.sin(lightAz) * Math.cos(lightEl);

  const scale = Math.min(w, h) * 0.40;
  const cx = w / 2, cyy = h / 2 + Math.sin(time * 0.0006) * h * 0.02;

  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    // 绕 Y 再绕 X
    let x = p.x * cy + p.z * sy;
    let z = -p.x * sy + p.z * cy;
    let y = p.y;
    const y2 = y * cp - z * sp;
    const z2 = y * sp + z * cp;

    let nx = p.nx * cy + p.nz * sy;
    let nz = -p.nx * sy + p.nz * cy;
    let ny = p.ny;
    const ny2 = ny * cp - nz * sp;
    const nz2 = ny * sp + nz * cp;

    // 正交投影
    const sx = Math.floor((cx + x * scale) / cellW);
    const syi = Math.floor((cyy - y2 * scale) / cellH);
    if (sx < 0 || sx >= cols || syi < 0 || syi >= rows) continue;

    const idx = syi * cols + sx;
    if (z2 <= zbuf[idx]) continue;          // z-buffer 消隐
    zbuf[idx] = z2;

    const diff = Math.max(0, nx * lx + ny2 * ly + nz2 * lz);
    const rim = Math.pow(1 - Math.abs(nz2), 3) * 0.55;
    cells[idx] = Math.min(1, 0.10 + diff * 0.85 + rim);
  }

  // 字符映射 + 逐行着色
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#020305';
  ctx.fillRect(0, 0, w, h);
  ctx.font = `${cellH.toFixed(1)}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'top';

  for (let r = 0; r < rows; r++) {
    let str = '';
    for (let c = 0; c < cols; c++) {
      const v = cells[r * cols + c];
      str += v <= 0.001 ? ' ' : RAMP[Math.min(RAMP.length - 1, Math.round(v * (RAMP.length - 1)))];
    }
    if (!str.trim()) continue;
    const t = r / rows;
    const hue = 188 + t * 62;                       // 青 → 蓝紫
    const lum = 52 + Math.sin(t * Math.PI) * 22;
    ctx.fillStyle = `hsl(${hue}, 92%, ${lum}%)`;
    ctx.fillText(str, 0, r * cellH);
  }
}

let frames = 0, fpsT = performance.now();
function loop(now) {
  render(now);
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}

/* ---------- 交互 ---------- */
cv.addEventListener('mousedown', e => { drag = true; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener('mouseup', () => drag = false);
window.addEventListener('mousemove', e => {
  if (drag) {
    yaw += (e.clientX - lastX) * 0.006;
    pitch = Math.max(-1.2, Math.min(1.2, pitch + (e.clientY - lastY) * 0.004));
    lastX = e.clientX; lastY = e.clientY;
  }
  lightAz = (e.clientX / window.innerWidth) * Math.PI * 2;
  lightEl = 0.35 + (1 - e.clientY / window.innerHeight) * 0.9;
  document.getElementById('vLight').textContent = (lightAz / Math.PI).toFixed(2);
});

setShape('sphere');
resize();
requestAnimationFrame(loop);

/* ============ 采样控制台 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '点云 4,000 点（Fibonacci 球），单精度预计算'],
      ['0.09s', '正交投影到 96×40 网格，z-buffer 取最近点'],
      ['0.18s', '亮度量化为 10 级，映射到 .:-=+*#%@']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '切换几何：环面 (R=1.0, r=0.38)，200×60 = 12,000 采样点'],
      ['1.6s', '网格加密到 200 列，字符宽高比 0.6 反推行距'],
      ['2.9s', '朗伯漫反射：L = (cos az·cos el, sin el, sin az·cos el)'],
      ['4.1s', '加入边缘光 pow(1-|nz|, 3)，轮廓从背景中剥离'],
      ['5.3s', '自校验：与 400×160 网格对比，灰阶直方图偏差 < 3%'],
      ['6.4s', '输出：连续灰阶、完整轮廓、边缘光可读']
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
  cols = deep ? 200 : 96;
  document.getElementById('sCols').value = cols;
  document.getElementById('vCols').textContent = cols;
  setShape(deep ? 'torus' : 'sphere');
  layout();
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sCols').addEventListener('input', e => {
  cols = +e.target.value;
  document.getElementById('vCols').textContent = cols;
  layout();
});
document.getElementById('sLight').addEventListener('input', e => {
  lightAz = (e.target.value / 628) * Math.PI * 2;
  document.getElementById('vLight').textContent = (lightAz / Math.PI).toFixed(2);
});
document.getElementById('ctaDeep').addEventListener('click', () => {
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => modeBtns[1].click(), 500);
});

/* ============ 终端 ============ */
const REPLIES = [
  '已提交。结论：加密网格比加密采样更划算，先加列数。',
  '切到环面 + 200 列：灰阶连续性提升，直方图偏差 3% 以内。',
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
  push('you', v, true); input.value = '';
  setTimeout(() => push('hy4', REPLIES[ri++ % REPLIES.length], false), 520);
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
document.getElementById('ctaStages').addEventListener('click', () =>
  document.getElementById('stages').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaConsole').addEventListener('click', () =>
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' }));
