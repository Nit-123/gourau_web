import React from 'react';
import { AnimatedParagraph } from '../../../components/ui/AnimatedParagraph';

export const IntroText: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center gap-6 max-w-lg px-4 mt-2 mb-8 select-none">
      <AnimatedParagraph delay={0.8} className="space-y-1.5 font-light">
        This isn't just a website.<br />
        It's a collection of memories...<br />
        little moments...<br />
        and all the things I never say enough.
      </AnimatedParagraph>
      
      <AnimatedParagraph delay={1.3} className="space-y-1.5 font-light text-text-secondary/90">
        I have just one request...<br />
        Put on your headphones.<br />
        Press play.<br />
        Then let me tell you a story.
      </AnimatedParagraph>
    </div>
  );
};
export default IntroText;
