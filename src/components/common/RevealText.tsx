import React from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
  once?: boolean;
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  delay = 0,
  className = "",
  once = true
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: customDelay,
      },
    }),
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.610, 0.355, 1.000] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      custom={delay}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIdx) => (
            <motion.span
              key={charIdx}
              className="inline-block"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};
