import React from 'react';
import { Link } from '@/lib/router-compat';
import { Flag, ArrowRight } from 'lucide-react';
import { getMissions } from '../../api/missionStore';
import { surface } from './surface';

/** Shows the mission a ticket belongs to, if any. */
export default function MissionLinkCard({ issue, isDarkMode }) {
  const s = surface(isDarkMode);
  const mission = getMissions().find((m) => m.issueIds.includes(issue.id));
  if (!mission) return null;
  return (
    <Link to={`/missions/${mission.id}`} className={`${s.card} p-4 flex items-center gap-3 hover:border-amber-500/60 transition`}>
      <Flag className="w-5 h-5 text-amber-500 shrink-0" />
      <div className="flex-1 min-w-0">
        <p className={`text-[10px] uppercase tracking-wider font-bold ${s.muted}`}>Part of civic mission</p>
        <p className={`text-xs font-black truncate ${s.heading}`}>{mission.title}</p>
        <p className={`text-[11px] ${s.muted}`}>{mission.members.length} members · {mission.issueIds.length} linked reports</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-400" />
    </Link>
  );
}
