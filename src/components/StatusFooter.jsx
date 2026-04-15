import { Shield, ShieldOff, Lock, Unlock, Wifi, Clock } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

export default function StatusFooter({ onToggleOverlay, overlayActive }) {
  const { isPrivate, togglePrivacy } = usePrivacy();

  const now = new Date().toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <footer className="sticky bottom-0 z-30 border-t border-nx-border bg-nx-surface/90 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-8 flex items-center gap-4">

        {/* Left: privacy indicator */}
        <div className={`flex items-center gap-1.5 text-[10px] font-mono transition-colors ${
          isPrivate ? 'text-nx-sky' : 'text-nx-sub'
        }`}>
          {isPrivate
            ? <ShieldOff size={9} strokeWidth={2} />
            : <Shield    size={9} strokeWidth={1.8} />
          }
          {isPrivate ? 'private mode' : 'standard mode'}
        </div>

        <div className="w-px h-3 bg-nx-border" />

        {/* Full-screen lock toggle */}
        <button
          onClick={onToggleOverlay}
          disabled={!isPrivate}
          title={isPrivate ? 'Toggle full-screen lock' : 'Enable privacy mode first'}
          className={`flex items-center gap-1 text-[10px] font-mono transition-colors nx-btn-anim rounded px-1.5 py-0.5
            ${isPrivate
              ? 'text-nx-sub hover:text-nx-sky cursor-pointer'
              : 'text-nx-border cursor-not-allowed'
            }`}
        >
          {overlayActive
            ? <Unlock size={9} strokeWidth={2} />
            : <Lock   size={9} strokeWidth={1.8} />
          }
          {overlayActive ? 'unlock screen' : 'lock screen'}
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right: env + time */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] font-mono text-nx-border">
            <Wifi size={9} strokeWidth={2} />
            eng-prod
          </div>
          <div className="w-px h-3 bg-nx-border" />
          <div className="flex items-center gap-1 text-[10px] font-mono text-nx-border">
            <Clock size={9} strokeWidth={2} />
            {now}
          </div>
          <div className="w-px h-3 bg-nx-border" />
          <span className="text-[10px] font-mono text-nx-border">
            nexus-portal <span className="text-nx-muted">v1.0.0</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
