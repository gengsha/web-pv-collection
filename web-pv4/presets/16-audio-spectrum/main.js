/* ============================================================
   Preset 16 · Web Audio Spectrum
   实时合成（振荡器 + 噪声）+ AnalyserNode FFT + 径向/线性/波形三重可视化
   ============================================================ */
const cv = document.getElementById('viz');
const ctx = cv.getContext('2d');
let W = 0, H = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = cv.clientWidth; H = cv.clientHeight;
  cv.width = Math.floor(W * dpr);
  cv.height = Math.floor(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resize);
resize();

/* ---------- 音频引擎 ---------- */
let ac = null, master = null, analyser = null, freq = null, wave = null;
let noiseBuf = null, started = false, playing = false, usingMic = false;
let bars = 64, smooth = 0.80, gainVal = 0.7, persistence = 0;

async function initAudio() {
  ac = new (window.AudioContext || window.webkitAudioContext)();
  master = ac.createGain();
  master.gain.value = gainVal;

  const comp = ac.createDynamicsCompressor();
  analyser = ac.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = smooth;

  master.connect(comp);
  comp.connect(analyser);
  analyser.connect(ac.destination);

  freq = new Uint8Array(analyser.frequencyBinCount);   // 1024
  wave = new Uint8Array(analyser.fftSize);             // 2048

  // 白噪声缓冲（踩镲）
  noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.5, ac.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
}

function env(g, t, a, dec, peak) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(peak, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
}
function kick(t) {
  const o = ac.createOscillator(), g = ac.createGain();
  o.frequency.setValueAtTime(150, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.11);
  env(g, t, 0.004, 0.26, 0.9);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + 0.32);
}
function hat(t) {
  const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
  s.buffer = noiseBuf;
  f.type = 'highpass'; f.frequency.value = 7200;
  env(g, t, 0.002, 0.045, 0.16);
  s.connect(f); f.connect(g); g.connect(master);
  s.start(t); s.stop(t + 0.08);
}
function bass(t, note) {
  const o = ac.createOscillator(), f = ac.createBiquadFilter(), g = ac.createGain();
  o.type = 'sawtooth';
  o.frequency.value = note;
  f.type = 'lowpass'; f.frequency.setValueAtTime(220, t);
  f.frequency.exponentialRampToValueAtTime(900, t + 0.06);
  env(g, t, 0.01, 0.20, 0.34);
  o.connect(f); f.connect(g); g.connect(master);
  o.start(t); o.stop(t + 0.26);
}
function arp(t, note) {
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = 'triangle';
  o.frequency.value = note;
  env(g, t, 0.006, 0.16, 0.14);
  o.connect(g); g.connect(master);
  o.start(t); o.stop(t + 0.2);
}

const SCALE = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];
const BASS_SEQ = [55.00, 55.00, 73.42, 61.74, 55.00, 82.41, 73.42, 61.74];
let step = 0, nextTime = 0, timer = null;

function scheduler() {
  if (!playing) return;
  const spb = 0.16;                                // 每步时长
  while (nextTime < ac.currentTime + 0.12) {
    if (step % 4 === 0) kick(nextTime);
    if (step % 2 === 1) hat(nextTime);
    if (step % 2 === 0) bass(nextTime, BASS_SEQ[(step >> 1) % 8]);
    if (step % 1 === 0) arp(nextTime, SCALE[(step * 3) % 8] * (step % 8 < 4 ? 1 : 1.5));
    nextTime += spb;
    step++;
  }
}

async function start() {
  if (!ac) await initAudio();
  if (ac.state === 'suspended') await ac.resume();
  if (!usingMic) {
    playing = true;
    nextTime = ac.currentTime + 0.05;
    if (!timer) timer = setInterval(scheduler, 25);
  }
  started = true;
  document.getElementById('playOverlay').classList.add('hidden');
}

