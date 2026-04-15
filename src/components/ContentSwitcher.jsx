import { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, Globe } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

// Lazy-load ReactPlayer to avoid SSR issues and reduce initial bundle
let ReactPlayer = null;

function PlayerPlaceholder({ onLoad }) {
  useEffect(() => {
    import('react-player/lazy').then(mod => {
      ReactPlayer = mod.default;
      onLoad();
    });
  }, [onLoad]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-nx-bg">
      <div className="flex items-center gap-2 text-nx-sub text-[12px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-nx-sky animate-ping" />
        Loading player…
      </div>
    </div>
  );
}

export default function ContentSwitcher() {
  const {
    mediaUrl,
    browserUrl,
    contentMode,
    isMuted,
    setIsMuted,
    isPlaying,
    setIsPlaying,
    playbackTime,
    setPlaybackTime,
    playerRef,
  } = usePrivacy();
  const [playerReady, setPlayerReady] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const [duration, setDuration]         = useState(0);
  const [progress, setProgress]         = useState(0);
  const internalRef                     = useRef(null);

  // Sync internal ref with context ref
  useEffect(() => {
    if (internalRef.current) playerRef.current = internalRef.current;
  });

  const hasMediaUrl = Boolean(mediaUrl?.trim());
  const hasBrowserUrl = Boolean(browserUrl?.trim());

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (contentMode === 'media') setProgress(playbackTime || 0);
  }, [contentMode, playbackTime]);

  const handleSeek = (value) => {
    const next = Number(value);
    if (!Number.isFinite(next)) return;
    setProgress(next);
    setPlaybackTime(next);
    if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
      playerRef.current.seekTo(next, 'seconds');
    }
  };

  return (
    <div>
      <div className={contentMode === 'media' ? 'flex flex-col' : 'hidden'} aria-hidden={contentMode !== 'media'}>
        {!hasMediaUrl ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[180px] gap-3 text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-nx-raised border border-nx-border flex items-center justify-center">
              <Play size={18} strokeWidth={1.5} className="text-nx-sub ml-0.5" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-nx-text">No stream configured</p>
              <p className="text-[11px] text-nx-sub mt-0.5">
                Open settings to add a source URL
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="react-player-wrapper bg-black rounded-t-none">
              {!playerLoaded && <PlayerPlaceholder onLoad={() => setPlayerLoaded(true)} />}
              {playerLoaded && ReactPlayer && (
                <ReactPlayer
                  ref={internalRef}
                  url={mediaUrl}
                  playing={isPlaying}
                  muted={isMuted}
                  volume={isMuted ? 0 : 0.8}
                  width="100%"
                  height="100%"
                  onReady={() => {
                    setPlayerReady(true);
                    if (playbackTime > 0 && internalRef.current?.seekTo) {
                      internalRef.current.seekTo(playbackTime, 'seconds');
                    }
                  }}
                  onDuration={setDuration}
                  onProgress={({ playedSeconds }) => {
                    setProgress(playedSeconds);
                    setPlaybackTime(playedSeconds);
                  }}
                  onEnded={() => setIsPlaying(false)}
                  config={{
                    youtube: {
                      playerVars: {
                        modestbranding: 1,
                        rel: 0,
                        iv_load_policy: 3,
                      },
                    },
                  }}
                />
              )}
            </div>

            <div className="bg-nx-raised border-t border-nx-border px-3 py-2 flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(p => !p)}
                disabled={!playerReady}
                className="nx-btn-ghost nx-btn-anim p-1.5 disabled:opacity-30"
              >
                {isPlaying
                  ? <Pause  size={13} strokeWidth={2} />
                  : <Play   size={13} strokeWidth={2} className="ml-0.5" />
                }
              </button>

              <div className="flex-1 flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={Math.max(duration, 0)}
                  step={0.1}
                  value={Math.min(progress, duration || progress)}
                  onChange={(e) => handleSeek(e.target.value)}
                  disabled={!playerReady || duration <= 0}
                  className="nx-range flex-1"
                  aria-label="Playback timeline"
                />
                {duration > 0 && (
                  <span className="text-[10px] font-mono text-nx-sub shrink-0">
                    {formatTime(progress)}/{formatTime(duration)}
                  </span>
                )}
              </div>

              <button
                onClick={() => setIsMuted(m => !m)}
                className="nx-btn-ghost nx-btn-anim p-1.5"
              >
                {isMuted
                  ? <VolumeX size={13} strokeWidth={2} className="text-nx-red" />
                  : <Volume2 size={13} strokeWidth={2} />
                }
              </button>

              <a
                href={mediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn-ghost nx-btn-anim p-1.5"
                title="Open source in new tab"
              >
                <ExternalLink size={11} strokeWidth={2} />
              </a>
            </div>
          </>
        )}
      </div>

      <div className={contentMode === 'browser' ? 'flex flex-col' : 'hidden'} aria-hidden={contentMode !== 'browser'}>
        {!hasBrowserUrl ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[180px] gap-3 text-center px-4">
            <div className="w-10 h-10 rounded-xl bg-nx-raised border border-nx-border flex items-center justify-center">
              <Globe size={18} strokeWidth={1.5} className="text-nx-sub" />
            </div>
            <div>
              <p className="text-[12px] font-medium text-nx-text">No browser URL configured</p>
              <p className="text-[11px] text-nx-sub mt-0.5">
                Open settings to add a browser URL
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="h-[260px] bg-nx-bg border-b border-nx-border">
              <iframe
                src={browserUrl}
                title="Embedded browser"
                className="w-full h-full border-0"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-forms allow-same-origin allow-popups"
              />
            </div>
            <div className="bg-nx-raised border-t border-nx-border px-3 py-2 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-nx-sub truncate block">
                  Browser Mode: {browserUrl}
                </span>
                <span className="text-[10px] font-mono text-nx-border block">
                  Some sites block iframe login/embed (403/CSRF). Use open-in-new-tab.
                </span>
              </div>
              <a
                href={browserUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn-ghost nx-btn-anim p-1.5"
                title="Open browser URL in new tab"
              >
                <ExternalLink size={11} strokeWidth={2} />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
