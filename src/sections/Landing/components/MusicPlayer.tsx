import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';
import { useMusic } from '../../../context/MusicContext';
import { GlassCard } from '../../../components/ui/GlassCard';
import { ProgressBar } from '../../../components/ui/ProgressBar';

export const MusicPlayer: React.FC = () => {
  const { isPlaying, currentTime, duration, togglePlay, seek } = useMusic();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.9, 
        delay: 1.6, 
        ease: [0.215, 0.610, 0.355, 1.000] 
      }}
      className="w-full max-w-md"
    >
      <GlassCard className="p-7 md:p-8 flex flex-col gap-6 relative shadow-[0_8px_32px_0_rgba(211,82,113,0.08)]">
        <div className="flex gap-5 items-center">
          {/* Album Art Placeholder */}
          <div className="w-20 h-20 rounded-2xl bg-primary-pink/10 border border-primary-pink/15 flex flex-col items-center justify-center gap-1 select-none shrink-0 shadow-[inset_0_2px_4px_rgba(211,82,113,0.05)]">
            <Music className="w-7 h-7 text-primary-pink animate-pulse-subtle" />
            <span className="text-[9px] font-mono tracking-widest text-primary-pink/60 font-semibold uppercase">
              album_art
            </span>
          </div>

          {/* Track Details */}
          <div className="flex flex-col gap-0.5 text-left select-none">
            <span className="text-[10px] text-primary-pink tracking-wider font-semibold uppercase opacity-85">
              ..... Press play
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">
              "Our Song"
            </h3>
            <span className="text-xs text-text-secondary font-light">
              Replace Later
            </span>
          </div>
        </div>

        {/* Scrubber Timeline */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={seek}
        />

        {/* Central Play/Pause Circular Action */}
        <div className="flex justify-center items-center mt-1">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-primary-pink text-white flex items-center justify-center shadow-[0_4px_15px_rgba(211,82,113,0.25)] hover:bg-primary-pink-hover hover:shadow-[0_6px_22px_rgba(211,82,113,0.45)] transition-all duration-300 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-white stroke-none" />
            ) : (
              <Play className="w-6 h-6 fill-white stroke-none translate-x-0.5" />
            )}
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  );
};
export default MusicPlayer;
