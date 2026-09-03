// Preset 02: Celestial Duality Split-Screen Drag & Cursor
document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.getElementById('cursor');
  const splitContainer = document.getElementById('splitContainer');
  const leftPane = document.getElementById('leftPane');
  const splitDivider = document.getElementById('splitDivider');

  // 反色光标跟随
  window.addEventListener('mousemove', (e) => {
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  });

  // 分屏拖拽交互
  let isDragging = false;

  splitDivider.addEventListener('mousedown', (e) => {
    isDragging = true;
    splitDivider.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      splitDivider.classList.remove('dragging');
      document.body.style.cursor = 'default';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const containerWidth = splitContainer.offsetWidth;
    let newWidth = (e.clientX / containerWidth) * 100;
    
    // 限制拖拽边界 20% ~ 80%
    if (newWidth < 20) newWidth = 20;
    if (newWidth > 80) newWidth = 80;

    leftPane.style.width = `${newWidth}%`;
  });
});
