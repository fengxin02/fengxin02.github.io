import { useEffect, useState } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

// 这些数值要和 index.css 里的 --page-max、--rail-w 保持一致
const DESKTOP_QUERY = '(min-width: 1024px)';
const PAGE_MAX = 1560;
const RAIL_MAX = 480;
const RAIL_RATIO = 0.34;
const RAIL_SCALE = 0.55;

function readViewport() {
  return {
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
    desktop: window.matchMedia(DESKTOP_QUERY).matches,
  };
}

/**
 * 自定义 Hook：滚动时把风信子和名字从屏幕中间移到左栏
 *
 * 只在桌面宽度启用，手机上它们跟着页面正常滚走。
 *
 * @returns 可以直接传给 motion 组件 style 的动画值
 */
export default function useHeroRail() {
  const [view, setView] = useState(readViewport);

  useEffect(() => {
    // 内容变长后滚动条出现也会改变可用宽度，window resize 监听不到
    const update = () => setView(readViewport());
    const observer = new ResizeObserver(update);
    observer.observe(document.documentElement);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const { scrollY } = useScroll();
  const travel = view.height * 0.75;
  const railLeft = Math.max(0, (view.width - PAGE_MAX) / 2);
  const railWidth = Math.min(window.innerWidth * RAIL_RATIO, RAIL_MAX);
  const railOffset = railLeft + railWidth / 2 - view.width / 2;

  const progress = useSpring(useTransform(scrollY, [0, travel], [0, 1]), {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  const x = useTransform(progress, [0, 1], [0, railOffset]);
  const scale = useTransform(progress, [0, 1], [1, RAIL_SCALE]);
  const textOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  // 等名字快到左栏再淡入，移动途中不和简介叠在一起
  const railOpacity = useTransform(progress, [0.8, 1], [0, 1]);
  const railVisibility = useTransform(railOpacity, (v) => (v < 0.02 ? 'hidden' : 'visible'));
  const hintOpacity = useTransform(scrollY, [0, travel * 0.3], [1, 0]);

  return { desktop: view.desktop, x, scale, textOpacity, railOpacity, railVisibility, hintOpacity };
}
