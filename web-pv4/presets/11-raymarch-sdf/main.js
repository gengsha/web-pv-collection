/* ============================================================
   Preset 11 · SDF Raymarching
   全屏片元着色器：解析几何 + 光线步进 + 法线差分 + 菲涅尔边缘光
   ============================================================ */
const canvas = document.getElementById('glCanvas');

const VS = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FS = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_rot;
uniform float u_cam;
uniform float u_morph;
uniform float u_steps;

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float smin(float a, float b, float k){
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float sdBox(vec3 p, vec3 b){
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdOcta(vec3 p, float s){ p = abs(p); return (p.x + p.y + p.z - s) * 0.57735027; }

float map(vec3 p){
  vec3 q = p;
  q.xz *= rot(u_time * 0.30 + u_rot.x);
  q.xy *= rot(u_time * 0.17 + u_rot.y);
  float box = sdBox(q, vec3(0.60)) - 0.14;
  float sph = length(q) - (0.92 + 0.07 * sin(u_time * 1.4));
  float tor = sdTorus(q, vec2(1.16, 0.12 + 0.10 * u_morph));
  float oct = sdOcta(q * 1.35, 1.05) / 1.35;
  float d = mix(smin(box, sph, 0.55), smin(tor, oct, 0.32), u_morph);
  return d * 0.92;
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.0016, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / u_res.y;
  vec3 ro = vec3(0.0, 0.0, u_cam);
  vec3 rd = normalize(vec3(uv, -1.7));

  float t = 0.0, d = 0.0;
  vec3 p = ro;
  for (int i = 0; i < 192; i++) {
    if (float(i) >= u_steps) break;
    p = ro + rd * t;
    d = map(p);
    if (d < 0.0012 || t > 11.0) break;
    t += d;
  }

  // 背景：深空渐变 + 极细网格
  vec3 col = mix(vec3(0.015, 0.022, 0.045), vec3(0.04, 0.02, 0.07), uv.y + 0.4);
  col += 0.02 * smoothstep(0.985, 1.0, max(
    abs(sin(uv.x * 60.0)), abs(sin(uv.y * 60.0))));

  if (d < 0.0035) {
    vec3 n = calcNormal(p);
    vec3 l1 = normalize(vec3(0.75, 0.85, 0.55));
    vec3 l2 = normalize(vec3(-0.7, -0.2, 0.4));
    float diff = max(dot(n, l1), 0.0);
    float fill = max(dot(n, l2), 0.0) * 0.35;
    float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
    float spec = pow(max(dot(reflect(rd, n), l1), 0.0), 28.0);

    vec3 base = mix(vec3(0.22, 0.42, 0.85), vec3(0.62, 0.28, 0.82), u_morph);
    col  = base * (0.10 + 0.85 * diff);
    col += base * fill;
    col += fres * mix(vec3(0.35, 0.85, 1.0), vec3(1.0, 0.45, 0.95), u_morph) * 1.25;
    col += spec * vec3(1.0) * 0.9;
    col *= 1.0 - 0.35 * smoothstep(4.0, 11.0, t);   // 距离衰减
  }

  // 色调映射 + 暗角
  col = col / (1.0 + col * 0.55);
  col *= 1.0 - 0.45 * dot(uv, uv) * 0.6;
  gl_FragColor = vec4(col, 1.0);
}
`;

const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });

/* WebGL 不可用时的降级提示（旧设备 / 关闭硬件加速 / 部分无头浏览器） */
if (!gl) {
  const tip = document.createElement('div');
  tip.setAttribute('role', 'alert');
  tip.style.cssText = 'position:fixed;inset:0;display:grid;place-items:center;padding:24px;text-align:center;background:#05060a;color:#cbd5e1;font:15px/1.7 system-ui,sans-serif;z-index:9999';
  tip.innerHTML = '当前浏览器无法创建 WebGL 上下文，本预设无法渲染。<br>请开启浏览器的硬件加速，或换用最新版 Chrome / Edge / Firefox / Safari。';
  document.body.appendChild(tip);
  throw new Error('WebGL unavailable');
}

let prog, U = {}, rotX = 0, rotY = 0, camZ = 3.4;
let rotSpeed = 0.25, morph = 0, morphTarget = 0, steps = 96, stepsTarget = 96;
let dpr = 1;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
  return s;
}

function init() {
  prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  ['u_res', 'u_time', 'u_rot', 'u_cam', 'u_morph', 'u_steps'].forEach(k => {
    U[k] = gl.getUniformLocation(prog, k);
  });

  // GPU 名称
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  if (dbg) {
    const name = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || 'WebGL';
    document.getElementById('hudGpu').textContent = String(name).slice(0, 22);
  } else {
    document.getElementById('hudGpu').textContent = 'WebGL 1.0';
  }
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
}

if (gl) {
  init();
  resize();
  window.addEventListener('resize', resize);

  // 拖拽旋转 / 滚轮推拉
  let dragging = false, lastX = 0, lastY = 0, autoX = 0;
  canvas.addEventListener('mousedown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; });
  window.addEventListener('mouseup', () => dragging = false);
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    rotX += (e.clientX - lastX) * 0.006;
    rotY += (e.clientY - lastY) * 0.006;
    lastX = e.clientX; lastY = e.clientY;
  });
  window.addEventListener('wheel', e => {
    camZ = Math.max(2.2, Math.min(6.0, camZ + e.deltaY * 0.0016));
  }, { passive: true });
  window.__autoX = () => autoX;

  const t0 = performance.now();
  let frames = 0, fpsT = t0;

  function frame(now) {
    const time = (now - t0) / 1000;
    autoX += 0;
    morph += (morphTarget - morph) * 0.06;
    steps += (stepsTarget - steps) * 0.12;

    gl.uniform2f(U.u_res, canvas.width, canvas.height);
    gl.uniform1f(U.u_time, time * rotSpeed / 0.25);
    gl.uniform2f(U.u_rot, rotX + time * rotSpeed, rotY);
    gl.uniform1f(U.u_cam, camZ);
    gl.uniform1f(U.u_morph, morph);
    gl.uniform1f(U.u_steps, steps);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    frames++;
    if (now - fpsT > 500) {
      const fps = Math.round(frames * 1000 / (now - fpsT));
      document.getElementById('hudFps').textContent = fps;
      document.getElementById('hudSteps').textContent = Math.round(steps);
      const mega = (steps * canvas.width * canvas.height / 1e6).toFixed(1);
      document.getElementById('hudCalls').textContent = mega + 'M';
      frames = 0; fpsT = now;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ============ 步进预算控制台 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', 'SDF 采样：球体 + 圆角盒，smooth-min 融合 k=0.55'],
      ['0.09s', '步进预算 64 步，命中即提前退出 → 边缘略有锯齿'],
      ['0.18s', '输出：轮廓正确，倒角与菲涅尔边缘为近似值']
    ],
    meta: ['96', '0.18s', '3']
  },
  deep: {
    rows: [
      ['0.4s', 'SDF 采样：环面 + 八面体，smooth-min 融合 k=0.32'],
      ['1.6s', '步进预算 192 步，法线差分 ε=0.0016 中心差分'],
      ['2.9s', '命中判定收紧至 d<0.0012，薄壁结构不再穿透'],
      ['4.1s', '加入镜面高光项 pow(dot(reflect),28) 与距离衰减'],
      ['5.3s', '自校验：对比 384 步基准，像素差异 < 0.4%'],
      ['6.4s', '输出：全精度轮廓、完整倒角、菲涅尔边缘光连续']
    ],
    meta: ['1,840', '6.40s', '6']
  }
};

const stepBtns = document.querySelectorAll('.step-btn');
const traceBox = document.getElementById('traceBox');
const mTok = document.getElementById('mTok');
const mLat = document.getElementById('mLat');
const mStep = document.getElementById('mStep');

function renderTrace(mode) {
  const d = TRACES[mode];
  traceBox.innerHTML = '';
  d.rows.forEach(([t, txt], i) => {
    const row = document.createElement('div');
    row.className = 't-row' + (i === d.rows.length - 1 ? ' final' : '');
    row.style.animationDelay = `${i * 70}ms`;
    row.innerHTML = `<span class="t-time">${t}</span><span class="t-txt">${txt}</span>`;
    traceBox.appendChild(row);
  });
  mTok.textContent = d.meta[0];
  mLat.textContent = d.meta[1];
  mStep.textContent = d.meta[2];
}

stepBtns.forEach(btn => btn.addEventListener('click', () => {
  stepBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const deep = btn.dataset.mode === 'deep';
  stepsTarget = deep ? 192 : 64;
  morphTarget = deep ? 1 : 0;
  document.getElementById('morphRange').value = deep ? 100 : 0;
  document.getElementById('valMorph').textContent = deep ? '1.00' : '0.00';
  renderTrace(btn.dataset.mode);
}));
renderTrace('instant');

document.getElementById('rotRange').addEventListener('input', e => {
  rotSpeed = e.target.value / 100;
  document.getElementById('valRot').textContent = rotSpeed.toFixed(2);
});
document.getElementById('morphRange').addEventListener('input', e => {
  morphTarget = e.target.value / 100;
  document.getElementById('valMorph').textContent = morphTarget.toFixed(2);
});

/* ============ 终端 ============ */
const REPLIES = [
  '已编译。结论：可以，且只需重写 map() 里那一行融合式。',
  '切到 192 步重算了：薄壁穿透消失，差异 0.4% 以内。',
  '仓库读完了，改动集中在三个文件，测试一并补上。',
  '四路并行检索，比串行少三轮往返。',
  '提示：这个规模下 KV Cache 会先于权重顶到显存上限。'
];
const log = document.getElementById('termLog');
const input = document.getElementById('termInput');
let idx = 0;

function push(who, txt, isMe) {
  const el = document.createElement('div');
  el.className = 'tline' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="tw">${who}</span><span class="tt">${txt}</span>`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}
function run() {
  const v = input.value.trim();
  if (!v) return;
  push('you', v, true);
  input.value = '';
  setTimeout(() => push('hy4', REPLIES[idx++ % REPLIES.length], false), 520);
}
document.getElementById('termSend').addEventListener('click', run);
input.addEventListener('keydown', e => { if (e.key === 'Enter') run(); });

/* ============ 其它 ============ */
const io = new IntersectionObserver(en => {
  en.forEach(e => {
    if (e.isIntersecting) {
      const b = e.target;
      b.style.setProperty('--w', b.dataset.w);
      b.classList.add('fill');
      io.unobserve(b);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.b-bar i').forEach(b => io.observe(b));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaKernels').addEventListener('click', () =>
  document.getElementById('kernels').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaConsole').addEventListener('click', () =>
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaDepth').addEventListener('click', () => {
  document.getElementById('console').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => stepBtns[1].click(), 600);
});
