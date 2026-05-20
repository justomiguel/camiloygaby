import { NextResponse } from "next/server";
import { createServerSupabaseClient, type RsvpInsert } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RsvpInsert>;

    const nombre = body.nombre?.trim();
    if (!nombre || nombre.length < 2) {
      return NextResponse.json(
        { error: "El nombre es obligatorio" },
        { status: 400 },
      );
    }

    if (typeof body.asiste !== "boolean") {
      return NextResponse.json(
        { error: "Indica si nos acompañas o no" },
        { status: 400 },
      );
    }

    const quiereCantar = Boolean(body.quiere_cantar);
    const pista = body.pista_cantar?.trim() || null;

    if (quiereCantar && !pista) {
      return NextResponse.json(
        { error: "Si quieres cantar, envíanos el nombre de tu pista" },
        { status: 400 },
      );
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("rsvps").insert({
      nombre,
      acompanante: body.acompanante?.trim() || null,
      asiste: body.asiste,
      vegetariano: Boolean(body.vegetariano),
      quiere_cantar: quiereCantar,
      pista_cantar: quiereCantar ? pista : null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "No pudimos guardar tu confirmación. Intenta de nuevo." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado al enviar el formulario" },
      { status: 500 },
    );
  }
}
