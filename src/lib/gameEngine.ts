export type GameState = 'idle' | 'playing' | 'gameover';

export interface GameConfig {
  playerColor: string;
  playerGlowColor: string;
  playerRadius: number;
  bgColor: string;
  skylineColor: string;
  groundLineColor: string;
  groundGlowColor: string;
  obstacleColor: string;
  particleColor: string;
  trailColor: string;
  baseSpeed: number;
  gravity: number;
  jumpVelocity: number;
  maxJumps: number;
  ambientParticleCount: number;
  groundYPercent: number;
  scoreLabel: string;
  bestLabel: string;
}

export const DEFAULT_CONFIG: GameConfig = {
  playerColor: '#C6FF00',
  playerGlowColor: 'rgba(198,255,0,0.35)',
  playerRadius: 12,
  bgColor: '#1A1A1A',
  skylineColor: '#252525',
  groundLineColor: '#2F2F2F',
  groundGlowColor: 'rgba(47,47,47,0.5)',
  obstacleColor: '#8A8F98',
  particleColor: 'rgba(255,255,255,0.15)',
  trailColor: 'rgba(198,255,0,0.8)',
  baseSpeed: 400,
  gravity: 2500,
  jumpVelocity: -850,
  maxJumps: 2,
  ambientParticleCount: 30,
  groundYPercent: 0.85,
  scoreLabel: 'SCORE',
  bestLabel: 'BEST',
};

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; size: number;
  type: 'ambient' | 'trail' | 'jump' | 'death';
}

interface Obstacle {
  x: number; type: 'spike' | 'block' | 'gate';
  w: number; h: number; gapTop?: number; gapBottom?: number;
  scale: number;
}

interface Building {
  x: number; w: number; h: number;
}

