import { useState } from 'react';
import { Settings2, Code2, Video, ShieldCheck, ShieldOff, Eye, EyeOff, Globe } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';
import ContentSwitcher from './ContentSwitcher.jsx';
import DocBlock        from './DocBlock.jsx';
import ConfigDrawer    from './ConfigDrawer.jsx';

/**
 * MediaWidget
 *
 * Presents as a "Multimedia Briefing" panel in the dashboard.
 * Internally hosts the ContentSwitcher (media player) or DocBlock
 * depending on the global `isPrivate` state from PrivacyContext.
 *
 * The ⚙ config button is intentionally low-profile (icon-only, ghost style).
 */
export default function MediaWidget() {
  const { isPrivate, togglePrivacy, contentMode, setContentMode } = usePrivacy();
  const [drawerOpen, setDrawerOpen]  = useState(false);

  return (
    <>
      <div className={`nx-card overflow-hidden transition-all duration-300 ${
        isPrivate ? 'ring-1 ring-nx-sky/20' : ''
      }`}>
        {/* ── Widget header ───────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-nx-border">
          <div className="flex items-center gap-2">
            {isPrivate
              ? <Code2  size={14} strokeWidth={1.8} className="text-nx-sky" />
              : <Video  size={14} strokeWidth={1.8} className="text-nx-sky" />
            }
            <span className="text-[13px] font-semibold text-nx-text">
              {isPrivate ? 'SDK Reference' : 'Multimedia Briefing'}
            </span>
            {isPrivate && (
              <span className="nx-badge bg-nx-sky/10 text-nx-sky border border-nx-sky/20 text-[10px] font-mono">
                v4.2.1
              </span>
            )}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {/* Privacy toggle */}
            <button
              onClick={togglePrivacy}
              title={isPrivate ? 'Show media (Alt+X)' : 'Enable privacy (Alt+X)'}
              className={`nx-btn-ghost nx-btn-anim p-1.5 transition-colors ${
                isPrivate ? 'text-nx-sky' : 'text-nx-sub'
              }`}
            >
              {isPrivate
                ? <EyeOff size={12} strokeWidth={2} />
                : <Eye    size={12} strokeWidth={2} />
              }
            </button>

            {/* Config button — subtle, icon-only */}
            <button
              onClick={() => setDrawerOpen(true)}
              title="Configure stream source"
              className="nx-btn-ghost nx-btn-anim p-1.5 text-nx-border hover:text-nx-sub"
            >
              <Settings2 size={12} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* ── Privacy status strip (only when private) ────────── */}
        {isPrivate && (
          <div className="flex items-center gap-2 px-4 py-2 bg-nx-sky/5 border-b border-nx-sky/15">
            <ShieldCheck size={11} strokeWidth={2} className="text-nx-sky" />
            <span className="text-[11px] font-mono text-nx-sky">
              Privacy mode active — stream hidden
            </span>
            <button
              onClick={togglePrivacy}
              className="ml-auto flex items-center gap-1 text-[10px] font-mono text-nx-sub hover:text-nx-text transition-colors nx-btn-anim rounded px-1.5 py-0.5"
            >
              <ShieldOff size={9} strokeWidth={2} />
              Restore
            </button>
          </div>
        )}

        {!isPrivate && (
          <div className="px-4 py-2 border-b border-nx-border/60 flex items-center gap-2">
            <button
              onClick={() => setContentMode('media')}
              className={`nx-btn nx-btn-anim text-[11px] py-1 px-2 ${
                contentMode === 'media'
                  ? 'bg-nx-sky/15 text-nx-sky border border-nx-sky/30'
                  : 'text-nx-sub border border-nx-border hover:text-nx-text'
              }`}
            >
              <Video size={11} strokeWidth={2} />
              Media
            </button>
            <button
              onClick={() => setContentMode('browser')}
              className={`nx-btn nx-btn-anim text-[11px] py-1 px-2 ${
                contentMode === 'browser'
                  ? 'bg-nx-sky/15 text-nx-sky border border-nx-sky/30'
                  : 'text-nx-sub border border-nx-border hover:text-nx-text'
              }`}
            >
              <Globe size={11} strokeWidth={2} />
              Browser
            </button>
          </div>
        )}

        {/* ── Content area ────────────────────────────────────── */}
        <div className="privacy-transition">
          <div className={isPrivate ? 'hidden' : 'animate-fade-in'}>
            <ContentSwitcher />
          </div>

          {/* DocBlock: realistic API reference */}
          <div className={isPrivate ? 'px-4 py-3 animate-fade-in' : 'hidden'} aria-hidden={!isPrivate}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1">
                {['bg-nx-red','bg-nx-amber','bg-nx-green'].map(c => (
                  <span key={c} className={`w-2 h-2 rounded-full ${c} opacity-70`} />
                ))}
              </div>
              <span className="text-[10px] font-mono text-nx-sub">
                nexus-sdk / cache / CacheClient.ts
              </span>
            </div>
            <DocBlock />
          </div>
        </div>

        {/* ── Footer hint ─────────────────────────────────────── */}
        <div className="px-4 py-2 border-t border-nx-border/50 flex items-center justify-between">
          <span className="text-[10px] font-mono text-nx-border">
            {isPrivate ? 'nexus-sdk@4.2.1 · Apache-2.0' : 'Multimedia Briefing Module · v2.1'}
          </span>
          <span className="text-[10px] font-mono text-nx-border">
            <kbd className="text-[9px]">Alt+X</kbd> to{isPrivate ? ' restore' : ' hide'}
          </span>
        </div>
      </div>

      {/* Config drawer portal */}
      <ConfigDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
