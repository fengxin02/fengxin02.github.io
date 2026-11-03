import { motion } from 'framer-motion';

/**
 * 页面版块：标题加内容，滚动到时淡入。
 *
 * 位移放在里层：锚点跳转按 section 的位置计算，不受淡入动画影响。
 */
export default function Section({ id, title, children }) {
  return (
    <section id={id}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="section-title">{title}</h2>
        {children}
      </motion.div>
    </section>
  );
}
