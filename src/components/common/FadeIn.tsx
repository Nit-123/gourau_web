import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 15,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.215, 0.610, 0.355, 1.000] // Custom smooth cubic-bezier easeOut
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
