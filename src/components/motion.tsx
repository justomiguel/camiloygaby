"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

export function FadeIn({ children, delay = 0, y = 24, className, once = true }: FadeInProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: reduce ? "blur(0px)" : "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type Direction = "up" | "down" | "left" | "right";

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
};

/**
 * Revelado direccional con desenfoque suave. Útil para alternar la dirección
 * de entrada entre secciones y romper la sensación estática.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const base = OFFSETS[direction];
  const scale = distance !== undefined ? distance / 60 : 1;
  const from = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        x: base.x * scale,
        y: base.y * scale,
        filter: "blur(8px)",
      };

  return (
    <motion.div
      className={className}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Revela un encabezado palabra por palabra con un leve desplazamiento.
 * Acepta un acento opcional resaltado al final del texto.
 */
export function WordsReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            aria-hidden="true"
            variants={{
              hidden: { y: reduce ? 0 : "0.9em", opacity: 0 },
              show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </MotionTag>
  );
}

/**
 * Descubre el contenido (idealmente una imagen) con una máscara que se abre.
 */
export function MaskReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  inherit = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
  /**
   * Si está dentro de un padre con variants (p. ej. StaggerChildren), hereda
   * su estado hidden/show en lugar de usar su propio whileInView, que no se
   * dispara de forma fiable cuando está anidado.
   */
  inherit?: boolean;
}) {
  const reduce = useReducedMotion();
  const hiddenClip =
    direction === "left"
      ? "inset(0 100% 0 0)"
      : "inset(100% 0 0 0)";

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    hidden: { clipPath: hiddenClip, scale: 1.06 },
    show: {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      transition: { duration: 1.1, delay, ease: EASE },
    },
  };

  if (inherit) {
    return (
      <motion.div className={className} variants={variants}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function FadeInImage({
  className,
  ...props
}: ComponentProps<typeof motion.div> & { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: reduce ? 1 : 1.06 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE }}
      {...props}
    />
  );
}

export function StaggerChildren({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.14 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 24, filter: reduce ? "blur(0px)" : "blur(6px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
