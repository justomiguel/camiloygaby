"use client";

import Image from "next/image";
import { FadeIn, StaggerChildren, StaggerItem } from "./motion";
import { SectionDivider } from "./SectionDivider";

const people = [
  {
    name: "Gabriela",
    photo: "/fotos/gabriela-retrato.jpg",
    description:
      "La voz de la casa. Soñadora, intensa y con una risa que llena cualquier escenario.",
    accent: "Ella canta",
  },
  {
    name: "Juan Camilo",
    photo: "/fotos/juancamilo-retrato.png",
    description:
      "Las cuerdas y el ritmo. Calmado, leal y con un humor que hace todo más liviano.",
    accent: "Él toca",
  },
];

export function Couple() {
  return (
    <section className="bg-sage-soft px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            Los protagonistas
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <SectionDivider variant="diamond" className="mt-3" />
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-2 text-center font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            Dos voces, <span className="font-script italic text-sage-dark">una</span> historia
          </h2>
        </FadeIn>

        <StaggerChildren className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {people.map((person) => (
            <StaggerItem key={person.name}>
              <article className="group relative overflow-hidden rounded-3xl bg-cream shadow-lg ring-1 ring-charcoal/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={person.photo}
                    alt={`Retrato de ${person.name}`}
                    fill
                    sizes="(min-width: 768px) 40vw, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/55 to-transparent" />
                </div>
                <div className="space-y-2 p-6 md:p-8">
                  <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-gold">
                    {person.accent}
                  </p>
                  <h3 className="font-serif text-3xl text-charcoal md:text-4xl">
                    {person.name}
                  </h3>
                  <p className="text-charcoal/80">{person.description}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
