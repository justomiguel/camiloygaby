"use client";

import type { SiteContent } from "@/lib/content/types";
import { FadeIn } from "./motion";
import { RsvpForm } from "./RsvpForm";
import { SectionDivider } from "./SectionDivider";

type RsvpContent = SiteContent["rsvp"];

export function RsvpSection({ content }: { content: RsvpContent }) {
  return (
    <section
      id="confirmacion"
      className="scroll-mt-24 bg-cream px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            {content.eyebrow}
          </p>
          <SectionDivider variant="ampersand" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            {content.title}{" "}
            <span className="font-script italic text-sage-dark">{content.titleAccent}</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-charcoal/80">{content.description}</p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="mt-10">
            <RsvpForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
