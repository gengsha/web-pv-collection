// Preset 03: Synaptic Hologram Canvas Animation
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('synapseCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // 突触节点生成
  const nodes = [];
  const count = 35;
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI
    });
  }

  let isHighPulse = false;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // 绘制连线
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const alpha = (1 - dist / 180) * (isHighPulse ? 0.8 : 0.25);
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = isHighPulse ? 1.5 : 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // 绘制突触节点
    nodes.forEach(n => {
      n.x += n.vx * (isHighPulse ? 2 : 1);
      n.y += n.vy * (isHighPulse ? 2 : 1);
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      n.pulse += 0.05;
      const glow = Math.sin(n.pulse) * 2;

      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius + (isHighPulse ? glow : 0), 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion.matches) requestAnimationFrame(render);
  }
  // prefers-reduced-motion：只绘制一帧静态画面，不启动连续动画循环
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion.addEventListener('change', () => { if (!reduceMotion.matches) render(); });
  window.addEventListener('resize', () => { if (reduceMotion.matches) requestAnimationFrame(render); });
  render();

  // 脉冲激发按钮事件
  const fireBtn = document.getElementById('firePulseBtn');
  if (fireBtn) {
    fireBtn.addEventListener('click', () => {
      isHighPulse = true;
      document.getElementById('activeSynapseCount').textContent = '100.00% PULSING';
      setTimeout(() => {
        isHighPulse = false;
        document.getElementById('activeSynapseCount').textContent = '99.98%';
      }, 2000);
    });
  }
});
