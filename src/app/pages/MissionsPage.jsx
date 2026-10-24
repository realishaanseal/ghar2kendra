import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from '@/lib/router-compat';
import { Flag, Users, Sparkles, ArrowRight, MapPin, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getFeed } from '../api/supabaseClient';
import { getMissions, getMissionSuggestions, createMission, MISSION_EVENT } from '../api/missionStore';
import { missionProgress, MISSION_STAGES } from '../engine/missions';
import { surface } from '../components/civic/surface';

export default function MissionsPage({ isDarkMode = true }) {
  const s = surface(isDarkMode);
  const { currentUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const load = async () => {
      setMissions(getMissions());
      setIssues(await getFeed());
      setSuggestions(await getMissionSuggestions());
    };
    load();
    window.addEventListener(MISSION_EVENT, load);
    window.addEventListener('civic-issues-updated', load);
    return () => {
      window.removeEventListener(MISSION_EVENT, load);
      window.removeEventListener('civic-issues-updated', load);
    };
  }, []);

  const start = (suggestion) => {
    if (!isLoggedIn) return navigate('/login');
    const mission = createMission(suggestion, currentUser);
    navigate(`/missions/${mission.id}`);
  };

  return (
    <div className={s.page}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        <header>
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-600">
            <Flag className="w-4 h-4" /> Civic Missions
          </div>
          <h1 className={`text-3xl sm:text-4xl font-black mt-2 ${s.heading}`}>Many reports, one coordinated fix.</h1>
          <p className={`text-sm mt-2 max-w-2xl ${s.muted}`}>
            When many residents report the same underlying problem, G2K groups the evidence into a mission with a coordinator,
            the responsible authorities, follow-up reminders and a public timeline. No government integration needed.
          </p>
        </header>

        {suggestions.length > 0 && (
          <section>
            <h2 className={`text-sm font-black flex items-center gap-2 mb-3 ${s.heading}`}>
              <Sparkles className="w-4 h-4 text-amber-500" /> Suggested from clustered reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((sug) => (
                <div key={sug.key} className={`${s.card} p-5 border-dashed`}>
                  <h3 className={`font-black ${s.heading}`}>{sug.title}</h3>
                  <p className={`text-xs mt-1 ${s.muted}`}>
                    {sug.issueIds.length} open reports within {sug.spreadM} m · {sug.ward}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {sug.issueIds.map((id) => (
                      <Link key={id} to={`/ticket/${id}`} className={s.chipNeutral}>{id}</Link>
                    ))}
                  </div>
                  <div className={`text-[11px] mt-3 flex items-center gap-1 ${s.text}`}>
                    <Building2 className="w-3.5 h-3.5 text-amber-500" /> {sug.authorities.join(' · ')}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-black text-amber-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {sug.residents} residents affected
                    </span>
                    <button onClick={() => start(sug)} className={s.primaryButton}>
                      Start mission <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className={`text-sm font-black mb-3 ${s.heading}`}>Active missions</h2>
          {missions.length === 0 ? (
            <p className={`text-xs ${s.muted}`}>No missions yet. Start one from a suggestion above.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {missions.map((mission) => {
                const p = missionProgress(mission, issues);
                return (
                  <Link key={mission.id} to={`/missions/${mission.id}`} className={`${s.card} p-5 block hover:border-amber-500/60 transition`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={s.chipNeutral}>{mission.id}</span>
                      <span className={s.chip}>{MISSION_STAGES[p.stageIndex].label}</span>
                      {p.overdue.length > 0 && <span className="text-[10px] font-black text-rose-500">{p.overdue.length} follow-up overdue</span>}
                    </div>
                    <h3 className={`font-black mt-2 ${s.heading}`}>{mission.title}</h3>
                    <p className={`text-[11px] mt-1 flex items-center gap-1 ${s.muted}`}>
                      <MapPin className="w-3 h-3" /> {mission.ward} · coordinated by {mission.coordinator.name}
                    </p>
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] font-bold mb-1">
                        <span className={s.text}>{p.fixed}/{p.total} linked issues fixed</span>
                        <span className="text-amber-500">{mission.members.length} member{mission.members.length === 1 ? "" : "s"}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-500/20 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${p.percent}%` }} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
