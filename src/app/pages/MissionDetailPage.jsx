import React, { useEffect, useState } from 'react';
import { Link, useParams } from '@/lib/router-compat';
import {
  ArrowLeft, Flag, Users, Building2, Bell, Camera, FileText, ShieldCheck, HandHeart, Check, Copy, Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFeed } from '../api/supabaseClient';
import {
  getMission, joinMission, addContribution, addReminder, completeReminder, advanceMission, MISSION_EVENT,
} from '../api/missionStore';
import { missionProgress, draftSubmission, MISSION_STAGES } from '../engine/missions';
import { parseWhen, formatDate, timeAgo } from '../engine/time';
import { surface } from '../components/civic/surface';

const CONTRIBUTION_ICONS = { photo: Camera, submission: FileText, verification: ShieldCheck, volunteer: HandHeart };
const CONTRIBUTION_LABELS = { photo: 'Added evidence', submission: 'Prepared submission', verification: 'Verified outcome', volunteer: 'Volunteered' };

export default function MissionDetailPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const { id } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const [mission, setMission] = useState(() => getMission(id));
  const [issues, setIssues] = useState([]);
  const [tab, setTab] = useState('photo');
  const [note, setNote] = useState('');
  const [url, setUrl] = useState('');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [reminder, setReminder] = useState({ dueAt: '', label: '' });

  useEffect(() => {
    const load = async () => {
      setMission(getMission(id));
      setIssues(await getFeed());
    };
    load();
    window.addEventListener(MISSION_EVENT, load);
    window.addEventListener('civic-issues-updated', load);
    return () => {
      window.removeEventListener(MISSION_EVENT, load);
      window.removeEventListener('civic-issues-updated', load);
    };
  }, [id]);

  if (!mission) {
    return (
      <div className={`${s.page} flex flex-col items-center justify-center gap-3`}>
        <p className={s.muted}>Mission {id} not found.</p>
        <Link to="/missions" className={s.ghostButton}>All missions</Link>
      </div>
    );
  }

  const p = missionProgress(mission, issues);
  const isMember = isLoggedIn && mission.members.includes(currentUser.id);
  const isCoordinator = isLoggedIn && mission.coordinator.id === currentUser.id;
  const now = new Date();

  const timeline = [
    ...mission.milestones.map((m) => ({ ...m, kind: 'milestone' })),
    ...mission.contributions.map((c) => ({ at: c.at, label: `${CONTRIBUTION_LABELS[c.type]}: ${c.note}`, by: c.by, kind: c.type, url: c.url })),
  ].sort((a, b) => parseWhen(b.at, now) - parseWhen(a.at, now));

  const contribute = (type) => {
    if (!note.trim() && type !== 'submission') return;
    addContribution(mission.id, currentUser, { type, note: note.trim() || 'Drafted the joint petition', url });
    setNote('');
    setUrl('');
  };

  const verifiable = p.linked.filter((i) => i.status === 'resolved');

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Link to="/missions" className={`inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`}>
          <ArrowLeft className="w-4 h-4 text-amber-500" /> All missions
        </Link>

        <header className={`${s.card} p-6`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
                <Flag className="w-4 h-4" /> {mission.id}
              </div>
              <h1 className={`text-2xl sm:text-3xl font-black mt-2 ${s.heading}`}>{mission.title}</h1>
              <p className={`text-sm mt-2 ${s.text}`}>{mission.summary}</p>
              <p className={`text-xs mt-3 ${s.muted}`}>
                Coordinator <strong className={s.heading}>{mission.coordinator.name}</strong>
                {mission.coordinator.role ? ` (${mission.coordinator.role})` : ''} · {mission.members.length} member{mission.members.length === 1 ? "" : "s"} · {p.residents} residents affected
              </p>
            </div>
            {isLoggedIn && !isMember && (
              <button onClick={() => joinMission(mission.id, currentUser)} className={s.primaryButton}>
                <Users className="w-4 h-4" /> Join mission
              </button>
            )}
            {isMember && <span className={s.chip}>You're a member</span>}
          </div>

          {/* Stage stepper */}
          <ol className="grid grid-cols-5 gap-2 mt-6">
            {MISSION_STAGES.map((stage, idx) => (
              <li key={stage.id} title={stage.hint}>
                <div className={`h-1.5 rounded-full ${idx <= p.stageIndex ? 'bg-amber-500' : 'bg-slate-500/25'}`} />
                <div className={`text-[10px] mt-1.5 font-bold ${idx <= p.stageIndex ? 'text-amber-500' : s.muted}`}>{stage.label}</div>
              </li>
            ))}
          </ol>
          {isCoordinator && p.stageIndex < MISSION_STAGES.length - 1 && (
            <button
              onClick={() => {
                const next = MISSION_STAGES[p.stageIndex + 1];
                advanceMission(mission.id, next.id, currentUser, `Moved to "${next.label}"`);
              }}
              className={`${s.ghostButton} mt-4`}
            >
              Mark as "{MISSION_STAGES[p.stageIndex + 1].label}"
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Evidence */}
            <section className={`${s.card} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`font-extrabold text-sm ${s.heading}`}>Evidence ({p.total} linked grievances)</h2>
                <span className="text-xs font-black text-emerald-500">{p.fixed}/{p.total} fixed · {p.verified} verified</span>
              </div>
              <ul className="space-y-3">
                {p.linked.map((issue) => (
                  <li key={issue.id}>
                    <Link to={`/ticket/${issue.id}`} className={`${s.inset} p-3 flex gap-3 items-center hover:border-amber-500/50 transition`}>
                      <img src={issue.imageUrl} alt="" className="w-16 h-12 rounded-lg object-cover shrink-0 bg-slate-800" />
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${s.heading}`}>{issue.title}</p>
                        <p className={`text-[11px] truncate ${s.muted}`}>{issue.id} · {issue.address}</p>
                      </div>
                      <span className={`text-[10px] font-mono font-bold shrink-0 ${issue.status === 'verified' ? 'text-emerald-500' : issue.status === 'resolved' ? 'text-teal-400' : 'text-amber-500'}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Public timeline */}
            <section className={`${s.card} p-6`}>
              <h2 className={`font-extrabold text-sm mb-5 ${s.heading}`}>Public progress timeline</h2>
              <ol className={`relative pl-6 space-y-4 border-l-2 ml-2 ${s.divider}`}>
                {timeline.map((t, i) => {
                  const Icon = CONTRIBUTION_ICONS[t.kind] || Flag;
                  return (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                      <div className={`text-xs font-bold flex items-center gap-1.5 ${s.heading}`}>
                        <Icon className="w-3.5 h-3.5 text-amber-500" /> {t.label}
                      </div>
                      <div className={`text-[10px] font-mono mt-0.5 ${s.muted}`}>
                        {t.by} · {timeAgo(parseWhen(t.at, now), now)}
                      </div>
                      {t.url && <a href={t.url} target="_blank" rel="noreferrer" className="text-[11px] text-amber-500 underline">View attachment</a>}
                    </li>
                  );
                })}
              </ol>
            </section>
          </div>

          <aside className="space-y-6">
            {/* Authorities */}
            <section className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`}>
                <Building2 className="w-4 h-4 text-amber-500" /> Responsible authorities
              </h3>
              <ul className="space-y-2">
                {mission.authorities.map((a) => (
                  <li key={a.name} className={`${s.inset} p-2.5 text-[11px]`}>
                    <div className={`font-bold ${s.heading}`}>{a.name}</div>
                    {a.contact && <div className={`font-mono ${s.muted}`}>{a.contact}</div>}
                  </li>
                ))}
              </ul>
            </section>

            {/* Reminders */}
            <section className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`}>
                <Bell className="w-4 h-4 text-amber-500" /> Follow-up reminders
              </h3>
              <ul className="space-y-2">
                {mission.reminders.length === 0 && <li className={`text-[11px] ${s.muted}`}>No reminders yet.</li>}
                {mission.reminders.map((r) => {
                  const due = parseWhen(r.dueAt, now);
                  const overdue = !r.done && due < now;
                  return (
                    <li key={r.id} className={`${s.inset} p-2.5 flex items-start gap-2 text-[11px] ${r.done ? 'opacity-50' : ''}`}>
                      <Clock className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${overdue ? 'text-rose-500' : 'text-amber-500'}`} />
                      <div className="flex-1">
                        <div className={`font-bold ${r.done ? 'line-through' : ''} ${s.heading}`}>{r.label}</div>
                        <div className={overdue ? 'text-rose-500 font-bold' : s.muted}>{overdue ? 'Overdue · ' : ''}{formatDate(due)}</div>
                      </div>
                      {!r.done && isMember && (
                        <button onClick={() => completeReminder(mission.id, r.id)} title="Mark done" className="text-emerald-500">
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              {isMember && (
                <form
                  className="mt-3 space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!reminder.dueAt || !reminder.label.trim()) return;
                    addReminder(mission.id, { dueAt: new Date(reminder.dueAt).toISOString(), label: reminder.label.trim() });
                    setReminder({ dueAt: '', label: '' });
                  }}
                >
                  <input className={s.input} placeholder="e.g. Call the JE if no reply" value={reminder.label} onChange={(e) => setReminder({ ...reminder, label: e.target.value })} />
                  <div className="flex gap-2">
                    <input type="date" className={s.input} value={reminder.dueAt} onChange={(e) => setReminder({ ...reminder, dueAt: e.target.value })} />
                    <button className={s.primaryButton} type="submit">Add</button>
                  </div>
                </form>
              )}
            </section>

            {/* Contribute */}
            <section className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm mb-3 ${s.heading}`}>Contribute</h3>
              {!isLoggedIn ? (
                <Link to="/login" className={s.primaryButton}>Sign in to contribute</Link>
              ) : (
                <>
                  <div className="grid grid-cols-4 gap-1 mb-3">
                    {['photo', 'submission', 'verification', 'volunteer'].map((t) => {
                      const Icon = CONTRIBUTION_ICONS[t];
                      return (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] font-bold border transition ${
                            tab === t ? 'bg-orange-600 text-white border-orange-600' : `${s.inset} ${s.text}`
                          }`}
                        >
                          <Icon className="w-4 h-4" /> {t === 'submission' ? 'Petition' : t[0].toUpperCase() + t.slice(1)}
                        </button>
                      );
                    })}
                  </div>

                  {tab === 'photo' && (
                    <div className="space-y-2">
                      <input className={s.input} placeholder="Photo link (optional)" value={url} onChange={(e) => setUrl(e.target.value)} />
                      <textarea className={s.input} rows={2} placeholder="What does it show? Where and when?" value={note} onChange={(e) => setNote(e.target.value)} />
                      <button onClick={() => contribute('photo')} className={`${s.primaryButton} w-full`}>Add evidence</button>
                    </div>
                  )}

                  {tab === 'submission' && (
                    <div className="space-y-2">
                      <button onClick={() => setDraft(draftSubmission(mission, issues))} className={`${s.ghostButton} w-full`}>
                        <FileText className="w-4 h-4" /> Draft petition from evidence
                      </button>
                      {draft && (
                        <>
                          <textarea className={`${s.input} font-mono text-[10px]`} rows={12} value={draft} onChange={(e) => setDraft(e.target.value)} />
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                navigator.clipboard?.writeText(draft);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 1500);
                              }}
                              className={`${s.ghostButton} flex-1`}
                            >
                              <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied' : 'Copy'}
                            </button>
                            <button onClick={() => contribute('submission')} className={`${s.primaryButton} flex-1`}>Log it</button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {tab === 'verification' && (
                    <div className="space-y-2 text-[11px]">
                      {verifiable.length === 0 ? (
                        <p className={s.muted}>No linked issue is waiting for verification yet. When a repair is claimed, it appears here.</p>
                      ) : (
                        verifiable.map((i) => (
                          <Link key={i.id} to={`/ticket/${i.id}`} className={`${s.inset} p-2.5 block font-bold ${s.heading}`}>
                            Verify {i.id} on site →
                          </Link>
                        ))
                      )}
                    </div>
                  )}

                  {tab === 'volunteer' && (
                    <div className="space-y-2">
                      <textarea className={s.input} rows={2} placeholder="How can you help? e.g. join the inspection walk" value={note} onChange={(e) => setNote(e.target.value)} />
                      <p className={`text-[10px] ${s.muted}`}>
                        Only authorised, safe community work coordinated with the responsible department. Never open drains, wiring or manholes yourself.
                      </p>
                      <button onClick={() => contribute('volunteer')} className={`${s.primaryButton} w-full`}>Sign up</button>
                    </div>
                  )}
                </>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
