import { useEffect } from 'react';
import { animate } from 'animejs';

const PETAL_COUNT = 6;
const SPREAD = 26; // 花瓣张开的距离（px）

function createBloom(x, y) {
  for (let i = 0; i < PETAL_COUNT; i++) {
    const angle = (i / PETAL_COUNT) * 360;
    const radians = (angle * Math.PI) / 180;

    const petal = document.createElement('div');
    petal.className = 'bloom-petal';
    petal.style.left = `${x}px`;
    petal.style.top = `${y}px`;
    document.body.appendChild(petal);

    animate(petal, {
      translateX: [0, Math.sin(radians) * SPREAD],
      translateY: [0, -Math.cos(radians) * SPREAD],
      rotate: [angle, angle + 20],
      scale: [0.2, 1],
      opacity: [0.9, 0],
      duration: 750,
      ease: 'outQuart',
      onComplete: () => petal.remove(),
    });
  }
}

/**
 * 自定义 Hook：点击时在鼠标位置开一朵小花
 *
 * 使用方式：
 *   useClickBloom();
 *   // 自动绑定 window click 事件，无需额外操作
 */
export default function useClickBloom() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handler = (e) => createBloom(e.clientX, e.clientY);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);
}
