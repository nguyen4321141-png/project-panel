import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Server, Database, Globe, Cpu, RefreshCw } from 'lucide-react';

const INITIAL_SERVICES = [
  { id: 1, name: 'API Gateway',       icon: Globe,      status: 'operational', latency: 42  },
  { id: 2, name: 'CI/CD Pipeline',    icon: Activity,   status: 'degraded',    latency: 210 },
  { id: 3, name: 'CDN Nodes',         icon: TrendingUp, status: 'operational', latency: 8   },
  { id: 4, name: 'Database Cluster',  icon: Database,   status: 'operational', latency: 18  },
  { id: 5, name: 'Edge Workers',      icon: Cpu,        status: 'operational', latency: 3   },
  { id: 6, name: 'Object Storage',    icon: Server,     status: 'operational', latency: 55  },
];

const STATUS_CONFIG = {
  operational: { dot: 'bg-nx-green', label: 'text-nx-green', text: 'Operational' },
  degraded:    { dot: 'bg-nx-amber animate-pulse', label: 'text-nx-amber', text: 'Degraded' },
  outage:      { dot: 'bg-nx-red animate-pulse',   label: 'text-nx-red',   text: 'Outage'   },
};

function sparkData() {
  return Array.from({ length: 12 }, () => Math.random() * 80 + 20);
}

function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 56},${20 - (v / max) * 16}`)
    .join(' ');
  return (
    <svg viewBox="0 0 56 20" className="w-14 h-5" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function SystemStatus() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [sparklines] = useState(() =>
    Object.fromEntries(INITIAL_SERVICES.map(s => [s.id, sparkData()]))
  );
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate minor latency fluctuations every 8s
  useEffect(() => {
    const id = setInterval(() => {
      setServices(prev =>
        prev.map(s => ({
          ...s,
          latency: Math.max(1, s.latency + Math.floor((Math.random() - 0.5) * 12)),
        }))
      );
      setLastUpdated(new Date());
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const healthy = services.filter(s => s.status === 'operational').length;

  return (
    <div className="nx-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-nx-border">
        <div className="flex items-center gap-2">
          <Server size={14} strokeWidth={1.8} className="text-nx-sky" />
          <span className="text-[13px] font-semibold text-nx-text">System Status</span>
        </div>
        <div className="flex items-center gap-1.5 text-nx-sub text-[11px] font-mono">
          <RefreshCw size={9} strokeWidth={2} />
          {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Summary bar */}
      <div className="px-4 py-2.5 border-b border-nx-border/50 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-nx-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-nx-green rounded-full transition-all duration-500"
            style={{ width: `${(healthy / services.length) * 100}%` }}
          />
        </div>
        <span className="text-[11px] font-mono text-nx-sub shrink-0">
          {healthy}/{services.length} operational
        </span>
      </div>

      {/* Service rows */}
      <div className="divide-y divide-nx-border/40">
        {services.map(svc => {
          const cfg = STATUS_CONFIG[svc.status];
          const Icon = svc.icon;
          return (
            <div key={svc.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-nx-raised/40 transition-colors">
              <Icon size={13} strokeWidth={1.8} className="text-nx-sub shrink-0" />
              <span className="flex-1 text-[12px] text-nx-text truncate">{svc.name}</span>
              <Sparkline
                data={sparklines[svc.id]}
                color={svc.status === 'operational' ? '#34d399' : '#fbbf24'}
              />
              <span className={`font-mono text-[11px] w-10 text-right ${
                svc.latency > 150 ? 'text-nx-amber' : 'text-nx-sub'
              }`}>
                {svc.latency}ms
              </span>
              <div className="flex items-center gap-1 shrink-0 w-24 justify-end">
                <span className={`status-dot ${cfg.dot}`} />
                <span className={`text-[10px] font-mono ${cfg.label}`}>{cfg.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
