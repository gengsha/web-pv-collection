// Preset 03 · Risograph Print — 套印错位 / 油墨扩散 / 读者来信
const REPLIES = [
  '来信收到。结论先行：可以，且只需要改两处 —— 推导我放在附录里。',
  '已启用 DEEP 版式，六步推演附在右侧对开页，末尾有自校验。',
  '仓库约定已读取，改动集中在三个文件，测试我一并补齐了。',
  '四路检索并行汇总，比串行少三轮往返。',
  '提醒：这个规模下 KV Cache 会先于权重成为瓶颈。'
];

// 套印错位随光标轻微漂移
const root = document.documentElement;
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 4;
  const y = (e.clientY / window.innerHeight - 0.5) * 3;
  root.style.setProperty('--regx', `${(3 + x).toFixed(2)}px`);
  root.style.setProperty('--regy', `${(2 + y).toFixed(2)}px`);
});

// 对开页选择
const pages = document.querySelectorAll('.spread-page');
document.querySelectorAll('[data-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    pages.forEach(p => p.classList.remove('picked'));
    const target = mode === 'deep' ? document.querySelector('.spread-page.deep') : pages[0];
    target.classList.add('picked');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// 读者来信
const log = document.getElementById('lettersLog');
const input = document.getElementById('lettersInput');
const send = document.getElementById('lettersSend');
let idx = 0;

function push(from, text, isMe) {
  const el = document.createElement('div');
  el.className = 'letter' + (isMe ? ' me' : '');
  el.innerHTML = `<span class="l-from">${from}</span><p>${text}</p>`;
  log.appendChild(el);
  log.scrollTop = log.scrollHeight;
}

function deliver() {
  const v = input.value.trim();
  if (!v) return;
  push('你 · 读者来信', v, true);
  input.value = '';
  setTimeout(() => push('hy4 · 编辑部', REPLIES[idx++ % REPLIES.length], false), 620);
}
send.addEventListener('click', deliver);
input.addEventListener('keydown', e => { if (e.key === 'Enter') deliver(); });

// 油墨扩散点（点击处）
document.querySelectorAll('[data-ink]').forEach(btn => {
  btn.addEventListener('click', e => {
    const ink = document.createElement('span');
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.4;
    ink.style.cssText = `
      position:fixed; left:${e.clientX - size / 2}px; top:${e.clientY - size / 2}px;
      width:${size}px; height:${size}px; border-radius:50%;
      background: rgba(255,90,54,.28); mix-blend-mode:multiply;
      pointer-events:none; z-index:80; transform:scale(0); opacity:.9;
      transition: transform .6s cubic-bezier(.16,1,.3,1), opacity .6s ease;`;
    document.body.appendChild(ink);
    requestAnimationFrame(() => { ink.style.transform = 'scale(1)'; ink.style.opacity = '0'; });
    setTimeout(() => ink.remove(), 700);
  });
});

// 导航锚点
document.querySelectorAll('.mn-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.mn-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelector('.cover-cta .ink-btn.red').addEventListener('click', () =>
  document.getElementById('capabilities').scrollIntoView({ behavior: 'smooth' }));
document.querySelector('.cover-cta .ink-btn.blue').addEventListener('click', () =>
  document.getElementById('reasoning').scrollIntoView({ behavior: 'smooth' }));

// 滚动时标题做极轻微的 skew 摆动
const covers = document.querySelectorAll('.cover-title span');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  covers.forEach((el, i) => {
    el.style.transform = `skewX(${((y % 300) / 300 - 0.5) * (i ? 0.6 : -0.6)}deg)`;
  });
}, { passive: true });
