import { useEffect, useRef } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';

/**
 * 自定义 Hook：初始化 tsparticles 粒子背景
 *
 * @param {object} options - tsparticles 配置项
 * @returns {React.RefObject} containerRef - 绑定到粒子容器 div 的 ref
 *
 * 使用方式：
 *   const particlesRef = useParticles({ particles: { number: { value: 70 } } });
 *   return <div ref={particlesRef} className="particles-bg" />;
 */
export default function useParticles(options = {}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let container;
    let cancelled = false;

    const init = async () => {
      console.log('[Particles] Loading slim bundle...');
      await loadSlim(tsParticles);
      if (cancelled) return;

      console.log('[Particles] Creating particles on element:', el);
      container = await tsParticles.load({
        element: el,
        options,
      });

      if (!cancelled) {
        canvasRef.current = container;
        try {
          window.__particles_container = container;
        } catch (e) {
          void e;
        }
        console.log('[Particles] Particles created!', container);
      }
    };

    init().catch((err) => {
      console.error('[Particles] Init failed:', err);
    });

    return () => {
      cancelled = true;
      if (canvasRef.current) {
        canvasRef.current.destroy();
        canvasRef.current = null;
      }
    };
  }, [options]);

  return containerRef;
}
