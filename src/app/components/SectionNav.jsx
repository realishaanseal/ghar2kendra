import React from 'react';
import { Link, useLocation } from '@/lib/router-compat';
import { LayoutList, History, Flag, Radar, Briefcase, Network } from 'lucide-react';

// Secondary navigation for the civic modules. Each module adds its entry here.
const SECTIONS = [
  { tour: 'feed', to: '/', label: 'Live Feed', icon: LayoutList, match: (p) => p === '/' },
  { tour: 'memory', to: '/memory', label: 'Civic Memory', icon: History, match: (p) => p.startsWith('/memory') },
  { tour: 'insights', to: '/insights', label: 'Insights', icon: Network, match: (p) => p.startsWith('/insights') },
  { tour: 'missions', to: '/missions', label: 'Missions', icon: Flag, match: (p) => p.startsWith('/missions') },
  { tour: 'radar', to: '/radar', label: 'My Radar', icon: Radar, match: (p) => p.startsWith('/radar') },
  { tour: 'workspaces', to: '/workspaces', label: 'Workspaces', icon: Briefcase, match: (p) => p.startsWith('/workspaces') },
];

export default function SectionNav({ isDarkMode }) {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Civic modules"
      className={`border-b transition-colors ${
        isDarkMode ? 'bg-ink/90 border-slate-800' : 'bg-paper-raised/90 border-amber-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex gap-1 overflow-x-auto no-scrollbar">
        {SECTIONS.map(({ tour, to, label, icon: Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={to}
              to={to}
              data-tour={tour}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-xs font-bold border-b-2 transition ${
                active
                  ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                  : `border-transparent ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
