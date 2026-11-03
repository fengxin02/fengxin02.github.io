import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#c9a7e8', '#d4b5f0', '#b48be0'];
const START_DELAY = 1.25; // 等花开得差不多了再落（秒）

function createPetals() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const count = width < 768 ? 16 : 30;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * width,
    y: height * (0.6 + Math.random() * 0.6),
    rotate: (Math.random() - 0.5) * 540,
    size: 6 + Math.random() * 6,
    color: COLORS[i % COLORS.length],
    duration: 1.6 + Math.random() * 1.1,
    delay: START_DELAY + Math.random() * 0.35,
  }));
}

/**
 * 花开之后从花穗散开、飘满屏幕的花瓣，落完就淡出。
 */
export default function PetalBurst() {
  const [petals] = useState(createPetals);

  return (
    <div className="petal-burst" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="petal-burst-item"
          style={{ width: p.size, height: p.size * 0.65, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 0 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            x: { duration: p.duration, delay: p.delay, ease: 'easeOut' },
            y: { duration: p.duration, delay: p.delay, ease: 'easeIn' },
            opacity: { duration: p.duration, delay: p.delay, times: [0, 0.1, 0.7, 1] },
          }}
        />
      ))}
    </div>
  );
}
