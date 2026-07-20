import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// ── Change this to your secret password ──────────────────────────────────────
const OWNER_PASSWORD = 'gourav2024';

interface EditModeContextType {
  isEditMode: boolean;
  exitEditMode: () => void;
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  exitEditMode: () => {},
});

export const useEditMode = () => useContext(EditModeContext);

// ── Provider ─────────────────────────────────────────────────────────────────
export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for Ctrl+Shift+E / Cmd+Shift+E
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const isE = e.key === 'e' || e.key === 'E';
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && isE) {
        e.preventDefault();
        console.log('Owner shortcut detected. Current edit state:', isEditMode);
        if (!isEditMode) {
          setShowDialog(true);
          setPassword('');
          setError('');
          setTimeout(() => inputRef.current?.focus(), 80);
        }
      }
    },
    [isEditMode]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password === OWNER_PASSWORD) {
      setIsEditMode(true);
      setShowDialog(false);
      setError('');
    } else {
      setError('Incorrect password.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const exitEditMode = () => setIsEditMode(false);

  return (
    <EditModeContext.Provider value={{ isEditMode, exitEditMode }}>
      {children}

      {/* ── Password Dialog ── */}
      {showDialog && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center p-4"
          onKeyDown={(e) => e.key === 'Escape' && setShowDialog(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-md"
            onClick={() => setShowDialog(false)}
          />

          {/* Card */}
          <div
            className={`relative z-10 w-full max-w-[320px] bg-white/90 backdrop-blur-2xl rounded-[2rem] shadow-[0_24px_80px_rgba(211,82,113,0.12)] border border-white/70 p-8 flex flex-col gap-5 transition-transform ${
              shake ? 'animate-[wiggle_0.4s_ease-in-out]' : ''
            }`}
          >
            {/* Lock icon */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-pink/8 border border-primary-pink/15 flex items-center justify-center text-2xl">
                🔒
              </div>
              <span className="text-xs font-heading font-medium tracking-[0.2em] text-primary-pink uppercase">
                Owner Access
              </span>
              <p className="text-[11px] text-text-secondary/70 font-light text-center leading-relaxed">
                Enter your password to enable edit mode
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-primary-pink/20 bg-white/80 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary-pink/50 focus:ring-2 focus:ring-primary-pink/10 transition-all"
              />
              {error && (
                <p className="text-[11px] text-red-500/80 font-medium text-center">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary-pink text-white text-xs font-semibold tracking-wider uppercase shadow-[0_6px_20px_rgba(211,82,113,0.3)] hover:shadow-[0_8px_28px_rgba(211,82,113,0.45)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Enter Edit Mode
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Exit Edit Mode floating bar ── */}
      {isEditMode && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[400] flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-primary-pink/20 shadow-[0_8px_32px_rgba(211,82,113,0.15)]">
          <span className="w-2 h-2 rounded-full bg-primary-pink animate-pulse" />
          <span className="text-xs font-semibold text-primary-pink tracking-wide">
            Edit Mode Active
          </span>
          <div className="w-px h-4 bg-primary-pink/20" />
          <button
            onClick={exitEditMode}
            className="text-xs font-semibold text-text-secondary/70 hover:text-primary-pink transition-colors cursor-pointer"
          >
            Exit ✕
          </button>
        </div>
      )}
    </EditModeContext.Provider>
  );
};
