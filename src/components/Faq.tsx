"use client";

import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

const ROUTE_G25_INSTAGRAM = "https://www.instagram.com/routeg25/";
const ROUTE_G25_PHONE = "+56957661602";

const items = [
  {
    title: "¿Pueden venir niños?",
    body: "Esta noche los padres disfrutan y los niños duermen en casa.",
  },
  {
    title: "¿Hasta cuándo confirmo?",
    body: "Por favor confírmanos tu asistencia hasta el 30 de noviembre de 2026.",
  },
];

export function Faq() {
  return (
    <section
      id="info"
      className="scroll-mt-24 bg-sage-soft px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            Otros datos
          </p>
          <SectionDivider variant="leaf" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            <span className="font-script italic text-sage-dark">Buenas</span> a saber
          </h2>
        </FadeIn>

        <StaggerChildren className="mt-12 space-y-4">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <div className="card-elevated p-6 md:p-7">
                <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-2 text-charcoal/80">{item.body}</p>
              </div>
            </StaggerItem>
          ))}

          <StaggerItem>
            <div className="card-elevated p-6 md:p-7">
              <h3 className="font-serif text-2xl text-charcoal">¿Dónde puedo alojar?</h3>
              <p className="mt-2 text-charcoal/80">
                Si necesitas alojamiento para esa noche, Route G25 tiene cabañas. Puedes tomar
                contacto directo con ellos.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={ROUTE_G25_INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-sage/30 px-4 py-2 text-sm font-medium text-sage-dark transition hover:border-sage hover:bg-sage/10"
                >
                  Instagram @routeg25
                </a>
                <a
                  href={`tel:${ROUTE_G25_PHONE}`}
                  className="rounded-full border border-sage/30 px-4 py-2 text-sm font-medium text-sage-dark transition hover:border-sage hover:bg-sage/10"
                >
                  {ROUTE_G25_PHONE}
                </a>
              </div>
            </div>
          </StaggerItem>
        </StaggerChildren>
      </div>
    </section>
  );
}
