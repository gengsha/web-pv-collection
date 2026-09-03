// Preset 05: Neon Lantern 赛博灯市交互
document.addEventListener('DOMContentLoaded', () => {
  // 霓虹闪烁：随机时间对随机招牌触发一次抖动
  const flickerables = Array.from(document.querySelectorAll('[data-flicker]'));
  function scheduleFlick() {
    if (flickerables.length === 0) return;
    const el = flickerables[Math.floor(Math.random() * flickerables.length)];
    const delay = 2000 + Math.random() * 3000;
    setTimeout(() => {
      el.classList.add('flicking');
      setTimeout(() => el.classList.remove('flicking'), 450);
      scheduleFlick();
    }, delay);
  }
  scheduleFlick();

  // 跑马灯内容双份拼接实现无缝循环
  const track = document.getElementById('marqueeTrack');
  if (track) track.innerHTML += track.innerHTML;

  // 灯谜翻牌
  document.querySelectorAll('.riddle-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });

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
