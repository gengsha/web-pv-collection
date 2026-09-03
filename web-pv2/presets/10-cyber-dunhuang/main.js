/* ============================================================
   Preset 10 · 赛博敦煌 Cyber Dunhuang
   飞天飘带流体 / 金粉粒子 / 全息修复微交互
   原生 JS · 无第三方库 · IIFE 包裹
   ============================================================ */
(function () {
  'use strict';

  function init() {
    var prefersReduced = false;
    try {
      prefersReduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (err) {
      prefersReduced = false;
    }

    /* ==========================================================
       1. Canvas：飞天飘带（贝塞尔色带）+ 金粉粒子上升
       ========================================================== */
    var canvas = document.getElementById('dunhuangCanvas');
    var ctx = canvas ? canvas.getContext('2d') : null;
    var W = 0;
    var H = 0;
    var DPR = 1;
    var dust = [];
    var pointer = { x: 0.5, y: 0.5, cx: 0.5, cy: 0.5 };

    /* 三条飘带：石青 / 石绿 / 金箔 */
    var RIBBONS = [
      { base: 0.28, amp1: 46, amp2: 20, k1: 0.0021, k2: 0.0052, s1: 0.00040, s2: 0.00058, phase: 0.0, width: 46, hue: [42, 111, 151], glow: 1.0 },
      { base: 0.52, amp1: 36, amp2: 28, k1: 0.0016, k2: 0.0047, s1: 0.00034, s2: 0.00050, phase: 2.1, width: 34, hue: [62, 142, 126], glow: 1.2 },
      { base: 0.72, amp1: 28, amp2: 16, k1: 0.0025, k2: 0.0061, s1: 0.00046, s2: 0.00026, phase: 4.4, width: 22, hue: [232, 200, 122], glow: 1.5 }
    ];

    function rgba(hue, a) {
      return 'rgba(' + hue[0] + ',' + hue[1] + ',' + hue[2] + ',' + a + ')';
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedDust();
    }

    function seedDust() {
      var count = Math.min(110, Math.max(40, Math.round((W * H) / 16000)));
      dust = [];
      for (var i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.6 + Math.random() * 1.7,
          vy: 0.12 + Math.random() * 0.42,
          sway: 0.3 + Math.random() * 1.1,
          ph: Math.random() * Math.PI * 2,
          tw: 0.6 + Math.random() * 1.2
        });
      }
    }

    /* 以平滑二次贝塞尔中点法绘制一条渐变色带 */
    function drawBand(points, widthMul, alpha, hue) {
      var n = points.length;
      if (n < 3 || W <= 0) return;

      var grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, rgba(hue, alpha * 0.35));
      grad.addColorStop(0.5, rgba(hue, alpha));
      grad.addColorStop(1, rgba(hue, alpha * 0.35));
      ctx.fillStyle = grad;

      var i, p, prev, mx, my;

      function topY(pt) { return pt.y - (pt.w * widthMul) / 2; }
      function botY(pt) { return pt.y + (pt.w * widthMul) / 2; }

      ctx.beginPath();
      ctx.moveTo(points[0].x, topY(points[0]));

      /* 上缘：左 -> 右 */
      for (i = 1; i < n; i++) {
        prev = points[i - 1];
        p = points[i];
        mx = (prev.x + p.x) / 2;
        my = (topY(prev) + topY(p)) / 2;
        ctx.quadraticCurveTo(prev.x, topY(prev), mx, my);
      }
      ctx.lineTo(points[n - 1].x, topY(points[n - 1]));

      /* 右端收口 -> 下缘：右 -> 左 */
      ctx.lineTo(points[n - 1].x, botY(points[n - 1]));
      for (i = n - 2; i >= 0; i--) {
        prev = points[i + 1];
        p = points[i];
        mx = (prev.x + p.x) / 2;
        my = (botY(prev) + botY(p)) / 2;
        ctx.quadraticCurveTo(prev.x, botY(prev), mx, my);
      }
      ctx.lineTo(points[0].x, botY(points[0]));

      ctx.closePath();
      ctx.fill();
    }

    function drawRibbon(t, rb) {
      var step = 22;
      var yShift = (pointer.cy - 0.5) * 70 * rb.glow;
      var xShift = (pointer.cx - 0.5) * 50;
      var pts = [];

      for (var x = -80; x <= W + 80; x += step) {
        var y = H * rb.base
          + Math.sin(x * rb.k1 + t * rb.s1 + rb.phase) * rb.amp1
          + Math.sin(x * rb.k2 - t * rb.s2 + rb.phase * 1.7) * rb.amp2
          + yShift;
        var w = rb.width * (0.55 + 0.45 * Math.sin(x * 0.0018 + t * 0.00036 + rb.phase * 0.8));
        pts.push({ x: x + xShift, y: y, w: w });
      }

      drawBand(pts, 2.6, 0.06, rb.hue);   /* 外晕 */
      drawBand(pts, 1.0, 0.15, rb.hue);   /* 带身 */

      /* 中央高光线：如丝绸飞白 */
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var i = 1; i < pts.length; i++) {
        var prev = pts[i - 1];
        var p = pts[i];
        ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + p.x) / 2, (prev.y + p.y) / 2);
      }
      ctx.strokeStyle = rgba(rb.hue, 0.42);
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }

    function drawDust(t) {
      for (var i = 0; i < dust.length; i++) {
        var p = dust[i];
        p.y -= p.vy;
        p.x += Math.sin(t * 0.0005 + p.ph) * p.sway * 0.22;
        if (p.y < -10) {
          p.y = H + 10;
          p.x = Math.random() * W;
        }
        var a = 0.16 + 0.38 * (0.5 + 0.5 * Math.sin(t * 0.0018 * p.tw + p.ph));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 200, 122, ' + a.toFixed(3) + ')';
        ctx.fill();
      }
    }

    function renderFrame(t) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      pointer.cx += (pointer.x - pointer.cx) * 0.04;
      pointer.cy += (pointer.y - pointer.cy) * 0.04;

      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < RIBBONS.length; i++) {
        drawRibbon(t, RIBBONS[i]);
      }
      drawDust(t);
      ctx.globalCompositeOperation = 'source-over';
    }

    function loop(t) {
      renderFrame(t);
      window.requestAnimationFrame(loop);
    }

    if (canvas && ctx) {
      resizeCanvas();

      var resizeTimer = null;
      window.addEventListener('resize', function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resizeCanvas, 160);
      });

      window.addEventListener('pointermove', function (e) {
        pointer.x = e.clientX / Math.max(W, 1);
        pointer.y = e.clientY / Math.max(H, 1);
      }, { passive: true });

      if (prefersReduced) {
        renderFrame(1200); /* 静态定格一帧 */
      } else {
        window.requestAnimationFrame(loop);
      }
    }

    /* ==========================================================
       2. 窟门双开：区块入场遮罩
       ========================================================== */
    var gates = Array.prototype.slice.call(document.querySelectorAll('.gate'));

    if (prefersReduced || !('IntersectionObserver' in window)) {
      gates.forEach(function (g) { g.classList.add('is-open'); });
    } else {
      /* 窟门闭合态自带 clip-path，IntersectionObserver 会恒报零相交，
         故改用 rAF 几何检测驱动窟门双开 */
      var pendingGates = gates.slice();

      function checkGates() {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        pendingGates = pendingGates.filter(function (g) {
          var r = g.getBoundingClientRect();
          if (r.top < vh * 0.92 && r.bottom > 0) {
            g.classList.add('is-open');
            return false;
          }
          return true;
        });
        if (pendingGates.length) window.requestAnimationFrame(checkGates);
      }

      window.requestAnimationFrame(checkGates);
    }

    /* ==========================================================
       3. 修复台 · 全息重现交互
       ========================================================== */
    var restoreInput = document.getElementById('restoreInput');
    var restoreBtn = document.getElementById('restoreBtn');
    var restoreOutput = document.getElementById('restoreOutput');
    var restoreStatus = document.getElementById('restoreStatus');
    var restoreText = document.getElementById('restoreText');
    var typeTimer = null;

    var RESTORE_SCRIPTS = [
      function (s) {
        return '扫描线掠过「' + s + '」的残缘——剥落处以石青补笔，漫漶金线重新沥粉贴金。全息光幕里，矿物颗粒逐帧归位，衣袂的运笔轨迹被算力重新点亮：此壁重现盛唐原色，斑驳化作流光。';
      },
      function (s) {
        return '全息重建启动：对「' + s + '」进行多光谱分层解析。底层起稿线在石绿之上显影，褪去的土红被逐像素校色，千年前的画工笔意以 0.1 毫米精度复原。修复完成度 99.2%，余下 0.8%，留予想象。';
      },
      function (s) {
        return '以「' + s + '」为残卷基准，修复台补全了缺失的三组飞天轮廓：飘带走线按「吴带当风」范式重描，散花轨迹由粒子系统重演。金箔反光校准完毕，窟内光场已同步至全息档案。';
      },
      function (s) {
        return '残卷「' + s + '」已入全息阵：裂纹网络被逆向求解，颜料的氧化时钟回拨至初绘之年。石青如初、赭黄正暖，壁上的故事隔着千年，重新开口说话。';
      }
    ];

    function finishRestore() {
      if (restoreStatus) {
        restoreStatus.textContent = '✦ 全息重现完成 · 矿彩已固色 ✦';
      }
      if (restoreBtn) {
        restoreBtn.disabled = false;
        restoreBtn.textContent = '全息重现';
      }
    }

    function runRestore() {
      if (!restoreInput || !restoreBtn || !restoreText || !restoreStatus || !restoreOutput) return;
      var subject = restoreInput.value.trim() || '一幅无题的残壁';

      if (typeTimer) {
        window.clearInterval(typeTimer);
        typeTimer = null;
      }

      restoreBtn.disabled = true;
      restoreBtn.textContent = '全息重建中…';
      restoreStatus.textContent = '✦ 扫描线掠过 · 矿物颗粒逐帧归位 ✦';

      /* 重新触发扫描线动画 */
      restoreOutput.classList.remove('is-scanning');
      void restoreOutput.offsetWidth;
      restoreOutput.classList.add('is-scanning');

      var script = RESTORE_SCRIPTS[Math.floor(Math.random() * RESTORE_SCRIPTS.length)](subject);

      if (prefersReduced) {
        restoreText.textContent = script;
        finishRestore();
        return;
      }

      restoreText.textContent = '';
      var i = 0;
      typeTimer = window.setInterval(function () {
        i += 2;
        restoreText.textContent = script.slice(0, i);
        if (i >= script.length) {
          window.clearInterval(typeTimer);
          typeTimer = null;
          finishRestore();
        }
      }, 26);
    }

    if (restoreBtn) {
      restoreBtn.addEventListener('click', runRestore);
    }
    if (restoreInput) {
      restoreInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') runRestore();
      });
    }

    /* ==========================================================
       4. 传承遥测：数字滚动 + 进度条点亮
       ========================================================== */
    var legacySection = document.getElementById('legacy');
    var legacyCounted = false;

    function formatValue(value, decimals) {
      if (decimals > 0) return value.toFixed(decimals);
      return Math.round(value).toLocaleString('zh-CN');
    }

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-count')) || 0;
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1800;
      var startTime = -1;

      function tick(now) {
        if (startTime < 0) startTime = now;
        var progress = Math.min((now - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = formatValue(target * eased, decimals);
        if (progress < 1) window.requestAnimationFrame(tick);
      }
      window.requestAnimationFrame(tick);
    }

    function revealLegacy() {
      if (legacyCounted) return;
      legacyCounted = true;

      var nums = Array.prototype.slice.call(document.querySelectorAll('.tele-num[data-count]'));
      var fill = document.getElementById('progressFill');
      var fillTarget = fill ? (parseFloat(fill.getAttribute('data-progress')) || 0) : 0;

      if (prefersReduced) {
        nums.forEach(function (el) {
          var t = parseFloat(el.getAttribute('data-count')) || 0;
          var d = parseInt(el.getAttribute('data-decimals') || '0', 10);
          el.textContent = formatValue(t, d);
        });
      } else {
        nums.forEach(animateCounter);
      }
      if (fill) fill.style.width = fillTarget + '%';
    }

    if (legacySection) {
      if (prefersReduced || !('IntersectionObserver' in window)) {
        revealLegacy();
      } else {
        var legacyObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              revealLegacy();
              legacyObserver.disconnect();
            }
          });
        }, { threshold: 0.25 });
        legacyObserver.observe(legacySection);

        /* IO 首帧回调在部分环境会延迟送达，几何检测兜底 */
        var legacyFallback = function () {
          var vh = window.innerHeight || document.documentElement.clientHeight;
          var r = legacySection.getBoundingClientRect();
          if (r.top < vh * 0.9 && r.bottom > 0) {
            revealLegacy();
            legacyObserver.disconnect();
            window.removeEventListener('scroll', legacyFallback);
            window.removeEventListener('resize', legacyFallback);
          }
        };
        window.addEventListener('scroll', legacyFallback, { passive: true });
        window.addEventListener('resize', legacyFallback);
        setTimeout(legacyFallback, 400);
        setTimeout(legacyFallback, 1600);
      }
    }

    /* ==========================================================
       5. 导航滚动侦测与跳转
       ========================================================== */
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
    var sectionEls = ['murals', 'restore', 'legacy']
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    if (navLinks.length && sectionEls.length && 'IntersectionObserver' in window) {
      var spyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        });
      }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
      sectionEls.forEach(function (s) { spyObserver.observe(s); });
    }

    function scrollToSection(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }

    function wireButton(btnId, targetId) {
      var btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('click', function () { scrollToSection(targetId); });
    }

    wireButton('navRestoreBtn', 'restore');
    wireButton('enterRestoreBtn', 'restore');
    wireButton('enterMuralsBtn', 'murals');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
