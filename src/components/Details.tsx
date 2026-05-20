"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

const items = [
  {
    label: "Fecha",
    value: "Sábado",
    accent: "19 · 12 · 2026",
  },
  {
    label: "Hora",
    value: "19:00",
    accent: "Ceremonia y celebración",
  },
  {
    label: "Lugar",
    value: "Route G25",
    accent: "San José de Maipo",
  },
];

export function Details() {
  return (
    <section
      id="lugar"
      className="scroll-mt-24 bg-sage-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            El gran día
          </p>
          <SectionDivider variant="ampersand" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            Lugar <span className="font-script italic text-sage-dark">y</span> horario
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/80 md:text-lg">
            Vamos a compartir y vamos a cantar.
          </p>
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
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
