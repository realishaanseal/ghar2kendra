import React, { useState, useEffect } from 'react';
import { Link } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HardHat,
  Search,
  Filter,
  ArrowUpRight,
  UploadCloud,
  Send,
  RefreshCw,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Flame,
  X,
  FileCheck2,
  Award,
  Landmark,
  Trees,
  MapPin,
  Compass,
  Check
} from 'lucide-react';
import { CivicAPI, getClockOffsetHours } from '../api/supabaseClient';
import { useAuth } from '../context/AuthContext';
import ProofReviewQueue from '../components/civic/ProofReviewQueue';
import { clearProof } from '../api/proofStore';

const PRESET_FIX_PHOTOS = [
  {
    label: '🛣️ Fresh Bitumen Asphalt Patch',
    url: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80',
    description: 'Fresh hot-mix asphalt laid, compacted with 10-ton road roller, smooth surface restored.',
  },
  {
    label: '⚡ Secured Transformer & Cabling',
    url: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=800&auto=format&fit=crop&q=80',
    description: 'High-voltage cable insulated, re-routed into tamper-proof junction box, danger warning posted.',
  },
  {
    label: '💧 Repaired Pipeline & Clean Roadway',
    url: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80',
    description: '300mm ductile iron pipe sleeve clamped, pressure leak tested, carriageway cleared.',
  },
  {
    label: '🗑️ Cleared & Sanitized Waste Bin',
    url: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80',
    description: 'Compactor truck cleared 4.5 MT waste, chlorinated disinfectant sprayed, fresh bin installed.',
  },
];

const MUNICIPALITIES_PRESETS = [
  { id: 'mcd', name: 'Municipal Corporation of Delhi (MCD South Zone)', state: 'Delhi (NCT)', division: 'South Zone' },
  { id: 'bmc', name: 'Brihanmumbai Municipal Corporation (BMC)', state: 'Maharashtra', division: 'Ward K-West' },
  { id: 'bbmp', name: 'Bruhat Bengaluru Mahanagara Palike (BBMP)', state: 'Karnataka', division: 'East Zone' },
  { id: 'ghmc', name: 'Greater Hyderabad Municipal Corporation (GHMC)', state: 'Telangana', division: 'Central Zone' },
  { id: 'kmc', name: 'Kolkata Municipal Corporation (KMC)', state: 'West Bengal', division: 'Borough 7' },
  { id: 'pmc', name: 'Pune Municipal Corporation (PMC)', state: 'Maharashtra', division: 'Kothrud Division' },
];

const PANCHAYATS_PRESETS = [
  { id: 'ramnagar', name: 'Ramnagar Gram Panchayat', block: 'Varanasi Rural Block', district: 'Varanasi', state: 'Uttar Pradesh' },
  { id: 'shivaji', name: 'Shivaji Nagar Gram Panchayat', block: 'Haveli Block', district: 'Pune', state: 'Maharashtra' },
  { id: 'devanahalli', name: 'Devanahalli Rural Gram Panchayat', block: 'Devanahalli', district: 'Bengaluru Rural', state: 'Karnataka' },
  { id: 'sonarpur', name: 'Sonarpur Gram Panchayat', block: 'Rajpur Sonarpur', district: 'South 24 Parganas', state: 'West Bengal' },
  { id: 'mansarovar', name: 'Gandhinagar Gram Panchayat', block: 'Mansarovar Rural', district: 'Jaipur', state: 'Rajasthan' },
];

const CONTRACTORS_URBAN = [
  { name: 'Apex Infra Roadworks Pvt Ltd', dept: 'Public Works Dept (PWD)' },
  { name: 'Emergency High-Tension Grid Squad', dept: 'DISCOM / Power Grid' },
  { name: 'Delhi Jal Board Rapid Response Cell', dept: 'Delhi Jal Board' },
  { name: 'EcoClean Municipal Waste Concessionaire', dept: 'Municipal Solid Waste' },
  { name: 'South Delhi Infrastructure & Paving', dept: 'Public Works Dept (PWD)' },
];

const CONTRACTORS_RURAL = [
  { name: 'PMGSY Rural Road Contracting Unit 3', dept: 'PMGSY Rural Roads' },
  { name: 'Jal Jeevan Mission Village Water Cell', dept: 'Har Ghar Jal Water Supply' },
  { name: 'Gram Panchayat Swachhata Shramik Dal', dept: 'Gram Swachhata & Sanitation' },
  { name: 'State Rural Solar Lighting Agency', dept: 'Rural Electrification & Solar' },
  { name: 'Zilla Parishad Construction Wing', dept: 'Panchayat Infrastructure' },
];

