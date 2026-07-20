import React from 'react';
import { motion } from 'framer-motion';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ""
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3.5 rounded-full bg-primary-pink text-white font-heading font-medium tracking-wide animate-glow-pulse cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
};
