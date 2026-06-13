import { useState } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import sato from '../../assets/sato.png';
import soyo from '../../assets/SoyoJiayou.png';
import raphiel from '../../assets/Raphiel.jpg';

// 苹果风弹簧参数 — 丝滑阻尼感
const spring = {
  type: 'spring',
  stiffness: 80,   // 刚度：低一点让动画柔和
  damping: 18,     // 阻尼：刚好消掉回弹的临界点
  mass: 0.6,       // 质量：轻快响应
};

// 容器动画 — 控制子元素依次出现
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,  // 子元素依次出现，间隔 120ms
      delayChildren: 0.2,     // 容器可见后等 200ms 再开始
    },
  },
};

// 子卡片动画 — 从下方滑入
const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

const About = () => {
  const [flipped, setFlipped] = useState(false);

  return (
    <section className="about-section">
      {/* 3D 翻面容器 — 包裹整块玻璃面板 */}
      <div className={`flip-wrapper ${flipped ? 'flipped' : ''}`}>
        <div className="flip-inner">
          {/* ── 正面：完整的便当面板 ── */}
          <motion.div
            className="flip-front-panel glass-container bento-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* 1. 主介绍 */}
            <motion.div className="bento-item main-intro" variants={itemVariants}>
              <h2
                className="bento-title flip-trigger"
                onClick={() => setFlipped(true)}
                title="Click me!"
              >
                About Me
              </h2>
              <p className="bento-text">
                Hi! I&apos;m Yan or you can call me Ji or Fengxin. You may be
                curious about me, because you are here. I really like flowers,
                especially the hyacinth, which is really the same as my name on
                internet 风信子. I am currently a Computer Science student, as
                most of the Computer Science students I chose this major because
                I love playing video games. Yeah you can find more information
                by browsing my portfolio. I tried to put some easter eggs
                waiting for you to find them.
                <img src={sato} alt="Sato" className="about-image" />
              </p>
            </motion.div>

            {/* 2. 技能 */}
            <motion.div className="bento-item skills-box" variants={itemVariants}>
              <span className="bento-title-ultrasmall">
                I don&apos;t wanna talk a lot about these stuffs here but let me
                tell you about my favourite
              </span>
              <h3 className="bento-title-small">Tech Stack</h3>
              <div className="tech-tags">
                <span>React</span>
                <span>Python</span>
                <span>C#</span>
              </div>
            </motion.div>

            {/* 3. 游戏 */}
            <motion.div className="bento-item status-box" variants={itemVariants}>
              <h3 className="bento-title-small">Favourite Games</h3>
              <div className="tech-tags">
                <span>League of Legends</span>
                <span>osu!</span>
                <span>Muse Dash</span>
                <span>CSGO</span>
                <span>Clash Royale</span>
                <span>Stellar Blade</span>
                <span>Elden Ring</span>
                <span>Granblue Fantasy: Relink</span>
                <span>...</span>
              </div>
            </motion.div>

            {/* 4. 更多 */}
            <motion.div className="bento-item wide-box" variants={itemVariants}>
              <h3 className="bento-title-small">More things</h3>
              <p className="bento-text">
                Yeah more..... Let&apos;s find more about me
                <span className="small-text"> somewhere...... maybe just click around? </span>
              </p>
            </motion.div>
          </motion.div>

          {/* ── 背面：隐藏彩蛋 ── */}
          <div className="flip-back-panel">
            <img src={soyo} alt="Soyo" />
            <h2
              className="bento-title flip-trigger"
              onClick={() => setFlipped(false)}
              title="Click to flip back"
            >
                Ehmmmmm... Here you are, cool :D
            </h2>
            <div className="easter-egg-content">
              <p className="anime-line">
                Let&apos;s talk about anime{' '}
                <img src={raphiel} alt="Raphiel" className="inline-icon" />
              </p>
              <p>I love watching anime, but i guess it&apos;s not hard to figure out my the style of the website.
                 The scene above is one of my favorite scenes from the &ldquo;MyGO!!!!!&rdquo;. (It&apos;s kinda fit there imo)</p>
                 <p>Lemme tell you a few my favorite anime:</p>
            
            <div className="anime-lists">

              <ul>
                <li>Citrus</li>
                <li>Grand Blue Dreaming</li>
                <li>Bloom into You</li>
              </ul>
              <ul>
                <li>This Monster Wants to Eat Me</li>
                <li>Happy Sugar Life</li>
                <li>Maria-sama ga Miteru</li>
              </ul>
              <ul>
                <li>This Monster Wants to Eat Me</li>
                <li>Happy Sugar Life</li>
                <li>Manaria Friends</li>
              </ul>
            </div>
              <p>It will be so long, you know what i will open a new page for showing my favourite anime.
                (Still in progress, not even made a folder but WE WILL HAVE  :DD)</p>
              <p className="egg-footer">
                Click the title again to flip back.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;