async function useMic() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if (!ac) await initAudio();
    if (ac.state === 'suspended') await ac.resume();
    playing = false;                                  // 停掉合成器
    const src = ac.createMediaStreamSource(stream);
    src.connect(analyser);
    usingMic = true;
    document.getElementById('hSrc').textContent = 'MIC';
    started = true;
    document.getElementById('playOverlay').classList.add('hidden');
  } catch (e) {
    document.getElementById('hSrc').textContent = 'MIC DENIED';
  }
}

document.getElementById('playBtn').addEventListener('click', start);
document.getElementById('ctaMic').addEventListener('click', useMic);
cv.addEventListener('click', () => {
  if (!started) return start();
  playing = !playing;
  if (playing) { nextTime = ac.currentTime + 0.05; }
});

/* ---------- 可视化 ---------- */
const fake = new Float32Array(256);
let t0 = performance.now();
let frames = 0, fpsT = t0;

function values() {
  const out = new Float32Array(bars);
  if (started && analyser) {
    analyser.smoothingTimeConstant = smooth;
    analyser.getByteFrequencyData(freq);
    const usable = Math.floor(freq.length * 0.55);      // 高频基本是空的
    for (let i = 0; i < bars; i++) {
      // 对数分箱：低频窄、高频宽，更接近听感
      const a = Math.floor(Math.pow(i / bars, 1.7) * usable);
      const b = Math.max(a + 1, Math.floor(Math.pow((i + 1) / bars, 1.7) * usable));
      let sum = 0;
      for (let k = a; k < b && k < usable; k++) sum += freq[k];
      out[i] = sum / (b - a) / 255;
    }
  } else {
    const t = (performance.now() - t0) / 1000;
    for (let i = 0; i < bars; i++) {
      out[i] = 0.5 + 0.42 * Math.sin(t * 1.6 + i * 0.22) * Math.sin(t * 0.4 + i * 0.06);
      out[i] = Math.max(0, out[i] * (1 - i / bars * 0.55));
    }
  }
  return out;
}

