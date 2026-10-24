import React, { useEffect, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { Repeat, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getRecurrenceLink, decideRecurrenceLink } from '../../api/proofStore';

/** "This defect came back": links a ticket to the earlier repair at the same spot. */
export default function RecurrenceBanner({ issue, isDarkMode }) {
  const { isOfficial } = useAuth();
  const [link, setLink] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getRecurrenceLink(issue).then((l) => !cancelled && setLink(l));
    return () => {
      cancelled = true;
    };
  }, [issue]);

  if (!link || link.decision === 'dismissed') return null;
  const prev = link.previousIssue;
  const pending = link.decision === 'pending';

  return (
    <div
      className={`rounded-2xl border p-4 flex gap-3 items-start ${
        isDarkMode ? 'bg-rose-950/30 border-rose-500/40 text-slate-200' : 'bg-rose-50 border-rose-300 text-slate-800'
      }`}
    >
      <Repeat className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
      <div className="flex-1 text-xs">
        <p className="font-black text-rose-500">
          {pending ? 'Possible recurrence: needs review' : 'Recurring defect, linked to the previous repair'}
        </p>
        <p className="mt-1">
          Repaired {Math.round(link.daysSinceRepair)} days before this report, {Math.round(link.distanceM)} m away:{' '}
          <Link to={`/ticket/${prev.id}`} className="font-bold underline decoration-dotted">
            {prev.id}: {prev.title}
          </Link>
          {prev.contractor ? ` (by ${prev.contractor})` : ''}.
        </p>
        <p className="mt-1 opacity-70">
          {pending
            ? `Between 60 and 150 m apart, so a reviewer decides whether it's the same defect.`
            : link.decision === 'auto'
              ? 'Linked automatically: same defect type within 60 m.'
              : 'Link confirmed by a reviewer.'}
        </p>
        {pending && isOfficial && (
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => decideRecurrenceLink(issue, prev.id, true)}
              className="inline-flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white font-black px-3 py-1.5 rounded-lg"
            >
              <Check className="w-3.5 h-3.5" /> Same defect
            </button>
            <button
              onClick={() => decideRecurrenceLink(issue, prev.id, false)}
              className="inline-flex items-center gap-1 border border-rose-500/40 font-bold px-3 py-1.5 rounded-lg"
            >
              <X className="w-3.5 h-3.5" /> Unrelated
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
