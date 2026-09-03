// Preset 04: Moonlit Garden 夜园月门交互
document.addEventListener('DOMContentLoaded', () => {
  // 游园视差：远山随鼠标缓移
  const hills = document.querySelectorAll('.hill');
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    hills.forEach(h => {
      const d = parseFloat(h.dataset.depth || 0.02);
      h.style.transform = `translate(${-x * d * 500}px, ${-y * d * 260}px)`;
    });
  });

  // 步石点亮：滚动进度 + 点击跳景
  const stones = Array.from(document.querySelectorAll('.stone'));
  const sections = stones.map(s => document.getElementById(s.dataset.target)).filter(Boolean);

  function updateStones() {
    const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
    const litCount = Math.round(progress * (stones.length - 1)) + 1;
    stones.forEach((s, i) => s.classList.toggle('lit', i < litCount));
  }

  window.addEventListener('scroll', updateStones, { passive: true });
  updateStones();

  stones.forEach((s, i) => {
    s.addEventListener('click', () => {
      if (sections[i]) sections[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  // 水榭对谈
  const gardenInput = document.getElementById('gardenInput');
  const gardenReply = document.getElementById('gardenReply');
  const replies = [
    '「灯芯已挑亮三分。此问需游过二进方有答案，容我带路。」',
    '「园中自有曲径。GLM 5.3 已把此事拆成三景，随我来。」',
    '「此事不急。月色尚好，先喝一盏，答案在路上。」',
    '「听见溪声了吗？那是它在替你检索。稍候片刻。」'
  ];

  function converse() {
    const text = gardenInput.value.trim();
    if (!text) return;
    gardenInput.value = '';
    gardenReply.textContent = replies[Math.floor(Math.random() * replies.length)];
  }

  if (gardenInput) gardenInput.addEventListener('keydown', e => { if (e.key === 'Enter') converse(); });

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
