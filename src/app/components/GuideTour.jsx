import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

const DONE_KEY = 'g2k_guide_done';
// Dispatch on window to replay the guide (the profile menu does this).
export const START_GUIDE_EVENT = 'g2k:start-guide';

const PAD = 6;
const GAP = 14;

// Each step points at an element marked data-tour="<target>". Steps whose element
// isn't on screen for the current role (e.g. officials have no File Grievance button) are skipped.
const STEPS = [
  {
    target: null,
    title: 'Welcome to Ghar2Kendra',
    body: "Report civic problems, follow them until they're fixed, and confirm the repair yourself. Here's a quick look at the controls.",
  },
  {
    target: 'report',
    title: 'File a grievance',
    body: 'Snap a photo of a pothole, a dead streetlight or an overflowing drain. Gemini Vision fills in the category, urgency and title for you.',
  },
  {
    target: 'feed',
    title: 'Live Feed',
    body: 'Every complaint in your city, the department responsible and its repair deadline. Filter by category or switch to the map.',
  },
  {
    target: 'memory',
    title: 'Civic Memory',
    body: 'Every road, drain and streetlight keeps its history: past repairs, defects that came back, and a reliability score.',
  },
  {
    target: 'insights',
    title: 'Insights',
    body: 'Finds separate complaints that share one cause, like waterlogging and a choked drain on the same lane.',
  },
  {
    target: 'missions',
    title: 'Missions',
    body: 'Team up with neighbours around one cause: shared evidence, a petition drafted from the facts, and follow-up reminders.',
  },
  {
    target: 'radar',
    title: 'My Radar',
    body: 'Follow your home, college or route to work, and see only the hazards and repairs that affect you.',
  },
  {
    target: 'workspaces',
    title: 'Workspaces',
    body: "For colleges, residents' associations and NGOs that fix things directly: a work queue, staff assignment and analytics.",
  },
  {
    target: 'theme',
    title: 'Light or dark',
    body: 'Switch the look whenever you like.',
  },
  {
    target: 'account',
    title: 'Your account',
    body: 'Switch between the citizen and official views here, and open this guide again any time.',
  },
];

const findTarget = (name) => document.querySelector(`[data-tour="${name}"]`);

function cardPosition(rect, width) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (!rect) return { top: Math.max(16, vh / 2 - 130), left: (vw - width) / 2 };
  const left = Math.min(Math.max(rect.left + rect.width / 2 - width / 2, 12), vw - width - 12);
  const below = rect.top + rect.height + PAD + GAP;
  // Flip above the element when there isn't room for the card below it.
  const top = below + 240 > vh ? Math.max(12, rect.top - PAD - GAP - 240) : below;
  return { top, left };
}

export default function GuideTour({ isDarkMode, ready }) {
  const [active, setActive] = useState(false);
  const [steps, setSteps] = useState(STEPS);
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const primaryRef = useRef(null);

  const start = useCallback(() => {
    setSteps(STEPS.filter((s) => !s.target || findTarget(s.target)));
    setIndex(0);
    setRect(null);
    setActive(true);
  }, []);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      /* storage unavailable: the guide shows again next visit */
    }
  }, []);

  const next = useCallback(() => {
    if (index >= steps.length - 1) finish();
    else setIndex(index + 1);
  }, [index, steps.length, finish]);

  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // First visit: start once the intro has finished.
  useEffect(() => {
    if (!ready) return undefined;
    let done = true;
    try {
      done = localStorage.getItem(DONE_KEY) === '1';
    } catch {
      /* treat unavailable storage as done, so the guide never nags */
    }
    if (done) return undefined;
    const timer = setTimeout(start, 350);
    return () => clearTimeout(timer);
  }, [ready, start]);

  useEffect(() => {
    window.addEventListener(START_GUIDE_EVENT, start);
    return () => window.removeEventListener(START_GUIDE_EVENT, start);
  }, [start]);

  const step = active ? steps[index] : null;

  // Follow the highlighted element through scrolling, resizing and the section nav's own scroll.
  useLayoutEffect(() => {
    const el = step?.target ? findTarget(step.target) : null;
    if (!el) return undefined;
    el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    measure();
    const settle = setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(settle);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
  }, [step]);

  useEffect(() => {
    if (!active) return undefined;
    primaryRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') finish();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') back();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, index, next, back, finish]);

  const spotlight = step?.target ? rect : null;
  const width = typeof window === 'undefined' ? 340 : Math.min(360, window.innerWidth - 24);
  const pos = active ? cardPosition(spotlight, width) : { top: 0, left: 0 };
  const isWelcome = index === 0 && !step?.target;
  const isLast = index === steps.length - 1;

  return (
    <AnimatePresence>
      {active && step && (
        <motion.div
          key="guide"
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Blocks clicks on the page while the guide is open. */}
          <div className="absolute inset-0" aria-hidden="true" />

          {spotlight ? (
            <motion.div
              aria-hidden="true"
              className="fixed rounded-xl ring-2 ring-amber-400 pointer-events-none"
              style={{ boxShadow: '0 0 0 9999px rgba(12, 10, 8, 0.72)' }}
              initial={false}
              animate={{
                top: spotlight.top - PAD,
                left: spotlight.left - PAD,
                width: spotlight.width + PAD * 2,
                height: spotlight.height + PAD * 2,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            />
          ) : (
            <div aria-hidden="true" className="fixed inset-0 bg-[rgba(12,10,8,0.72)]" />
          )}

          <motion.div
            key={index}
            role="dialog"
            aria-modal="true"
            aria-labelledby="g2k-guide-title"
            aria-describedby="g2k-guide-body"
            className={`fixed rounded-2xl border p-5 shadow-2xl ${
              isDarkMode ? 'bg-ink-raised border-slate-700 text-white' : 'bg-white border-amber-200 text-slate-900'
            }`}
            style={{ top: pos.top, left: pos.left, width }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {isWelcome ? 'Quick guide' : `${index} of ${steps.length - 1}`}
              </span>
              <button
                type="button"
                onClick={finish}
                aria-label="Close the guide"
                className={`-mr-1.5 p-1.5 rounded-lg transition ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 id="g2k-guide-title" className="mt-2 text-lg font-black tracking-tight">
              {step.title}
            </h2>
            <p id="g2k-guide-body" className={`mt-1.5 text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {step.body}
            </p>

            <div className="mt-5 flex items-center justify-between gap-3">
              {isWelcome ? (
                <button
                  type="button"
                  onClick={finish}
                  className={`text-xs font-bold px-1 py-2 transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  Skip for now
                </button>
              ) : (
                <div className="flex gap-1" aria-hidden="true">
                  {steps.slice(1).map((s, i) => (
                    <span
                      key={s.target}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i + 1 === index ? 'w-4 bg-amber-500' : `w-1.5 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    aria-label="Previous"
                    className={`p-2 rounded-xl border transition ${
                      isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <button
                  ref={primaryRef}
                  type="button"
                  onClick={next}
                  className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-md shadow-orange-500/25 active:scale-95"
                >
                  {isWelcome ? 'Show me around' : isLast ? 'Got it' : 'Next'}
                  {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
