import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  animate = true
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.96 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ 
        duration: 0.7, 
        ease: [0.215, 0.610, 0.355, 1.000] 
      }}
      className={`glass-panel border border-[rgba(255,255,255,0.35)] rounded-[2rem] overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
