import React from 'react';
import { RevealText } from '../common/RevealText';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  delay?: number;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  delay = 0,
  className = ""
}) => {
  return (
    <div className={`text-center flex flex-col items-center gap-4 ${className}`}>
      {subtitle && (
        <span className="text-xs md:text-sm font-medium tracking-[0.25em] text-primary-pink bg-primary-pink/10 border border-primary-pink/20 rounded-full px-4 py-1.5 animate-pulse-subtle uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-text-primary tracking-tight leading-tight">
        <RevealText text={title} delay={delay} />
      </h2>
    </div>
  );
};
