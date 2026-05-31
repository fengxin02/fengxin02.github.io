import { useEffect, useRef, useCallback } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Typewriter } from 'react-simple-typewriter';
import { animate,  } from 'animejs';
import './App.css';

function App() {
  const particlesRef = useRef(null);
  const containerRef = useRef(null);

  // 初始化粒子背景
  useEffect(() => {
    const el = particlesRef.current;
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
        options: {
          particles: {
            number: { value: 70 },
            paint: {
              color: { value: '#9e226f' },
              fill: { enable: true, opacity: 0.5 },
            },
            shape: {
              type: 'star',
              options: { star: { sides: 5 } },
            },
            move: { enable: true, speed: 1 },
            size: { value: { min: 2, max: 4 } },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              
            },
            modes: {
              repulse: { distance: 50, duration: 0.4 },
            },
          },
        },
      });

      if (!cancelled) {
        containerRef.current = container;
        try { window.__particles_container = container; } catch (e) { void e; }
        console.log('[Particles] Particles created!', container);
      }
    };

    init().catch((err) => {
      console.error('[Particles] Init failed:', err);
    });

    return () => {
      cancelled = true;
      if (containerRef.current) {
        containerRef.current.destroy();
        containerRef.current = null;
      }
    };
  }, []);

  // 点击涟漪扩散效果 — 大球从点击位置膨胀扩散
  const createRipple = useCallback((x, y) => {
    const colors = [
      { bg: 'rgba(244, 114, 182, 0.25)', border: '#f472b6' },  // pink
      { bg: 'rgba(56, 189, 248, 0.20)', border: '#38bdf8' },  // cyan
      { bg: 'rgba(158, 34, 111, 0.22)', border: '#9e226f' },  // purple
    ];

    // 中心闪光
    const flash = document.createElement('div');
    flash.className = 'ripple-center';
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    flash.style.width = '12px';
    flash.style.height = '12px';
    flash.style.backgroundColor = '#ffffff';
    flash.style.boxShadow = '0 0 20px #fff, 0 0 40px #f472b6';
    document.body.appendChild(flash);

    animate(flash, {
      scale: 3,            
      opacity: [0.9, 0], //数组 [起始值, 结束值]。透明度从 0.9 渐变到 0（完全透明），产生"消散"效果。
      duration: 400,
      ease: 'outExpo', //表示动画开始时快，结束时缓慢减速
      onComplete: () => flash.remove(), //动画完成后移除闪光元素，保持页面整洁
    });

    // 3 层扩散大球（填充 + 光环）
    colors.forEach((c, idx) => {
      // 填充层 — 半透明球体
      const fill = document.createElement('div');
      fill.className = 'ripple-fill';
      fill.style.left = `${x}px`;
      fill.style.top = `${y}px`;
      fill.style.width = '30px';
      fill.style.height = '30px';
      fill.style.backgroundColor = c.bg;
      document.body.appendChild(fill);

      animate(fill, {
        scale: 7,          
        opacity: [1, 0],
        duration: 1200,
        delay: idx * 100,
        ease: 'outExpo',
        onComplete: () => fill.remove(),
      });

      // 光环层 — 边缘发光
      const ring = document.createElement('div');
      ring.className = 'ripple-ring';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.style.width = '30px';
      ring.style.height = '30px';
      ring.style.borderColor = c.border;
      ring.style.boxShadow = `0 0 10px ${c.border}, 0 0 20px ${c.border}`;
      document.body.appendChild(ring);

      animate(ring, {
        scale: 7,          // size of circle
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

  return (
    <div className="hero-container">
      {/* 粒子背景层 */}
      <div ref={particlesRef} className="particles-bg" />

      {/* 核心内容层 */}
      <div className="content-wrapper">
        <h1 className="hero-title">
          Hi, I'm{' '}
          <span className="highlight-blue">
            <Typewriter
              words={['Ji Jin Yan', 'Fengxin', '风信子（']}
              loop={0}
              cursor
              cursorStyle='.'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <h2 className="hero-subtitle">
          I am a{' '}
          <span className="highlight-pink">
            <Typewriter
              words={['Computer Science Student', 'League of Legends Enjoyer', 'Anime Lover']}
              loop={0}
              cursor
              cursorStyle='_'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h2>
      </div>
    </div>
  );
}

export default App;
