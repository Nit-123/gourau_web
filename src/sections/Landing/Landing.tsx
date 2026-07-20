import React from 'react';
import { SectionWrapper } from '../../components/common/SectionWrapper';
import { FloatingGlow } from '../../components/effects/FloatingGlow';
import { FloatingParticles } from '../../components/effects/FloatingParticles';
import { Badge } from './components/Badge';
import { Hero } from './components/Hero';
import { IntroText } from './components/IntroText';
import { MusicPlayer } from './components/MusicPlayer';
import { ActionButtons } from './components/ActionButtons';

interface LandingProps {
  onBeginJourney: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onBeginJourney }) => {
  return (
    <SectionWrapper id="landing" className="justify-center bg-[#fff3f5] min-h-screen">
      {/* Background radial soft ambient glows */}
      <FloatingGlow delay={0} className="top-[-10%] left-[-10%] bg-[radial-gradient(circle,rgba(211,82,113,0.12)_0%,rgba(211,82,113,0)_70%)]" />
      <FloatingGlow delay={4} className="bottom-[-15%] right-[-10%] bg-[radial-gradient(circle,rgba(229,176,185,0.18)_0%,rgba(229,176,185,0)_75%)]" />
      
      {/* Canvas-based soft drifting particles */}
      <FloatingParticles />

      {/* Central Content Container */}
      <div className="z-10 flex flex-col items-center justify-center w-full max-w-lg">
        <Badge />
        <Hero />
        <IntroText />
        <MusicPlayer />
        <ActionButtons onBeginJourney={onBeginJourney} />
      </div>
    </SectionWrapper>
  );
};

export default Landing;
