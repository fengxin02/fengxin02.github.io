import { useEffect } from 'react';

/* ---- 弹簧相位器（HSL 颜色循环）---- */
function Phase(init) { this.init(init || {}); }
Phase.prototype = {
  init: function (o) {
    this.phase = o.phase || 0;
    this.offset = o.offset || 0;
    this.frequency = o.frequency || 0.001;
    this.amplitude = o.amplitude || 1;
  },
  update: function () {
    this.phase += this.frequency;
    return (this.offset + Math.sin(this.phase) * this.amplitude);
  },
};

/* ---- 单个节点 ---- */
function Node() {
  this.x = 0; this.y = 0; this.vy = 0; this.vx = 0;
}

/* ---- 配置 ---- */
var CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

/* ---- 全局状态 ---- */
var ctx, phase, pos = {}, lines = [];

/* ---- 一条拖尾线 ---- */
function Line(config) {
  this.spring = config.spring + 0.1 * Math.random() - 0.02;
  this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002;
  this.nodes = [];
  for (var i = 0; i < CONFIG.size; i++) {
    var node = new Node();
    node.x = pos.x;
    node.y = pos.y;
    this.nodes.push(node);
  }
}
Line.prototype = {
  update: function () {
    var spring = this.spring;
    var head = this.nodes[0];
    head.vx += (pos.x - head.x) * spring;
    head.vy += (pos.y - head.y) * spring;
    for (var i = 0, len = this.nodes.length; i < len; i++) {
      var node = this.nodes[i];
      if (i > 0) {
        var prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * CONFIG.dampening;
        node.vy += prev.vy * CONFIG.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= CONFIG.tension;
    }
  },
  draw: function () {
    var i, curr, next;
    var x = this.nodes[0].x;
    var y = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (i = 1; i < this.nodes.length - 2; i++) {
      curr = this.nodes[i];
      next = this.nodes[i + 1];
      x = 0.5 * (curr.x + next.x);
      y = 0.5 * (curr.y + next.y);
      ctx.quadraticCurveTo(curr.x, curr.y, x, y);
    }
    curr = this.nodes[i];
    next = this.nodes[i + 1];
    ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function onMousemove(e) {
  function initLines() {
    lines = [];
    for (var i = 0; i < CONFIG.trails; i++)
      lines.push(new Line({ spring: 0.4 + (i / CONFIG.trails) * 0.025 }));
  }
  function updatePos(e) {
    if (e.touches) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    e.preventDefault();
  }
  function touchStart(e) {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove);
  document.addEventListener('mousemove', updatePos);
  document.addEventListener('touchmove', updatePos);
  document.addEventListener('touchstart', touchStart);
  updatePos(e);
  initLines();
  render();
}

function render() {
  if (!ctx.running) return;
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  ctx.strokeStyle = 'hsla(' + Math.round(phase.update()) + ',50%,50%,0.2)';
  ctx.lineWidth = 1;
  for (var i = 0; i < CONFIG.trails; i++) {
    lines[i].update();
    lines[i].draw();
  }
  ctx.frame++;
  window.requestAnimationFrame(render);
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

export default function useCanvasCursor() {
  useEffect(function () {
    var canvas = document.getElementById('trail-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    ctx.running = true;
    ctx.frame = 1;

    phase = new Phase({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 45,   // 色相摆动范围：紫(270) -> 粉(315) -> 红(360)
      frequency: 0.0015,
      offset: 315,     // 中心点：粉色
    });

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.body.addEventListener('orientationchange', resizeCanvas);
    window.addEventListener('resize', resizeCanvas);

    var onFocus = function () { if (!ctx.running) { ctx.running = true; render(); } };
    var onBlur = function () { ctx.running = true; };
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    resizeCanvas();

    return function () {
      ctx.running = false;
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.body.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);
}
