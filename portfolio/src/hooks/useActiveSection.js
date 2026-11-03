import { useEffect, useState } from 'react';

// 判定线离屏幕顶部的距离。不能太靠下，否则跳到矮版块时，下一个版块也会越过这条线
const ACTIVE_LINE = 200;

/**
 * 自定义 Hook：找出当前正在看的版块
 *
 * 取顶部已经过了判定线的最后一个版块。滑到页面底部时固定选最后一个，
 * 因为最后的版块可能太矮，顶部到不了判定线。
 *
 * @param {string[]} ids - 各版块的 id，按页面顺序
 * @returns {string} 当前版块的 id
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const update = () => {
      const { scrollHeight } = document.documentElement;
      if (window.innerHeight + window.scrollY >= scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = id;
      });
      setActive(current);
    };

    const frame = requestAnimationFrame(update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}
