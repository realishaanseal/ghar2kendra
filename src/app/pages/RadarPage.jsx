import React, { useEffect, useMemo, useState } from 'react';
import { Link } from '@/lib/router-compat';
import { MapContainer, TileLayer, Circle, CircleMarker, Polyline, Tooltip, useMapEvents } from 'react-leaflet';
import { Radar, Trash2, Plus, Route, BellRing, Accessibility, Repeat, CheckCircle2, AlertTriangle, Info, LocateFixed } from 'lucide-react';
import { getAllIssues } from '../api/memoryStore';
import { getFollowedPlaces, followPlace, unfollowPlace, updatePlace, RADAR_EVENT } from '../api/radarStore';
import { buildRadarFeed, routeHazards, proximityAlerts, PLACE_KINDS, ROUTE_CORRIDOR_M } from '../engine/radar';
import { surface } from '../components/civic/surface';

const KIND_BADGE = {
  hazard: { label: 'Hazard', icon: AlertTriangle, cls: 'bg-rose-500/15 text-rose-500 border-rose-500/30' },
  recurring: { label: 'Recurring', icon: Repeat, cls: 'bg-amber-500/15 text-amber-500 border-amber-500/30' },
  verified_repair: { label: 'Verified repair', icon: CheckCircle2, cls: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' },
};
const MARKER_COLOR = { hazard: '#C2463A', recurring: '#D9982E', verified_repair: '#3C8F78' };

function PinDropper({ onDrop }) {
  useMapEvents({ click: (e) => onDrop({ lat: e.latlng.lat, lng: e.latlng.lng }) });
  return null;
}

export default function RadarPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const [places, setPlaces] = useState(getFollowedPlaces);
  const [issues, setIssues] = useState([]);
  const [draft, setDraft] = useState({ label: '', kind: 'home', lat: null, lng: null, radiusM: 400 });
  const [route, setRoute] = useState({ from: 'pl-home', to: 'pl-college' });
  const [alerts, setAlerts] = useState(null);

  useEffect(() => {
    const load = async () => {
      setPlaces(getFollowedPlaces());
      setIssues(await getAllIssues());
    };
    load();
    window.addEventListener(RADAR_EVENT, load);
    window.addEventListener('civic-issues-updated', load);
    return () => {
      window.removeEventListener(RADAR_EVENT, load);
      window.removeEventListener('civic-issues-updated', load);
    };
  }, []);

  const feed = useMemo(() => buildRadarFeed(places, issues), [places, issues]);
  const fromPlace = places.find((p) => p.id === route.from);
  const toPlace = places.find((p) => p.id === route.to);
  const routeCheck = fromPlace && toPlace && fromPlace.id !== toPlace.id ? routeHazards(fromPlace, toPlace, issues) : null;

  const addPlace = (e) => {
    e.preventDefault();
    if (!draft.label.trim() || draft.lat == null) return;
    followPlace({ ...draft, label: draft.label.trim() });
    setDraft({ label: '', kind: 'home', lat: null, lng: null, radiusM: 400 });
  };

  const checkNearMe = () => {
    const run = (pos, demo) => setAlerts({ demo, items: proximityAlerts(pos, issues) });
    const fallback = () => run(places[0] || { lat: 28.6139, lng: 77.209 }, true);
    if (!navigator.geolocation) return fallback();
    navigator.geolocation.getCurrentPosition((p) => run({ lat: p.coords.latitude, lng: p.coords.longitude }, false), fallback, { timeout: 5000 });
  };

  return (
    <div className={s.page}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <header>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
            <Radar className="w-4 h-4" /> Neighborhood Impact Radar
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mt-2 ${s.heading}`}>Only what matters where you are.</h1>
          <p className={`text-sm mt-2 max-w-2xl ${s.muted}`}>
            Follow your road, college, market or route to work. Instead of every report in the city, you see ranked developments:
            accessibility obstructions, recurring problems, hazards, and newly verified repairs.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Places */}
          <aside className="space-y-6">
            <section className={`${s.card} p-5`}>
              <h2 className={`font-extrabold text-sm mb-3 ${s.heading}`}>Places you follow</h2>
              <ul className="space-y-2">
                {places.map((p) => (
                  <li key={p.id} className={`${s.inset} p-3 flex items-center gap-2 text-xs`}>
                    <span className="text-lg">{PLACE_KINDS[p.kind]?.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold truncate ${s.heading}`}>{p.label}</div>
                      <select
                        value={p.radiusM}
                        onChange={(e) => updatePlace(p.id, { radiusM: Number(e.target.value) })}
                        className={`text-[11px] bg-transparent ${s.muted} focus:outline-none`}
                      >
                        {[200, 400, 600, 1000].map((r) => <option key={r} value={r}>within {r} m</option>)}
                      </select>
                    </div>
                    <button onClick={() => unfollowPlace(p.id)} title="Unfollow" className="text-slate-400 hover:text-rose-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <form onSubmit={addPlace} className={`mt-4 pt-4 border-t space-y-2 ${s.divider}`}>
                <div className={`text-[11px] font-bold ${s.text}`}>Follow a new place</div>
                <input className={s.input} placeholder="Name, e.g. Route to office" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} />
                <select className={s.input} value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value })}>
                  {Object.entries(PLACE_KINDS).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
                </select>
                <div className={`text-[11px] ${draft.lat == null ? 'text-amber-500' : s.muted}`}>
                  {draft.lat == null ? 'Click the map to drop a pin.' : `Pin at ${draft.lat.toFixed(4)}, ${draft.lng.toFixed(4)}`}
                </div>
                <button type="submit" disabled={!draft.label.trim() || draft.lat == null} className={`${s.primaryButton} w-full`}>
                  <Plus className="w-4 h-4" /> Follow
                </button>
              </form>
            </section>

            <section className={`${s.card} p-5`}>
              <h2 className={`font-extrabold text-sm flex items-center gap-2 mb-3 ${s.heading}`}>
                <Route className="w-4 h-4 text-amber-500" /> Hazards on my route
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {['from', 'to'].map((end) => (
                  <select key={end} className={s.input} value={route[end]} onChange={(e) => setRoute({ ...route, [end]: e.target.value })}>
                    {places.map((p) => <option key={p.id} value={p.id}>{end === 'from' ? 'From' : 'To'}: {p.label}</option>)}
                  </select>
                ))}
              </div>
              {routeCheck && (
                <div className="mt-3 text-xs space-y-2">
                  <p className={`font-black ${routeCheck.verdict === 'avoid' ? 'text-rose-500' : routeCheck.verdict === 'caution' ? 'text-amber-500' : 'text-emerald-500'}`}>
                    {routeCheck.verdict === 'avoid' ? 'Critical hazard on this route' : routeCheck.verdict === 'caution' ? `${routeCheck.hazards.length} known hazard(s) on this route` : 'No known open hazards'}
                    <span className={`font-normal ${s.muted}`}> · {(routeCheck.lengthM / 1000).toFixed(1)} km straight-line</span>
                  </p>
                  {routeCheck.hazards.map(({ issue, alongM }) => (
                    <Link key={issue.id} to={`/ticket/${issue.id}`} className={`${s.inset} p-2 block`}>
                      <span className={`font-bold ${s.heading}`}>{issue.title}</span>
                      <span className={`block text-[10px] ${s.muted}`}>{(alongM / 1000).toFixed(1)} km from start · {issue.severity}</span>
                    </Link>
                  ))}
                  <p className={`text-[10px] flex gap-1 ${s.muted}`}>
                    <Info className="w-3 h-3 shrink-0 mt-0.5" /> Checks a {ROUTE_CORRIDOR_M} m corridor around the straight line. Turn-by-turn hazard-aware routing comes later.
                  </p>
                </div>
              )}
            </section>

            <section className={`${s.card} p-5`}>
              <button onClick={checkNearMe} className={`${s.ghostButton} w-full`}>
                <BellRing className="w-4 h-4 text-amber-500" /> Check alerts near me
              </button>
              {alerts && (
                <div className="mt-3 text-xs space-y-2">
                  {alerts.demo && <p className={`text-[10px] ${s.muted}`}><LocateFixed className="w-3 h-3 inline" /> No GPS, so this uses your first followed place.</p>}
                  {alerts.items.length === 0 ? (
                    <p className="text-emerald-500 font-bold">No serious hazards within 250 m.</p>
                  ) : (
                    alerts.items.map(({ issue, distanceM }) => (
                      <Link key={issue.id} to={`/ticket/${issue.id}`} className="block rounded-xl border border-rose-500/40 bg-rose-500/10 p-2">
                        <span className="font-bold text-rose-500">{Math.round(distanceM)} m: </span>
                        <span className={s.heading}>{issue.title}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </section>
          </aside>

          {/* Map + feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`${s.card} overflow-hidden`}>
              <div className="h-80 relative z-0">
                <MapContainer center={[28.625, 77.205]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <PinDropper onDrop={(pos) => setDraft((d) => ({ ...d, ...pos }))} />
                  {places.map((p) => (
                    <Circle key={p.id} center={[p.lat, p.lng]} radius={p.radiusM} pathOptions={{ color: '#D9982E', weight: 1, fillOpacity: 0.06 }}>
                      <Tooltip>{p.label}</Tooltip>
                    </Circle>
                  ))}
                  {draft.lat != null && <CircleMarker center={[draft.lat, draft.lng]} radius={8} pathOptions={{ color: '#D9982E', fillOpacity: 1 }} />}
                  {routeCheck && <Polyline positions={[[fromPlace.lat, fromPlace.lng], [toPlace.lat, toPlace.lng]]} pathOptions={{ color: '#4A7BA6', dashArray: '6 6' }} />}
                  {feed.map((item) => (
                    <CircleMarker key={item.issue.id} center={[item.issue.lat, item.issue.lng]} radius={7} pathOptions={{ color: MARKER_COLOR[item.kind], fillOpacity: 0.9 }}>
                      <Tooltip>{item.issue.title}</Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            </div>

            <section>
              <h2 className={`font-extrabold text-sm mb-3 ${s.heading}`}>Your radar ({feed.length})</h2>
              {feed.length === 0 ? (
                <p className={`text-xs ${s.muted}`}>Nothing relevant around the places you follow. Try a bigger radius.</p>
              ) : (
                <ul className="space-y-3">
                  {feed.map((item) => {
                    const badge = KIND_BADGE[item.kind];
                    const Icon = badge.icon;
                    const accessible = item.reasons.includes('Blocks accessible movement');
                    return (
                      <li key={item.issue.id}>
                        <Link to={`/ticket/${item.issue.id}`} className={`${s.card} p-4 flex gap-4 items-start hover:border-amber-500/60 transition`}>
                          <div className="flex flex-col items-center gap-1 shrink-0 w-12">
                            <span className="font-mono font-black text-lg text-amber-500">{item.score}</span>
                            <span className={`text-[9px] uppercase font-bold ${s.muted}`}>relevance</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${badge.cls}`}>
                                <Icon className="w-3 h-3" /> {badge.label}
                              </span>
                              {accessible && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full border bg-teal-500/15 text-teal-400 border-teal-500/30 flex items-center gap-1">
                                  <Accessibility className="w-3 h-3" /> Accessibility
                                </span>
                              )}
                            </div>
                            <p className={`text-sm font-bold mt-1.5 ${s.heading}`}>{item.issue.title}</p>
                            <p className={`text-[11px] mt-0.5 ${s.muted}`}>
                              {PLACE_KINDS[item.place.kind]?.icon} {Math.round(item.distanceM)} m from {item.place.label} · {item.reasons.join(' · ')}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
