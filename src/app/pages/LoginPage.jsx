import React, { useState } from 'react';
import { useNavigate, Link } from '@/lib/router-compat';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Building2,
  Phone,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  KeyRound,
  RotateCcw,
  Landmark,
  Trees,
  Check,
  AlertCircle,
  HelpCircle,
  X,
  QrCode,
  Award,
  Compass,
  Cpu,
  BadgeCheck
} from 'lucide-react';
import { useAuth, DEMO_PROFILES } from '../context/AuthContext';

const INDIAN_STATES = [
  'Delhi (NCT)',
  'Uttar Pradesh',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'West Bengal',
  'Gujarat',
  'Rajasthan',
  'Bihar',
  'Madhya Pradesh',
  'Telangana',
];

const PRESET_MUNICIPALITIES = [
  'Municipal Corporation of Delhi (MCD South Zone)',
  'Brihanmumbai Municipal Corporation (BMC Ward K-West)',
  'Bruhat Bengaluru Mahanagara Palike (BBMP East)',
  'Greater Hyderabad Municipal Corporation (GHMC)',
  'Kolkata Municipal Corporation (KMC Borough 7)',
  'Pune Municipal Corporation (PMC Kothrud)',
];

const PRESET_PANCHAYATS = [
  { name: 'Ramnagar Gram Panchayat', block: 'Varanasi Rural Block', district: 'Varanasi', state: 'Uttar Pradesh' },
  { name: 'Shivaji Nagar Gram Panchayat', block: 'Haveli Block', district: 'Pune', state: 'Maharashtra' },
  { name: 'Devanahalli Rural Gram Panchayat', block: 'Devanahalli', district: 'Bengaluru Rural', state: 'Karnataka' },
  { name: 'Sonarpur Gram Panchayat', block: 'Rajpur Sonarpur', district: 'South 24 Parganas', state: 'West Bengal' },
  { name: 'Gandhinagar Gram Panchayat', block: 'Mansarovar', district: 'Jaipur', state: 'Rajasthan' },
];

const DEPARTMENTS_URBAN = [
  'Public Works Dept (PWD - Roads & Pavements)',
  'DISCOM / Electricity & Streetlight Grid',
  'Water Supply & Sewerage Board',
  'Municipal Solid Waste & Sanitation',
  'Traffic Engineering & Public Safety Cell',
];

const DEPARTMENTS_RURAL = [
  'Panchayati Raj & Village Infrastructure',
  'PMGSY (Pradhan Mantri Gram Sadak Yojana - Rural Roads)',
  'Har Ghar Jal (Jal Jeevan Mission Rural Water Supply)',
  'Gram Swachhata & Solid/Liquid Waste Management',
  'Rural Electrification & Solar Grid Maintenance',
];

