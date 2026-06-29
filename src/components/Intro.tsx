"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = "intro-seen";

/**
 * Velo de apertura cinematográfico: revela los nombres y se descorre hacia el
 * hero. Se reproduce una vez por sesión y respeta prefers-reduced-motion.
 */
export function Intro({
  name1,
  name2,
  dateLine,
}: {
  name1: string;
  name2: string;
  dateLine: string;
}) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* sessionStorage no disponible */
    }
    document.documentElement.classList.remove("intro-lock");
    setShow(false);
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    if (seen) {
      setShow(false);
      return;
    }

    document.documentElement.classList.add("intro-lock");
    const hold = reduce ? 700 : 2800;
    const timer = window.setTimeout(finish, hold);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [finish, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-charcoal px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: EASE } }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(184,146,79,0.28), transparent 60%)",
            }}
          />

          <motion.p
            className="relative text-[10px] uppercase tracking-[0.55em] text-gold-light/90 sm:text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.3, duration: 0.9, ease: EASE }}
          >
            {dateLine}
          </motion.p>

          <h1 className="relative mt-5 font-display leading-[0.9] text-cream">
            <motion.span
              className="block text-6xl sm:text-7xl md:text-8xl"
              initial={{ opacity: 0, y: reduce ? 0 : 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: reduce ? 0.05 : 0.6, duration: 1, ease: EASE }}
            >
              {name1}
            </motion.span>
            <motion.span
              className="my-1 block font-script text-4xl text-gold-light sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, scale: reduce ? 1 : 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0.1 : 1, duration: 0.8, ease: EASE }}
            >
              &amp;
            </motion.span>
            <motion.span
              className="block text-6xl sm:text-7xl md:text-8xl"
              initial={{ opacity: 0, y: reduce ? 0 : 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: reduce ? 0.15 : 1.2, duration: 1, ease: EASE }}
            >
              {name2}
            </motion.span>
          </h1>

          <motion.div
            className="relative mt-7 h-px w-40 origin-center bg-gold-light/70"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: reduce ? 0.2 : 1.6, duration: 0.9, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
