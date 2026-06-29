"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Imagen con parallax ligado al scroll. El contenedor recorta y la imagen
 * interna es más alta (overscan) para que el desplazamiento nunca deje huecos.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className = "",
  imgClassName = "object-cover",
  priority = false,
  strength = 14,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `${-strength}%`]);

  const overscan = strength + 6;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute left-0 w-full"
        style={{
          top: `-${overscan}%`,
          height: `${100 + overscan * 2}%`,
          ...(reduce ? {} : { y }),
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={imgClassName} />
      </motion.div>
    </div>
  );
}
