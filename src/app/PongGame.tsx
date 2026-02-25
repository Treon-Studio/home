'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import './pong-game.css';

type GameState = 'waiting' | 'playing' | 'gameover';

const MAX_LIVES = 3;

function getThemeColors() {
  return {
    fg: 'oklch(0.92 0.04 75)',
    muted: 'oklch(0.55 0.04 55 / 0.5)',
  };
}

/** Scale game dimensions relative to canvas size */
function getGameConfig(w: number, h: number) {
  const scale = Math.min(w, h) / 300;
  return {
    paddleHeight: Math.round(Math.max(30, 40 * scale)),
    paddleWidth: Math.round(Math.max(5, 6 * scale)),
    ballSize: Math.round(Math.max(5, 6 * scale)),
    paddleOffset: Math.round(Math.max(10, 14 * scale)),
    ballSpeedInitial: Math.max(1.5, 2.2 * scale),
    ballSpeedIncrement: 0.12 * scale,
    ballSpeedMax: 5 * scale,
    aiSpeed: Math.max(1.2, 2 * scale),
  };
}

function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export default function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const colorsRef = useRef({ fg: '', muted: '' });
  const configRef = useRef(getGameConfig(540, 304));
  const gameRef = useRef({
    ballX: 0,
    ballY: 0,
    ballVX: 0,
    ballVY: 0,
    ballSpeed: 2.2,
    pingY: 0,
    pongY: 0,
    width: 0,
    height: 0,
    lives: MAX_LIVES,
    score: 0,
    flash: 0,
    flashColor: '',
    state: 'waiting' as GameState,
    touching: false,
  });
  const mouseYRef = useRef(0);
  const animFrameRef = useRef(0);

  const resetBall = useCallback((g: typeof gameRef.current, direction: number) => {
    const cfg = configRef.current;
    g.ballX = g.width / 2;
    g.ballY = g.height / 2;
    const angle = Math.random() * 0.8 - 0.4;
    g.ballVX = Math.cos(angle) * g.ballSpeed * direction;
    g.ballVY = Math.sin(angle) * g.ballSpeed;
    // Ensure minimum horizontal velocity
    if (Math.abs(g.ballVX) < cfg.ballSpeedInitial * 0.5) {
      g.ballVX = cfg.ballSpeedInitial * 0.5 * direction;
    }
  }, []);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    const cfg = configRef.current;
    g.lives = MAX_LIVES;
    g.score = 0;
    g.ballSpeed = cfg.ballSpeedInitial;
    g.state = 'playing';
    g.flash = 0;
    setLives(MAX_LIVES);
    setScore(0);
    setGameState('playing');
    resetBall(g, 1);
  }, [resetBall]);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;

    const refreshColors = () => {
      colorsRef.current = getThemeColors();
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gameRef.current.width = w;
      gameRef.current.height = h;
      configRef.current = getGameConfig(w, h);
      const cfg = configRef.current;
      gameRef.current.pingY = h / 2 - cfg.paddleHeight / 2;
      gameRef.current.pongY = h / 2 - cfg.paddleHeight / 2;
      refreshColors();
    };

    resize();
    window.addEventListener('resize', resize);

    const observer = new MutationObserver(refreshColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // --- Input handlers ---
    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return; // handled by touch events
      const rect = canvas.getBoundingClientRect();
      mouseYRef.current = e.clientY - rect.top;
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouseYRef.current = e.touches[0].clientY - rect.top;
      gameRef.current.touching = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      mouseYRef.current = e.touches[0].clientY - rect.top;
    };

    const handleTouchEnd = () => {
      gameRef.current.touching = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') mouseYRef.current -= 20;
      if (e.key === 'ArrowDown') mouseYRef.current += 20;
      if ((e.key === ' ' || e.key === 'Enter') && gameRef.current.state !== 'playing') {
        startGame();
      }
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('keydown', handleKeyDown);

    // --- Drawing helpers ---
    const drawDottedLine = (x: number, y1: number, y2: number) => {
      const dashLen = 6;
      const gapLen = 6;
      let y = y1;
      ctx.beginPath();
      while (y < y2) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, Math.min(y + dashLen, y2));
        y += dashLen + gapLen;
      }
      ctx.strokeStyle = colorsRef.current.muted;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const vibrate = (ms: number) => {
      try { navigator?.vibrate?.(ms); } catch {}
    };

    // --- Game loop ---
    const loop = () => {
      const g = gameRef.current;
      const cfg = configRef.current;
      const { width: w, height: h } = g;
      const { fg } = colorsRef.current;

      if (g.state === 'playing') {
        // Player paddle — responsive follow with faster tracking on touch
        const lerpFactor = g.touching ? 0.3 : 0.15;
        const targetY = mouseYRef.current - cfg.paddleHeight / 2;
        g.pingY += (targetY - g.pingY) * lerpFactor;
        g.pingY = Math.max(0, Math.min(h - cfg.paddleHeight, g.pingY));

        // AI paddle
        const aiTarget = g.ballY - cfg.paddleHeight / 2 + Math.sin(Date.now() / 400) * 8;
        const aiDiff = aiTarget - g.pongY;
        g.pongY += Math.sign(aiDiff) * Math.min(Math.abs(aiDiff), cfg.aiSpeed);
        g.pongY = Math.max(0, Math.min(h - cfg.paddleHeight, g.pongY));

        // Ball movement
        g.ballX += g.ballVX;
        g.ballY += g.ballVY;

        // Top/bottom bounce
        if (g.ballY <= 0) {
          g.ballY = 0;
          g.ballVY = Math.abs(g.ballVY);
        }
        if (g.ballY >= h - cfg.ballSize) {
          g.ballY = h - cfg.ballSize;
          g.ballVY = -Math.abs(g.ballVY);
        }

        // Left paddle (player) collision
        if (
          g.ballX <= cfg.paddleOffset + cfg.paddleWidth &&
          g.ballX >= cfg.paddleOffset - cfg.ballSize &&
          g.ballY + cfg.ballSize >= g.pingY &&
          g.ballY <= g.pingY + cfg.paddleHeight
        ) {
          g.ballX = cfg.paddleOffset + cfg.paddleWidth;
          const hitPos = (g.ballY + cfg.ballSize / 2 - g.pingY) / cfg.paddleHeight - 0.5;
          const angle = hitPos * 1.2;
          g.ballSpeed = Math.min(g.ballSpeed + cfg.ballSpeedIncrement, cfg.ballSpeedMax);
          g.ballVX = Math.cos(angle) * g.ballSpeed;
          g.ballVY = Math.sin(angle) * g.ballSpeed;
          g.score++;
          setScore(g.score);
          g.flash = 6;
          g.flashColor = '#22c55e';
          vibrate(15);
        }

        // Right paddle (AI) collision
        if (
          g.ballX + cfg.ballSize >= w - cfg.paddleOffset - cfg.paddleWidth &&
          g.ballX + cfg.ballSize <= w - cfg.paddleOffset + cfg.ballSize &&
          g.ballY + cfg.ballSize >= g.pongY &&
          g.ballY <= g.pongY + cfg.paddleHeight
        ) {
          g.ballX = w - cfg.paddleOffset - cfg.paddleWidth - cfg.ballSize;
          const hitPos = (g.ballY + cfg.ballSize / 2 - g.pongY) / cfg.paddleHeight - 0.5;
          const angle = Math.PI - hitPos * 1.2;
          g.ballVX = Math.cos(angle) * g.ballSpeed;
          g.ballVY = Math.sin(angle) * g.ballSpeed;
        }

        // Ball out left (player miss)
        if (g.ballX < -cfg.ballSize * 2) {
          g.lives--;
          setLives(g.lives);
          g.flash = 10;
          g.flashColor = '#ef4444';
          vibrate(80);
          if (g.lives <= 0) {
            g.state = 'gameover';
            setGameState('gameover');
            vibrate(200);
          } else {
            g.ballSpeed = cfg.ballSpeedInitial;
            resetBall(g, 1);
          }
        }

        // Ball out right (AI miss)
        if (g.ballX > w + cfg.ballSize * 2) {
          g.score++;
          setScore(g.score);
          g.ballSpeed = Math.min(g.ballSpeed + cfg.ballSpeedIncrement, cfg.ballSpeedMax);
          resetBall(g, -1);
        }
      }

      // Flash decay
      if (g.flash > 0) g.flash--;

      // --- draw ---
      ctx.clearRect(0, 0, w, h);

      // Flash
      if (g.flash > 0) {
        ctx.fillStyle = g.flashColor;
        ctx.globalAlpha = (g.flash / 10) * 0.12;
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      }

      // Net
      drawDottedLine(w / 2, 0, h);

      // Paddles
      ctx.fillStyle = fg;
      // Rounded paddle helper
      const drawPaddle = (x: number, y: number, pw: number, ph: number) => {
        const r = pw / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + pw - r, y);
        ctx.quadraticCurveTo(x + pw, y, x + pw, y + r);
        ctx.lineTo(x + pw, y + ph - r);
        ctx.quadraticCurveTo(x + pw, y + ph, x + pw - r, y + ph);
        ctx.lineTo(x + r, y + ph);
        ctx.quadraticCurveTo(x, y + ph, x, y + ph - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
      };

      drawPaddle(cfg.paddleOffset, g.pingY, cfg.paddleWidth, cfg.paddleHeight);
      drawPaddle(w - cfg.paddleOffset - cfg.paddleWidth, g.pongY, cfg.paddleWidth, cfg.paddleHeight);

      // Ball
      if (g.state === 'playing') {
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.arc(
          g.ballX + cfg.ballSize / 2,
          g.ballY + cfg.ballSize / 2,
          cfg.ballSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Ball trail
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(
          g.ballX - g.ballVX * 2 + cfg.ballSize / 2,
          g.ballY - g.ballVY * 2 + cfg.ballSize / 2,
          cfg.ballSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.globalAlpha = 0.06;
        ctx.beginPath();
        ctx.arc(
          g.ballX - g.ballVX * 4 + cfg.ballSize / 2,
          g.ballY - g.ballVY * 4 + cfg.ballSize / 2,
          cfg.ballSize / 2,
          0,
          Math.PI * 2,
        );
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [startGame, resetBall]);

  return (
    <div className="pong-wrapper">
      <div className="pong-container">
        {/* HUD */}
        <div className="pong-header">
          <div className="pong-lives">
            Lives:{' '}
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} className={i < lives ? 'pong-heart active' : 'pong-heart'}>
                {i < lives ? '\u2588' : '\u2591'}
              </span>
            ))}
          </div>
          <div className="pong-title">404</div>
          <div className="pong-score">Score: {score}</div>
        </div>

        {/* Game field */}
        <div ref={containerRef} className="pong-field">
          <canvas ref={canvasRef} className="pong-canvas" />

          {/* Waiting screen */}
          {gameState === 'waiting' && (
            <div className="pong-overlay">
              <div className="pong-overlay-text">
                <p className="pong-404">404</p>
                <p className="pong-sub">Page not found</p>
                <button onClick={startGame} className="pong-btn">
                  Start Game
                </button>
                <p className="pong-hint">
                  {isTouch ? 'Drag to control paddle' : 'Move mouse to control paddle'}
                </p>
              </div>
            </div>
          )}

          {/* Game over screen */}
          {gameState === 'gameover' && (
            <div className="pong-overlay">
              <div className="pong-overlay-text">
                <p className="pong-gameover">Game Over</p>
                <p className="pong-final-score">Score: {score}</p>
                <button onClick={startGame} className="pong-btn">
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
