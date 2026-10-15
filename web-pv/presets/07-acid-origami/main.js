// Preset 07: Acid Origami 3D Unfold & Idea Generator
document.addEventListener('DOMContentLoaded', () => {
  const origamiCard = document.getElementById('origamiCard');
  const foldTriggerBtn = document.getElementById('foldTriggerBtn');
  const collapseBtn = document.getElementById('collapseBtn');

  // 3D 翻折：先沿 X 轴折到 90°（侧面朝向观者，此时换面不可见），再以弹性曲线回弹展开
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let flipping = false;
  function setFolded(folded) {
    if (!origamiCard || flipping) return;
    if (origamiCard.classList.contains('folded') === folded) return;
    const swap = () => {
      origamiCard.classList.toggle('folded', folded);
      origamiCard.classList.toggle('unfolded', !folded);
    };
    if (reduceMotion.matches) return swap();
    flipping = true;
    origamiCard.classList.add('flipping');
    setTimeout(() => {
      swap();
      origamiCard.classList.remove('flipping');
      flipping = false;
    }, 220);
  }
  function toggleUnfold() {
    if (origamiCard) setFolded(!origamiCard.classList.contains('folded'));
  }

  if (origamiCard) origamiCard.addEventListener('click', toggleUnfold);
  if (foldTriggerBtn) foldTriggerBtn.addEventListener('click', toggleUnfold);
  if (collapseBtn) {
    collapseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setFolded(true);
    });
  }

  // 创意生成器
  const ideas = [
    "“让 AI 用电音贝斯合成器解构一段高并发微服务调用链。”",
    "“设计一个根据用户打字手速实时改变背景荧光酸性色彩的流体编辑器。”",
    "“用多模态视觉神经元为街头涂鸦即时生成 3D 增强现实浮空雕塑。”",
    "“将一段古琴曲采样与赛博重金属鼓点融合，打造 AI 跨时空即兴电台。”"
  ];

  const genIdeaBtn = document.getElementById('genIdeaBtn');
  const ideaDisplay = document.getElementById('ideaDisplay');

  if (genIdeaBtn && ideaDisplay) {
    genIdeaBtn.addEventListener('click', () => {
      ideaDisplay.style.transform = 'scale(0.95)';
      setTimeout(() => {
        const rand = ideas[Math.floor(Math.random() * ideas.length)];
        ideaDisplay.textContent = rand;
        ideaDisplay.style.transform = 'scale(1)';
      }, 150);
    });
  }
});
