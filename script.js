const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const PARTICLES = isMobile ? 30 : 60;
const GRAVITY = 0.04;
const FRICTION = 0.98;

class Particle {
  constructor(x, y) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * (isMobile ? 3 : 5);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.x = x;
    this.y = y;
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 360},100%,60%)`;
  }
  update() {
    this.vx *= FRICTION;
    this.vy = this.vy * FRICTION + GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.015;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, isMobile ? 1.5 : 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

let fireworks = [];

function explode() {
  const x = Math.random() * w;
  const y = Math.random() * h * 0.6;
  for (let i = 0; i < PARTICLES; i++) {
    fireworks.push(new Particle(x, y));
  }
}

setInterval(explode, isMobile ? 1200 : 800);

function animate() {
  ctx.clearRect(0, 0, w, h);
  fireworks = fireworks.filter(p => p.alpha > 0);
  fireworks.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

animate();