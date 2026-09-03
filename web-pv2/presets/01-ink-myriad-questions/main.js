/* =========================================================
   Preset 01: 墨海千问 · 文人水墨长卷
   墨粒飞白画布 / 卷轴入场 / 印章钤盖 / 问答题字流式书写
   ========================================================= */
(function () {
  'use strict';

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============ 1. Canvas：缓慢漂浮的淡墨颗粒与飞白笔触 ============ */
  var canvas = document.getElementById('inkCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var particles = [];
  var rafId = null;
  var tick = 0;

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function toneRgb(tone) {
    if (tone === 1) return '92, 122, 120';  /* 黛青 */
    if (tone === 2) return '176, 58, 46';   /* 朱砂 */
    return '26, 26, 26';                    /* 松烟墨 */
  }

  function makeParticle() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var isStroke = Math.random() < 0.22;
    var toneRoll = Math.random();
    return {
      stroke: isStroke,
      x: rand(-60, w + 60),
      y: rand(0, h),
      size: isStroke ? rand(0.8, 2.2) : rand(0.8, 3.2),
      len: isStroke ? rand(60, 170) : 0,
      vx: rand(0.04, 0.22) * (Math.random() < 0.5 ? 1 : -1),
      vy: rand(-0.06, 0.06),
      angle: rand(-0.35, 0.35),
      spin: rand(-0.0006, 0.0006),
      swayAmp: rand(0.05, 0.22),
      swayFreq: rand(0.3, 1.1),
      phase: rand(0, Math.PI * 2),
      alpha: isStroke ? rand(0.02, 0.06) : rand(0.04, 0.14),
      tone: toneRoll < 0.7 ? 0 : (toneRoll < 0.9 ? 1 : 2)
    };
  }

  function initParticles() {
    var area = window.innerWidth * window.innerHeight;
    var count = Math.max(26, Math.min(80, Math.floor(area / 24000)));
    particles = [];
    for (var i = 0; i < count; i += 1) {
      particles.push(makeParticle());
    }
  }

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawParticle(p, t) {
    var pulse = 0.7 + 0.3 * Math.sin(t * p.swayFreq + p.phase);
    var a = p.alpha * pulse;
    ctx.fillStyle = 'rgba(' + toneRgb(p.tone) + ', ' + a.toFixed(3) + ')';
    if (p.stroke) {
      /* 飞白笔触：三条相叠的细长枯笔 */
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      for (var i = 0; i < 3; i += 1) {
        var dy = (i - 1) * p.size * 1.7;
        var lenScale = 1 - Math.abs(i - 1) * 0.18;
        ctx.beginPath();
        ctx.ellipse(0, dy, (p.len / 2) * lenScale, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function stepParticles(t) {
    var w = window.innerWidth;
    var h = window.innerHeight;
    for (var i = 0; i < particles.length; i += 1) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy + Math.sin(t * p.swayFreq + p.phase) * p.swayAmp * 0.4;
      p.angle += p.spin;
      if (p.x < -90) p.x = w + 90;
      if (p.x > w + 90) p.x = -90;
      if (p.y < -50) p.y = h + 50;
      if (p.y > h + 50) p.y = -50;
    }
  }

  function renderLoop() {
    if (!ctx) return;
    tick += 0.016;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stepParticles(tick);
    for (var i = 0; i < particles.length; i += 1) {
      drawParticle(particles[i], tick);
    }
    rafId = window.requestAnimationFrame(renderLoop);
  }

  function startCanvas() {
    if (!canvas || !ctx) return;
    resizeCanvas();
    initParticles();
    if (prefersReduced) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < particles.length; i += 1) {
        drawParticle(particles[i], 1);
      }
      return;
    }
    if (rafId === null) {
      rafId = window.requestAnimationFrame(renderLoop);
    }
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      resizeCanvas();
      initParticles();
    }, 160);
  });

  document.addEventListener('visibilitychange', function () {
    if (!canvas || !ctx || prefersReduced) return;
    if (document.hidden) {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    } else if (rafId === null) {
      rafId = window.requestAnimationFrame(renderLoop);
    }
  });

  /* ============ 2. 卷轴入场：横向 mask 展开 + 墨晕变清晰 ============ */
  var revealNodes = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (revealNodes.length && !prefersReduced) {
    revealNodes.forEach(function (el) {
      var delay = el.getAttribute('data-reveal-delay');
      if (delay) el.style.transitionDelay = delay + 's';
      el.classList.add('reveal-hidden');
    });

    /* 隐藏态自带 clip-path，IntersectionObserver 会恒报零相交，
       故改用 rAF 几何检测驱动展卷 */
    var pending = revealNodes.slice();

    function checkReveal() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -40) {
          el.classList.add('is-revealed');
          return false;
        }
        return true;
      });
      if (pending.length) window.requestAnimationFrame(checkReveal);
    }

    window.requestAnimationFrame(checkReveal);
  }

  /* ============ 3. 按钮平滑滚动（展卷） ============ */
  Array.prototype.slice.call(document.querySelectorAll('[data-scroll-to]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('data-scroll-to'));
      if (target) {
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* ============ 4. 印章钤盖微交互 ============ */
  Array.prototype.slice.call(document.querySelectorAll('.seal')).forEach(function (seal) {
    seal.addEventListener('click', function () {
      seal.classList.remove('stamping');
      void seal.offsetWidth; /* 重启动画 */
      seal.classList.add('stamping');
    });
    seal.addEventListener('animationend', function () {
      seal.classList.remove('stamping');
    });
  });

  /* ============ 5. 问答题字：毛笔流式书写 ============ */
  var askInput = document.getElementById('askInput');
  var askBtn = document.getElementById('askBtn');
  var inscriptionBody = document.getElementById('inscriptionBody');

  var elegantAnswers = [
    '学而不思则罔，思而不学则殆。君之所问，正在学与思之间——且将此事拆作三分：一分付诸检索，一分付诸推演，一分留与光阴。',
    '山不在高，有仙则名；问不在多，有解则灵。此题可作三解：先立其纲，再填其目，终校其误，如是而已。',
    '博观而约取，厚积而薄发。容吾徐徐思之——答案多藏于君已知之三事之间，只待一条线索，将它们一一串起。',
    '问渠那得清如许，为有源头活水来。欲得清澈之答，须先澄清三事：所为何人，所为何用，所限何物。',
    '经史为骨，代码为筋，图像为眉目。若以工程论之：先明需求之边界，再定接口之契约，后以测试守其成。',
    '吾尝终日而思矣，不如须臾之所学也。君但宽心，千问当于经史子集与万卷代码之中，为君寻一帖之解。'
  ];

  var isWriting = false;

  function scrollPodToBottom() {
    if (inscriptionBody) inscriptionBody.scrollTop = inscriptionBody.scrollHeight;
  }

  function makeSeal(text) {
    var sealEl = document.createElement('span');
    sealEl.className = 'seal seal-sm';
    sealEl.textContent = text;
    return sealEl;
  }

  function appendQuestion(text) {
    var line = document.createElement('div');
    line.className = 'qa-line question-line';
    var p = document.createElement('p');
    p.className = 'question-text';
    p.textContent = text;
    line.appendChild(makeSeal('问'));
    line.appendChild(p);
    inscriptionBody.appendChild(line);
  }

  function appendAnswerAndWrite() {
    var line = document.createElement('div');
    line.className = 'qa-line answer-line';
    var p = document.createElement('p');
    p.className = 'answer-text';
    var cursor = document.createElement('span');
    cursor.className = 'ink-cursor';
    p.appendChild(cursor);
    line.appendChild(makeSeal('答'));
    line.appendChild(p);
    inscriptionBody.appendChild(line);
    scrollPodToBottom();

    var answer = elegantAnswers[Math.floor(Math.random() * elegantAnswers.length)];
    var i = 0;

    function writeNext() {
      if (i < answer.length) {
        var just = answer.charAt(i);
        var ch = document.createElement('span');
        ch.className = 'ink-char';
        ch.textContent = just;
        p.insertBefore(ch, cursor);
        i += 1;
        scrollPodToBottom();
        /* 运笔节奏：句读处停顿更久 */
        var pause = /[，。；：、！？—]/.test(just) ? 300 : 48 + Math.random() * 80;
        window.setTimeout(writeNext, pause);
      } else {
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
        var endSeal = makeSeal('千问');
        endSeal.className = 'seal seal-sm answer-seal';
        p.appendChild(endSeal);
        isWriting = false;
        scrollPodToBottom();
      }
    }

    window.setTimeout(writeNext, 420);
  }

  function handleAsk() {
    if (!askInput || !inscriptionBody || isWriting) return;
    var q = askInput.value.trim();
    if (!q) return;

    isWriting = true;
    askInput.value = '';

    var ph = document.getElementById('inscriptionPlaceholder');
    if (ph && ph.parentNode) ph.parentNode.removeChild(ph);

    appendQuestion(q);
    scrollPodToBottom();
    appendAnswerAndWrite();
  }

  if (askBtn) askBtn.addEventListener('click', handleAsk);
  if (askInput) {
    askInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') handleAsk();
    });
  }

  /* ============ 启程 ============ */
  startCanvas();
})();
