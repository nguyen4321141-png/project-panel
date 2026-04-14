import { useState, useRef, useEffect } from 'react';
import { X, Link2, CheckCircle2, AlertCircle } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

const PLACEHOLDER_URLS = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://vimeo.com/148751763',
  'https://www.twitch.tv/videos/...',
  'https://player.vimeo.com/video/...',
];

function isValidUrl(str) {
  try { new URL(str); return true; } catch { return false; }
}

export default function ConfigDrawer({ isOpen, onClose }) {
  const { mediaUrl, setMediaUrl } = usePrivacy();
  const [draft, setDraft]         = useState(mediaUrl);
  const [saved, setSaved]         = useState(false);
  const inputRef                  = useRef(null);

  // Reset draft when drawer opens
  useEffect(() => {
    if (isOpen) {
      setDraft(mediaUrl);
      setSaved(false);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, mediaUrl]);

  const handleSave = () => {
    if (!draft.trim()) return;
    setMediaUrl(draft.trim());
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 900);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onClose();
  };

  const valid = draft.trim() === '' || isValidUrl(draft.trim());

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-80 bg-nx-surface border-l border-nx-border flex flex-col animate-slide-in shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-nx-border">
          <div>
            <p className="text-[13px] font-semibold text-nx-text">Stream Configuration</p>
            <p className="text-[11px] text-nx-sub mt-0.5">Multimedia Briefing Module</p>
          </div>
          <button onClick={onClose} className="nx-btn-ghost p-1.5">
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 py-5 space-y-5 overflow-y-auto">

          {/* URL input */}
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-[11px] font-mono text-nx-sub uppercase tracking-widest">
              <Link2 size={10} strokeWidth={2} />
              Source URL
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="url"
                value={draft}
                onChange={e => { setDraft(e.target.value); setSaved(false); }}
                onKeyDown={handleKey}
                placeholder={PLACEHOLDER_URLS[0]}
                className={`w-full bg-nx-raised border rounded-md px-3 py-2 text-[12px] font-mono
                            text-nx-text placeholder:text-nx-border outline-none transition-all
                            focus:ring-1 ${
                              !valid
                                ? 'border-nx-red/50 focus:ring-nx-red/30'
                                : 'border-nx-border focus:border-nx-sky focus:ring-nx-sky/20'
                            }`}
              />
              {draft && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  {valid
                    ? <CheckCircle2 size={12} className="text-nx-green" />
                    : <AlertCircle  size={12} className="text-nx-red" />
                  }
                </div>
              )}
            </div>
            {!valid && (
              <p className="text-[11px] text-nx-red font-mono">
                Invalid URL format
              </p>
            )}
          </div>

          {/* Supported platforms */}
          <div className="space-y-2">
            <p className="text-[11px] font-mono text-nx-sub uppercase tracking-widest">
              Supported Platforms
            </p>
            <div className="space-y-1">
              {[
                'YouTube & YouTube Shorts',
                'Vimeo',
                'Twitch (VODs & streams)',
                'Direct MP4 / WebM files',
                'HLS (.m3u8) streams',
                'Dailymotion',
              ].map(p => (
                <div key={p} className="flex items-center gap-2 text-[12px] text-nx-sub">
                  <span className="w-1 h-1 rounded-full bg-nx-muted inline-block" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Privacy reminder */}
          <div className="bg-nx-sky/5 border border-nx-sky/20 rounded-md px-3 py-2.5 space-y-1">
            <p className="text-[11px] font-mono text-nx-sky font-medium">Privacy Shortcuts</p>
            <p className="text-[11px] text-nx-sub">
              <kbd className="bg-nx-muted px-1.5 py-0.5 rounded border border-nx-border font-mono text-nx-text">Alt+X</kbd>
              {' '} — Toggle privacy mode
            </p>
            <p className="text-[11px] text-nx-sub">
              <kbd className="bg-nx-muted px-1.5 py-0.5 rounded border border-nx-border font-mono text-nx-text">Esc × 2</kbd>
              {' '} — Instant lock
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-nx-border flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 nx-btn border border-nx-border text-nx-sub hover:text-nx-text hover:bg-nx-raised justify-center text-[12px]"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!valid || !draft.trim()}
            className={`flex-1 nx-btn justify-center text-[12px] transition-all duration-200 ${
              saved
                ? 'bg-nx-green/20 text-nx-green border border-nx-green/30'
                : 'nx-btn-accent disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {saved ? (
              <><CheckCircle2 size={12} strokeWidth={2} /> Saved</>
            ) : (
              'Apply Source'
            )}
          </button>
        </div>
      </div>
    </>
  );
}
