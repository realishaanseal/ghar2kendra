import React, { useEffect, useState } from 'react';
import { Link, useParams } from '@/lib/router-compat';
import { MapContainer, TileLayer, Circle, CircleMarker, Tooltip } from 'react-leaflet';
import { ArrowLeft, Building2, CalendarClock, Info, MapPin, RefreshCw } from 'lucide-react';
import { getAssetMemory } from '../api/memoryStore';
import { ASSET_KINDS } from '../data/civicAssets';
import { formatDate } from '../engine/time';
import { surface } from '../components/civic/surface';
import { ReliabilityRing, GradeChip, MemoryTimeline, StatTile } from '../components/civic/MemoryParts';

const STATUS_COLOR = {
  submitted: '#C2463A',
  triaged: '#D9982E',
  in_progress: '#D9982E',
  resolved: '#4A7BA6',
  verified: '#3C8F78',
  rejected: '#888888',
};

export default function AssetMemoryPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const { assetId } = useParams();
  const [memory, setMemory] = useState(undefined);

  useEffect(() => {
    const load = () => getAssetMemory(assetId).then(setMemory);
    load();
    window.addEventListener('civic-issues-updated', load);
    return () => window.removeEventListener('civic-issues-updated', load);
  }, [assetId]);

  if (memory === undefined) {
    return (
      <div className={`${s.page} flex items-center justify-center`}>
        <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }
  if (memory === null) {
    return (
      <div className={`${s.page} flex flex-col items-center justify-center gap-3`}>
        <p className={s.muted}>No asset with id {assetId}.</p>
        <Link to="/memory" className={s.ghostButton}>Back to Civic Memory</Link>
      </div>
    );
  }

  const { asset, stats, reliability, outlook, events, issues } = memory;
  const kind = ASSET_KINDS[asset.kind];
  const round = (x) => (x == null ? '—' : Math.round(x));

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <Link to="/memory" className={`inline-flex items-center gap-2 text-xs font-bold ${s.muted} hover:text-amber-500`}>
          <ArrowLeft className="w-4 h-4 text-amber-500" /> All assets
        </Link>

        <header className={`${s.card} p-6 flex flex-col sm:flex-row gap-5 sm:items-center`}>
          <ReliabilityRing reliability={reliability} size={96} />
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={s.chipNeutral}>{kind?.icon} {kind?.label}</span>
              <span className={s.chipNeutral}>{asset.id}</span>
              <GradeChip grade={reliability.grade} />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-black mt-2 ${s.heading}`}>{asset.name}</h1>
            <div className={`text-xs mt-2 flex flex-wrap gap-x-4 gap-y-1 ${s.muted}`}>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {asset.ward}</span>
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {asset.custodian}</span>
            </div>
            {reliability.reasons.length > 0 && (
              <ul className={`text-[11px] mt-3 space-y-0.5 ${s.text}`}>
                {reliability.reasons.map((r) => <li key={r}>• {r}</li>)}
              </ul>
            )}
          </div>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatTile s={s} label="Reports" value={stats.reports} />
          <StatTile s={s} label="Repairs" value={stats.repairs} hint={`${stats.verifiedRepairs} verified`} />
          <StatTile s={s} label="Recurrences" value={stats.recurrences} />
          <StatTile s={s} label="Repair life" value={`${round(stats.meanRepairLifeDays)}d`} hint="avg. before defect returns" />
          <StatTile s={s} label="Last verified" value={stats.lastVerifiedAt ? formatDate(stats.lastVerifiedAt) : 'Never'} />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className={`${s.card} p-6 lg:col-span-2`}>
            <h2 className={`font-extrabold text-sm mb-5 ${s.heading}`}>Asset history</h2>
            <MemoryTimeline events={events} s={s} />
          </section>

          <aside className="space-y-6">
            <div className={`${s.card} overflow-hidden`}>
              <div className="h-56 relative z-0">
                <MapContainer center={[asset.lat, asset.lng]} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Circle center={[asset.lat, asset.lng]} radius={asset.radiusM} pathOptions={{ color: '#D9982E', weight: 1, fillOpacity: 0.08 }} />
                  {issues.map((issue) => (
                    <CircleMarker
                      key={issue.id}
                      center={[issue.lat, issue.lng]}
                      radius={7}
                      pathOptions={{ color: STATUS_COLOR[issue.status] || '#888', fillOpacity: 0.85 }}
                    >
                      <Tooltip>{issue.id}: {issue.title}</Tooltip>
                    </CircleMarker>
                  ))}
                </MapContainer>
              </div>
            </div>

            <div className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm flex items-center gap-2 ${s.heading}`}>
                <CalendarClock className="w-4 h-4 text-amber-500" /> Outlook
              </h3>
              {outlook ? (
                <p className={`text-xs mt-2 ${s.text}`}>
                  If the repair method doesn't change, the next failure is likely around{' '}
                  <strong className={outlook.overdue ? 'text-rose-500' : 'text-amber-500'}>{formatDate(outlook.expectedFailureAt)}</strong>
                  {outlook.overdue ? ' (already overdue)' : ''}. Based on: {outlook.basis}.
                </p>
              ) : (
                <p className={`text-xs mt-2 ${s.muted}`}>
                  {stats.openCount > 0
                    ? 'An issue is still open here. The outlook appears once it is repaired.'
                    : 'Not enough repeat failures yet to estimate anything. That is good news.'}
                </p>
              )}
              <p className={`text-[10px] mt-3 flex gap-1 ${s.muted}`}>
                <Info className="w-3 h-3 shrink-0 mt-0.5" /> A statistical average of past repairs, not a guarantee.
              </p>
            </div>

            <div className={`${s.card} p-5`}>
              <h3 className={`font-extrabold text-sm mb-3 ${s.heading}`}>Tickets on this asset</h3>
              <ul className="space-y-2">
                {issues.map((issue) => (
                  <li key={issue.id}>
                    <Link to={`/ticket/${issue.id}`} className={`${s.inset} p-2.5 flex items-center gap-2 hover:border-amber-500/50 transition`}>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_COLOR[issue.status] || '#888' }} />
                      <span className={`text-[11px] font-semibold truncate flex-1 ${s.text}`}>{issue.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{issue.status.replace('_', ' ')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
