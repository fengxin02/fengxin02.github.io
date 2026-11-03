import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * 轮换显示文字。淡入淡出切换，每个词各自居中，整行不会左右晃。
 */
export default function RotatingWord({ words, interval = 2800 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={words[index]}
        className="rotating-word"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  );
}
