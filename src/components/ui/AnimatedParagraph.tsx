import React from 'react';
import { FadeIn } from '../common/FadeIn';

interface AnimatedParagraphProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  children,
  delay = 0,
  className = ""
}) => {
  return (
    <FadeIn delay={delay} yOffset={10} className={`text-text-secondary font-body font-light text-base md:text-lg leading-relaxed ${className}`}>
      <p>{children}</p>
    </FadeIn>
  );
};
