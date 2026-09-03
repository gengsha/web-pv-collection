// Preset 07: Fusion Core 聚变环芯交互
document.addEventListener('DOMContentLoaded', () => {
  // ---------- 粒子场：椭圆轨道 + 鼠标磁场扰动 ----------
  const canvas = document.getElementById('plasmaCanvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;
  const COLORS = ['#a24dff', '#ff3d8a', '#35e7ff'];
  let particles = [];
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function makeParticle() {
    const cx = Math.random() * W;
    const cy = Math.random() * H;
    return {
      cx, cy,
      rx: 60 + Math.random() * 160,
      ry: 24 + Math.random() * 70,
      angle: Math.random() * Math.PI * 2,
      speed: (0.004 + Math.random() * 0.01) * (Math.random() < 0.5 ? 1 : -1),
      size: 1 + Math.random() * 2.2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  for (let i = 0; i < 70; i++) particles.push(makeParticle());

  function drawPlasma() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      p.angle += p.speed;
      let x = p.cx + Math.cos(p.angle) * p.rx;
      let y = p.cy + Math.sin(p.angle) * p.ry;

      // 鼠标磁场：近距粒子被斥开
      const dx = x - mouse.x;
      const dy = y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 160 && dist > 0.001) {
        const force = (160 - dist) / 160;
        x += (dx / dist) * force * 26;
        y += (dy / dist) * force * 26;
      }

      ctx.globalAlpha = 0.55;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawPlasma);
  }
  requestAnimationFrame(drawPlasma);

  // ---------- 遥测刷新 ----------
  const teleTime = document.getElementById('teleTime');
  if (teleTime) {
    setInterval(() => {
      const base = 38.2 + (Math.random() - 0.5) * 2.2;
      teleTime.textContent = base.toFixed(1) + 's';
    }, 900);
  }

  // ---------- 滚动充能 ----------
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('visible');
      if (en.target.classList.contains('gauge-card')) {
        const bar = en.target.querySelector('.energy-bar');
        const num = en.target.querySelector('.gauge-num');
        const segs = bar.querySelectorAll('.seg');
        const target = parseFloat(bar.dataset.fill);
        const litSegs = Math.round(target / 10);
        segs.forEach((s, i) => {
          if (i < litSegs) {
            s.style.setProperty('--i', (i * 0.06) + 's');
            setTimeout(() => s.classList.add('lit'), i * 60);
          }
        });
        setTimeout(() => bar.classList.add('charged'), 60);
        // 数字滚动
        let cur = 0;
        const step = target / 30;
        const timer = setInterval(() => {
          cur += step;
          if (cur >= target) { cur = target; clearInterval(timer); }
          num.textContent = cur.toFixed(1);
        }, 26);
      }
      io.unobserve(en.target);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- 控制台 ----------
  const consoleInput = document.getElementById('consoleInput');
  const injectBtn = document.getElementById('injectBtn');
  const chatLog = document.getElementById('chatLog');
  const replies = [
    '> 燃料已注入。磁约束校准中…推理链已点燃，输出功率上升。',
    '> 收到。正在提高约束场强度——此问预计 3 步推演，38 秒内交付。',
    '> 等离子体温度上升至 1.2 亿度。答案正在聚变，稍候。',
    '> 已并入主流道。GLM 5.3 将把此题烧到通透为止。'
  ];

  function inject() {
    const text = consoleInput.value.trim();
    if (!text) return;
    consoleInput.value = '';
    const userMsg = document.createElement('div');
    userMsg.className = 'c-msg user';
    userMsg.innerHTML = `<span class="c-avatar mono">&gt;</span><p>${escapeHtml(text)}</p>`;
    chatLog.appendChild(userMsg);
    chatLog.scrollTop = chatLog.scrollHeight;
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'c-msg ai';
      aiMsg.innerHTML = `<span class="c-avatar mono">&gt;_</span><p>${replies[Math.floor(Math.random() * replies.length)]}</p>`;
      chatLog.appendChild(aiMsg);
      chatLog.scrollTop = chatLog.scrollHeight;
    }, 750);
  }

  if (injectBtn) injectBtn.addEventListener('click', inject);
  if (consoleInput) consoleInput.addEventListener('keydown', e => { if (e.key === 'Enter') inject(); });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
