import { useState } from 'react';
import { Lock, Eye, ShieldCheck, Terminal } from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

/**
 * PrivacyOverlay
 *
 * A full-screen "lock" overlay that can optionally be rendered when
 * the user wants a total screen blackout rather than just hiding the widget.
 * Toggle via the 🔒 button in the footer status bar.
 */
export default function PrivacyOverlay({ isOverlayActive, onDismiss }) {
  const { isPrivate } = usePrivacy();
  const [hovered, setHovered] = useState(false);

  if (!isOverlayActive || !isPrivate) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-nx-bg/98 backdrop-blur-sm flex flex-col items-center justify-center gap-6 animate-fade-in cursor-pointer"
      onClick={onDismiss}
    >
      {/* Lock icon ring */}
      <div
        className={`relative transition-all duration-300 ${hovered ? 'scale-105' : 'scale-100'}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-20 h-20 rounded-2xl bg-nx-surface border border-nx-border flex items-center justify-center shadow-2xl">
          <Lock size={32} strokeWidth={1.5} className="text-nx-sky" />
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-2xl border border-nx-sky/20 animate-ping opacity-30" />
      </div>

      {/* Text */}
      <div className="text-center space-y-1.5">
        <p className="font-mono text-[13px] font-semibold text-nx-text tracking-wide">
          SCREEN LOCKED
        </p>
        <p className="font-mono text-[11px] text-nx-sub">
          Click anywhere or press <kbd className="bg-nx-raised border border-nx-border px-1.5 py-0.5 rounded text-nx-text text-[10px]">Alt+X</kbd> to restore
        </p>
      </div>

      {/* Fake terminal line — adds convincing context */}
      <div className="flex items-center gap-2 bg-nx-surface border border-nx-border rounded-md px-4 py-2 font-mono text-[11px] text-nx-sub">
        <Terminal size={11} strokeWidth={2} className="text-nx-green" />
        <span className="doc-comment">nexus-portal · reference-manual-v4.2.1</span>
        <span className="w-1.5 h-3.5 bg-nx-sky/70 animate-pulse ml-1 rounded-sm" />
      </div>

      {/* Status row */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-nx-sub">
          <ShieldCheck size={10} className="text-nx-sky" />
          Privacy mode active
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-nx-sub">
          <Eye size={10} className="text-nx-sub" />
          Stream muted & paused
        </div>
      </div>
    </div>
  );
}
