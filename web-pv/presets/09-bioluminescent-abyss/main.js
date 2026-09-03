// Preset 09: Bioluminescent Abyss Caustics & Ripple Effect
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('causticsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // 焦散微波动画
  let time = 0;
  function drawCaustics() {
    ctx.clearRect(0, 0, width, height);
    time += 0.015;

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 2;

    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        const y = height * (0.2 + i * 0.15) + Math.sin(x * 0.005 + time + i) * 35 + Math.cos(x * 0.01 - time) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    requestAnimationFrame(drawCaustics);
  }
  drawCaustics();

  // 点击水波涟漪
  const rippleContainer = document.getElementById('rippleContainer');
  window.addEventListener('click', (e) => {
    if (!rippleContainer) return;
    const ripple = document.createElement('div');
    ripple.className = 'bio-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    ripple.style.width = '80px';
    ripple.style.height = '80px';

    rippleContainer.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 1200);
  });
});
