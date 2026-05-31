import { useEffect, useRef } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Typewriter } from 'react-simple-typewriter';
import './App.css';

function App() {
  const particlesRef = useRef(null);
  const containerRef = useRef(null);

  // 初始化粒子效果
  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;

    let container;
    let cancelled = false;

    const init = async () => {
      console.log('[Particles] Loading slim bundle...');
      await loadSlim(tsParticles); // 加载 slim 包 加载速度更快，体积更小
      if (cancelled) return;

      console.log('[Particles] Creating particles on element:', el);
      container = await tsParticles.load({
        element: el,
        options: {
          particles: {
            number: { value: 70 },
            paint: { color: { value: '#9e226f' },
             fill: { enable: true, opacity: 0.5 } },
            shape:{
              type: 'star',
              options: {
                star:{
                  sides: 5,
                }
              },
            },
            move: { enable: true, speed: 1 },
            size: {
              value: { min: 2, max: 4 } // 星星的大小会在 2 到 4 之间随机
            }
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: 'repulse' },
              onClick: { enable: true, mode: 'push' },
            },
            modes: {
              repulse: { distance: 50, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
        },
      });

      if (!cancelled) {
        containerRef.current = container;
        try { window.__particles_container = container; } catch (e) { void e; } //把运行时创建的粒子容器对象暴露到全局 window.__particles_container，方便在浏览器控制台调试
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

  return (
    <div className="hero-container">
      {/* 粒子背景层 */}
      <div ref={particlesRef} className="particles-bg" />

      {/* 核心内容层 */}
      <div className="content-wrapper">
        <h1 className="hero-title">
          Hi, I'm 
          <span className="highlight-blue">
            <Typewriter
              words={[' Ji Jin Yan', ' Fengxin', ' 风信子（']}
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
