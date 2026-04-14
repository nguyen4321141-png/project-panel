import { useState } from 'react';
import {
  GitBranch, GitMerge, MessageSquare, Shield, FileText,
  Zap, Package, AlertTriangle, CheckCircle2, Clock,
  ChevronRight, RefreshCw, Activity,
} from 'lucide-react';

const FEED_DATA = [
  {
    id: 1, type: 'deploy', status: 'success',
    icon: Zap, color: 'text-nx-green',
    title: 'Pipeline #4821 completed',
    detail: 'main → prod-us-east-1 · 2m 14s',
    actor: 'CI/CD Bot', time: '2m ago',
    tags: ['production', 'auto'],
  },
  {
    id: 2, type: 'comment', status: 'info',
    icon: MessageSquare, color: 'text-nx-sky',
    title: 'RFC-0042: Distributed Cache Strategy',
    detail: '3 new comments from @ravi.k and @priya.s',
    actor: 'Ravi Kumar', time: '14m ago',
    tags: ['rfc', 'architecture'],
  },
  {
    id: 3, type: 'security', status: 'warn',
    icon: Shield, color: 'text-nx-amber',
    title: 'Security scan: 2 medium findings',
    detail: 'CVE-2024-3094 · CVE-2024-6387 — awaiting patch',
    actor: 'Snyk Bot', time: '31m ago',
    tags: ['security', 'review'],
  },
  {
    id: 4, type: 'merge', status: 'success',
    icon: GitMerge, color: 'text-nx-purple',
    title: 'feat/observability-v2 merged',
    detail: '+1,204 / −387 lines · reviewed by @alex.m',
    actor: 'Sarah Chen', time: '47m ago',
    tags: ['merged', 'main'],
  },
  {
    id: 5, type: 'doc', status: 'info',
    icon: FileText, color: 'text-nx-sub',
    title: 'Standup notes published — Week 42',
    detail: 'Architecture guild meeting summary attached',
    actor: 'Ops Bot', time: '1h ago',
    tags: ['docs'],
  },
  {
    id: 6, type: 'alert', status: 'error',
    icon: AlertTriangle, color: 'text-nx-red',
    title: 'Latency spike · api-gateway-eu-west-2',
    detail: 'P99 = 1,842ms · threshold: 800ms · auto-scaling triggered',
    actor: 'Prometheus', time: '1h 22m ago',
    tags: ['incident', 'resolved'],
  },
  {
    id: 7, type: 'package', status: 'info',
    icon: Package, color: 'text-nx-sky',
    title: 'Dependency updates available',
    detail: '14 packages · 2 major · 8 minor · 4 patch',
    actor: 'Renovate', time: '2h ago',
    tags: ['dependencies'],
  },
  {
    id: 8, type: 'branch', status: 'info',
    icon: GitBranch, color: 'text-nx-sub',
    title: 'fix/auth-token-expiry opened',
    detail: 'Branched from main · draft PR created',
    actor: 'Yuki Tanaka', time: '3h ago',
    tags: ['hotfix'],
  },
  {
    id: 9, type: 'deploy', status: 'success',
    icon: CheckCircle2, color: 'text-nx-green',
    title: 'Staging env refresh complete',
    detail: 'e2e test suite: 847 passed, 0 failed',
    actor: 'CI/CD Bot', time: '4h ago',
    tags: ['staging', 'tests'],
  },
];

const TAG_COLORS = {
  production: 'bg-nx-green/10 text-nx-green border-nx-green/20',
  security:   'bg-nx-red/10   text-nx-red   border-nx-red/20',
  incident:   'bg-nx-red/10   text-nx-red   border-nx-red/20',
  merged:     'bg-nx-purple/10 text-nx-purple border-nx-purple/20',
  rfc:        'bg-nx-sky/10   text-nx-sky   border-nx-sky/20',
  docs:       'bg-nx-muted    text-nx-sub   border-nx-border',
};

function tagClass(tag) {
  return TAG_COLORS[tag] ?? 'bg-nx-muted text-nx-sub border-nx-border';
}

function FeedItem({ item }) {
  const Icon = item.icon;
  return (
    <div className="group flex gap-3 px-4 py-3.5 hover:bg-nx-raised/60 transition-colors cursor-pointer border-b border-nx-border/50 last:border-0">
      {/* Icon */}
      <div className={`mt-0.5 shrink-0 ${item.color}`}>
        <Icon size={15} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-medium text-nx-text leading-snug truncate">
            {item.title}
          </p>
          <div className="flex items-center gap-1 text-nx-sub text-[11px] shrink-0 font-mono">
            <Clock size={9} />
            {item.time}
          </div>
        </div>
        <p className="text-[12px] text-nx-sub mt-0.5 truncate">{item.detail}</p>

        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {item.tags.map(tag => (
            <span
              key={tag}
              className={`nx-badge text-[10px] border ${tagClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <ChevronRight
        size={13}
        className="shrink-0 text-nx-border group-hover:text-nx-sub mt-1 transition-colors"
      />
    </div>
  );
}

export default function ActivityFeed() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'deploy', 'security', 'merge', 'alert'];

  const visible = filter === 'all'
    ? FEED_DATA
    : FEED_DATA.filter(d => d.type === filter);

  return (
    <div className="nx-card overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-nx-border">
        <div className="flex items-center gap-2">
          <Activity size={14} strokeWidth={1.8} className="text-nx-sky" />
          <span className="text-[13px] font-semibold text-nx-text">Activity Feed</span>
          <span className="nx-badge bg-nx-sky/10 text-nx-sky border border-nx-sky/20 text-[10px]">
            LIVE
          </span>
        </div>
        <button className="nx-btn-ghost text-[11px] font-mono">
          <RefreshCw size={11} strokeWidth={2} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-nx-border/50 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all ${
              filter === f
                ? 'bg-nx-sky/15 text-nx-sky'
                : 'text-nx-sub hover:text-nx-text hover:bg-nx-raised'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed list */}
      <div className="flex-1 overflow-y-auto max-h-[520px]">
        {visible.map(item => <FeedItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}
