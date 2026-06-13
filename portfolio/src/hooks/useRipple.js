import { useEffect, useCallback } from 'react';
import { animate } from 'animejs';

/**
 * 自定义 Hook：点击涟漪扩散效果
 *
 * 点击页面任意位置时，在鼠标位置生成三层依次膨胀扩散的彩色大球。
 * 每层包含半透明填充体 + 发光光环，错开 100ms 依次扩散。
 *
 * 使用方式：
 *   useRipple();
 *   // 自动绑定 window click 事件，无需额外操作
 */
export default function useRipple() {
  const createRipple = useCallback((x, y) => {
    // 三层涟漪的颜色配置
    const colors = [
      { bg: 'rgba(244, 114, 182, 0.25)', border: '#f472b6' },  // 粉色
      { bg: 'rgba(56, 189, 248, 0.20)', border: '#38bdf8' },   // 蓝色
      { bg: 'rgba(158, 34, 111, 0.10)', border: 'rgba(158,34,111,0.35)' }, // 紫色 — 淡一点
    ];

    // ── 中心闪光 ──
    const flash = document.createElement('div');
    flash.className = 'ripple-center';
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.width = '12px';
    flash.style.height = '12px';
    flash.style.backgroundColor = '#ffffff';
    flash.style.boxShadow = '0 0 20px #fff, 0 0 40px #f472b6';
    flash.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(flash);

    animate(flash, {
      scale: 3,            // 12px → 36px
      opacity: [0.9, 0],
      duration: 400,
      ease: 'outExpo',
      onComplete: () => flash.remove(),
    });

    // ── 三层扩散大球 ──
    colors.forEach((c, idx) => {
      // 填充层 — 半透明球体
      const fill = document.createElement('div');
      fill.className = 'ripple-fill';
      fill.style.left = `${x}px`;
      fill.style.top = `${y}px`;
      fill.style.width = '30px';
      fill.style.height = '30px';
      fill.style.backgroundColor = c.bg;
      fill.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(fill);

      animate(fill, {
        scale: 7,          // 30px → 210px
        opacity: [1, 0],
        duration: 1200,
        delay: idx * 100,  // 每层错开 100ms
        ease: 'outExpo',
        onComplete: () => fill.remove(),
      });

      // 光环层 — 发光边框
      const ring = document.createElement('div');
      ring.className = 'ripple-ring';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = c.border;
      ring.style.boxShadow = `0 0 8px ${c.border}, 0 0 16px ${c.border}`;
      ring.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(ring);

      animate(ring, {
        scale: 7,
        opacity: [0.8, 0],
        borderWidth: ['2px', '0px'],
        duration: 1200,
        delay: idx * 100,
        ease: 'outExpo',
        onComplete: () => ring.remove(),
      });
    });
  }, []);

  useEffect(() => {
    const handler = (e) => createRipple(e.clientX, e.clientY);
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, [createRipple]);
}
