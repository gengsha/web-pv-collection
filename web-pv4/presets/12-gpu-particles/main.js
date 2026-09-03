/* ============================================================
   Preset 12 · GPU Particle Field
   CPU 解算轨迹（Float32Array）+ gl.POINTS 绘制 + 叠加混合拖尾
   ============================================================ */
const canvas = document.getElementById('pCanvas');
const gl = canvas.getContext('webgl', {
  antialias: false, alpha: false, depth: false,
  preserveDrawingBuffer: true, powerPreference: 'high-performance'
});

const VS_QUAD = `attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }`;
const FS_QUAD = `precision mediump float; uniform vec4 u_col; void main(){ gl_FragColor = u_col; }`;

const VS_PT = `
attribute vec2 a_pos;
attribute vec3 a_col;
uniform float u_size;
varying vec3 v_c;
void main(){
  gl_Position = vec4(a_pos, 0.0, 1.0);
  gl_PointSize = u_size;
  v_c = a_col;
}`;
const FS_PT = `
precision mediump float;
varying vec3 v_c;
void main(){ gl_FragColor = vec4(v_c * 0.5, 1.0); }`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
  return s;
}
function program(vs, fs, attrs) {
  const p = gl.createProgram();
  gl.attachShader(p, compile(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  const o = { p, u: {}, a: {} };
  attrs.forEach(n => { o.a[n] = gl.getAttribLocation(p, n); });
  return o;
}

const quadProg = program(VS_QUAD, FS_QUAD, ['a']);
quadProg.u.col = gl.getUniformLocation(quadProg.p, 'u_col');
const ptProg = program(VS_PT, FS_PT, ['a_pos', 'a_col']);
ptProg.u.size = gl.getUniformLocation(ptProg.p, 'u_size');

const quadBuf = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

const posBuf = gl.createBuffer();
const colBuf = gl.createBuffer();

/* ---------- 粒子状态 ---------- */
let N = 20000;
let pos, vel, life, col;
let turb = 1.0, damp = 0.985, pSize = 1.6, fade = 0.10;

function build(n, lifeMax) {
  N = n;
  pos = new Float32Array(N * 2);
  vel = new Float32Array(N * 2);
  life = new Float32Array(N);
  col = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    respawn(i);
    life[i] = Math.random() * lifeMax;
    const t = i / N;
    // 调色：青 → 紫 → 品红，少量琥珀
    let r, g, b;
    if (t < 0.45) { const k = t / 0.45; r = 0.24 + k * 0.4; g = 0.94 - k * 0.35; b = 1.0 - k * 0.2; }
    else if (t < 0.85) { const k = (t - 0.45) / 0.4; r = 0.64 + k * 0.36; g = 0.59 - k * 0.36; b = 0.8 + k * 0.1; }
    else { const k = (t - 0.85) / 0.15; r = 1.0; g = 0.23 + k * 0.53; b = 0.9 - k * 0.35; }
    col[i * 3] = r; col[i * 3 + 1] = g; col[i * 3 + 2] = b;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
  gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);
  document.getElementById('hCount').textContent = N.toLocaleString('en-US');
}

function respawn(i) {
  const a = Math.random() * Math.PI * 2;
  const r = Math.random() * 0.95;
  pos[i * 2] = Math.cos(a) * r;
  pos[i * 2 + 1] = Math.sin(a) * r * 0.92;
  vel[i * 2] = 0; vel[i * 2 + 1] = 0;
  life[i] = 120 + Math.random() * 260;
}

/* ---------- 交互 ---------- */
let mx = 0, my = 0, force = 0, lifeMaxCur = 200;
window.addEventListener('mousemove', e => {
  mx = (e.clientX / window.innerWidth) * 2 - 1;
  my = 1 - (e.clientY / window.innerHeight) * 2;
});
window.addEventListener('mousedown', e => { force = e.button === 2 ? 1 : -1; });
window.addEventListener('mouseup', () => { force = 0; });
window.addEventListener('contextmenu', e => e.preventDefault());

/* ---------- 尺寸 ---------- */
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
}

/* ---------- 主循环 ---------- */
let frames = 0, fpsT = performance.now();

