// Preset 08: Tiangong Blueprint 天工开物交互
document.addEventListener('DOMContentLoaded', () => {
  // ---------- 钤印：点击图纸任意处盖一枚「验讫」朱印 ----------
  const stampLayer = document.getElementById('stampLayer');
  const STAMP_WORDS = ['验讫', '已阅', '工良', '可用', '智成'];

  document.body.addEventListener('click', (e) => {
    // 避免在链接/按钮上误钤
    if (e.target.closest('a, button, input')) return;
    const stamp = document.createElement('div');
    stamp.className = 'stamp-mark';
    stamp.textContent = STAMP_WORDS[Math.floor(Math.random() * STAMP_WORDS.length)];
    stamp.style.left = e.clientX + 'px';
    stamp.style.top = e.clientY + 'px';
    stampLayer.appendChild(stamp);
    // 控制印数，最多保留 12 枚
    while (stampLayer.children.length > 12) {
      stampLayer.removeChild(stampLayer.firstChild);
    }
  });

  // ---------- 木刻线描渐显（描线成形） ----------
  const woodcuts = document.querySelectorAll('.woodcut path');
  woodcuts.forEach(p => {
    const len = p.getTotalLength ? p.getTotalLength() : 120;
    p.style.strokeDasharray = p.style.strokeDasharray || 'none';
    if (p.style.strokeDasharray === 'none') {
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'stroke-dashoffset 1.2s ease';
    }
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('visible');
      // 该卡内的线描同步描线
      en.target.querySelectorAll('.woodcut path').forEach((p, i) => {
        if (p.style.strokeDashoffset) {
          setTimeout(() => { p.style.strokeDashoffset = '0'; }, i * 180);
        }
      });
      io.unobserve(en.target);
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
});
