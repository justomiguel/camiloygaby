"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

export function DressCode() {
  return (
    <section
      id="dress-code"
      className="scroll-mt-24 bg-gold-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-charcoal/70">
            Dress code
          </p>
          <SectionDivider variant="diamond" className="mt-3 text-gold" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            <span className="font-script italic text-gold">Semi</span>-formal
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/80 md:text-lg">
            Queremos que se sientan cómodos y especiales.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-12 grid gap-5 md:grid-cols-2">
          <StaggerItem>
            <div className="card-elevated p-8">
              <h3 className="font-serif text-2xl text-charcoal md:text-3xl">Mujeres</h3>
              <div className="mt-3 h-px w-12 bg-gold/70" />
              <p className="mt-4 text-charcoal/80">
                Vestidos de cualquier largo, enteritos o palazos.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="card-elevated p-8">
              <h3 className="font-serif text-2xl text-charcoal md:text-3xl">Hombres</h3>
              <div className="mt-3 h-px w-12 bg-gold/70" />
              <p className="mt-4 text-charcoal/80">
                Camisa y pantalón. La corbata es opcional.
              </p>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
