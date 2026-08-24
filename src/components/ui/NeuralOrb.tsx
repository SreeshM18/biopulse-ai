import React from 'react';
import { motion } from 'framer-motion';

interface NeuralOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: 'cyan' | 'purple' | 'rose' | 'emerald';
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-16 h-16',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
  xl: 'w-64 h-64'
};

const COLOR_MAP = {
  cyan: {
    core: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 40%, #0369a1 70%, transparent 100%)',
    glow: 'rgba(56, 189, 248, 0.45)',
    secondary: '#06b6d4'
  },
  purple: {
    core: 'radial-gradient(circle at 35% 35%, #c084fc 0%, #9333ea 40%, #6b21a8 70%, transparent 100%)',
    glow: 'rgba(192, 132, 252, 0.45)',
    secondary: '#a855f7'
  },
  rose: {
    core: 'radial-gradient(circle at 35% 35%, #fb7185 0%, #e11d48 40%, #9f1239 70%, transparent 100%)',
    glow: 'rgba(251, 113, 133, 0.45)',
    secondary: '#f43f5e'
  },
  emerald: {
    core: 'radial-gradient(circle at 35% 35%, #34d399 0%, #059669 40%, #065f46 70%, transparent 100%)',
    glow: 'rgba(52, 211, 153, 0.45)',
    secondary: '#10b981'
  }
};

export const NeuralOrb: React.FC<NeuralOrbProps> = ({
  size = 'md',
  glowColor = 'cyan',
  className = ''
}) => {
  const config = COLOR_MAP[glowColor];

  return (
    <div className={`relative flex items-center justify-center ${SIZE_MAP[size]} ${className}`}>
      {/* Outer Atmospheric Pulse Halo */}
      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          opacity: [0.35, 0.7, 0.35]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute inset-0 rounded-full blur-2xl -z-10"
        style={{ backgroundColor: config.glow }}
      />

      {/* Rotating Fluid Organic Plasma Core */}
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          borderRadius: ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 60% 70% 40% / 50% 60% 30% 60%', '60% 40% 30% 70% / 60% 30% 70% 40%']
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="w-full h-full rounded-full shadow-inner relative overflow-hidden backdrop-blur-sm"
        style={{
          background: config.core,
          boxShadow: `0 0 40px ${config.glow}, inset 0 0 20px rgba(255, 255, 255, 0.3)`
        }}
      >
        {/* Specular Light Flare */}
        <div className="absolute top-2 left-3 w-1/3 h-1/3 rounded-full bg-white/40 blur-[2px]" />
      </motion.div>
    </div>
  );
};
