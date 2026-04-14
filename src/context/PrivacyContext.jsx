import { createContext, useContext, useState, useCallback, useRef } from 'react';

const PrivacyContext = createContext(null);

const PUBLIC_TITLE  = 'Nexus Portal — Project Overview';
const PRIVATE_TITLE = 'Reference Manual — v4.2.1 — Internal Only';

export function PrivacyProvider({ children }) {
  const [isPrivate, setIsPrivate]   = useState(false);
  const [isMuted,   setIsMuted]     = useState(false);
  const [mediaUrl,  setMediaUrl]    = useState('');
  const [isPlaying, setIsPlaying]   = useState(false);

  // Forwarded ref from ContentSwitcher so we can imperatively pause
  const playerRef = useRef(null);

  const activatePrivacy = useCallback(() => {
    // Pause & mute before hiding
    setIsPlaying(false);
    setIsMuted(true);
    setIsPrivate(true);
    document.title = PRIVATE_TITLE;
  }, []);

  const deactivatePrivacy = useCallback(() => {
    setIsPrivate(false);
    setIsMuted(false);
    document.title = PUBLIC_TITLE;
  }, []);

  const togglePrivacy = useCallback(() => {
    setIsPrivate(prev => {
      if (!prev) {
        setIsPlaying(false);
        setIsMuted(true);
        document.title = PRIVATE_TITLE;
      } else {
        setIsMuted(false);
        document.title = PUBLIC_TITLE;
      }
      return !prev;
    });
  }, []);

  const value = {
    isPrivate,
    isMuted,
    setIsMuted,
    mediaUrl,
    setMediaUrl,
    isPlaying,
    setIsPlaying,
    playerRef,
    activatePrivacy,
    deactivatePrivacy,
    togglePrivacy,
  };

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePrivacy() {
  const ctx = useContext(PrivacyContext);
  if (!ctx) throw new Error('usePrivacy must be used within <PrivacyProvider>');
  return ctx;
}