function draw() {
  ctx.fillStyle = 'rgba(5, 3, 16, 1)';
  ctx.fillRect(0, 0, W, H);

  const v = values();
  const cx = W / 2, cy = H * 0.47;
  const baseR = Math.min(W, H) * 0.16;

  // ① 径向频谱
  ctx.lineCap = 'round';
  for (let i = 0; i < bars; i++) {
    const ang = (i / bars) * Math.PI * 2 - Math.PI / 2;
    const len = 12 + v[i] * Math.min(W, H) * 0.20;
    const x1 = cx + Math.cos(ang) * baseR;
    const y1 = cy + Math.sin(ang) * baseR;
    const x2 = cx + Math.cos(ang) * (baseR + len);
    const y2 = cy + Math.sin(ang) * (baseR + len);
    const hue = 300 - (i / bars) * 130;
    ctx.strokeStyle = `hsla(${hue}, 95%, ${55 + v[i] * 25}%, ${0.35 + v[i] * 0.65})`;
    ctx.lineWidth = Math.max(1.6, (Math.PI * 2 * baseR / bars) * 0.55);
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  // 中心圆 + 电平环
  ctx.beginPath();
  ctx.arc(cx, cy, baseR - 8, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(10, 5, 24, .85)';
  ctx.fill();
  let rms = 0; for (let i = 0; i < bars; i++) rms += v[i];
  rms /= bars;
  ctx.beginPath();
  ctx.arc(cx, cy, baseR - 8 + rms * 26, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(64, 232, 255, ${0.25 + rms * 0.6})`;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = 'rgba(230, 210, 255, .85)';
  ctx.font = '600 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(started ? (usingMic ? 'MIC LIVE' : 'SYNTH LIVE') : 'STANDBY', cx, cy + 4);

  // ② 底部线性柱 + 倒影
  const bw = W / bars;
  for (let i = 0; i < bars; i++) {
    const h = v[i] * H * 0.26;
    const hue = 300 - (i / bars) * 130;
    ctx.fillStyle = `hsla(${hue}, 95%, 60%, .9)`;
    ctx.fillRect(i * bw + 1, H - h, bw - 2, h);
    ctx.fillStyle = `hsla(${hue}, 95%, 62%, .18)`;
    ctx.fillRect(i * bw + 1, H - h - h * 0.45, bw - 2, h * 0.45);
  }

  // ③ 波形（DEEP 档显示）
  if (persistence > 0 && started && analyser) {
    analyser.getByteTimeDomainData(wave);
    ctx.beginPath();
    for (let i = 0; i < wave.length; i += 4) {
      const x = (i / wave.length) * W;
      const y = H * 0.80 + (wave[i] - 128) / 128 * H * 0.07;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(198, 255, 92, ${persistence})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}

function loop(now) {
  draw();
  frames++;
  if (now - fpsT > 500) {
    document.getElementById('hFps').textContent = Math.round(frames * 1000 / (now - fpsT));
    frames = 0; fpsT = now;
  }
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* 鼠标控制滤波（仅合成模式有效） */
window.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  if (master) master.gain.value = gainVal * (0.65 + x * 0.5);
}, { passive: true });

/* ============ DSP 参数 ============ */
const TRACES = {
  instant: {
    rows: [
      ['0.02s', 'AnalyserNode fftSize 2048 → frequencyBinCount 1024'],
      ['0.09s', '32 根柱，平滑常数 0.55 —— 响应快、抖动明显'],
      ['0.18s', '输出：节拍可辨，泛音结构被折叠']
    ]
  },
  deep: {
    rows: [
      ['0.4s', '提高到 128 根柱，对数分箱 pow(i/bars, 1.7)'],
      ['1.6s', '每根柱对所属频段取均值，抑制高频空 bins 的噪声'],
      ['2.9s', '平滑常数 0.90 —— 拖尾更长，形态更连续'],
      ['4.1s', '叠加 getByteTimeDomainData 波形层（2048 点抽样绘制）'],
      ['5.3s', '自校验：与离线 FFT 结果比对，频峰位置误差 < 1 bin'],
      ['6.4s', '输出：完整泛音结构 + 稳定波形 + 连贯的径向形态']
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
  bars = deep ? 128 : 32;
  smooth = deep ? 0.90 : 0.55;
  persistence = deep ? 0.85 : 0;
  document.getElementById('hBars').textContent = bars;
  document.getElementById('hSmooth').textContent = smooth.toFixed(2);
  document.getElementById('sSmooth').value = Math.round(smooth * 100);
  document.getElementById('vSmooth').textContent = smooth.toFixed(2);
  document.getElementById('vpMeta').textContent = deep
    ? 'RADIAL 128 + LINEAR + WAVEFORM + AFTERGLOW'
    : 'RADIAL 32 + LINEAR';
  renderTrace(b.dataset.mode);
}));
renderTrace('instant');
document.getElementById('hBars').textContent = bars;
document.getElementById('hSmooth').textContent = smooth.toFixed(2);

document.getElementById('sSmooth').addEventListener('input', e => {
  smooth = e.target.value / 100;
  document.getElementById('vSmooth').textContent = smooth.toFixed(2);
  document.getElementById('hSmooth').textContent = smooth.toFixed(2);
});
document.getElementById('sGain').addEventListener('input', e => {
  gainVal = e.target.value / 100;
  document.getElementById('vGain').textContent = gainVal.toFixed(2);
  if (master) master.gain.value = gainVal;
});

/* ============ 终端 ============ */
const REPLIES = [
  '收到。结论：这一轨动态过窄，压缩器阈值下调 3dB 即可。',
  '切到 128 柱高分辨：泛音结构出来了，频峰误差 1 个 bin 以内。',
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
document.getElementById('ctaRacks').addEventListener('click', () =>
  document.getElementById('racks').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaDsp').addEventListener('click', () =>
  document.getElementById('dsp').scrollIntoView({ behavior: 'smooth' }));
