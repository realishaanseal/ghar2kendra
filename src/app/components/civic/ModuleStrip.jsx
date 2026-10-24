import React from 'react';
import { Link } from '@/lib/router-compat';
import { History, Network, Flag, Radar, Briefcase, ShieldCheck } from 'lucide-react';
import { surface } from './surface';

const MODULES = [
  { to: '/memory', icon: History, title: 'Civic Memory', text: 'Every road and drain keeps its repair history.' },
  { to: '/insights', icon: Network, title: 'Insights', text: 'Separate complaints, one underlying cause.' },
  { to: '/missions', icon: Flag, title: 'Missions', text: 'Many reports, one coordinated fix.' },
  { to: '/radar', icon: Radar, title: 'My Radar', text: 'Only what matters around your places.' },
  { to: '/workspaces', icon: Briefcase, title: 'Workspaces', text: 'For colleges, RWAs and NGOs that fix things.' },
  { to: '/ticket/G2K-2026-0518', icon: ShieldCheck, title: 'Proof of Resolution', text: 'Fixes close only on resident quorum + review.' },
];

/** Entry points to the civic modules, shown above the live feed. */
export default function ModuleStrip({ isDarkMode }) {
  const s = surface(isDarkMode);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-8">
      {MODULES.map(({ to, icon: Icon, title, text }) => (
        <Link key={to} to={to} className={`${s.card} !rounded-2xl !shadow-md p-3.5 hover:border-amber-500/60 transition group`}>
          <Icon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition" />
          <div className={`text-xs font-black mt-2 ${s.heading}`}>{title}</div>
          <div className={`text-[11px] mt-0.5 leading-snug ${s.muted}`}>{text}</div>
        </Link>
      ))}
    </div>
  );
}
