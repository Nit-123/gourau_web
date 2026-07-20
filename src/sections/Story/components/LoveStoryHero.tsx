import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Check, Camera, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { useEditMode } from '../../../context/EditModeContext';
import { syncToSupabase } from '../../../utils/supabaseSync';
import { FloatingGlow } from '../../../components/effects/FloatingGlow';
import { FloatingParticles } from '../../../components/effects/FloatingParticles';
import { PrimaryButton } from '../../../components/ui/PrimaryButton';
import { UploadCircle } from '../../../components/ui/UploadCircle';

// ── Floating avatar configurations ──
const AVATAR_CONFIGS = [
  { id: 1, style: { top: '22%', left: '43%' } as React.CSSProperties,  sizeClass: 'w-24 h-24 md:w-36 md:h-36', isBehind: true,  defaultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250' },
  { id: 2, style: { top: '42%', left: '0%' } as React.CSSProperties, sizeClass: 'w-14 h-14 md:w-20 md:h-20', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { id: 3, style: { top: '40%', left: '12%' } as React.CSSProperties,  sizeClass: 'w-20 h-20 md:w-28 md:h-28', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 4, style: { bottom: '25%', left: '0%' } as React.CSSProperties, sizeClass: 'w-16 h-16 md:w-24 md:h-24', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150' },
  { id: 5, style: { bottom: '18%', left: '16%' } as React.CSSProperties, sizeClass: 'w-24 h-24 md:w-36 md:h-36', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250' },
  { id: 6, style: { top: '28%', right: '25%' } as React.CSSProperties, sizeClass: 'w-12 h-12 md:w-16 md:h-16', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
  { id: 7, style: { bottom: '22%', right: '14%' } as React.CSSProperties, sizeClass: 'w-26 h-26 md:w-36 md:h-36', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250' },
  {id: 8, style: { bottom: '15%', left: '26%' } as React.CSSProperties, sizeClass: 'w-24 h-24 md:w-34 md:h-34', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=250' },
  { id: 9, style: { bottom: '25%', right: '28%' } as React.CSSProperties,  sizeClass: 'w-18 h-18 md:w-26 md:h-26', isBehind: false, defaultUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200' },
];

export const LoveStoryHero: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [heading, setHeading] = useState('Some people become memories. You became home.');
  const [subheading, setSubheading] = useState('365 little reasons why my world is brighter because of you.');
  const [heroImage, setHeroImage] = useState<string | null>(null);

  // Automatically turn off inline editing if edit mode is disabled globally
  useEffect(() => {
    if (!isEditMode) {
      setIsEditing(false);
    }
  }, [isEditMode]);

  useEffect(() => {
    const h = localStorage.getItem('hero_heading');
    const s = localStorage.getItem('hero_subheading');
    const img = localStorage.getItem('hero_image');
    if (h) setHeading(h);
    if (s) setSubheading(s);
    if (img) setHeroImage(img);
  }, []);

  const handleSave = () => {
    localStorage.setItem('hero_heading', heading);
    localStorage.setItem('hero_subheading', subheading);
    syncToSupabase('hero_heading', heading);
    syncToSupabase('hero_subheading', subheading);
    setIsEditing(false);
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setHeroImage(b64);
      localStorage.setItem('hero_image', b64);
      syncToSupabase('hero_image', b64);
    };
    reader.readAsDataURL(file);
  };

  const handleScrollDown = () => {
    document.getElementById('together-since')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionWrapper id="love-story" className="relative flex flex-col items-center justify-center pt-20 pb-28 px-6 select-none bg-transparent overflow-hidden mb-12">
      {/* Ambient glows */}
      <FloatingGlow delay={0} className="top-[5%] left-[5%] bg-[radial-gradient(circle,rgba(211,82,113,0.14)_0%,rgba(211,82,113,0)_70%)] w-[40rem] h-[40rem]" />
      <FloatingGlow delay={4} className="bottom-[10%] right-[5%] bg-[radial-gradient(circle,rgba(229,176,185,0.18)_0%,rgba(229,176,185,0)_70%)] w-[45rem] h-[45rem]" />
      <FloatingParticles />

      {/* ── Floating upload circles ── */}
      {AVATAR_CONFIGS.map((cfg) => (
        <UploadCircle
          key={cfg.id}
          storageKey={`hero_avatar_${cfg.id}`}
          defaultUrl={cfg.defaultUrl}
          sizeClass={cfg.sizeClass}
          style={cfg.style}
          delay={cfg.id * 0.6}
          zClass={cfg.isBehind ? '-z-10' : 'z-10'}
        />
      ))}

      {/* Edit / Save button - only shown in owner edit mode */}
      {isEditMode && (
        <div className="absolute top-6 right-6 z-35">
          {isEditing ? (
            <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold shadow-sm hover:bg-emerald-100 transition-all cursor-pointer">
              <Check className="w-3.5 h-3.5" /> Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/60 text-primary-pink border border-primary-pink/20 text-xs font-semibold shadow-sm hover:bg-white/95 transition-all cursor-pointer">
              <Edit3 className="w-3.5 h-3.5" /> Edit Hero Section
            </button>
          )}
        </div>
      )}

      {/* Badge */}
      <div className="z-10 inline-flex items-center gap-1.5 px-5 py-1.5 rounded-full border border-primary-pink/20 bg-primary-pink/5 mb-8 animate-pulse-subtle">
        <span className="text-[10px] md:text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase">A LOVE STORY</span>
      </div>

      {/* Heading / Subheading */}
      <div className="z-10 text-center w-full max-w-2xl flex flex-col items-center gap-5">
        {isEditing ? (
          <div className="w-full flex flex-col gap-3">
            <textarea value={heading} onChange={(e) => setHeading(e.target.value)} className="w-full text-center px-4 py-2 text-2xl font-heading text-text-primary bg-white/80 border border-primary-pink/30 rounded-2xl focus:outline-none focus:border-primary-pink" rows={3} />
            <textarea value={subheading} onChange={(e) => setSubheading(e.target.value)} className="w-full text-center px-4 py-2 text-sm font-body text-text-secondary bg-white/80 border border-primary-pink/30 rounded-2xl focus:outline-none focus:border-primary-pink" rows={2} />
          </div>
        ) : (
          <>
            <h2 className="text-4xl md:text-6xl font-heading font-light tracking-tight text-text-primary leading-[1.12] px-2 max-w-2xl mx-auto select-none">
              {heading === 'Some people become memories. You became home.' ? (
                <>Some people become <br />memories. <br /><span className="text-primary-pink font-normal">You became home.</span></>
              ) : heading}
            </h2>
            <p className="text-xs md:text-sm text-text-secondary/60 font-light max-w-md mt-4 leading-relaxed font-body select-none">
              {subheading === '365 little reasons why my world is brighter because of you.' ? (
                <>365 little reasons why my world is brighter <br />because of you.</>
              ) : subheading}
            </p>
          </>
        )}

        <PrimaryButton onClick={handleScrollDown} className="mt-6 text-xs md:text-sm px-10 py-3.5 uppercase tracking-wider font-semibold z-10 shadow-[0_8px_25px_rgba(211,82,113,0.3)] hover:shadow-[0_10px_30px_rgba(211,82,113,0.45)]">
          Begin the Journey
        </PrimaryButton>
      </div>

      {/* ── Hero PHOTO_01 card — always clickable ── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-2xl mt-16 z-10 px-4"
      >
        <GlassCard className="w-full p-0 flex flex-col items-center justify-center aspect-[16/10] overflow-hidden group relative shadow-[0_16px_50px_rgba(211,82,113,0.04)] border border-white/50 rounded-[2.5rem] bg-white/35 backdrop-blur-2xl">
          {heroImage ? (
            <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden">
              <img src={heroImage} alt="Our Best Moment" className="w-full h-full object-cover" />
              {/* Replace overlay on hover — only when edit mode is active */}
              <label className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-7 h-7 mb-2" />
                <span className="text-xs font-semibold uppercase tracking-wider">Replace Photo</span>
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleHeroUpload} className="hidden" />
              </label>
            </div>
          ) : (
            <label className="w-full h-full flex flex-col items-center justify-center gap-4 p-8 select-none cursor-pointer group">
              <div className="w-10 h-10 flex items-center justify-center text-primary-pink bg-primary-pink/5 rounded-xl border border-primary-pink/10 shadow-[0_2px_8px_rgba(211,82,113,0.05)] group-hover:bg-primary-pink/10 transition-colors duration-200">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-center flex flex-col gap-1.5">
                <span className="text-[10px] md:text-xs font-mono font-bold text-primary-pink tracking-widest uppercase">PHOTO_01</span>
                <span className="text-[10px] md:text-xs text-text-secondary/60 font-light font-body">Hero Image — Replace with our best photo</span>
              </div>
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleHeroUpload} className="hidden" />
            </label>
          )}
        </GlassCard>
      </motion.div>
    </SectionWrapper>
  );
};

export default LoveStoryHero;
