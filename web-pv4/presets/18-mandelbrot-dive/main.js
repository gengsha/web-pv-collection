/* ============================================================
   Preset 18 · Mandelbrot Dive
   WebGL 逃逸时间渲染：smooth iteration + 余弦调色板 + 自动深潜
   ============================================================ */
const canvas = document.getElementById('frac');
const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false });

/* WebGL 不可用时的降级提示（旧设备 / 关闭硬件加速 / 部分无头浏览器） */
if (!gl) {
  const tip = document.createElement('div');
  tip.setAttribute('role', 'alert');
  tip.style.cssText = 'position:fixed;inset:0;display:grid;place-items:center;padding:24px;text-align:center;background:#05060a;color:#cbd5e1;font:15px/1.7 system-ui,sans-serif;z-index:9999';
  tip.innerHTML = '当前浏览器无法创建 WebGL 上下文，本预设无法渲染。<br>请开启浏览器的硬件加速，或换用最新版 Chrome / Edge / Firefox / Safari。';
  document.body.appendChild(tip);
  throw new Error('WebGL unavailable');
}

const VS = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;

const FS = `
precision highp float;
uniform vec2  u_res;
uniform vec2  u_center;
uniform float u_scale;
uniform float u_iter;
uniform float u_cycle;
uniform vec3  u_palette;    // 调色板相位偏移

vec3 pal(float t){
  // IQ 余弦调色板：相位决定配色（金/青 ↔ 品红/蓝紫）
  vec3 a = vec3(0.46, 0.44, 0.42);
  vec3 b = vec3(0.50, 0.50, 0.50);
  vec3 c = vec3(1.00, 1.00, 1.00);
  vec3 d = u_palette;
  return a + b * cos(6.28318 * (c * t + d));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec2 c = u_center + uv * u_scale;

  vec2 z = vec2(0.0);
  float n = -1.0;
  for (int i = 0; i < 512; i++) {
    if (float(i) >= u_iter) break;
    z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
    float m = dot(z, z);
    if (m > 256.0) {
      // smooth iteration count：消除色带
      n = float(i) + 1.0 - log2(log2(m)) * 0.5;
      break;
    }
  }

  vec3 col;
  if (n < 0.0) {
    // 集合内部：近乎纯黑，带一点点随迭代数的冷光
    col = vec3(0.004, 0.005, 0.010);
  } else {
    float t = n / u_iter;
    col = pal(fract(t * 3.0 + u_cycle));
    col *= 0.55 + 0.85 * smoothstep(0.0, 0.06, t);   // 边界外圈提亮
  }

  // 轻微暗角
  col *= 1.0 - 0.35 * dot(uv, uv) * 0.8;
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
  return s;
}
const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
gl.linkProgram(prog);
gl.useProgram(prog);

const buf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prog, 'a');
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

const U = {};
['u_res', 'u_center', 'u_scale', 'u_iter', 'u_cycle', 'u_palette'].forEach(k => U[k] = gl.getUniformLocation(prog, k));

/* ---------- 状态 ---------- */
let cx = -0.743643887037151, cy = 0.131825904205330;   // 深潜目标：双螺旋谷
let scale = 2.8, iter = 128, iterT = 128;
let cycle = 0.35, cycleT = 0.35;
let dive = 0.6, autoDive = true;
let palT = 0.0, palTT = 0.0;      // 0 = 金/青，1 = 品红/蓝紫
let drag = false, lastX = 0, lastY = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);

/* ---------- 交互 ---------- */
canvas.addEventListener('mousedown', e => { drag = true; autoDive = false; lastX = e.clientX; lastY = e.clientY; });
window.addEventListener('mouseup', () => drag = false);
window.addEventListener('mousemove', e => {
  if (!drag) return;
  const dx = (e.clientX - lastX) / canvas.clientHeight * scale;
  const dy = (e.clientY - lastY) / canvas.clientHeight * scale;
  cx -= dx; cy += dy;
  lastX = e.clientX; lastY = e.clientY;
  document.getElementById('vpMeta').textContent = 'PALETTE: MANUAL PAN · AUTO-DIVE OFF';
});
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  autoDive = false;
  scale *= Math.exp(e.deltaY * 0.0012);
  scale = Math.max(4e-5, Math.min(3.2, scale));   // FP32 精度护栏
}, { passive: false });

/* ---------- 主循环 ---------- */
let frames = 0, fpsT = performance.now(), t0 = performance.now();

function loop(now) {
  const t = (now - t0) / 1000;

  iter += (iterT - iter) * 0.08;
  cycle += (cycleT - cycle) * 0.05;
  palT += (palTT - palT) * 0.05;

  if (autoDive) {
    // 对数式下潜：2.8 → 6e-5 循环（FP32 护栏内）
    const lz = (Math.sin(t * 0.06 * dive) * 0.5 + 0.5);
    scale = Math.exp(Math.log(2.8) + lz * (Math.log(6e-5) - Math.log(2.8)));
    cx = -0.743643887037151 + Math.sin(t * 0.021) * scale * 0.10;
    cy = 0.131825904205330 + Math.cos(t * 0.017) * scale * 0.08;
  }
  cycleT += 0.00035;

  gl.uniform2f(U.u_res, canvas.width, canvas.height);
  gl.uniform2f(U.u_center, cx, cy);
  gl.uniform1f(U.u_scale, scale);
  gl.uniform1f(U.u_iter, iter);
  gl.uniform1f(U.u_cycle, cycle);
  gl.uniform3f(U.u_palette,
    0.0 + palT * 0.55,       // 相位：金/青 → 品红/蓝紫
    0.10 + palT * 0.15,
    0.20 + palT * 0.30);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  frames++;
  if (now - fpsT > 400) {
    const zoom = 2.8 / scale;
    document.getElementById('hZoom').textContent =
      zoom >= 1000 ? (zoom / 1000).toFixed(1) + 'k×' : zoom.toFixed(1) + '×';
    document.getElementById('hIter').textContent = Math.round(iter);
    document.getElementById('hCenter').textContent =
      cx.toFixed(7) + ' ' + (cy >= 0 ? '+' : '−') + Math.abs(cy).toFixed(7) + 'i';
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}
resize();
requestAnimationFrame(loop);

/* ============ 深潜控制 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '逃逸半径 R² = 256，命中即记录逃逸时间 n'],
      ['0.09s', '128 次迭代上界 —— 边界细节开始成片丢失'],
      ['0.18s', '输出：整体形状正确，螺旋臂只到第二层']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '迭代上界提到 512，逃逸半径不变'],
      ['1.6s', 'smooth iteration: n = i + 1 − log₂log₂|z|²/2，色带消除'],
      ['2.9s', '调色板切换相位 d = (0.55, 0.25, 0.50) → 品红/蓝紫'],
      ['4.1s', '潜速降至 0.35×，每像素最多 512 次复数乘法'],
      ['5.3s', '自校验：与 1024 迭代基准对比，边界像素差 < 0.6%'],
      ['6.4s', '输出：五层螺旋臂、迷你集合清晰、边界连续']
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
  iterT = deep ? 512 : 128;
  dive = deep ? 0.35 : 0.6;
  palTT = deep ? 1 : 0;
  document.getElementById('hIter').textContent = iterT;
  document.getElementById('sDive').value = Math.round(dive * 100);
  document.getElementById('vDive').textContent = dive.toFixed(2);
  document.getElementById('vpMeta').textContent = deep
    ? 'PALETTE: MAGENTA / INDIGO · AUTO-DIVE SLOW'
    : 'PALETTE: GOLD / TEAL · AUTO-DIVE';
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sDive').addEventListener('input', e => {
  dive = e.target.value / 100;
  document.getElementById('vDive').textContent = dive.toFixed(2);
});
document.getElementById('sCycle').addEventListener('input', e => {
  cycleT = e.target.value / 100;
  document.getElementById('vCycle').textContent = cycleT.toFixed(2);
});
document.getElementById('ctaAuto').addEventListener('click', () => {
  autoDive = !autoDive;
  document.getElementById('vpMeta').textContent =
    autoDive ? 'PALETTE: AUTO-DIVE RESUMED' : 'PALETTE: MANUAL · AUTO-DIVE OFF';
});

/* ============ 研究手记 ============ */
const REPLIES = [
  '猜想已归档。结论：这一带的维数介于 1 与 2 之间，边界不可求长。',
  '切到 512 迭代深潜：五层螺旋臂都出来了，边界像素差 0.6% 以内。',
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
document.getElementById('ctaAxioms').addEventListener('click', () =>
  document.getElementById('axioms').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaDive').addEventListener('click', () =>
  document.getElementById('dive').scrollIntoView({ behavior: 'smooth' }));
