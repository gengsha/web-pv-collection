// Preset 10: Thought River 思维长河交互
document.addEventListener('DOMContentLoaded', () => {
  // ---------- 令牌流河 ----------
  const canvas = document.getElementById('riverCanvas');
  const ctx = canvas.getContext('2d');
  let W = 0, H = 0, t = 0;
  let tokens = [];
  let ripples = [];
  let mouse = { x: -9999, y: -9999 };
  const GLYPHS = ['思', '流', '光', '推', '理'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makeToken() {
    const glyph = Math.random() < 0.08;
    return {
      x: Math.random() * W,
      baseY: H * (0.42 + Math.random() * 0.16),
      amp: 10 + Math.random() * 26,
      freq: 0.004 + Math.random() * 0.005,
      phase: Math.random() * Math.PI * 2,
      speed: 1.2 + Math.random() * 2.2,
      size: glyph ? 11 + Math.random() * 4 : 1.2 + Math.random() * 2.2,
      color: Math.random() < 0.6 ? '240, 211, 135' : '63, 217, 232',
      alpha: 0.35 + Math.random() * 0.55,
      glyph: glyph ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
      bend: 0
    };
  }

  for (let i = 0; i < 110; i++) tokens.push(makeToken());

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // 涟漪：点击河面
  window.addEventListener('click', e => {
    if (e.target.closest('a, button, input')) return;
    ripples.push({ x: e.clientX, y: e.clientY, r: 4, alpha: 0.8 });
    if (ripples.length > 8) ripples.shift();
  });

  function loop() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);

    // 河面微光底
    const grad = ctx.createLinearGradient(0, H * 0.4, 0, H * 0.62);
    grad.addColorStop(0, 'rgba(63, 217, 232, 0)');
    grad.addColorStop(0.5, 'rgba(63, 217, 232, 0.04)');
    grad.addColorStop(1, 'rgba(63, 217, 232, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, H * 0.4, W, H * 0.22);

    // 令牌
    tokens.forEach(tk => {
      tk.x += tk.speed;
      if (tk.x > W + 20) {
        tk.x = -20;
        tk.baseY = H * (0.42 + Math.random() * 0.16);
      }

      const waveY = tk.baseY + Math.sin(tk.x * tk.freq + t * 2 + tk.phase) * tk.amp;

      // 指尖拨水：鼠标近距垂向斥力
      const dx = tk.x - mouse.x;
      const dy = waveY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let offsetY = 0;
      if (dist < 90) {
        const force = (90 - dist) / 90;
        offsetY = (dy >= 0 ? 1 : -1) * force * 26;
      }
      tk.bend += (offsetY - tk.bend) * 0.12;
      const y = waveY + tk.bend;

      // 拖尾
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${tk.color}, ${tk.alpha * 0.35})`;
      ctx.lineWidth = tk.glyph ? 2 : tk.size * 0.9;
      ctx.moveTo(tk.x - 12, y - Math.sin((tk.x - 12) * tk.freq + t * 2 + tk.phase) * tk.amp + tk.bend * 0.96);
      ctx.lineTo(tk.x, y);
      ctx.stroke();

      if (tk.glyph) {
        ctx.font = `${tk.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(${tk.color}, ${tk.alpha})`;
        ctx.fillText(tk.glyph, tk.x, y);
      } else {
        ctx.beginPath();
        ctx.arc(tk.x, y, tk.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tk.color}, ${tk.alpha})`;
        ctx.fill();
      }
    });

    // 涟漪
    ripples = ripples.filter(r => r.alpha > 0.02);
    ripples.forEach(r => {
      r.r += 1.6;
      r.alpha *= 0.96;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(240, 211, 135, ${r.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    requestAnimationFrame(loop);
  }
  loop();

  // ---------- 步石逐一点亮 ----------
  const stones = document.querySelectorAll('.stone-node');
  const notes = document.querySelectorAll('.stone-note');
  const crossing = document.getElementById('stoneCrossing');

  function updateStones() {
    if (!crossing) return;
    const rect = crossing.getBoundingClientRect();
    const viewH = window.innerHeight;
    // 滚动进入越多，点亮越多
    const progress = Math.min(1, Math.max(0, (viewH * 0.8 - rect.top) / (rect.height + viewH * 0.35)));
    const litCount = Math.floor(progress * stones.length + 0.35);
    stones.forEach((s, i) => s.classList.toggle('lit', i < litCount));
    notes.forEach((n, i) => n.classList.toggle('lit', i < litCount));
  }

  window.addEventListener('scroll', updateStones, { passive: true });
  updateStones();

  // ---------- 投石问河 ----------
  const riverInput = document.getElementById('riverInput');
  const riverReply = document.getElementById('riverReply');
  const replies = [
    '「石已入水。此刻河底正翻涌着六步推演，涌到岸边时即是答案。」',
    '「好问题，水深三尺。GLM 5.3 正溯流而上，去找它的源头。」',
    '「此问已化作一千枚令牌，正顺流而下。入海处见分晓。」',
    '「河流改道了——它发现了一条更近的支流。稍候，答案会更快抵达。」'
  ];

  if (riverInput) {
    riverInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && riverInput.value.trim()) {
        riverInput.value = '';
        riverReply.textContent = replies[Math.floor(Math.random() * replies.length)];
        // 投石涟漪：在对话台上方激起同心环
        const rect = riverInput.getBoundingClientRect();
        ripples.push({ x: rect.left + rect.width / 2, y: rect.top + 20, r: 6, alpha: 0.7 });
      }
    });
  }

  // 渐显
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
