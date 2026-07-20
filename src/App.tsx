import { useEffect, useRef, useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';
import { MusicProvider } from './context/MusicContext';
import { EditModeProvider } from './context/EditModeContext';
import Landing from './sections/Landing/Landing';
import Story from './sections/Story/Story';
import CompleteReasons from './sections/Story/components/CompleteReasons';
import CinematicTransition from './sections/Landing/CinematicTransition';
import { pullFromSupabase } from './utils/supabaseSync';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in Romantic Microsite:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px", color: "#b91c1c", background: "#fef2f2", fontFamily: "monospace", minHeight: "100vh", overflow: "auto" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>Client-side Render Crash Captured</h1>
          <p style={{ fontWeight: "bold" }}>Error message:</p>
          <pre style={{ background: "#fee2e2", padding: "16px", borderRadius: "8px" }}>{this.state.error?.toString()}</pre>
          <p style={{ fontWeight: "bold", marginTop: "16px" }}>Stack trace:</p>
          <pre style={{ background: "#fee2e2", padding: "16px", borderRadius: "8px", fontSize: "12px", lineHeight: "1.5" }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true });
    };

    window.addEventListener('popstate', handlePopState);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Pull data from Supabase DB on startup
    pullFromSupabase();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true });
  };

  const handleBeginJourney = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    navigateTo('/story');
  };

  return (
    <div className="relative w-full min-h-screen bg-soft-white">
      {currentPath === '/reasons' ? (
        <CompleteReasons />
      ) : currentPath === '/story' ? (
        <Story />
      ) : (
        <Landing onBeginJourney={handleBeginJourney} />
      )}

      {/* Cinematic Transition Overlay overlaying Landing page */}
      <AnimatePresence>
        {isTransitioning && (
          <CinematicTransition onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <MusicProvider>
        <EditModeProvider>
          <AppContent />
        </EditModeProvider>
      </MusicProvider>
    </ErrorBoundary>
  );
}

export default App;
