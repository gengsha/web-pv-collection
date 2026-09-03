// Preset 03: Qinghua Porcelain 青花釉彩交互
document.addEventListener('DOMContentLoaded', () => {
  // 描线生长：svg 进入视口时触发 stroke-dashoffset 动画
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('drew');
        if (en.target.classList.contains('reveal')) en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.vine-svg, .mini-plate svg').forEach(svg => io.observe(svg));
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // 釉下题字
  const glazeInput = document.getElementById('glazeInput');
  const glazeReply = document.getElementById('glazeReply');
  const glazeBtn = document.getElementById('glazeBtn');
  const replies = [
    '「好字。已题入釉下，待明日开窑验色。」',
    '「此句釉色透亮，是窑火欢喜的兆头。」',
    '「钴料已吃进胎骨。千年之后有人掘出，仍读得出你的心意。」',
    '「GLM 5.3 把这句话描了三遍，选中了最匀净的那一稿。」'
  ];

  function inscribe() {
    const text = glazeInput.value.trim();
    if (!text) return;
    glazeInput.value = '';
    glazeReply.textContent = replies[Math.floor(Math.random() * replies.length)];
  }

  if (glazeBtn) glazeBtn.addEventListener('click', inscribe);
  if (glazeInput) glazeInput.addEventListener('keydown', e => { if (e.key === 'Enter') inscribe(); });
});
