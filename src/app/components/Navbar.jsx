import React, { useState } from 'react';
import {
  PlusCircle,
  MapPin,
  ChevronDown,
  ShieldAlert,
  Sun,
  Moon,
  LogOut,
  User,
  Building2,
  Trees,
  Award,
  Sparkles,
  CheckCircle2,
  LogIn
} from 'lucide-react';
import { Link, useNavigate, useLocation } from '@/lib/router-compat';
import { CITIES } from '../data/mockIssues';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ isDarkMode, onToggleTheme }) {
  const { currentUser, isLoggedIn, isCitizen, isOfficial, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/login');
  };

  return (
    <>
      {/* Indian Civic Tricolor Accent Bar */}
      <div className="h-[3px] bg-gradient-to-r from-amber-500 via-white to-emerald-500 w-full shadow-[0_0_12px_rgba(245,158,11,0.5)] z-50 relative" />

      <header
        className={`sticky top-0 z-50 transition-colors duration-300 border-b shadow-lg backdrop-blur-2xl ${
          isDarkMode
            ? 'bg-ink/95 border-slate-800 text-white'
            : 'bg-white/95 border-amber-200/70 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">

            {/* ================= LEFT: BRANDING ================= */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {isOfficial ? (
                /* OFFICIAL MUNICIPAL / PANCHAYAT BRANDING */
                <Link to="/admin" className="flex items-center gap-2.5 sm:gap-3 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-600 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-rose-500/30 group-hover:scale-105 transition duration-300">
                    🏛️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className={`font-black text-[15px] sm:text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Ghar2Kendra <span className="text-amber-600 dark:text-amber-400">Command</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full border tracking-wider bg-rose-500/15 text-rose-500 border-rose-500/30">
                        OFFICIAL
                      </span>
                    </div>
                    <p className={`hidden sm:block text-[10px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Panchayati Raj & Municipal Administration Kendra
                    </p>
                  </div>
                </Link>
              ) : (
                /* CITIZEN GRIEVANCE NETWORK BRANDING */
                <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-orange-600 flex items-center justify-center text-lg sm:text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition duration-300">
                    🏛️
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className={`font-black text-[15px] sm:text-lg tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Ghar<span className="text-amber-600 dark:text-amber-400">2Kendra</span>
                      </span>
                      <span className={`hidden sm:inline text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 rounded-full border tracking-wider ${
                        isDarkMode
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        INDIA
                      </span>
                    </div>
                    <p className={`hidden sm:block text-[10px] font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      घर से केंद्र तक • Citizen Grievance & Public Works Network
                    </p>
                  </div>
                </Link>
              )}
            </div>

            {/* ================= CENTER: JURISDICTION OR ACTIVE WARD BADGE ================= */}
            <div className="hidden md:flex items-center gap-2">
              {isOfficial ? (
                /* Official Active Jurisdiction Pill */
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs shadow-xs ${
                  isDarkMode
                    ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                    : 'bg-amber-50 border-amber-200 text-slate-800'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-extrabold flex items-center gap-1 text-[11px]">
                    {currentUser?.jurisdictionType === 'panchayat' ? '🌾 Gram Panchayat:' : '🏛️ Municipality:'}
                  </span>
                  <span className="font-bold text-amber-600 dark:text-amber-400 truncate max-w-[240px]">
                    {currentUser?.jurisdictionName || 'MCD South Zone'}
                  </span>
                </div>
              ) : (
                /* Citizen Active Network Pill */
                <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border text-xs shadow-xs ${
                  isDarkMode
                    ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                    : 'bg-amber-50 border-amber-200 text-slate-700'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-[11px]">250 Smart City Wards Online</span>
                </div>
              )}
            </div>

            {/* ================= RIGHT: CONTROLS & AUTH PROFILE ================= */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">

              {/* DARK / LIGHT MODE TOGGLE (SMOOTH ANIMATED BUTTON ON ALL PAGES) */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={onToggleTheme}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-bold transition shadow-xs cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-amber-400'
                    : 'bg-white hover:bg-amber-50 border-amber-200 text-amber-900 shadow-sm'
                }`}
                title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span className="hidden lg:inline text-white">Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span className="hidden lg:inline text-slate-800">Dark Mode</span>
                  </>
                )}
              </motion.button>

              {/* City Switcher (For Citizen Portal) */}
              {isCitizen && (
                <div className="relative">
                  <button
                    onClick={() => setShowCityDropdown(!showCityDropdown)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-2.5 sm:px-3 py-2 rounded-xl transition border shadow-xs ${
                      isDarkMode
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span className="hidden sm:inline">{selectedCity.name}</span>

                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  <AnimatePresence>
                    {showCityDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl p-1.5 z-50 overflow-hidden border ${
                          isDarkMode
                            ? 'bg-slate-900 border-slate-800 text-white'
                            : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      >
                        <div className={`text-[10px] uppercase font-extrabold px-3 py-1.5 border-b tracking-wider ${
                          isDarkMode ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'
                        }`}>
                          Select Corporation
                        </div>
                        {CITIES.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => {
                              setSelectedCity(city);
                              setShowCityDropdown(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition flex items-center justify-between ${
                              selectedCity.id === city.id
                                ? 'bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-md'
                                : isDarkMode
                                ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{city.name}</span>
                            <span className="text-[10px] opacity-70 font-mono">{city.wards.split(' ')[0]}W</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Citizen File Grievance CTA */}
              {isCitizen && (
                <Link
                  to="/report"
                  className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition shadow-lg shadow-orange-500/25 active:scale-95 duration-200 shrink-0"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">File Grievance</span>
                  <span className="sm:hidden">Report</span>
                </Link>
              )}

              {/* USER PROFILE & LOGOUT DROPDOWN */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl border transition shadow-xs cursor-pointer ${
                      isDarkMode
                        ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-white'
                        : 'bg-white hover:bg-amber-50 border-amber-200 text-slate-900'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-xl bg-orange-600 hover:bg-orange-700 flex items-center justify-center text-sm shadow-sm text-white shrink-0">
                      {currentUser?.avatar || (isCitizen ? '👨‍💼' : '🏛️')}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-xs font-black truncate max-w-[110px] leading-tight">
                        {currentUser?.name?.split(' ')[0] || 'User'}
                      </div>
                      <div className="text-[10px] font-semibold text-amber-500 flex items-center gap-1">
                        {isCitizen ? (
                          <>
                            <Award className="w-3 h-3 text-amber-500" />
                            <span>{currentUser?.karma || 150} Pts</span>
                          </>
                        ) : (
                          <span className="truncate max-w-[95px]">{currentUser?.designation?.split(' ')[0] || 'Officer'}</span>
                        )}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                  </button>

                  {/* Profile Flyout */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-64 rounded-3xl shadow-2xl p-4 z-50 border ${
                          isDarkMode
                            ? 'bg-ink-raised border-slate-800 text-white'
                            : 'bg-white border-amber-200 text-slate-900 shadow-amber-950/10'
                        }`}
                      >
                        {/* Profile Info Card */}
                        <div className="pb-3 border-b border-slate-700/40 mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center text-xl text-white shadow-md">
                              {currentUser?.avatar || '👤'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-xs sm:text-sm truncate">{currentUser?.name}</p>
                              <p className="text-[10px] text-slate-400 truncate">{currentUser?.email || currentUser?.phone}</p>
                              <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 border ${
                                isOfficial
                                  ? 'bg-rose-500/15 text-rose-500 border-rose-500/30'
                                  : 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              }`}>
                                {isOfficial ? `${currentUser?.jurisdictionType?.toUpperCase()} OFFICER` : 'CITIZEN VERIFIER'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Jurisdictional / Karma Details */}
                        <div className={`p-2.5 rounded-xl text-[11px] mb-3 space-y-1.5 border ${
                          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}>
                          {isCitizen ? (
                            <>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Karma Points:</span>
                                <span className="font-black text-amber-500">⭐ {currentUser?.karma || 150}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Resident Ward:</span>
                                <span className="font-bold truncate max-w-[130px]">{currentUser?.ward || 'Ward 14'}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Designation:</span>
                                <span className="font-bold text-amber-500 truncate max-w-[130px]">{currentUser?.designation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-medium">Badge ID:</span>
                                <span className="font-mono font-bold text-[10px]">{currentUser?.officerId}</span>
                              </div>
                            </>
                          )}
                        </div>

                        {/* Switch Role or Log Out */}
                        <div className="space-y-1.5">
                          <Link
                            to="/login"
                            onClick={() => setShowProfileMenu(false)}
                            className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                              isDarkMode
                                ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                                : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <LogIn className="w-3.5 h-3.5 text-amber-500" />
                            <span>Switch Role / Account</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full py-2 px-3 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition flex items-center gap-2"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Not Logged In CTA */
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition shadow-md shadow-orange-500/20 active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              )}

            </div>

          </div>
        </div>
      </header>
    </>
  );
}
