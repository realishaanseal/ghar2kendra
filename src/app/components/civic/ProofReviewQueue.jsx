import React, { useEffect, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { Gavel, Check, X, Users, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getProofStatus, reviewProof, PROOF_EVENT } from '../../api/proofStore';
import { STAGE_COPY, QUORUM } from '../../engine/proof';
import { surface } from './surface';

/** Officials' queue of resolutions that reached resident quorum (or were disputed). */
export default function ProofReviewQueue({ issues, isDarkMode }) {
  const s = surface(isDarkMode);
  const { currentUser } = useAuth();
  const [, setTick] = useState(0);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener(PROOF_EVENT, refresh);
    return () => window.removeEventListener(PROOF_EVENT, refresh);
  }, []);

  const pending = issues
    .filter((i) => i.status === 'resolved')
    .map((issue) => ({ issue, status: getProofStatus(issue) }))
    .filter(({ status }) => status.canReview);
  const collecting = issues.filter((i) => i.status === 'resolved' && getProofStatus(i).stage === 'collecting').length;

  const decide = (issue, approved) =>
    reviewProof(issue, { approved, reviewer: currentUser?.name || 'Ward Reviewer', note: notes[issue.id] || '' });

  return (
    <section className={`${s.card} p-6 mb-8`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className={`font-black text-base flex items-center gap-2 ${s.heading}`}>
          <Gavel className="w-5 h-5 text-amber-500" /> Proof Review
          <span className={s.chip}>{pending.length} waiting</span>
        </h2>
        <span className={`text-[11px] ${s.muted}`}>
          {collecting} more resolution{collecting === 1 ? '' : 's'} still collecting resident attestations
        </span>
      </div>

      {pending.length === 0 ? (
        <p className={`text-xs mt-4 ${s.muted}`}>
          Nothing to review. Resolutions appear here once {QUORUM} independent residents attest, or when residents dispute a fix.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {pending.map(({ issue, status }) => (
            <li key={issue.id} className={`${s.inset} p-4 flex flex-col md:flex-row gap-4`}>
              <div className="flex gap-2 shrink-0">
                <img src={issue.imageUrl} alt="Before" className="w-20 h-16 object-cover rounded-lg" />
                <img src={issue.resolvedPhotoUrl} alt="After" className="w-20 h-16 object-cover rounded-lg" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={s.chipNeutral}>{issue.id}</span>
                  <span className={`text-[10px] font-black uppercase ${status.stage === 'disputed' ? 'text-rose-500' : 'text-teal-400'}`}>
                    {STAGE_COPY[status.stage].label}
                  </span>
                </div>
                <p className={`text-xs font-bold mt-1 truncate ${s.heading}`}>{issue.title}</p>
                <p className={`text-[11px] mt-1 ${s.muted}`}>
                  <Users className="w-3 h-3 inline mr-1" />
                  {status.confirmations} confirm · {status.disputes} dispute ·{' '}
                  {status.attestations.filter((a) => !a.eligible).length} not counted
                </p>
                <input
                  className={`${s.input} mt-2`}
                  placeholder="Review note (optional)"
                  value={notes[issue.id] || ''}
                  onChange={(e) => setNotes({ ...notes, [issue.id]: e.target.value })}
                />
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                <button onClick={() => decide(issue, true)} className="inline-flex items-center justify-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black px-3 py-2 rounded-xl">
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => decide(issue, false)} className={`${s.ghostButton} !px-3 !py-2 text-rose-500`}>
                  <X className="w-3.5 h-3.5" /> Reject &amp; reopen
                </button>
                <Link to={`/ticket/${issue.id}`} className={`${s.ghostButton} !px-3 !py-2`}>
                  <ExternalLink className="w-3.5 h-3.5" /> Open
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
