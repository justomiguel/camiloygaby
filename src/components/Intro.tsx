"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const EASE_FLAP = [0.34, 1.2, 0.4, 1] as const;

// Geometría del sobre (px).
const W = 360;
const H = 240;
const FLAP_H = Math.round(H * 0.5);
const POCKET_H = Math.round(H * 0.62);
const CARD_INSET = 16;
const CARD_TOP = 12;
const CARD_H = H - 22;
const CARD_RISE = 176;

const t = (reduce: boolean, full: number, reduced: number) => (reduce ? reduced : full);

function sealMonogram(name1: string, name2: string) {
  const a = name1.trim().charAt(0).toUpperCase();
  const b = name2.trim().charAt(0).toUpperCase();
  return `${a}&${b}`;
}

/**
 * Intro cinematográfica: un sobre llega, se abre y la carta sale revelando los
 * nombres. Se reproduce en cada carga y respeta prefers-reduced-motion.
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
  const [fit, setFit] = useState(1);

  useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Deja margen lateral y espacio vertical para que la carta quepa al subir.
      const s = Math.min(1, (vw - 56) / W, (vh - 180) / (H + CARD_RISE));
      setFit(Math.max(0.55, s));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const finish = useCallback(() => {
    document.documentElement.classList.remove("intro-lock");
    setShow(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("intro-lock");
    const hold = reduce ? 1200 : 6600;
    const timer = window.setTimeout(finish, hold);

    return () => {
      window.clearTimeout(timer);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [finish, reduce]);

  // Línea de tiempo (segundos).
  const sealBreak = 1.45;
  const flapOpen = 1.75;
  const letterOut = 2.7;
  const textStart = 3.5;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-scene fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.85, ease: EASE } }}
          aria-label="Invitación de boda"
        >
          <div className="intro-scene-glow pointer-events-none absolute inset-0" aria-hidden="true" />

          {reduce ? (
            <ReducedIntro name1={name1} name2={name2} dateLine={dateLine} />
          ) : (
            <div
              className="relative flex items-center justify-center"
              style={{ transform: `scale(${fit})` }}
            >
              {/* Sombra proyectada bajo el sobre */}
              <motion.div
                className="pointer-events-none absolute rounded-[50%] bg-black/50 blur-2xl"
                style={{ width: W * 0.9, height: 30, top: H / 2 + 26 }}
                initial={{ opacity: 0, scaleX: 0.35 }}
                animate={{ opacity: [0, 0.6, 0.5], scaleX: [0.35, 1.05, 1] }}
                transition={{ duration: 1.15, times: [0, 0.85, 1], ease: EASE }}
                aria-hidden="true"
              />

              {/* Escenario 3D del sobre */}
              <motion.div
                className="relative"
                style={{ width: W, height: H, perspective: 1100 }}
                initial={{ y: "52vh", x: 40, rotateZ: -12, scale: 0.45, opacity: 0 }}
                animate={{
                  y: [null, -8, 0],
                  x: 0,
                  rotateZ: 0,
                  scale: 1,
                  opacity: 1,
                }}
                transition={{
                  duration: 1.15,
                  ease: EASE,
                  y: { duration: 1.15, times: [0, 0.82, 1], ease: EASE },
                }}
              >
                {/* Cuerpo trasero del sobre */}
                <div
                  className="absolute inset-0 rounded-[3px]"
                  style={{
                    background:
                      "linear-gradient(158deg, #f0e7d5 0%, #e2d6bd 52%, #d3c4a6 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -20px 40px rgba(140,116,72,0.12), 0 22px 46px rgba(0,0,0,0.42)",
                  }}
                  aria-hidden="true"
                />

                {/* Carta interior con el texto */}
                <motion.div
                  className="absolute rounded-[3px] text-center"
                  style={{
                    left: CARD_INSET,
                    right: CARD_INSET,
                    top: CARD_TOP,
                    height: CARD_H,
                    zIndex: 2,
                    background:
                      "linear-gradient(180deg, #fdfbf6 0%, #f7f1e6 60%, #f2ebdb 100%)",
                    boxShadow:
                      "0 1px 2px rgba(0,0,0,0.08), 0 10px 22px rgba(0,0,0,0.14)",
                  }}
                  initial={{ y: 0 }}
                  animate={{ y: -CARD_RISE }}
                  transition={{ delay: letterOut, duration: 1.05, ease: EASE }}
                >
                  <motion.div
                    className="flex h-full flex-col items-center justify-center px-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: textStart - 0.15, duration: 0.6, ease: EASE }}
                  >
                    <motion.p
                      className="text-[9px] uppercase tracking-[0.5em] text-sage/80 sm:text-[10px]"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: textStart, duration: 0.7, ease: EASE }}
                    >
                      {dateLine}
                    </motion.p>

                    <h1 className="mt-3 font-display leading-[0.9] text-charcoal">
                      <motion.span
                        className="block text-3xl sm:text-4xl"
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: textStart + 0.15, duration: 0.8, ease: EASE }}
                      >
                        {name1}
                      </motion.span>
                      <motion.span
                        className="my-0.5 block font-script text-xl text-gold sm:text-2xl"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: textStart + 0.32, duration: 0.6, ease: EASE }}
                      >
                        &amp;
                      </motion.span>
                      <motion.span
                        className="block text-3xl sm:text-4xl"
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: textStart + 0.48, duration: 0.8, ease: EASE }}
                      >
                        {name2}
                      </motion.span>
                    </h1>

                    <motion.div
                      className="mt-3 h-px w-20 origin-center bg-gold/60"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ delay: textStart + 0.7, duration: 0.7, ease: EASE }}
                    />
                  </motion.div>
                </motion.div>

                {/* Panel frontal: bolsillo inferior + triángulos laterales (tapan la carta) */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0"
                  style={{
                    height: POCKET_H,
                    zIndex: 4,
                    background: "linear-gradient(180deg, #ddceb1 0%, #cbba98 100%)",
                    clipPath: "polygon(0 100%, 50% 8%, 100% 100%)",
                    boxShadow: "inset 0 6px 10px rgba(255,255,255,0.25)",
                    filter: "drop-shadow(0 -1px 3px rgba(0,0,0,0.1))",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 left-0"
                  style={{
                    width: "52%",
                    zIndex: 3,
                    background: "linear-gradient(96deg, #d8caab 0%, #e4d8bf 88%, transparent 100%)",
                    clipPath: "polygon(0 0, 96% 50%, 0 100%)",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 right-0"
                  style={{
                    width: "52%",
                    zIndex: 3,
                    background: "linear-gradient(264deg, #d8caab 0%, #e4d8bf 88%, transparent 100%)",
                    clipPath: "polygon(100% 0, 4% 50%, 100% 100%)",
                  }}
                  aria-hidden="true"
                />

                {/* Solapa superior (se abre y luego queda detrás de la carta) */}
                <motion.div
                  className="pointer-events-none absolute left-0 right-0 top-0"
                  style={{
                    height: FLAP_H,
                    transformStyle: "preserve-3d",
                    transformOrigin: "top center",
                  }}
                  initial={{ rotateX: 0, zIndex: 5 }}
                  animate={{ rotateX: -180, zIndex: 0 }}
                  transition={{
                    rotateX: { delay: flapOpen, duration: 0.9, ease: EASE_FLAP },
                    zIndex: { delay: flapOpen + 0.55, duration: 0.01 },
                  }}
                >
                  {/* Cara exterior */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, #e8dcc4 0%, #d3c4a6 100%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      boxShadow: "inset 0 2px 3px rgba(255,255,255,0.35)",
                      filter: "drop-shadow(0 5px 7px rgba(0,0,0,0.18))",
                    }}
                  />
                  {/* Cara interior (visible al abrir) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, #c2b192 0%, #ad9b7c 100%)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      transform: "rotateX(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  />

                  {/* Sello de cera sobre la solapa */}
                  <motion.div
                    className="absolute left-1/2 flex items-center justify-center rounded-full"
                    style={{
                      bottom: 8,
                      width: 46,
                      height: 46,
                      marginLeft: -23,
                      background:
                        "radial-gradient(circle at 35% 28%, #eccd7d, #b8924f 46%, #866229 100%)",
                      boxShadow:
                        "inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.25), 0 3px 8px rgba(0,0,0,0.3)",
                      transform: "translateZ(2px)",
                    }}
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: [1, 1.12, 0.2], opacity: [1, 1, 0] }}
                    transition={{
                      delay: sealBreak,
                      duration: 0.45,
                      times: [0, 0.35, 1],
                      ease: EASE,
                    }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-serif text-xs font-light text-charcoal/70"
                      style={{ transform: "rotate(-6deg)" }}
                    >
                      {sealMonogram(name1, name2)}
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReducedIntro({
  name1,
  name2,
  dateLine,
}: {
  name1: string;
  name2: string;
  dateLine: string;
}) {
  return (
    <div className="px-6 text-center">
      <motion.p
        className="text-[10px] uppercase tracking-[0.55em] text-gold-light/90 sm:text-xs"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {dateLine}
      </motion.p>
      <h1 className="mt-5 font-display leading-[0.9] text-cream">
        <motion.span
          className="block text-6xl sm:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {name1}
        </motion.span>
        <motion.span
          className="my-1 block font-script text-4xl text-gold-light sm:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          &amp;
        </motion.span>
        <motion.span
          className="block text-6xl sm:text-7xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {name2}
        </motion.span>
      </h1>
    </div>
  );
}
