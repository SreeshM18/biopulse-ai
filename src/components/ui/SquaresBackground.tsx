import React, { useRef, useEffect } from 'react';

interface SquaresBackgroundProps {
  squareSize?: number;
  gridColor?: string;
  glowColor?: string;
  speed?: number;
  className?: string;
}

export const SquaresBackground: React.FC<SquaresBackgroundProps> = ({
  squareSize = 40,
  gridColor = 'rgba(30, 44, 68, 0.45)',
  glowColor = 'rgba(6, 182, 212, 0.35)',
  speed = 0.5,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const numCols = Math.ceil(width / squareSize) + 1;
      const numRows = Math.ceil(height / squareSize) + 1;

      offset = (offset + speed * 0.15) % squareSize;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows; row++) {
          const x = col * squareSize - offset;
          const y = row * squareSize;

          // Check distance from cursor
          const cx = x + squareSize / 2;
          const cy = y + squareSize / 2;
          const dist = Math.hypot(mouseX - cx, mouseY - cy);
          const maxDist = 200;

          // Subtle harmonic wave flickering
          const flicker = Math.sin(col * 0.4 + row * 0.4 + Date.now() * 0.002) * 0.5 + 0.5;

          ctx.strokeStyle = gridColor;
          ctx.lineWidth = 0.8;
          ctx.strokeRect(x, y, squareSize, squareSize);

          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist;
            ctx.fillStyle = glowColor;
            ctx.globalAlpha = proximity * 0.45;
            ctx.fillRect(x + 1, y + 1, squareSize - 2, squareSize - 2);

            ctx.strokeStyle = '#38bdf8';
            ctx.globalAlpha = proximity * 0.7;
            ctx.strokeRect(x, y, squareSize, squareSize);
          } else if (flicker > 0.92) {
            // Rare subtle neon cell pulse
            ctx.fillStyle = 'rgba(6, 182, 212, 0.08)';
            ctx.globalAlpha = (flicker - 0.92) * 4;
            ctx.fillRect(x + 1, y + 1, squareSize - 2, squareSize - 2);
          }

          ctx.globalAlpha = 1.0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [squareSize, gridColor, glowColor, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60 ${className}`}
    />
  );
};
