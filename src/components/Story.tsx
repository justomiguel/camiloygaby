"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { SiteContent } from "@/lib/content/types";
import { FadeIn, MaskReveal, Reveal, WordsReveal } from "./motion";
import { ParallaxImage } from "./ParallaxImage";
import { SectionDivider } from "./SectionDivider";

type StoryContent = SiteContent["story"];

export function Story({ content }: { content: StoryContent }) {
  const reduce = useReducedMotion();
  if (reduce) return <StoryStatic content={content} />;
  return <StoryPinned content={content} />;
}

/**
 * Escena "pinned": la sección se fija mientras el contenido narrativo avanza
 * por beats (párrafo 1 → párrafo 2 → cita) sobre la foto con efecto ken burns.
 */
function StoryPinned({ content }: { content: StoryContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1.36]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  const beat0 = useTransform(scrollYProgress, [0.02, 0.1, 0.26, 0.34], [0, 1, 1, 0]);
  const beat0Y = useTransform(scrollYProgress, [0.02, 0.34], ["18px", "-18px"]);
  const beat1 = useTransform(scrollYProgress, [0.36, 0.44, 0.58, 0.66], [0, 1, 1, 0]);
  const beat1Y = useTransform(scrollYProgress, [0.36, 0.66], ["18px", "-18px"]);
  const beat2 = useTransform(scrollYProgress, [0.68, 0.76, 0.96, 1], [0, 1, 1, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.68, 1], ["18px", "0px"]);

  return (
    <section id="historia" ref={ref} className="relative h-[300vh] bg-charcoal">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
          <Image
            src="/fotos/mendoza.jpg"
            alt="Gabriela y Juan Camilo en Mendoza"
            fill
            sizes="100vw"
            className="object-cover object-[50%_32%]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/85" />

        <div className="relative mx-auto w-full max-w-3xl px-6 text-center text-cream">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs font-medium uppercase tracking-[0.4em] text-gold-light/90"
          >
            {content.eyebrow}
          </motion.p>
          <SectionDivider variant="ampersand" className="mt-3" />
          <WordsReveal
            as="h2"
            text={content.title}
            className="mx-auto mt-3 max-w-2xl font-serif text-4xl italic leading-[1.1] text-cream drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] md:text-5xl"
          />

          <div className="relative mx-auto mt-10 h-44 max-w-2xl sm:h-40 md:h-36">
            <motion.p
              style={{ opacity: beat0, y: beat0Y }}
              className="absolute inset-0 flex items-center justify-center text-lg leading-relaxed text-cream/90 md:text-xl"
            >
              {content.paragraph1}
            </motion.p>
            <motion.p
              style={{ opacity: beat1, y: beat1Y }}
              className="absolute inset-0 flex items-center justify-center text-lg leading-relaxed text-cream/90 md:text-xl"
            >
              {content.paragraph2}
            </motion.p>
            <motion.blockquote
              style={{ opacity: beat2, y: beat2Y }}
              className="absolute inset-0 flex items-center justify-center font-serif text-2xl italic leading-snug text-cream md:text-3xl"
            >
              &ldquo;{content.quote}&rdquo;
            </motion.blockquote>
          </div>

          <div className="mx-auto mt-8 h-px w-44 overflow-hidden bg-cream/20">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full w-full bg-gold-light"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Versión estática accesible (prefers-reduced-motion). */
function StoryStatic({ content }: { content: StoryContent }) {
  return (
    <section id="historia" className="scroll-mt-24 bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative mx-auto w-full max-w-md md:order-2">
          <MaskReveal
            direction="left"
            className="aspect-[3/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-charcoal/5"
          >
            <ParallaxImage
              src="/fotos/mendoza.jpg"
              alt="Gabriela y Juan Camilo en Mendoza"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="h-full w-full"
              strength={12}
            />
          </MaskReveal>
          <div className="absolute -bottom-3 -left-3 hidden rounded-2xl bg-cream px-4 py-2 font-serif text-sm italic text-charcoal shadow-md md:block">
            {content.photoCaption}
          </div>
        </div>

        <div className="md:order-1">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
              {content.eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <SectionDivider variant="ampersand" className="mt-3 justify-start" />
          </FadeIn>
          <WordsReveal
            as="h2"
            text={content.title}
            delay={0.1}
            className="mt-3 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl lg:text-6xl"
          />
          <Reveal direction="up" delay={0.2}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-charcoal/85 md:text-lg">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
              <blockquote className="border-l-2 border-gold/70 pl-5 font-serif text-xl italic leading-snug text-charcoal/80 md:text-2xl">
                {content.quote}
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
