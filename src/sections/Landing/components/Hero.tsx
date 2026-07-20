import React from 'react';
import { RevealText } from '../../../components/common/RevealText';

export const Hero: React.FC = () => {
  return (
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-light tracking-tight text-text-primary mt-6 mb-4 text-center">
      <RevealText text="Before you begin..." delay={0.4} />
    </h1>
  );
};
export default Hero;
