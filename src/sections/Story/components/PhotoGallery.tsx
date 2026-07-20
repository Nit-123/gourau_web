import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Image as ImageIcon, Plus, X } from 'lucide-react';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';
import { useEditMode } from '../../../context/EditModeContext';
import { syncToSupabase } from '../../../utils/supabaseSync';

interface GallerySlot {
  id: number;
  label: string;
  image: string | null;
}

const defaultSlots: GallerySlot[] = [
  { id: 7, label: 'PHOTO_07', image: null },
  { id: 8, label: 'PHOTO_08', image: null },
  { id: 9, label: 'PHOTO_09', image: null },
  { id: 10, label: 'PHOTO_10', image: null },
  { id: 11, label: 'PHOTO_11', image: null },
  { id: 12, label: 'PHOTO_12', image: null },
  { id: 13, label: 'PHOTO_13', image: null },
];

const save = (slots: GallerySlot[]) => {
  const jsonString = JSON.stringify(slots);
  localStorage.setItem('gallery_slots', jsonString);
  syncToSupabase('gallery_slots', jsonString);
};

export const PhotoGallery: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [slots, setSlots] = useState<GallerySlot[]>(() => {
    const saved = localStorage.getItem('gallery_slots');
    if (saved) { try { return JSON.parse(saved); } catch { /* fall through */ } }
    return defaultSlots;
  });

  const addInputRef = useRef<HTMLInputElement>(null);
  const nextId = Math.max(...slots.map(s => s.id)) + 1;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = slots.map(s => s.id === id ? { ...s, image: reader.result as string } : s);
      setSlots(updated);
      save(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    let id = nextId;
    const newSlots: GallerySlot[] = [];
    let pending = files.length;
    files.forEach((file) => {
      const reader = new FileReader();
      const slotId = id++;
      reader.onloadend = () => {
        newSlots.push({ id: slotId, label: `PHOTO_${String(slotId).padStart(2, '0')}`, image: reader.result as string });
        pending--;
        if (pending === 0) {
          const updated = [...slots, ...newSlots.sort((a, b) => a.id - b.id)];
          setSlots(updated);
          save(updated);
        }
      };
      reader.readAsDataURL(file);
    });
    // reset so same file can be re-added
    if (addInputRef.current) addInputRef.current.value = '';
  };

  const handleRemove = (id: number) => {
    const updated = slots.filter(s => s.id !== id);
    setSlots(updated);
    save(updated);
  };

  // Split into fixed masonry rows (first 7) + extra dynamic row
  const fixed = slots.slice(0, 7);
  const extras = slots.slice(7);

  const GalleryCard = ({ slot, className = '', removable = false }: { slot: GallerySlot; className?: string; removable?: boolean }) => (
    <div className={`relative rounded-[2rem] overflow-hidden group bg-white/40 border border-white/60 shadow-[0_8px_30px_rgba(211,82,113,0.04)] ${isEditMode ? 'hover:shadow-[0_12px_40px_rgba(211,82,113,0.08)]' : ''} transition-all duration-300 ${className}`}>
      {slot.image ? (
        <>
          <img src={slot.image} alt={slot.label} className="w-full h-full object-cover" />
          {/* Hover overlay: replace — only when edit mode is active */}
          {isEditMode && (
            <label className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Replace</span>
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e, slot.id)} className="hidden" />
            </label>
          )}
        </>
      ) : (
        <label className={`w-full h-full flex flex-col items-center justify-center gap-2 p-6 ${isEditMode ? 'cursor-pointer' : 'pointer-events-none'}`}>
          <div className="w-9 h-9 bg-primary-pink/5 rounded-xl border border-primary-pink/10 flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-primary-pink" />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-mono font-bold text-primary-pink tracking-widest uppercase">{slot.label}</p>
            {isEditMode && <p className="text-[9px] text-text-secondary/60 font-light mt-0.5">Replace with photo</p>}
          </div>
          {isEditMode && <input type="file" accept="image/*" onChange={(e) => handleUpload(e, slot.id)} className="hidden" />}
        </label>
      )}
      {/* Remove button for extra photos — only in edit mode */}
      {removable && isEditMode && (
        <button
          onClick={() => handleRemove(slot.id)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer z-10"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );

  return (
    <SectionWrapper id="photo-gallery" className="relative justify-start py-16 px-4 bg-transparent">
      {/* Floating upload circles */}
      <UploadCircle storageKey="pg_c1" defaultUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '6%', left: '8%' }} delay={0} />
      <UploadCircle storageKey="pg_c2" defaultUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" sizeClass="w-16 h-16 md:w-22 md:h-22" style={{ top: '10%', right: '8%' }} delay={0.8} />
      <UploadCircle storageKey="pg_c3" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" sizeClass="w-10 h-10 md:w-14 md:h-14" style={{ top: '14%', left: '28%' }} delay={1.6} />
      <UploadCircle storageKey="pg_c4" defaultUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150" sizeClass="w-12 h-12 md:w-16 md:h-16" style={{ top: '4%', right: '20%' }} delay={2.4} />

      <div className="z-10 flex flex-col items-center w-full max-w-4xl text-center">
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          OUR MOMENTS
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-12 select-none">
          Photo Gallery
        </h2>

        {/* Fixed masonry grid */}
        <div className="w-full flex flex-col gap-4">
          {/* Row 1: Large + medium */}
          <div className="flex gap-4 h-64 md:h-72">
            <GalleryCard slot={fixed[0]} className="flex-[1.4]" />
            <GalleryCard slot={fixed[1]} className="flex-[1]" />
          </div>
          {/* Row 2: 3 equal */}
          <div className="flex gap-4 h-48 md:h-56">
            <GalleryCard slot={fixed[2]} className="flex-1" />
            <GalleryCard slot={fixed[3]} className="flex-1" />
            <GalleryCard slot={fixed[4]} className="flex-1" />
          </div>
          {/* Row 3: 2 equal */}
          <div className="flex gap-4 h-48 md:h-56">
            <GalleryCard slot={fixed[5]} className="flex-1" />
            <GalleryCard slot={fixed[6]} className="flex-1" />
          </div>

          {/* Extra photos added by user */}
          <AnimatePresence>
            {extras.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {extras.map((slot) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-48 md:h-56"
                  >
                    <GalleryCard slot={slot} className="h-full" removable />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add More Photos button — only shown in owner edit mode */}
        {isEditMode && (
          <div className="mt-6 flex flex-col items-center gap-2">
            <label className="group flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-dashed border-primary-pink/30 bg-white/50 hover:bg-white/80 hover:border-primary-pink/50 transition-all duration-300 cursor-pointer select-none">
              <div className="w-7 h-7 rounded-full bg-primary-pink flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-[0_4px_12px_rgba(211,82,113,0.3)]">
                <Plus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-primary-pink tracking-wide">Add More Photos</span>
              <input
                ref={addInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdd}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-text-secondary/50 font-light">Select one or multiple photos</p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default PhotoGallery;
