"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Invitación a la boda de Gabriela y Juan Camilo"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-charcoal"
    >
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src="/fotos/pareja-arbol.jpg"
          alt="Gabriela y Juan Camilo bajo un árbol"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_22%]"
        />
      </motion.div>

      <div className="hero-overlay-top pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 md:h-40" />
      <div className="hero-overlay-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-3/5" />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-16 text-center md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[11px] uppercase tracking-[0.5em] text-gold-light/95 sm:text-xs md:text-sm"
        >
          19 · Diciembre · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-display text-cream drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)]"
        >
          <span className="block text-[26vw] leading-[0.9] sm:text-[8rem] md:text-[11rem] lg:text-[14rem]">
            Gabriela
          </span>
          <span className="-mt-3 block font-script text-[16vw] leading-[0.9] text-gold-light drop-shadow-[0_3px_12px_rgba(0,0,0,0.45)] sm:text-[5rem] md:text-[7rem] lg:text-[9rem] md:-mt-6">
            &amp;
          </span>
          <span className="-mt-2 block text-[26vw] leading-[0.9] sm:text-[8rem] md:text-[11rem] lg:text-[14rem]">
            Juan Camilo
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 font-serif text-xl italic text-cream/95 md:text-2xl"
        >
          ¡Nos casamos!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="mt-8 flex items-center justify-center"
        >
          <a
            href="#confirmacion"
            className="rounded-full border border-cream/50 bg-cream/15 px-7 py-3 text-sm font-medium tracking-wide text-cream backdrop-blur-md transition hover:border-cream hover:bg-cream/25 focus-visible:outline-cream"
          >
            Confirmar asistencia
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-cream/70"
            aria-hidden="true"
          >
            <span>scroll</span>
            <span className="h-6 w-px bg-cream/50" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
