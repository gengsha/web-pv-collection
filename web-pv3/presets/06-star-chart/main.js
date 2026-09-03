// Preset 06: Stone Star Chart 石刻星图交互
document.addEventListener('DOMContentLoaded', () => {
  // ---------- 星野 Canvas ----------
  const canvas = document.getElementById('starCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let meteors = [];
  let W = 0, H = 0;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    const count = Math.min(180, Math.floor(W * H / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.2,
      gold: Math.random() < 0.18
    }));
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnMeteor() {
    const x = W * (0.4 + Math.random() * 0.55);
    const y = -20;
    const angle = Math.PI * 0.72; // 右上向左下
    meteors.push({ x, y, vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7, life: 1 });
    setTimeout(spawnMeteor, 4000 + Math.random() * 4000);
  }
  setTimeout(spawnMeteor, 1800);

  function drawStars(t) {
    ctx.clearRect(0, 0, W, H);
    // 星点
    for (const s of stars) {
      const tw = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase));
      ctx.globalAlpha = tw;
      ctx.fillStyle = s.gold ? '#e8c868' : '#d9e2f2';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // 流星
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx; m.y += m.vy; m.life -= 0.016;
      if (m.life <= 0 || m.x < -60 || m.y > H + 60) { meteors.splice(i, 1); continue; }
      const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 9, m.y - m.vy * 9);
      grad.addColorStop(0, `rgba(232,200,104,${m.life})`);
      grad.addColorStop(1, 'rgba(232,200,104,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }
  requestAnimationFrame(drawStars);

  // ---------- 星官谱描线 ----------
  const constSvg = document.querySelector('.constellation-svg');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        if (en.target === constSvg) en.target.classList.add('drew');
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.25 });
  if (constSvg) io.observe(constSvg);
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- 拜星台 ----------
  const shrineInput = document.getElementById('shrineInput');
  const shrineReply = document.getElementById('shrineReply');
  const skyClock = document.getElementById('skyClock');
  const replies = [
    '「此问已录册。星官们将彻夜推演，天亮前给答案。」',
    '「好一道难题。已在星图上圈出七颗相关之星，逐一查访。」',
    '「观测请求已排入队列。前方的星路，GLM 5.3 替你先走一遍。」',
    '「记下了。这道题的答案，会像流星一样落在你的观测卷上。」'
  ];

  if (shrineInput) {
    shrineInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && shrineInput.value.trim()) {
        shrineInput.value = '';
        shrineReply.textContent = replies[Math.floor(Math.random() * replies.length)];
        if (skyClock) skyClock.textContent = '夜 · 新星象已录';
      }
    });
  }
});
