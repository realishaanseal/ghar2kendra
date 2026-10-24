import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from '@/lib/router-compat';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { ArrowLeft, ClipboardList, Users, History, BarChart3, UserPlus, Upload, ExternalLink } from 'lucide-react';
import { getAllIssues } from '../api/memoryStore';
import {
  getWorkspace, addStaff, assignIssue, setAssignmentStatus, resolveWithEvidence, WORKSPACE_EVENT,
} from '../api/workspaceStore';
import { ASSETS } from '../data/civicAssets';
import { WORKSPACE_TYPES, workspaceIssues, workspaceAnalytics, staffLoad } from '../engine/workspaces';
import { buildAssetMemory, summarizeMemory } from '../engine/memory';
import { distanceMeters } from '../engine/geo';
import { surface } from '../components/civic/surface';
import { ReliabilityRing } from '../components/civic/MemoryParts';

const TABS = [
  { id: 'queue', label: 'Queue', icon: ClipboardList },
  { id: 'staff', label: 'Staff', icon: Users },
  { id: 'history', label: 'Maintenance history', icon: History },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];
const OPEN = ['submitted', 'triaged', 'in_progress'];
const SAMPLE_AFTER = 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80';

export default function WorkspaceDetailPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const { id } = useParams();
  const [ws, setWs] = useState(() => getWorkspace(id));
  const [issues, setIssues] = useState([]);
  const [tab, setTab] = useState('queue');
  const [staffForm, setStaffForm] = useState({ name: '', role: '' });
  const [resolving, setResolving] = useState(null);
  const [evidence, setEvidence] = useState({ afterUrl: SAMPLE_AFTER, note: '' });

  useEffect(() => {
    const load = async () => {
      setWs(getWorkspace(id));
      setIssues(await getAllIssues());
    };
    load();
    window.addEventListener(WORKSPACE_EVENT, load);
    window.addEventListener('civic-issues-updated', load);
    return () => {
      window.removeEventListener(WORKSPACE_EVENT, load);
      window.removeEventListener('civic-issues-updated', load);
    };
  }, [id]);

  const analytics = useMemo(() => (ws ? workspaceAnalytics(ws, issues) : null), [ws, issues]);
  if (!ws) {
    return (
      <div className={`${s.page} flex flex-col items-center justify-center gap-3`}>
        <p className={s.muted}>Workspace not found.</p>
        <Link to="/workspaces" className={s.ghostButton}>All workspaces</Link>
      </div>
    );
  }

  const queue = workspaceIssues(ws, issues)
    .filter((i) => !i.archived)
    .sort((a, b) => Number(OPEN.includes(b.status)) - Number(OPEN.includes(a.status)));
  const load = staffLoad(ws);
  const assets = ASSETS.filter((a) => distanceMeters(ws.lat, ws.lng, a.lat, a.lng) <= ws.radiusM + a.radiusM);
  const type = WORKSPACE_TYPES[ws.type];
  const axis = isDarkMode ? '#8a8378' : '#6b645a';

  const submitEvidence = async (e) => {
    e.preventDefault();
    const a = ws.assignments[resolving.id];
    const staff = ws.staff.find((m) => m.id === a?.staffId) || { name: 'Workspace staff' };
    await resolveWithEvidence(ws.id, resolving, { staff, afterUrl: evidence.afterUrl, note: evidence.note || 'Fixed by workspace staff.' });
    setResolving(null);
    setEvidence({ afterUrl: SAMPLE_AFTER, note: '' });
  };

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Link to="/workspaces" className={`inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`}>
          <ArrowLeft className="w-4 h-4 text-amber-500" /> All workspaces
        </Link>

        <header className={`${s.card} p-6`}>
          <span className={s.chipNeutral}>{type?.icon} {type?.label}</span>
          <h1 className={`text-2xl sm:text-3xl font-black mt-2 ${s.heading}`}>{ws.name}</h1>
          <p className={`text-sm mt-1 ${s.muted}`}>{ws.description} · service radius {ws.radiusM} m</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5">
            {[
              ['Open', analytics.open],
              ['Fixed', analytics.fixed],
              ['Verified', analytics.verified],
              ['Avg. time to fix', analytics.mttrHours == null ? '—' : `${Math.round(analytics.mttrHours)} h`],
              ['Recurrence', `${Math.round(analytics.recurrenceRate * 100)}%`],
            ].map(([label, value]) => (
              <div key={label} className={`${s.inset} p-3`}>
                <div className={`text-[10px] uppercase font-bold tracking-wider ${s.muted}`}>{label}</div>
                <div className={`text-lg font-black font-mono ${s.heading}`}>{value}</div>
              </div>
            ))}
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto no-scrollbar">
          {TABS.map(({ id: t, label, icon: Icon }) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={tab === t ? s.primaryButton : s.ghostButton}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        {tab === 'queue' && (
          <section className={`${s.card} p-5 overflow-x-auto`}>
            <table className="w-full text-xs min-w-[720px]">
              <thead>
                <tr className={`text-left text-[10px] uppercase tracking-wider ${s.muted}`}>
                  <th className="pb-3">Issue</th><th className="pb-3">Status</th><th className="pb-3">Assigned to</th><th className="pb-3">Work status</th><th className="pb-3" />
                </tr>
              </thead>
              <tbody>
                {queue.map((issue) => {
                  const a = ws.assignments[issue.id];
                  const open = OPEN.includes(issue.status);
                  return (
                    <tr key={issue.id} className={`border-t ${s.divider}`}>
                      <td className="py-3 pr-3">
                        <Link to={`/ticket/${issue.id}`} className={`font-bold hover:text-amber-500 ${s.heading}`}>{issue.title}</Link>
                        <div className={`text-[10px] font-mono ${s.muted}`}>{issue.id} · {issue.severity}</div>
                      </td>
                      <td className={`py-3 pr-3 font-mono ${open ? 'text-amber-500' : 'text-emerald-500'}`}>{issue.status.replace('_', ' ')}</td>
                      <td className="py-3 pr-3">
                        <select
                          className={`${s.input} !py-1.5`}
                          value={a?.staffId || ''}
                          disabled={!open}
                          onChange={(e) => assignIssue(ws.id, issue.id, e.target.value)}
                        >
                          <option value="">Unassigned</option>
                          {ws.staff.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.role})</option>)}
                        </select>
                      </td>
                      <td className="py-3 pr-3">
                        {a ? (
                          <select
                            className={`${s.input} !py-1.5`}
                            value={a.status}
                            disabled={a.status === 'done'}
                            onChange={(e) => setAssignmentStatus(ws.id, issue.id, e.target.value)}
                          >
                            <option value="assigned">Assigned</option>
                            <option value="in_progress">In progress</option>
                            {a.status === 'done' && <option value="done">Done</option>}
                          </select>
                        ) : (
                          <span className={s.muted}>—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {open && a && (
                          <button onClick={() => setResolving(issue)} className={`${s.ghostButton} !px-3 !py-1.5`}>
                            <Upload className="w-3.5 h-3.5" /> Resolve with evidence
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {queue.length === 0 && <p className={`text-xs ${s.muted}`}>No public issues in this service area.</p>}

            {resolving && (
              <form onSubmit={submitEvidence} className={`${s.inset} p-4 mt-4 space-y-2`}>
                <p className={`text-xs font-black ${s.heading}`}>Resolution evidence for {resolving.id}</p>
                <input className={s.input} value={evidence.afterUrl} onChange={(e) => setEvidence({ ...evidence, afterUrl: e.target.value })} placeholder="After-photo link" />
                <textarea className={s.input} rows={2} value={evidence.note} onChange={(e) => setEvidence({ ...evidence, note: e.target.value })} placeholder="What was done, by whom" />
                <p className={`text-[10px] ${s.muted}`}>The public ticket then needs resident attestations and a review before it counts as verified.</p>
                <div className="flex gap-2">
                  <button type="submit" className={s.primaryButton}>Submit evidence</button>
                  <button type="button" onClick={() => setResolving(null)} className={s.ghostButton}>Cancel</button>
                </div>
              </form>
            )}
          </section>
        )}

        {tab === 'staff' && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {load.map((m) => (
                <div key={m.id} className={`${s.card} p-4 flex items-center gap-4`}>
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center">{m.name[0]}</div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${s.heading}`}>{m.name}</div>
                    <div className={`text-[11px] ${s.muted}`}>{m.role}</div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="font-black text-amber-500">{m.open} open</div>
                    <div className={s.muted}>{m.done} done</div>
                  </div>
                </div>
              ))}
              {load.length === 0 && <p className={`text-xs ${s.muted}`}>No staff yet.</p>}
            </div>
            <form
              className={`${s.card} p-5 space-y-2 h-fit`}
              onSubmit={(e) => {
                e.preventDefault();
                if (!staffForm.name.trim() || !staffForm.role.trim()) return;
                addStaff(ws.id, { name: staffForm.name.trim(), role: staffForm.role.trim() });
                setStaffForm({ name: '', role: '' });
              }}
            >
              <h3 className={`font-extrabold text-sm flex items-center gap-2 ${s.heading}`}><UserPlus className="w-4 h-4 text-amber-500" /> Add staff</h3>
              <input className={s.input} placeholder="Name" value={staffForm.name} onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })} />
              <input className={s.input} placeholder="Responsibility, e.g. Plumber" value={staffForm.role} onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })} />
              <button type="submit" className={`${s.primaryButton} w-full`}>Add</button>
            </form>
          </section>
        )}

        {tab === 'history' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.length === 0 && <p className={`text-xs ${s.muted}`}>No registered assets in this service area yet.</p>}
            {assets.map((asset) => {
              const memory = buildAssetMemory(asset, issues, ASSETS);
              return (
                <Link key={asset.id} to={`/memory/${asset.id}`} className={`${s.card} p-5 flex gap-4 items-center hover:border-amber-500/60 transition`}>
                  <ReliabilityRing reliability={memory.reliability} size={60} />
                  <div className="flex-1 min-w-0">
                    <div className={`font-black text-sm ${s.heading}`}>{asset.name}</div>
                    <div className={`text-[11px] mt-1 ${s.muted}`}>{summarizeMemory(memory)}</div>
                    {memory.reliability.reasons[0] && <div className={`text-[11px] mt-0.5 ${s.text}`}>{memory.reliability.reasons[0]}</div>}
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </section>
        )}

        {tab === 'analytics' && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={`${s.card} p-5 lg:col-span-2`}>
              <h3 className={`font-extrabold text-sm mb-4 ${s.heading}`}>Opened vs fixed, last 8 weeks</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.weekly}>
                    <CartesianGrid strokeDasharray="3 3" stroke={axis} strokeOpacity={0.2} vertical={false} />
                    <XAxis dataKey="week" tick={{ fill: axis, fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fill: axis, fontSize: 11 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="opened" name="Opened" fill="#C2463A" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="resolved" name="Fixed" fill="#3C8F78" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm mb-4 ${s.heading}`}>By category (all time)</h3>
              <ul className="space-y-2">
                {analytics.byCategory.map(({ category, count }) => (
                  <li key={category} className="text-xs">
                    <div className="flex justify-between font-bold mb-1">
                      <span className={`capitalize ${s.text}`}>{category}</span>
                      <span className="font-mono text-amber-500">{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-500/20 overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: `${(count / analytics.total) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className={`text-[11px] mt-4 ${s.muted}`}>{analytics.breached} open issue{analytics.breached === 1 ? '' : 's'} past the repair deadline.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
