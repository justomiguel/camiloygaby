"use client";

import Image from "next/image";
import { FadeIn, FadeInImage } from "./motion";
import { SectionDivider } from "./SectionDivider";

export function Music() {
  return (
    <section
      id="musica"
      className="relative scroll-mt-24 overflow-hidden bg-charcoal px-5 py-20 text-cream md:py-28"
    >
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,146,79,0.5),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(91,111,90,0.45),transparent_55%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold-light">
            Nuestra música
          </p>
          <SectionDivider variant="diamond" className="mt-3 text-gold-light" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] md:text-5xl">
            Vamos a <span className="font-script italic text-gold-light">cantar</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-cream/80 md:text-lg">
            La música es lo que nos unió y lo que queremos compartir con ustedes esa noche.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-10">
          <FadeInImage className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-cream/10">
            <Image
              src="/fotos/gabriela-cantando.jpg"
              alt="Gabriela cantando en escenario"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-light">
                Gabriela en escena
              </p>
              <p className="mt-2 font-serif text-2xl italic md:text-3xl">
                Su voz cuenta historias.
              </p>
            </div>
          </FadeInImage>

          <FadeInImage className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-xl ring-1 ring-cream/10 md:mt-12">
            <Image
              src="/fotos/juancamilo-guitarra.jpg"
              alt="Juan Camilo tocando guitarra en una banda"
              fill
              sizes="(min-width: 768px) 45vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold-light">
                Juan Camilo en escena
              </p>
              <p className="mt-2 font-serif text-2xl italic md:text-3xl">
                Cada acorde es una promesa.
              </p>
            </div>
          </FadeInImage>
        </div>
      </div>
    </section>
  );
}
