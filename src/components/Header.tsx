"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#historia", label: "Nosotros" },
  { href: "#musica", label: "Música" },
  { href: "#lugar", label: "Lugar" },
  { href: "#confirmacion", label: "Confirmar" },
];

export function Header() {
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          G <span className="font-script text-2xl text-gold">&amp;</span> JC
        </a>

        <ul className="hidden gap-7 text-sm md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`transition ${
                  scrolled
                    ? "text-charcoal/80 hover:text-sage-dark"
                    : "text-cream/95 hover:text-cream drop-shadow"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
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
        className="h-px origin-left bg-gold/70"
        aria-hidden="true"
      />

      {open && (
        <div className="border-t border-sage/15 bg-cream/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-charcoal/80 transition hover:bg-sage/10 hover:text-sage-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
