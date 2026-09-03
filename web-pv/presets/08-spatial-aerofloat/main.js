// Preset 08: Spatial Aerofloat 3D Gyro Parallax Tilt
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });

  // Dock 激活切换
  const dockItems = document.querySelectorAll('.dock-item');
  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      dockItems.forEach(d => d.classList.remove('active'));
      item.classList.add('active');
    });
  });
});
