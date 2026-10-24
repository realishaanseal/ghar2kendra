import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from '@/lib/router-compat';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { Network, Lightbulb, Sparkles, Flag, Info, Wrench, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAllIssues } from '../api/memoryStore';
import { getMissions, createMission } from '../api/missionStore';
import { explainPattern } from '../api/aiAdvisory';
import { ASSETS } from '../data/civicAssets';
import { detectPatterns, patternGraph } from '../engine/patterns';
import { categoryFamily } from '../engine/proof';
import { distanceMeters } from '../engine/geo';
import { surface } from '../components/civic/surface';

const KIND_COLOR = {
  drainage_failure: '#4A7BA6',
  subsurface_damage: '#C2463A',
  dark_spot: '#D9982E',
  repeat_failure: '#8A6A9E',
};
const CATEGORY_COLOR = { water: '#4A7BA6', waste: '#3C8F78', roads: '#D9982E', safety: '#C2463A', electricity: '#E0B13C' };

function EvidenceGraph({ pattern, issues, isDarkMode, onOpen }) {
  const graph = patternGraph(pattern, issues);
  const pos = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
  const ink = isDarkMode ? '#e8e2d6' : '#2a2620';
  return (
    <svg viewBox={`0 0 ${graph.width} ${graph.height}`} className="w-full h-auto" role="img" aria-label={`Evidence graph for ${pattern.title}`}>
      {graph.edges.map((e, i) => {
        const a = pos[e.from];
        const b = pos[e.to];
        const near = e.kind === 'near';
        return (
          <g key={i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={near ? '#D9982E' : ink} strokeOpacity={near ? 0.7 : 0.18} strokeWidth={near ? 1.5 : 1} strokeDasharray={near ? '4 3' : undefined} />
            {near && e.label && (
              <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 3} fontSize="9" textAnchor="middle" fill="#D9982E">{e.label}</text>
            )}
          </g>
        );
      })}
      {graph.nodes.map((n) =>
        n.type === 'pattern' ? (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="42" fill={KIND_COLOR[pattern.kind]} fillOpacity="0.9" />
            <text x={n.x} y={n.y + 3} fontSize="10" fontWeight="700" textAnchor="middle" fill="#fff">{n.label}</text>
          </g>
        ) : (
          <g key={n.id} className="cursor-pointer" onClick={() => onOpen(n.id)}>
              <circle cx={n.x} cy={n.y} r="22" fill={CATEGORY_COLOR[n.issue.category] || '#888'} fillOpacity={n.issue.archived ? 0.35 : 0.9} stroke={ink} strokeOpacity="0.2" />
              <text x={n.x} y={n.y + 4} fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff">{n.label}</text>
              <text x={n.x} y={n.y + 36} fontSize="10" textAnchor="middle" fill={ink} fillOpacity="0.75">
                {n.issue.category}{n.issue.archived ? ' · past' : ''}
              </text>
              <title>{`${n.issue.id}: ${n.issue.title} (${n.issue.status})`}</title>
          </g>
        ),
      )}
    </svg>
  );
}

