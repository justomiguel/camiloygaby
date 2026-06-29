import { NextResponse } from "next/server";
import { validateRsvpPayload } from "@/lib/rsvp/validate";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = validateRsvpPayload(body);
    if (validated.error || !validated.data) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("rsvps").insert(validated.data);

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
