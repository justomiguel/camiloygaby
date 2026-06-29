"use client";

import type { SiteContent } from "@/lib/content/types";
import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

type FaqContent = SiteContent["faq"];

export function Faq({ content }: { content: FaqContent }) {
  return (
    <section
      id="info"
      className="scroll-mt-24 bg-sage-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            {content.eyebrow}
          </p>
          <SectionDivider variant="leaf" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            <span className="font-script italic text-sage-dark">{content.title}</span>{" "}
            {content.titleAccent}
          </h2>
        </FadeIn>

        <StaggerChildren className="mt-12 space-y-4">
          {content.items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card-elevated p-6 md:p-7">
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-charcoal/80">{item.body}</p>
              </div>
            </StaggerItem>
          ))}

          <StaggerItem>
            <div className="card-elevated p-6 md:p-7">
              <h3 className="font-serif text-2xl text-charcoal">{content.lodgingTitle}</h3>
              <p className="mt-2 text-charcoal/80">{content.lodgingBody}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={content.lodgingInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-sage/30 px-4 py-2 text-sm font-medium text-sage-dark transition hover:border-sage hover:bg-sage/10"
                >
                  Instagram @routeg25
                </a>
                <a
                  href={`tel:${content.lodgingPhone}`}
                  className="rounded-full border border-sage/30 px-4 py-2 text-sm font-medium text-sage-dark transition hover:border-sage hover:bg-sage/10"
                >
                  {content.lodgingPhone}
                </a>
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
