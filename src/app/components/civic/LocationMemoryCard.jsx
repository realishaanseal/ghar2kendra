import React, { useEffect, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { History, ArrowRight } from 'lucide-react';
import { getMemoryForIssue } from '../../api/memoryStore';
import { summarizeMemory } from '../../engine/memory';
import { surface } from './surface';
import { ReliabilityRing, MemoryTimeline } from './MemoryParts';

/** Compact Civic Memory panel for a ticket: what else happened at this spot. */
export default function LocationMemoryCard({ issue, isDarkMode }) {
  const s = surface(isDarkMode);
  const [memory, setMemory] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getMemoryForIssue(issue).then((m) => !cancelled && setMemory(m));
    return () => {
      cancelled = true;
    };
  }, [issue]);

  if (!memory) return null;
  const others = memory.events.filter((e) => e.issueId !== issue.id);

  return (
    <div className={`${s.card} p-5`}>
      <h3 className={`font-extrabold text-sm flex items-center gap-2 ${s.heading}`}>
        <History className="w-4 h-4 text-amber-500" /> Location memory
      </h3>
      <div className="flex items-center gap-3 mt-3">
        <ReliabilityRing reliability={memory.reliability} size={52} />
        <div className="min-w-0">
          <p className={`text-xs font-black leading-snug ${s.heading}`}>{memory.asset.name}</p>
          <p className={`text-[11px] mt-0.5 ${s.muted}`}>{summarizeMemory(memory)}</p>
        </div>
      </div>
      {others.length > 0 ? (
        <div className="mt-4">
          <MemoryTimeline events={others} s={s} limit={3} />
        </div>
      ) : (
        <p className={`text-[11px] mt-3 ${s.muted}`}>First recorded issue at this asset.</p>
      )}
      <Link to={`/memory/${memory.asset.id}`} className={`${s.ghostButton} w-full mt-4`}>
        Full asset history <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
