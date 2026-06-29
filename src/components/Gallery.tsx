"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { SiteContent } from "@/lib/content/types";
import { FadeIn } from "./motion";
import { SectionDivider } from "./SectionDivider";

type GalleryContent = SiteContent["gallery"];

export function Gallery({ content }: { content: GalleryContent }) {
  const photos = content.photos;
  const autoplay = useMemo(
    () => Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const timeoutId = window.setTimeout(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    }, 0);

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      window.clearTimeout(timeoutId);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const toggleAutoplay = useCallback(() => {
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [autoplay]);

  return (
    <section className="bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            {content.eyebrow}
          </p>
          <SectionDivider variant="leaf" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            {content.title}{" "}
            <span className="font-script not-italic text-sage-dark">{content.titleAccent}</span>{" "}
            siempre
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/75 md:text-lg">
            {content.description}
          </p>
          <p className="sr-only" aria-live="polite">
            Foto {selectedIndex + 1} de {photos.length}: {photos[selectedIndex]?.caption}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative mt-12">
            <div
              className="overflow-hidden"
              ref={emblaRef}
              aria-roledescription="carousel"
              aria-label="Galería de momentos de Gabriela y Juan Camilo"
            >
              <div className="flex">
                {photos.map((photo, idx) => (
                  <div
                    key={`${photo.src}-${idx}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} de ${photos.length}`}
                    className="relative min-w-0 flex-[0_0_85%] px-2 sm:flex-[0_0_70%] md:flex-[0_0_55%] md:px-3 lg:flex-[0_0_45%]"
                  >
                    <article className="relative overflow-hidden rounded-3xl bg-charcoal shadow-2xl ring-1 ring-charcoal/10">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(min-width: 1024px) 45vw, (min-width: 768px) 55vw, 85vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 px-6 pb-7 pt-12 text-cream md:px-8 md:pb-9">
                        <p className="font-serif text-2xl italic leading-tight md:text-3xl">
                          {photo.caption}
                        </p>
                        <p className="mt-2 max-w-md text-sm text-cream/85 md:text-base">
                          {photo.subcaption}
                        </p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Foto anterior"
              onClick={scrollPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-charcoal/15 bg-cream/90 p-3 text-charcoal shadow-lg backdrop-blur-sm transition hover:bg-cream md:left-6 md:p-4"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={scrollNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-charcoal/15 bg-cream/90 p-3 text-charcoal shadow-lg backdrop-blur-sm transition hover:bg-cream md:right-6 md:p-4"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={isPlaying ? "Pausar carrusel de fotos" : "Reanudar carrusel de fotos"}
              aria-pressed={!isPlaying}
              className="rounded-full border border-sage/25 bg-cream px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-sage-dark transition hover:border-sage hover:bg-sage/10"
            >
              {isPlaying ? "Pausar" : "Reanudar"}
            </button>
            <div className="flex items-center justify-center gap-2" aria-label="Selector de fotos">
              {scrollSnaps.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Ir a la foto ${idx + 1}`}
                  aria-current={idx === selectedIndex}
                  onClick={() => scrollTo(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === selectedIndex
                      ? "w-8 bg-sage-dark"
                      : "w-1.5 bg-charcoal/25 hover:bg-charcoal/45"
                  }`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
