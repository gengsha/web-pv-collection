/* ============================================================
   Preset 04 · 上元千灯 霓虹灯市 (Lantern Thousand Nights)
   天灯粒子系统 + 灯市微交互 —— 原生 JS，无第三方依赖
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 工具函数 ---------------- */
  function rand(min, max) { return min + Math.random() * (max - min); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function formatInt(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  function nowTime() {
    var d = new Date();
    var p = function (n) { return (n < 10 ? '0' : '') + n; };
    return p(d.getHours()) + ':' + p(d.getMinutes());
  }

  /* ============================================================
     1. Canvas 天灯粒子系统
     ============================================================ */
  var canvas = document.getElementById('skyCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var W = 0;
  var H = 0;
  var stars = [];
  var ambient = [];
  var wishLanterns = [];
  var sparks = [];
  var lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  var LANTERN_COLORS = [
    { core: '#FFD9A0', mid: '#FFB84D', glow: '255, 184, 77' },
    { core: '#FFCFA0', mid: '#FF8A3D', glow: '255, 138, 61' },
    { core: '#FFB4A6', mid: '#E5484D', glow: '229, 72, 77' }
  ];

  var BLESSINGS = [
    '愿人间皆安',
    '愿所求皆如愿',
    '长夜有灯，风雨有归',
    '灯火可亲，万事可期',
    '愿君岁岁常安乐'
  ];

  function resizeCanvas() {
    if (!canvas || !ctx) { return; }
    W = window.innerWidth;
    H = window.innerHeight;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rebuildStars();
  }

  function rebuildStars() {
    stars.length = 0;
    var count = clamp(Math.round((W * H) / 16000), 60, 140);
    for (var i = 0; i < count; i++) {
      stars.push({
        x: rand(0, W),
        y: rand(0, H * 0.72),
        r: rand(0.4, 1.3),
        tw: rand(0, Math.PI * 2),
        sp: rand(0.4, 1.3)
      });
    }
  }

  function targetAmbient() {
    return clamp(Math.round(W / 55), 12, 28);
  }

  /* 生成一盏环境天灯：景深越远，越小、越慢、越暗 */
  function makeAmbient(fromBottom) {
    var depth = rand(0.3, 1);
    return {
      baseX: rand(0, W),
      y: fromBottom ? H + rand(10, 90) : rand(H * 0.15, H * 0.98),
      vy: 7 + depth * 17,
      phase: rand(0, Math.PI * 2),
      swayAmp: 5 + depth * 17,
      swaySpeed: rand(0.35, 0.85),
      r: 1.4 + depth * 3.4,
      color: pick(LANTERN_COLORS),
      depth: depth,
      flicker: rand(0, Math.PI * 2)
    };
  }

  /* 点灯：生成一盏带字天灯 */
  function spawnWishLantern(text) {
    if (!ctx) { return; }
    if (wishLanterns.length > 6) { wishLanterns.shift(); }
    var lantern = {
      baseX: W * rand(0.32, 0.68),
      y: H + 60,
      vy: rand(36, 46),
      phase: rand(0, Math.PI * 2),
      size: rand(26, 34),
      age: 0,
      text: (text || '').trim().slice(0, 8)
    };
    wishLanterns.push(lantern);
    burstSparks(lantern.baseX, H - 24);
  }

  function burstSparks(x, y) {
    for (var i = 0; i < 10; i++) {
      sparks.push({
        x: x + rand(-8, 8),
        y: y,
        vx: rand(-34, 34),
        vy: rand(-80, -24),
        r: rand(1, 2.4),
        age: 0,
        life: rand(0.5, 1)
      });
    }
  }

  function drawStars(t) {
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      var a = 0.28 + 0.4 * (0.5 + 0.5 * Math.sin(s.tw + t * s.sp));
      ctx.fillStyle = 'rgba(255, 243, 224, ' + a.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawAmbient(l, t) {
    var sway = Math.sin(l.phase + t * l.swaySpeed) * l.swayAmp;
    var x = l.baseX + sway;
    var y = l.y;
    var flick = 0.82 + 0.18 * Math.sin(l.flicker + t * 2.2);
    var alpha = (0.3 + l.depth * 0.6) * flick;

    /* 外层暖晕 */
    var glowR = l.r * 6;
    var g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
    g.addColorStop(0, 'rgba(' + l.color.glow + ', ' + (0.5 * alpha).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + l.color.glow + ', 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fill();

    /* 灯身 */
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(l.phase + t * l.swaySpeed) * 0.1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = l.color.mid;
    ctx.beginPath();
    ctx.ellipse(0, 0, l.r * 0.74, l.r, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = l.color.core;
    ctx.beginPath();
    ctx.ellipse(0, -l.r * 0.16, l.r * 0.4, l.r * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  /* 带字天灯：大号灯身 + 竖排心愿文字 */
  function drawWish(l, t) {
    var sway = Math.sin(l.phase + t * 0.7) * 14;
    var x = l.baseX + sway;
    var y = l.y;
    var alpha = clamp(l.age / 0.9, 0, 1);
    var fadeTop = H * 0.16;
    if (y < fadeTop) { alpha *= Math.max(0, y / fadeTop); }
    if (alpha <= 0.01) { return; }

    var w = l.size;
    var h = l.size * 1.25;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(Math.sin(l.phase + t * 0.7) * 0.05);

    /* 多层光晕 */
    var glow = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 3.2);
    glow.addColorStop(0, 'rgba(255, 184, 77, 0.5)');
    glow.addColorStop(0.5, 'rgba(255, 138, 61, 0.18)');
    glow.addColorStop(1, 'rgba(255, 138, 61, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, w * 3.2, 0, Math.PI * 2);
    ctx.fill();

    /* 灯身 */
    var body = ctx.createLinearGradient(0, -h, 0, h);
    body.addColorStop(0, '#FFD9A0');
    body.addColorStop(0.45, '#FFB84D');
    body.addColorStop(1, '#FF8A3D');
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
    ctx.fill();

    /* 烛焰内透（闪烁） */
    var flick = 0.75 + 0.25 * Math.sin(t * 6 + l.phase);
    ctx.fillStyle = 'rgba(255, 243, 224, ' + (0.5 * flick).toFixed(3) + ')';
    ctx.beginPath();
    ctx.ellipse(0, h * 0.28, w * 0.44, h * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    /* 上下灯帽 */
    ctx.fillStyle = '#A63A3E';
    ctx.fillRect(-w * 0.45, -h - 6, w * 0.9, 7);
    ctx.fillRect(-w * 0.38, h - 1, w * 0.76, 6);

    /* 竖排心愿文字 */
    if (l.text) {
      var fs = Math.max(11, Math.round(w * 0.44));
      var lineH = fs * 1.15;
      var maxChars = Math.max(1, Math.floor((h * 1.7) / lineH));
      var chars = l.text.split('').slice(0, maxChars);
      var startY = -((chars.length - 1) * lineH) / 2;
      ctx.fillStyle = '#6B2413';
      ctx.font = '500 ' + fs + 'px "Noto Sans SC", "PingFang SC", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (var i = 0; i < chars.length; i++) {
        ctx.fillText(chars[i], 0, startY + i * lineH - h * 0.08);
      }
    }
    ctx.restore();
  }

  function drawSpark(s) {
    var a = 1 - s.age / s.life;
    ctx.globalAlpha = a;
    ctx.fillStyle = 'rgba(255, 184, 77, 0.9)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    requestAnimationFrame(tick);
    if (!ctx) { return; }
    var dt = clamp((now - lastTime) / 1000, 0.001, 0.05);
    lastTime = now;
    if (document.hidden) { return; }
    var t = now / 1000;

    ctx.clearRect(0, 0, W, H);
    drawStars(t);

    /* 环境天灯数量自适应 */
    var target = targetAmbient();
    while (ambient.length < target) { ambient.push(makeAmbient(true)); }
    if (ambient.length > target + 6) { ambient.length = target; }

    var i, l;
    for (i = 0; i < ambient.length; i++) {
      l = ambient[i];
      l.y -= l.vy * dt;
      if (l.y < -50) {
        ambient[i] = makeAmbient(true);
      } else {
        drawAmbient(l, t);
      }
    }

    for (i = wishLanterns.length - 1; i >= 0; i--) {
      l = wishLanterns[i];
      l.age += dt;
      l.y -= l.vy * dt;
      if (l.y < -160) {
        wishLanterns.splice(i, 1);
        continue;
      }
      drawWish(l, t);
    }

    for (i = sparks.length - 1; i >= 0; i--) {
      var s = sparks[i];
      s.age += dt;
      if (s.age >= s.life) {
        sparks.splice(i, 1);
        continue;
      }
      s.vy += 70 * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      drawSpark(s);
    }
  }

  if (canvas && ctx) {
    resizeCanvas();
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 160);
    });
    for (var n = 0; n < targetAmbient(); n++) { ambient.push(makeAmbient(false)); }
    requestAnimationFrame(tick);
  }

  /* ============================================================
     2. 今夜灯况 · 数字滚动计数
     ============================================================ */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var duration = 1600;
    var start = performance.now();
    function frame(now) {
      var p = clamp((now - start) / duration, 0, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = decimals > 0 ? val.toFixed(decimals) : formatInt(val);
      if (p < 1) { requestAnimationFrame(frame); }
    }
    requestAnimationFrame(frame);
  }

  var statEls = document.querySelectorAll('.stat-num[data-count]');
  if (statEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) { return; }
          io.unobserve(entry.target);
          animateCount(entry.target);
        });
      }, { threshold: 0.4 });
      statEls.forEach(function (el) { io.observe(el); });
    } else {
      statEls.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count')) || 0;
        var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        el.textContent = decimals > 0 ? target.toFixed(decimals) : formatInt(target);
      });
    }
  }

  /* ============================================================
     3. 点灯许愿交互
     ============================================================ */
  var wishInput = document.getElementById('wishInput');
  var lightBtn = document.getElementById('lightBtn');
  var wishWall = document.getElementById('wishWall');
  var navLightBtn = document.getElementById('navLightBtn');
  var wishSection = document.getElementById('wish');
  var lightBtnLabel = lightBtn ? lightBtn.textContent : '';
  var btnBusy = false;

  function addWishToWall(text) {
    if (!wishWall) { return; }
    var li = document.createElement('li');
    li.className = 'wish-item';
    var dot = document.createElement('span');
    dot.className = 'wish-dot';
    var span = document.createElement('span');
    span.className = 'wish-text';
    span.textContent = text;
    var time = document.createElement('span');
    time.className = 'wish-time';
    time.textContent = nowTime();
    li.appendChild(dot);
    li.appendChild(span);
    li.appendChild(time);
    wishWall.insertBefore(li, wishWall.firstChild);
    while (wishWall.children.length > 6) {
      wishWall.removeChild(wishWall.lastChild);
    }
  }

  function lightLantern() {
    var raw = wishInput ? wishInput.value.trim() : '';
    var text = raw || pick(BLESSINGS);
    spawnWishLantern(text);
    addWishToWall(text);
    if (wishInput && raw) { wishInput.value = ''; }
    if (lightBtn && !btnBusy) {
      btnBusy = true;
      lightBtn.classList.add('is-lit');
      lightBtn.textContent = '灯已升起 ✦';
      window.setTimeout(function () {
        lightBtn.textContent = lightBtnLabel;
        lightBtn.classList.remove('is-lit');
        btnBusy = false;
      }, 1500);
    }
  }

  if (lightBtn) {
    lightBtn.addEventListener('click', lightLantern);
  }
  if (wishInput) {
    wishInput.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        lightLantern();
      }
    });
  }
  if (navLightBtn) {
    navLightBtn.addEventListener('click', function () {
      if (wishSection) {
        wishSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.setTimeout(function () {
        var blessing = pick(BLESSINGS);
        spawnWishLantern(blessing);
        addWishToWall(blessing);
        if (wishInput) { wishInput.focus({ preventScroll: true }); }
      }, 550);
    });
  }

  /* ============================================================
     4. 明月山峦 · 光标视差
     ============================================================ */
  var moon = document.getElementById('moon');
  var mtnFar = document.getElementById('mtnFar');
  var mtnNear = document.getElementById('mtnNear');

  if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
    var mx = 0;
    var my = 0;
    var pRaf = null;

    function applyParallax() {
      pRaf = null;
      if (moon) { moon.style.transform = 'translate(' + (mx * -16).toFixed(1) + 'px,' + (my * -10).toFixed(1) + 'px)'; }
      if (mtnFar) { mtnFar.style.transform = 'translateX(' + (mx * 10).toFixed(1) + 'px)'; }
      if (mtnNear) { mtnNear.style.transform = 'translateX(' + (mx * 18).toFixed(1) + 'px)'; }
    }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (pRaf === null) { pRaf = requestAnimationFrame(applyParallax); }
    });
  }
})();
