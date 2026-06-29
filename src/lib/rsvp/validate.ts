import type { RsvpInsert } from "@/lib/supabase/server";

export function validateRsvpPayload(body: Partial<RsvpInsert>): {
  data?: RsvpInsert;
  error?: string;
} {
  const nombre = body.nombre?.trim();
  if (!nombre || nombre.length < 2) {
    return { error: "El nombre es obligatorio" };
  }

  if (typeof body.asiste !== "boolean") {
    return { error: "Indica si asiste o no" };
  }

  const quiereCantar = Boolean(body.quiere_cantar);
  const pista = body.pista_cantar?.trim() || null;

  if (quiereCantar && !pista) {
    return { error: "Si quiere cantar, la pista es obligatoria" };
  }

  return {
    data: {
      nombre,
      acompanante: body.acompanante?.trim() || null,
      asiste: body.asiste,
      vegetariano: Boolean(body.vegetariano),
      quiere_cantar: quiereCantar,
      pista_cantar: quiereCantar ? pista : null,
    },
  };
}
