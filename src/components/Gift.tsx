"use client";

import { FadeIn } from "./motion";
import { SectionDivider } from "./SectionDivider";

const MERCADO_PAGO_URL = "https://link.mercadopago.cl/gabrielayjuancamilo";

export function Gift() {
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
            Un detalle especial
          </p>
          <SectionDivider variant="ampersand" className="mt-3 text-gold-light" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.15] md:text-5xl">
            Tu compañía es nuestro <span className="font-script italic text-gold-light">mayor</span> regalo
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 rounded-3xl border border-cream/15 bg-cream/5 p-8 text-center backdrop-blur-sm md:p-10">
            <p className="text-cream/85 md:text-lg">
              Ya tenemos lo básico para nuestro hogar, pero si desean hacernos un obsequio,
              recibiremos con mucho cariño un aporte para nuestra luna de miel y futuros
              proyectos juntos.
            </p>
            <a
              href={MERCADO_PAGO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 font-medium text-charcoal shadow-md transition hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-lg focus-visible:outline-cream"
            >
              Contribuir vía Mercado Pago
            </a>
            <p className="mt-4 text-xs text-cream/60">
              link.mercadopago.cl/gabrielayjuancamilo
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
