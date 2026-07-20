import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Check, X } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';
import { useEditMode } from '../../../context/EditModeContext';

interface LetterItem {
  id: number;
  emojiIcon: string;
  to: string;
  preview: string;
  bodyText: string;
  signature: string;
}

const defaultLetters: LetterItem[] = [
  {
    id: 1,
    emojiIcon: '✉️',
    to: 'To My Best Friend',
    preview: 'To the person who knows every version of me and stays anyway...',
    bodyText: 'To my best friend — you came in quietly and somehow became the person I want to tell everything to. The good news and the embarrassing thoughts and the random things that happen mid-afternoon. You are the easiest conversation I\'ve ever had and the safest place I\'ve ever known. Thank you for being my person.',
    signature: '— Gourav ❤️',
  },
  {
    id: 2,
    emojiIcon: '🏠',
    to: 'To My Safe Place',
    preview: 'To the one who makes the world feel less loud...',
    bodyText: 'To my safe place — when the world gets heavy and loud and too much, you are where I come back to. Not because you fix things, but because you make them feel manageable. You hold space for my chaos without judgment and remind me to breathe without saying a word. You are home.',
    signature: '— Gourav ❤️',
  },
  {
    id: 3,
    emojiIcon: '✨',
    to: 'To My Future',
    preview: "To every tomorrow we haven't lived yet...",
    bodyText: "To my future — I don't know everything that's ahead of us, but I know this: you're in it. Every version of tomorrow that I could imagine, you're there. And that makes everything else feel possible. Let's build something extraordinary together. I'm not afraid of what's next. I have you.",
    signature: '— Gourav ❤️',
  },
];

