/* ============================================================
   Preset 02 · Violet Nexus —— Qwen 旗舰交互核心
   原生 JavaScript（IIFE 包裹）· 零第三方依赖 · 无 console 输出
   ============================================================ */
(function () {
  'use strict';

  /* JS 可用标记：供 .reveal 初始隐藏态使用 */
  document.documentElement.className += ' vn-js';

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (err) {
    reduceMotion = false;
  }

  /* ---------- 全局光标状态（归一化 -0.5 ~ 0.5） ---------- */
  var pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  window.addEventListener('mousemove', function (e) {
    var w = window.innerWidth || 1;
    var h = window.innerHeight || 1;
    pointer.tx = e.clientX / w - 0.5;
    pointer.ty = e.clientY / h - 0.5;
  }, { passive: true });

  /* ============================================================
     1. 星尘 canvas 粒子层
     ============================================================ */
  var canvas = document.getElementById('stardust');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var stars = [];
  var W = window.innerWidth;
  var H = window.innerHeight;

  function seedStars() {
    stars = [];
    var count = Math.min(180, Math.max(70, Math.floor((W * H) / 11000)));
    for (var i = 0; i < count; i++) {
      var roll = Math.random();
      var rgb;
      if (roll > 0.94) {
        rgb = '255,106,213';   /* 品红 */
      } else if (roll > 0.82) {
        rgb = '0,212,255';     /* 星青 */
      } else {
        rgb = '206,200,255';   /* 薰衣草白 */
      }
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.4 + Math.random() * 1.25,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.3,
        depth: 0.35 + Math.random() * 0.65,
        rgb: rgb
      });
    }
  }

  function resizeCanvas() {
    if (!canvas || !ctx) { return; }
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedStars();
    if (reduceMotion) { drawStars(performance.now()); }
  }

  function drawStars(t) {
    if (!ctx) { return; }
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < -4) { s.x = W + 4; } else if (s.x > W + 4) { s.x = -4; }
      if (s.y < -4) { s.y = H + 4; } else if (s.y > H + 4) { s.y = -4; }

      var twinkle = 0.5 + 0.5 * Math.sin(t * 0.001 * s.speed + s.phase);
      var alpha = 0.18 + 0.6 * twinkle;
      var px = s.x + pointer.x * s.depth * 30;
      var py = s.y + pointer.y * s.depth * 22;

      ctx.beginPath();
      ctx.arc(px, py, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + s.rgb + ',' + alpha.toFixed(3) + ')';
      ctx.fill();
    }
  }

  /* ============================================================
     2. 极光光斑：光标视差牵引
     ============================================================ */
  var orbTracks = [];
  var orbConfigs = [
    { id: 'orbTrackA', mx: 48, my: 34 },
    { id: 'orbTrackB', mx: -66, my: -46 },
    { id: 'orbTrackC', mx: 34, my: -54 }
  ];

  for (var oi = 0; oi < orbConfigs.length; oi++) {
    var trackEl = document.getElementById(orbConfigs[oi].id);
    if (trackEl) {
      orbTracks.push({ el: trackEl, mx: orbConfigs[oi].mx, my: orbConfigs[oi].my });
    }
  }

  function updateOrbs() {
    for (var i = 0; i < orbTracks.length; i++) {
      var o = orbTracks[i];
      o.el.style.transform = 'translate3d(' + (pointer.x * o.mx).toFixed(1) + 'px,' + (pointer.y * o.my).toFixed(1) + 'px,0)';
    }
  }

  /* ---------- 主渲染循环 ---------- */
  var rafId = 0;
  var running = false;

  function tick(t) {
    pointer.x += (pointer.tx - pointer.x) * 0.055;
    pointer.y += (pointer.ty - pointer.y) * 0.055;
    drawStars(t);
    updateOrbs();
    rafId = window.requestAnimationFrame(tick);
  }

  function startLoop() {
    if (running || reduceMotion) { return; }
    running = true;
    rafId = window.requestAnimationFrame(tick);
  }

  function stopLoop() {
    if (!running) { return; }
    running = false;
    window.cancelAnimationFrame(rafId);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { stopLoop(); } else { startLoop(); }
  });

  window.addEventListener('resize', resizeCanvas);

  /* ============================================================
     3. 卡片 Spotlight 高光跟随
     ============================================================ */
  function initSpotlight() {
    var cards = document.querySelectorAll('.glass-card');
    Array.prototype.forEach.call(cards, function (card) {
      card.addEventListener('pointermove', function (e) {
        var rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', (e.clientX - rect.left) + 'px');
        card.style.setProperty('--spot-y', (e.clientY - rect.top) + 'px');
      });
    });
  }

  /* ============================================================
     4. 滚动逐块浮现
     ============================================================ */
  function initReveal() {
    var revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) { return; }

    if ('IntersectionObserver' in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      Array.prototype.forEach.call(revealEls, function (el) { io.observe(el); });

      /* IO 首帧回调在部分环境（如 iframe 内）会延迟送达，
         用几何检测兜底，保证首屏不被永久隐藏 */
      var revealInView = function () {
        var vh = window.innerHeight || document.documentElement.clientHeight;
        Array.prototype.forEach.call(revealEls, function (el) {
          if (el.classList.contains('revealed')) return;
          var r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add('revealed');
        });
      };
      window.addEventListener('scroll', revealInView, { passive: true });
      window.addEventListener('resize', revealInView);
      setTimeout(revealInView, 300);
      setTimeout(revealInView, 1200);
      setTimeout(revealInView, 2600);
    } else {
      Array.prototype.forEach.call(revealEls, function (el) { el.classList.add('revealed'); });
    }
  }

  /* ============================================================
     5. 遥测数字滚动（1,000,000 Tokens）
     ============================================================ */
  function initTokenCount() {
    var tokenEl = document.getElementById('tokenCount');
    if (!tokenEl) { return; }

    var target = parseInt(tokenEl.getAttribute('data-target'), 10) || 0;

    if (reduceMotion) {
      tokenEl.textContent = target.toLocaleString('en-US');
      return;
    }

    var started = false;

    function run() {
      if (started) { return; }
      started = true;
      var t0 = null;
      var duration = 1800;

      function step(ts) {
        if (t0 === null) { t0 = ts; }
        var p = Math.min(1, (ts - t0) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        tokenEl.textContent = Math.round(target * eased).toLocaleString('en-US');
        if (p < 1) { window.requestAnimationFrame(step); }
      }

      window.requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run();
            io2.disconnect();
          }
        });
      }, { threshold: 0.4 });
      io2.observe(tokenEl);
    } else {
      run();
    }
  }

  /* ============================================================
     6. 对话体验舱：模拟流式应答
     ============================================================ */
  function initConsole() {
    var chatInput = document.getElementById('chatInput');
    var sendBtn = document.getElementById('sendBtn');
    var chatList = document.getElementById('chatList');
    if (!chatInput || !sendBtn || !chatList) { return; }

    var busy = false;

    var answers = [
      '已接入 Qwen3 混合推理引擎：快思考与慢思考在同一权重中无缝切换。你的问题已映射进 1,000,000 tokens 的上下文星图，答案正沿最短逻辑路径生成。',
      '代码智能体已就位：我可以通读整个仓库、规划修改方案、执行测试并自我修正——从一个函数到一整套工程，一次托付即可。',
      '全模态通道开启：图像、文档、图表与语音已汇入统一语义空间。你给出的每一条线索，都会被认真推理、完整回应。',
      '收到。在紫枢星穹里没有无解之问，只有尚未展开的答案——我已为你列出三条可行路径，最优解置顶。'
    ];

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function addMsg(role, innerHtml) {
      var div = document.createElement('div');
      div.className = 'msg ' + role;
      div.innerHTML = innerHtml;
      chatList.appendChild(div);
      chatList.scrollTop = chatList.scrollHeight;
      return div;
    }

    function addTyping() {
      return addMsg('qwen',
        '<div class="msg-avatar">Q</div>' +
        '<div class="msg-bubble typing"><span class="tdot"></span><span class="tdot"></span><span class="tdot"></span></div>'
      );
    }

    function streamText(bubble, text, done) {
      var i = 0;
      var caret = document.createElement('span');
      caret.className = 'stream-caret';
      bubble.appendChild(caret);

      var timer = window.setInterval(function () {
        i += 1;
        if (i >= text.length) {
          window.clearInterval(timer);
          if (caret.parentNode) { caret.parentNode.removeChild(caret); }
          if (done) { done(); }
          return;
        }
        caret.insertAdjacentText('beforebegin', text.charAt(i));
        chatList.scrollTop = chatList.scrollHeight;
      }, 22);
    }

    function handleSend() {
      if (busy) { return; }
      var text = chatInput.value.trim();
      if (!text) { return; }

      addMsg('user', '<div class="msg-bubble">' + escapeHtml(text) + '</div>');
      chatInput.value = '';
      busy = true;

      var typing = addTyping();

      window.setTimeout(function () {
        if (typing.parentNode) { typing.parentNode.removeChild(typing); }
        var reply = addMsg('qwen', '<div class="msg-avatar">Q</div><div class="msg-bubble"></div>');
        var bubble = reply.querySelector('.msg-bubble');
        var answer = answers[Math.floor(Math.random() * answers.length)];
        streamText(bubble, answer, function () { busy = false; });
      }, 700 + Math.random() * 500);
    }

    sendBtn.addEventListener('click', handleSend);

    chatInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });

    /* 快捷指令 Chips */
    var chips = document.querySelectorAll('.chip');
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        if (busy) { return; }
        chatInput.value = chip.getAttribute('data-prompt') || chip.textContent || '';
        handleSend();
      });
    });
  }

  /* ============================================================
     7. 导航滚动状态 + 锚点平滑跳转
     ============================================================ */
  var navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (!navbar) { return; }
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  function bindAnchor(btnId, selector) {
    var btn = document.getElementById(btnId);
    if (!btn) { return; }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(selector);
      if (target && target.scrollIntoView) {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* ============================================================
     初始化
     ============================================================ */
  resizeCanvas();
  startLoop();
  initSpotlight();
  initReveal();
  initTokenCount();
  initConsole();
  bindAnchor('ctaConverse', '#console');
  bindAnchor('ctaLineage', '#lineage');
  bindAnchor('navConverse', '#console');
})();
