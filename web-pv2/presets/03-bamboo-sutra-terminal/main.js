/* ═══════════════════════════════════════════════════════════════
   Preset 03 · 竹简代码经 —— 亿万卷典籍终端 (Bamboo Sutra Terminal)
   原生 JS（IIFE）：打字机典籍流 · 逐字注经 · 数字滚动 · 横向卷轴 · 奏对控制台
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ═══════════ 1. 入场显现：卷轴展开 + 渐显 ═══════════ */

  var slipSlots = $$('.slip-slot');
  slipSlots.forEach(function (slot, i) {
    slot.style.animationDelay = (i * 90) + 'ms';
  });

  var revealTargets = $$('.reveal').concat(slipSlots);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.16 });
    revealTargets.forEach(function (el) { io.observe(el); });

    /* IO 首帧回调在部分环境（如 iframe 内）会延迟送达，
       用几何检测兜底，保证首屏不被永久隐藏 */
    var revealInView = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revealTargets.forEach(function (el) {
        if (el.classList.contains('in-view')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.94 && r.bottom > -40) el.classList.add('in-view');
      });
    };
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('resize', revealInView);
    setTimeout(revealInView, 300);
    setTimeout(revealInView, 1200);
    setTimeout(revealInView, 2600);
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ═══════════ 2. 注经终端：典籍 / token 交替打字机流 ═══════════ */

  var streamEl = $('#sutraStream');

  if (streamEl) {
    var script = [
      { t: 'sys',   s: '〔展卷〕《道德经》· 第一章 ▸ 载入 81 字 / 214 tokens' },
      { t: 'sutra', s: '道可道，非常道；' },
      { t: 'note',  s: '├─ token 道 ▸ 哲学概念 · 本体     conf 0.987' },
      { t: 'note',  s: '└─ token 常道 ▸ 名词短语 · 恒常   conf 0.952' },
      { t: 'sutra', s: '名可名，非常名。' },
      { t: 'note',  s: '└─ attention ▸ 名 ↔ 道 互注权重 0.916' },
      { t: 'sys',   s: '〔校勘〕第一章语义图 已构建 ▸ 节点 3 · 边 2 · 讹误 0' },
      { t: 'code',  s: '>>> qwen.embed("無名，天地之始")' },
      { t: 'code',  s: 'tensor([ 0.418, -0.733, 1.205, ... ])  shape=(1, 4096)' },
      { t: 'sys',   s: '〔转卷〕《论语 · 为政》 ▸ 右侧简牍 正在注经' },
      { t: 'sutra', s: '学而不思则罔，思而不学则殆。' },
      { t: 'note',  s: '├─ parse ▸ 条件式: [学 ∧ ¬思] → 罔' },
      { t: 'note',  s: '└─ verdict ▸ 劝学 · 学思须并进' },
      { t: 'code',  s: 'while (qwen.online) { read(万卷); answer(千问); }' },
      { t: 'sys',   s: '〔校毕〕此卷已注 ▸ 编联入典籍库' }
    ];

    var lineIdx = 0;
    var charIdx = 0;
    var curLine = null;

    function trimLines() {
      while (streamEl.children.length > 60) {
        streamEl.removeChild(streamEl.firstChild);
      }
    }

    function stepStream() {
      var scrollBox = streamEl.parentElement;

      if (lineIdx >= script.length) {
        lineIdx = 0;
        charIdx = 0;
        curLine = null;
        setTimeout(function () {
          streamEl.textContent = '';
          stepStream();
        }, 2600);
        return;
      }

      if (!curLine) {
        curLine = document.createElement('div');
        curLine.className = 'stream-line line-' + script[lineIdx].t;
        streamEl.appendChild(curLine);
      }

      var entry = script[lineIdx];

      if (charIdx < entry.s.length) {
        curLine.textContent += entry.s.charAt(charIdx);
        charIdx += 1;
        if (scrollBox) { scrollBox.scrollTop = scrollBox.scrollHeight; }
        setTimeout(stepStream, entry.t === 'sutra' ? 85 : 30);
      } else {
        lineIdx += 1;
        charIdx = 0;
        curLine = null;
        trimLines();
        if (scrollBox) { scrollBox.scrollTop = scrollBox.scrollHeight; }
        setTimeout(stepStream, 420);
      }
    }

    stepStream();
  }

  /* ═══════════ 3. 论语逐字点亮 + 注疏引擎输出 ═══════════ */

  var tokenLine = $('#tokenLine');
  var exegesisText = $('#exegesisText');

  if (tokenLine && exegesisText) {
    var toks = $$('.tok', tokenLine);
    var exegesis =
      '〔注疏输出〕\n' +
      '结构 ▸ [学 ∧ ¬思] → 罔\n' +
      '语义 ▸ 求学而不深思，则愈学而愈惑\n' +
      '训诂 ▸ "罔"，通"誷"，受欺而迷惘也\n' +
      '对句 ▸ "思而不学则殆" —— 对文互证，学思并进\n' +
      '判定 ▸ 劝学之辞 ▸ conf 0.993';

    var tIdx = 0;
    var cIdx = 0;
    var phase = 'tokens';

    function resetExegesis() {
      tIdx = 0;
      cIdx = 0;
      phase = 'tokens';
      toks.forEach(function (t) { t.classList.remove('lit'); });
      exegesisText.textContent = '';
    }

    function stepExegesis() {
      if (phase === 'tokens') {
        if (tIdx < toks.length) {
          toks[tIdx].classList.add('lit');
          tIdx += 1;
          setTimeout(stepExegesis, 430);
        } else {
          phase = 'type';
          setTimeout(stepExegesis, 520);
        }
      } else if (phase === 'type') {
        if (cIdx < exegesis.length) {
          cIdx += 1;
          exegesisText.textContent = exegesis.slice(0, cIdx);
          setTimeout(stepExegesis, 34);
        } else {
          phase = 'hold';
          setTimeout(function () {
            resetExegesis();
            setTimeout(stepExegesis, 700);
          }, 4600);
        }
      }
    }

    setTimeout(stepExegesis, 900);
  }

  /* ═══════════ 4. 典籍库统计：数字滚动 + 进度条 ═══════════ */

  function animateCount(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var dur = 1700;
    var start = null;

    function fmt(n) { return Math.round(n).toLocaleString('en-US'); }

    function frame(ts) {
      if (start === null) { start = ts; }
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = fmt(target);
      }
    }

    requestAnimationFrame(frame);
  }

  var statCards = $$('.stat-card');

  function runCardCounters(card) {
    $$('.counter', card).forEach(function (c) {
      if (!c.getAttribute('data-done')) {
        c.setAttribute('data-done', '1');
        animateCount(c);
      }
    });
  }

  if (statCards.length) {
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            runCardCounters(en.target);
            cio.unobserve(en.target);
          }
        });
      }, { threshold: 0.3 });
      statCards.forEach(function (c) { cio.observe(c); });
    } else {
      statCards.forEach(runCardCounters);
    }
  }

  /* ═══════════ 5. 万卷横轴：滚轮换向 + 拖拽展卷 ═══════════ */

  var shelf = $('#shelfViewport');

  if (shelf) {
    shelf.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        shelf.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    var dragging = false;
    var startX = 0;
    var startLeft = 0;

    shelf.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') { return; }
      dragging = true;
      startX = e.clientX;
      startLeft = shelf.scrollLeft;
      shelf.classList.add('dragging');
      if (shelf.setPointerCapture) {
        try { shelf.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
      }
    });

    window.addEventListener('pointermove', function (e) {
      if (!dragging) { return; }
      shelf.scrollLeft = startLeft - (e.clientX - startX);
    });

    function endDrag() {
      if (!dragging) { return; }
      dragging = false;
      shelf.classList.remove('dragging');
    }

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

  /* ═══════════ 6. 问策控制台：奏对模拟 ═══════════ */

  var courtLog = $('#courtLog');
  var courtInput = $('#courtInput');
  var courtSend = $('#courtSend');
  var courtBusy = false;

  var RULES = [
    {
      keys: ['道', '本源', '本体', '万物'],
      reply: '千问对曰：道者，物之所由，理之所然。吾检典籍三千七百卷，见"道"字凡七千四百余处，其义有三：本体之道、践行之道、言说之道。道可道，非常道——若欲穷其一义，可再奏问。'
    },
    {
      keys: ['诗', '词', '赋', '吟', '韵'],
      reply: '千问对曰：谨受命。试取一联："简上秋风楚辞在，码中犹带汉时霜。万卷同轴今朝读，一答千问共流光。"已按平水韵校律；若欲换韵、加长或另拟题意，但说无妨。'
    },
    {
      keys: ['代码', '程序', '调试', 'bug', 'Bug', 'BUG', '错', '报错'],
      reply: '千问对曰：已阅卷毕。其可疑者有二：一者循环相套，其复杂度成平方而增；二者边界未守，恐生越界之患。改以二分，加之断言，则病根可除。若呈全码，当为君逐行作注。'
    },
    {
      keys: ['学', '读', '思', '方法', '问', '治'],
      reply: '千问对曰：为学之方，其要有三：一曰博学——读万卷以立其基；二曰审问——问千问以明其疑；三曰慎思——学而不思则罔。三者缺一，则学不成矣。'
    }
  ];

  var FALLBACKS = [
    '千问对曰：问已入阁。吾检索典籍三巡，遍查经史，参以子集——君之所问，约可一言以蔽：见微不若见著，鉴古可以知今。若欲穷其详，请再奏。',
    '千问对曰：谨受教。遍检典籍库，与此问相关者，凡三卷七注。已撮其要，并附原文出处。闻道者解惑，抱朴者寡事——愿有所裨益。',
    '千问对曰：此问已勘。古有是言，今有是证：简牍有其源，代码有其构，语料有其数。三者并陈，编为一答，已录于典籍库；若意有未尽，欢迎再问。'
  ];

  function pickReply(text) {
    for (var i = 0; i < RULES.length; i += 1) {
      for (var k = 0; k < RULES[i].keys.length; k += 1) {
        if (text.indexOf(RULES[i].keys[k]) !== -1) {
          return RULES[i].reply;
        }
      }
    }
    return FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  }

  function addLine(cls, prefix) {
    var line = document.createElement('div');
    line.className = 'c-line ' + cls;

    var mark = document.createElement('span');
    mark.className = 'c-mark';
    mark.textContent = prefix;
    line.appendChild(mark);

    var body = document.createElement('span');
    body.className = 'c-text';
    line.appendChild(body);

    courtLog.appendChild(line);
    courtLog.scrollTop = courtLog.scrollHeight;
    return body;
  }

  function typeInto(el, text, speed, done) {
    var i = 0;
    function tick() {
      i += 1;
      el.textContent = text.slice(0, i);
      courtLog.scrollTop = courtLog.scrollHeight;
      if (i < text.length) {
        setTimeout(tick, speed);
      } else if (done) {
        setTimeout(done, 140);
      }
    }
    tick();
  }

  function handleAsk(preset) {
    if (courtBusy || !courtLog) { return; }

    var text = (preset !== undefined ? preset : (courtInput ? courtInput.value : '')).trim();
    if (!text) { return; }

    if (courtInput) { courtInput.value = ''; }
    courtBusy = true;

    var qBody = addLine('q', '〔问〕');
    qBody.textContent = text;

    var thinkBody = addLine('sys', '〔思〕');
    typeInto(thinkBody, '检索典籍库 ▸ 编联竹简 ▸ 匹配注疏...', 26, function () {
      var reply = pickReply(text);
      var aBody = addLine('a', '千问对曰：');
      typeInto(aBody, reply, 40, function () {
        var metaBody = addLine('sys', '〔校〕');
        metaBody.textContent = '此番奏对 用 token ' + (120 + Math.floor(Math.random() * 90)) +
          ' · 检卷 ' + (8 + Math.floor(Math.random() * 18)) +
          ' 卷 · 迟 ' + (180 + Math.floor(Math.random() * 120)) + 'ms';
        courtBusy = false;
        if (courtInput) { courtInput.focus(); }
      });
    });
  }

  if (courtLog && courtInput && courtSend) {
    courtSend.addEventListener('click', function () { handleAsk(); });

    courtInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAsk();
      }
    });

    $$('.chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        handleAsk(chip.textContent);
      });
    });
  }

  /* ═══════════ 7. 导航「入内奏对」 ═══════════ */

  var navCourtBtn = $('#navCourtBtn');
  if (navCourtBtn) {
    navCourtBtn.addEventListener('click', function () {
      var court = $('#court');
      if (court) { court.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      if (courtInput) {
        setTimeout(function () { courtInput.focus({ preventScroll: true }); }, 650);
      }
    });
  }
})();
