// Preset 02: Movable Type 活字格物交互
document.addEventListener('DOMContentLoaded', () => {
  // 字库数据：字 → 释义（GLM 5.3 能力拟字）
  const TYPECASE = [
    { char: '智', mean: '深度推理', idx: '甲-001' },
    { char: '思', mean: '思维链条', idx: '甲-002' },
    { char: '文', mean: '长文写作', idx: '甲-003' },
    { char: '码', mean: '工程代码', idx: '甲-004' },
    { char: '声', mean: '语音理解', idx: '乙-005' },
    { char: '图', mean: '视觉认知', idx: '乙-006' },
    { char: '数', mean: '数理演算', idx: '乙-007' },
    { char: '物', mean: '万物常识', idx: '乙-008' },
    { char: '工', mean: '智能体执行', idx: '丙-009' },
    { char: '艺', mean: '生成艺术', idx: '丙-010' },
    { char: '律', mean: '合规审慎', idx: '丙-011' },
    { char: '医', mean: '生命科学', idx: '丙-012' },
    { char: '言', mean: '多语互译', idx: '丁-013' },
    { char: '诗', mean: '格律创作', idx: '丁-014' },
    { char: '译', mean: '同声传译', idx: '丁-015' },
    { char: '识', mean: '检索溯源', idx: '丁-016' }
  ];

  const grid = document.getElementById('typecaseGrid');
  if (grid) {
    TYPECASE.forEach((t, i) => {
      const tile = document.createElement('button');
      tile.className = 'type-tile';
      tile.setAttribute('aria-label', t.char + ' ' + t.mean);
      tile.innerHTML = `
        <div class="type-tile-inner">
          <div class="tile-face tile-front"><span class="tile-char">${t.char}</span></div>
          <div class="tile-face tile-back">
            <span class="back-meaning">${t.mean}</span>
            <span class="back-idx mono">${t.idx}</span>
          </div>
        </div>`;
      tile.addEventListener('click', () => tile.classList.toggle('flipped'));
      grid.appendChild(tile);
    });
  }

  // 组版工坊：输入文字 → 逐枚铅字落版
  const typesetInput = document.getElementById('typesetInput');
  const typesetBtn = document.getElementById('typesetBtn');
  const composedPlate = document.getElementById('composedPlate');

  function typeset() {
    const text = (typesetInput.value || '').trim();
    if (!text) return;
    composedPlate.innerHTML = '';
    [...text].slice(0, 16).forEach((ch, i) => {
      const tile = document.createElement('div');
      tile.className = 'plate-tile';
      tile.textContent = ch;
      tile.style.animationDelay = (i * 0.07) + 's';
      composedPlate.appendChild(tile);
    });
  }

  if (typesetBtn) typesetBtn.addEventListener('click', typeset);
  if (typesetInput) {
    typesetInput.addEventListener('keydown', e => { if (e.key === 'Enter') typeset(); });
  }

  // 落款对话
  const inkInput = document.getElementById('inkInput');
  const inkReply = document.getElementById('inkReply');
  const sealBtn = document.getElementById('sealBtn');
  const replies = [
    '「此句有金石声。容我拣字排来，一炷香后付印。」',
    '「善。已为此句选了九个衬字，气韵更贯通。」',
    '「排印之道，疏可走马，密不透风。此版留白三分，恰如其分。」',
    '「字盘已响。GLM 5.3 记下了这一句，下次见你，它会认得。」'
  ];

  function converse() {
    const text = inkInput.value.trim();
    if (!text) return;
    inkInput.value = '';
    inkReply.textContent = replies[Math.floor(Math.random() * replies.length)];
  }

  if (inkInput) inkInput.addEventListener('keydown', e => { if (e.key === 'Enter') converse(); });
  if (sealBtn) {
    sealBtn.addEventListener('click', () => {
      converse();
      sealBtn.classList.remove('stamped');
      void sealBtn.offsetWidth; // 重启动画
      sealBtn.classList.add('stamped');
    });
  }

  // 墨迹显影
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
