import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';

interface BucketItem {
  id: number;
  emoji: string;
  title: string;
  description: string;
  completed: boolean;
}

const defaultItems: BucketItem[] = [
  { id: 1,  emoji: '✈️', title: 'Travel Together',           description: 'Book a flight with no plan except each other.',                             completed: false },
  { id: 2,  emoji: '🌌', title: 'Watch the Northern Lights', description: 'Find the darkest sky and look up together.',                                 completed: false },
  { id: 3,  emoji: '🏠', title: 'Start Our Home',            description: 'Find a space with everything that is us.',                                   completed: false },
  { id: 4,  emoji: '🚗', title: 'Late Night Drives',         description: 'Nowhere plans, music up, nowhere to be.',                                   completed: false },
  { id: 5,  emoji: '☕', title: 'Random Coffee Dates',       description: 'Spontaneous mornings with nowhere to rush.',                                 completed: false },
  { id: 6,  emoji: '🌊', title: 'Watch the Sunrise by the Sea', description: 'Wake up before the world and see it first together.',                    completed: false },
  { id: 7,  emoji: '🎵', title: 'Attend a Live Show',        description: "Something we'll talk about for years after.",                               completed: false },
  { id: 8,  emoji: '📷', title: 'Take a Film Camera Trip',   description: 'Analog memories that will last forever.',                                   completed: false },
  { id: 9,  emoji: '🏕️', title: 'Disappear for a Weekend',   description: 'No phones, no agenda, just us and nature.',                                completed: false },
  { id: 10, emoji: '⭐', title: 'More Adventures',           description: "Whatever we haven't imagined yet.",                                          completed: false },
];

export const BucketList: React.FC = () => {
  const [items, setItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('bucket_list_v2');
    if (saved) { try { return JSON.parse(saved); } catch { /* fall through */ } }
    return defaultItems;
  });

  const toggle = (id: number) => {
    const updated = items.map(i => i.id === id ? { ...i, completed: !i.completed } : i);
    setItems(updated);
    localStorage.setItem('bucket_list_v2', JSON.stringify(updated));
  };

  const completed = items.filter(i => i.completed).length;
  const progress = Math.round((completed / items.length) * 100);

  return (
    <SectionWrapper id="bucket-list" className="relative justify-center py-16 px-4 bg-transparent">
      {/* Floating upload circles */}
      <UploadCircle storageKey="bl_c1" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-22 md:h-22" style={{ top: '5%', left: '4%' }} delay={0} />
      <UploadCircle storageKey="bl_c2" defaultUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '4%', right: '4%' }} delay={1.3} />
      <UploadCircle storageKey="bl_c3" defaultUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" sizeClass="w-10 h-10 md:w-16 md:h-16" style={{ bottom: '8%', left: '5%' }} delay={0.7} yRange={[0,10]} />
      <UploadCircle storageKey="bl_c4" defaultUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" sizeClass="w-14 h-14 md:w-20 md:h-20" style={{ bottom: '7%', right: '5%' }} delay={1.8} yRange={[0,10]} />
      <div className="z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          WHAT'S AHEAD
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-3 select-none">
          Future Bucket List
        </h2>
        <p className="text-xs md:text-sm text-text-secondary/70 font-light mb-10 font-body select-none">
          Everything we still get to do.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full text-left">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(item.id)}
              className={`p-4 flex items-start gap-3 border transition-all duration-300 cursor-pointer select-none rounded-2xl glass-panel overflow-hidden ${
                item.completed
                  ? 'border-primary-pink/25 bg-primary-pink/[0.04] shadow-[0_4px_20px_rgba(211,82,113,0.06)]'
                  : 'border-white/55 bg-white/60 shadow-[0_2px_12px_rgba(211,82,113,0.02)]'
              }`}
            >
                {/* Checkbox */}
                <div
                  className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                    item.completed ? 'bg-primary-pink border-primary-pink' : 'border-primary-pink/30 bg-white'
                  }`}
                >
                  {item.completed && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                      <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>

                {/* Emoji */}
                <span className="text-lg leading-none mt-0.5 shrink-0">{item.emoji}</span>

                {/* Text */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className={`text-[11px] font-bold font-heading transition-all duration-200 ${
                    item.completed ? 'text-primary-pink/60 line-through decoration-primary-pink/40' : 'text-text-primary'
                  }`}>
                    {item.title}
                  </span>
                  <span className="text-[10px] text-text-secondary/65 font-light font-body leading-relaxed">
                    {item.description}
                  </span>
                </div>
            </motion.div>
          ))}
        </div>

        {/* Progress — "Adventures completed X / 10" */}
        <div className="w-full max-w-sm mt-10 flex flex-col gap-2 select-none">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-medium text-text-secondary/70 font-body">
              Adventures completed
            </span>
            <span className="text-[11px] font-semibold text-primary-pink font-mono">
              {completed} / {items.length}
            </span>
          </div>
          <div className="w-full h-1.5 bg-primary-pink/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-primary-pink rounded-full shadow-[0_0_6px_rgba(211,82,113,0.35)]"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default BucketList;
