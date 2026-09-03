// Preset 04: Cyber Observatory Terminal CLI
document.addEventListener('DOMContentLoaded', () => {
  const cliInput = document.getElementById('cliInput');
  const cliLog = document.getElementById('cliLog');

  const commands = {
    help: "可用命令: help, scan, status, models, clear, about",
    status: "SYSTEM: 100% NOMINAL. ORBIT: L2 POINT. POWER: SOLAR-RTG HYBRID. LATENCY: 1.28s.",
    scan: ">>> 正在执行全天区多模态光谱扫描... 捕获 4,096 条引力微透镜事件与 12 组中子星脉冲信号。",
    models: "LOADED ENGINES: [Gemini-2.5-DeepThought], [Gemini-Vision-Tensor-v4], [Audio-Echo-V1].",
    about: "Gemini Observatory - 深空智识观测与长时序推理节点。"
  };

  if (cliInput && cliLog) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';
        if (!cmd) return;

        // 输出用户命令
        const userLine = document.createElement('div');
        userLine.className = 'cli-entry';
        userLine.textContent = `gemini@l2-observatory:~$ ${cmd}`;
        cliLog.appendChild(userLine);

        if (cmd === 'clear') {
          cliLog.innerHTML = '';
          return;
        }

        // 输出系统响应
        const resLine = document.createElement('div');
        resLine.className = 'cli-entry sys';
        if (commands[cmd]) {
          resLine.textContent = `> ${commands[cmd]}`;
        } else {
          resLine.textContent = `> 未知指令 '${cmd}'。输入 'help' 获取支持命令列表。`;
        }
        cliLog.appendChild(resLine);
        cliLog.scrollTop = cliLog.scrollHeight;
      }
    });
  }
});
