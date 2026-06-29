"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  rotate: number;
  opacity: number;
  tone: string;
};

const TONES = [
  "var(--color-gold-light)",
  "var(--color-cream)",
  "var(--color-sage-light)",
  "var(--color-gold-soft)",
];

function buildPetals(count: number): Petal[] {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 12,
    duration: 9 + Math.random() * 9,
    delay: -Math.random() * 16,
    sway: 20 + Math.random() * 50,
    rotate: 120 + Math.random() * 240,
    opacity: 0.25 + Math.random() * 0.4,
    tone: TONES[Math.floor(Math.random() * TONES.length)],
  }));
}

/**
 * Pétalos cayendo muy sutiles sobre el hero. Se generan en el cliente tras el
 * montaje para evitar mismatches de hidratación y se desactivan con
 * prefers-reduced-motion.
 */
export function HeroPetals({ count = 14 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    if (reduce) return;
    setPetals(buildPetals(count));
  }, [count, reduce]);

  if (reduce || petals.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block"
          style={{ left: `${petal.left}%`, width: petal.size, height: petal.size }}
          initial={{ y: "-12vh", opacity: 0 }}
          animate={{
            y: ["-12vh", "112vh"],
            x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.4, 0],
            rotate: [0, petal.rotate],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path
              d="M12 2C8 6 5 11 5 15a7 7 0 0 0 14 0c0-4-3-9-7-13Z"
              fill={petal.tone}
              fillOpacity="0.85"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
