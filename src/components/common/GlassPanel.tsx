import React from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = "",
  hoverGlow = false
}) => {
  return (
    <motion.div
      whileHover={hoverGlow ? { 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      } : undefined}
      className={`glass-panel rounded-3xl p-6 md:p-8 transition-shadow duration-300 ${
        hoverGlow ? 'hover:shadow-[0_12px_40px_rgba(211,82,113,0.18)]' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};
