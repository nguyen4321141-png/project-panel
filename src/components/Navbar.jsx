import { useState } from 'react';
import {
  LayoutDashboard, FileText, Activity, ChevronDown,
  Bell, Search, Shield, ShieldOff, Menu, X, Palette,
} from 'lucide-react';
import { usePrivacy } from '../context/PrivacyContext.jsx';

const NAV_LINKS = [
  { label: 'Project Overview',  icon: LayoutDashboard, active: true  },
  { label: 'Technical Docs',    icon: FileText,         active: false },
  { label: 'System Status',     icon: Activity,         active: false },
];

export default function Navbar() {
  const { isPrivate, togglePrivacy, theme, setTheme } = usePrivacy();
  const [mobileOpen, setMobileOpen]  = useState(false);
  const [notifBadge] = useState(3);

  return (
    <header className="sticky top-0 z-50 border-b border-nx-border bg-nx-surface/90 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">

        {/* ── Logo ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-md bg-nx-sky flex items-center justify-center">
            <span className="font-mono font-bold text-nx-bg text-sm leading-none">N</span>
          </div>
          <span className="font-mono font-semibold text-nx-text tracking-tight text-[15px] hidden sm:block">
            NEXUS
          </span>
          <span className="font-mono text-nx-sub text-xs hidden md:block pt-px">/ portal</span>
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <div className="hidden sm:block w-px h-5 bg-nx-border" />

        {/* ── Desktop nav links ────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`nx-btn-ghost nx-btn-anim text-[13px] rounded-md ${
                active ? 'text-nx-text bg-nx-raised' : ''
              }`}
            >
              <Icon size={14} strokeWidth={1.8} />
              {label}
            </button>
          ))}

          {/* Workspace selector */}
          <button className="ml-4 flex items-center gap-1.5 text-nx-sub hover:text-nx-text text-[13px] font-medium transition-colors nx-btn-anim rounded px-1.5 py-1">
            <span className="w-2 h-2 rounded-full bg-nx-green animate-pulse-slow" />
            eng-prod-cluster
            <ChevronDown size={12} />
          </button>
        </nav>

        {/* ── Right controls ───────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-1.5">

          {/* Search */}
          <button className="nx-btn-ghost nx-btn-anim text-[13px] hidden lg:flex">
            <Search size={14} strokeWidth={1.8} />
            <span className="text-nx-sub">Search</span>
            <kbd className="ml-1 text-[10px] font-mono bg-nx-muted px-1.5 py-0.5 rounded border border-nx-border text-nx-sub">
              ⌘K
            </kbd>
          </button>

          {/* Notifications */}
          <button className="nx-btn-ghost nx-btn-anim relative">
            <Bell size={14} strokeWidth={1.8} />
            {notifBadge > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-nx-red rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                {notifBadge}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-1 border border-nx-border rounded-md px-2 py-1 bg-nx-raised/40">
            <Palette size={12} strokeWidth={2} className="text-nx-sub" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-transparent text-[11px] font-mono text-nx-sub outline-none"
              title="Choose theme"
            >
              <option value="midnight">Midnight</option>
              <option value="aurora">Aurora</option>
              <option value="sunset">Sunset</option>
              <option value="paper">Paper</option>
            </select>
          </div>

          {/* ── Privacy Toggle ───────────────────────────────── */}
          <button
            onClick={togglePrivacy}
            title={isPrivate ? 'Disable privacy mode (Alt+X)' : 'Enable privacy mode (Alt+X)'}
            className={`nx-btn nx-btn-anim text-[13px] gap-1.5 transition-all duration-200 ${
              isPrivate
                ? 'bg-nx-red/15 text-nx-red border border-nx-red/30 hover:bg-nx-red/25'
                : 'nx-btn-ghost border border-transparent hover:border-nx-border'
            }`}
          >
            {isPrivate
              ? <ShieldOff size={13} strokeWidth={2} />
              : <Shield     size={13} strokeWidth={1.8} />
            }
            <span className="hidden sm:inline font-mono text-[11px] tracking-wide">
              {isPrivate ? 'PRIVATE' : 'ALT+X'}
            </span>
          </button>

          {/* Avatar */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-nx-purple to-nx-sky flex items-center justify-center text-[11px] font-semibold text-white ml-1">
            SC
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden nx-btn-ghost nx-btn-anim"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* ── Mobile nav dropdown ──────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-nx-border bg-nx-surface px-4 py-3 flex flex-col gap-1 animate-fade-in">
          {NAV_LINKS.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`nx-btn-ghost nx-btn-anim text-sm justify-start ${active ? 'text-nx-text bg-nx-raised' : ''}`}
            >
              <Icon size={15} strokeWidth={1.8} />
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
