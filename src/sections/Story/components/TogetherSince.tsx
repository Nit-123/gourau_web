import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Edit3, Check } from 'lucide-react';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SectionWrapper } from '../../../components/common/SectionWrapper';
import { UploadCircle } from '../../../components/ui/UploadCircle';
import { useEditMode } from '../../../context/EditModeContext';
import { syncToSupabase } from '../../../utils/supabaseSync';

export const TogetherSince: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [anniversaryDate, setAnniversaryDate] = useState("2022-02-14");
  const [quote, setQuote] = useState("Every day with you has been my favorite chapter.");
  const [isEditing, setIsEditing] = useState(false);

  // Disable inline editing if Owner Edit Mode is turned off globally
  useEffect(() => {
    if (!isEditMode) {
      setIsEditing(false);
    }
  }, [isEditMode]);

  // Load configuration from localstorage
  useEffect(() => {
    const savedDate = localStorage.getItem('anniversary_date');
    const savedQuote = localStorage.getItem('anniversary_quote');
    if (savedDate) setAnniversaryDate(savedDate);
    if (savedQuote) setQuote(savedQuote);
  }, []);

  const handleSave = () => {
    localStorage.setItem('anniversary_date', anniversaryDate);
    localStorage.setItem('anniversary_quote', quote);
    syncToSupabase('anniversary_date', anniversaryDate);
    syncToSupabase('anniversary_quote', quote);
    setIsEditing(false);
  };

  // Perform anniversary calculations
  const calculateDuration = () => {
    const start = new Date(anniversaryDate);
    const today = new Date();
    
    // Total days difference
    const diffTime = Math.abs(today.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calendar months
    let totalMonths = (today.getFullYear() - start.getFullYear()) * 12 + today.getMonth() - start.getMonth();
    if (today.getDate() < start.getDate()) {
      totalMonths--;
    }

    // Full years
    let totalYears = today.getFullYear() - start.getFullYear();
    const hasAnniversaryPassedThisYear = 
      today.getMonth() > start.getMonth() || 
      (today.getMonth() === start.getMonth() && today.getDate() >= start.getDate());
    if (!hasAnniversaryPassedThisYear) {
      totalYears--;
    }

    // Progress bar for the current year together
    // Anniversary starts on Feb 14 of current year (or previous year if anniversary has not passed yet in current calendar year)
    const currentAnniversaryYearStart = new Date(start);
    currentAnniversaryYearStart.setFullYear(today.getFullYear());
    if (today < currentAnniversaryYearStart) {
      currentAnniversaryYearStart.setFullYear(today.getFullYear() - 1);
    }
    
    const nextAnniversaryYearStart = new Date(currentAnniversaryYearStart);
    nextAnniversaryYearStart.setFullYear(currentAnniversaryYearStart.getFullYear() + 1);

    const msPassedThisAnniversaryYear = today.getTime() - currentAnniversaryYearStart.getTime();
    const totalMsInThisAnniversaryYear = nextAnniversaryYearStart.getTime() - currentAnniversaryYearStart.getTime();
    
    const daysPassedThisYear = Math.floor(msPassedThisAnniversaryYear / (1000 * 60 * 60 * 24)) + 1;
    const totalDaysInThisAnniversaryYear = Math.floor(totalMsInThisAnniversaryYear / (1000 * 60 * 60 * 24));
    
    const percentagePassed = Math.min(100, Math.max(0, Math.floor((daysPassedThisYear / totalDaysInThisAnniversaryYear) * 100)));

    return {
      days: totalDays,
      months: totalMonths,
      years: totalYears,
      daysPassedThisYear,
      percentagePassed
    };
  };

  const { days, months, years, daysPassedThisYear, percentagePassed } = calculateDuration();

  const formatDateString = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC' // Keep date exact without timezone offsets
    });
  };

  return (
    <SectionWrapper id="together-since" className="relative justify-center py-16 px-4 bg-transparent">
      {/* Visual profile decorations */}
      <UploadCircle storageKey="ts_c1" defaultUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250" sizeClass="w-20 h-20 md:w-28 md:h-28" style={{ top: '25%', left: '4%' }} delay={0} />
      <UploadCircle storageKey="ts_c2" defaultUrl="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250" sizeClass="w-24 h-24 md:w-32 md:h-32" style={{ bottom: '20%', right: '4%' }} delay={1.5} yRange={[0, 10]} />
      {/* Edit Trigger — only shown in owner edit mode */}
      {isEditMode && (
        <div className="absolute top-6 right-6 z-30">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-semibold shadow-sm hover:bg-emerald-100 transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/60 text-primary-pink border border-primary-pink/20 text-xs font-semibold shadow-sm hover:bg-white/95 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Anniversary
            </button>
          )}
        </div>
      )}

      <div className="z-10 flex flex-col items-center justify-center w-full max-w-2xl text-center">
        {/* Header Badge */}
        <span className="text-xs font-heading font-medium tracking-[0.25em] text-primary-pink uppercase mb-3">
          OUR JOURNEY
        </span>

        {/* Title */}
        <div className="flex flex-col items-center justify-center gap-2.5 mb-2 select-none">
          <Heart className="w-8 h-8 text-primary-pink fill-primary-pink animate-pulse-subtle" />
          <h2 className="text-3xl md:text-5xl font-heading font-light text-text-primary">
            Together Since
          </h2>
        </div>

        {/* Display Anniversary Date */}
        {isEditing ? (
          <input
            type="date"
            value={anniversaryDate}
            onChange={(e) => setAnniversaryDate(e.target.value)}
            className="mt-2 text-center border border-primary-pink/30 rounded-xl px-4 py-2 text-lg text-text-primary focus:outline-none focus:border-primary-pink bg-white"
          />
        ) : (
          <p className="text-sm md:text-base text-primary-pink/80 font-light mb-10 select-none">
            {formatDateString(anniversaryDate)}
          </p>
        )}

        {/* Calculations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-4">
          {/* Days */}
          <GlassCard className="p-6 flex flex-col items-center justify-center border border-white/40 shadow-sm">
            <h3 className="text-4xl md:text-5xl font-heading font-light text-primary-pink mb-1 select-none">
              {days.toLocaleString()}
            </h3>
            <span className="text-[10px] md:text-xs text-text-secondary tracking-widest uppercase font-semibold">
              Days Together
            </span>
          </GlassCard>

          {/* Months */}
          <GlassCard className="p-6 flex flex-col items-center justify-center border border-white/40 shadow-sm">
            <h3 className="text-4xl md:text-5xl font-heading font-light text-primary-pink mb-1 select-none">
              {months.toLocaleString()}
            </h3>
            <span className="text-[10px] md:text-xs text-text-secondary tracking-widest uppercase font-semibold">
              Months Together
            </span>
          </GlassCard>

          {/* Years */}
          <GlassCard className="p-6 flex flex-col items-center justify-center border border-white/40 shadow-sm">
            <h3 className="text-4xl md:text-5xl font-heading font-light text-primary-pink mb-1 select-none">
              {years.toLocaleString()}
            </h3>
            <span className="text-[10px] md:text-xs text-text-secondary tracking-widest uppercase font-semibold">
              Years Together
            </span>
          </GlassCard>
        </div>

        {/* Subtitle Quote & Progress Scrubber */}
        <div className="w-full max-w-xl mt-12 px-2">
          {isEditing ? (
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full text-center px-4 py-2 text-sm font-body text-text-secondary bg-white/80 border border-primary-pink/30 rounded-2xl focus:outline-none focus:border-primary-pink"
              rows={2}
            />
          ) : (
            <p className="text-sm md:text-base text-text-secondary italic font-light font-body tracking-wide mb-8 leading-relaxed">
              "{quote}"
            </p>
          )}

          {/* Progress Bar Container */}
          <div className="w-full flex flex-col gap-2 mt-4 select-none">
            <div className="flex justify-between items-center text-[10px] md:text-xs text-text-secondary font-mono tracking-wider font-semibold">
              <span className="uppercase">DAY {daysPassedThisYear} OF THIS YEAR TOGETHER</span>
              <span>{percentagePassed}%</span>
            </div>
            <div className="w-full h-1.5 bg-primary-pink/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${percentagePassed}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-primary-pink rounded-full shadow-[0_0_8px_rgba(211,82,113,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TogetherSince;
