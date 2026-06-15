import { useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import useParticles from '../../hooks/useParticles';
import useRipple from '../../hooks/useRipple';
import About from '../About/About';
import ContactModal from '../ContactModal/ContactModal';
import './Hero.css';

// 粒子背景配置
const particleOptions = {
  particles: {
    number: { value: 45 },
    paint: {
      color: { value: '#f8a0b8' },
      fill: { enable: true, opacity: 0.6 },
    },
    shape: {
      type: 'image',
      options: {
        image: {
          src: '/sakura.svg',
          width: 40,
          height: 40,
        },
      },
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 2, sync: false },
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: 'bottom-right',
      straight: false,
    },
    size: { value: { min: 12, max: 22 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
    },
    modes: {
      repulse: { distance: 60, duration: 0.4 },
    },
  },
};

// 打字机文字配置
const nameWords = ['Ji Jin Yan', 'Fengxin', '风信子（'];
const subtitleWords = ['Computer Science Student', 'League of Legends Enjoyer', 'Anime Lover'];

export default function Hero() {
  const particlesRef = useParticles(particleOptions);
  useRipple();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="hero-wrapper">
      {/* 粒子背景 — fixed 铺满全屏，滚动时始终可见 */}
      <div ref={particlesRef} className="particles-bg" />

      {/* 右上角头像 — 点击打开联系弹窗 */}
      <img
        src="/fengxinicon.jpg"
        alt="Fengxin"
        className="hero-avatar"
        onClick={() => setModalOpen(true)}
        title="Contact me"
        style={{ cursor: 'pointer' }}
      />

      {/* 联系方式弹窗 */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* 主内容流 */}
      <section className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Hi, I&apos;m{' '}
            <span className="highlight-blue">
              <Typewriter
                words={nameWords}
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
                words={subtitleWords}
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

        {/* About 直接跟在标题下方 */}
        <About />
      </section>
    </div>
  );
}
