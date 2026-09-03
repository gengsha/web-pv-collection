/* ============================================================
   Preset 08 · Prism Modalis — 通义棱镜 · 多模态分光
   原生 JS（无第三方库）：棱镜光线动画 + 微交互 + 分光台
   ============================================================ */
(function () {
  'use strict';

  /* ---------------- 光谱类型映射 ---------------- */
  var TYPE_META = {
    cjk:       { cls: 'tok-cjk',    color: '#FF5E5B', label: '汉字 · 文本带' },
    latin:     { cls: 'tok-latin',  color: '#7B5CFF', label: '字母 · 代码带' },
    num:       { cls: 'tok-num',    color: '#FFB400', label: '数字 · 数学带' },
    ono:       { cls: 'tok-ono',    color: '#3DDC97', label: '拟声 · 音频带' },
    colorword: { cls: 'tok-color',  color: '#3DA5FF', label: '颜色词 · 视觉带（自身谱色）' },
    punct:     { cls: 'tok-punct',  color: '#9AA1B2', label: '标点 · 结构噪声' },
    space:     { cls: 'tok-space',  color: '#E3E7F0', label: '空白' }
  };
  var LEGEND_ORDER = ['cjk', 'latin', 'num', 'ono', 'colorword', 'punct'];

  /* 颜色词 -> 自身谱色 */
  var COLOR_WORDS = [
    ['彩虹', '#FF6AD5'], ['光谱', '#7B5CFF'],
    ['红色', '#FF5E5B'], ['橙色', '#FF9100'], ['黄色', '#F2B700'],
    ['绿色', '#3DDC97'], ['蓝色', '#3DA5FF'], ['青色', '#22B8CF'],
    ['紫色', '#7B5CFF'], ['粉色', '#FF6AD5'], ['金色', '#D4A017'],
    ['银色', '#8E9AAF'], ['白色', '#98A2B8'], ['黑色', '#10121A'],
    ['红', '#FF5E5B'], ['橙', '#FF9100'], ['黄', '#F2B700'],
    ['绿', '#3DDC97'], ['蓝', '#3DA5FF'], ['青', '#22B8CF'],
    ['紫', '#7B5CFF'], ['粉', '#FF6AD5'], ['金', '#D4A017'],
    ['银', '#8E9AAF'], ['黑', '#10121A']
  ];
  var COLOR_MAP = {};
  COLOR_WORDS.forEach(function (pair) { COLOR_MAP[pair[0]] = pair[1]; });

  /* 拟声词库（按长度降序匹配） */
  var ONO_WORDS = [
    '淅淅沥沥', '噼里啪啦', '滴答滴答', '滴滴答答', '叮铃铃',
    '滴答', '叮咚', '哗哗', '沙沙', '喵喵', '汪汪', '咔哒', '咕噜',
    '轰隆', '淅沥', '叽喳', '嗡嗡', '啦啦', '呼噜', '嘀嗒', '吱吱',
    '咯咯', '咚咚', '啪嗒', '噼啪'
  ].sort(function (a, b) { return b.length - a.length; });

  /* ---------------- 统一切分器（前端模拟） ---------------- */
  function splitCjkRun(run) {
    var out = [];
    var plain = '';
    var i = 0;
    function flushPlain() {
      if (plain) { out.push({ text: plain, type: 'cjk' }); plain = ''; }
    }
    while (i < run.length) {
      var matched = false;
      /* 颜色词：优先双字 */
      for (var len = 2; len >= 1 && !matched; len--) {
        var piece = run.substr(i, len);
        if (COLOR_MAP[piece]) {
          flushPlain();
          out.push({ text: piece, type: 'colorword', color: COLOR_MAP[piece] });
          i += len;
          matched = true;
        }
      }
      if (matched) continue;
      /* 拟声词 */
      for (var j = 0; j < ONO_WORDS.length; j++) {
        var w = ONO_WORDS[j];
        if (run.substr(i, w.length) === w) {
          flushPlain();
          out.push({ text: w, type: 'ono' });
          i += w.length;
          matched = true;
          break;
        }
      }
      if (matched) continue;
      plain += run.charAt(i);
      i += 1;
    }
    flushPlain();
    return out;
  }

  function mergeTail(tokens, ch, type) {
    var last = tokens[tokens.length - 1];
    if (last && last.type === type) { last.text += ch; }
    else { tokens.push({ text: ch, type: type }); }
  }

  function tokenize(str) {
    var tokens = [];
    var run = '';
    function flush() {
      if (run) {
        var parts = splitCjkRun(run);
        for (var i = 0; i < parts.length; i++) tokens.push(parts[i]);
        run = '';
      }
    }
    for (var k = 0; k < str.length; k++) {
      var ch = str.charAt(k);
      if (/[0-9]/.test(ch)) { flush(); mergeTail(tokens, ch, 'num'); }
      else if (/[A-Za-z]/.test(ch)) { flush(); mergeTail(tokens, ch, 'latin'); }
      else if (/[\u4e00-\u9fff]/.test(ch)) { run += ch; }
      else if (/\s/.test(ch)) { flush(); tokens.push({ text: ch, type: 'space' }); }
      else { flush(); tokens.push({ text: ch, type: 'punct' }); }
    }
    flush();
    return tokens;
  }

  function hexToRgba(hex, a) {
    var h = hex.replace('#', '');
    var r = parseInt(h.substring(0, 2), 16);
    var g = parseInt(h.substring(2, 4), 16);
    var b = parseInt(h.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function countBands(tokens) {
    var seen = {};
    var n = 0;
    tokens.forEach(function (t) {
      if (t.type !== 'space' && t.type !== 'punct' && !seen[t.type]) {
        seen[t.type] = true;
        n += 1;
      }
    });
    return n;
  }

  /* ---------------- Token 渲染 ---------------- */
  function clearToks(container) {
    var old = container.querySelectorAll('.tok');
    old.forEach(function (el) { el.parentNode.removeChild(el); });
  }

  function renderTokens(container, tokens) {
    tokens.forEach(function (t, i) {
      var el = document.createElement('span');
      var meta = TYPE_META[t.type] || TYPE_META.punct;
      el.className = 'tok ' + meta.cls;
      el.style.animationDelay = Math.min(i * 45, 2000) + 'ms';
      if (t.type === 'space') {
        el.setAttribute('aria-hidden', 'true');
      } else {
        el.textContent = t.text;
      }
      if (t.type === 'colorword' && t.color) {
        el.style.setProperty('--tc', t.color);
        el.style.color = t.color;
        el.style.background = hexToRgba(t.color, 0.09);
        el.style.borderColor = hexToRgba(t.color, 0.4);
      }
      container.appendChild(el);
    });
  }

  function buildLegend(el) {
    if (!el) return;
    el.innerHTML = '';
    LEGEND_ORDER.forEach(function (key) {
      var meta = TYPE_META[key];
      var item = document.createElement('span');
      item.className = 'legend-item';
      var sw = document.createElement('i');
      sw.className = 'legend-swatch';
      sw.style.background = meta.color;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(meta.label));
      el.appendChild(item);
    });
  }

  /* ---------------- Tokenizer 演示条 ---------------- */
  var DEMO_TEXT = '你好, Qwen! 请把 1024 张蓝色照片, 折成 7 只纸船, 滴答滴答~';
  var tokenLab = document.getElementById('tokenLab');
  var tokenStrip = document.getElementById('tokenStrip');
  var tokenCount = document.getElementById('tokenCount');
  var replayBtn = document.getElementById('replayTokens');
  var scanTimer = null;

  function playTokenizer() {
    if (!tokenStrip) return;
    var tokens = tokenize(DEMO_TEXT);
    clearToks(tokenStrip);
    renderTokens(tokenStrip, tokens);
    var real = tokens.filter(function (t) { return t.type !== 'space'; });
    if (tokenCount) {
      tokenCount.textContent = real.length + ' tokens · ' + countBands(tokens) + ' bands';
    }
    if (tokenLab) {
      tokenLab.classList.remove('is-scanning');
      void tokenLab.offsetWidth; /* 重置扫描线动画 */
      tokenLab.classList.add('is-scanning');
      if (scanTimer) clearTimeout(scanTimer);
      scanTimer = setTimeout(function () { tokenLab.classList.remove('is-scanning'); }, 1700);
    }
  }

  if (replayBtn) replayBtn.addEventListener('click', playTokenizer);
  buildLegend(document.getElementById('tokenLegend'));

  /* ---------------- 分光台（交互体验） ---------------- */
  var DEFAULT_BEAM = '滴答! 42 只蓝色纸船, 排成 Qwen 的形状~';
  var benchInput = document.getElementById('benchInput');
  var benchRun = document.getElementById('benchRun');
  var beamOutput = document.getElementById('beamOutput');
  var benchReadout = document.getElementById('benchReadout');

  function runBench(rawText) {
    if (!beamOutput) return;
    var src = (rawText || '').trim();
    if (!src) src = DEFAULT_BEAM;
    var tokens = tokenize(src);
    beamOutput.innerHTML = '';
    renderTokens(beamOutput, tokens);
    var real = tokens.filter(function (t) { return t.type !== 'space'; });
    if (benchReadout) {
      benchReadout.textContent = 'beam: active · ' + real.length + ' tokens refracted · ' +
        countBands(tokens) + ' bands lit';
    }
  }

  if (benchRun) {
    benchRun.addEventListener('click', function () {
      runBench(benchInput ? benchInput.value : '');
    });
  }
  if (benchInput) {
    benchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runBench(benchInput.value);
    });
  }
  document.querySelectorAll('.sample-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      if (benchInput) benchInput.value = chip.textContent;
      runBench(chip.textContent);
    });
  });

  /* ---------------- 光谱能力区：点按展开 ---------------- */
  document.querySelectorAll('.band-card').forEach(function (card) {
    var head = card.querySelector('.band-head');
    if (!head) return;
    head.addEventListener('click', function () {
      var open = card.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ---------------- 卡片 3D 微倾斜 + 全息背景偏移 ---------------- */
  document.querySelectorAll('.tilt-card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var rx = (0.5 - py) * 5;
      var ry = (px - 0.5) * 6;
      card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) +
        'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
      card.style.setProperty('--hx', (px * 100).toFixed(1) + '%');
      card.style.setProperty('--hy', (py * 100).toFixed(1) + '%');
    });
    card.addEventListener('pointerleave', function () {
      card.style.transform = '';
    });
  });

  /* ---------------- 棱镜视差：光谱带随光标轻摆 ---------------- */
  var prismStage = document.getElementById('prismStage');
  var bandGroup = document.getElementById('bandGroup');
  if (prismStage && bandGroup) {
    prismStage.addEventListener('pointermove', function (e) {
      var r = prismStage.getBoundingClientRect();
      var dx = (e.clientX - r.left) / r.width - 0.5;
      bandGroup.style.transform = 'rotate(' + (dx * 2.2).toFixed(2) + 'deg)';
    });
    prismStage.addEventListener('pointerleave', function () {
      bandGroup.style.transform = '';
    });
  }

  /* ---------------- 导航滚动高亮 ---------------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = ['spectrum', 'tokenizer', 'bench']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var on = link.getAttribute('href') === '#' + entry.target.id;
          link.classList.toggle('active', on);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(function (sec) { spy.observe(sec); });
  }

  /* ---------------- CTA：直达分光台 ---------------- */
  function gotoBench() {
    var bench = document.getElementById('bench');
    if (!bench) return;
    bench.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (benchInput) {
      setTimeout(function () { benchInput.focus({ preventScroll: true }); }, 650);
    }
  }
  var navCta = document.getElementById('navCta');
  var ctaRefract = document.getElementById('ctaRefract');
  if (navCta) navCta.addEventListener('click', gotoBench);
  if (ctaRefract) ctaRefract.addEventListener('click', gotoBench);

  /* ---------------- 初始化 ---------------- */
  setTimeout(playTokenizer, 380);
})();
