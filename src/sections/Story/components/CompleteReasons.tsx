import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, ArrowUp, ArrowLeft } from 'lucide-react';
import { reasons } from '../../../utils/reasons';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SecondaryButton } from '../../../components/ui/SecondaryButton';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { navigateTo } from '../../../utils/navigation';

export const CompleteReasons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(24);

  const categories = [
    { key: "all", label: "All" },
    { key: "little-things", label: "Little Things" },
    { key: "romantic", label: "Romantic" },
    { key: "cute", label: "Cute" },
    { key: "funny", label: "Funny" },
    { key: "memories", label: "Memories" },
    { key: "future", label: "Future" },
    { key: "promise", label: "Promise" }
  ];

  // Recalculate filtered cards when inputs adjust
  const filteredReasons = useMemo(() => {
    // Reset load count when filters change to prevent empty spaces
    setVisibleCount(24); 
    return reasons.filter((item) => {
      const matchesSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const displayedReasons = filteredReasons.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  return (
    <SectionWrapper id="complete-reasons" className="relative justify-start py-16 px-4 bg-soft-white border-t border-primary-pink/5">
      {/* Absolute Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => navigateTo('/story')}
          className="flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-primary-pink/15 hover:border-primary-pink/30 hover:text-primary-pink bg-white/70 text-text-secondary text-xs font-semibold shadow-sm transition-all cursor-pointer hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Story
        </button>
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-5xl text-center">
        {/* Badge */}
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3 select-none">
          THE COMPLETE COLLECTION
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary tracking-tight mb-4">
          365 Reasons Why I <span className="text-primary-pink font-semibold">Choose You</span> Every Day
        </h2>

        {/* Search & Category Filter Controls */}
        <div className="w-full max-w-3xl flex flex-col gap-6 mt-8 mb-12">
          {/* Search bar */}
          <div className="relative w-full shadow-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search specific reasons (e.g. smile, trips, cafes)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-primary-pink/15 rounded-2xl focus:outline-none focus:border-primary-pink text-sm text-text-primary placeholder:text-text-secondary/70 focus:shadow-md transition-all font-body font-light"
            />
          </div>

          {/* Category Tabs Menu */}
          <div className="flex flex-wrap justify-center gap-2 select-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold tracking-wide border transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-primary-pink text-white border-primary-pink shadow-sm'
                    : 'bg-white text-text-secondary border-primary-pink/10 hover:border-primary-pink/30 hover:text-primary-pink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Count indicator */}
        <div className="w-full flex justify-between items-center text-xs text-text-secondary font-mono tracking-widest uppercase mb-6 px-2 select-none border-b border-primary-pink/5 pb-2">
          <span>Filtered Count</span>
          <span>{filteredReasons.length} of 365 Reasons</span>
        </div>

        {/* 365 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full text-left">
          <AnimatePresence mode="popLayout">
            {displayedReasons.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-5 flex flex-col justify-between aspect-[1/1] border border-white/45 shadow-[0_4px_20px_rgba(211,82,113,0.015)] hover:shadow-[0_8px_30px_rgba(211,82,113,0.08)] hover:border-primary-pink/15 transition-all duration-300 select-none">
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
          </AnimatePresence>
        </div>

        {/* Empty Search Fallback */}
        {filteredReasons.length === 0 && (
          <div className="py-16 text-center select-none">
            <Heart className="w-10 h-10 text-primary-pink/20 stroke-1 mx-auto mb-3" />
            <p className="text-sm text-text-secondary font-light">No reasons match your current search.</p>
          </div>
        )}

        {/* Load More Trigger */}
        {filteredReasons.length > visibleCount && (
          <div className="mt-12 select-none">
            <SecondaryButton
              onClick={handleLoadMore}
              className="text-xs md:text-sm px-8 py-3.5 uppercase tracking-wider font-semibold shadow-sm"
            >
              Load More Reasons
            </SecondaryButton>
          </div>
        )}

        {/* Final Ending Message */}
        {filteredReasons.length <= visibleCount && filteredReasons.length > 0 && (
          <div className="mt-16 pt-8 border-t border-primary-pink/5 w-full max-w-xl select-none flex flex-col items-center gap-4">
            <p className="text-xs md:text-sm text-text-secondary italic font-light font-body tracking-wider mb-2">
              "I could keep writing forever. 365 was simply where I had to stop."
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigateTo('/story')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-pink hover:bg-primary-pink-hover text-white text-xs font-semibold shadow-sm transition-all cursor-pointer hover:-translate-y-0.5 font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Story
              </button>
              <button
                onClick={handleScrollToTop}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary-pink/15 hover:border-primary-pink/30 hover:text-primary-pink bg-white text-text-secondary text-xs font-semibold shadow-sm transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to Top
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default CompleteReasons;
