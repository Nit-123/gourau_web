import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';

const letters = [
  {
    id: 1,
    emoji: '🫂',
    title: "Open when you're sad",
    quote: `"Hey. I know today is heavy. And I know you're trying to hold it together — maybe you've been trying for a while. I want you to know that it's okay to put it down for a moment. You don't have to be okay right now. You've gotten through hard things before, and you will get through this one too. I'm here. And when you're ready to talk, or not talk, I'm still here."`,
    signature: '— Gourav ❤️',
  },
  {
    id: 2,
    emoji: '❤️',
    title: 'Open when you miss me',
    quote: `"You're missing me, and I love that you are. Because I miss you too — probably more than I say. The distance between us doesn't change a single thing about what I feel for you. You are thought of, constantly, by someone who loves you very much. Not long now."`,
    signature: '— Gourav ❤️',
  },
  {
    id: 3,
    emoji: '⚡',
    title: "Open when you're angry",
    quote: `"Be angry. Fully. You're allowed to feel this — don't talk yourself out of it. Take your time. And when you're ready, I'm not going anywhere. I know we don't always get it right. But I'd rather work through the hard things with you than have easy things without you. Always."`,
    signature: '— Gourav ❤️',
  },
  {
    id: 4,
    emoji: '🔥',
    title: 'Open when you need motivation',
    quote: `"You're capable of more than you're giving yourself credit for right now. I've watched you do hard things. I've seen you be tired and keep going anyway. You have what it takes. You always have. Now go. You've got this — and I'll be cheering for you from wherever I am."`,
    signature: '— Gourav ❤️',
  },
  {
    id: 5,
    emoji: '✨',
    title: 'Open when you need a smile',
    quote: `"Remember that time you laughed so hard you couldn't breathe? I live for that. I want you to know — you have the best laugh. And the best face when something catches you off guard. And the way you get excited about things you love? It's everything. You make my world better just by being in it. Smiling yet?"`,
    signature: '— Gourav ❤️',
  },
];

export const OpenWhen: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <SectionWrapper id="open-when" className="relative justify-center py-16 px-4 bg-transparent">
      {/* Floating upload circles */}
      <UploadCircle storageKey="ow_c1" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '6%', left: '4%' }} delay={0} />
      <UploadCircle storageKey="ow_c2" defaultUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '4%', right: '4%' }} delay={1.2} />
      <UploadCircle storageKey="ow_c3" defaultUrl="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" sizeClass="w-12 h-12 md:w-16 md:h-16" style={{ bottom: '8%', left: '6%' }} delay={0.6} yRange={[0,10]} />
      <UploadCircle storageKey="ow_c4" defaultUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150" sizeClass="w-14 h-14 md:w-20 md:h-20" style={{ bottom: '6%', right: '5%' }} delay={1.8} yRange={[0,10]} />
      <div className="z-10 flex flex-col items-center w-full max-w-2xl">
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none text-center">
          LETTERS FOR EVERY MOMENT
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-10 select-none text-center">
          Open When...
        </h2>

        <div className="w-full flex flex-col gap-3">
          {letters.map((letter) => {
            const isOpen = openId === letter.id;
            return (
              <GlassCard
                key={letter.id}
                className={`overflow-hidden backdrop-blur-sm transition-all duration-300 ${
                  isOpen
                    ? 'border border-primary-pink/20 bg-white/80 shadow-[0_8px_32px_rgba(211,82,113,0.06)]'
                    : 'border border-white/55 bg-white/60 shadow-[0_2px_12px_rgba(211,82,113,0.02)]'
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => setOpenId(isOpen ? null : letter.id)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    {/* Icon badge */}
                    <div className="w-8 h-8 rounded-xl bg-primary-pink/6 border border-primary-pink/10 flex items-center justify-center text-sm shrink-0">
                      {letter.emoji}
                    </div>
                    <span className={`text-sm font-medium font-body transition-colors duration-200 ${isOpen ? 'text-primary-pink' : 'text-text-primary'}`}>
                      {letter.title}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-primary-pink/40 text-lg font-light leading-none shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 flex flex-col gap-3">
                        {/* Quote body */}
                        <p className="text-xs text-text-secondary/80 font-light font-body italic leading-[1.95]">
                          {letter.quote}
                        </p>
                        {/* Signature */}
                        <p className="text-xs text-primary-pink font-semibold font-heading">
                          {letter.signature}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OpenWhen;
