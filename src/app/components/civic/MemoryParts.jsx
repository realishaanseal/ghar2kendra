import React from 'react';
import { Link } from '@/lib/router-compat';
import { AlertTriangle, CheckCircle2, Hammer, Repeat, FileText } from 'lucide-react';
import { GRADE_STYLES } from './surface';
import { formatDate } from '../../engine/time';

/** Circular 0–100 reliability gauge. */
export function ReliabilityRing({ reliability, size = 72 }) {
  const style = GRADE_STYLES[reliability.grade];
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} title={`Reliability ${reliability.score}/100`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="7" className="stroke-slate-500/20" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          className={style.ring}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - reliability.score / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-black font-mono ${size > 64 ? 'text-lg' : 'text-sm'} ${style.text}`}>{reliability.score}</span>
        {size > 64 && <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">{style.label}</span>}
      </div>
    </div>
  );
}

export function GradeChip({ grade }) {
  const style = GRADE_STYLES[grade];
  return (
    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${style.chip}`}>{style.label}</span>
  );
}

const EVENT_STYLES = {
  report: { icon: FileText, dot: 'bg-amber-500', label: 'Reported' },
  recurrence: { icon: Repeat, dot: 'bg-rose-500', label: 'Recurred' },
  repair: { icon: Hammer, dot: 'bg-teal-500', label: 'Repaired' },
  verification: { icon: CheckCircle2, dot: 'bg-emerald-500', label: 'Verified' },
  dispute: { icon: AlertTriangle, dot: 'bg-rose-500', label: 'Disputed' },
};

/** Vertical event history for an asset. */
export function MemoryTimeline({ events, s, limit }) {
  const shown = limit ? events.slice(0, limit) : events;
  return (
    <ol className={`relative pl-6 space-y-5 border-l-2 ml-2 ${s.divider}`}>
      {shown.map((event, idx) => {
        const style = EVENT_STYLES[event.type] || EVENT_STYLES.report;
        const Icon = style.icon;
        return (
          <li key={`${event.issueId}-${event.type}-${idx}`} className="relative">
            <span className={`absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full ring-4 ring-black/5 ${style.dot}`} />
            <div className="flex items-center gap-2 flex-wrap">
              <Icon className="w-3.5 h-3.5 text-slate-400" />
              <span className={`text-xs font-black ${s.heading}`}>{style.label}</span>
              <span className="text-[10px] font-mono text-slate-400">{formatDate(event.at)}</span>
              <Link to={`/ticket/${event.issueId}`} className={s.chipNeutral}>
                {event.issueId}
              </Link>
            </div>
            <p className={`text-xs mt-1 font-semibold ${s.text}`}>{event.title}</p>
            {event.note && <p className={`text-[11px] mt-0.5 ${s.muted}`}>{event.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}

export function StatTile({ label, value, hint, s }) {
  return (
    <div className={`${s.inset} p-3`}>
      <div className={`text-[10px] uppercase tracking-wider font-bold ${s.muted}`}>{label}</div>
      <div className={`text-xl font-black font-mono mt-0.5 ${s.heading}`}>{value}</div>
      {hint && <div className={`text-[10px] mt-0.5 ${s.muted}`}>{hint}</div>}
    </div>
  );
}
