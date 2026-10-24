import React from 'react';
import { Search, Activity, Clock, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Logged', value: '1,420', note: '↑ 12% vs last month', icon: Activity, tone: 'text-amber-600 dark:text-amber-400' },
  { label: 'Under Repair', value: '84', note: 'Active crews', icon: Clock, tone: 'text-orange-600 dark:text-orange-400', valueTone: 'text-orange-600 dark:text-orange-400' },
  { label: 'Avg Fix Time', value: '36.4 hrs', note: '-8 hrs faster', icon: Zap, tone: 'text-teal-600 dark:text-teal-400' },
  { label: 'Citizen Verified', value: '94.2%', note: 'Zero ghost fixes', icon: CheckCircle2, tone: 'text-emerald-600 dark:text-emerald-400', valueTone: 'text-emerald-600 dark:text-emerald-400' },
];

export default function HeroSection({ searchQuery, setSearchQuery, isDarkMode = true }) {
  return (
    <section
      className={`relative overflow-hidden border-b hairline ${
        isDarkMode ? 'bg-ink text-slate-100' : 'bg-paper text-slate-950'
      }`}
    >
      <div className="absolute inset-0 paper-grain pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-10 sm:pb-14">
        {/* Live dispatch line */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8 sm:mb-10 min-w-0"
        >
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="eyebrow text-amber-700 dark:text-amber-400 shrink-0">Live Dispatch Radar:</span>
          <span className={`truncate text-xs sm:text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Ward 14 PWD rapid-repair squad en route to MG Road crater
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl sm:leading-[0.98]"
            >
              Transforming Complaints into{' '}
              <em className="not-italic sm:italic text-orange-600 dark:text-amber-400 font-medium">
                Public Action in Real-Time
              </em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`lg:col-span-4 text-[15px] leading-relaxed lg:pb-2 lg:border-l lg:pl-6 hairline ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Snap a photo of any road damage, blackout, or sewer hazard. Our{' '}
            <span className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>Gemini Vision AI</span>{' '}
            classifies the defect, estimates severity, and delivers verified work orders directly to municipal crews.
          </motion.p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 sm:mt-12 max-w-2xl relative group"
        >
          <Search className="w-[18px] h-[18px] text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-amber-600 transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Ward (e.g. Ward 14), Colony, or Ticket ID..."
            className={`w-full rounded-lg pl-11 pr-4 py-3.5 text-[15px] outline-none transition-all border ${
              isDarkMode
                ? 'bg-ink-raised border-slate-700 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15'
                : 'bg-paper-raised border-slate-300 text-slate-950 placeholder-slate-500 focus:border-amber-600 focus:ring-4 focus:ring-amber-500/20'
            }`}
          />
        </motion.div>

        {/* Ledger-style stats strip */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 border-t hairline"
        >
          {STATS.map(({ label, value, note, icon: Icon, tone, valueTone }, i) => (
            <div
              key={label}
              className={`py-5 pr-4 ${i % 2 === 1 ? 'pl-4 border-l hairline' : ''} ${i >= 2 ? 'border-t md:border-t-0 hairline' : ''} ${i === 2 ? 'md:pl-4 md:border-l' : ''}`}
            >
              <dt className="flex items-center gap-2 eyebrow text-slate-500">
                <Icon className={`w-3.5 h-3.5 ${tone}`} />
                {label}
              </dt>
              <dd className={`mt-2 font-display text-3xl sm:text-4xl ${valueTone || (isDarkMode ? 'text-slate-50' : 'text-slate-950')}`}>
                {value}
              </dd>
              <dd className={`mt-1 text-xs ${valueTone ? (isDarkMode ? 'text-slate-400' : 'text-slate-500') : tone}`}>{note}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
