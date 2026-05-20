"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export function RsvpForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [asiste, setAsiste] = useState<boolean | null>(null);
  const [quiereCantar, setQuiereCantar] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      nombre: String(data.get("nombre") ?? ""),
      acompanante: String(data.get("acompanante") ?? ""),
      asiste,
      vegetariano: data.get("vegetariano") === "on",
      quiere_cantar: data.get("quiere_cantar") === "on",
      pista_cantar: String(data.get("pista_cantar") ?? ""),
    };

    if (asiste === null) {
      setErrorMessage("Por favor indica si nos acompañas.");
      setState("error");
      return;
    }

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Error al enviar");
      }

      setState("success");
      form.reset();
      setAsiste(null);
      setQuiereCantar(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Error al enviar el formulario",
      );
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="card-elevated p-8 text-center md:p-10">
        <p className="font-serif text-3xl text-charcoal md:text-4xl">¡Gracias por confirmar!</p>
        <p className="mt-3 text-charcoal/75 md:text-lg">
          Tu respuesta fue registrada. Nos emociona contar contigo en este día tan especial.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-medium text-sage-dark underline-offset-4 hover:underline focus-visible:outline-sage"
        >
          Enviar otra confirmación
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-elevated p-6 md:p-8"
      aria-label="Formulario de confirmación de asistencia"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-charcoal">
            Tu nombre *
          </label>
          <input
            id="nombre"
            name="nombre"
            required
            minLength={2}
            className="w-full rounded-xl border border-sage/25 bg-cream/50 px-4 py-3 text-charcoal outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
            placeholder="Nombre y apellido"
          />
        </div>

        <div>
          <label htmlFor="acompanante" className="mb-1.5 block text-sm font-medium text-charcoal">
            Nombre de acompañante
          </label>
          <input
            id="acompanante"
            name="acompanante"
            className="w-full rounded-xl border border-sage/25 bg-cream/50 px-4 py-3 text-charcoal outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
            placeholder="Opcional"
          />
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-medium text-charcoal">¿Nos acompañas? *</legend>
          <div className="flex flex-wrap gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-sage/25 px-4 py-2 transition has-[:checked]:border-sage has-[:checked]:bg-sage/10">
              <input
                type="radio"
                name="asiste_choice"
                checked={asiste === true}
                onChange={() => setAsiste(true)}
                className="accent-sage"
              />
              <span>Sí, ahí estaré</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-full border border-sage/25 px-4 py-2 transition has-[:checked]:border-sage has-[:checked]:bg-sage/10">
              <input
                type="radio"
                name="asiste_choice"
                checked={asiste === false}
                onChange={() => setAsiste(false)}
                className="accent-sage"
              />
              <span>No podré asistir</span>
            </label>
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sage/20 bg-paper/60 p-4 transition has-[:checked]:border-sage has-[:checked]:bg-sage-tint">
          <input
            type="checkbox"
            name="vegetariano"
            className="mt-1 accent-sage"
          />
          <span>
            <span className="block font-medium text-charcoal">¿Vegetariano/a?</span>
            <span className="text-sm text-charcoal/75">
              Marca esta opción para que podamos considerar tu menú.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-sage/20 bg-paper/60 p-4 transition has-[:checked]:border-sage has-[:checked]:bg-sage-tint">
          <input
            type="checkbox"
            name="quiere_cantar"
            checked={quiereCantar}
            onChange={(e) => setQuiereCantar(e.target.checked)}
            className="mt-1 accent-sage"
          />
          <span>
            <span className="block font-medium text-charcoal">¿Quieres cantar ese día?</span>
            <span className="text-sm text-charcoal/75">
              Envíanos tu pista y nos encargamos del resto.
            </span>
          </span>
        </label>

        {quiereCantar && (
          <div>
            <label htmlFor="pista_cantar" className="mb-1.5 block text-sm font-medium text-charcoal">
              Nombre de tu pista *
            </label>
            <input
              id="pista_cantar"
              name="pista_cantar"
              required={quiereCantar}
              className="w-full rounded-xl border border-sage/25 bg-cream/50 px-4 py-3 text-charcoal outline-none transition focus:border-sage focus:ring-2 focus:ring-sage/20"
              placeholder="Artista — canción"
            />
          </div>
        )}
      </div>

      {state === "error" && errorMessage && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-6 w-full rounded-full bg-sage px-6 py-3.5 font-medium text-white transition hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-sage"
      >
        {state === "submitting" ? "Enviando..." : "Confirmar asistencia"}
      </button>

      <p className="mt-4 text-center text-xs text-charcoal/65">
        Por favor confirmar hasta el 30 de noviembre de 2026
      </p>
    </form>
  );
}
