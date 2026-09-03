// Preset 09: Hutong Diary 市井烟火交互
document.addEventListener('DOMContentLoaded', () => {
  // 手账追写
  const diaryInput = document.getElementById('diaryInput');
  const diaryEntries = document.getElementById('diaryEntries');

  // 初始条目依次展开
  const initial = diaryEntries ? diaryEntries.querySelectorAll('.diary-entry') : [];
  initial.forEach((entry, i) => {
    setTimeout(() => entry.classList.add('shown'), 200 + i * 250);
  });

  if (diaryInput) {
    diaryInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && diaryInput.value.trim()) {
        const text = diaryInput.value.trim();
        diaryInput.value = '';
        const now = new Date();
        const stamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const entry = document.createElement('div');
        entry.className = 'diary-entry';
        entry.innerHTML = `<span class="entry-time mono">${stamp}</span><p>${escapeHtml(text)}</p>`;
        diaryEntries.appendChild(entry);
        requestAnimationFrame(() => requestAnimationFrame(() => entry.classList.add('shown')));
        setTimeout(() => {
          const shopReply = document.getElementById('shopReply');
          if (shopReply) {
            shopReply.textContent = '「记上了。这事儿要是需要搭把手，言语一声。」';
          }
        }, 400);
      }
    });
  }

  // 小卖部窗口
  const shopInput = document.getElementById('shopInput');
  const shopReply = document.getElementById('shopReply');
  const replies = [
    '「好嘞，这事儿包在我身上。晌午前给您回话。」',
    '「哟，这可不简单。容我多想两分钟，想想更透。」',
    '「行。已记在小本本上，忘不了您的嘱咐。」',
    '「这个能办。顺带把周边的坑也替您趟一遍。」'
  ];

  if (shopInput) {
    shopInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && shopInput.value.trim()) {
        shopInput.value = '';
        shopReply.textContent = replies[Math.floor(Math.random() * replies.length)];
      }
    });
  }

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

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
