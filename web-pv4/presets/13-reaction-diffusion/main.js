/* ============================================================
   Preset 13 · Reaction-Diffusion (Gray-Scott)
   GPU ping-pong FBO：9 点拉普拉斯 stencil + 每帧多迭代 + 手动双线性上采样
   ============================================================ */
const canvas = document.getElementById('sim');
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
const SIZE = 256;

const VS = `attribute vec2 a; varying vec2 v_uv;
void main(){ v_uv = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

const FS_INIT = `
precision highp float;
varying vec2 v_uv;
uniform float u_seed;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)) + u_seed) * 43758.5453123); }
void main(){
  float a = 1.0, b = 0.0;
  if (hash(floor(v_uv * 256.0)) > 0.9962) b = 1.0;
  if (distance(v_uv, vec2(0.5)) < 0.03) b = 1.0;
  gl_FragColor = vec4(a, b, 0.0, 1.0);
}`;

const FS_SIM = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_state;
uniform vec2  u_texel;
uniform float u_f, u_k, u_dt;
uniform vec3  u_brush;      // xy = 位置, z = 半径（<=0 关闭）

vec2 S(vec2 uv){ return texture2D(u_state, uv).rg; }

void main(){
  vec2 c = S(v_uv);
  // 9 点拉普拉斯 stencil（正交 0.2 / 对角 0.05，权重和 = 1）
  vec2 lap = vec2(0.0);
  lap += S(v_uv + vec2(-1.0, 0.0) * u_texel) * 0.2;
  lap += S(v_uv + vec2( 1.0, 0.0) * u_texel) * 0.2;
  lap += S(v_uv + vec2( 0.0,-1.0) * u_texel) * 0.2;
  lap += S(v_uv + vec2( 0.0, 1.0) * u_texel) * 0.2;
  lap += S(v_uv + vec2(-1.0,-1.0) * u_texel) * 0.05;
  lap += S(v_uv + vec2( 1.0,-1.0) * u_texel) * 0.05;
  lap += S(v_uv + vec2(-1.0, 1.0) * u_texel) * 0.05;
  lap += S(v_uv + vec2( 1.0, 1.0) * u_texel) * 0.05;
  lap -= c;

  float a = c.x, b = c.y;
  float abb = a * b * b;
  float na = a + (1.0 * lap.x - abb + u_f * (1.0 - a)) * u_dt;
  float nb = b + (0.5 * lap.y + abb - (u_f + u_k) * b) * u_dt;

  if (u_brush.z > 0.0 && distance(v_uv, u_brush.xy) < u_brush.z) {
    na = 0.35; nb = 1.0;                        // 接种
  }
  gl_FragColor = vec4(clamp(na, 0.0, 1.0), clamp(nb, 0.0, 1.0), 0.0, 1.0);
}`;

const FS_SHOW = `
precision highp float;
varying vec2 v_uv;
uniform sampler2D u_state;
uniform float u_size;

float bilinear(vec2 uv){
  vec2 t = 1.0 / u_size;
  vec2 g = uv * u_size - 0.5;
  vec2 f = fract(g);
  vec2 base = (floor(g) + 0.5) * t;
  float b00 = texture2D(u_state, base).g;
  float b10 = texture2D(u_state, base + vec2(t.x, 0.0)).g;
  float b01 = texture2D(u_state, base + vec2(0.0, t.y)).g;
  float b11 = texture2D(u_state, base + t).g;
  return mix(mix(b00, b10, f.x), mix(b01, b11, f.x), f.y);
}

void main(){
  float b = bilinear(v_uv);
  float v = smoothstep(0.06, 0.40, b);
  vec3 col = mix(vec3(0.010, 0.055, 0.048), vec3(0.08, 0.60, 0.50), v);
  col += pow(v, 3.0) * vec3(0.45, 1.0, 0.85);
  col += pow(v, 9.0) * vec3(0.80, 1.0, 0.55);
  // 培养皿式暗角
  float r = length(v_uv - 0.5);
  col *= 1.0 - smoothstep(0.35, 0.78, r) * 0.85;
  gl_FragColor = vec4(col, 1.0);
}`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
  return s;
}
function prog(fs) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  gl.useProgram(p);
  const loc = gl.getAttribLocation(p, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  return p;
}

const pInit = prog(FS_INIT);
const pSim = prog(FS_SIM);
const pShow = prog(FS_SHOW);

const U = {
  init: { seed: gl.getUniformLocation(pInit, 'u_seed') },
  sim: {
    state: gl.getUniformLocation(pSim, 'u_state'),
    texel: gl.getUniformLocation(pSim, 'u_texel'),
    f: gl.getUniformLocation(pSim, 'u_f'),
    k: gl.getUniformLocation(pSim, 'u_k'),
    dt: gl.getUniformLocation(pSim, 'u_dt'),
    brush: gl.getUniformLocation(pSim, 'u_brush')
  },
  show: { state: gl.getUniformLocation(pShow, 'u_state'), size: gl.getUniformLocation(pShow, 'u_size') }
};

