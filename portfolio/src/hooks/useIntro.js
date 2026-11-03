import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'fengxin-intro-seen';
const INTRO_MS = 2000;      // 开场总时长：茎、叶、小花、名字
const BURST_TAIL_MS = 2000; // 开场结束后，再留时间让花瓣落完

function shouldPlay() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return true;
  }
}

/**
 * 自定义 Hook：控制风信子开场的播放状态
 *
 * 同一个标签页只自动播放一次，播放中点击或按键可跳过。
 *
 * @returns {{ playing: boolean, run: number, replay: () => void }}
 *   playing - 开场是否正在播放
 *   run     - 大于 0 时花瓣还在飘落，同时作为每次播放的 key
 *   replay  - 重新播放一次
 */
export default function useIntro() {
  const [playing, setPlaying] = useState(shouldPlay);
  const [run, setRun] = useState(() => (playing ? 1 : 0));

  // 按时间推进：先结束开场，花瓣落完后再卸载
  useEffect(() => {
    if (!run) return;
    const finish = setTimeout(() => setPlaying(false), INTRO_MS);
    const clear = setTimeout(() => setRun(0), INTRO_MS + BURST_TAIL_MS);
    return () => {
      clearTimeout(finish);
      clearTimeout(clear);
    };
  }, [run]);

  // 只有开场播放时才能跳过，之后的点击不影响还在飘的花瓣
  useEffect(() => {
    if (!playing) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // 隐私模式可能禁用存储，开场照常播放
    }
    const skip = () => {
      setPlaying(false);
      setRun(0);
    };
    window.addEventListener('click', skip);
    window.addEventListener('keydown', skip);
    return () => {
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', skip);
    };
  }, [playing]);

  const replay = useCallback(() => {
    setPlaying(true);
    setRun((r) => r + 1);
  }, []);

  return { playing, run, replay };
}