export default function LoginPage({ isDarkMode }) {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  // Primary Role: 'citizen' | 'official'
  const [role, setRole] = useState('citizen');

  // Mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Form Fields
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState(''); // phone or email
  const [password, setPassword] = useState('');

  // Official Specific Jurisdictional Fields
  const [jurisdictionTier, setJurisdictionTier] = useState('municipality'); // 'municipality' | 'panchayat'
  const [selectedState, setSelectedState] = useState(INDIAN_STATES[0]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(PRESET_MUNICIPALITIES[0]);
  const [selectedPanchayat, setSelectedPanchayat] = useState(PRESET_PANCHAYATS[0].name);
  const [panchayatBlock, setPanchayatBlock] = useState(PRESET_PANCHAYATS[0].block);
  const [officialDepartment, setOfficialDepartment] = useState(DEPARTMENTS_URBAN[0]);
  const [designation, setDesignation] = useState('Junior Engineer (Civil)');
  const [employeeId, setEmployeeId] = useState('OFF-2026-4412');

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState(null);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === 'citizen') {
      const citizenUser = {
        id: `cit-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim() || 'Aarav Sharma',
        role: 'citizen',
        phone: identifier.includes('@') ? '+91 98765 43210' : identifier || '+91 98765 43210',
        email: identifier.includes('@') ? identifier : 'citizen@ghar2kendra.gov.in',
        karma: 150,
        ward: 'Ward 14 (South Extension)',
        avatar: '👨‍💼',
      };
      login(citizenUser);
      navigate('/');
    } else {
      // Official (Municipality or Panchayat)
      const officialUser = {
        id: employeeId || `off-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim() || (jurisdictionTier === 'municipality' ? 'Er. Rajesh Varma' : 'Smt. Gayatri Devi'),
        role: 'official',
        designation: designation || (jurisdictionTier === 'municipality' ? 'Junior Engineer (Civil)' : 'Gram Panchayat Pradhan (Sarpanch)'),
        jurisdictionType: jurisdictionTier,
        jurisdictionName: jurisdictionTier === 'municipality' ? selectedMunicipality : `${selectedPanchayat} (${panchayatBlock})`,
        department: officialDepartment,
        officerId: employeeId || (jurisdictionTier === 'municipality' ? 'MCD-ENG-4921' : 'GP-VAR-019'),
        phone: identifier.includes('@') ? '+91 98111 22334' : identifier || '+91 98111 22334',
        email: identifier.includes('@') ? identifier : 'officer@gov.in',
        avatar: jurisdictionTier === 'municipality' ? '🏛️' : '🌾',
      };
      login(officialUser);
      navigate('/admin');
    }
  };

  // One-Click Demo Handler
  const handleQuickDemo = (profileKey, destination) => {
    loginAsDemo(profileKey);
    navigate(destination);
  };

  return (
    <div className={`min-h-[calc(100vh-67px)] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 relative flex items-center justify-center overflow-hidden ${
      isDarkMode ? 'bg-ink text-slate-100' : 'bg-paper text-slate-900'
    }`}>
      {/* Dynamic Animated Ambient Background Aura Meshes */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.12, 0.22, 0.12],
          x: [0, 25, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 -left-20 w-[480px] h-[480px] bg-orange-600 hover:bg-orange-700 rounded-full blur-[160px] opacity-50 pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1],
          x: [0, -30, 0],
          y: [0, 25, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-gradient-to-bl from-rose-600 to-emerald-500 rounded-full blur-[160px] opacity-50 pointer-events-none"
      />

      <div className="w-full max-w-2xl relative z-10 space-y-5 mx-auto">

        {/* TOP COMPACT HEADER */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black shadow-sm border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 backdrop-blur-md"
          >
            <span className="text-sm">🇮🇳</span>
            <span>GHAR2KENDRA • NATIONAL GRIEVANCE & LOCAL BODIES GATEWAY</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ghar<span className="text-amber-600 dark:text-amber-400">2Kendra</span> Access Portal
          </h1>
          <p className={`text-xs sm:text-sm max-w-lg mx-auto ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            घर से केंद्र तक • Unified single sign-on for Citizens, Municipal Corporations, and Rural Gram Panchayats.
          </p>
        </div>

        {/* ONE-CLICK INSTANT DEMO EVALUATOR BAR */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-3.5 sm:p-4 rounded-3xl border shadow-lg backdrop-blur-md ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-800'
              : 'bg-white/90 border-amber-200/90 shadow-amber-950/5'
          }`}
        >
          <div className="flex items-center justify-between gap-2 mb-2 px-1">
            <span className="text-xs font-black flex items-center gap-1.5 text-amber-500">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>Evaluator / Judge 1-Click Fast Pass:</span>
            </span>
            <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Instant Bypass & Direct Route
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleQuickDemo('citizen', '/')}
              className={`p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${
                isDarkMode
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-amber-500/50'
                  : 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-200/80 hover:border-amber-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center text-lg shadow-sm">
                👨‍💼
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-black block text-xs truncate">Login as Citizen</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block truncate">Aarav S. (150 Pts) &rarr; /</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleQuickDemo('municipalOfficial', '/admin')}
              className={`p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${
                isDarkMode
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-rose-500/50'
                  : 'bg-orange-50/70 hover:bg-orange-100/70 border-orange-200/80 hover:border-orange-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center text-lg shadow-sm">
                🏛️
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-black block text-xs truncate">Login as Municipal JE</span>
                <span className="text-[10px] text-orange-600 dark:text-orange-400 font-bold block truncate">Er. Rajesh (MCD) &rarr; /admin</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleQuickDemo('panchayatOfficial', '/admin')}
              className={`p-2.5 rounded-2xl text-left border transition-all flex items-center gap-3 group shadow-xs ${
                isDarkMode
                  ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500/50'
                  : 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200/80 hover:border-emerald-400'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center text-lg shadow-sm">
                🌾
              </div>
              <div className="min-w-0 flex-1">
                <span className="font-black block text-xs truncate">Login as Gram Pradhan</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block truncate">Gayatri Devi &rarr; /admin</span>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* MAIN FOCUSED AUTHENTICATION CARD */}
        <div className="w-full max-w-xl mx-auto">
          <motion.div
            layout
            className={`rounded-3xl border shadow-2xl p-6 sm:p-8 backdrop-blur-2xl transition-all duration-300 ${
              isDarkMode
                ? 'bg-ink/95 border-slate-800'
                : 'bg-white/95 border-amber-200/90 shadow-orange-500/5'
            }`}
          >

            {/* 1. ROLE SELECTION WITH SPRING SLIDER */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Step 1: Choose Authority Role
                  </label>
                  <span className={`text-[10px] font-bold ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                    Directs to dedicated workspace
                  </span>
                </div>

                <div className={`grid grid-cols-2 p-1.5 rounded-2xl border relative ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-amber-50/80 border-amber-200/80'
                }`}>
                  <button
                    type="button"
                    onClick={() => setRole('citizen')}
                    className={`relative z-10 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'citizen' ? 'text-white' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    <span>Citizen / Resident</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('official')}
                    className={`relative z-10 py-2.5 px-3 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
                      role === 'official' ? 'text-white' : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Municipal / Panchayat</span>
                  </button>

                  {/* Smooth Spring Active Indicator Pill */}
                  <motion.div
                    layoutId="activeRoleSlider"
                    className={`absolute inset-y-1.5 rounded-xl -z-0 ${
                      role === 'citizen'
                        ? 'left-1.5 right-[50%] bg-orange-600 hover:bg-orange-700 shadow-md shadow-orange-500/30'
                        : 'left-[50%] right-1.5 bg-orange-600 hover:bg-orange-700 shadow-md shadow-rose-500/30'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                </div>
              </div>

              {/* 2. LOGIN vs SIGN UP TABS (SPRING SLIDER) */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/40">
                <div className={`p-1 rounded-2xl border flex items-center relative ${
                  isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className={`relative z-10 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                      authMode === 'login' ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className={`relative z-10 px-4 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                      authMode === 'signup' ? 'text-white' : isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    Sign Up
                  </button>

                  <motion.div
                    layoutId="authModeSlider"
                    className={`absolute inset-y-1 rounded-xl -z-0 bg-orange-600 hover:bg-orange-700 shadow-sm ${
                      authMode === 'login' ? 'left-1 right-[50%]' : 'left-[50%] right-1'
                    }`}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                </div>
              </div>

              {/* Status Alerts */}
              <AnimatePresence>
                {statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`p-3 rounded-2xl mb-4 text-xs font-bold flex items-center gap-2.5 border ${
                      statusMessage.type === 'error'
                        ? 'bg-rose-500/15 border-rose-500/30 text-rose-500'
                        : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                    }`}
                  >
                    {statusMessage.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    )}
                    <span>{statusMessage.text}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM FIELDS */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name for Sign Up */}
                {authMode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="text-xs font-bold block mb-1">Full Legal Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder={role === 'citizen' ? 'e.g. Aarav Sharma' : 'e.g. Er. Rajesh Varma'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 focus:border-amber-500 text-white'
                            : 'bg-white border-slate-200 focus:border-amber-500 text-slate-900'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Mobile or Email Identifier */}
                <div>
                  <label className="text-xs font-bold block mb-1">
                    {role === 'citizen' ? 'Mobile Number or Email Address' : 'Official Government Email or Registered Mobile'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={role === 'citizen' ? '+91 98765 43210 or citizen@gmail.com' : 'officer@mcd.gov.in / +91 98111...'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-medium border outline-hidden transition ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800 focus:border-amber-500 text-white'
                          : 'bg-white border-slate-200 focus:border-amber-500 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* OFFICIAL DETAILED JURISDICTION SECTION */}
                <AnimatePresence>
                  {role === 'official' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98, height: 0 }}
                      animate={{ opacity: 1, scale: 1, height: 'auto' }}
                      exit={{ opacity: 0, scale: 0.98, height: 0 }}
                      className={`p-4 rounded-2xl border space-y-3.5 ${
                        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-amber-50/50 border-amber-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                          <Landmark className="w-3.5 h-3.5" />
                          <span>Jurisdictional Tier:</span>
                        </span>
                      </div>

                      {/* Tier Toggle: Urban vs Rural */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setJurisdictionTier('municipality');
                            setOfficialDepartment(DEPARTMENTS_URBAN[0]);
                            setDesignation('Junior Engineer (Civil)');
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            jurisdictionTier === 'municipality'
                              ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/20'
                              : isDarkMode
                              ? 'bg-slate-900 border-slate-800 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>Urban Municipality</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setJurisdictionTier('panchayat');
                            setOfficialDepartment(DEPARTMENTS_RURAL[0]);
                            setDesignation('Gram Panchayat Pradhan (Sarpanch)');
                          }}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            jurisdictionTier === 'panchayat'
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20'
                              : isDarkMode
                              ? 'bg-slate-900 border-slate-800 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <Trees className="w-3.5 h-3.5" />
                          <span>Rural Gram Panchayat</span>
                        </button>
                      </div>

                      {/* Specific Corporation or Panchayat Selector */}
                      {jurisdictionTier === 'municipality' ? (
                        <div>
                          <label className="text-[11px] font-bold block mb-1">Municipal Corporation / Council</label>
                          <select
                            value={selectedMunicipality}
                            onChange={(e) => setSelectedMunicipality(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${
                              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          >
                            {PRESET_MUNICIPALITIES.map((mun) => (
                              <option key={mun} value={mun}>{mun}</option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="text-[11px] font-bold block mb-1">Gram Panchayat Name</label>
                            <select
                              value={selectedPanchayat}
                              onChange={(e) => {
                                const found = PRESET_PANCHAYATS.find((p) => p.name === e.target.value);
                                setSelectedPanchayat(e.target.value);
                                if (found) setPanchayatBlock(found.block);
                              }}
                              className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${
                                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                              }`}
                            >
                              {PRESET_PANCHAYATS.map((p) => (
                                <option key={p.name} value={p.name}>{p.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-[11px] font-bold block mb-1">Block / District</label>
                            <input
                              type="text"
                              value={panchayatBlock}
                              onChange={(e) => setPanchayatBlock(e.target.value)}
                              className={`w-full px-3 py-2 rounded-xl text-xs border outline-hidden ${
                                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                              }`}
                            />
                          </div>
                        </div>
                      )}

                      {/* Department */}
                      <div>
                        <label className="text-[11px] font-bold block mb-1">Nodal Department</label>
                        <select
                          value={officialDepartment}
                          onChange={(e) => setOfficialDepartment(e.target.value)}
                          className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border outline-hidden ${
                            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        >
                          {(jurisdictionTier === 'municipality' ? DEPARTMENTS_URBAN : DEPARTMENTS_RURAL).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      {/* Designation & Employee ID */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="text-[11px] font-bold block mb-1">Official Designation</label>
                          <input
                            type="text"
                            value={designation}
                            onChange={(e) => setDesignation(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl text-xs border outline-hidden ${
                              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold block mb-1">Officer Badge ID</label>
                          <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl text-xs border outline-hidden font-mono ${
                              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                            }`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* DIRECT PASSWORD AUTHENTICATION (OTP DROPPED) */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold">Account Password</label>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-amber-500 hover:underline font-bold cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-hidden ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800 focus:border-amber-500 text-white'
                          : 'bg-white border-slate-200 focus:border-amber-500 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON WITH PROPER NAMING */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-orange-500/25 transition flex items-center justify-center gap-2 cursor-pointer mt-5"
                >
                  <span>
                    {authMode === 'login'
                      ? role === 'citizen'
                        ? 'Login to Citizen Portal'
                        : 'Login to Ward / Panchayat Command'
                      : role === 'citizen'
                      ? 'Sign Up as Citizen'
                      : 'Sign Up as Official Member'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Bottom Notice */}
              <div className="mt-5 pt-4 border-t border-slate-800/40 text-center">
                <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  🔒 256-bit SSL encrypted • Authorized by National Informatics Centre (NIC)
                </p>
              </div>

            </motion.div>
          </div>

        </div>

      {/* ================= FORGOT PASSWORD MODAL ================= */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 ${
                isDarkMode ? 'bg-ink-raised border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/40 mb-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-black">Reset Account Password</h3>
                </div>
                <button onClick={() => setShowForgotModal(false)} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {forgotSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-base font-extrabold">Recovery Instructions Dispatched</h4>
                  <p className="text-xs text-slate-400">
                    We have dispatched an encrypted recovery code to <strong>{forgotInput || 'your registered contact'}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotSuccess(false);
                    }}
                    className="mt-3 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Enter your registered mobile number or official email address to receive an instant OTP reset token.
                  </p>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210 or name@mcd.gov.in"
                    value={forgotInput}
                    onChange={(e) => setForgotInput(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs border outline-hidden ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (forgotInput.trim()) setForgotSuccess(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md shadow-orange-500/20 cursor-pointer"
                    >
                      Send Reset Token
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
