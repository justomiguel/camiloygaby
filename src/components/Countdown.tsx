"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-12-19T19:00:00-03:00").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(): Parts {
  const distance = Math.max(0, WEDDING_DATE - Date.now());
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  return { days, hours, minutes, seconds };
}

const labels: Array<[keyof Parts, string]> = [
  ["days", "días"],
  ["hours", "horas"],
  ["minutes", "min"],
  ["seconds", "seg"],
];

export function Countdown() {
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff());
    const id = setInterval(() => setParts(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Cuenta regresiva al casamiento"
      className="relative overflow-hidden bg-charcoal px-5 py-14 text-cream md:py-16"
    >
      <div className="absolute inset-0 opacity-25" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,146,79,0.5),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.45em] text-gold-light/90 md:text-xs">
          Cuenta regresiva
        </p>
        <div className="mx-auto mt-2 h-px w-12 bg-gold-light/40" aria-hidden="true" />
        <div className="mt-5 grid grid-cols-4 gap-2 md:gap-6">
          {labels.map(([key, label]) => {
            const value = parts ? parts[key] : 0;
            const display = value.toString().padStart(2, "0");
            return (
              <div key={key} className="flex flex-col items-center">
                <div className="relative h-16 w-full overflow-hidden text-center md:h-24">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={display}
                      initial={{ y: -34, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 34, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 flex items-center justify-center font-serif text-4xl tracking-tight text-cream md:text-7xl"
                    >
                      {display}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream/70 md:text-xs">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
