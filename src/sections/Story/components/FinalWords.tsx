import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, Edit2, Check } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';
import { useEditMode } from '../../../context/EditModeContext';

const defaultLetterText = `I've spent a long time thinking about what to say here. About how to put into words something that feels too big for words. About how to explain what you mean to me without it sounding like something you've heard before.

The truth is, you changed things. Quietly, completely, in a way I didn't see coming and couldn't explain if I tried. You walked into my life and something settled — something that had been restless for a long time just... stopped. Like a compass finding north.

I want to spend the rest of my life figuring out how to love you exactly right. Not perfectly — I know I'll get it wrong sometimes. But completely, and honestly, and with everything I have. I choose you today and I'll choose you tomorrow and every day that I'm lucky enough to have you to choose.

365 reasons didn't feel like enough. They never will. But I hope this — all of this — tells you at least a part of what you are to me.`;

export const FinalWords: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [finalImage, setFinalImage] = useState<string | null>(() => {
    return localStorage.getItem('final_image');
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [letterText, setLetterText] = useState(defaultLetterText);
  const [isEditingText, setIsEditingText] = useState(false);
  const [tempLetterText, setTempLetterText] = useState('');

  useEffect(() => {
    const savedLetter = localStorage.getItem('final_letter_text');
    if (savedLetter) {
      setLetterText(savedLetter);
    }
  }, []);

  // Turn off editing state if Edit Mode is deactivated globally
  useEffect(() => {
    if (!isEditMode) {
      setIsEditingText(false);
    }
  }, [isEditMode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setFinalImage(base64);
      localStorage.setItem('final_image', base64);
    };
    reader.readAsDataURL(file);
  };

  const handleStartEdit = () => {
    setTempLetterText(letterText);
    setIsEditingText(true);
  };

  const handleSaveText = () => {
    setLetterText(tempLetterText);
    localStorage.setItem('final_letter_text', tempLetterText);
    setIsEditingText(false);
  };

  const handleCancelEdit = () => {
    setIsEditingText(false);
  };

  return (
    <>
      <SectionWrapper id="final-words" className="relative justify-center py-16 px-6 bg-transparent">
        <UploadCircle storageKey="fw_c1" defaultUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '5%', left: '4%' }} delay={0} />
        <UploadCircle storageKey="fw_c2" defaultUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '4%', right: '4%' }} delay={1} />
        <UploadCircle storageKey="fw_c3" defaultUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" sizeClass="w-12 h-12 md:w-18 md:h-18" style={{ bottom: '8%', left: '6%' }} delay={0.5} yRange={[0, 10]} />
        <UploadCircle storageKey="fw_c4" defaultUrl="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150" sizeClass="w-14 h-14 md:w-20 md:h-20" style={{ bottom: '6%', right: '5%' }} delay={1.5} yRange={[0, 10]} />
        <div className="z-10 flex flex-col items-center w-full max-w-xl text-center">
          <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-8 select-none">
            THE FINAL WORD
          </span>

          {/* Hero quote */}
          <h2 className="text-4xl md:text-[3.25rem] font-heading font-light text-text-primary leading-[1.15] mb-1 select-none">
            If I had one life again...
          </h2>
          <h2 className="text-4xl md:text-[3.25rem] font-heading font-light text-primary-pink leading-[1.15] mb-14 select-none">
            I'd still choose you.
          </h2>

          {/* Final photo card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-sm mb-10"
          >
            <GlassCard className={`w-full aspect-[4/3] flex flex-col items-center justify-center overflow-hidden relative border border-white/55 shadow-[0_16px_50px_rgba(211,82,113,0.05)] rounded-[2.5rem] bg-white/40 backdrop-blur-2xl ${isEditMode ? 'group cursor-pointer' : ''}`}>
              {finalImage ? (
                <>
                  <img src={finalImage} alt="Our best photo together" className="w-full h-full object-cover" />
                  {isEditMode && (
                    <label className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex flex-col items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-semibold uppercase tracking-wider">Replace Photo</span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                  )}
                </>
              ) : (
                <label className={`w-full h-full flex flex-col items-center justify-center gap-3 select-none ${isEditMode ? 'cursor-pointer' : 'pointer-events-none'}`}>
                  <div className="w-10 h-10 bg-primary-pink/5 rounded-xl border border-primary-pink/10 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-primary-pink" />
                  </div>
                  <div className="text-center flex flex-col gap-1">
                    <span className="text-[10px] font-mono font-bold text-primary-pink tracking-widest uppercase">PHOTO_13</span>
                    <span className="text-[10px] text-text-secondary/60 font-light">Our best photo together</span>
                  </div>
                  {isEditMode && <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />}
                </label>
              )}
            </GlassCard>
          </motion.div>

          {/* Signature */}
          <p className="text-2xl font-heading italic text-primary-pink mb-9 select-none">
            Gourav <span className="not-italic">❤️</span>
          </p>

          {/* Read My Letter button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 rounded-full bg-primary-pink text-white text-xs font-semibold tracking-widest uppercase shadow-[0_8px_25px_rgba(211,82,113,0.3)] hover:shadow-[0_12px_35px_rgba(211,82,113,0.45)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Read My Letter
          </button>
        </div>
      </SectionWrapper>

      {/* ── Letter Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
            onClick={(e) => { if (e.target === e.currentTarget && !isEditingText) setIsModalOpen(false); }}
          >
            {/* Blurred overlay */}
            <div className="absolute inset-0 bg-[#fce4ec]/85 backdrop-blur-2xl" />

            {/* Glassmorphism card */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 24 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-xl max-h-[88vh] overflow-y-auto bg-white/75 backdrop-blur-2xl rounded-[2rem] shadow-[0_24px_80px_rgba(211,82,113,0.1)] border border-white/65 p-8 md:p-12"
            >
              {/* Close (only active when not editing) */}
              {!isEditingText && (
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full border border-primary-pink/20 bg-white/80 flex items-center justify-center text-primary-pink/60 hover:text-primary-pink hover:bg-white transition-all cursor-pointer shadow-sm"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Edit text button in modal (if owner edit mode is active) */}
              {isEditMode && (
                <div className="absolute top-5 left-5 z-20 flex gap-2">
                  {isEditingText ? (
                    <>
                      <button
                        onClick={handleSaveText}
                        className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100 cursor-pointer shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors border border-rose-100 cursor-pointer shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 border border-primary-pink/20 text-xs font-semibold text-primary-pink hover:bg-white transition-colors cursor-pointer shadow-sm"
                    >
                      <Edit2 className="w-3 h-3" /> Edit Text
                    </button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col gap-7 pt-4">
                <span className="text-[10px] font-mono font-bold text-primary-pink tracking-[0.3em] uppercase text-center">
                  MY LETTER TO YOU
                </span>

                {isEditingText ? (
                  <textarea
                    value={tempLetterText}
                    onChange={(e) => setTempLetterText(e.target.value)}
                    rows={12}
                    className="w-full p-4 rounded-2xl border border-primary-pink/30 bg-white/90 text-sm text-text-secondary leading-relaxed focus:outline-none focus:border-primary-pink"
                  />
                ) : (
                  <p className="text-sm text-text-secondary/90 font-light font-body leading-[1.95] whitespace-pre-line text-center">
                    {letterText}
                  </p>
                )}

                <div className="text-center mt-2">
                  <p className="text-lg font-heading italic text-primary-pink leading-relaxed">
                    Always yours,<br />
                    Gourav <span className="not-italic">❤️</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FinalWords;