export const LoveLetters: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const [openId, setOpenId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Edit Buffer States
  const [editEmojiIcon, setEditEmojiIcon] = useState('');
  const [editTo, setEditTo] = useState('');
  const [editPreview, setEditPreview] = useState('');
  const [editBodyText, setEditBodyText] = useState('');
  const [editSignature, setEditSignature] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('love_letters_data');
    if (saved) {
      try {
        setLetters(JSON.parse(saved));
      } catch {
        setLetters(defaultLetters);
      }
    } else {
      setLetters(defaultLetters);
    }
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      setEditingId(null);
    }
  }, [isEditMode]);

  const handleEditClick = (e: React.MouseEvent, item: LetterItem) => {
    e.stopPropagation();
    setEditingId(item.id);
    setEditEmojiIcon(item.emojiIcon);
    setEditTo(item.to);
    setEditPreview(item.preview);
    setEditBodyText(item.bodyText);
    setEditSignature(item.signature);
  };

  const handleSaveClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const updated = letters.map((l) =>
      l.id === id
        ? {
            ...l,
            emojiIcon: editEmojiIcon,
            to: editTo,
            preview: editPreview,
            bodyText: editBodyText,
            signature: editSignature,
          }
        : l
    );
    setLetters(updated);
    localStorage.setItem('love_letters_data', JSON.stringify(updated));
    setEditingId(null);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <SectionWrapper id="love-letters" className="relative justify-center py-24 px-4 bg-transparent">
      {/* Floating upload circles */}
      <UploadCircle storageKey="ll_c1" defaultUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" sizeClass="w-14 h-14 md:w-20 md:h-20" style={{ top: '8%', left: '5%' }} delay={0} />
      <UploadCircle storageKey="ll_c2" defaultUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '5%', right: '5%' }} delay={1} />
      <UploadCircle storageKey="ll_c3" defaultUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" sizeClass="w-10 h-10 md:w-14 md:h-14" style={{ bottom: '10%', left: '8%' }} delay={2} yRange={[0, 10]} />
      <UploadCircle storageKey="ll_c4" defaultUrl="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-22 md:h-22" style={{ bottom: '8%', right: '6%' }} delay={1.5} yRange={[0, 10]} />
      <div className="z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          WRITTEN FOR YOU
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-12 select-none">
          Love Letters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full text-left items-start">
          {letters.map((letter) => {
            const isOpen = openId === letter.id;
            const isEditing = editingId === letter.id;
            return (
              <GlassCard
                key={letter.id}
                className={`p-6 flex flex-col gap-4 border transition-all duration-300 backdrop-blur-sm relative ${
                  isEditing
                    ? 'ring-2 ring-primary-pink/30 shadow-[0_12px_36px_rgba(211,82,113,0.1)]'
                    : isOpen
                    ? 'border-primary-pink/15 bg-white/80 shadow-[0_8px_40px_rgba(211,82,113,0.07)]'
                    : 'border-white/55 bg-white/60 shadow-[0_4px_24px_rgba(211,82,113,0.025)]'
                }`}
              >
                {/* Action Toolbar on Card — only shown in owner edit mode */}
                {isEditMode && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={(e) => handleSaveClick(e, letter.id)}
                          className="p-1 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-100"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className="p-1 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer border border-rose-100"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={(e) => handleEditClick(e, letter)}
                        className="p-1 rounded-full bg-white/70 text-text-secondary hover:text-primary-pink hover:bg-white transition-colors cursor-pointer border border-primary-pink/10 shadow-sm"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}

                {isEditing ? (
                  /* Edit Layout */
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-1 w-1/4">
                        <label className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Emoji</label>
                        <input
                          type="text"
                          value={editEmojiIcon}
                          onChange={(e) => setEditEmojiIcon(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-primary-pink/20 text-xs bg-white focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-3/4">
                        <label className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">To Header</label>
                        <input
                          type="text"
                          value={editTo}
                          onChange={(e) => setEditTo(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-primary-pink/20 text-xs bg-white focus:outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Italic Preview</label>
                      <input
                        type="text"
                        value={editPreview}
                        onChange={(e) => setEditPreview(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-primary-pink/20 text-xs bg-white focus:outline-none italic"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Letter Body</label>
                      <textarea
                        value={editBodyText}
                        onChange={(e) => setEditBodyText(e.target.value)}
                        rows={6}
                        className="w-full px-2 py-1.5 rounded-lg border border-primary-pink/20 text-xs bg-white focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] uppercase tracking-wider text-text-secondary font-bold">Signature</label>
                      <input
                        type="text"
                        value={editSignature}
                        onChange={(e) => setEditSignature(e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg border border-primary-pink/20 text-xs bg-white focus:outline-none font-semibold text-primary-pink"
                      />
                    </div>
                  </div>
                ) : (
                  /* Display Layout */
                  <>
                    {/* Icon badge */}
                    <div className="w-9 h-9 rounded-xl bg-primary-pink/6 border border-primary-pink/10 flex items-center justify-center text-base shadow-[0_2px_8px_rgba(211,82,113,0.04)]">
                      {letter.emojiIcon}
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-text-primary font-heading leading-tight pr-8">
                      {letter.to}
                    </h3>

                    {/* Preview (always visible) */}
                    <p className="text-xs text-text-secondary/80 font-light font-body italic leading-relaxed">
                      {letter.preview}
                    </p>

                    {/* Expanded letter body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-4 pt-2 border-t border-primary-pink/8">
                            <p className="text-xs text-text-secondary font-light font-body leading-[1.9]">
                              {letter.bodyText}
                            </p>
                            <p className="text-xs text-primary-pink font-semibold font-heading">
                              {letter.signature}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle button */}
                    <button
                      onClick={() => setOpenId(isOpen ? null : letter.id)}
                      className="text-xs text-primary-pink font-semibold flex items-center gap-1 hover:gap-1.5 transition-all duration-200 cursor-pointer self-start mt-auto"
                    >
                      {isOpen ? 'Close letter ↑' : 'Read letter ↓'}
                    </button>
                  </>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default LoveLetters;
