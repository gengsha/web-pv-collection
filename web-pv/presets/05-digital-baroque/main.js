// Preset 05: Digital Baroque Gold Dust Canvas & Transmutation
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('goldDustCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // 金箔微尘粒子系统
  const dustParticles = [];
  const count = 40;
  for (let i = 0; i < count; i++) {
    dustParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.5 - 0.1,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    dustParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = height;
        p.x = Math.random() * width;
      }

      ctx.fillStyle = `rgba(234, 179, 8, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!reduceMotion.matches) requestAnimationFrame(render);
  }
  // prefers-reduced-motion：只绘制一帧静态画面，不启动连续动画循环
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  reduceMotion.addEventListener('change', () => { if (!reduceMotion.matches) render(); });
  window.addEventListener('resize', () => { if (reduceMotion.matches) requestAnimationFrame(render); });
  render();

  // 艺术转译交互
  const generateArtBtn = document.getElementById('generateArtBtn');
  const mindInput = document.getElementById('mindInput');
  const artOutputText = document.getElementById('artOutputText');

  const artTemplates = [
    "「以提香式的宏大威尼斯红为基底，画面被一道破晓的金色圣光划破。古老石砌长廊中，悬浮着由纯粹多模态光线编织成的智慧之冠，象征人类理性在历经风暴后终见真理之光。」",
    "「采用维米尔式的极静谧窗边侧光，空气中漂浮着可辨识的金色量子微尘。一尊大理石雕塑手握发光的无缝莫比乌斯环，光影柔和得宛若一声跨越四百年的轻叹。」",
    "「以卡拉瓦乔高对比暗色调与戏剧性强光为骨骼，阴影深处潜藏着星系旋臂，而前景的鎏金油画框正缓缓消融为发光的数字诗行，将无机代码升华为神圣赞歌。」"
  ];

  if (generateArtBtn && mindInput && artOutputText) {
    generateArtBtn.addEventListener('click', () => {
      const val = mindInput.value.trim();
      if (!val) return;
      artOutputText.textContent = "✦ 正在调动 Gemini 文艺复兴感知神经元进行巴洛克艺术构想转译... ✦";
      setTimeout(() => {
        const randomArt = artTemplates[Math.floor(Math.random() * artTemplates.length)];
        artOutputText.textContent = `“针对命题【${val}】：${randomArt}”`;
      }, 700);
    });
  }
});
