// Preset 01: Dawn Flagship 曙光旗舰交互
document.addEventListener('DOMContentLoaded', () => {
  // 柔光球视差
  const orbA = document.getElementById('orbA');
  const orbB = document.getElementById('orbB');
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    if (orbA) orbA.style.transform = `translate(${x * -46}px, ${y * -36}px)`;
    if (orbB) orbB.style.transform = `translate(${x * 52}px, ${y * 40}px)`;
  });

  // 滚动渐显
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // 触发数字滚动与进度条
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        entry.target.querySelectorAll('.bench-bar').forEach(bar => {
          const fill = bar.querySelector('.bench-fill');
          if (fill) fill.style.width = bar.dataset.width + '%';
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  // Hero 区数字直接启动
  document.querySelectorAll('.hero-stats [data-count]').forEach(animateCount);

  // 数字滚动
  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseFloat(el.dataset.count);
    const start = performance.now();
    const dur = 900;
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // 对话交互模拟
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatList = document.getElementById('chatList');
  const replies = [
    '好的，我先把问题拆成三个子目标，再逐步推演——第一步先检索相关约束条件。',
    '这题的关键在第二层隐藏假设。我沿思维链走了 48 步，结论是：方案 B 的期望收益更高。',
    '已理解。我可以先给出代码骨架，再补齐测试用例与边界条件，要继续吗？',
    '让我再校验一次推理路径……结论稳定，置信度 96.2%。以下是最终答案。'
  ];

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';

    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.innerHTML = `<div class="msg-avatar">你</div><div class="msg-bubble">${escapeHtml(text)}</div>`;
    chatList.appendChild(userMsg);
    chatList.scrollTop = chatList.scrollHeight;

    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'msg ai';
      const r = replies[Math.floor(Math.random() * replies.length)];
      aiMsg.innerHTML = `<div class="msg-avatar">✦</div><div class="msg-bubble">${r}</div>`;
      chatList.appendChild(aiMsg);
      chatList.scrollTop = chatList.scrollHeight;
    }, 700);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
