import { useState } from 'react';
import Navbar          from './components/Navbar.jsx';
import StatsBar        from './components/StatsBar.jsx';
import ActivityFeed    from './components/ActivityFeed.jsx';
import SystemStatus    from './components/SystemStatus.jsx';
import MediaWidget     from './components/MediaWidget.jsx';
import TeamPanel       from './components/TeamPanel.jsx';
import PrivacyOverlay  from './components/PrivacyOverlay.jsx';
import StatusFooter    from './components/StatusFooter.jsx';
import { usePrivacyMode } from './hooks/usePrivacyMode.js';

export default function App() {
  // Registers Alt+X and double-Esc keyboard listeners globally
  usePrivacyMode();

  const [overlayActive, setOverlayActive] = useState(false);

  const handleToggleOverlay = () => setOverlayActive(o => !o);
  const handleDismissOverlay = () => setOverlayActive(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Full-screen privacy overlay (opt-in lock screen) ── */}
      <PrivacyOverlay
        isOverlayActive={overlayActive}
        onDismiss={handleDismissOverlay}
      />

      {/* ── Top navigation ─────────────────────────────────── */}
      <Navbar />

      {/* ── Main content area ──────────────────────────────── */}
      <main className="flex-1 max-w-screen-2xl w-full mx-auto px-4 sm:px-6 py-5 space-y-5">

        {/* Page title row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[18px] font-semibold text-nx-text leading-tight">
              Project Overview
            </h1>
            <p className="text-[12px] text-nx-sub mt-0.5 font-mono">
              eng-prod-cluster · main branch · real-time
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-nx-green">
              <span className="w-1.5 h-1.5 rounded-full bg-nx-green animate-pulse-slow" />
              All systems operational
            </div>
          </div>
        </div>

        {/* ── Stats bar ──────────────────────────────────────── */}
        <StatsBar />

        {/* ── Main grid ──────────────────────────────────────── */}
        {/*
          Layout:
            Desktop (xl): [ActivityFeed 5col] [MediaWidget + TeamPanel 3col]
            Tablet  (md): [ActivityFeed] [right col stacked]
            Mobile:       single column
        */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-5">

          {/* Left column: Activity Feed + System Status */}
          <div className="lg:col-span-5 space-y-5">
            <ActivityFeed />
            <SystemStatus />
          </div>

          {/* Right column: Media Widget + Team Panel */}
          <div className="lg:col-span-3 space-y-5">
            <MediaWidget />
            <TeamPanel />
          </div>
        </div>

        {/* Bottom padding so footer doesn't clip content */}
        <div className="h-2" />
      </main>

      {/* ── Status footer ──────────────────────────────────── */}
      <StatusFooter
        onToggleOverlay={handleToggleOverlay}
        overlayActive={overlayActive}
      />
    </div>
  );
}
