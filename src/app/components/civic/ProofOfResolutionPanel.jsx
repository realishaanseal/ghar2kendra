import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, X, MapPin, Users, Gavel, Sparkles, Info, LocateFixed } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getProofStatus, addAttestation, PROOF_EVENT } from '../../api/proofStore';
import { compareProofPhotos } from '../../api/aiAdvisory';
import { QUORUM, ATTEST_RADIUS_M, STAGE_COPY } from '../../engine/proof';
import { timeAgo } from '../../engine/time';
import { surface } from './surface';

const TONE = {
  amber: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
  teal: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  rose: 'bg-rose-500/15 text-rose-500 border-rose-500/30',
  emerald: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
};

function currentPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { timeout: 6000 },
    );
  });
}

/**
 * Proof-of-Resolution for a resolved ticket: evidence, independent resident attestations
 * with a quorum, and the human review gate. Replaces the one-click "confirm fix".
 */
export default function ProofOfResolutionPanel({ issue, isDarkMode, onAttested }) {
  const s = surface(isDarkMode);
  const { currentUser, isCitizen } = useAuth();
  const [status, setStatus] = useState(() => getProofStatus(issue));
  const [message, setMessage] = useState(null);
  const [busy, setBusy] = useState(false);
  const [advisory, setAdvisory] = useState(null);
  const [demoLocation, setDemoLocation] = useState(true);

  useEffect(() => {
    const refresh = () => setStatus(getProofStatus(issue));
    refresh();
    window.addEventListener(PROOF_EVENT, refresh);
    return () => window.removeEventListener(PROOF_EVENT, refresh);
  }, [issue]);

  const mine = status.attestations.find((a) => a.userId === currentUser?.id);
  const stage = STAGE_COPY[status.stage];
  const open = status.stage === 'collecting' || status.stage === 'awaiting_review' || status.stage === 'disputed';

  const attest = async (verdict) => {
    setBusy(true);
    let where = demoLocation ? null : await currentPosition();
    let demo = false;
    if (!where) {
      // Demo mode, or no GPS: place the resident ~40 m from the ticket and say so.
      where = { lat: issue.lat + 0.00025, lng: issue.lng + 0.0002 };
      demo = true;
    }
    const check = addAttestation(issue, { user: currentUser, verdict, ...where });
    setBusy(false);
    setMessage({
      ok: check.eligible,
      text: check.eligible
        ? `Recorded${demo ? ' using a demo location' : ''}. ${check.reason}.`
        : `Recorded, but it doesn't count towards the quorum: ${check.reason}.`,
    });
    if (check.eligible && verdict === 'fixed') onAttested?.();
  };

  const runAdvisory = async () => {
    setAdvisory({ loading: true });
    setAdvisory(await compareProofPhotos(issue.imageUrl, issue.resolvedPhotoUrl, issue.category));
  };

  return (
    <motion.section layout className={`${s.card} p-6`}>
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <h3 className={`font-black text-base flex items-center gap-2 ${s.heading}`}>
          <ShieldCheck className="w-5 h-5 text-amber-500" /> Proof of Resolution
        </h3>
        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${TONE[stage.tone]}`}>
          {stage.label}
        </span>
      </div>
      <p className={`text-xs mt-2 ${s.muted}`}>
        A repair closes only when {QUORUM} independent residents within {ATTEST_RADIUS_M} m confirm it and a reviewer signs off.
        The reporter, the contractor and officials can't vote.
      </p>

      {/* Quorum progress */}
      <div className="mt-5">
        <div className="flex justify-between text-[11px] font-bold mb-1.5">
          <span className={s.text}><Users className="w-3.5 h-3.5 inline mr-1 text-amber-500" />Resident confirmations</span>
          <span className="font-mono text-amber-500">
            {status.confirmations}/{QUORUM}
            {status.disputes > 0 && <span className="text-rose-500"> · {status.disputes} dispute{status.disputes > 1 ? 's' : ''}</span>}
          </span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: QUORUM }).map((_, i) => (
            <div key={i} className={`h-2 flex-1 rounded-full ${i < status.confirmations ? 'bg-emerald-500' : 'bg-slate-500/25'}`} />
          ))}
        </div>
      </div>

      {/* Attestation ledger */}
      {status.attestations.length > 0 && (
        <ul className="mt-5 space-y-2">
          {status.attestations.map((a, i) => (
            <li key={`${a.userId}-${i}`} className={`${s.inset} px-3 py-2 flex items-center gap-3 text-[11px]`}>
              {a.verdict === 'fixed' ? (
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              ) : (
                <X className="w-4 h-4 text-rose-500 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className={`font-bold ${s.heading}`}>{a.name}</span>
                <span className={s.muted}> · {a.distanceM != null ? `${Math.round(a.distanceM)} m away` : 'no location'} · {timeAgo(new Date(a.at))}</span>
              </div>
              <span className={`font-bold shrink-0 ${a.eligible ? 'text-emerald-500' : 'text-slate-400 line-through decoration-1'}`} title={a.reason}>
                {a.eligible ? 'Counts' : a.reason}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Resident actions */}
      {open && isCitizen && !mine && (
        <div className="mt-5 flex flex-wrap gap-2">
          <button disabled={busy} onClick={() => attest('fixed')} className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-600/25 transition disabled:opacity-50">
            <LocateFixed className="w-4 h-4" /> I'm here, it's fixed
          </button>
          <button disabled={busy} onClick={() => attest('not_fixed')} className={`${s.ghostButton} text-rose-500`}>
            <X className="w-4 h-4" /> Still broken
          </button>
          <label className={`w-full flex items-center gap-2 text-[11px] mt-1 ${s.muted}`}>
            <input type="checkbox" checked={demoLocation} onChange={(e) => setDemoLocation(e.target.checked)} className="accent-amber-500" />
            Demo mode: place me at the site instead of using my real GPS
          </label>
        </div>
      )}
      {mine && (
        <p className={`text-[11px] mt-4 font-semibold ${s.text}`}>
          You attested "{mine.verdict === 'fixed' ? 'fixed' : 'still broken'}". {mine.eligible ? 'Your vote counts.' : `Not counted: ${mine.reason}.`}
        </p>
      )}
      {message && (
        <p className={`text-[11px] mt-2 font-bold ${message.ok ? 'text-emerald-500' : 'text-amber-500'}`}>{message.text}</p>
      )}

      {/* Review state */}
      <div className={`${s.inset} mt-5 p-3 text-[11px] flex gap-2`}>
        <Gavel className="w-4 h-4 text-amber-500 shrink-0" />
        <div className={s.text}>
          {status.review.status === 'approved' && <>Approved by <strong>{status.review.reviewer}</strong>. {status.review.note}</>}
          {status.review.status === 'rejected' && <>Rejected by <strong>{status.review.reviewer}</strong>. Work reopened. {status.review.note}</>}
          {status.review.status === 'pending' &&
            (status.canReview
              ? 'Waiting for a ward reviewer. It appears in the officials\' Proof Review queue.'
              : `Review opens after ${status.needed} more independent confirmation${status.needed === 1 ? '' : 's'}.`)}
        </div>
      </div>

      {/* AI advisory: never decides, only flags */}
      <div className="mt-4">
        {!advisory && (
          <button onClick={runAdvisory} className={`${s.ghostButton} w-full`}>
            <Sparkles className="w-4 h-4 text-amber-500" /> Ask Gemini to compare before/after (advisory)
          </button>
        )}
        {advisory?.loading && <p className={`text-[11px] ${s.muted}`}>Comparing photos…</p>}
        {advisory && !advisory.loading && (
          <div className={`${s.inset} p-3 text-[11px] space-y-1`}>
            <div className={`font-bold flex items-center gap-1.5 ${s.heading}`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI advisory {advisory.available ? '' : '(offline fallback)'}
            </div>
            <p className={s.text}>{advisory.summary}</p>
            {advisory.flags?.length > 0 && (
              <ul className="text-amber-500 font-semibold">{advisory.flags.map((f) => <li key={f}>⚑ {f}</li>)}</ul>
            )}
          </div>
        )}
        <p className={`text-[10px] mt-2 flex gap-1 ${s.muted}`}>
          <Info className="w-3 h-3 shrink-0 mt-0.5" /> Photos and GPS alone can't prove authenticity. They are evidence, not proof.
        </p>
      </div>

      <p className={`text-[10px] mt-3 flex items-center gap-1 ${s.muted}`}>
        <MapPin className="w-3 h-3" /> Ticket location {issue.lat.toFixed(4)}, {issue.lng.toFixed(4)}
      </p>
    </motion.section>
  );
}
