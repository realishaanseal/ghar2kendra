import React, { useEffect, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { History, MapPin, RefreshCw, ArrowRight } from 'lucide-react';
import { getMemoryIndex } from '../api/memoryStore';
import { ASSET_KINDS } from '../data/civicAssets';
import { summarizeMemory } from '../engine/memory';
import { timeAgo } from '../engine/time';
import { surface } from '../components/civic/surface';
import { ReliabilityRing, GradeChip } from '../components/civic/MemoryParts';

export default function MemoryIndexPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const [memories, setMemories] = useState(null);

  useEffect(() => {
    const load = () => getMemoryIndex().then(setMemories);
    load();
    window.addEventListener('civic-issues-updated', load);
    return () => window.removeEventListener('civic-issues-updated', load);
  }, []);

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
            <History className="w-4 h-4" /> Civic Memory Engine
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mt-2 ${s.heading}`}>Every location remembers.</h1>
          <p className={`text-sm mt-2 max-w-2xl ${s.muted}`}>
            A closed ticket isn't the end of the story. Each road stretch, drain and transformer keeps its full history:
            reports, repairs, resident verifications, and how fast defects come back. Least reliable assets first.
          </p>
        </header>

        {!memories ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {memories.map((memory) => {
              const kind = ASSET_KINDS[memory.asset.kind];
              return (
                <Link
                  key={memory.asset.id}
                  to={`/memory/${memory.asset.id}`}
                  className={`${s.card} p-5 flex gap-4 items-start hover:border-amber-500/60 transition group`}
                >
                  <ReliabilityRing reliability={memory.reliability} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={s.chipNeutral}>
                        {kind?.icon} {kind?.label}
                      </span>
                      <GradeChip grade={memory.reliability.grade} />
                    </div>
                    <h2 className={`font-black text-sm sm:text-base mt-2 leading-snug ${s.heading}`}>{memory.asset.name}</h2>
                    <p className={`text-[11px] mt-1 flex items-center gap-1 ${s.muted}`}>
                      <MapPin className="w-3 h-3" /> {memory.asset.ward}
                    </p>
                    <p className={`text-xs mt-2 font-semibold ${s.text}`}>{summarizeMemory(memory)}</p>
                    <div className={`text-[11px] mt-1 ${s.muted}`}>
                      Last report {timeAgo(memory.stats.lastReportedAt)}
                      {memory.stats.openCount > 0 && <span className="text-rose-500 font-bold"> · {memory.stats.openCount} open</span>}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition shrink-0 mt-1" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
