import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

const PrivacyContext = createContext(null);

const PUBLIC_TITLE  = 'Nexus Portal — Project Overview';
const PRIVATE_TITLE = 'Reference Manual — v4.2.1 — Internal Only';
const HISTORY_STORAGE_KEY = 'nx-source-history-v1';

function readHistoryFromStorage() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return { media: [], browser: [] };
    const parsed = JSON.parse(raw);
    return {
      media: Array.isArray(parsed?.media) ? parsed.media : [],
      browser: Array.isArray(parsed?.browser) ? parsed.browser : [],
    };
  } catch {
    return { media: [], browser: [] };
  }
}

export function PrivacyProvider({ children }) {
  const [isPrivate, setIsPrivate]   = useState(false);
  const [isMuted,   setIsMuted]     = useState(false);
  const [mediaUrl,  setMediaUrl]    = useState('');
  const [isPlaying, setIsPlaying]   = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [contentMode, setContentMode] = useState('media');
  const [browserUrl, setBrowserUrl] = useState('https://example.com');
  const [theme, setTheme] = useState('midnight');
  const [sourceHistory, setSourceHistory] = useState(() => readHistoryFromStorage());

  // Forwarded ref from ContentSwitcher so we can imperatively pause
  const playerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme === 'paper' ? 'light' : 'dark';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sourceHistory));
  }, [sourceHistory]);

  const addSourceToHistory = useCallback((type, source) => {
    const nextSource = source?.trim();
    if (!nextSource || (type !== 'media' && type !== 'browser')) return;

    setSourceHistory(prev => {
      const list = Array.isArray(prev[type]) ? prev[type] : [];
      const deduped = [nextSource, ...list.filter(item => item !== nextSource)].slice(0, 8);
      return { ...prev, [type]: deduped };
    });
  }, []);

  const saveCurrentPlaybackTime = useCallback(() => {
    const player = playerRef.current;
    if (!player || typeof player.getCurrentTime !== 'function') return;
    const time = player.getCurrentTime();
    if (Number.isFinite(time) && time >= 0) setPlaybackTime(time);
  }, []);

  const activatePrivacy = useCallback(() => {
    saveCurrentPlaybackTime();
    // Pause & mute before hiding
    setIsPlaying(false);
    setIsMuted(true);
    setIsPrivate(true);
    document.title = PRIVATE_TITLE;
  }, [saveCurrentPlaybackTime]);

  const deactivatePrivacy = useCallback(() => {
    setIsPrivate(false);
    setIsMuted(false);
    document.title = PUBLIC_TITLE;
  }, []);

  const togglePrivacy = useCallback(() => {
    setIsPrivate(prev => {
      if (!prev) {
        saveCurrentPlaybackTime();
        setIsPlaying(false);
        setIsMuted(true);
        document.title = PRIVATE_TITLE;
      } else {
        setIsMuted(false);
        document.title = PUBLIC_TITLE;
      }
      return !prev;
    });
  }, [saveCurrentPlaybackTime]);

  const value = {
    isPrivate,
    isMuted,
    setIsMuted,
    mediaUrl,
    setMediaUrl,
    isPlaying,
    setIsPlaying,
    playbackTime,
    setPlaybackTime,
    contentMode,
    setContentMode,
    browserUrl,
    setBrowserUrl,
    sourceHistory,
    addSourceToHistory,
    theme,
    setTheme,
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
