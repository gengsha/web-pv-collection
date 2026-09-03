// Preset 10: Quantum Lattice 3D Lorenz Attractor
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('lorenzCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // 洛伦兹吸引子常微分方程参数
  let sigma = 10.0;
  const rho = 28.0;
  const beta = 8.0 / 3.0;
  const dt = 0.008;

  let x = 0.1, y = 0, z = 0;
  const points = [];
  const maxPoints = 1200;

  let angleY = 0;

  function stepLorenz() {
    for (let step = 0; step < 4; step++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;

      x += dx;
      y += dy;
      z += dz;

      points.push({ x, y, z });
      if (points.length > maxPoints) points.shift();
    }
  }

  function render() {
    ctx.fillStyle = 'rgba(9, 10, 15, 0.2)';
    ctx.fillRect(0, 0, width, height);

    stepLorenz();
    angleY += 0.004;

    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const scale = Math.min(width, height) / 45;
    const centerX = width / 2;
    const centerY = height / 2 + 30;

    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      // 3D 绕 Y 轴旋转
      const rx = p.x * cosY - (p.z - 25) * sinY;
      const rz = p.x * sinY + (p.z - 25) * cosY;

      const px = centerX + rx * scale;
      const py = centerY - p.y * scale;

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // 绘制头部发光粒子
    if (points.length > 0) {
      const head = points[points.length - 1];
      const rx = head.x * cosY - (head.z - 25) * sinY;
      const px = centerX + rx * scale;
      const py = centerY - head.y * scale;

      ctx.fillStyle = '#c084fc';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(render);
  }
  render();

  // 滑块调节参数
  const sigmaSlider = document.getElementById('sigmaSlider');
  const sigmaVal = document.getElementById('sigmaVal');
  if (sigmaSlider && sigmaVal) {
    sigmaSlider.addEventListener('input', (e) => {
      sigma = parseFloat(e.target.value);
      sigmaVal.textContent = sigma.toFixed(1);
    });
  }
});
