// Preset 10 · Claymorphism Soft Pop — 弹性按压 / 软陶拨杆 / 气泡对话
const MODES = {
  soft: {
    badge: 'SOFT · 0.18s',
    title: '轻轻一按，立刻弹回',
    desc: '短路径、低消耗，适合事实查询、格式转换与明确指令。像按下一颗软糖。',
    list: [
      '路径：1–3 步，几乎不分叉',
      '消耗：约 96 tokens · 0.18 秒',
      '适合：检索、改写、格式化、短补全'
    ],
    tok: '96', time: '0.18s', step: '3'
  },
  deep: {
    badge: 'DEEP · 6.40s',
    title: '先在肚子里慢慢揉',
    desc: '长路径、多分支，结尾会自己捏一遍检查形状。慢，但落点更稳。',
    list: [
      '路径：6 步以上，允许自我否定与回溯',
      '消耗：约 1,840 tokens · 6.40 秒',
      '适合：数学推导、架构设计、长文与复杂重构'
    ],
    tok: '1,840', time: '6.40s', step: '6'
  }
};

const REPLIES = [
  '收到～ 结论先给你，剩下的我慢慢揉。',
  '切到 DEEP 了：六步，最后一步我自己捏一遍检查。',
  '仓库看完了，改动集中在三个文件，测试也补上啦。',
  '四路一起跑，比排队少三轮往返。',
  '小提示：这个规模下 KV Cache 会先顶到显存上限哦。'
];

// 拨杆
const lever = document.querySelector('.lever');
const track = document.getElementById('levTrack');
const knob = document.getElementById('levKnob');
const labels = document.querySelectorAll('.lev-label');
const el = {
  badge: document.getElementById('levBadge'),
  title: document.getElementById('levTitle'),
  desc: document.getElementById('levDesc'),
  list: document.getElementById('levList'),
  tok: document.getElementById('levTok'),
  time: document.getElementById('levTime'),
  step: document.getElementById('levStep')
};
let mode = 'soft';

function placeKnob() {
  const max = track.clientWidth - knob.offsetWidth - 14;
  knob.style.left = mode === 'soft' ? '7px' : `${max + 7}px`;
}

function applyMode() {
  const m = MODES[mode];
  el.badge.textContent = m.badge;
  el.title.textContent = m.title;
  el.desc.textContent = m.desc;
  el.list.innerHTML = m.list.map(i => `<li>${i}</li>`).join('');
  el.tok.textContent = m.tok;
  el.time.textContent = m.time;
  el.step.textContent = m.step;
  lever.classList.toggle('deep', mode === 'deep');
  labels[0].classList.toggle('on', mode === 'soft');
  labels[1].classList.toggle('on', mode === 'deep');
  placeKnob();
}

track.addEventListener('click', () => { mode = mode === 'soft' ? 'deep' : 'soft'; applyMode(); });
labels[0].addEventListener('click', () => { mode = 'soft'; applyMode(); });
labels[1].addEventListener('click', () => { mode = 'deep'; applyMode(); });
window.addEventListener('load', applyMode);
window.addEventListener('resize', placeKnob);

// 弹性按压
document.querySelectorAll('[data-pressable]').forEach(card => {
  card.addEventListener('mousedown', () => card.classList.add('pressed'));
  ['mouseup', 'mouseleave'].forEach(ev =>
    card.addEventListener(ev, () => card.classList.remove('pressed')));
});

// 光标柔光
const glow = document.getElementById('cursorGlow');
window.addEventListener('mousemove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
}, { passive: true });

// 吉祥物跟随光标眨眼
const mascot = document.querySelector('.mascot-body');
document.addEventListener('mousemove', e => {
  const cx = (e.clientX / window.innerWidth - 0.5) * 8;
  mascot.style.transform = `translateX(${cx}px)`;
}, { passive: true });

// 气泡对话
const log = document.getElementById('bubbleLog');
const input = document.getElementById('bubbleInput');
const send = document.getElementById('bubbleSend');
let idx = 0;

function push(who, txt, isMe) {
  const bub = document.createElement('div');
  bub.className = 'bub' + (isMe ? ' me' : '');
  bub.innerHTML = `<span class="bub-who">${who}</span><span class="bub-txt">${txt}</span>`;
  log.appendChild(bub);
  log.scrollTop = log.scrollHeight;
}
function talk() {
  const v = input.value.trim();
  if (!v) return;
  push('你', v, true);
  input.value = '';
  setTimeout(() => push('hy4', REPLIES[idx++ % REPLIES.length], false), 620);
}
send.addEventListener('click', talk);
input.addEventListener('keydown', e => { if (e.key === 'Enter') talk(); });

// 分数条
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
document.querySelectorAll('.sc-bar i').forEach(b => io.observe(b));

// 导航
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
document.getElementById('ctaPills').addEventListener('click', () =>
  document.getElementById('pills').scrollIntoView({ behavior: 'smooth' }));
document.getElementById('ctaLever').addEventListener('click', () => {
  document.getElementById('lever').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => { mode = 'deep'; applyMode(); }, 700);
});
document.getElementById('ctaTalk').addEventListener('click', () => {
  document.getElementById('bubbles').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => input.focus(), 700);
});
