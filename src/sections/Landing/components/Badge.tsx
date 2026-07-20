import React from 'react';
import { motion } from 'framer-motion';

export const Badge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: 0.2, 
        ease: [0.215, 0.610, 0.355, 1.000] 
      }}
      className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full border border-primary-pink/20 bg-primary-pink/5 shadow-[0_2px_10px_rgba(211,82,113,0.05)] animate-pulse-subtle select-none cursor-default"
    >
      <span className="text-xs font-heading font-medium text-primary-pink tracking-[0.08em] uppercase">
        A Little Something For You ❤️
      </span>
    </motion.div>
  );
};
export default Badge;
