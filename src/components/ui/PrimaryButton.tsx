import React from 'react';
import { motion } from 'framer-motion';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ""
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04, y: -2 } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3.5 rounded-full bg-primary-pink text-white font-heading font-medium tracking-wide shadow-[0_4px_15px_rgba(211,82,113,0.3)] hover:bg-primary-pink-hover hover:shadow-[0_6px_20px_rgba(211,82,113,0.45)] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 ${className}`}
    >
      {children}
    </motion.button>
  );
};
