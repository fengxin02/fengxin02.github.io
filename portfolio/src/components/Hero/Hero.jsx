import { useState } from 'react';
import { motion } from 'framer-motion';
import useParticles from '../../hooks/useParticles';
import useClickBloom from '../../hooks/useClickBloom';
import usePetalTrail from '../../hooks/usePetalTrail';
import useIntro from '../../hooks/useIntro';
import useHeroRail from '../../hooks/useHeroRail';
import About from '../About/About';
import Projects from '../Projects/Projects';
import Background from '../Background/Background';
import MediaWall from '../MediaWall/MediaWall';
import ContactModal from '../ContactModal/ContactModal';
import { anime, games } from '../../data/content';
import Hyacinth from './Hyacinth';
import HeroRail from './HeroRail';
import PetalBurst from './PetalBurst';
import RotatingWord from './RotatingWord';
import './Hero.css';

// 粒子背景配置
const particleOptions = {
  particles: {
    number: { value: window.innerWidth < 768 ? 8 : 16 },
    paint: {
      fill: { enable: true, opacity: { min: 0.3, max: 0.7 } },
    },
    shape: {
      type: 'image',
      options: {
        image: {
          src: '/petal.svg',
          width: 40,
          height: 40,
        },
      },
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 1, sync: false },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'bottom',
      straight: false,
    },
    size: { value: { min: 5, max: 11 } },
  },
};

// 身份轮换文字
const subtitleWords = ['Computer Engineering Student', 'League of Legends Enjoyer', 'Anime Lover'];

// 名字在花开到一半时浮现
const NAME_DELAY = 1.3;

export default function Hero() {
  const particlesRef = useParticles(particleOptions);
  const trailRef = usePetalTrail();
  const { playing, run, replay } = useIntro();
  const rail = useHeroRail();
  useClickBloom();
  const [modalOpen, setModalOpen] = useState(false);

  // 播放完切成静态版本：跳过时能立刻显示最终画面
  const introKey = playing ? `play-${run}` : 'static';

  // 彩蛋：点风信子再开一次
  const handleFlowerClick = (e) => {
    if (playing) return;
    e.stopPropagation();
    replay();
  };

  return (
    <div className="hero-wrapper">
      {/* 粒子背景 — fixed 铺满全屏，开场结束后淡入 */}
      <div ref={particlesRef} className={`particles-bg ${playing ? '' : 'visible'}`} />

      {/* 鼠标落花瓣 canvas */}
      <canvas ref={trailRef} className="trail-canvas" />

      {/* 开场散落的花瓣 */}
      {run > 0 && <PetalBurst key={run} />}

      {/* 右上角头像 — 点击打开联系弹窗 */}
      <img
        src="/fengxinicon.jpg"
        alt="Fengxin"
        className="hero-avatar"
        onClick={() => setModalOpen(true)}
        title="Contact me"
      />

      {/* 联系方式弹窗 */}
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* 第一屏：风信子和名字。桌面上它们固定在屏幕上，滚动时移到左栏 */}
      <header className="hero-first">
        <div className="hero-stage">
          <motion.div
            key={rail.desktop ? 'desktop' : 'mobile'}
            className="hero-group"
            style={rail.desktop ? { x: rail.x, scale: rail.scale, originY: 0 } : undefined}
          >
            <Hyacinth key={introKey} play={playing} onClick={handleFlowerClick} />

            <motion.div
              key={`name-${introKey}`}
              className="hero-content"
              initial={playing ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: NAME_DELAY, ease: 'easeOut' }}
            >
              <h1 className="hero-title">风馨</h1>
              <motion.div style={rail.desktop ? { opacity: rail.textOpacity } : undefined}>
                <p className="hero-name">Hi, I&apos;m Fengxin</p>
                <h2 className="hero-subtitle">
                  <RotatingWord words={subtitleWords} />
                </h2>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {rail.desktop && <HeroRail opacity={rail.railOpacity} visibility={rail.railVisibility} />}

        <motion.a
          href="#about"
          className="scroll-hint"
          aria-label="Scroll to About Me"
          style={{ opacity: rail.hintOpacity }}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.a>
      </header>

      {/* 主内容：桌面上在右栏 */}
      <main className="page-layout">
        <div className="page-content">
          <About />
          <Projects />
          <Background />
          <MediaWall id="anime" title="Anime I love" items={anime} shape="poster" />
          <MediaWall id="games" title="Favourite games" items={games} shape="cover" />
        </div>
      </main>
    </div>
  );
}
