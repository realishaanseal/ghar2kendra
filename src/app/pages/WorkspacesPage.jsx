import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from '@/lib/router-compat';
import { Briefcase, ArrowRight, Plus, Users } from 'lucide-react';
import { getAllIssues } from '../api/memoryStore';
import { getWorkspaces, createWorkspace, WORKSPACE_EVENT } from '../api/workspaceStore';
import { ASSETS } from '../data/civicAssets';
import { WORKSPACE_TYPES, workspaceAnalytics } from '../engine/workspaces';
import { surface } from '../components/civic/surface';

export default function WorkspacesPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const navigate = useNavigate();
  const [workspaces, setWorkspaces] = useState(getWorkspaces);
  const [issues, setIssues] = useState([]);
  const [form, setForm] = useState({ name: '', type: 'college', assetId: ASSETS[0].id, radiusM: 400 });

  useEffect(() => {
    const load = async () => {
      setWorkspaces(getWorkspaces());
      setIssues(await getAllIssues());
    };
    load();
    window.addEventListener(WORKSPACE_EVENT, load);
    return () => window.removeEventListener(WORKSPACE_EVENT, load);
  }, []);

  const create = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const anchor = ASSETS.find((a) => a.id === form.assetId);
    const ws = createWorkspace({ name: form.name.trim(), type: form.type, lat: anchor.lat, lng: anchor.lng, radiusM: Number(form.radiusM), description: `Around ${anchor.name}` });
    navigate(`/workspaces/${ws.id}`);
  };

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <header>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
            <Briefcase className="w-4 h-4" /> G2K Workspaces
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mt-2 ${s.heading}`}>For the people who can fix it directly.</h1>
          <p className={`text-sm mt-2 max-w-2xl ${s.muted}`}>
            Colleges, residents' associations, campuses and NGOs get their own operations view: issue assignment, staff
            responsibilities, maintenance history, resolution evidence and analytics. Adoption without waiting for a government contract.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 content-start">
            {workspaces.map((ws) => {
              const a = workspaceAnalytics(ws, issues);
              const type = WORKSPACE_TYPES[ws.type];
              return (
                <Link key={ws.id} to={`/workspaces/${ws.id}`} className={`${s.card} p-5 block hover:border-amber-500/60 transition group`}>
                  <div className="flex items-center justify-between">
                    <span className={s.chipNeutral}>{type?.icon} {type?.label}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500" />
                  </div>
                  <h2 className={`font-black mt-3 leading-snug ${s.heading}`}>{ws.name}</h2>
                  <p className={`text-[11px] mt-1 ${s.muted}`}>{ws.description}</p>
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    {[
                      ['Open', a.open, 'text-rose-500'],
                      ['Fixed', a.fixed, 'text-emerald-500'],
                      ['Staff', ws.staff.length, 'text-amber-500'],
                    ].map(([label, value, cls]) => (
                      <div key={label} className={`${s.inset} py-2`}>
                        <div className={`font-mono font-black ${cls}`}>{value}</div>
                        <div className={`text-[10px] ${s.muted}`}>{label}</div>
                      </div>
                    ))}
                  </div>
                </Link>
              );
            })}
          </div>

          <form onSubmit={create} className={`${s.card} p-5 space-y-3 h-fit`}>
            <h2 className={`font-extrabold text-sm flex items-center gap-2 ${s.heading}`}>
              <Plus className="w-4 h-4 text-amber-500" /> Create a workspace
            </h2>
            <input className={s.input} placeholder="Organisation name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select className={s.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              {Object.entries(WORKSPACE_TYPES).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
            </select>
            <label className={`block text-[11px] font-bold ${s.text}`}>
              Service area centred on
              <select className={`${s.input} mt-1`} value={form.assetId} onChange={(e) => setForm({ ...form, assetId: e.target.value })}>
                {ASSETS.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </label>
            <label className={`block text-[11px] font-bold ${s.text}`}>
              Radius
              <select className={`${s.input} mt-1`} value={form.radiusM} onChange={(e) => setForm({ ...form, radiusM: e.target.value })}>
                {[200, 400, 800, 1500].map((r) => <option key={r} value={r}>{r} m</option>)}
              </select>
            </label>
            <button type="submit" className={`${s.primaryButton} w-full`} disabled={!form.name.trim()}>
              <Users className="w-4 h-4" /> Create workspace
            </button>
            <p className={`text-[10px] ${s.muted}`}>
              The software is the easy part. The real work is getting an organisation to commit staff, so start with one pilot.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
