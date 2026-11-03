import { motion } from 'framer-motion';
import useActiveSection from '../../hooks/useActiveSection';
import { sections } from '../../data/content';

const sectionIds = sections.map((s) => s.id);

/**
 * 左栏：风信子移过来之后，显示在它下面的简介和导航。
 */
export default function HeroRail({ opacity, visibility }) {
  const active = useActiveSection(sectionIds);

  return (
    <motion.nav className="hero-rail" style={{ opacity, visibility }} aria-label="Page sections">
      <p className="rail-tagline">Computer Engineering @ BME</p>
      <ul className="rail-links">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={s.id === active ? 'active' : ''}
              aria-current={s.id === active ? 'true' : undefined}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="rail-hello" title="Chinese, Hungarian, English">你好 · Szia · Hello</p>
    </motion.nav>
  );
}
