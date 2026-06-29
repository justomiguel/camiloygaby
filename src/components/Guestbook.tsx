"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/lib/content/types";
import type { PublicGuestbookMessage } from "@/lib/supabase/server";
import { GUESTBOOK_MESSAGE_MAX, GUESTBOOK_NAME_MAX } from "@/lib/guestbook/validate";
import { FadeIn } from "./motion";
import { SectionDivider } from "./SectionDivider";

type GuestbookContent = SiteContent["guestbook"];
type FormState = "idle" | "submitting" | "success" | "error";

const NOTE_TONES = [
  "guestbook-note--cream",
  "guestbook-note--paper",
  "guestbook-note--sage",
  "guestbook-note--gold",
] as const;

function HeartSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7-4.35-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 4.65-7 9-7 9Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuillIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20s1.5-5 6-9.5S19 4 19 4s-1 6-5.5 10.5S4 20 4 20Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M4 20l5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function deterministicSeed(id: string, index: number) {
  let hash = index * 31;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 33 + id.charCodeAt(i)) % 100000;
  }
  return hash;
}

function FloatingNote({
  message,
  index,
  reduce,
}: {
  message: PublicGuestbookMessage;
  index: number;
  reduce: boolean | null;
}) {
  const seed = deterministicSeed(message.id, index);
  const tone = NOTE_TONES[seed % NOTE_TONES.length];
  const tilt = ((seed % 7) - 3) * 0.7; // -2.1deg .. +2.1deg
  const floatDistance = 6 + (seed % 5); // 6px .. 10px
  const duration = 4.5 + (seed % 5) * 0.6; // 4.5s .. 7.1s
  const delay = (seed % 10) * 0.18;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 18, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: Math.min(delay, 0.5), ease: [0.22, 1, 0.36, 1] }}
      className="mb-5 break-inside-avoid"
    >
      <motion.div
        className={`guestbook-note ${tone}`}
        style={{ rotate: `${tilt}deg` }}
        animate={reduce ? undefined : { y: [0, -floatDistance, 0] }}
        transition={
          reduce
            ? undefined
            : { duration, delay, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={reduce ? undefined : { y: -floatDistance - 4, rotate: 0, scale: 1.02 }}
      >
        <span className="guestbook-note__pin" aria-hidden="true" />
        <span className="guestbook-note__quote" aria-hidden="true">
          &ldquo;
        </span>
        <blockquote className="relative mt-3 font-serif text-lg italic leading-snug text-charcoal/85">
          {message.mensaje}
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2.5">
          <span className="guestbook-note__rule" aria-hidden="true" />
          <span className="font-script text-2xl leading-none text-sage-dark">
            {message.nombre}
          </span>
          <HeartSprig className="h-3.5 w-3.5 text-gold" />
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}

export function Guestbook({ content }: { content: GuestbookContent }) {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<PublicGuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("/api/guestbook");
        const data = (await response.json()) as { messages?: PublicGuestbookMessage[] };
        if (active) setMessages(data.messages ?? []);
      } catch {
        /* silencioso: el muro simplemente queda vacío */
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, mensaje }),
      });

      const result = (await response.json()) as {
        message?: PublicGuestbookMessage;
        error?: string;
      };

      if (!response.ok || !result.message) {
        throw new Error(result.error ?? "No pudimos guardar tu deseo.");
      }

      setMessages((prev) => [result.message!, ...prev]);
      setNombre("");
      setMensaje("");
      setState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error al enviar tu deseo.",
      );
      setState("error");
    }
  }

  return (
    <section
      id="deseos"
      className="guestbook-section scroll-mt-24 overflow-hidden px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn className="text-center">
          <div className="flex justify-center">
            <span className="guestbook-seal" aria-hidden="true">
              <span>G&amp;C</span>
            </span>
          </div>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.4em] text-sage-dark">
            {content.eyebrow}
          </p>
          <SectionDivider variant="leaf" className="mt-3" />
          <h2 className="mt-2 font-serif text-4xl italic leading-[1.1] text-charcoal md:text-5xl">
            {content.title}{" "}
            <span className="font-script italic text-gold">{content.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal/80">{content.description}</p>
          {!loading && messages.length > 0 && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-cream/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-sage-dark">
              <HeartSprig className="h-3.5 w-3.5 text-gold" />
              {messages.length}{" "}
              {messages.length === 1 ? "deseo escrito" : "deseos escritos"}
            </p>
          )}
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-xl">
            {state === "success" ? (
              <div className="guestbook-card p-8 text-center md:p-10">
                <div className="relative">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold/12 text-gold">
                    <HeartSprig className="h-7 w-7" />
                  </div>
                  <p className="font-serif text-3xl italic text-charcoal">
                    {content.successTitle}
                  </p>
                  <p className="mt-3 text-charcoal/75">{content.successBody}</p>
                  <button
                    type="button"
                    onClick={() => setState("idle")}
                    className="mt-6 text-sm font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline-sage"
                  >
                    Dejar otro deseo
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="guestbook-card p-7 md:p-9"
                aria-label="Formulario del libro de deseos"
              >
                <div className="relative space-y-5">
                  <p className="text-center font-script text-2xl text-gold">
                    Con cariño
                  </p>
                  <div>
                    <label
                      htmlFor="guestbook-nombre"
                      className="mb-1.5 block font-serif text-sm italic tracking-wide text-charcoal"
                    >
                      Tu nombre
                    </label>
                    <input
                      id="guestbook-nombre"
                      name="nombre"
                      required
                      minLength={2}
                      maxLength={GUESTBOOK_NAME_MAX}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="guestbook-field"
                      placeholder={content.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guestbook-mensaje"
                      className="mb-1.5 block font-serif text-sm italic tracking-wide text-charcoal"
                    >
                      Tu deseo
                    </label>
                    <textarea
                      id="guestbook-mensaje"
                      name="mensaje"
                      required
                      minLength={3}
                      maxLength={GUESTBOOK_MESSAGE_MAX}
                      rows={4}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      className="guestbook-field resize-y"
                      placeholder={content.messagePlaceholder}
                    />
                    <p className="mt-1.5 text-right text-xs text-charcoal/45">
                      {mensaje.length}/{GUESTBOOK_MESSAGE_MAX}
                    </p>
                  </div>

                  {state === "error" && errorMessage && (
                    <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="guestbook-submit flex w-full items-center justify-center gap-2 px-6 py-3.5 font-medium tracking-wide disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-gold"
                  >
                    <QuillIcon className="h-4 w-4" />
                    {state === "submitting" ? "Enviando…" : content.buttonText}
                  </button>
                </div>
              </form>
            )}
          </div>
        </FadeIn>

        <div className="mt-14">
          {loading ? (
            <p className="text-center font-serif text-lg italic text-charcoal/45">
              Cargando deseos…
            </p>
          ) : messages.length === 0 ? (
            <p className="mx-auto max-w-md text-center font-serif text-xl italic text-charcoal/55">
              {content.emptyText}
            </p>
          ) : (
            <div className="guestbook-wall columns-1 gap-5 sm:columns-2 lg:columns-3">
              {messages.map((message, index) => (
                <FloatingNote
                  key={message.id}
                  message={message}
                  index={index}
                  reduce={reduce}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
