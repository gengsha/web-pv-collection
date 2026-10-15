// Preset 01: Cosmic Nebula Interaction
document.addEventListener('DOMContentLoaded', () => {
  const orbPurple = document.getElementById('orbPurple');
  const orbBlue = document.getElementById('orbBlue');
  const orbCyan = document.getElementById('orbCyan');

  // 光标引力微动效
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    if (orbPurple) orbPurple.style.translate = `${mouseX * 60}px ${mouseY * 60}px`;
    if (orbBlue) orbBlue.style.translate = `${mouseX * -80}px ${mouseY * -80}px`;
    if (orbCyan) orbCyan.style.translate = `${mouseX * 40}px ${mouseY * 40}px`;
  });

  // 对话交互模拟
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatList = document.getElementById('chatList');

  const cannedAnswers = [
    "已为您启用 Gemini 2.5 深度推理模态：在多模态架构中，图像与文本通过统一语义流进行端到端对齐，无需中间离散特征转换。",
    "推导已完成：在包含 100 万行代码的大型分布式仓库中，已定位 3 处内存泄漏隐患并给出零拷贝修复补丁。",
    "音频波形解析就绪：已分离环境背景杂音，重构出纯净人声与乐理泛音结构。",
    "思维链已扩展：基于量子力学超导相干原理，当前算法可在多节点间保持全局状态一致性。"
  ];

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;

    // 添加用户消息
    const userMsg = document.createElement('div');
    userMsg.className = 'msg user';
    userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
    chatList.appendChild(userMsg);
    chatInput.value = '';
    chatList.scrollTop = chatList.scrollHeight;

    // 模拟 Gemini 思考流返回
    setTimeout(() => {
      const geminiMsg = document.createElement('div');
      geminiMsg.className = 'msg gemini';
      const randomAns = cannedAnswers[Math.floor(Math.random() * cannedAnswers.length)];
      geminiMsg.innerHTML = `
        <div class="msg-avatar">✨</div>
        <div class="msg-bubble">${randomAns}</div>
      `;
      chatList.appendChild(geminiMsg);
      chatList.scrollTop = chatList.scrollHeight;
    }, 650);
  }

  if (sendBtn) sendBtn.addEventListener('click', handleSend);
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
