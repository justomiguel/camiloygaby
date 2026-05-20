"use client";

import Image from "next/image";
import { FadeIn, FadeInImage } from "./motion";
import { SectionDivider } from "./SectionDivider";

export function Story() {
  return (
    <section
      id="historia"
      className="scroll-mt-24 bg-cream px-5 py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <FadeInImage className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl shadow-xl ring-1 ring-charcoal/5 md:order-2">
          <Image
            src="/fotos/mendoza.jpg"
            alt="Gabriela y Juan Camilo en Mendoza"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute -bottom-3 -left-3 hidden rounded-2xl bg-cream px-4 py-2 font-serif text-sm italic text-charcoal shadow-md md:block">
            Mendoza, 2022
          </div>
        </FadeInImage>

        <div className="md:order-1">
          <FadeIn>
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
              Nuestra historia
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <SectionDivider variant="ampersand" className="mt-3 justify-start" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-3 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl lg:text-6xl">
              4 años aprendiendo a bailar la misma canción
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-7 space-y-5 text-base leading-relaxed text-charcoal/85 md:text-lg">
              <p>
                Después de 4 años juntos, hemos decidido dar el gran paso. Queremos invitarlos
                a celebrar y compartir nuestro amor y nuestra música.
              </p>
              <p>Esperamos contar con ustedes este día tan especial para nosotros.</p>
              <blockquote className="border-l-2 border-gold/70 pl-5 font-serif text-xl italic leading-snug text-charcoal/80 md:text-2xl">
                El matrimonio es ese gran paso que mezcla amor, compromiso y, seamos honestos,
                una buena dosis de paciencia y humor.
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
