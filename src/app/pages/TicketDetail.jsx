import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from '@/lib/router-compat';
import { MOCK_ISSUES } from '../data/mockIssues';
import { CivicAPI } from '../api/supabaseClient';
import { getArchivedTicket } from '../api/memoryStore';
import LocationMemoryCard from '../components/civic/LocationMemoryCard';
import ProofOfResolutionPanel from '../components/civic/ProofOfResolutionPanel';
import RecurrenceBanner from '../components/civic/RecurrenceBanner';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, AlertTriangle, Clock, MapPin, Building2,
  ThumbsUp, MessageSquare, Share2, Award, Sparkles, Send,
  UserCheck, ShieldAlert, Check, HardHat, Bell
} from 'lucide-react';

export default function TicketDetail({ isDarkMode = true }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find issue by id or fallback to first
  const initialIssue = MOCK_ISSUES.find((item) => item.id === id) || getArchivedTicket(id) || MOCK_ISSUES[0];
  const [issue, setIssue] = useState(initialIssue);

  useEffect(() => {
    CivicAPI.getIssueById(id).then((live) => {
      const found = live || getArchivedTicket(id);
      if (found) {
        setIssue(found);
        setUpvotes(found.upvotes || 0);
      }
    });

    const handleUpdate = () => {
      CivicAPI.getIssueById(id).then((found) => {
        if (found) setIssue(found);
      });
    };
    window.addEventListener('civic-issues-updated', handleUpdate);
    return () => window.removeEventListener('civic-issues-updated', handleUpdate);
  }, [id]);

  // Is this issue actually marked resolved with photo proof?
  const isResolved = (issue.status === 'resolved' || issue.status === 'verified') && Boolean(issue.resolvedPhotoUrl);

  const [showKarmaModal, setShowKarmaModal] = useState(false);
  const [upvotes, setUpvotes] = useState(issue.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [reminded, setReminded] = useState(false);

  // Comments
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Sunil Mehta (Resident)',
      text: 'Water was rising up to the steps of the grocery shop. Good to see immediate response.',
      time: '1 hour ago',
    },
    {
      id: 2,
      author: 'Ward 14 Inspector',
      text: 'Inspected with ground contractor. Work order is prioritized under emergency road fund.',
      time: '35 mins ago',
      isOfficial: true,
    }
  ]);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    } else {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    }
  };

  // Celebrate an eligible "it's fixed" attestation. Closing the ticket is the reviewer's job.
  const handleConfirmFix = () => {
    setShowKarmaModal(true);

    // Fire Confetti Cannon!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#D9982E', '#3C8F78', '#4A7BA6', '#C2463A', '#8A6A9E']
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: 'You (Citizen)',
      text: commentText,
      time: 'Just now',
    };
    setComments([...comments, newComment]);
    setCommentText('');
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-300 ${
      isDarkMode ? 'bg-ink text-slate-100' : 'bg-paper text-slate-900'
    }`}>

      {/* Top Header Breadcrumb */}
      <div className={`py-3.5 px-4 sm:px-6 shadow-sm border-b transition-colors ${
        !isDarkMode
          ? 'bg-white border-amber-200/80 shadow-amber-950/5'
          : 'bg-ink border-slate-800'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-bold transition ${
              !isDarkMode ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" /> Back to Live Feed
          </Link>
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-xl border ${
              !isDarkMode
                ? 'bg-amber-50 text-amber-900 border-amber-200'
                : 'bg-slate-900 text-amber-400 border-amber-500/30'
            }`}>
              {issue.id}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${
              isResolved
                ? !isDarkMode
                  ? 'text-emerald-800 bg-emerald-50 border-emerald-300'
                  : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                : !isDarkMode
                  ? 'text-amber-800 bg-amber-50 border-amber-300'
                  : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
            }`}>
              {isResolved ? 'Resolved & Pending Citizen Signoff' : 'Active Work Order in Progress'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column (2 Cols): Evidence Showcase & Verification */}
          <div className="lg:col-span-2 space-y-7">

            {/* Title & Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border ${
                  !isDarkMode
                    ? 'bg-rose-600 text-white border-rose-600 shadow-rose-600/20'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${!isDarkMode ? 'bg-white' : 'bg-rose-400'} animate-pulse`} />
                  {issue.severity.toUpperCase()} PRIORITY
                </span>
                <span className="text-slate-400">•</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  !isDarkMode
                    ? 'text-amber-950 bg-amber-100 border-amber-300'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/30'
                }`}>
                  {issue.ward}
                </span>
                <span className={`text-xs font-medium ${!isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Logged {issue.createdAt}</span>
              </div>

              <h1 className={`text-2xl sm:text-4xl font-black leading-tight ${
                !isDarkMode ? 'text-slate-900' : 'text-white'
              }`}>
                {issue.title}
              </h1>

              <p className={`text-xs sm:text-sm mt-2 flex items-center gap-1.5 font-medium ${
                !isDarkMode ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{issue.address}</span>
              </p>
            </motion.div>

            {/* Recurrence link to an earlier repair at the same spot */}
            <RecurrenceBanner issue={issue} isDarkMode={isDarkMode} />

            {/* VISUAL EVIDENCE SECTION */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 px-1">
                <span className={`text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${
                  !isDarkMode ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {isResolved ? 'Visual Verification (Before vs After)' : 'Ground Defect Inspection'}
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  !isDarkMode
                    ? 'text-amber-800 bg-amber-100 border-amber-300'
                    : 'text-amber-400 bg-amber-950/60 border-amber-800/60'
                }`}>
                  GPS Authenticated
                </span>
              </div>

              {/* IF RESOLVED: SHOW SIDE-BY-SIDE BEFORE AND AFTER PHOTOS */}
              {isResolved ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* LENS 1: BEFORE PHOTO (Defect) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative rounded-3xl border overflow-hidden shadow-xl group hover:border-rose-500/50 transition duration-300 ${
                      !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised border-slate-800'
                    }`}
                  >
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                      <img
                        src={issue.imageUrl}
                        alt="Initial Defect"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          1. Original Defect (Before)
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                        <div className="bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-slate-300 font-mono block">REPORTED BY</span>
                          <span className="font-bold text-slate-100">{issue.reportedBy} • {issue.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* LENS 2: AFTER PHOTO (Contractor Repair) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative rounded-3xl border overflow-hidden shadow-xl group hover:border-emerald-500/50 transition duration-300 ${
                      !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised border-slate-800'
                    }`}
                  >
                    <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
                      <img
                        src={issue.resolvedPhotoUrl}
                        alt="Contractor Fix"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          2. Ground Fix Execution (After)
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                        <div className="bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                          <span className="text-[10px] text-emerald-300 font-mono block">EXECUTION CONTRACTOR</span>
                          <span className="font-bold text-slate-100">{issue.contractor || 'Municipal Term Maintenance Crew'}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              ) : (
                /* IF NOT RESOLVED: SHOW ONLY BEFORE PHOTO + A VALID WORK-IN-PROGRESS MESSAGE */
                <div className="space-y-4">
                  {/* Single Before Image */}
                  <div className={`relative rounded-3xl border overflow-hidden shadow-xl ${
                    !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised border-slate-800'
                  }`}>
                    <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
                      <img
                        src={issue.imageUrl}
                        alt="Reported Defect Evidence"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-black uppercase tracking-wider bg-rose-600 text-white px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          Reported Defect Evidence
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 text-xs text-white flex items-center justify-between">
                        <div className="bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                          <span className="text-[10px] text-slate-300 font-mono block">REPORTED BY CITIZEN</span>
                          <span className="font-bold text-slate-100">{issue.reportedBy} ({issue.createdAt})</span>
                        </div>

                        <div className="bg-amber-500 text-slate-950 font-black px-3 py-2 rounded-xl backdrop-blur-md text-xs flex items-center gap-1.5 shadow-md">
                          <Clock className="w-3.5 h-3.5 text-slate-950" />
                          <span>{issue.slaRemainingHours}h SLA Deadline Active</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Valid Clear Message: After Image is Pending */}
                  <div className={`rounded-3xl border p-6 shadow-xl relative overflow-hidden ${
                    !isDarkMode
                      ? 'bg-white/90 border-amber-300 shadow-amber-950/5'
                      : 'bg-ink-raised border-amber-500/30'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-lg">
                        <HardHat className="w-6 h-6 animate-bounce" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full border ${
                            !isDarkMode
                              ? 'bg-amber-100 text-amber-950 border-amber-300'
                              : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                          }`}>
                            Repairs Underway
                          </span>
                          <span className={`text-xs font-medium ${!isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>Post-Fix Photo Not Available Yet</span>
                        </div>

                        <h3 className={`text-base font-extrabold ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>
                          Contractor Execution in Progress
                        </h3>

                        <p className={`text-xs mt-1.5 leading-relaxed font-normal ${
                          !isDarkMode ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          The municipal department has assigned <strong className={!isDarkMode ? 'text-slate-900' : 'text-slate-200'}>{issue.contractor}</strong> under the supervision of <strong className={!isDarkMode ? 'text-slate-900' : 'text-slate-200'}>{issue.assignedOfficer}</strong>.
                          The official "After-Fix" photograph and citizen confirmation prompt will unlock here immediately once the crew uploads verified completion proof.
                        </p>

                        <div className={`mt-4 pt-3 border-t flex items-center justify-between flex-wrap gap-2 text-xs ${
                          !isDarkMode ? 'border-amber-100' : 'border-slate-800'
                        }`}>
                          <span className={!isDarkMode ? 'text-slate-700' : 'text-slate-400'}>
                            Current Stage: <strong className={!isDarkMode ? 'text-amber-900 font-black' : 'text-amber-400 font-extrabold'}>Step {issue.timelineStep} of 4 (Work Order Active)</strong>
                          </span>

                          <button
                            onClick={() => {
                              setReminded(true);
                              setTimeout(() => setReminded(false), 3000);
                            }}
                            className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-xl transition border shadow-xs ${
                              !isDarkMode
                                ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600 shadow-amber-600/20'
                                : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>{reminded ? 'Nodal Officer Pinged!' : 'Nudge Ward Nodal Officer'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PROOF-OF-RESOLUTION: resident quorum + human review (only once a fix is claimed) */}
            {isResolved && (
              <ProofOfResolutionPanel issue={issue} isDarkMode={isDarkMode} onAttested={handleConfirmFix} />
            )}

            {/* Community Live Discussion */}
            <div className={`rounded-3xl border p-6 shadow-xl ${
              !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised/90 border-slate-800'
            }`}>
              <h3 className={`font-extrabold text-sm mb-4 flex items-center gap-2 ${
                !isDarkMode ? 'text-slate-900' : 'text-white'
              }`}>
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Community Discussion & Ground Notes ({comments.length})</span>
              </h3>

              <div className="space-y-3 mb-6">
                {comments.map((comment) => (
                  <div key={comment.id} className={`p-4 rounded-2xl border text-xs ${
                    !isDarkMode
                      ? 'bg-slate-50 border-slate-200/80'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-bold flex items-center gap-2 ${
                        !isDarkMode ? 'text-slate-800' : 'text-slate-200'
                      }`}>
                        {comment.author}
                        {comment.isOfficial && (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-black border ${
                            !isDarkMode
                              ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}>
                            Ward Official
                          </span>
                        )}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{comment.time}</span>
                    </div>
                    <p className={!isDarkMode ? 'text-slate-600' : 'text-slate-400'}>{comment.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Provide ground landmark or update..."
                  className={`flex-1 rounded-xl px-4 py-3 text-xs border focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                    !isDarkMode
                      ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                      : 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-amber-500'
                  }`}
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl text-xs font-black transition flex items-center gap-1.5 shrink-0 shadow-md shadow-orange-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Actions, Timeline & Authority */}
          <div className="space-y-6">

            {/* Civic Memory: history of the asset this ticket sits on */}
            <LocationMemoryCard issue={issue} isDarkMode={isDarkMode} />

            {/* Action Bar (Upvote & Share) */}
            <div className={`rounded-3xl border p-5 shadow-xl space-y-3 ${
              !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised/90 border-slate-800'
            }`}>
              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={handleUpvote}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs transition border shadow-md ${
                  hasUpvoted
                    ? 'bg-orange-600 hover:bg-orange-700 border-amber-500 text-white shadow-orange-500/30'
                    : !isDarkMode
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-600 hover:text-white'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-current' : ''}`} />
                <span>I Face This Ground Issue ({upvotes})</span>
              </motion.button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Ticket link copied to clipboard!');
                }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-xs border transition ${
                  !isDarkMode
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                    : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>Share Grievance Dossier</span>
              </button>
            </div>

            {/* Official Audit Timeline */}
            <div className={`rounded-3xl border p-6 shadow-xl ${
              !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised/90 border-slate-800'
            }`}>
              <h3 className={`font-extrabold text-sm mb-5 flex items-center gap-2 ${
                !isDarkMode ? 'text-slate-900' : 'text-white'
              }`}>
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Redressal Audit Trail</span>
              </h3>

              <div className={`relative pl-6 space-y-6 border-l-2 ml-2 ${
                !isDarkMode ? 'border-amber-200' : 'border-slate-800'
              }`}>
                {issue.timeline?.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20 shadow-md" />
                    <div>
                      <div className={`text-xs font-black ${!isDarkMode ? 'text-slate-800' : 'text-white'}`}>{step.step}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{step.date}</div>
                      <p className={`text-xs mt-1 ${!isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>{step.note}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md mt-1.5 inline-block border ${
                        !isDarkMode
                          ? 'text-amber-950 bg-amber-100 border-amber-300'
                          : 'text-amber-300 bg-amber-950/60 border-amber-800/60'
                      }`}>
                        Signed: {step.officer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department & Officer Details */}
            <div className={`rounded-3xl border p-6 shadow-xl space-y-4 ${
              !isDarkMode ? 'bg-white border-amber-200/90 shadow-amber-950/5' : 'bg-ink-raised/90 border-slate-800'
            }`}>
              <h3 className={`font-extrabold text-sm flex items-center gap-2 ${
                !isDarkMode ? 'text-slate-900' : 'text-white'
              }`}>
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Responsible Authority</span>
              </h3>

              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block text-[11px]">Department</span>
                  <span className={`font-bold text-xs sm:text-sm ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>{issue.department}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[11px]">Assigned Engineer</span>
                  <span className={`font-bold ${!isDarkMode ? 'text-slate-800' : 'text-slate-200'}`}>{issue.assignedOfficer || 'Junior Engineer (Civil)'}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[11px]">Executing Contractor</span>
                  <span className={`font-bold ${!isDarkMode ? 'text-slate-800' : 'text-slate-200'}`}>{issue.contractor || 'Ward Term Maintenance Contractor'}</span>
                </div>

                <div className={`pt-2 border-t ${!isDarkMode ? 'border-amber-100' : 'border-slate-800'}`}>
                  <span className="text-slate-400 font-medium block text-[11px]">Ward Helpline</span>
                  <span className={`font-mono font-bold ${!isDarkMode ? 'text-amber-700' : 'text-amber-400'}`}>011-2338-9411</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* CIVIC KARMA CELEBRATION MODAL WITH CONFETTI */}
      <AnimatePresence>
        {showKarmaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className={`rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative border ${
                !isDarkMode
                  ? 'bg-white border-amber-200 shadow-amber-950/20'
                  : 'bg-ink-raised border-emerald-500/40 glow-emerald'
              }`}
            >
              <div className="w-20 h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/30 animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <span className={`text-[11px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full border ${
                !isDarkMode
                  ? 'text-amber-800 bg-amber-100 border-amber-300'
                  : 'text-amber-300 bg-amber-500/20 border-amber-500/30'
              }`}>
                Citizen Karma Unlocked
              </span>

              <h3 className={`text-2xl font-black mt-3 mb-1 ${!isDarkMode ? 'text-slate-900' : 'text-white'}`}>
                +50 Civic Karma
              </h3>

              <p className={`text-xs mb-6 leading-relaxed font-normal ${
                !isDarkMode ? 'text-slate-600' : 'text-slate-300'
              }`}>
                You verified the ground repair. You are now promoted to <span className="font-bold text-amber-600">Ward Guardian (Tier 1)</span> on the city leaderboard!
              </p>

              <button
                onClick={() => setShowKarmaModal(false)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-3.5 rounded-xl text-xs transition shadow-lg shadow-orange-600/30"
              >
                Continue Exploring Feed
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
