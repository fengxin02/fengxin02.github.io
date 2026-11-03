import { motion } from 'framer-motion';

const GREEN = '#8fb996';
const TONES = ['#b48be0', '#c9a7e8', '#9d74d6'];

// 花穗上每一排小花的数量和宽度，从上到下
const ROWS = [
  { count: 1, half: 0 },
  { count: 2, half: 10 },
  { count: 3, half: 18 },
  { count: 4, half: 25 },
  { count: 4, half: 30 },
  { count: 5, half: 33 },
  { count: 4, half: 34 },
  { count: 5, half: 34 },
  { count: 4, half: 30 },
];

const FLORETS = ROWS.flatMap((row, r) =>
  Array.from({ length: row.count }, (_, i) => ({
    id: `${r}-${i}`,
    x: 100 + (row.count > 1 ? -row.half + (2 * row.half * i) / (row.count - 1) : 0),
    y: 30 + r * 19,
    rotate: (r * 23 + i * 37) % 60,
    color: TONES[(r + i) % TONES.length],
    // 真实的风信子从下往上开
    delay: 0.4 + (ROWS.length - 1 - r) * 0.09 + i * 0.015,
  }))
);

const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

function Floret({ color }) {
  return (
    <g fill={color}>
      {PETAL_ANGLES.map((angle) => (
        <ellipse key={angle} cx="0" cy="-8" rx="4.5" ry="8.5" transform={`rotate(${angle})`} />
      ))}
      <circle r="3" fill="#f5eafc" />
    </g>
  );
}

/**
 * 风信子插画。play 为 true 时播放生长动画，否则直接显示开好的样子。
 */
export default function Hyacinth({ play, onClick }) {
  return (
    <svg
      className="hyacinth"
      viewBox="0 0 200 320"
      role="img"
      aria-label="Hyacinth"
      onClick={onClick}
    >
      {/* 叶子 */}
      <motion.path
        d="M100 320 C70 280 58 240 62 196 C76 232 92 270 100 320 Z"
        fill={GREEN}
        style={{ originX: '100%', originY: '100%' }}
        initial={play ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
      />
      <motion.path
        d="M100 320 C130 280 142 244 138 206 C124 238 108 272 100 320 Z"
        fill={GREEN}
        opacity={0.8}
        style={{ originX: '0%', originY: '100%' }}
        initial={play ? { scale: 0 } : false}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.32, ease: 'easeOut' }}
      />

      {/* 茎 */}
      <motion.path
        d="M100 320 L100 30"
        stroke={GREEN}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        initial={play ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      {/* 小花 */}
      {FLORETS.map((f) => (
        <g key={f.id} transform={`translate(${f.x} ${f.y}) rotate(${f.rotate})`}>
          <motion.g
            initial={play ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: f.delay }}
          >
            <Floret color={f.color} />
          </motion.g>
        </g>
      ))}
    </svg>
  );
}