export interface GameEngineOptions {
  canvas: HTMLCanvasElement;
  onScoreUpdate: (score: number) => void;
  onStateChange: (state: GameState) => void;
  onBestScore: (best: number) => void;
  config?: Partial<GameConfig>;
}

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cfg: GameConfig;
  private onScoreUpdate: (score: number) => void;
  private onStateChange: (state: GameState) => void;
  private onBestScore: (best: number) => void;

  private state: GameState = 'idle';
  private animId = 0;
  private lastTime = 0;

  private playerX = 0;
  private playerY = 0;
  private playerVY = 0;
  private jumpCount = 0;
  private groundY = 0;
  private idleTime = 0;

  private speed = 0;
  private distance = 0;
  private score = 0;
  private bestScore = 0;

  private particles: Particle[] = [];
  private obstacles: Obstacle[] = [];
  private buildings: Building[] = [];

  private obstacleTimer = 0;
  private nextObstacleTime = 1.5;

  private w = 0;
  private h = 0;
  private dpr = 1;

  private resizeHandler: () => void;

  constructor(options: GameEngineOptions) {
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext('2d')!;
    this.onScoreUpdate = options.onScoreUpdate;
    this.onStateChange = options.onStateChange;
    this.onBestScore = options.onBestScore;
    this.cfg = { ...DEFAULT_CONFIG, ...options.config };

    this.bestScore = parseInt(localStorage.getItem('runner_best_score') || '0', 10);
    this.onBestScore(this.bestScore);

    this.resizeHandler = () => this.resize();
    window.addEventListener('resize', this.resizeHandler);
    this.resize();
    this.initBuildings();
    this.initAmbientParticles();
    this.resetPlayer();
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  updateConfig(config: Partial<GameConfig>) {
    this.cfg = { ...this.cfg, ...config };
  }

  private resize() {
    const rect = this.canvas.parentElement!.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.w = rect.width;
    this.h = this.canvas.parentElement!.clientHeight;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.groundY = this.h * this.cfg.groundYPercent;
    this.playerX = this.w * 0.2;
  }

  private initBuildings() {
    this.buildings = [];
    let x = 0;
    const totalWidth = this.w * 2.5;
    while (x < totalWidth) {
      const w = 40 + Math.random() * 80;
      const h = 50 + Math.random() * 150;
      this.buildings.push({ x, w, h });
      x += w + 10 + Math.random() * 30;
    }
  }

  private initAmbientParticles() {
    for (let i = 0; i < this.cfg.ambientParticleCount; i++) {
      this.particles.push({
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        vx: -(10 + Math.random() * 20),
        vy: -(5 + Math.random() * 10),
        life: 999, maxLife: 999, size: 1 + Math.random() * 1.5,
        type: 'ambient',
      });
    }
  }

  private resetPlayer() {
    this.groundY = this.h * this.cfg.groundYPercent;
    this.playerX = this.w * 0.2;
    this.playerY = this.groundY - this.cfg.playerRadius;
    this.playerVY = 0;
    this.jumpCount = 0;
  }

  start() {
    this.obstacles = [];
    this.particles = this.particles.filter(p => p.type === 'ambient');
    this.distance = 0;
    this.score = 0;
    this.speed = this.cfg.baseSpeed;
    this.obstacleTimer = 0;
    this.nextObstacleTime = 1.5;
    this.resetPlayer();
    this.state = 'playing';
    this.onScoreUpdate(0);
    this.onStateChange('playing');
  }

  jump() {
    if (this.state === 'idle') {
      this.start();
      return;
    }
    if (this.state !== 'playing') return;
    if (this.jumpCount < this.cfg.maxJumps) {
      this.playerVY = this.cfg.jumpVelocity;
      this.jumpCount++;
      this.spawnJumpBurst();
    }
  }

  private spawnJumpBurst() {
    for (let i = 0; i < 10; i++) {
      this.particles.push({
        x: this.playerX, y: this.playerY,
        vx: (Math.random() - 0.5) * 200,
        vy: -(20 + Math.random() * 50),
        life: 0.5 + Math.random() * 0.5, maxLife: 0.7,
        size: 2 + Math.random() * 3, type: 'jump',
      });
    }
  }

  private spawnDeathExplosion() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: this.playerX, y: this.playerY,
        vx: (Math.random() - 0.5) * 800,
        vy: (Math.random() - 0.5) * 800,
        life: 1 + Math.random(), maxLife: 2,
        size: 2 + Math.random() * 4, type: 'death',
      });
    }
  }

  private gameOver() {
    this.state = 'gameover';
    this.spawnDeathExplosion();
    if (this.score > this.bestScore) {
      this.bestScore = this.score;
      localStorage.setItem('runner_best_score', String(this.bestScore));
      this.onBestScore(this.bestScore);
    }
    this.onStateChange('gameover');
  }

  private loop = (time: number) => {
    let dt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (dt > 0.1) dt = 0.1;

    this.update(dt);
    this.render();
    this.animId = requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    this.idleTime += dt;

    // Ambient particles
    for (const p of this.particles) {
      if (p.type === 'ambient') {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -5) p.x = this.w + 5;
        if (p.y < -5) p.y = this.h + 5;
      }
    }

    if (this.state === 'idle') {
      this.playerY = this.groundY - this.cfg.playerRadius + Math.sin(this.idleTime * 3) * 5;
      return;
    }

    if (this.state === 'gameover') {
      // Still update death particles
      this.updateParticles(dt);
      return;
    }

    // Playing state
    this.speed = this.cfg.baseSpeed + this.score * 0.5;
    this.distance += this.speed * dt;
    this.score = Math.floor(this.distance / 40);
    this.onScoreUpdate(this.score);

    // Player physics
    this.playerVY += this.cfg.gravity * dt;
    this.playerY += this.playerVY * dt;
    if (this.playerY >= this.groundY - this.cfg.playerRadius) {
      this.playerY = this.groundY - this.cfg.playerRadius;
      this.playerVY = 0;
      this.jumpCount = 0;
    }

    // Buildings parallax
    const parallaxSpeed = this.speed * 0.3;
    for (const b of this.buildings) {
      b.x -= parallaxSpeed * dt;
    }
    const leftmost = this.buildings.reduce((a, b) => a.x < b.x ? a : b);
    const rightmost = this.buildings.reduce((a, b) => a.x + a.w > b.x + b.w ? a : b);
    if (leftmost.x + leftmost.w < -10) {
      leftmost.x = rightmost.x + rightmost.w + 10 + Math.random() * 30;
      leftmost.h = 50 + Math.random() * 150;
      leftmost.w = 40 + Math.random() * 80;
    }

    // Spawn obstacles
    this.obstacleTimer += dt;
    if (this.obstacleTimer >= this.nextObstacleTime) {
      this.obstacleTimer = 0;
      this.nextObstacleTime = Math.max(0.6, 1.5 - (this.speed - this.cfg.baseSpeed) / 1000) + Math.random() * 0.8;
      this.spawnObstacle();
    }

    // Update obstacles
    for (const obs of this.obstacles) {
      obs.x -= this.speed * dt;
      if (obs.scale < 1) obs.scale = Math.min(1, obs.scale + dt * 5);
    }
    this.obstacles = this.obstacles.filter(o => o.x + o.w > -60);

    // Trail particles
    const isAirborne = this.playerY < this.groundY - this.cfg.playerRadius - 2;
    if (Math.random() < (isAirborne ? 1 : 0.3)) {
      this.particles.push({
        x: this.playerX - this.cfg.playerRadius + (Math.random() - 0.5) * 6,
        y: this.playerY + (Math.random() - 0.5) * 6,
        vx: -(this.speed * 0.2),
        vy: (Math.random() - 0.5) * 40,
        life: 0.3 + Math.random() * 0.4, maxLife: 0.7,
        size: 2 + Math.random() * 2, type: 'trail',
      });
    }

    this.updateParticles(dt);
    this.checkCollisions();
  }

  private updateParticles(dt: number) {
    for (const p of this.particles) {
      if (p.type === 'ambient') continue;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
    }
    this.particles = this.particles.filter(p => p.type === 'ambient' || p.life > 0);
  }

  private spawnObstacle() {
    const types: Array<'spike' | 'block' | 'gate'> = this.score < 200
      ? ['spike', 'block']
      : ['spike', 'block', 'gate'];
    const type = types[Math.floor(Math.random() * types.length)];

    const obs: Obstacle = {
      x: this.w + 50, type, w: 30, h: 40, scale: 0,
    };

    switch (type) {
      case 'spike':
        obs.w = 30; obs.h = 40;
        break;
      case 'block':
        obs.w = 40; obs.h = 40 + Math.random() * 20;
        break;
      case 'gate':
        obs.w = 20;
        obs.gapTop = this.groundY - 150;
        obs.gapBottom = this.groundY - 40;
        obs.h = this.groundY;
        break;
    }
    this.obstacles.push(obs);
  }

  private checkCollisions() {
    const r = this.cfg.playerRadius * 0.8;
    const px = this.playerX;
    const py = this.playerY;

    for (const obs of this.obstacles) {
      if (obs.scale < 0.5) continue;
      const s = obs.scale;

      if (obs.type === 'spike') {
        const sw = obs.w * 0.6 * s;
        const sh = obs.h * 0.7 * s;
        const sx = obs.x + (obs.w - sw) / 2;
        const sy = this.groundY - sh;
        if (this.circleRect(px, py, r, sx, sy, sw, sh)) {
          this.gameOver(); return;
        }
      } else if (obs.type === 'block') {
        const bw = obs.w * s;
        const bh = obs.h * s;
        if (this.circleRect(px, py, r, obs.x, this.groundY - bh, bw, bh)) {
          this.gameOver(); return;
        }
      } else if (obs.type === 'gate') {
        const gw = obs.w * s;
        // Top pillar
        if (this.circleRect(px, py, r, obs.x, 0, gw, obs.gapTop! * s)) {
          this.gameOver(); return;
        }
        // Bottom pillar
        if (this.circleRect(px, py, r, obs.x, obs.gapBottom!, gw, this.groundY - obs.gapBottom!)) {
          this.gameOver(); return;
        }
      }
    }
  }

  private circleRect(cx: number, cy: number, cr: number, rx: number, ry: number, rw: number, rh: number): boolean {
    const nearX = Math.max(rx, Math.min(cx, rx + rw));
    const nearY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - nearX;
    const dy = cy - nearY;
    return dx * dx + dy * dy < cr * cr;
  }

  private render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    // BG — transparent, no fill

    // Skyline
    ctx.fillStyle = this.cfg.skylineColor;
    for (const b of this.buildings) {
      ctx.fillRect(b.x, this.groundY - b.h, b.w, b.h);
    }

    // Ambient particles
    for (const p of this.particles) {
      if (p.type !== 'ambient') continue;
      ctx.fillStyle = this.cfg.particleColor;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Ground line
    ctx.save();
    ctx.strokeStyle = this.cfg.groundLineColor;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.cfg.groundGlowColor;
    ctx.beginPath();
    ctx.moveTo(0, this.groundY);
    ctx.lineTo(this.w, this.groundY);
    ctx.stroke();
    ctx.restore();

    // Obstacles
    for (const obs of this.obstacles) {
      ctx.save();
      ctx.fillStyle = this.cfg.obstacleColor;
      const s = obs.scale;
      if (obs.type === 'spike') {
        const cx = obs.x + obs.w / 2;
        const by = this.groundY;
        ctx.beginPath();
        ctx.moveTo(cx, by - obs.h * s);
        ctx.lineTo(cx - (obs.w / 2) * s, by);
        ctx.lineTo(cx + (obs.w / 2) * s, by);
        ctx.closePath();
        ctx.fill();
      } else if (obs.type === 'block') {
        const bh = obs.h * s;
        ctx.fillRect(obs.x, this.groundY - bh, obs.w * s, bh);
      } else if (obs.type === 'gate') {
        const gw = obs.w * s;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(138,143,152,0.5)';
        ctx.fillRect(obs.x, 0, gw, obs.gapTop! * s);
        ctx.fillRect(obs.x, obs.gapBottom!, gw, this.groundY - obs.gapBottom!);
      }
      ctx.restore();
    }

    // Trail / jump / death particles
    for (const p of this.particles) {
      if (p.type === 'ambient') continue;
      const alpha = Math.max(0, p.life / p.maxLife);
      const sz = p.size * alpha;
      if (p.type === 'trail' || p.type === 'jump' || p.type === 'death') {
        ctx.fillStyle = `rgba(198,255,0,${alpha * 0.8})`;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, sz), 0, Math.PI * 2);
      ctx.fill();
    }

    // Player
    if (this.state !== 'gameover') {
      ctx.save();
      ctx.fillStyle = this.cfg.playerColor;
      ctx.shadowBlur = 20;
      ctx.shadowColor = this.cfg.playerGlowColor;
      ctx.beginPath();
      ctx.arc(this.playerX, this.playerY, this.cfg.playerRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  getState(): GameState {
    return this.state;
  }

  destroy() {
    cancelAnimationFrame(this.animId);
    window.removeEventListener('resize', this.resizeHandler);
  }
}
