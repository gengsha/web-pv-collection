/* ============================================================
   Preset 09 · 鲁班机鸢 · Agent 工坊
   齿轮滚动联动 / 工具匣翻盖 / 装配台流水线 —— 纯原生，无第三方库
   ============================================================ */
(() => {
  'use strict';

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ---------- 导航：滚动压深 ---------- */
  function initNavbar() {
    const navbar = $('#navbar');
    if (!navbar) return;
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 平滑滚动到板块 ---------- */
  function initScrollTo() {
    $$('[data-scrollto]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.getAttribute('data-scrollto'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- 齿轮组：滚动进度联动旋转 ----------
     大轮与小轮转速系数不同、方向相反；
     rAF 内以 0.08 阻尼插值，得到带惯性手感的联动。 */
  function initGearTrain() {
    const gears = $$('.gear-rig');
    if (!gears.length) return;

    const reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = 0;

    const loop = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const target = progress * 360; // 基础角度：滚完全页转一圈

      current += (target - current) * (reduceMotion ? 1 : 0.08);

      gears.forEach((g) => {
        const speed = parseFloat(g.getAttribute('data-speed')) || 1;
        g.style.transform = 'rotate(' + (current * speed).toFixed(2) + 'deg)';
      });
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  /* ---------- 工具卡：工具箱翻盖 ---------- */
  function initToolCards() {
    $$('.tool-card').forEach((card) => {
      const toggle = () => {
        const open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ---------- 装配台：工序流水线 ---------- */
  function initBench() {
    const chips = $$('.tool-chip');
    const startBtn = $('#startBtn');
    const hint = $('#benchHint');
    const pipeline = $('#pipeline');
    const result = $('#benchResult');
    const resultLine = $('#resultLine');
    const kiteBob = $('.kite-bob');
    if (!startBtn || !pipeline) return;

    const stations = $$('.station', pipeline);
    const DEFAULT_HINT = '请至少勾选两件机关工具，方可开工。';
    let running = false;

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        if (running) return;
        const selected = chip.classList.toggle('selected');
        chip.setAttribute('aria-checked', selected ? 'true' : 'false');
        if (hint && hint.classList.contains('hint-err')) {
          hint.classList.remove('hint-err');
          hint.textContent = DEFAULT_HINT;
        }
      });
    });

    const typeText = async (el, text) => {
      el.textContent = '';
      for (let i = 0; i < text.length; i++) {
        el.textContent += text.charAt(i);
        await sleep(24);
      }
    };

    startBtn.addEventListener('click', async () => {
      if (running) return;

      const chosen = chips
        .filter((c) => c.classList.contains('selected'))
        .map((c) => c.getAttribute('data-tool'));

      if (chosen.length < 2) {
        if (hint) {
          hint.textContent = '请至少勾选两件机关工具，方可开工。';
          hint.classList.add('hint-err');
        }
        startBtn.classList.remove('shake');
        void startBtn.offsetWidth; // 重启动画
        startBtn.classList.add('shake');
        return;
      }

      running = true;
      startBtn.disabled = true;
      startBtn.textContent = '开工中…';
      if (hint) {
        hint.textContent = '流水线运转中，请稍候……';
        hint.classList.remove('hint-err');
      }
      if (result) result.classList.remove('show');

      pipeline.classList.add('running');
      stations.forEach((s) => {
        s.classList.remove('active', 'done');
        const t = $('.log-text', s);
        if (t) t.textContent = '';
      });

      const steps = [
        '图纸铺开：本单启用 ' + chosen.length + ' 件机关 —— ' + chosen.join('、') + '。四道工序，依次点火。',
        '开匣取件：' + chosen[0] + ' 领衔上台，' + chosen.slice(1).join('、') + ' 两侧压阵；物料与线索，悉数就位。',
        '刨凿齐鸣：齿轮咬合 ' + (4 + chosen.length) + ' 组，榫卯对位严丝合缝；边角以细砂收光，不留毛刺。',
        '木鸢振翅出坊：沿途回执如纸笺归来，件件有着落。交付完毕，静候下一道指令。'
      ];

      for (let i = 0; i < stations.length; i++) {
        const st = stations[i];
        const logEl = $('.log-text', st);
        st.classList.add('active');
        if (logEl) await typeText(logEl, steps[i] || '工序完成。');
        await sleep(420);
        st.classList.remove('active');
        st.classList.add('done');
      }

      pipeline.classList.remove('running');

      if (resultLine) {
        resultLine.textContent = '共启用 ' + chosen.length + ' 件机关 · 四道工序全数点亮';
      }
      if (result) result.classList.add('show');

      // 交付一刻：Hero 的木鸢急促拍翅相贺
      if (kiteBob) {
        kiteBob.classList.add('kite-burst');
        setTimeout(() => kiteBob.classList.remove('kite-burst'), 2600);
      }

      running = false;
      startBtn.disabled = false;
      startBtn.textContent = '开 工';
      if (hint) hint.textContent = '工序已毕，可另选机关再开一单。';
    });
  }

  /* ---------- 滚动浮现 ---------- */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));

    /* IO 首帧回调在部分环境（如 iframe 内）会延迟送达，
       用几何检测兜底，保证首屏不被永久隐藏 */
    const revealInView = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      items.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add('in');
      });
    };
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView);
    setTimeout(revealInView, 300);
    setTimeout(revealInView, 1200);
    setTimeout(revealInView, 2600);
  }

  /* ---------- 启炉 ---------- */
  const boot = () => {
    initNavbar();
    initScrollTo();
    initGearTrain();
    initToolCards();
    initBench();
    initReveal();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
