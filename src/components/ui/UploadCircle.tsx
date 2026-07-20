import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { useEditMode } from '../../context/EditModeContext';
import { syncToSupabase } from '../../utils/supabaseSync';

interface UploadCircleProps {
  storageKey: string;
  defaultUrl: string;
  sizeClass: string;
  style: React.CSSProperties;
  delay?: number;
  yRange?: [number, number];
  zClass?: string;
}

export const UploadCircle: React.FC<UploadCircleProps> = ({
  storageKey,
  defaultUrl,
  sizeClass,
  style,
  delay = 0,
  yRange = [0, -12],
  zClass = 'z-10',
}) => {
  const { isEditMode } = useEditMode();
  const [image, setImage] = useState<string | null>(() => localStorage.getItem(storageKey));

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const b64 = reader.result as string;
      setImage(b64);
      localStorage.setItem(storageKey, b64);
      syncToSupabase(storageKey, b64);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const src = image ?? defaultUrl;
  const inputId = `circle-upload-${storageKey}`;

  // In customer mode: decorative only, no pointer events
  if (!isEditMode) {
    return (
      <motion.div
        style={{
          ...style,
          position: 'absolute',
        }}
        animate={{ y: [yRange[0], yRange[1], yRange[0]] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
        className={`${sizeClass} rounded-full overflow-hidden border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-none ${zClass}`}
      >
        <img src={src} alt="" className="w-full h-full object-cover" />
      </motion.div>
    );
  }

  // In edit mode: clickable upload slot with camera hover
  return (
    <motion.label
      htmlFor={inputId}
      style={{
        ...style,
        position: 'absolute',
      }}
      animate={{ y: [yRange[0], yRange[1], yRange[0]] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
      className={`${sizeClass} rounded-full overflow-hidden border-2 border-primary-pink/50 shadow-[0_8px_32px_rgba(211,82,113,0.2)] cursor-pointer group ${zClass}`}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-full">
        <Camera className="w-5 h-5 text-white drop-shadow" />
      </div>
      <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} />
    </motion.label>
  );
};
