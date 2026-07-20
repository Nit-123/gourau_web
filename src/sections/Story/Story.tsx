import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { navigateTo } from '../../utils/navigation';
import LoveStoryHero from './components/LoveStoryHero';
import TogetherSince from './components/TogetherSince';
import MemoryTimeline from './components/MemoryTimeline';
import PhotoGallery from './components/PhotoGallery';
import LoveLetters from './components/LoveLetters';
import BucketList from './components/BucketList';
import OpenWhen from './components/OpenWhen';
import FinalWords from './components/FinalWords';
import ReasonsPreview from './components/ReasonsPreview';

export const Story: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center bg-[#fff3f5] relative">
      {/* Back to Home — fixed top-left */}
      <div className="fixed top-5 left-5 z-50">
        <button
          onClick={() => navigateTo('/')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-primary-pink/20 bg-white/70 backdrop-blur-sm text-primary-pink text-xs font-semibold shadow-sm hover:bg-white transition-all cursor-pointer hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>
      </div>

      {/* 1. Love Story Hero */}
      <LoveStoryHero />

      {/* 2. Together Since Calculator */}
      <TogetherSince />

      {/* 3. Memory Timeline */}
      <MemoryTimeline />

      {/* 4. 365 Reasons Preview */}
      <ReasonsPreview />

      {/* 5. Photo Gallery */}
      <PhotoGallery />

      {/* 6. Love Letters */}
      <LoveLetters />

      {/* 7. Future Bucket List */}
      <BucketList />

      {/* 8. Open When... Accordion */}
      <OpenWhen />

      {/* 9. Final Words + Letter Modal */}
      <FinalWords />
    </div>
  );
};

export default Story;
