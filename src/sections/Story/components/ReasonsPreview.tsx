import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Heart } from 'lucide-react';
import { reasons } from '../../../utils/reasons';
import { GlassCard } from '../../../components/ui/GlassCard';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';

import { navigateTo } from '../../../utils/navigation';

export const ReasonsPreview: React.FC = () => {
  // Pull cards 001 through 012
  const previewReasons = reasons.slice(0, 12);

  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  const handleSeeAllClick = () => {
    navigateTo('/reasons');
  };

  // Staggered grid load animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  return (
    <SectionWrapper id="reasons-preview" className="relative justify-center py-16 px-4 bg-transparent">
      <UploadCircle storageKey="rp_c1" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '20%', left: '4%' }} delay={0} />
      <UploadCircle storageKey="rp_c2" defaultUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ bottom: '25%', right: '4%' }} delay={2} yRange={[0, 10]} />

      <div className="z-10 flex flex-col items-center w-full max-w-4xl text-center">
        {/* Header Badge */}
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          THE LIST
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-3">
          365 Reasons Why I <span className="text-primary-pink font-semibold">Love You</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-xs md:text-sm text-text-secondary font-light max-w-md mb-16 select-none font-body leading-relaxed">
          Some are big moments. Most are the little things you probably don't even realize you do.
        </p>

        {/* 12 Reasons Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full text-left"
        >
          {previewReasons.map((item) => (
            <motion.div key={item.id} variants={cardVariants}>
              <GlassCard className="p-5 flex flex-col justify-between aspect-[1/1] border border-white/45 shadow-[0_4px_20px_rgba(211,82,113,0.02)] hover:shadow-[0_8px_30px_rgba(211,82,113,0.08)] hover:border-primary-pink/15 transition-all duration-300 select-none">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] md:text-xs font-mono font-bold text-primary-pink tracking-widest leading-none">
                    {formatNumber(item.id)}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-primary-pink/40 fill-primary-pink/10 hover:fill-primary-pink/60 hover:text-primary-pink transition-colors duration-300 cursor-pointer" />
                </div>
                <p className="text-xs md:text-sm text-text-primary font-body font-light leading-relaxed grow flex items-center">
                  {item.text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* See All Button */}
        <div className="mt-16">
          <PrimaryButton 
            onClick={handleSeeAllClick}
            className="text-xs md:text-sm px-8 py-3.5 uppercase tracking-wider font-semibold shadow-md"
          >
            See All 365 ❤️
          </PrimaryButton>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ReasonsPreview;
