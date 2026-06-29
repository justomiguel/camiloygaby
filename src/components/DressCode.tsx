"use client";

import type { SiteContent } from "@/lib/content/types";
import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

type DressCodeContent = SiteContent["dressCode"];

export function DressCode({ content }: { content: DressCodeContent }) {
  return (
    <section
      id="dress-code"
      className="scroll-mt-24 bg-gold-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-charcoal/70">
            {content.eyebrow}
          </p>
          <SectionDivider variant="diamond" className="mt-3 text-gold" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            <span className="font-script italic text-gold">{content.title}</span>
            -{content.titleAccent}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/80 md:text-lg">
            {content.description}
          </p>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2">
          <StaggerItem>
            <div className="card-elevated p-8">
              <h3 className="font-serif text-2xl text-charcoal md:text-3xl">
                {content.womenTitle}
              </h3>
              <div className="mt-3 h-px w-12 bg-gold/70" />
              <p className="mt-4 text-charcoal/80">{content.womenBody}</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="card-elevated p-8">
              <h3 className="font-serif text-2xl text-charcoal md:text-3xl">
                {content.menTitle}
              </h3>
              <div className="mt-3 h-px w-12 bg-gold/70" />
              <p className="mt-4 text-charcoal/80">{content.menBody}</p>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
