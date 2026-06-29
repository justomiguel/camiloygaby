"use client";

import type { SiteContent } from "@/lib/content/types";
import { FadeIn } from "./motion";
import { Magnetic } from "./Magnetic";
import { SectionDivider } from "./SectionDivider";

type GiftContent = SiteContent["gift"];

export function Gift({ content }: { content: GiftContent }) {
  return (
    <section
      id="regalo"
      className="relative scroll-mt-24 overflow-hidden bg-charcoal px-5 py-20 text-cream md:py-28"
    >
      <div className="absolute inset-0 opacity-15" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(184,146,79,0.55),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold-light">
            {content.eyebrow}
          </p>
          <SectionDivider variant="ampersand" className="mt-3 text-gold-light" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.15] md:text-5xl">
            {content.title}{" "}
            <span className="font-script italic text-gold-light">{content.titleAccent}</span>{" "}
            regalo
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 rounded-3xl border border-cream/15 bg-cream/5 p-8 text-center backdrop-blur-sm md:p-10">
            <p className="text-cream/85 md:text-lg">{content.body}</p>
            <Magnetic strength={0.4} className="mt-8">
              <a
                href={content.mercadoPagoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-medium text-charcoal shadow-md transition hover:bg-gold-light hover:shadow-lg focus-visible:outline-cream"
              >
                {content.buttonText}
              </a>
            </Magnetic>
            <p className="mt-4 text-xs text-cream/60">{content.linkLabel}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
