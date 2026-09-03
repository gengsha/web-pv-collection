// Preset 06: Zen Ethereal Flow
document.addEventListener('DOMContentLoaded', () => {
  const zenInput = document.getElementById('zenInput');
  const zenReply = document.getElementById('zenReply');

  const zenQuotes = [
    "“事来则应，事去则静。代码之解，往往藏于无言处。”",
    "“万物并作，吾以观复。所有的多模态流，终汇聚于清澈的理解。”",
    "“虚而不屈，动而愈出。请随心所欲，智识随行。”"
  ];

  if (zenInput && zenReply) {
    zenInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = zenInput.value.trim();
        if (!val) return;
        zenReply.style.opacity = '0';
        setTimeout(() => {
          const rand = zenQuotes[Math.floor(Math.random() * zenQuotes.length)];
          zenReply.textContent = rand;
          zenReply.style.opacity = '1';
        }, 400);
      }
    });
  }
});
