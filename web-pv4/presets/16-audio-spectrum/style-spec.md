# 风格构成说明：音频频谱·Web Audio 实时引擎 (Web Audio Spectrum)

## 1. 风格概述 (Style DNA)

* **核心理念**：页面里没有一个音频文件。底鼓、贝斯、琶音、踩镲全部由振荡器与噪声缓冲实时合成，再经 `AnalyserNode` 做 2048 点 FFT —— 声音是算出来的，图像也是。
* **技术锚点**：`OscillatorNode` / `BiquadFilterNode` / `DynamicsCompressor` / `AnalyserNode` / 前瞻式调度器（lookahead scheduler）/ 对数分箱 / 时域波形层 / 可选的麦克风输入。
* **视觉情绪**：夜店、录音棚、波形与霓虹、能量外溢。
* **适用场景**：音乐产品、播客平台、音频 SDK、直播/演出官网、声学硬件。

---

## 2. 色彩令牌 (Design Tokens)

```css
:root {
  --deep: #07050f;
  --glass: rgba(18, 12, 32, .58);
  --line: rgba(255, 110, 200, .15);

  --mag: #ff3ea5;      /* 低频 / 强调 */
  --cyan: #40e8ff;     /* 高频 / HUD */
  --violet: #9b5cff;
  --lime: #c6ff5c;     /* 波形层 / 标签 */
}
```

---

## 3. 排版与字体系统 (Typography)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

* **标题 / 按钮**：`Syne` 700/800（带点怪癖的音乐感无衬线）。
* **HUD / 正文 / 终端**：`JetBrains Mono`。
* **信号链即装饰**：Hero kicker 写整条信号链 `OscillatorNode → BiquadFilter → AnalyserNode → getByteFrequencyData()`。

---

## 4. 核心技术规程 (Audio Graph)

```
[合成器]  kick: sine  ·  frequency 150 → 45Hz 指数下滑
          hat : noise buffer → highpass 7.2kHz
          bass: sawtooth → lowpass 220→900Hz 扫频
          arp : triangle · 音阶 [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33]
                       ↓
      master gain → DynamicsCompressor → AnalyserNode → destination
```

* **前瞻式调度**：`setInterval(scheduler, 25)` 检查未来 0.12s，按 `nextTime += 0.16` 精确排程（避免 `setTimeout` 抖动）。
* **包络**：`setValueAtTime(0.0001) → linearRamp(peak) → exponentialRamp(0.0001)`（指数收尾不能用 0）。
* **对数分箱**：`a = pow(i/bars, 1.7) * usable` —— 低频窄、高频宽，贴合听感；并只取前 55% 的 bins（高频基本为空）。
* **三重可视化**：径向频谱（HSL 沿角度渐变）+ 底部线性柱与倒影 + 时域波形层。
* **合规**：必须由用户手势 `resume()`；未启动时用正弦合成假频谱，界面不会"死"。

---

## 5. 动效物理与微交互 (Motion & Dynamics)

* **启动遮罩**：点击后 `play-overlay` 淡出（0.5s）。
* **点击画面**：暂停 / 继续合成器。
* **麦克风切换**：`getUserMedia` 成功后停掉合成器、把 `MediaStreamSource` 接入 analyser；被拒绝时 HUD 显示 `MIC DENIED` 并回落到合成器。
* **模式切换**：INSTANT = 32 柱 / 平滑 0.55 / 无波形；DEEP = 128 柱 / 平滑 0.90 / 波形 + 余晖。
* **鼠标**：横向位置调制主增益（0.65–1.15 倍）。
* **中心电平环**：按 RMS 呼吸扩张。

---

## 6. 页面结构骨架 (hy4 个人网站通用)

| 区块 | 说明 |
| :--- | :--- |
| 视口 | 420px Canvas + 启动遮罩 + 角标（CHANNEL 01 · STEREO OUT） |
| HUD | ENGINE / FFT / BARS / SMOOTH / SRC / FPS |
| Hero | 信号链 kicker → 双行渐变标题 → 原理描述 → 双 CTA → 操作提示 |
| 能力机架 | 4 张毛玻璃卡 |
| DSP 参数 | 左：双模式 + SMOOTHING / GAIN 滑块；右：推理流 |
| 终端 | `dsp>` 提示符 + 消息流 |
| 评测 | 4 组数值 + 青→品红条 |
| Footer | 引擎署名 |

---

## 7. 大模型直接复用 Prompt (LLM System Prompt)

```markdown
你是一名音频与前端双栖的工程师。请以【Web Audio 实时频谱】风格为 hy4 生成个人官网（原生 HTML+CSS+JS，无音频文件）。
技术要求：
1. 音频图：master gain → DynamicsCompressor → AnalyserNode(fftSize 2048) → destination；必须由用户点击后 resume()。
2. 实时合成：kick 用 sine 做 150→45Hz 指数下滑；hat 用白噪声 buffer 过 highpass 7.2kHz；bass 用 sawtooth 过 lowpass 220→900Hz 扫频；arp 用 triangle 走八音音阶。包络统一 setValueAtTime(0.0001) → linearRamp(peak) → exponentialRamp(0.0001)。
3. 前瞻调度器：setInterval(25ms) 检查未来 0.12s，nextTime += 0.16 精确排程，避免 setTimeout 抖动。
4. 可视化：径向频谱（HSL 沿角度从品红渐变到青）+ 底部线性柱与倒影 + 时域波形层；频谱用对数分箱 a = pow(i/bars,1.7)*usable（usable = bins*0.55）。
5. 双模式：INSTANT 32 柱/平滑 0.55/无波形，DEEP 128 柱/平滑 0.90/带波形与余晖；提供麦克风接入（失败回落合成器）；未启动时用正弦假频谱占位。
6. UI：Syne 800 标题 + JetBrains Mono 正文，sticky HUD 显示 FFT/BARS/SMOOTH/SRC/FPS；配色 #07050F 底 + 品红 #FF3EA5 / 青 #40E8FF / 紫 #9B5CFF / 柠檬 #C6FF5C。
```