// 浮点纹理能力探测
const extF = gl.getExtension('OES_texture_float');
const extH = gl.getExtension('OES_texture_half_float');
let TYPE = gl.UNSIGNED_BYTE;
if (extF) TYPE = gl.FLOAT;
else if (extH) TYPE = extH.HALF_FLOAT_OES;

function makeTarget() {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIZE, SIZE, 0, gl.RGBA, TYPE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  return { tex, fb, ok };
}

let A = makeTarget(), B = makeTarget();
if (!A.ok || !B.ok) {                       // 降级到 8bit，牺牲精度但不黑屏
  TYPE = gl.UNSIGNED_BYTE;
  A = makeTarget(); B = makeTarget();
}

function seed() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, A.fb);
  gl.viewport(0, 0, SIZE, SIZE);
  gl.useProgram(pInit);
  gl.uniform1f(U.init.seed, Math.random() * 1000);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

/* ---------- 状态 ---------- */
let f = 0.0367, k = 0.0649;
let fT = 0.0367, kT = 0.0649;
let iter = 4, brush = [0, 0, 0];
let painting = false;

canvas.addEventListener('mousedown', () => painting = true);
window.addEventListener('mouseup', () => { painting = false; brush[2] = 0; });
canvas.addEventListener('mousemove', e => {
  const r = canvas.getBoundingClientRect();
  brush[0] = (e.clientX - r.left) / r.width;
  brush[1] = 1 - (e.clientY - r.top) / r.height;
  if (painting) brush[2] = 0.018;
});

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(canvas.clientWidth * dpr) || Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr) || Math.floor(window.innerHeight * dpr);
}
window.addEventListener('resize', resize);

let frames = 0, fpsT = performance.now();

function loop(now) {
  f += (fT - f) * 0.05;
  k += (kT - k) * 0.05;

  // ---- 模拟：ping-pong ----
  gl.viewport(0, 0, SIZE, SIZE);
  gl.useProgram(pSim);
  gl.uniform2f(U.sim.texel, 1 / SIZE, 1 / SIZE);
  gl.uniform1f(U.sim.dt, 1.0);
  gl.uniform3f(U.sim.brush, brush[0], brush[1], brush[2]);
  gl.uniform1i(U.sim.state, 0);
  for (let i = 0; i < iter; i++) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, B.fb);
    gl.uniform1f(U.sim.f, f);
    gl.uniform1f(U.sim.k, k);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, A.tex);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    const t = A; A = B; B = t;
    if (brush[2] > 0) brush[2] = 0;      // 只在第一次迭代接种
  }

  // ---- 显示 ----
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.useProgram(pShow);
  gl.uniform1f(U.show.size, SIZE);
  gl.uniform1i(U.show.state, 0);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, A.tex);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    document.getElementById('hF').textContent = f.toFixed(4);
    document.getElementById('hK').textContent = k.toFixed(4);
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}

resize();
seed();
requestAnimationFrame(loop);

/* ============ 培养参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '读取上一帧浓度场（256² 双通道浮点纹理）'],
      ['0.09s', '4 次迭代，Dt=1.0，Da=1.0，Db=0.5'],
      ['0.18s', '输出：分裂态菌落可辨，边界尚粗糙']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '切换培养基：Feed 0.0545 / Kill 0.0620'],
      ['1.6s', '20 次迭代 / 帧 —— 每秒 1200 次全场拉普拉斯卷积'],
      ['2.9s', '9 点 stencil（正交 0.2、对角 0.05）抑制各向异性伪影'],
      ['4.1s', '自催化项 ab² 与抑制项 (f+k)b 进入准稳态'],
      ['5.3s', '自校验：对比 CPU 双精度基准，形态学分岔点吻合'],
      ['6.4s', '输出：珊瑚状分形生长，边缘稳定不振荡']
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
  fT = deep ? 0.0545 : 0.0367;
  kT = deep ? 0.0620 : 0.0649;
  iter = deep ? 20 : 4;
  document.getElementById('hIter').textContent = iter;
  document.getElementById('sF').value = Math.round(fT * 10000);
  document.getElementById('sK').value = Math.round(kT * 10000);
  document.getElementById('vF').textContent = fT.toFixed(4);
  document.getElementById('vK').textContent = kT.toFixed(4);
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sF').addEventListener('input', e => {
  fT = e.target.value / 10000;
  document.getElementById('vF').textContent = fT.toFixed(4);
});
document.getElementById('sK').addEventListener('input', e => {
  kT = e.target.value / 10000;
  document.getElementById('vK').textContent = kT.toFixed(4);
});
document.getElementById('ctaSeed').addEventListener('click', seed);

/* ============ 实验记录 ============ */
const REPLIES = [
  '已记录。结论：形态由 Feed/Kill 比值决定，与初始噪声无关。',
  '切到珊瑚培养基，20 次迭代后进入准稳态，不再振荡。',
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
document.getElementById('ctaStrains').addEventListener('click', () =>
  document.getElementById('strains').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaCulture').addEventListener('click', () =>
  document.getElementById('culture').scrollIntoView({ behavior: 'smooth' }));
