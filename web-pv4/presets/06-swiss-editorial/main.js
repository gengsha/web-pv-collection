// Preset 06 · Swiss Editorial — 网格开关 / 双模选择 / 表格补间
const REPLIES = [
  '结论先行：可以，改动集中在两处。推导与取舍见下方对照表。',
  '已切到 DEEP：六步推演 + 末尾自校验，响应约 6.4s。',
  '仓库约定已读取，测试一并补齐，diff 控制在三个文件内。',
  '四路检索并行汇总，比串行少三轮往返。',
  '注意：这个规模下 KV Cache 会先于权重成为瓶颈。'
];

// 网格辅助线开关
const overlay = document.getElementById('gridOverlay');
const toggle = document.getElementById('gridToggle');
toggle.addEventListener('click', () => {
  overlay.classList.toggle('show');
  toggle.textContent = overlay.classList.contains('show') ? '隐藏网格' : '显示网格';
});

// 双模选择
const swBtns = document.querySelectorAll('.sw-btn');
const swStatus = document.getElementById('swStatus');
const STATUS = {
  instant: '当前：A · INSTANT · 0.18s · 3 步 · ≈96 tok',
  deep: '当前：B · DEEP THINK · 6.40s · 6 步 + 自校验 · ≈1,840 tok'
};
swBtns.forEach(btn => btn.addEventListener('click', () => {
  swBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  swStatus.textContent = STATUS[btn.dataset.mode];
}));

// 滚动时状态条显示当前区块编号
const blocks = document.querySelectorAll('.block, .poster');
const stripIdx = document.querySelector('.topstrip span:nth-child(2)');
window.addEventListener('scroll', () => {
  let current = '01';
  blocks.forEach(b => {
    const idx = b.querySelector('.idx')?.textContent || '01';
    if (b.getBoundingClientRect().top < 160) current = idx;
  });
  stripIdx.textContent = `No. ${current} / 2026`;
}, { passive: true });

// 提问
const log = document.getElementById('qlog');
const input = document.getElementById('qInput');
const send = document.getElementById('qSend');
let idx = 0;

function push(who, txt, isMe) {
  const row = document.createElement('div');
  row.className = 'qrow' + (isMe ? ' me' : '');
  row.innerHTML = `<span class="qwho">${who}</span><span class="qtxt">${txt}</span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function submit() {
  const v = input.value.trim();
  if (!v) return;
  push('YOU', v, true);
  input.value = '';
  setTimeout(() => push('HY4', REPLIES[idx++ % REPLIES.length], false), 480);
}
send.addEventListener('click', submit);
input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });

// 表格条形补间
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const bar = en.target;
      bar.style.setProperty('--w', bar.dataset.w);
      bar.classList.add('fill');
      io.unobserve(bar);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('.hbar i').forEach(b => io.observe(b));

// 数字滚动（评测分进入视口时从 0 补间到目标）
document.querySelectorAll('.dtable .num').forEach(cell => {
  const target = parseFloat(cell.textContent);
  cell.textContent = '0.0';
  const obs = new IntersectionObserver(en => {
    if (en[0].isIntersecting) {
      let start = null;
      const dur = 1100;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        cell.textContent = (target * eased).toFixed(1);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.disconnect();
    }
  }, { threshold: 0.6 });
  obs.observe(cell);
});
