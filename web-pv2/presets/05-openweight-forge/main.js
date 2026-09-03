/* ============================================================
   Preset 05 · Open Weight Forge —— 火花粒子系统与微交互
   原生 JS · IIFE 包裹 · 无第三方依赖
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 火花粒子系统 ---------------- */
  var canvas = document.getElementById('sparkCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var sparks = [];
  var MAX_SPARKS = 240;
  var GRAVITY = 320; // px/s^2 重力下落
  var DRAG = 0.985;  // 空气阻力
  var SPARK_COLORS = ['#FF3D00', '#FF6B1A', '#FFB347', '#FFC53D'];
  var lastTime = 0;

  function resizeCanvas() {
    if (!canvas || !ctx) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawnSpark(x, y, power) {
    if (sparks.length >= MAX_SPARKS) return;
    var angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.5; // 主要向上迸溅
    var speed = (60 + Math.random() * 220) * (power || 1);
    sparks.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: 0.7 + Math.random() * 1.1,
      size: 1 + Math.random() * 2.2,
      color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0]
    });
  }

  function burst(x, y, count, power) {
    var n = count || 14;
    for (var i = 0; i < n; i++) {
      spawnSpark(x + (Math.random() - 0.5) * 12, y + (Math.random() - 0.5) * 8, power || 1);
    }
  }

  function frame(now) {
    requestAnimationFrame(frame);
    if (!ctx) return;
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // 炉口持续迸溅：视口底部中央的熔炉口
    if (sparks.length < MAX_SPARKS - 8) {
      var furnaceX = window.innerWidth * 0.5;
      var furnaceY = window.innerHeight - 6;
      var emitCount = 2;
      for (var e = 0; e < emitCount; e++) {
        spawnSpark(furnaceX + (Math.random() - 0.5) * 220, furnaceY, 0.9);
      }
    }

    ctx.globalCompositeOperation = 'lighter';
    for (var i = sparks.length - 1; i >= 0; i--) {
      var p = sparks[i];
      p.life += dt;
      if (p.life >= p.maxLife || p.y > window.innerHeight + 20) {
        sparks.splice(i, 1);
        continue;
      }
      p.vy += GRAVITY * dt;   // 重力加速度
      p.vx *= DRAG;
      p.vy *= DRAG;
      p.x += p.vx * dt;
      p.y += p.vy * dt;

      var fade = 1 - p.life / p.maxLife; // 亮度随生命衰减淡出
      var flicker = 0.75 + Math.random() * 0.25;
      ctx.globalAlpha = fade * flicker;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (0.6 + fade * 0.4), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  if (canvas && ctx) {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(function (t) {
      lastTime = t;
      requestAnimationFrame(frame);
    });
  }

  /* ---------------- 卡片悬停火花微迸 ---------------- */
  var sparkTargets = document.querySelectorAll('[data-spark]');
  Array.prototype.forEach.call(sparkTargets, function (el) {
    el.addEventListener('mouseenter', function (ev) {
      var x = ev.clientX || (el.getBoundingClientRect().left + el.offsetWidth / 2);
      var y = ev.clientY || (el.getBoundingClientRect().top + 20);
      burst(x, y, 16, 0.85);
    });
  });

  /* ---------------- 锻锤入场：IntersectionObserver ---------------- */
  var revealSelectors = '.section-header, .crate-card, .furnace-telemetry, .hero-stencil, .hero-title, .hero-desc, .hero-cta-group';
  var revealEls = document.querySelectorAll(revealSelectors);
  Array.prototype.forEach.call(revealEls, function (el) {
    el.classList.add('forge-reveal');
  });

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // 同屏元素错落下锤
        var siblings = el.parentNode ? el.parentNode.querySelectorAll('.forge-reveal') : [];
        var idx = 0;
        Array.prototype.forEach.call(siblings, function (s, i) {
          if (s === el) idx = i;
        });
        el.style.animationDelay = (idx % 6) * 0.07 + 's';
        el.classList.add('revealed');
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    Array.prototype.forEach.call(revealEls, function (el) {
      revealObserver.observe(el);
    });

    /* IO 首帧回调在部分环境（如 iframe 内）会延迟送达，
       用几何检测兜底，保证首屏不被永久隐藏 */
    var revealInView = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      Array.prototype.forEach.call(revealEls, function (el) {
        if (el.classList.contains('revealed')) return;
        var r = el.getBoundingClientRect();
        if (r.top >= vh * 0.94 || r.bottom <= -40) return;
        var siblings = el.parentNode ? el.parentNode.querySelectorAll('.forge-reveal') : [];
        var idx = 0;
        Array.prototype.forEach.call(siblings, function (s, i) {
          if (s === el) idx = i;
        });
        el.style.animationDelay = (idx % 6) * 0.07 + 's';
        el.classList.add('revealed');
      });
    };
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView);
    setTimeout(revealInView, 300);
    setTimeout(revealInView, 1200);
    setTimeout(revealInView, 2600);
  } else {
    Array.prototype.forEach.call(revealEls, function (el) {
      el.classList.add('revealed');
    });
  }

  /* ---------------- 热度条充能 ---------------- */
  var gauges = document.querySelectorAll('.gauge-fill');
  function chargeGauge(g) {
    var pct = parseInt(g.getAttribute('data-percent'), 10) || 0;
    g.style.width = pct + '%';
  }
  if ('IntersectionObserver' in window && gauges.length) {
    var gaugeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          chargeGauge(entry.target);
          gaugeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    Array.prototype.forEach.call(gauges, function (g) { gaugeObserver.observe(g); });
  } else {
    Array.prototype.forEach.call(gauges, chargeGauge);
  }

  /* ---------------- 滚动计数 count-up ---------------- */
  var counters = document.querySelectorAll('.count-up');
  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function runCountUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var value = Math.floor(easeOutCubic(progress) * target);
      el.textContent = value.toLocaleString('en-US') + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-US') + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          runCountUp(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (c) { countObserver.observe(c); });
  } else {
    Array.prototype.forEach.call(counters, runCountUp);
  }

  /* ---------------- 终端复制按钮 ---------------- */
  var copyBtns = document.querySelectorAll('.copy-btn');
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* 静默失败 */ }
    document.body.removeChild(ta);
  }

  Array.prototype.forEach.call(copyBtns, function (btn) {
    btn.addEventListener('click', function () {
      var cmd = btn.getAttribute('data-cmd') || '';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cmd).catch(function () { fallbackCopy(cmd); });
      } else {
        fallbackCopy(cmd);
      }
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      var rect = btn.getBoundingClientRect();
      burst(rect.left + rect.width / 2, rect.top, 12, 0.7);
      setTimeout(function () {
        btn.textContent = '复制';
        btn.classList.remove('copied');
      }, 1400);
    });
  });

  /* ---------------- 导航与按钮微交互 ---------------- */
  function scrollToId(id) {
    var el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var grabWeightsBtn = document.getElementById('grabWeightsBtn');
  if (grabWeightsBtn) {
    grabWeightsBtn.addEventListener('click', function (ev) {
      burst(ev.clientX, ev.clientY, 20, 1);
      scrollToId('#terminal');
    });
  }

  var heroVaultBtn = document.getElementById('heroVaultBtn');
  if (heroVaultBtn) {
    heroVaultBtn.addEventListener('click', function (ev) {
      burst(ev.clientX, ev.clientY, 20, 1);
      scrollToId('#vault');
    });
  }

  var heroLicenseBtn = document.getElementById('heroLicenseBtn');
  if (heroLicenseBtn) {
    heroLicenseBtn.addEventListener('click', function (ev) {
      burst(ev.clientX, ev.clientY, 20, 1);
      scrollToId('#impact');
    });
  }

  /* ---------------- 导航链接 active 跟随 ---------------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = ['vault', 'terminal', 'impact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(navLinks, function (link) {
          var isActive = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', isActive);
        });
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();
