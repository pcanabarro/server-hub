import { useEffect } from 'react';

export default function Background() {
  useEffect(() => {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 8 + Math.random() * 12 + 's';
      p.style.animationDelay = Math.random() * 10 + 's';
      p.style.width = p.style.height = 2 + Math.random() * 3 + 'px';
      container.appendChild(p);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <div className="bg-grid" />
      <div className="particles" id="particles" />
    </>
  );
}
