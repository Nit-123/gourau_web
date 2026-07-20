import React, { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Edit2, Check, X, Plus } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';
import { useEditMode } from '../../../context/EditModeContext';
import { syncToSupabase } from '../../../utils/supabaseSync';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string | null;
  photoLabel: string;
}



export const MemoryTimeline: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [memories, setMemories] = useState<TimelineItem[]>([]);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);

  // Automatically close editing box if owner edit mode gets disabled globally
  useEffect(() => {
    if (!isEditMode) {
      setEditingCardId(null);
    }
  }, [isEditMode]);

  // Buffer state during editing
  const [editDate, setEditDate] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);

  useEffect(() => {
    const savedMemories = localStorage.getItem('memory_timeline_cards');
    if (savedMemories) {
      try {
        const parsed = JSON.parse(savedMemories);
        // Wipe local storage if it contains the default mock items
        const isDummy = parsed.some((m: any) => m.title === "Where We Met" || m.title === "Our First Date");
        if (isDummy) {
          localStorage.removeItem('memory_timeline_cards');
          setMemories([]);
        } else {
          setMemories(parsed);
        }
      } catch (e) {
        setMemories([]);
      }
    } else {
      setMemories([]);
    }
  }, []);

  const saveToLocalStorage = (updated: TimelineItem[]) => {
    const jsonString = JSON.stringify(updated);
    localStorage.setItem('memory_timeline_cards', jsonString);
    syncToSupabase('memory_timeline_cards', jsonString);
  };

  const handleEditClick = (item: TimelineItem) => {
    setEditingCardId(item.id);
    setEditDate(item.date);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditImage(item.image);
  };

  const handleSaveClick = (id: number) => {
    const updated = memories.map((m) => {
      if (m.id === id) {
        return {
          ...m,
          date: editDate.toUpperCase(),
          title: editTitle,
          description: editDescription,
          image: editImage
        };
      }
      return m;
    });
    setMemories(updated);
    saveToLocalStorage(updated);
    setEditingCardId(null);
  };

  const handleCancelClick = () => {
    setEditingCardId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, id: number, isDirect = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isDirect) {
          const updated = memories.map((m) => (m.id === id ? { ...m, image: base64String } : m));
          setMemories(updated);
          saveToLocalStorage(updated);
        } else {
          setEditImage(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = () => {
    const nextId = memories.length > 0 ? Math.max(...memories.map(m => m.id)) + 1 : 1;
    const newMemory: TimelineItem = {
      id: nextId,
      date: "",
      title: "New Memory",
      description: "Write details about this special memory here...",
      image: null,
      photoLabel: `PHOTO_0${(nextId % 5) + 2}`
    };
    const updated = [...memories, newMemory];
    setMemories(updated);
    saveToLocalStorage(updated);
    handleEditClick(newMemory);
  };

  const handleDeleteMemory = (id: number) => {
    if (window.confirm("Are you sure you want to delete this memory?")) {
      const updated = memories.filter((m) => m.id !== id);
      setMemories(updated);
      saveToLocalStorage(updated);
      setEditingCardId(null);
    }
  };

  return (
    <SectionWrapper id="timeline-section" className="relative justify-start py-16 px-4 bg-transparent">
      {/* Background decorations using UploadCircle */}
      <UploadCircle storageKey="mt_c1" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '10%', left: '4%' }} delay={0} />
      <UploadCircle storageKey="mt_c2" defaultUrl="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '45%', right: '4%' }} delay={1.2} />
      <UploadCircle storageKey="mt_c3" defaultUrl="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=120" sizeClass="w-16 h-16 md:w-24 md:h-24" style={{ top: '80%', left: '4%' }} delay={2.4} />

      <div className="z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Header Badge */}
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          OUR STORY
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary text-center mb-16">
          Memory Timeline
        </h2>

        {/* Timeline Core Container */}
        <div className="relative w-full flex flex-col gap-12 pl-8 md:pl-16">
          {/* Vertical Pink Line */}
          <div className="absolute left-3 md:left-[1.65rem] top-2 bottom-2 w-[2px] bg-primary-pink/20" />

          {memories.map((item) => {
            const isEditingThisCard = editingCardId === item.id;

            return (
              <div key={item.id} className="relative w-full flex flex-col">
                {/* Timeline Circle Bullet Node */}
                <div className="absolute -left-[1.85rem] md:-left-[2.5rem] top-7 w-5 h-5 rounded-full border-[3px] border-white bg-primary-pink shadow-[0_0_8px_rgba(211,82,113,0.4)] flex items-center justify-center z-10" />

                {/* Glassmorphism Card */}
                <GlassCard className={`w-full p-5 md:p-7 border border-white/45 shadow-[0_8px_30px_rgba(211,82,113,0.03)] relative transition-all duration-300 ${
                  isEditingThisCard ? 'ring-2 ring-primary-pink/30 shadow-[0_12px_36px_rgba(211,82,113,0.1)]' : ''
                }`}>
                  {/* Action Toolbar on Card — only shown in owner edit mode */}
                  {isEditMode && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                      {isEditingThisCard ? (
                        <>
                          <button
                            onClick={() => handleSaveClick(item.id)}
                            className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors cursor-pointer border border-emerald-100"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={handleCancelClick}
                            className="p-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer border border-rose-100"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-1.5 rounded-full bg-white/70 text-text-secondary hover:text-primary-pink hover:bg-white transition-colors cursor-pointer border border-primary-pink/10 shadow-sm"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}

                  {isEditingThisCard ? (
                    /* Edit Mode Layout */
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-3 justify-center">
                          <label className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Title</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            placeholder="Memory Title"
                            className="w-full px-3 py-1.5 bg-white border border-primary-pink/20 rounded-xl focus:outline-none focus:border-primary-pink text-sm font-semibold"
                          />
                        </div>

                        {/* Image Upload Area in Edit Mode */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Photo</label>
                          <div className="w-full h-32 rounded-xl overflow-hidden relative border-2 border-dashed border-primary-pink/20 bg-primary-pink/[0.01] hover:bg-primary-pink/[0.03] transition-colors flex items-center justify-center cursor-pointer">
                            {editImage ? (
                              <div className="w-full h-full relative group">
                                <img src={editImage} alt="" className="w-full h-full object-cover" />
                                <label className="absolute inset-0 bg-black/40 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Upload className="w-5 h-5 mr-1.5" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">Replace</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, item.id, false)}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            ) : (
                              <label className="flex flex-col items-center justify-center p-4 cursor-pointer w-full h-full">
                                <Upload className="w-5 h-5 text-primary-pink/60 mb-1" />
                                <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Upload image</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, item.id, false)}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-text-secondary font-bold">Description</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Tell the story here..."
                          className="w-full px-3 py-2 bg-white border border-primary-pink/20 rounded-xl focus:outline-none focus:border-primary-pink text-sm font-body font-light"
                          rows={3}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-primary-pink/10">
                        <button
                          onClick={() => handleDeleteMemory(item.id)}
                          className="text-xs text-rose-500 font-semibold hover:underline cursor-pointer"
                        >
                          Delete Memory
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={handleCancelClick}
                            className="px-3.5 py-1.5 rounded-full border border-primary-pink/15 text-xs text-text-secondary hover:bg-black/5 cursor-pointer font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveClick(item.id)}
                            className="px-4 py-1.5 rounded-full bg-primary-pink text-white text-xs hover:bg-primary-pink-hover shadow-sm cursor-pointer font-bold"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Read Mode Layout */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                      {/* Left: Text Data */}
                      <div className="md:col-span-8 flex flex-col text-left select-none">
                        <h4 className="text-lg md:text-xl font-bold text-text-primary mb-2">
                          {item.title}
                        </h4>
                        <p className="text-xs md:text-sm text-text-secondary/95 leading-relaxed font-body font-light">
                          {item.description}
                        </p>
                      </div>

                      {/* Right: Rounded Image Placeholder/Showcase */}
                      <div className="md:col-span-4 flex justify-end shrink-0">
                        {item.image ? (
                          <div className="w-full h-24 md:w-36 md:h-24 rounded-2xl overflow-hidden border border-white/50 shadow-sm relative group">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            {isEditMode && (
                              <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold cursor-pointer">
                                <Upload className="w-4 h-4 mr-1.5" /> Replace Photo
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, item.id, true)}
                                  className="hidden"
                                />
                              </label>
                            )}
                          </div>
                        ) : (
                          <label className={`w-full h-24 md:w-36 md:h-24 rounded-2xl border border-dashed border-primary-pink/20 bg-primary-pink/[0.01] flex flex-col items-center justify-center gap-1.5 p-2 text-center ${isEditMode ? 'cursor-pointer hover:border-primary-pink/40 hover:bg-primary-pink/[0.03] transition-colors' : 'pointer-events-none'}`}>
                            <ImageIcon className="w-4 h-4 text-primary-pink/50" />
                            <span className="text-[9px] font-mono tracking-wider font-bold text-primary-pink/60 uppercase">
                              {item.photoLabel}
                            </span>
                            {isEditMode && (
                              <>
                                <span className="text-[8px] text-text-secondary font-light uppercase">
                                  Upload photo
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleImageUpload(e, item.id, true)}
                                  className="hidden"
                                />
                              </>
                            )}
                          </label>
                        )}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </div>
            );
          })}

          {/* Add Memory Button — only shown in owner edit mode */}
          {isEditMode && (
            <div className="relative w-full flex pl-1 py-4">
              <button
                onClick={handleAddMemory}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-dashed border-primary-pink/40 hover:border-primary-pink bg-primary-pink/[0.01] hover:bg-primary-pink/[0.04] text-primary-pink text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm ml-[-0.65rem] z-10 hover:shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Memory Card
              </button>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MemoryTimeline;
