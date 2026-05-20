"use client";

import { FadeIn } from "./motion";
import { SectionDivider } from "./SectionDivider";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Route+G25+San+Jos%C3%A9+de+Maipo+Chile";
const MAPS_EMBED_QUERY = "Route+G25,+San+José+de+Maipo,+Chile";

export function MapSection({ apiKey }: { apiKey?: string }) {
  return (
    <section
      id="ubicacion"
      className="scroll-mt-24 bg-cream px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            Ubicación
          </p>
          <SectionDivider variant="leaf" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            ¿Cómo <span className="font-script italic text-sage-dark">llegamos</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/75 md:text-lg">
            Restaurante Route G25, en pleno Cajón del Maipo. A unos 50 minutos de Santiago.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-sage/15 shadow-lg ring-1 ring-charcoal/5">
            {apiKey ? (
              <iframe
                title="Mapa de Route G25, San José de Maipo"
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${MAPS_EMBED_QUERY}&zoom=14`}
                width="100%"
                height="480"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full"
              />
            ) : (
              <iframe
                title="Mapa de Route G25, San José de Maipo"
                src="https://www.google.com/maps?q=Route+G25,+San+Jos%C3%A9+de+Maipo,+Chile&output=embed"
                width="100%"
                height="480"
                style={{ border: 0 }}
                loading="lazy"
                className="block w-full"
              />
            )}
          </div>
        </FadeIn>

        <div className="mt-6 text-center">
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-cream px-6 py-3 text-sm font-medium text-charcoal transition hover:border-sage hover:bg-sage/10"
          >
            Abrir en Google Maps
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
