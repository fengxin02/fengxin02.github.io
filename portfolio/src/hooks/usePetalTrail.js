import { useEffect, useRef } from 'react';

const COLORS = ['#c9a7e8', '#d4b5f0', '#b48be0'];
const SPAWN_DISTANCE = 110; // 鼠标每移动这么多像素掉一片
const MAX_PETALS = 24;
const LIFE_MS = 2800;

function createPetal(x, y) {
  return {
    x: x + (Math.random() - 0.5) * 20,
    y: y + (Math.random() - 0.5) * 20,
    vy: 0.3,
    age: 0,
    seed: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.03,
    size: 4 + Math.random() * 3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  };
}

function drawPetal(ctx, p) {
  const tumble = 0.8 + Math.cos(p.age * 0.0025 + p.seed) * 0.4; // 模拟花瓣翻转
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(tumble, 1);
  ctx.globalAlpha = 0.75 * (1 - p.age / LIFE_MS);
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * 自定义 Hook：鼠标移动时偶尔落下一片花瓣
 *
 * 只在有鼠标的设备上启用。没有花瓣时停止绘制循环，不占用性能。
 *
 * 使用方式：
 *   const canvasRef = usePetalTrail();
 *   return <canvas ref={canvasRef} />;
 */
export default function usePetalTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let petals = [];
    let frame = 0;
    let lastTime = 0;
    let lastX = null;
    let lastY = null;
    let travelled = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      petals = petals.filter((p) => p.age < LIFE_MS);
      petals.forEach((p) => {
        p.age += dt;
        p.vy = Math.min(p.vy + 0.0009 * dt, 1.1);
        p.y += p.vy * (dt / 16);
        p.x += Math.sin(p.age * 0.002 + p.seed) * 0.5 * (dt / 16);
        p.rotation += p.spin * (dt / 16);
        drawPetal(ctx, p);
      });

      frame = petals.length ? requestAnimationFrame(render) : 0;
    };

    const onMouseMove = (e) => {
      if (lastX !== null) travelled += Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;
      if (travelled < SPAWN_DISTANCE || petals.length >= MAX_PETALS) return;

      travelled = 0;
      petals.push(createPetal(e.clientX, e.clientY));
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(render);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return canvasRef;
}
