"use client";

import Link from "next/link";
import type { SiteContent } from "@/lib/content/types";
import { FadeIn } from "./motion";

type FooterContent = SiteContent["footer"];

function renderQuoteWithAccent(quote: string, accent: string) {
  const index = quote.indexOf(accent);
  if (index === -1) return quote;

  return (
    <>
      {quote.slice(0, index)}
      <span className="font-script not-italic">&lsquo;{accent}&rsquo;</span>
      {quote.slice(index + accent.length)}
    </>
  );
}

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-sage/15 bg-cream px-5 py-20 text-center">
      <FadeIn>
        <div className="decorative-line mx-auto mb-10 max-w-xs" />
        <blockquote className="mx-auto max-w-2xl font-serif text-2xl italic leading-relaxed text-charcoal/80 md:text-3xl">
          &ldquo;
          {renderQuoteWithAccent(content.quote, content.quoteAccent)}
          &rdquo;
        </blockquote>
        <div className="mt-12 flex items-center justify-center gap-3 font-script text-gold">
          <span className="text-4xl md:text-5xl">{content.name1}</span>
          <span className="text-3xl text-gold/75 md:text-4xl">&amp;</span>
          <span className="text-4xl md:text-5xl">{content.name2}</span>
        </div>
        <p className="mt-3 text-xs tracking-[0.4em] text-charcoal/45 uppercase">
          {content.dateLine}
        </p>
        <p className="mt-10">
          <Link
            href="/admin/login"
            className="text-[10px] uppercase tracking-[0.35em] text-charcoal/25 transition hover:text-charcoal/50"
          >
            Administración
          </Link>
        </p>
      </FadeIn>
    </footer>
  );
}
