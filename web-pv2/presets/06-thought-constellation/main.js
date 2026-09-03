/* ============================================================
   Preset 06 · Thought Constellation —— 思纬星图 · 推理星座
   原生 JS（无第三方库）：
   1) 全屏深空画布：星点闪烁 / 偶发流星 / 光标点亮
   2) 推理星座引擎：节点逐颗点亮 → 连线逐段生长 → 顿悟金色爆亮
   3) 思维碎片侧栏联动 / 星等亮度条 / 交互拆解台
   ============================================================ */
(() => {
  'use strict';

  /* ---------- 工具 ---------- */
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (a, b) => a + Math.random() * (b - a);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const TAU = Math.PI * 2;

  const C = {
    star: '207, 246, 255', // #CFF6FF
    cyan: '56, 189, 248',  // #38BDF8
    teal: '79, 209, 197',  // #4FD1C5
    gold: '245, 200, 110'  // #F5C86E
  };

  const $ = (id) => document.getElementById(id);

  /* 赤经/赤纬式坐标字符串（由归一化坐标伪生成） */
  function coordString(nx, ny) {
    const hours = clamp(nx, 0, 1) * 24;
    const hh = Math.floor(hours);
    const mm = Math.floor((hours - hh) * 60);
    const dec = 22 + (0.5 - clamp(ny, 0, 1)) * 44;
    const sign = dec >= 0 ? '+' : '-';
    const deg = Math.floor(Math.abs(dec));
    const arc = Math.floor((Math.abs(dec) - deg) * 60);
    const p2 = (n) => (n < 10 ? '0' + n : '' + n);
    return 'RA ' + p2(hh) + 'h' + p2(mm) + 'm · DEC ' + sign + p2(deg) + '°' + p2(arc) + '′';
  }

  /* ============================================================
     1. 全屏深空背景画布
     ============================================================ */
  const sky = $('skyCanvas');
  if (sky) {
    const sctx = sky.getContext('2d');
    let sw = 0, sh = 0;
    let stars = [];
    let links = [];
    let meteors = [];
    let nextMeteorAt = 0;
    const smouse = { x: -1e4, y: -1e4 };

    function buildSky() {
      sw = window.innerWidth;
      sh = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sky.width = Math.round(sw * dpr);
      sky.height = Math.round(sh * dpr);
      sctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = clamp(Math.round((sw * sh) / 9000), 90, 240);
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * sw,
          y: Math.random() * sh,
          r: rand(0.4, 1.7),
          base: rand(0.22, 0.8),
          speed: rand(0.4, 1.6),
          phase: rand(0, TAU),
          gold: Math.random() < 0.06,
          boost: 0
        });
      }

      /* 稀疏的环境星座连线 */
      links = [];
      for (let i = 0; i < stars.length && links.length < 9; i++) {
        const a = stars[i];
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 40 && d < 130 && Math.random() < 0.08) {
            links.push([i, j]);
            break;
          }
        }
      }
    }

    function spawnMeteor(now) {
      const fromLeft = Math.random() < 0.5;
      meteors.push({
        x: fromLeft ? rand(-40, sw * 0.3) : rand(sw * 0.55, sw + 40),
        y: rand(-30, sh * 0.35),
        vx: (fromLeft ? 1 : -1) * rand(7, 11),
        vy: rand(3.5, 5.5),
        life: 0,
        maxLife: rand(700, 1100),
        len: rand(90, 160)
      });
      nextMeteorAt = now + rand(4000, 9000);
    }

    let skyLast = performance.now();
    function drawSky(now) {
      const dt = clamp(now - skyLast, 0, 50);
      skyLast = now;
      sctx.clearRect(0, 0, sw, sh);

      /* 星点：正弦闪烁 + 光标点亮 */
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const tw = 0.55 + 0.45 * Math.sin(now * 0.001 * s.speed + s.phase);
        const dist = Math.hypot(s.x - smouse.x, s.y - smouse.y);
        const target = dist < 130 ? 1 - dist / 130 : 0;
        s.boost += (target - s.boost) * 0.12;

        const alpha = clamp(s.base * tw + s.boost * 0.9, 0, 1);
        const r = s.r + s.boost * 1.6;
        const col = s.gold ? C.gold : C.star;

        if (s.boost > 0.05) {
          sctx.beginPath();
          sctx.arc(s.x, s.y, r + 3.5, 0, TAU);
          sctx.fillStyle = 'rgba(' + col + ',' + (0.12 * s.boost).toFixed(3) + ')';
          sctx.fill();
        }
        sctx.beginPath();
        sctx.arc(s.x, s.y, r, 0, TAU);
        sctx.fillStyle = 'rgba(' + col + ',' + alpha.toFixed(3) + ')';
        sctx.fill();
      }

      /* 环境星座连线：靠近时被微微点亮 */
      sctx.lineWidth = 1;
      for (let k = 0; k < links.length; k++) {
        const a = stars[links[k][0]];
        const b = stars[links[k][1]];
        const glow = (a.boost + b.boost) * 0.5;
        sctx.strokeStyle = 'rgba(' + C.cyan + ',' + (0.05 + glow * 0.35).toFixed(3) + ')';
        sctx.beginPath();
        sctx.moveTo(a.x, a.y);
        sctx.lineTo(b.x, b.y);
        sctx.stroke();
      }

      /* 流星：偶发，渐隐尾迹 */
      if (now >= nextMeteorAt && meteors.length < 2) spawnMeteor(now);
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.life += dt;
        m.x += m.vx * (dt / 16.7);
        m.y += m.vy * (dt / 16.7);
        const lifeK = clamp(m.life / m.maxLife, 0, 1);
        if (lifeK >= 1 || m.x < -220 || m.x > sw + 220 || m.y > sh + 220) {
          meteors.splice(i, 1);
          continue;
        }
        const fade = Math.sin(Math.PI * lifeK);
        const tailX = m.x - m.vx * m.len * 0.1;
        const tailY = m.y - m.vy * m.len * 0.1;
        const grad = sctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, 'rgba(' + C.star + ',' + (0.9 * fade).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(' + C.cyan + ',0)');
        sctx.strokeStyle = grad;
        sctx.lineWidth = 1.4;
        sctx.beginPath();
        sctx.moveTo(m.x, m.y);
        sctx.lineTo(tailX, tailY);
        sctx.stroke();

        sctx.beginPath();
        sctx.arc(m.x, m.y, 1.6, 0, TAU);
        sctx.fillStyle = 'rgba(255,255,255,' + (0.9 * fade).toFixed(3) + ')';
        sctx.fill();
      }

      requestAnimationFrame(drawSky);
    }

    window.addEventListener('resize', buildSky);
    window.addEventListener('mousemove', (e) => {
      smouse.x = e.clientX;
      smouse.y = e.clientY;
    });
    document.documentElement.addEventListener('mouseleave', () => {
      smouse.x = -1e4;
      smouse.y = -1e4;
    });

    buildSky();
    nextMeteorAt = performance.now() + 2200;
    requestAnimationFrame(drawSky);
  }

  /* ============================================================
     2. 推理星座引擎（核心）
     ============================================================ */
  const chartCanvas = $('chartCanvas');
  const viewport = $('chartViewport');

  if (chartCanvas && viewport) {
    const ctx = chartCanvas.getContext('2d');
    const stepList = $('stepList');
    const stepEls = stepList ? Array.prototype.slice.call(stepList.querySelectorAll('.step-item')) : [];
    const statusEl = $('chartStatus');
    const cursorEl = $('chartCursor');
    const runBtn = $('runBtn');
    const resetBtn = $('resetBtn');

    /* 星座节点（归一化坐标）：审题→设元→列式→验算→作答→顿悟 */
    const NODES = [
      { x: 0.09, y: 0.72, label: '审题' },
      { x: 0.27, y: 0.34, label: '设元' },
      { x: 0.46, y: 0.62, label: '列式' },
      { x: 0.64, y: 0.28, label: '验算' },
      { x: 0.79, y: 0.58, label: '作答' },
      { x: 0.91, y: 0.24, label: '顿悟', gold: true }
    ];
    NODES.forEach((n) => { n.boost = 0; });

    /* 相邻节点的弧线控制点（二次贝塞尔，交替弯向） */
    const EDGES = [];
    for (let i = 0; i < NODES.length - 1; i++) {
      const a = NODES[i], b = NODES[i + 1];
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1;
      const off = d * 0.16 * (i % 2 === 0 ? -1 : 1);
      EDGES.push({ cx: mx + (-dy / d) * off, cy: my + (dx / d) * off });
    }

    /* 时间轴（毫秒） */
    const NODE_START = 420;   // 首颗节点点亮
    const NODE_GAP = 1080;    // 节点间隔
    const EDGE_DELAY = 240;   // 节点点亮后连线开始生长
    const EDGE_DUR = 720;     // 单段连线生长时长
    const REVEAL_DELAY = 160; // 文本浮现相对节点的滞后
    const RING_DUR = 950;     // 扩散光环时长
    const DONE_AFTER = 1750;  // 末节点后收束

    const nodeTime = (i) => NODE_START + i * NODE_GAP;
    const FINAL_T = nodeTime(NODES.length - 1);

    let cw = 0, ch = 0;
    let dust = [];
    let state = 'idle'; // idle | running | done
    let startTime = 0;
    let revealed = [];
    let particles = [];
    let burstDone = false;
    let lastChart = performance.now();
    const mouse = { x: -1e4, y: -1e4, inside: false };

    function setStatus(text, cls) {
      if (!statusEl) return;
      statusEl.textContent = text;
      statusEl.className = 'chart-status ' + cls;
    }

    function buildDust() {
      const count = clamp(Math.round((cw * ch) / 16000), 14, 34);
      dust = [];
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * cw,
          y: Math.random() * ch,
          r: rand(0.4, 1.2),
          base: rand(0.12, 0.4),
          speed: rand(0.5, 1.4),
          phase: rand(0, TAU),
          boost: 0
        });
      }
    }

    function sizeChart() {
      const rect = viewport.getBoundingClientRect();
      cw = Math.max(10, Math.round(rect.width));
      ch = Math.max(10, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      chartCanvas.width = Math.round(cw * dpr);
      chartCanvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDust();
    }

    const px = (n) => n.x * cw;
    const py = (n) => n.y * ch;

    function qPoint(a, c, b, t) {
      const it = 1 - t;
      return {
        x: it * it * a.x + 2 * it * t * c.cx + t * t * b.x,
        y: it * it * a.y + 2 * it * t * c.cy + t * t * b.y
      };
    }

    /* --- 装饰层：刻度与十字 --- */
    function drawTicks() {
      ctx.lineWidth = 1;
      let k = 0;
      for (let x = 28; x < cw - 10; x += 28, k++) {
        const major = k % 4 === 0;
        ctx.strokeStyle = 'rgba(' + C.star + ',' + (major ? 0.2 : 0.09) + ')';
        ctx.beginPath();
        ctx.moveTo(x, ch);
        ctx.lineTo(x, ch - (major ? 9 : 5));
        ctx.stroke();
      }
      k = 0;
      for (let y = 28; y < ch - 10; y += 28, k++) {
        const major = k % 4 === 0;
        ctx.strokeStyle = 'rgba(' + C.star + ',' + (major ? 0.2 : 0.09) + ')';
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(major ? 9 : 5, y);
        ctx.stroke();
      }
    }

    function drawCornerCrosses() {
      const pts = [[16, 16], [cw - 16, 16], [16, ch - 16], [cw - 16, ch - 16]];
      ctx.strokeStyle = 'rgba(' + C.star + ',0.22)';
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const x = pts[i][0], y = pts[i][1];
        ctx.beginPath();
        ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y);
        ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6);
        ctx.stroke();
      }
    }

    function drawDust(now) {
      for (let i = 0; i < dust.length; i++) {
        const s = dust[i];
        const tw = 0.55 + 0.45 * Math.sin(now * 0.001 * s.speed + s.phase);
        const dist = Math.hypot(s.x - mouse.x, s.y - mouse.y);
        const target = mouse.inside && dist < 110 ? 1 - dist / 110 : 0;
        s.boost += (target - s.boost) * 0.12;
        const alpha = clamp(s.base * tw + s.boost * 0.85, 0, 1);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + s.boost * 1.2, 0, TAU);
        ctx.fillStyle = 'rgba(' + C.star + ',' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }

    /* --- 连线：幽灵虚线 → 逐段生长 → 稳定微光 --- */
    function drawEdge(i, t, now) {
      const a = NODES[i], b = NODES[i + 1], c = EDGES[i];
      const col = i % 2 === 0 ? C.cyan : C.teal;
      const growStart = nodeTime(i) + EDGE_DELAY;
      const p = t >= 0 ? clamp((t - growStart) / EDGE_DUR, 0, 1) : 0;

      /* 幽灵态：尚未生长到的段落以极淡虚线示意潜在路径 */
      if (p < 1) {
        ctx.setLineDash([2, 6]);
        ctx.strokeStyle = 'rgba(' + C.star + ',0.07)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const steps = 24;
        for (let s = 0; s <= steps; s++) {
          const q = qPoint(a, c, b, s / steps);
          if (s === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      if (p <= 0) return;

      const steps = 26;
      const limit = Math.max(1, Math.round(steps * easeOutCubic(p)));
      const pts = [];
      for (let s = 0; s <= limit; s++) {
        pts.push(qPoint(a, c, b, s / steps));
      }

      const settled = p >= 1;
      const shimmer = settled ? 0.55 + 0.15 * Math.sin(now * 0.001 + i * 1.3) : 0.75;

      /* 底部柔光 */
      ctx.strokeStyle = 'rgba(' + col + ',' + (0.1 * (settled ? 0.8 : 1)).toFixed(3) + ')';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s].x, pts[s].y);
      ctx.stroke();

      /* 主线 */
      ctx.strokeStyle = 'rgba(' + col + ',' + shimmer.toFixed(3) + ')';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let s = 1; s < pts.length; s++) ctx.lineTo(pts[s].x, pts[s].y);
      ctx.stroke();

      /* 生长端点亮斑 */
      if (!settled) {
        const head = pts[pts.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 5, 0, TAU);
        ctx.fillStyle = 'rgba(' + C.star + ',0.16)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2, 0, TAU);
        ctx.fillStyle = 'rgba(' + C.star + ',0.95)';
        ctx.fill();
      }
    }

    /* --- 节点：幽灵脉动 → 点亮绽放 → 稳定辉光 --- */
    function drawNode(i, t, now) {
      const n = NODES[i];
      const x = px(n), y = py(n);
      const nt = nodeTime(i);
      const act = t >= 0 ? clamp((t - nt) / 480, 0, 1) : 0;
      const ringT = t >= 0 ? clamp((t - nt) / RING_DUR, 0, 1) : 0;
      const gold = !!n.gold;
      const col = gold ? C.gold : C.star;
      const glowCol = gold ? C.gold : C.cyan;

      /* 光标靠近的微放大 */
      const dist = Math.hypot(x - mouse.x, y - mouse.y);
      const target = mouse.inside && dist < 110 ? 1 - dist / 110 : 0;
      n.boost += (target - n.boost) * 0.14;

      ctx.font = '500 8px "JetBrains Mono", monospace';
      ctx.textBaseline = 'middle';

      if (act <= 0) {
        /* 幽灵星：细描边 + 呼吸脉动 */
        const pulse = 0.12 + 0.06 * Math.sin(now * 0.0016 + i * 1.7);
        ctx.beginPath();
        ctx.arc(x, y, 4 + n.boost * 2, 0, TAU);
        ctx.strokeStyle = 'rgba(' + C.star + ',' + (pulse + n.boost * 0.3).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, TAU);
        ctx.fillStyle = 'rgba(' + C.star + ',' + (pulse + 0.08).toFixed(3) + ')';
        ctx.fill();
        ctx.fillStyle = 'rgba(' + C.star + ',' + (0.22 + 0.08 * Math.sin(now * 0.0016 + i)).toFixed(3) + ')';
        ctx.fillText(n.label + ' · ' + coordString(n.x, n.y).split(' · ')[0], x + 9, y - 10);
        return;
      }

      const ease = easeOutCubic(act);

      /* 扩散光环 */
      if (ringT > 0 && ringT < 1) {
        const rr = 6 + (gold ? 44 : 30) * easeOutCubic(ringT);
        ctx.beginPath();
        ctx.arc(x, y, rr, 0, TAU);
        ctx.strokeStyle = 'rgba(' + glowCol + ',' + ((1 - ringT) * (gold ? 0.5 : 0.42)).toFixed(3) + ')';
        ctx.lineWidth = gold ? 1.4 : 1;
        ctx.stroke();
      }

      /* 外辉光 */
      const R = (gold ? 26 : 17) * ease + n.boost * 7;
      if (R > 1) {
        const grad = ctx.createRadialGradient(x, y, 0, x, y, R);
        grad.addColorStop(0, 'rgba(' + glowCol + ',' + (0.34 * ease + n.boost * 0.2).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(' + glowCol + ',0)');
        ctx.beginPath();
        ctx.arc(x, y, R, 0, TAU);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      /* 星核 */
      ctx.beginPath();
      ctx.arc(x, y, (gold ? 3.4 : 2.6) * ease + 1 + n.boost * 1.3, 0, TAU);
      ctx.fillStyle = 'rgba(' + col + ',' + (0.35 + 0.65 * ease).toFixed(3) + ')';
      ctx.fill();

      /* 顿悟节点的十字星芒 */
      if (gold && burstDone) {
        const flare = 15 + 3 * Math.sin(now * 0.0022);
        ctx.strokeStyle = 'rgba(' + C.gold + ',0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - flare, y); ctx.lineTo(x + flare, y);
        ctx.moveTo(x, y - flare); ctx.lineTo(x, y + flare);
        ctx.stroke();
        ctx.strokeStyle = 'rgba(' + C.gold + ',0.22)';
        ctx.beginPath();
        ctx.moveTo(x - flare * 0.5, y - flare * 0.5); ctx.lineTo(x + flare * 0.5, y + flare * 0.5);
        ctx.moveTo(x + flare * 0.5, y - flare * 0.5); ctx.lineTo(x - flare * 0.5, y + flare * 0.5);
        ctx.stroke();
      }

      /* 坐标标注 */
      ctx.fillStyle = 'rgba(' + (gold ? C.gold : C.star) + ',' + (0.3 + 0.55 * ease).toFixed(3) + ')';
      ctx.fillText(n.label + ' · ' + coordString(n.x, n.y).split(' · ')[0], x + 9, y - 10);
    }

    /* --- 顿悟爆亮粒子 --- */
    function spawnBurst() {
      const n = NODES[NODES.length - 1];
      const x = px(n), y = py(n);
      for (let i = 0; i < 26; i++) {
        const ang = rand(0, TAU);
        const sp = rand(0.7, 3.1);
        particles.push({
          x, y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          life: 0,
          max: rand(750, 1500),
          r: rand(0.8, 2.2)
        });
      }
    }

    function drawParticles(dt) {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.max) { particles.splice(i, 1); continue; }
        p.x += p.vx * (dt / 16.7);
        p.y += p.vy * (dt / 16.7);
        p.vx *= 0.985;
        p.vy *= 0.985;
        const k = 1 - p.life / p.max;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * k + 0.3, 0, TAU);
        ctx.fillStyle = 'rgba(' + C.gold + ',' + (0.85 * k).toFixed(3) + ')';
        ctx.fill();
      }
    }

    /* --- 主循环 --- */
    function drawChart(now) {
      const dt = clamp(now - lastChart, 0, 50);
      lastChart = now;
      ctx.clearRect(0, 0, cw, ch);

      drawTicks();
      drawCornerCrosses();
      drawDust(now);

      const t = state === 'idle' ? -1 : now - startTime;

      for (let i = 0; i < EDGES.length; i++) drawEdge(i, t, now);
      for (let i = 0; i < NODES.length; i++) drawNode(i, t, now);
      drawParticles(dt);

      /* 文本联动：节点点亮 → 侧栏浮现 */
      if (t >= 0) {
        for (let i = 0; i < NODES.length; i++) {
          if (!revealed[i] && t >= nodeTime(i) + REVEAL_DELAY) {
            revealed[i] = true;
            if (stepEls[i]) stepEls[i].classList.add('revealed');
          }
        }
        /* 末节点：触发顿悟爆亮 */
        if (!burstDone && t >= FINAL_T) {
          burstDone = true;
          spawnBurst();
        }
        /* 收束：进入 done 态 */
        if (state === 'running' && t >= FINAL_T + DONE_AFTER) {
          state = 'done';
          setStatus('LOCKED · 星座闭合', 'status-done');
        }
      }

      requestAnimationFrame(drawChart);
    }

    /* --- 控制 --- */
    function resetDemo(silent) {
      state = 'idle';
      revealed = NODES.map(() => false);
      particles = [];
      burstDone = false;
      for (let i = 0; i < stepEls.length; i++) stepEls[i].classList.remove('revealed');
      if (!silent) setStatus('STANDBY · 待机', 'status-idle');
    }

    function startRun() {
      resetDemo(true);
      state = 'running';
      startTime = performance.now();
      setStatus('TRACKING · 链路生长', 'status-run');
    }

    if (runBtn) runBtn.addEventListener('click', startRun);
    if (resetBtn) resetBtn.addEventListener('click', () => resetDemo(false));

    /* 视口内光标：坐标读数 + 星点感应 */
    viewport.addEventListener('mousemove', (e) => {
      const r = viewport.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = true;
      if (cursorEl) {
        cursorEl.classList.add('on');
        cursorEl.style.transform = 'translate(' + (mouse.x + 14) + 'px,' + (mouse.y + 16) + 'px)';
        cursorEl.textContent = coordString(clamp(mouse.x / cw, 0, 1), clamp(mouse.y / ch, 0, 1));
      }
    });
    viewport.addEventListener('mouseleave', () => {
      mouse.inside = false;
      mouse.x = -1e4;
      mouse.y = -1e4;
      if (cursorEl) cursorEl.classList.remove('on');
    });

    window.addEventListener('resize', sizeChart);
    sizeChart();
    resetDemo(false);
    requestAnimationFrame(drawChart);

    /* Hero / 导航的推演入口：滚动至星图并启动 */
    const remoteLaunch = () => {
      const sec = document.getElementById('star-map');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(startRun, 620);
    };
    const heroRunBtn = $('heroRunBtn');
    const navRunBtn = $('navRunBtn');
    if (heroRunBtn) heroRunBtn.addEventListener('click', remoteLaunch);
    if (navRunBtn) navRunBtn.addEventListener('click', remoteLaunch);
  }

  /* ============================================================
     3. 星等基准榜：进入视口后亮度条生长
     ============================================================ */
  const magBoard = $('magBoard');
  if (magBoard) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            magBoard.classList.add('lit');
            io.disconnect();
          }
        }
      }, { threshold: 0.3 });
      io.observe(magBoard);
    } else {
      magBoard.classList.add('lit');
    }
  }

  /* ============================================================
     4. 交互拆解台：模拟逐步推理星链
     ============================================================ */
  const labInput = $('labInput');
  const labRunBtn = $('labRunBtn');
  const labChain = $('labChain');

  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (labInput && labRunBtn && labChain) {
    let labTimers = [];
    const clearLab = () => {
      for (let i = 0; i < labTimers.length; i++) clearTimeout(labTimers[i]);
      labTimers = [];
    };

    const runLab = () => {
      const q = labInput.value.trim();
      if (!q) { labInput.focus(); return; }
      clearLab();
      labRunBtn.disabled = true;
      labChain.innerHTML = '';

      const steps = [
        { tag: 'STEP 1 · 审题', text: '锁定观测目标「' + q + '」——分离已知条件、隐含约束与待求量。' },
        { tag: 'STEP 2 · 设元', text: '为未知量赋予符号与参照系，把混沌压缩成可演算的变量空间。' },
        { tag: 'STEP 3 · 列式', text: '在变量之间架设推理连线，形成一条可逐级传递亮度的星链。' },
        { tag: 'STEP 4 · 验算', text: '逐节点回代检验，剪除矛盾分支，把误差收敛到可接受域。' },
        { tag: 'STEP 5 · 作答', gold: true, text: '星座闭合——关于「' + q + '」的结论，已在推理链末端以金色点亮。' }
      ];

      steps.forEach((s, i) => {
        labTimers.push(setTimeout(() => {
          const node = document.createElement('div');
          node.className = 'chain-node' + (s.gold ? ' gold' : '');
          node.innerHTML =
            '<div class="chain-dot"></div>' +
            '<div class="chain-text"><span class="chain-tag">' + s.tag + '</span><p>' + s.text + '</p></div>';
          labChain.appendChild(node);
          if (i === steps.length - 1) labRunBtn.disabled = false;
        }, 420 + i * 640));
      });
    };

    labRunBtn.addEventListener('click', runLab);
    labInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runLab();
    });
  }
})();
