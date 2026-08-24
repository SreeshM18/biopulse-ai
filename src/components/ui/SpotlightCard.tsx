import React, { useRef, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SpotlightCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'rose' | 'purple' | 'amber' | 'sky';
  interactive?: boolean;
}

const GLOW_MAP = {
  cyan: 'rgba(6, 182, 212, 0.14)',
  sky: 'rgba(2, 132, 199, 0.16)',
  emerald: 'rgba(16, 185, 129, 0.14)',
  rose: 'rgba(239, 68, 68, 0.16)',
  purple: 'rgba(139, 92, 246, 0.15)',
  amber: 'rgba(245, 158, 11, 0.14)'
};

const BORDER_GLOW_MAP = {
  cyan: 'rgba(6, 182, 212, 0.35)',
  sky: 'rgba(56, 189, 248, 0.4)',
  emerald: 'rgba(52, 211, 153, 0.35)',
  rose: 'rgba(248, 113, 113, 0.4)',
  purple: 'rgba(168, 85, 247, 0.35)',
  amber: 'rgba(251, 191, 36, 0.35)'
};

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  glowColor = 'sky',
  interactive = true,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={interactive ? { y: -2, transition: { duration: 0.18, ease: 'easeOut' } } : undefined}
      className={`relative overflow-hidden rounded-xl border border-[#1e2c44] bg-[#0c1220] transition-colors ${className}`}
      {...props}
    >
      {/* React Bits-style Cursor Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${GLOW_MAP[glowColor]}, transparent 75%)`
        }}
      />

      {/* Dynamic Border Spotlight Highlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl border transition-opacity duration-300 -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          borderColor: BORDER_GLOW_MAP[glowColor]
        }}
      />

      {/* Card Content Container */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
