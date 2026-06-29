"use client";

import type { SiteContent } from "@/lib/content/types";
import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

type DetailsContent = SiteContent["details"];

export function Details({ content }: { content: DetailsContent }) {
  return (
    <section
      id="lugar"
      className="scroll-mt-24 bg-sage-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            {content.eyebrow}
          </p>
          <SectionDivider variant="ampersand" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            {content.title}{" "}
            <span className="font-script italic text-sage-dark">{content.titleAccent}</span>{" "}
            horario
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/80 md:text-lg">
            {content.description}
          </p>
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-5 md:grid-cols-3">
          {content.items.map((item) => (
            <StaggerItem key={item.label}>
              <div className="card-elevated p-8 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
                  {item.label}
                </p>
                <p className="mt-4 font-serif text-3xl text-charcoal md:text-4xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-charcoal/70">{item.accent}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
