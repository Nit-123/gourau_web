import React from 'react';
import { motion } from 'framer-motion';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = ""
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04, y: -2, backgroundColor: "rgba(255, 255, 255, 0.4)" } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3.5 rounded-full border border-primary-pink/40 text-primary-pink bg-[rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 font-heading font-medium tracking-wide ${className}`}
    >
      {children}
    </motion.button>
  );
};