const OFFICIALS_URBAN = [
  'Er. Rajesh Varma (JE - PWD Div 2)',
  'Er. K. Natarajan (Grid Superintendent)',
  'Er. Manish Duggal (Jal Board Sub-Div)',
  'Chief Sanitary Inspector S. Chawla',
  'Er. R. K. Singhal (Drainage Division)',
];

const OFFICIALS_RURAL = [
  'Smt. Gayatri Devi (Gram Panchayat Pradhan / Sarpanch)',
  'Shri Rameshwar Yadav (Panchayat Sachiv / Secretary)',
  'Er. Dilip Kumar (Assistant Engineer - PMGSY Rural Roads)',
  'Smt. Anita Patel (Jal Sahiyya - Drinking Water Cell)',
  'Shri Virendra Singh (Block Development Officer - BDO)',
];

export default function AdminDashboard({ isDarkMode }) {
  const { currentUser } = useAuth();

  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clockOffset, setClockOffset] = useState(0);

  // Active Jurisdiction Tier & Unit
  const [jurisdictionTier, setJurisdictionTier] = useState(() => {
    return currentUser?.jurisdictionType || 'municipality';
  });

  const [activeMunicipality, setActiveMunicipality] = useState(
    currentUser?.jurisdictionName || MUNICIPALITIES_PRESETS[0].name
  );

  const [activePanchayat, setActivePanchayat] = useState(
    PANCHAYATS_PRESETS[0]
  );

  // Active contractor & official lists based on tier
  const activeContractors = jurisdictionTier === 'panchayat' ? CONTRACTORS_RURAL : CONTRACTORS_URBAN;
  const activeOfficials = jurisdictionTier === 'panchayat' ? OFFICIALS_RURAL : OFFICIALS_URBAN;

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');

  // Modals state
  const [dispatchModalIssue, setDispatchModalIssue] = useState(null);
  const [resolveModalIssue, setResolveModalIssue] = useState(null);

  // Form states for Dispatch Modal
  const [selectedContractor, setSelectedContractor] = useState(activeContractors[0].name);
  const [selectedOfficer, setSelectedOfficer] = useState(activeOfficials[0]);
  const [dispatchSlaHours, setDispatchSlaHours] = useState(24);
  const [dispatchNotes, setDispatchNotes] = useState('');

  // Form states for Resolve Modal
  const [resolvePhotoUrl, setResolvePhotoUrl] = useState(PRESET_FIX_PHOTOS[0].url);
  const [resolveProofNotes, setResolveProofNotes] = useState(PRESET_FIX_PHOTOS[0].description);
  const [contractorInvoice, setContractorInvoice] = useState(`WO-2026-${Math.floor(1000 + Math.random() * 9000)}`);

  // Toast alert
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadIssues = async () => {
    try {
      setIsLoading(true);
      const data = await CivicAPI.getIssues();
      setIssues(data);
      setClockOffset(getClockOffsetHours());
    } catch (err) {
      console.error('Error fetching admin issues', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();

    const handleUpdate = () => loadIssues();
    const handleClock = () => loadIssues();

    window.addEventListener('civic-issues-updated', handleUpdate);
    window.addEventListener('civic-clock-advanced', handleClock);

    return () => {
      window.removeEventListener('civic-issues-updated', handleUpdate);
      window.removeEventListener('civic-clock-advanced', handleClock);
    };
  }, []);

  // Update selected contractor and officer when tier changes
  useEffect(() => {
    setSelectedContractor(activeContractors[0].name);
    setSelectedOfficer(activeOfficials[0]);
  }, [jurisdictionTier]);

  // Demo Clock Fast-Forward Actions
  const handleAdvanceClock = (hours) => {
    const newOffset = CivicAPI.simulateAdvanceClock(hours);
    setClockOffset(newOffset);
    loadIssues();
    showToast(`⏱️ Advanced simulation clock by +${hours} hours! SLA timers recalculated.`);
  };

  const handleResetClock = () => {
    CivicAPI.resetClock();
    setClockOffset(0);
    loadIssues();
    showToast('🔄 Simulation clock reset to Real-Time.');
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all issues and work orders back to default seed data?')) {
      CivicAPI.resetToDefault();
      loadIssues();
      showToast('✨ Reset to default municipal seed dataset!');
    }
  };

  // Submit Work Order Dispatch
  const handleConfirmDispatch = async (e) => {
    e.preventDefault();
    if (!dispatchModalIssue) return;

    await CivicAPI.assignWorkOrder(dispatchModalIssue.id, {
      contractor: selectedContractor,
      assignedOfficer: selectedOfficer,
      slaHours: Number(dispatchSlaHours),
      workOrderNote: dispatchNotes || `Dispatched to ${selectedContractor} for urgent corrective action.`,
    });

    showToast(`🛠️ Work Order dispatched to ${selectedContractor} for ${dispatchModalIssue.id}!`);
    setDispatchModalIssue(null);
    setDispatchNotes('');
    loadIssues();
  };

  // Submit Issue Resolution with Contractor Proof
  const handleConfirmResolution = async (e) => {
    e.preventDefault();
    if (!resolveModalIssue) return;

    // A new fix claim starts a fresh Proof-of-Resolution round.
    clearProof(resolveModalIssue.id);
    await CivicAPI.resolveIssueWithProof(resolveModalIssue.id, {
      resolvedPhotoUrl: resolvePhotoUrl,
      resolutionProof: resolveProofNotes,
      contractorInvoice: contractorInvoice,
      officerName: selectedOfficer || resolveModalIssue.assignedOfficer || 'Ward Supervisor',
    });

    showToast(`✅ ${resolveModalIssue.id} marked as RESOLVED! Awaiting resident attestations and review.`);
    setResolveModalIssue(null);
    loadIssues();
  };

  // Filter computation
  const filteredIssues = issues.filter((issue) => {
    if (statusFilter !== 'all') {
      if (statusFilter === 'submitted' && issue.status !== 'submitted') return false;
      if (statusFilter === 'in_progress' && issue.status !== 'in_progress') return false;
      if (statusFilter === 'resolved' && (issue.status !== 'resolved' && issue.status !== 'verified')) return false;
    }
    if (departmentFilter !== 'all') {
      if (departmentFilter === 'roads' && issue.category !== 'roads') return false;
      if (departmentFilter === 'electricity' && issue.category !== 'electricity') return false;
      if (departmentFilter === 'water' && issue.category !== 'water') return false;
      if (departmentFilter === 'waste' && issue.category !== 'waste') return false;
      if (departmentFilter === 'safety' && issue.category !== 'safety') return false;
    }
    if (severityFilter !== 'all' && issue.severity !== severityFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = issue.id?.toLowerCase().includes(q);
      const matchTitle = issue.title?.toLowerCase().includes(q);
      const matchAddress = issue.address?.toLowerCase().includes(q);
      const matchDept = issue.department?.toLowerCase().includes(q);
      if (!matchId && !matchTitle && !matchAddress && !matchDept) return false;
    }
    return true;
  });

  // KPI Calculations
  const totalCount = issues.length;
  const inProgressCount = issues.filter((i) => i.status === 'in_progress').length;
  const resolvedCount = issues.filter((i) => i.status === 'resolved' || i.status === 'verified').length;
  const breachedCount = issues.filter((i) => i.isBreached && i.status !== 'resolved' && i.status !== 'verified').length;

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'text-slate-100' : 'text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-7">

        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-20 right-6 z-50 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/40 text-sm font-bold backdrop-blur-md"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= JURISDICTION SELECTION & TIER COMMAND BAR ================= */}
        <div className={`p-4 sm:p-5 rounded-3xl border shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-slate-900/90 border-slate-800'
            : 'bg-white border-amber-200/90 shadow-amber-950/5'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

            {/* Left: Jurisdiction Type Pill Toggle (Urban Municipality vs Rural Panchayat) */}
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-black uppercase tracking-wider mr-1 hidden sm:inline ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Governance Tier:
              </span>

              <div className={`p-1 rounded-2xl border flex items-center shadow-inner ${
                isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-amber-50/70 border-amber-200/80'
              }`}>
                <button
                  type="button"
                  onClick={() => setJurisdictionTier('municipality')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                    jurisdictionTier === 'municipality'
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/25'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Urban Municipality (Nagar Nigam)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setJurisdictionTier('panchayat')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                    jurisdictionTier === 'panchayat'
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md shadow-emerald-600/25'
                      : isDarkMode
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Trees className="w-3.5 h-3.5" />
                  <span>Rural Gram Panchayat (Gram Sabha)</span>
                </button>
              </div>
            </div>

            {/* Right: Specific Corporation or Panchayat Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400">Active Body:</span>

              {jurisdictionTier === 'municipality' ? (
                <select
                  value={activeMunicipality}
                  onChange={(e) => setActiveMunicipality(e.target.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-hidden transition ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white'
                      : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  {MUNICIPALITIES_PRESETS.map((m) => (
                    <option key={m.id} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  value={activePanchayat.name}
                  onChange={(e) => {
                    const found = PANCHAYATS_PRESETS.find((p) => p.name === e.target.value);
                    if (found) setActivePanchayat(found);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-hidden transition ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-emerald-400'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  }`}
                >
                  {PANCHAYATS_PRESETS.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.district}, {p.state})
                    </option>
                  ))}
                </select>
              )}

              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                jurisdictionTier === 'panchayat'
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
              }`}>
                {jurisdictionTier === 'panchayat' ? 'VILLAGE CADRE' : 'URBAN CADRE'}
              </span>
            </div>

          </div>
        </div>

        {/* ================= TOP COMMAND HEADER & FAST-FORWARD DEMO CLOCK BAR ================= */}
        <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 relative overflow-hidden shadow-xl ${
          isDarkMode
            ? 'bg-gradient-to-br from-ink-raised via-ink to-ink-raised border-slate-800'
            : 'bg-gradient-to-br from-white/50 to-orange-50/40 border-amber-200/80 shadow-orange-500/5'
        }`}>
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D9982E_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-black border ${
                  jurisdictionTier === 'panchayat'
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {jurisdictionTier === 'panchayat' ? 'GRAM PANCHAYAT SEVA KENDRA' : 'OFFICIAL MUNICIPAL PORTAL'}
                </span>

                <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  {jurisdictionTier === 'panchayat'
                    ? `📍 ${activePanchayat.name} • ${activePanchayat.block}, ${activePanchayat.district}`
                    : `📍 ${activeMunicipality}`}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
                <span>
                  {jurisdictionTier === 'panchayat'
                    ? 'Panchayat Jan Suvidha & Infrastructure Command'
                    : 'Municipal Grievance Command Center'}
                </span>
                <span className="text-xl sm:text-2xl">{jurisdictionTier === 'panchayat' ? '🌾' : '🏛️'}</span>
              </h1>
              <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {jurisdictionTier === 'panchayat'
                  ? 'Triaging rural civic defects under Jal Jeevan Mission, PMGSY Village Roads, Swachh Bharat Gramin, and Gram Panchayat maintenance funds.'
                  : 'Triaging high-priority civic hazards, dispatching contractor work orders, and validating completion proof under Delhi & Smart Cities Citizen Charter (48-Hour SLA).'}
              </p>
            </div>

            {/* DEMO FAST-FORWARD CLOCK PANEL (HACKATHON / EVALUATOR SHOWCASE) */}
            <div className={`p-4 rounded-2xl border flex flex-col gap-2.5 backdrop-blur-md shrink-0 ${
              isDarkMode
                ? 'bg-slate-900/90 border-amber-500/30 shadow-lg shadow-amber-500/5'
                : 'bg-white/90 border-amber-300 shadow-md'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 animate-spin-slow" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-500">
                    Judge / Demo Clock Simulator
                  </span>
                </div>
                {clockOffset > 0 && (
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30 animate-pulse">
                    +{clockOffset}h Advanced
                  </span>
                )}
              </div>

              <p className={`text-[11px] leading-tight ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Fast-forward clock to simulate SLA countdowns, breaches, and auto-escalations:
              </p>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => handleAdvanceClock(12)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${
                    isDarkMode
                      ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border-amber-500/30'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  }`}
                  title="Simulate 12 Hours Passage"
                >
                  <span>+12h</span>
                </button>
                <button
                  onClick={() => handleAdvanceClock(24)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${
                    isDarkMode
                      ? 'bg-orange-500/15 hover:bg-orange-500/25 text-orange-400 border-orange-500/30'
                      : 'bg-orange-100 hover:bg-orange-200 text-orange-950 border-orange-300'
                  }`}
                  title="Simulate 24 Hours Passage"
                >
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>+24h</span>
                </button>
                <button
                  onClick={() => handleAdvanceClock(48)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-black transition flex items-center gap-1 active:scale-95 ${
                    isDarkMode
                      ? 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border-rose-500/30'
                      : 'bg-rose-100 hover:bg-rose-200 text-rose-950 border-rose-300'
                  }`}
                  title="Simulate 48 Hours Passage (Trigger SLA Breach)"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span>+48h (Breach)</span>
                </button>
                {clockOffset > 0 && (
                  <button
                    onClick={handleResetClock}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
                      isDarkMode
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    }`}
                    title="Reset to Real-Time"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* SLA Breach Alert Banner if any ticket is breached */}
          {breachedCount > 0 && (
            <div className={`mt-4 p-3 rounded-2xl border text-xs font-black flex items-center justify-between gap-3 animate-pulse ${
              isDarkMode
                ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                : 'bg-rose-100 border-rose-400 text-rose-950'
            }`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>
                  <strong>CRITICAL SLA BREACH:</strong> {breachedCount} ticket(s) have exceeded the mandatory 48-hour redressal deadline! Penalties applied and auto-escalated to Chief Municipal Commissioner.
                </span>
              </div>
              <button
                onClick={() => {
                  setStatusFilter('in_progress');
                  setSeverityFilter('critical');
                }}
                className="underline whitespace-nowrap hover:opacity-80"
              >
                Inspect Breached Tickets &rarr;
              </button>
            </div>
          )}
        </div>

        {/* ================= KPI METRIC CARDS ================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Queue */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            isDarkMode ? 'bg-ink border-slate-800' : 'bg-white border-amber-200/70 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>{jurisdictionTier === 'panchayat' ? 'VILLAGE TICKETS' : 'TOTAL LOGGED'}</span>
              <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">📋</span>
            </div>
            <div className="text-3xl font-black">{totalCount}</div>
            <div className="text-[11px] font-semibold text-emerald-500 mt-1 flex items-center gap-1">
              <span>● 100% Geotagged & AI Classified</span>
            </div>
          </div>

          {/* Card 2: Active Work Orders */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            isDarkMode ? 'bg-ink border-slate-800' : 'bg-white border-amber-200/70 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>CREWS DISPATCHED</span>
              <span className="p-2 rounded-xl bg-orange-500/10 text-orange-500">🛠️</span>
            </div>
            <div className="text-3xl font-black text-orange-500">{inProgressCount}</div>
            <div className={`text-[11px] font-semibold mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {jurisdictionTier === 'panchayat' ? 'PMGSY & Water Shramiks on site' : 'Road & Pipeline Crews on site'}
            </div>
          </div>

          {/* Card 3: SLA Breached / At Risk */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            isDarkMode ? 'bg-ink border-slate-800' : 'bg-white border-amber-200/70 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>SLA BREACHED / AT RISK</span>
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500">⚠️</span>
            </div>
            <div className={`text-3xl font-black ${breachedCount > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`}>
              {breachedCount}
            </div>
            <div className="text-[11px] font-semibold text-rose-500 mt-1">
              {breachedCount > 0 ? 'Urgent escalation needed' : '0 Breaches in current cycle'}
            </div>
          </div>

          {/* Card 4: Verified Resolutions */}
          <div className={`p-5 rounded-2xl border transition-all duration-200 ${
            isDarkMode ? 'bg-ink border-slate-800' : 'bg-white border-amber-200/70 shadow-sm'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>RESOLVED & VERIFIED</span>
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">✨</span>
            </div>
            <div className="text-3xl font-black text-emerald-500">{resolvedCount}</div>
            <div className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>96.2% Citizen Approval</span>
            </div>
          </div>
        </div>

        {/* ================= PROOF-OF-RESOLUTION REVIEW QUEUE ================= */}
        <ProofReviewQueue issues={issues} isDarkMode={isDarkMode} />

        {/* ================= TRIAGE QUEUE & ACTIONS TABLE ================= */}
        <div className={`rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 ${
          isDarkMode ? 'bg-ink border-slate-800' : 'bg-white border-amber-200/70'
        }`}>
          {/* Table Header & Controls Bar */}
          <div className={`p-5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? 'border-slate-800/80 bg-slate-900/40' : 'border-amber-100 bg-amber-50/30'
          }`}>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
                <span>{jurisdictionTier === 'panchayat' ? 'Gram Panchayat Grievance Queue' : 'Ward Triage & Dispatch Queue'}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-amber-100 text-amber-900'
                }`}>
                  {filteredIssues.length} Tickets
                </span>
              </h2>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleResetAllData}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                  isDarkMode
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-400'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
                title="Restore default mock issues"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Seed Data</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className={`p-4 border-b grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${
            isDarkMode ? 'border-slate-800 bg-slate-900/20' : 'border-amber-100 bg-white'
          }`}>
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket, ward, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs font-medium border outline-hidden transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 focus:border-amber-500 text-white placeholder-slate-500'
                    : 'bg-white border-slate-200 focus:border-amber-500 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="all">All Statuses (Pending, Dispatched, Resolved)</option>
                <option value="submitted">New Logged (Needs Work Order)</option>
                <option value="in_progress">Dispatched (Under Repair)</option>
                <option value="resolved">Resolved & Ground Verified</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="all">All Sectors / Departments</option>
                <option value="roads">Roads (PWD / PMGSY)</option>
                <option value="electricity">Electricity (Power & Solar Grid)</option>
                <option value="water">Water (Jal Board / Har Ghar Jal)</option>
                <option value="waste">Solid Waste & Sanitation</option>
                <option value="safety">Public Safety Hazards</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden transition ${
                  isDarkMode
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="all">All Priority Levels</option>
                <option value="critical">🚨 Critical Severity Only</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="low">Low Severity</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`text-[11px] uppercase tracking-wider font-black border-b ${
                  isDarkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-amber-50/60 border-amber-200/50 text-slate-500'
                }`}>
                  <th className="py-3 px-4">Ticket & Visual</th>
                  <th className="py-3 px-4">Issue Description & Locality</th>
                  <th className="py-3 px-4">Severity & Sector</th>
                  <th className="py-3 px-4">SLA Countdown</th>
                  <th className="py-3 px-4">Work Crew Status</th>
                  <th className="py-3 px-4 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-xs">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin text-amber-500" />
                        <span>Loading live municipal / panchayat queue...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredIssues.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500">
                      No tickets match the selected filters. Try broadening your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredIssues.map((issue) => {
                    const isBreached = issue.isBreached && issue.status !== 'resolved' && issue.status !== 'verified';
                    const isResolved = issue.status === 'resolved' || issue.status === 'verified';
                    const isSubmitted = issue.status === 'submitted';
                    const isInProgress = issue.status === 'in_progress';

                    return (
                      <tr
                        key={issue.id}
                        className={`transition hover:bg-amber-500/5 ${
                          isBreached
                            ? 'bg-rose-500/5'
                            : isDarkMode
                            ? 'hover:bg-slate-800/40'
                            : 'hover:bg-amber-50/50'
                        }`}
                      >
                        {/* 1. Ticket ID & Thumbnail */}
                        <td className="py-4 px-4 align-top">
                          <div className="flex items-start gap-3">
                            <div className="relative group w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/60 shadow-xs">
                              <img
                                src={issue.imageUrl}
                                alt="Civic Defect"
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[10px]">
                                Zoom
                              </div>
                            </div>
                            <div>
                              <div className="font-mono font-black text-amber-500 flex items-center gap-1">
                                <span>{issue.id}</span>
                              </div>
                              <span className={`text-[10px] block mt-0.5 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {issue.createdAt}
                              </span>
                              <span className={`text-[10px] inline-block mt-1 font-bold px-1.5 py-0.5 rounded ${
                                isDarkMode ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {issue.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* 2. Title & Locality */}
                        <td className="py-4 px-4 align-top max-w-xs">
                          <p className="font-bold line-clamp-2 leading-snug">
                            {issue.title}
                          </p>
                          <p className={`text-[11px] mt-1 line-clamp-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            📍 {issue.address}
                          </p>
                          <p className={`text-[10px] font-bold mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-900'}`}>
                            {issue.ward}
                          </p>
                        </td>

                        {/* 3. Severity & Department */}
                        <td className="py-4 px-4 align-top">
                          <div className="space-y-1.5">
                            {issue.severity === 'critical' ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30">
                                <span className="animate-ping w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
                                CRITICAL
                              </span>
                            ) : issue.severity === 'high' ? (
                              <span className="inline-flex text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-500 border border-orange-500/30">
                                HIGH
                              </span>
                            ) : (
                              <span className="inline-flex text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-400 border border-slate-500/30">
                                {issue.severity}
                              </span>
                            )}
                            <div className={`text-[10px] font-semibold leading-tight line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                              {issue.department}
                            </div>
                          </div>
                        </td>

                        {/* 4. SLA Countdown */}
                        <td className="py-4 px-4 align-top">
                          {isResolved ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>SLA MET (Closed)</span>
                            </span>
                          ) : isBreached ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-500 border border-rose-500/40 animate-pulse">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span>BREACHED ({issue.slaRemainingHours}h)</span>
                              </span>
                              <span className="block text-[10px] text-rose-400 font-bold">
                                Level 2 Escalated
                              </span>
                            </div>
                          ) : issue.slaRemainingHours <= 12 ? (
                            <div className="space-y-1">
                              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-500 border border-amber-500/30">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{issue.slaRemainingHours}h Left (At Risk)</span>
                              </span>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{issue.slaRemainingHours}h Left</span>
                            </span>
                          )}
                        </td>

                        {/* 5. Work Crew Status */}
                        <td className="py-4 px-4 align-top">
                          {isResolved ? (
                            <div>
                              <div className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                                <FileCheck2 className="w-3.5 h-3.5" />
                                <span>Work Verified</span>
                              </div>
                              <p className={`text-[10px] truncate max-w-[160px] ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                {issue.contractor}
                              </p>
                            </div>
                          ) : isInProgress ? (
                            <div>
                              <div className="text-[11px] font-bold text-orange-500 flex items-center gap-1">
                                <HardHat className="w-3.5 h-3.5" />
                                <span>Crew on Site</span>
                              </div>
                              <p className={`text-[10px] font-semibold truncate max-w-[160px] ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                {issue.contractor}
                              </p>
                              <p className={`text-[9px] truncate max-w-[160px] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                {issue.assignedOfficer}
                              </p>
                            </div>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              Pending Allocation
                            </span>
                          )}
                        </td>

                        {/* 6. Municipal / Panchayat Actions */}
                        <td className="py-4 px-4 align-top text-right">
                          <div className="flex items-center justify-end gap-2 flex-wrap">

                            {/* IF SUBMITTED: Assign Crew */}
                            {isSubmitted && (
                              <button
                                onClick={() => {
                                  setDispatchModalIssue(issue);
                                  setSelectedContractor(activeContractors[0].name);
                                  setSelectedOfficer(activeOfficials[0]);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md shadow-orange-500/20 flex items-center gap-1 transition active:scale-95"
                              >
                                <HardHat className="w-3.5 h-3.5" />
                                <span>Assign Crew</span>
                              </button>
                            )}

                            {/* IF IN PROGRESS: Mark Resolved & Upload Fix Photo */}
                            {isInProgress && (
                              <button
                                onClick={() => {
                                  setResolveModalIssue(issue);
                                  if (issue.category === 'roads') {
                                    setResolvePhotoUrl(PRESET_FIX_PHOTOS[0].url);
                                    setResolveProofNotes(PRESET_FIX_PHOTOS[0].description);
                                  } else if (issue.category === 'electricity') {
                                    setResolvePhotoUrl(PRESET_FIX_PHOTOS[1].url);
                                    setResolveProofNotes(PRESET_FIX_PHOTOS[1].description);
                                  } else if (issue.category === 'water') {
                                    setResolvePhotoUrl(PRESET_FIX_PHOTOS[2].url);
                                    setResolveProofNotes(PRESET_FIX_PHOTOS[2].description);
                                  } else {
                                    setResolvePhotoUrl(PRESET_FIX_PHOTOS[3].url);
                                    setResolveProofNotes(PRESET_FIX_PHOTOS[3].description);
                                  }
                                }}
                                className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md shadow-emerald-500/20 flex items-center gap-1 transition active:scale-95"
                              >
                                <UploadCloud className="w-3.5 h-3.5" />
                                <span>Upload Fix Photo</span>
                              </button>
                            )}

                            {/* Public Citizen Detail Link */}
                            <Link
                              to={`/ticket/${issue.id}`}
                              className={`p-1.5 rounded-xl border transition ${
                                isDarkMode
                                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                                  : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                              }`}
                              title="Inspect Public Citizen Ground Reality Page"
                            >
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ================= MODAL 1: WORK ORDER DISPATCH ================= */}
      <AnimatePresence>
        {dispatchModalIssue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 overflow-hidden ${
                isDarkMode ? 'bg-ink-raised border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-white">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black">
                      {jurisdictionTier === 'panchayat' ? 'Issue Gram Panchayat Work Order' : 'Issue Municipal Work Order'}
                    </h3>
                    <p className="text-xs text-amber-500 font-mono font-bold">{dispatchModalIssue.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setDispatchModalIssue(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleConfirmDispatch} className="space-y-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Issue Overview</label>
                  <div className={`p-3 rounded-xl border text-xs ${
                    isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <p className="font-bold">{dispatchModalIssue.title}</p>
                    <p className="text-slate-400 mt-1">📍 {dispatchModalIssue.address}</p>
                  </div>
                </div>

                {/* Contractor Dropdown */}
                <div>
                  <label className="text-xs font-bold block mb-1">
                    {jurisdictionTier === 'panchayat' ? 'Empanelled Panchayat Contractor / Shramik Cell' : 'Empanelled Municipal Contractor / Repair Unit'}
                  </label>
                  <select
                    value={selectedContractor}
                    onChange={(e) => setSelectedContractor(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold border outline-hidden ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {activeContractors.map((c, i) => (
                      <option key={i} value={c.name}>
                        {c.name} — ({c.dept})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nodal Officer Dropdown */}
                <div>
                  <label className="text-xs font-bold block mb-1">
                    {jurisdictionTier === 'panchayat' ? 'Supervising Gram Pradhan / Panchayat Secretary' : 'Assigned Junior Engineer / Nodal Officer'}
                  </label>
                  <select
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold border outline-hidden ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    {activeOfficials.map((eng, i) => (
                      <option key={i} value={eng}>
                        {eng}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target SLA Deadline */}
                <div>
                  <label className="text-xs font-bold block mb-1">SLA Resolution Target Deadline</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[12, 24, 48, 72].map((hrs) => (
                      <button
                        type="button"
                        key={hrs}
                        onClick={() => setDispatchSlaHours(hrs)}
                        className={`py-2 rounded-xl text-xs font-black border transition ${
                          dispatchSlaHours === hrs
                            ? 'bg-amber-500 border-amber-500 text-white shadow-md shadow-orange-500/30'
                            : isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {hrs} Hours
                      </button>
                    ))}
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <label className="text-xs font-bold block mb-1">Field Instructions / Work Dispatch Directive</label>
                  <textarea
                    rows={2}
                    value={dispatchNotes}
                    onChange={(e) => setDispatchNotes(e.target.value)}
                    placeholder="e.g. Deploy cold-mix asphalt truck or repair village handpump sleeve, cordon off hazard."
                    className={`w-full p-2.5 rounded-xl text-xs border outline-hidden ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDispatchModalIssue(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-orange-500/25 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Dispatch Order</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL 2: RESOLUTION & CONTRACTOR AFTER-FIX PROOF ================= */}
      <AnimatePresence>
        {resolveModalIssue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className={`w-full max-w-xl rounded-3xl border shadow-2xl p-6 overflow-hidden ${
                isDarkMode ? 'bg-ink-raised border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/50 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 flex items-center justify-center text-white">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black">Upload Contractor Fix Evidence</h3>
                    <p className="text-xs text-emerald-400 font-mono font-bold">{resolveModalIssue.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setResolveModalIssue(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleConfirmResolution} className="space-y-4">
                {/* Visual Before Preview */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-rose-400 block mb-1">
                      Reported Defect (Before)
                    </label>
                    <div className="h-28 rounded-xl overflow-hidden border border-rose-500/30 relative">
                      <img
                        src={resolveModalIssue.imageUrl}
                        alt="Before defect"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Defect Evidence
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-emerald-400 block mb-1">
                      Contractor Fix (After Preview)
                    </label>
                    <div className="h-28 rounded-xl overflow-hidden border border-emerald-500/30 relative">
                      <img
                        src={resolvePhotoUrl}
                        alt="After fix"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        Repaired State
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Photo Presets for Demo */}
                <div>
                  <label className="text-xs font-bold block mb-1">
                    Select Official Photographic Proof
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESET_FIX_PHOTOS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setResolvePhotoUrl(preset.url);
                          setResolveProofNotes(preset.description);
                        }}
                        className={`p-2 rounded-xl text-left border text-xs font-bold transition flex items-center gap-1.5 ${
                          resolvePhotoUrl === preset.url
                            ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                            : isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-slate-400'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="truncate">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Photo URL or File input */}
                <div>
                  <label className="text-xs font-bold block mb-1">Contractor Fix Image URL</label>
                  <input
                    type="url"
                    required
                    value={resolvePhotoUrl}
                    onChange={(e) => setResolvePhotoUrl(e.target.value)}
                    className={`w-full px-3 py-2 rounded-xl text-xs border outline-hidden font-mono ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                {/* Official Completion Note */}
                <div>
                  <label className="text-xs font-bold block mb-1">Inspection & Quality Certification Note</label>
                  <textarea
                    rows={2}
                    required
                    value={resolveProofNotes}
                    onChange={(e) => setResolveProofNotes(e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs border outline-hidden ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                    }`}
                  />
                </div>

                {/* Invoice Ref */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold block mb-1">Contractor Work Order Ref</label>
                    <input
                      type="text"
                      value={contractorInvoice}
                      onChange={(e) => setContractorInvoice(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs border font-mono ${
                        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold block mb-1">Inspecting Authority</label>
                    <input
                      type="text"
                      disabled
                      value={selectedOfficer || resolveModalIssue.assignedOfficer || 'Ward Supervisor'}
                      className={`w-full px-3 py-2 rounded-xl text-xs border opacity-70 ${
                        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setResolveModalIssue(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 hover:opacity-90 text-white text-xs font-black shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Resolution & Close SLA</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
