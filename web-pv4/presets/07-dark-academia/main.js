// Preset 07 · Dark Academia — 手稿交互 / 借阅登记 / 成绩誊抄
const REPLIES = [
  '登记已受理。结论在卷末，取舍之由另附页边批注。',
  '已启用批注模式：五条旁注，末尾一条为自校，请阅右侧页边。',
  '此卷已阅。改动集中于三处，并另补测试用例一卷。',
  '并行四路检索已归档，较串行少三轮往返。',
  '按此规模，KV Cache 将先于权重成为瓶颈，宜先改用 GQA。'
];

const STAT = {
  instant: 'INSTANT · 96 词 · 0.18 秒',
  deep: 'DEEP THINK · 1,840 词 · 6.40 秒'
};

// 抄本 / 批注 切换：控制页边批注的显隐强度
const msBtns = document.querySelectorAll('.ms-btn');
const msStat = document.getElementById('msStat');
const notes = document.querySelector('.ms-notes');
msBtns.forEach(btn => btn.addEventListener('click', () => {
  msBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  msStat.textContent = STAT[btn.dataset.mode];
  const deep = btn.dataset.mode === 'deep';
  notes.style.opacity = deep ? '1' : '.35';
  notes.style.filter = deep ? 'none' : 'grayscale(.6)';
  document.querySelector('.ms-body').style.maxWidth = deep ? '' : '100%';
  document.querySelectorAll('.note-item').forEach((it, i) => {
    it.style.animation = 'none';
    void it.offsetWidth;
    it.style.animation = `inkIn .5s cubic-bezier(.16,1,.3,1) ${i * 70}ms both`;
  });
}));

// 借阅登记
const log = document.getElementById('lcLog');
const input = document.getElementById('lcInput');
const send = document.getElementById('lcSend');
let idx = 0;

function stamp() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}·${String(d.getDate()).padStart(2, '0')}`;
}
function push(who, text, isMe) {
  const row = document.createElement('div');
  row.className = 'lc-row' + (isMe ? ' me' : '');
  row.innerHTML = `<span class="lc-date">${stamp()}</span><span class="lc-who">${who}</span><span class="lc-txt">${text}</span>`;
  log.appendChild(row);
  log.scrollTop = log.scrollHeight;
}
function register() {
  const v = input.value.trim();
  if (!v) return;
  push('借阅者 你', v, true);
  input.value = '';
  setTimeout(() => push('馆员 hy4', REPLIES[idx++ % REPLIES.length], false), 640);
}
send.addEventListener('click', register);
input.addEventListener('keydown', e => { if (e.key === 'Enter') register(); });

// 成绩条誊抄
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const bar = en.target;
      bar.style.setProperty('--w', bar.dataset.w);
      bar.classList.add('fill');
      io.unobserve(bar);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.sr-bar i').forEach(b => io.observe(b));

// 烛光随光标轻微偏移
const candle = document.querySelector('.candle');
window.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 60;
  candle.style.left = `calc(50% + ${cx}px)`;
}, { passive: true });

// 导航
document.querySelectorAll('.mn').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.mn').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaRead').addEventListener('click', () =>
  document.getElementById('marginalia').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaCatalog').addEventListener('click', () =>
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' }));
