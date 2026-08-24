import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface PulseHeartbeatProps {
  bpm?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

const SIZE_MAP = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-6 w-6'
};

export const PulseHeartbeat: React.FC<PulseHeartbeatProps> = ({
  bpm = 75,
  size = 'md',
  className = '',
  color = 'text-rose-400'
}) => {
  // Compute cardiac period in seconds (e.g. 75 bpm -> 0.8s)
  const duration = Math.max(0.35, Math.min(1.5, 60 / Math.max(40, bpm)));

  return (
    <motion.div
      animate={{
        scale: [1, 1.25, 0.95, 1.18, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.15, 0.3, 0.45, 1]
      }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <Heart className={`${SIZE_MAP[size]} ${color} fill-current`} />
    </motion.div>
  );
};
