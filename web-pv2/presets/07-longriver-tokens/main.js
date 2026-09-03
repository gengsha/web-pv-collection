/* =========================================================
   Preset 07 · 亿万词长河 (Long River of Tokens)
   核心：Canvas 文字长河 + 大海捞针 + 时代卷轴 + 水面涟漪
   纯原生 JS，IIFE 包裹，无第三方依赖
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ---------- 工具 ---------- */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

  /* ---------- 词库：江河诗词 + 模型词元 ---------- */
  var RIVER_CHARS = (
    '黄河之水天上来奔流到海不复回大江东去浪淘尽千古风流人物' +
    '春江潮水连海平海上明月共潮生逝者如斯夫不舍昼夜上善若水' +
    '天行健君子以自强不息路漫漫其修远兮吾将上下而求索' +
    '学而时习之不亦说乎关关雎鸠在河之洲蒹葭苍苍白露为霜' +
    '落霞与孤鹜齐飞秋水共长天一色星垂平野阔月涌大江流'
  ).split('');

  var TOKEN_WORDS = [
    'token', 'context', 'attention', 'query', 'key', 'value',
    'softmax', 'embedding', 'decode', 'cache', 'stream', 'memory',
    'long-context', 'RoPE', 'KV', '词元', '涟漪', '长河'
  ];

  /* ---------- Canvas 初始化 ---------- */
  var canvas = document.getElementById('riverCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var W = 0, H = 0;
  var particles = [];
  var glints = [];
  var ripples = [];
  var hunt = null;
  var toastTimer = null;

  var toast = document.getElementById('findToast');
  var toastChar = document.getElementById('findToastChar');
  var toastText = document.getElementById('findToastText');
  var needleLog = document.getElementById('needleLog');
  var needleInput = document.getElementById('needleInput');
  var needleBtn = document.getElementById('needleBtn');

  function seedRiver() {
    var count = Math.round(clamp(W / 16, 42, 96));
    particles = [];
    var i;
    for (i = 0; i < count; i++) particles.push(makeParticle(rand(-40, W)));

    var glintCount = Math.round(clamp(W / 28, 18, 48));
    glints = [];
    for (i = 0; i < glintCount; i++) {
      glints.push({
        x: rand(0, W),
        y: rand(0, H),
        len: rand(24, 130),
        speed: rand(22, 58),
        alpha: rand(0.02, 0.1),
        phase: rand(0, Math.PI * 2),
        freq: rand(0.4, 1.2),
        color: Math.random() < 0.6 ? '#E8DFC8' : '#7FD8D0'
      });
    }
  }

  function makeParticle(x) {
    var isWord = Math.random() < 0.2;
    var layer = Math.random(); /* 0 远 -> 1 近 */
    var size = (isWord ? rand(11, 16) : rand(13, 30)) * (0.6 + layer * 0.78);
    var roll = Math.random();
    return {
      text: isWord ? pick(TOKEN_WORDS) : pick(RIVER_CHARS),
      isWord: isWord,
      x: x,
      y0: rand(H * 0.06, H * 0.96),
      speed: rand(8, 26) * (0.5 + layer * 0.95),
      amp: rand(3, 12),
      phase: rand(0, Math.PI * 2),
      bobFreq: rand(0.3, 0.9),
      shimmerFreq: rand(0.6, 1.6),
      size: size,
      alphaBase: 0.13 + layer * 0.42,
      alphaAmp: rand(0.06, 0.22),
      color: roll < 0.72 ? '#E8DFC8' : (roll < 0.9 ? '#7FD8D0' : '#D9B36C'),
      layer: layer,
      hunted: false
    };
  }

  function resize() {
    if (!canvas || !ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!hunt || !particles.length) seedRiver();
  }

  /* ---------- 绘制 ---------- */
  function stepParticle(p, dt) {
    p.x -= p.speed * dt * (p.hunted ? 0.12 : 1);
    if (p.x < -150 && !p.hunted) {
      var np = makeParticle(W + rand(20, 140));
      for (var k in np) { if (Object.prototype.hasOwnProperty.call(np, k)) p[k] = np[k]; }
    }
  }

  function drawParticle(p, t, dim) {
    var y = p.y0 + Math.sin(t * p.bobFreq + p.phase) * p.amp;
    var alpha = p.alphaBase + Math.sin(t * p.shimmerFreq + p.phase * 1.7) * p.alphaAmp;
    ctx.globalAlpha = clamp(alpha, 0.04, 0.95) * (1 - dim);
    ctx.fillStyle = p.color;
    ctx.font = p.isWord
      ? '500 ' + Math.round(p.size * 0.74) + 'px "JetBrains Mono", monospace'
      : '600 ' + Math.round(p.size) + 'px "Noto Serif SC", serif';
    ctx.fillText(p.text, p.x, y);
  }

  function drawGlints(t, dt) {
    var i, g, a;
    for (i = 0; i < glints.length; i++) {
      g = glints[i];
      g.x -= g.speed * dt;
      if (g.x + g.len < 0) {
        g.x = W + rand(0, 80);
        g.y = rand(0, H);
        g.len = rand(24, 130);
      }
      a = g.alpha * (0.6 + 0.4 * Math.sin(t * g.freq + g.phase));
      if (a <= 0.004) continue;
      ctx.globalAlpha = a;
      ctx.fillStyle = g.color;
      ctx.fillRect(g.x, g.y + Math.sin(t * 0.5 + g.phase) * 4, g.len, 1);
    }
    ctx.globalAlpha = 1;
  }

  function drawSweep(x) {
    var grad = ctx.createLinearGradient(x - 34, 0, x + 34, 0);
    grad.addColorStop(0, 'rgba(127, 216, 208, 0)');
    grad.addColorStop(0.5, 'rgba(127, 216, 208, 0.17)');
    grad.addColorStop(1, 'rgba(127, 216, 208, 0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.fillRect(x - 34, 0, 68, H);
  }

  function drawHunted(t, dim) {
    if (!hunt) return;
    var p = hunt.particle;
    var y = p.y0 + Math.sin(t * p.bobFreq + p.phase) * p.amp * 0.3;
    var grow = hunt.glow;
    ctx.save();
    ctx.globalAlpha = clamp(0.45 + grow * 0.55, 0, 1) * (1 - dim * 0.2);
    ctx.shadowColor = 'rgba(127, 216, 208, 0.9)';
    ctx.shadowBlur = 16 + grow * 28;
    ctx.fillStyle = grow > 0.55 ? '#E8DFC8' : '#7FD8D0';
    var size = p.size * (1 + grow * 0.9);
    ctx.font = (p.isWord ? '500 ' : '900 ') + Math.round(size) +
      (p.isWord ? 'px "JetBrains Mono", monospace' : 'px "Noto Serif SC", serif');
    ctx.fillText(p.text, p.x, y);
    ctx.restore();
  }

  function spawnRipple(x, y, strong) {
    ripples.push({
      x: x,
      y: y,
      r: strong ? 8 : 4,
      max: strong ? 130 : 74,
      alpha: strong ? 0.5 : 0.36,
      w: strong ? 2 : 1.4
    });
    if (strong) {
      ripples.push({ x: x, y: y, r: 3, max: 84, alpha: 0.3, w: 1.2 });
    }
  }

  function drawRipples(dt) {
    var i, r;
    for (i = ripples.length - 1; i >= 0; i--) {
      r = ripples[i];
      r.r += (r.max - r.r) * 2.3 * dt + 26 * dt;
      r.alpha -= dt * 0.5;
      if (r.alpha <= 0 || r.r >= r.max) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = Math.max(r.alpha, 0);
      ctx.strokeStyle = 'rgba(127, 216, 208, 1)';
      ctx.lineWidth = r.w;
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, r.r, r.r * 0.42, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- 大海捞针 ---------- */
  function startHunt(keyword) {
    if (hunt) return false;
    var kw = keyword.trim();
    if (!kw) return false;

    var targetText = /^[\x20-\x7E]+$/.test(kw) ? kw : kw.charAt(0);
    var p = null;
    var candidates = [];
    var i;
    for (i = 0; i < particles.length; i++) {
      if (particles[i].text === targetText) candidates.push(particles[i]);
    }
    if (candidates.length) {
      candidates.sort(function (a, b) {
        return Math.abs(a.x - W * 0.58) - Math.abs(b.x - W * 0.58);
      });
      p = candidates[0];
    } else {
      var pool = [];
      for (i = 0; i < particles.length; i++) {
        if (particles[i].layer > 0.35) pool.push(particles[i]);
      }
      p = pool.length ? pool[Math.floor(Math.random() * pool.length)] : particles[0];
    }
    if (!p) return false;

    p.text = targetText;
    p.isWord = targetText.length > 1;
    p.size = p.isWord ? Math.max(p.size, 18) : Math.max(p.size, 26);
    p.hunted = true;
    if (p.x < W * 0.28) p.x = W * rand(0.4, 0.6);
    if (p.x > W * 0.92) p.x = W * rand(0.5, 0.7);

    hunt = { particle: p, phase: 'sweep', sweepX: -70, glow: 0, dim: 0, hold: 0 };
    return true;
  }

  function updateHunt(dt, t) {
    var p = hunt.particle;
    var y = p.y0 + Math.sin(t * p.bobFreq + p.phase) * p.amp * 0.3;

    if (hunt.phase === 'sweep') {
      hunt.dim = Math.min(hunt.dim + dt * 1.5, 0.52);
      var speed = Math.max((p.x + 70) / 1.05, 420);
      hunt.sweepX += speed * dt;
      drawSweep(hunt.sweepX);
      if (hunt.sweepX >= p.x) {
        hunt.phase = 'lock';
        spawnRipple(p.x, y, true);
        onHuntLock(p, y);
      }
    } else if (hunt.phase === 'lock') {
      hunt.glow = Math.min(hunt.glow + dt * 2.5, 1);
      if (hunt.glow >= 1) { hunt.phase = 'hold'; hunt.hold = 0; }
    } else if (hunt.phase === 'hold') {
      hunt.hold += dt;
      if (hunt.hold > 2.4) hunt.phase = 'fade';
    } else if (hunt.phase === 'fade') {
      hunt.glow = Math.max(hunt.glow - dt * 1.7, 0);
      hunt.dim = Math.max(hunt.dim - dt * 1.3, 0);
      if (hunt.glow <= 0 && hunt.dim <= 0) {
        p.hunted = false;
        hunt = null;
        return;
      }
    }
    if (hunt) drawHunted(t, hunt.dim * 0.25);
  }

  function onHuntLock(p, y) {
    var pos = fmt(rand(208000, 994000));
    addLog('[命中] 在 ' + pos + ' 词元处找到「' + p.text + '」', 'hit');
    if (!toast || !toastChar || !toastText) return;
    toastChar.textContent = p.text;
    toastText.textContent = '在 ' + pos + ' 词元处找到';
    toast.style.left = clamp(p.x, 120, Math.max(W - 120, 130)) + 'px';
    toast.style.top = clamp(y, 110, Math.max(H - 30, 120)) + 'px';
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      if (toast) toast.classList.remove('show');
    }, 3200);
  }

  function addLog(text, cls) {
    if (!needleLog) return;
    var line = document.createElement('div');
    line.className = 'log-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    needleLog.appendChild(line);
    needleLog.scrollTop = needleLog.scrollHeight;
    while (needleLog.children.length > 40) {
      needleLog.removeChild(needleLog.firstChild);
    }
  }

  function runNeedle() {
    if (hunt) {
      addLog('[等待] 上一次打捞尚未结束，河水正在复位…', 'dim');
      return;
    }
    var kw = needleInput ? needleInput.value.trim() : '';
    if (!kw) {
      if (needleInput) needleInput.focus();
      return;
    }
    if (!startHunt(kw)) return;
    addLog('[汲水] 读取「' + kw + '」，投入长河…', 'step');
    setTimeout(function () {
      addLog('[奔流] 顺流扫描 1,000,000 词元，波光逐一定位…', 'calc');
    }, 420);
  }

  if (needleBtn) needleBtn.addEventListener('click', runNeedle);
  if (needleInput) {
    needleInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        runNeedle();
      }
    });
  }

  var chips = document.querySelectorAll('.chip');
  Array.prototype.forEach.call(chips, function (chip) {
    chip.addEventListener('click', function () {
      var word = chip.getAttribute('data-word') || '';
      if (needleInput) needleInput.value = word;
      runNeedle();
    });
  });

  /* ---------- 水面涟漪（点击反馈） ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target;
    if (!el || !el.tagName) return;
    var tag = el.tagName;
    if (tag === 'INPUT' || tag === 'BUTTON' || tag === 'A' || tag === 'TEXTAREA') return;
    spawnRipple(e.clientX, e.clientY, false);
  });

  /* ---------- 时代卷轴：拖拽 / 滚轮 / 中心帧 ---------- */
  var track = document.getElementById('eraTrack');
  if (track) {
    var isDown = false, startX = 0, startScroll = 0;

    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      isDown = true;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      track.classList.add('dragging');
      try { track.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
    });

    track.addEventListener('pointermove', function (e) {
      if (!isDown) return;
      track.scrollLeft = startScroll - (e.clientX - startX);
    });

    function endDrag() {
      isDown = false;
      track.classList.remove('dragging');
    }
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);
    track.addEventListener('pointerleave', endDrag);

    track.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    function updateEraFocus() {
      var cards = track.querySelectorAll('.era-card');
      if (!cards.length) return;
      var mid = track.scrollLeft + track.clientWidth / 2;
      var best = null, bestD = Infinity, i, c, d;
      for (i = 0; i < cards.length; i++) {
        c = cards[i];
        d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        if (d < bestD) { bestD = d; best = c; }
      }
      for (i = 0; i < cards.length; i++) {
        cards[i].classList.toggle('is-center', cards[i] === best);
      }
    }

    var rafPending = false;
    track.addEventListener('scroll', function () {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(function () {
        rafPending = false;
        updateEraFocus();
      });
    });
    window.addEventListener('resize', updateEraFocus);
    updateEraFocus();
  }

  /* ---------- 进场显现 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          revealObs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(reveals, function (el) { revealObs.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('in-view'); });
  }

  /* IO 首帧回调在部分环境（如 iframe 内）会延迟送达，
     用几何检测兜底，保证首屏不被永久隐藏 */
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    Array.prototype.forEach.call(reveals, function (el) {
      if (el.classList.contains('in-view')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add('in-view');
    });
  }
  window.addEventListener('scroll', revealInView, { passive: true });
  window.addEventListener('resize', revealInView);
  setTimeout(revealInView, 300);
  setTimeout(revealInView, 1200);
  setTimeout(revealInView, 2600);

  /* ---------- 巨字计数 ---------- */
  var mega = document.getElementById('megaNumber');
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 2100, t0 = null;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(target * eased);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (mega) {
    if ('IntersectionObserver' in window) {
      var megaObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            countUp(mega);
            megaObs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      megaObs.observe(mega);
    } else {
      mega.textContent = fmt(1000000);
    }
  }

  /* ---------- 主循环 ---------- */
  var lastTs = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (!ctx || !W || !H) return;
    if (!lastTs) lastTs = ts;
    var dt = Math.min((ts - lastTs) / 1000, 0.05);
    lastTs = ts;
    var t = ts / 1000;

    ctx.clearRect(0, 0, W, H);

    drawGlints(t, dt);

    var dim = hunt ? hunt.dim : 0;
    var i, p;
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      stepParticle(p, dt);
      if (hunt && p === hunt.particle) continue;
      drawParticle(p, t, dim);
    }

    if (hunt) updateHunt(dt, t);
    drawRipples(dt);
    ctx.globalAlpha = 1;
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(frame);
})();
