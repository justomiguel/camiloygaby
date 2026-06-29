"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content/types";

type HeaderContent = SiteContent["header"];

export function Header({ content }: { content: HeaderContent }) {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = content.links
      .map((link) => link.href)
      .filter((href) => href.startsWith("#"))
      .map((href) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [content.links]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled
          ? "border-b border-sage/15 bg-cream/95 backdrop-blur-md"
          : "bg-gradient-to-b from-charcoal/30 to-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:py-4"
      >
        <a
          href="#inicio"
          className={`font-serif text-xl tracking-wide transition ${
            scrolled ? "text-charcoal" : "text-cream drop-shadow"
          }`}
        >
          {content.logoLeft}{" "}
          <span className="font-script text-2xl text-gold">&amp;</span>{" "}
          {content.logoRight}
        </a>

        <ul className="hidden gap-7 text-sm md:flex">
          {content.links.map((link) => {
            const active = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`group relative transition ${
                    scrolled
                      ? active
                        ? "text-sage-dark"
                        : "text-charcoal/80 hover:text-sage-dark"
                      : active
                        ? "text-cream drop-shadow"
                        : "text-cream/95 hover:text-cream drop-shadow"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full p-2 md:hidden ${
            scrolled ? "text-charcoal" : "text-cream"
          }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      <motion.div
        style={{ width: progressWidth }}
        className="h-0.5 origin-left bg-gradient-to-r from-gold/40 via-gold to-gold-light"
        aria-hidden="true"
      />

      {open && (
        <div className="border-t border-sage/15 bg-cream/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-3">
            {content.links.map((link) => {
              const active = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "true" : undefined}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2.5 transition hover:bg-sage/10 hover:text-sage-dark ${
                      active ? "bg-sage/10 text-sage-dark" : "text-charcoal/80"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-gold transition-opacity ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
