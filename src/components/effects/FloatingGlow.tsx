import React from 'react';
import { motion } from 'framer-motion';

interface FloatingGlowProps {
  color?: string;
  size?: string;
  delay?: number;
  className?: string;
}

export const FloatingGlow: React.FC<FloatingGlowProps> = ({
  color = "bg-[radial-gradient(circle,rgba(211,82,113,0.18)_0%,rgba(211,82,113,0)_70%)]",
  size = "w-[30rem] h-[30rem] md:w-[45rem] md:h-[45rem]",
  delay = 0,
  className = ""
}) => {
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0.9 }}
      animate={{
        x: [0, 50, -30, 20, 0],
        y: [0, -60, 40, -30, 0],
        scale: [0.9, 1.1, 0.95, 1.05, 0.9],
      }}
      transition={{
        duration: 16,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-[80px] pointer-events-none -z-10 ${size} ${color} ${className}`}
    />
  );
};
