import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloatingGlow } from '../../components/effects/FloatingGlow';
import { FloatingParticles } from '../../components/effects/FloatingParticles';

interface CinematicTransitionProps {
  onComplete: () => void;
}

export const CinematicTransition: React.FC<CinematicTransitionProps> = ({ onComplete }) => {
  useEffect(() => {
    // Navigate automatically after 5 seconds (5000ms)
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    // Disable scrolling when transition is active
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#fff3f5] overflow-hidden select-none"
    >
      {/* Background Ambience Glows */}
      <FloatingGlow delay={0} className="top-[-10%] left-[-10%] bg-[radial-gradient(circle,rgba(211,82,113,0.15)_0%,rgba(211,82,113,0)_70%)] w-[50rem] h-[50rem]" />
      <FloatingGlow delay={2} className="bottom-[-15%] right-[-10%] bg-[radial-gradient(circle,rgba(229,176,185,0.22)_0%,rgba(229,176,185,0)_75%)] w-[55rem] h-[55rem]" />
      
      {/* Gentle Floating Drifting Particles */}
      <FloatingParticles />

      {/* Center Cinematic Container */}
      <div className="z-10 text-center px-6 max-w-lg flex flex-col items-center gap-6">
        {/* Quote text animations: Fade in, hold, fade out */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            times: [0, 0.2, 0.8, 1], // 1s fade-in, 3s hold, 1s fade-out
            duration: 5,
            ease: 'easeInOut',
          }}
          className="text-base md:text-xl font-heading font-light text-text-primary/90 italic leading-[1.8] tracking-wide"
        >
          "I made this because you deserve something <br />
          that lasts longer than flowers."
        </motion.p>

        {/* Signature */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            times: [0, 0.25, 0.8, 1],
            duration: 5,
            ease: 'easeInOut',
          }}
          className="text-xs md:text-sm font-heading font-medium tracking-[0.15em] text-primary-pink uppercase mt-2"
        >
          — Gourav ❤️
        </motion.span>
      </div>
    </motion.div>
  );
};

export default CinematicTransition;
