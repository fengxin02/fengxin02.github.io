import { motion } from 'framer-motion';
import './About.css';
import sato from '../../assets/sato.png';

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
  return (
    <section className="about-section">
      <motion.div
        className="glass-container bento-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* 1. 主介绍 */}
        <motion.div className="bento-item main-intro" variants={itemVariants}>
          <h2 className="bento-title">About Me:</h2>
          <p className="bento-text">
            Hi! I'm Yan or you can call me Ji or Fengxin. You may be courious about me, because you are here. 
            I really like flowers, especially the hyacinth, which is really the same as my name on internet 风信子.
             I am currently a Computer Science student, as most of the Computer Science students i chose this major 
             because I love playing video games. Yeah you can find more information by browseing my portfolio. I tried to put some easter 
             eggs waiting you to find them. 
             <img src={sato} alt="Sato" className = "about-image"/>
          </p>
        </motion.div>

        {/* 2. 技能 */}
        <motion.div className="bento-item skills-box" variants={itemVariants}>
          <span className="bento-title-ultrasmall">I don't wanna talk alot about these stuffs here but let me tell you about my favourite</span>

          <h3 className="bento-title-small">Tech Stack</h3>

          <div className="tech-tags">
            <span>React</span>
            <span>Python</span>
            <span>C#</span>
          </div>
        </motion.div>

        {/* 3. 当前状态 */}
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

        {/* 4. 座右铭 */}
        <motion.div className="bento-item wide-box" variants={itemVariants}>
          <h3 className="bento-title-small">More things</h3>
          <p className="bento-text">
            Yeah more..... Let's find more about me  
            <span className= "small-text"> somewhere...</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;