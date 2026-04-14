import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const METRICS = [
  {
    label: 'Deploy Frequency',
    value: '14.2',
    unit: '/day',
    delta: '+2.1',
    trend: 'up',
    sub: 'vs last 7d avg',
  },
  {
    label: 'P99 Latency',
    value: '94',
    unit: 'ms',
    delta: '-8ms',
    trend: 'up',   // lower is better, so down delta = good
    sub: 'api-gateway global',
  },
  {
    label: 'Error Rate',
    value: '0.12',
    unit: '%',
    delta: '+0.03',
    trend: 'down',
    sub: '5xx responses',
  },
  {
    label: 'Active Engineers',
    value: '38',
    unit: '',
    delta: '0',
    trend: 'flat',
    sub: 'currently online',
  },
  {
    label: 'Open PRs',
    value: '23',
    unit: '',
    delta: '+4',
    trend: 'neutral',
    sub: '6 awaiting review',
  },
  {
    label: 'Test Coverage',
    value: '87.4',
    unit: '%',
    delta: '+0.6',
    trend: 'up',
    sub: 'unit + integration',
  },
];

const TREND_ICONS = {
  up:      { Icon: TrendingUp,   cls: 'text-nx-green' },
  down:    { Icon: TrendingDown, cls: 'text-nx-red'   },
  flat:    { Icon: Minus,        cls: 'text-nx-sub'   },
  neutral: { Icon: TrendingUp,   cls: 'text-nx-sub'   },
};

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-px bg-nx-border rounded-lg overflow-hidden border border-nx-border">
      {METRICS.map((m) => {
        const { Icon, cls } = TREND_ICONS[m.trend];
        return (
          <div
            key={m.label}
            className="bg-nx-surface px-4 py-3.5 hover:bg-nx-raised transition-colors group cursor-default"
          >
            <p className="text-[10px] font-mono text-nx-sub uppercase tracking-widest truncate mb-1.5">
              {m.label}
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-semibold text-nx-text leading-none tabular-nums">
                {m.value}
              </span>
              {m.unit && (
                <span className="text-[11px] font-mono text-nx-sub">{m.unit}</span>
              )}
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              <Icon size={10} strokeWidth={2.5} className={cls} />
              <span className={`text-[10px] font-mono font-medium ${cls}`}>
                {m.delta !== '0' ? m.delta : 'unchanged'}
              </span>
              <span className="text-[10px] text-nx-border truncate">{m.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
