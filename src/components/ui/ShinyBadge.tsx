import React from 'react';
import { motion } from 'framer-motion';

interface ShinyBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'rose' | 'amber' | 'purple' | 'slate';
  icon?: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES = {
  cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60',
  emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
  rose: 'bg-rose-950/80 text-rose-300 border-rose-700/60',
  amber: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
  purple: 'bg-purple-950/80 text-purple-300 border-purple-700/60',
  slate: 'bg-slate-900/90 text-slate-300 border-slate-700/60'
};

export const ShinyBadge: React.FC<ShinyBadgeProps> = ({
  children,
  variant = 'cyan',
  icon,
  className = ''
}) => {
  return (
    <div className={`relative inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide border overflow-hidden select-none ${VARIANT_STYLES[variant]} ${className}`}>
      
      {/* Moving Light Sheen Animation */}
      <motion.div
        initial={{ x: '-120%' }}
        animate={{ x: '180%' }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', repeatDelay: 1 }}
        className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
      />

      {icon && <span className="shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </div>
  );
};
