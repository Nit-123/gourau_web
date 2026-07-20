import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export interface TrackMetadata {
  title: string;
  artist: string;
  albumArt: string;
}

interface MusicContextType {
  isPlaying: boolean;
  hasPlayedOnce: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  metadata: TrackMetadata;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const metadata: TrackMetadata = {
    title: "Our Song",
    artist: "Replace Later",
    albumArt: "" // Can be handled dynamically in CSS or components
  };

  useEffect(() => {
    const audio = new Audio('/music/our-song.mp3');
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onDurationChange = () => {
      setDuration(audio.duration || 0);
    };

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audioRef.current = null;
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasPlayedOnce(true);
        })
        .catch((err) => {
          console.warn("Playback interrupted or blocked by browser policies:", err);
          setIsPlaying(false);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      // Prevent seeking to invalid ranges
      const boundedTime = Math.max(0, Math.min(duration, time));
      audioRef.current.currentTime = boundedTime;
      setCurrentTime(boundedTime);
    }
  };

  const setVolume = (val: number) => {
    const clampedVolume = Math.max(0, Math.min(1, val));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        hasPlayedOnce,
        currentTime,
        duration,
        volume,
        metadata,
        play,
        pause,
        togglePlay,
        seek,
        setVolume
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