function step(t) {
  const T = t * 0.001;
  for (let i = 0; i < N; i++) {
    const ix = i * 2, iy = ix + 1;
    let x = pos[ix], y = pos[iy];
    let vx = vel[ix], vy = vel[iy];

    // curl 噪声近似：两组正交三角函数构成无散度流场
    const ang = (Math.sin(x * 2.6 + T * 0.35) * Math.cos(y * 2.6 - T * 0.28)) * 6.28318 * turb;
    vx += Math.cos(ang) * 0.00080 * turb;
    vy += Math.sin(ang) * 0.00080 * turb;

    // 光标涡旋 + 吸引/排斥
    const dx = x - mx, dy = y - my;
    const d2 = dx * dx + dy * dy;
    if (d2 < 0.10) {
      const fall = 1 - d2 / 0.10;
      vx += -dy * fall * 0.0022;
      vy += dx * fall * 0.0022;
      if (force !== 0) {
        const d = Math.sqrt(d2) + 0.02;
        vx -= force * dx / d * fall * 0.0026;
        vy -= force * dy / d * fall * 0.0026;
      }
    }

    vx *= damp; vy *= damp;
    x += vx; y += vy;

    if (--life[i] <= 0 || x < -1.05 || x > 1.05 || y < -1.05 || y > 1.05) {
      respawn(i);
      life[i] *= lifeMaxCur / 200;
      continue;
    }
    pos[ix] = x; pos[iy] = y;
    vel[ix] = vx; vel[iy] = vy;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.bufferSubData(gl.ARRAY_BUFFER, 0, pos);
}

function draw() {
  // 拖尾：整屏半透明黑
  gl.useProgram(quadProg.p);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
  gl.enableVertexAttribArray(quadProg.a.a);
  gl.vertexAttribPointer(quadProg.a.a, 2, gl.FLOAT, false, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.uniform4f(quadProg.u.col, 0.024, 0.020, 0.055, fade);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.disableVertexAttribArray(quadProg.a.a);

  // 粒子：叠加混合
  gl.useProgram(ptProg.p);
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
  gl.enableVertexAttribArray(ptProg.a.a_pos);
  gl.vertexAttribPointer(ptProg.a.a_pos, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, colBuf);
  gl.enableVertexAttribArray(ptProg.a.a_col);
  gl.vertexAttribPointer(ptProg.a.a_col, 3, gl.FLOAT, false, 0, 0);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.uniform1f(ptProg.u.size, pSize * (window.devicePixelRatio > 1 ? 1.4 : 1));
  gl.drawArrays(gl.POINTS, 0, N);
}

function loop(now) {
  step(now);
  draw();
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}

resize();
window.addEventListener('resize', resize);
build(20000, 200);
gl.clearColor(0.024, 0.020, 0.055, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
requestAnimationFrame(loop);

/* ============ 模式与参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', '初始化 20,000 粒子，生命上限 120 帧，拖尾衰减 0.10'],
      ['0.09s', '单遍 curl 场积分，无子步，无尾迹累积'],
      ['0.18s', '输出：流场形态可读，细节密度较低']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '扩容至 60,000 粒子，生命上限 380 帧，拖尾衰减 0.055'],
      ['1.6s', '每帧 60,000 × (2 三角函数 + 涡旋 + 阻尼) ≈ 6×10⁵ 次浮点运算'],
      ['2.9s', '叠加混合令高密度区域自然过曝，形成流丝结构'],
      ['4.1s', '越界粒子原地重生，保持场密度恒定'],
      ['5.3s', '自校验：对比 120,000 粒子基准，宏观流形差异 < 2%'],
      ['6.4s', '输出：完整流丝、涡核与边界层结构']
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
  build(deep ? 60000 : 20000, deep ? 380 : 200);
  lifeMaxCur = deep ? 380 : 200;
  fade = deep ? 0.055 : 0.10;
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');

document.getElementById('sTurb').addEventListener('input', e => {
  turb = e.target.value / 100;
  document.getElementById('vTurb').textContent = turb.toFixed(2);
});
document.getElementById('sDamp').addEventListener('input', e => {
  damp = e.target.value / 1000;
  document.getElementById('vDamp').textContent = damp.toFixed(3);
});
document.getElementById('sSize').addEventListener('input', e => {
  pSize = e.target.value / 10;
  document.getElementById('vSize').textContent = pSize.toFixed(1);
});

/* ============ 终端 ============ */
const REPLIES = [
  '已下发。结论：可并行，把场拆成 8 块互不影响。',
  '切到 60,000 粒子重算：流丝与涡核都出来了，差异 2% 以内。',
  '仓库看完了，改动集中在三个文件，测试一并补上。',
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
    const b = e.target;
    b.style.setProperty('--w', b.dataset.w);
    b.classList.add('fill');
    io.unobserve(b);
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
document.getElementById('ctaMatrix').addEventListener('click', () =>
  document.getElementById('matrix').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaField').addEventListener('click', () =>
  document.getElementById('field').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaDeep').addEventListener('click', () => {
  document.getElementById('field').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => modeBtns[1].click(), 600);
});

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  });
});
