import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Music, Pause } from 'lucide-react';
import { useMusic } from '../../../context/MusicContext';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';

interface ActionButtonsProps {
  onBeginJourney: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onBeginJourney }) => {
  const { isPlaying, hasPlayedOnce, togglePlay } = useMusic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.9, 
        delay: 2.0, 
        ease: [0.215, 0.610, 0.355, 1.000] 
      }}
      className="flex flex-col items-center gap-4 w-full max-w-xs mt-6 select-none"
    >
      {/* Play Our Song Button */}
      <PrimaryButton
        onClick={togglePlay}
        className="w-full text-xs md:text-sm py-4 uppercase tracking-widest font-bold"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4 fill-white stroke-none" />
            Pause Our Song
          </>
        ) : (
          <>
            <Music className="w-4 h-4 fill-white stroke-none" />
            Play Our Song
          </>
        )}
      </PrimaryButton>

      {/* Begin the Journey Button */}
      <SecondaryButton
        onClick={onBeginJourney}
        disabled={!hasPlayedOnce}
        className={`w-full text-xs md:text-sm py-4 uppercase tracking-widest font-bold group transition-all duration-300 ${
          !hasPlayedOnce ? 'opacity-40 cursor-not-allowed border-gray-200 text-gray-400 hover:bg-transparent pointer-events-none' : ''
        }`}
      >
        Begin the Journey
        <ArrowRight className="w-4 h-4 text-primary-pink transition-transform duration-300 group-hover:translate-x-1" />
      </SecondaryButton>
    </motion.div>
  );
};
export default ActionButtons;
