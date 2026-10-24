import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const SEEN_KEY = 'g2k_intro_seen';

function shouldShowIntro() {
  try {
    return !sessionStorage.getItem(SEEN_KEY);
  } catch {
    return false;
  }
}

// Brand intro: plays once per browser session over the app, then fades away.
// Click or press any key to skip.
export default function IntroSplash({ onDone }) {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(shouldShowIntro);
  const shownOnMount = useRef(show);

  useEffect(() => {
    if (!shownOnMount.current) {
      onDone?.();
      return undefined;
    }
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* storage unavailable: the intro simply plays again next time */
    }
    const skip = () => setShow(false);
    const timer = setTimeout(skip, reduceMotion ? 700 : 2400);
    window.addEventListener('keydown', skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [onDone, reduceMotion]);

  const ease = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          key="intro"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-white cursor-pointer select-none px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease } }}
        >
          <span className="sr-only">Ghar2Kendra is loading</span>

          <motion.div
            className="relative"
            initial={reduceMotion ? false : { scale: 0.55, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 17, delay: 0.1 }}
            aria-hidden="true"
          >
            {!reduceMotion && (
              <motion.span
                className="absolute inset-0 rounded-3xl bg-white"
                initial={{ scale: 1, opacity: 0.35 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.3, delay: 0.5, ease: 'easeOut' }}
              />
            )}
            <div className="relative rounded-3xl bg-white px-6 py-4 sm:px-8 sm:py-5 shadow-2xl shadow-black/50">
              <img src="/brand/g2k-logo.webp" alt="" width="720" height="325" className="h-16 sm:h-20 w-auto" />
            </div>
          </motion.div>

          <motion.div
            className="mt-7 font-black text-3xl sm:text-5xl tracking-tight"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
          >
            Ghar<span className="text-amber-400">2Kendra</span>
          </motion.div>

          <motion.p
            className="mt-3 text-sm sm:text-base text-slate-400 text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease }}
          >
            <span className="text-slate-200">घर से केंद्र तक</span> · From your doorstep to the people who fix it
          </motion.p>

          <motion.div
            className="mt-9 h-[3px] w-40 sm:w-56 rounded-full bg-gradient-to-r from-amber-500 via-white to-emerald-500 origin-left shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            initial={reduceMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.95, ease: [0.65, 0, 0.35, 1] }}
            aria-hidden="true"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
