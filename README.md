# Nexus Portal

A professional-grade SaaS dashboard with integrated context-sensitive media and privacy controls.

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to /dist
npm run preview # local preview of built output
```

## Privacy Controls

| Shortcut       | Action                                        |
|----------------|-----------------------------------------------|
| `Alt + X`      | Toggle privacy mode (hide/show media widget)  |
| `Esc × 2`      | Hard lock (activates privacy, never auto-off) |
| 🔒 footer btn  | Full-screen lock overlay (requires priv mode) |

## Architecture

```
src/
├── context/
│   └── PrivacyContext.jsx      # Global isPrivate, isMuted, mediaUrl state
├── hooks/
│   └── usePrivacyMode.js       # Alt+X / double-Esc keyboard listeners
├── services/
│   └── GlobalEventMonitor.js   # Tab visibility, window focus event bus
└── components/
    ├── Navbar.jsx               # Top navigation with inline privacy toggle
    ├── StatsBar.jsx             # 6-metric KPI row
    ├── ActivityFeed.jsx         # Filterable live event feed
    ├── SystemStatus.jsx         # Service health with live sparklines
    ├── MediaWidget.jsx          # Public wrapper (switches on isPrivate)
    ├── ContentSwitcher.jsx      # react-player wrapper with controls
    ├── DocBlock.jsx             # Fake API reference (privacy cover)
    ├── ConfigDrawer.jsx         # Slide-in URL configuration panel
    ├── TeamPanel.jsx            # Contributor leaderboard
    ├── PrivacyOverlay.jsx       # Full-screen lock overlay
    └── StatusFooter.jsx         # Sticky bottom status bar
```

## Deploying to Cloudflare Pages

### Option A — Cloudflare Dashboard (recommended for first deploy)

1. Push this repo to GitHub / GitLab.
2. Open [Cloudflare Pages](https://pages.cloudflare.com) → **Create a project** → **Connect to Git**.
3. Select your repo.
4. Set build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### Option B — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name nexus-portal
```

### Environment Variables

No environment variables are required for the base app.  
If you extend the API integrations, add secrets via the Cloudflare Pages dashboard under **Settings → Environment variables**.

## Tech Stack

- **Vite** + **React 18**
- **Tailwind CSS** (dark industrial/SaaS theme)
- **react-player** (lazy-loaded)
- **lucide-react** icons
- **React Context API** for global privacy state
"# project-panel" 
"# project-panel" 
