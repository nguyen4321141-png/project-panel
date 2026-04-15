import { Users, GitCommit, Star } from 'lucide-react';

const TEAM = [
  { name: 'Sarah Chen',    handle: 'schen',    role: 'Platform Eng',   commits: 47, status: 'online',  avatar: 'SC', hue: '195' },
  { name: 'Ravi Kumar',    handle: 'rkumar',   role: 'Backend Eng',    commits: 38, status: 'online',  avatar: 'RK', hue: '260' },
  { name: 'Adolf Hütter',   handle: '#revived',  role: 'SRE',            commits: 31, status: 'away',    avatar: 'NZ', hue: '160' },
  { name: 'Tung Tung Tung Sahur',  handle: 'tripleT',  role: 'Frontend Eng',   commits: 29, status: 'online',  avatar: 'T3', hue: '330' },
  { name: 'Yuki Tanaka',   handle: 'ytanaka',  role: 'Security Eng',   commits: 22, status: 'offline', avatar: 'YT', hue: '40'  },
  { name: 'Sung Jin-woo',   handle: 'jinwoodagoat',  role: 'Data Eng',       commits: 18, status: 'online',  avatar: 'BJ', hue: '20'  },
];

const STATUS_COLORS = {
  online:  'bg-nx-green',
  away:    'bg-nx-amber',
  offline: 'bg-nx-muted',
};

export default function TeamPanel() {
  const totalCommits = TEAM.reduce((s, m) => s + m.commits, 0);

  return (
    <div className="nx-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-nx-border">
        <div className="flex items-center gap-2">
          <Users size={14} strokeWidth={1.8} className="text-nx-sky" />
          <span className="text-[13px] font-semibold text-nx-text">Contributors</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-mono text-nx-sub">
          <GitCommit size={10} strokeWidth={2} />
          {totalCommits} this week
        </div>
      </div>

      {/* Team list */}
      <div className="divide-y divide-nx-border/40">
        {TEAM.map((member, i) => (
          <div
            key={member.handle}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-nx-raised/40 transition-colors"
          >
            {/* Rank */}
            <span className="w-4 text-[10px] font-mono text-nx-border text-right shrink-0">
              {i + 1}
            </span>

            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shrink-0 relative"
              style={{
                background: `hsl(${member.hue}deg 60% 40%)`,
              }}
            >
              {member.avatar}
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-nx-surface ${
                  STATUS_COLORS[member.status]
                }`}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-nx-text truncate leading-tight">
                {member.name}
              </p>
              <p className="text-[10px] text-nx-sub font-mono truncate">{member.role}</p>
            </div>

            {/* Commits bar */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-16 h-1 bg-nx-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-nx-sky/60 rounded-full"
                  style={{ width: `${(member.commits / TEAM[0].commits) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-nx-sub w-5 text-right">
                {member.commits}
              </span>
            </div>

            {/* Star for top contributor */}
            {i === 0 && (
              <Star size={10} strokeWidth={2} className="text-nx-amber shrink-0" fill="currentColor" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-nx-border/50">
        <p className="text-[10px] text-nx-border font-mono text-center">
          {TEAM.filter(m => m.status === 'online').length} of {TEAM.length} engineers online
        </p>
      </div>
    </div>
  );
}