export default function InsightsPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const navigate = useNavigate();
  const { currentUser, isLoggedIn } = useAuth();
  const [issues, setIssues] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [explanation, setExplanation] = useState({});

  useEffect(() => {
    const load = async () => setIssues(await getAllIssues());
    load();
    window.addEventListener('civic-issues-updated', load);
    return () => window.removeEventListener('civic-issues-updated', load);
  }, []);

  const patterns = useMemo(() => detectPatterns(ASSETS, issues), [issues]);
  const selected = patterns.find((p) => p.id === selectedId) || patterns[0];
  const evidence = selected ? selected.evidenceIssueIds.map((id) => issues.find((i) => i.id === id)).filter(Boolean) : [];
  const missions = getMissions();
  const existingMission = selected && missions.find((m) => selected.openIssueIds.some((id) => m.issueIds.includes(id)));

  const explain = async () => {
    setExplanation({ ...explanation, [selected.id]: { loading: true } });
    const result = await explainPattern(selected, evidence);
    setExplanation((prev) => ({ ...prev, [selected.id]: result }));
  };

  const startMission = () => {
    if (!isLoggedIn) return navigate('/login');
    const open = evidence.filter((i) => selected.openIssueIds.includes(i.id));
    const mission = createMission(
      {
        title: selected.title,
        family: categoryFamily(open[0]?.category),
        issueIds: selected.openIssueIds,
        lat: selected.lat,
        lng: selected.lng,
        ward: selected.ward,
        authorities: [...new Set(open.map((i) => i.department).filter(Boolean))],
        spreadM: Math.round(Math.max(...open.map((i) => distanceMeters(selected.lat, selected.lng, i.lat, i.lng)))),
      },
      currentUser,
    );
    navigate(`/missions/${mission.id}`);
  };

  const ai = selected && explanation[selected.id];

  return (
    <div className={s.page}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
            <Network className="w-4 h-4" /> Civic Intelligence Graph
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mt-2 ${s.heading}`}>Separate complaints, one cause.</h1>
          <p className={`text-sm mt-2 max-w-3xl ${s.muted}`}>
            G2K combines issue histories, locations, recurrence and verification data to spot infrastructure patterns.
            Every pattern is rule-based and lists the tickets behind it, so an engineer can check it.
          </p>
        </header>

        {patterns.length === 0 ? (
          <p className={`text-sm ${s.muted}`}>No patterns detected yet.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <aside className="space-y-3">
              {patterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`${s.card} p-4 w-full text-left transition ${selected?.id === p.id ? '!border-amber-500' : 'hover:border-amber-500/50'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: KIND_COLOR[p.kind] }}>{p.label}</span>
                    <span className="text-[10px] font-mono font-bold text-amber-500">{Math.round(p.confidence * 100)}% signal</span>
                  </div>
                  <p className={`text-sm font-black mt-1 leading-snug ${s.heading}`}>{p.title}</p>
                  <p className={`text-[11px] mt-1 ${s.muted}`}>
                    {p.evidenceIssueIds.length} tickets · {p.independentReporters} independent reporter{p.independentReporters === 1 ? '' : 's'} · {p.openIssueIds.length} open
                  </p>
                  <div className="h-1.5 rounded-full bg-slate-500/20 mt-2 overflow-hidden">
                    <div className="h-full bg-amber-500" style={{ width: `${p.confidence * 100}%` }} />
                  </div>
                </button>
              ))}
            </aside>

            {selected && (
              <div className="lg:col-span-2 space-y-6">
                <section className={`${s.card} p-6`}>
                  <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: KIND_COLOR[selected.kind] }}>{selected.label}</span>
                  <h2 className={`text-xl sm:text-2xl font-black mt-1 ${s.heading}`}>{selected.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className={`${s.inset} p-4`}>
                      <div className={`text-[11px] font-black flex items-center gap-1.5 ${s.heading}`}><Lightbulb className="w-4 h-4 text-amber-500" /> Hypothesis</div>
                      <p className={`text-xs mt-1.5 ${s.text}`}>{selected.hypothesis}</p>
                    </div>
                    <div className={`${s.inset} p-4`}>
                      <div className={`text-[11px] font-black flex items-center gap-1.5 ${s.heading}`}><Wrench className="w-4 h-4 text-amber-500" /> Recommended action</div>
                      <p className={`text-xs mt-1.5 ${s.text}`}>{selected.recommendation}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {existingMission ? (
                      <Link to={`/missions/${existingMission.id}`} className={s.ghostButton}>
                        <Flag className="w-4 h-4 text-amber-500" /> Already a mission: {existingMission.title}
                      </Link>
                    ) : selected.openIssueIds.length >= 2 ? (
                      <button onClick={startMission} className={s.primaryButton}>
                        <Users className="w-4 h-4" /> Create mission from {selected.openIssueIds.length} open tickets
                      </button>
                    ) : null}
                    {!ai && (
                      <button onClick={explain} className={s.ghostButton}>
                        <Sparkles className="w-4 h-4 text-amber-500" /> Explain with Gemini
                      </button>
                    )}
                    {selected.assetId && (
                      <Link to={`/memory/${selected.assetId}`} className={s.ghostButton}>Asset history</Link>
                    )}
                  </div>

                  {ai?.loading && <p className={`text-xs mt-3 ${s.muted}`}>Thinking…</p>}
                  {ai && !ai.loading && (
                    <div className={`${s.inset} p-4 mt-4 text-xs space-y-2`}>
                      <div className={`font-black flex items-center gap-1.5 ${s.heading}`}>
                        <Sparkles className="w-4 h-4 text-amber-500" /> {ai.available ? 'Gemini explanation (advisory)' : 'Explanation (AI offline, rule text)'}
                      </div>
                      <p className={s.text}>{ai.explanation}</p>
                      {ai.checks?.length > 0 && (
                        <ul className={`list-disc pl-5 ${s.text}`}>{ai.checks.map((c) => <li key={c}>{c}</li>)}</ul>
                      )}
                      {ai.caveats && <p className={s.muted}>{ai.caveats}</p>}
                    </div>
                  )}
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <section className={`${s.card} p-4`}>
                    <h3 className={`font-extrabold text-sm mb-2 ${s.heading}`}>Evidence graph</h3>
                    <EvidenceGraph pattern={selected} issues={issues} isDarkMode={isDarkMode} onOpen={(id) => navigate(`/ticket/${id}`)} />
                    <p className={`text-[10px] mt-2 ${s.muted}`}>Dashed lines join tickets within 120 m. Faded nodes are past, closed tickets.</p>
                  </section>
                  <section className={`${s.card} overflow-hidden`}>
                    <div className="h-full min-h-72 relative z-0">
                      <MapContainer key={selected.id} center={[selected.lat, selected.lng]} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%', minHeight: 288 }}>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {evidence.map((i) => (
                          <CircleMarker key={i.id} center={[i.lat, i.lng]} radius={8} pathOptions={{ color: CATEGORY_COLOR[i.category] || '#888', fillOpacity: i.archived ? 0.3 : 0.85 }}>
                            <Tooltip>{i.id}: {i.title}</Tooltip>
                          </CircleMarker>
                        ))}
                      </MapContainer>
                    </div>
                  </section>
                </div>

                <section className={`${s.card} p-5`}>
                  <h3 className={`font-extrabold text-sm mb-3 ${s.heading}`}>Tickets behind this pattern</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {evidence.map((i) => (
                      <li key={i.id}>
                        <Link to={`/ticket/${i.id}`} className={`${s.inset} p-2.5 flex items-center gap-2 text-[11px] hover:border-amber-500/50`}>
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: CATEGORY_COLOR[i.category] || '#888' }} />
                          <span className={`flex-1 truncate font-semibold ${s.text}`}>{i.title}</span>
                          <span className="font-mono text-slate-400">{i.archived ? 'past' : i.status.replace('_', ' ')}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className={`text-[10px] mt-3 flex gap-1 ${s.muted}`}>
                    <Info className="w-3 h-3 shrink-0 mt-0.5" /> Signal strength reflects how much independent evidence there is, not certainty. An engineer confirms the cause on site.
                  </p>
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
