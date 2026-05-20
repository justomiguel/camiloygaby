"use client";

import { FadeIn } from "./motion";

export function Footer() {
  return (
    <footer className="border-t border-sage/15 bg-cream px-5 py-20 text-center">
      <FadeIn>
        <div className="decorative-line mx-auto mb-10 max-w-xs" />
        <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-charcoal/80 md:text-3xl">
          &ldquo;Un gran matrimonio no es cuando una <span className="font-script not-italic">&lsquo;pareja perfecta&rsquo;</span> se une, sino
          cuando una pareja imperfecta aprende a disfrutar de sus diferencias.&rdquo;
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.35em] text-charcoal/60">
          <span>Gabriela</span>
          <span className="font-script text-2xl normal-case tracking-normal text-gold">&amp;</span>
          <span>Juan Camilo</span>
        </div>
        <p className="mt-3 text-xs tracking-[0.4em] text-charcoal/45 uppercase">
          19 · 12 · 2026
        </p>
      </FadeIn>
    </footer>
  );
}
