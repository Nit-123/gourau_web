import React from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  className = ""
}) => {
  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <div className="relative w-full flex items-center">
        <input
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={handleSliderChange}
          className="custom-slider w-full"
          style={{
            background: `linear-gradient(to right, var(--primary-pink) 0%, var(--primary-pink) ${percentage}%, rgba(211, 82, 113, 0.15) ${percentage}%, rgba(211, 82, 113, 0.15) 100%)`
          }}
        />
      </div>
      <div className="flex justify-between items-center text-[10px] md:text-xs text-text-secondary font-mono tracking-wider font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
