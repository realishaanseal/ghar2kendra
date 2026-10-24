import React, { useState } from 'react';
import { ThumbsUp, MapPin, Clock, MessageSquare, Share2, Building2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { CivicAPI } from '../api/supabaseClient';

const SEVERITY_CONFIG = {
  critical: { label: 'Critical Hazard', badge: 'bg-rose-600 text-white shadow-md shadow-rose-600/30 font-black', dot: 'bg-white' },
  high: { label: 'High Urgency', badge: 'bg-amber-600 text-white shadow-md shadow-amber-600/30 font-black', dot: 'bg-white' },
  medium: { label: 'Moderate', badge: 'bg-orange-600 text-white shadow-md shadow-orange-600/30 font-black', dot: 'bg-white' },
  low: { label: 'Low', badge: 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-black', dot: 'bg-white' },
};

const STAGES = [
  { id: 1, label: 'Logged' },
  { id: 2, label: 'Triaged' },
  { id: 3, label: 'Crew Dispatched' },
  { id: 4, label: 'Verified' },
];

export default function IssueCard({ issue, isLight = false }) {
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!hasUpvoted) {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
      CivicAPI.upvoteIssue(issue.id);
    } else {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.origin + `/ticket/${issue.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severity = SEVERITY_CONFIG[issue.severity] || SEVERITY_CONFIG.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group border ${
        isLight
          ? 'bg-white border-slate-200/90 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:border-amber-400'
          : 'bg-ink-raised/90 border-slate-800/90 shadow-xl hover:shadow-[0_0_35px_rgba(245,158,11,0.15)] hover:border-amber-500/40'
      }`}
    >
      <div>
        {/* Top Media Header */}
        <Link to={`/ticket/${issue.id}`} className="block relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer">
          <img
            src={issue.imageUrl}
            alt={issue.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30" />

          {/* Severity & Ticket ID */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-md ${severity.badge}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${severity.dot} animate-pulse`} />
              {severity.label}
            </span>
          </div>

          <span className="absolute top-3 right-3 text-[11px] font-mono font-bold bg-black/70 text-amber-300 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/20">
            {issue.id}
          </span>

          {/* Department Tag & SLA */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 text-white">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate max-w-[190px] text-[11px] font-medium">{issue.department}</span>
            </span>

            {issue.status === 'resolved' ? (
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md shadow-md">
                <ShieldCheck className="w-3 h-3 text-white" /> Resolved
              </span>
            ) : (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-md shadow-md">
                <Clock className="w-3 h-3 text-slate-950" /> {issue.slaRemainingHours}h SLA
              </span>
            )}
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-5">
          {/* CONNECTED HUD-STYLE STAGE NODES */}
          <div className={`mb-4 p-2.5 rounded-2xl border flex items-center justify-between ${
            isLight
              ? 'bg-slate-50 border-slate-200/90'
              : 'bg-slate-900/90 border-slate-800'
          }`}>
            {STAGES.map((s, index) => {
              const isPastOrCurrent = issue.timelineStep >= s.id;
              const isCurrent = issue.timelineStep === s.id;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all ${
                        isCurrent
                          ? 'bg-orange-600 hover:bg-orange-700 text-white ring-4 ring-orange-500/20 shadow-md'
                          : isPastOrCurrent
                          ? 'bg-emerald-500 text-white'
                          : isLight
                          ? 'bg-slate-200 text-slate-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isPastOrCurrent && issue.timelineStep > s.id ? '✓' : s.id}
                    </div>
                    <span
                      className={`text-[9px] font-bold mt-1 tracking-tight truncate max-w-[62px] text-center ${
                        isCurrent
                          ? 'text-amber-600 font-extrabold'
                          : isPastOrCurrent
                          ? isLight ? 'text-slate-700' : 'text-slate-300'
                          : 'text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < STAGES.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-1 rounded-full transition-colors ${
                        issue.timelineStep > s.id
                          ? 'bg-emerald-500'
                          : isLight ? 'bg-slate-200' : 'bg-slate-800'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <Link to={`/ticket/${issue.id}`} className="block group-hover:text-amber-600 transition-colors">
            <h3 className={`font-extrabold text-base leading-snug mb-2 line-clamp-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              {issue.title}
            </h3>
          </Link>

          <p className={`text-xs line-clamp-2 mb-4 leading-relaxed font-normal ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}>
            {issue.description}
          </p>

          {/* Location & Reporter Info */}
          <div className={`space-y-1.5 text-xs border-t pt-3 ${
            isLight ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
          }`}>
            <p className={`flex items-center gap-1.5 font-medium truncate ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{issue.address}</span>
            </p>
            <div className={`flex items-center justify-between text-[11px] ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <span>By: <strong className={isLight ? 'text-slate-700' : 'text-slate-400'}>{issue.reportedBy}</strong></span>
              <span>{issue.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Actions Footer */}
      <div className={`px-5 py-3.5 border-t flex items-center justify-between ${
        isLight
          ? 'bg-slate-50/90 border-slate-100'
          : 'bg-slate-900/60 border-slate-800/80'
      }`}>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleUpvote}
          className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
            hasUpvoted
              ? 'bg-orange-600 hover:bg-orange-700 border-amber-500 text-white shadow-md shadow-orange-500/25'
              : isLight
              ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70'
              : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-current' : ''}`} />
          <span>I Face This ({upvotes})</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <Link
            to={`/ticket/${issue.id}`}
            className={`flex items-center gap-1 text-xs font-black px-3.5 py-2 rounded-xl transition shadow-xs border ${
              isLight
                ? 'text-amber-950 bg-amber-100 hover:bg-amber-200 border-amber-300'
                : 'text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30'
            }`}
          >
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleShare}
            className={`flex items-center gap-1 text-xs font-medium p-2 rounded-xl border transition ${
              isLight
                ? 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
            title="Share Ticket"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-400" />
            {copied && <span className="text-[10px] text-emerald-600 font-bold">Copied!</span>}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
