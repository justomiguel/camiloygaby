import { NextResponse } from "next/server";
import { validateGuestbookPayload } from "@/lib/guestbook/validate";
import {
  createServerSupabaseClient,
  type PublicGuestbookMessage,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("guestbook_messages")
      .select("id, nombre, mensaje, created_at")
      .eq("is_private", false)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      messages: (data ?? []) as PublicGuestbookMessage[],
    });
  } catch {
    return NextResponse.json(
      { error: "No pudimos cargar el libro de deseos." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validated = validateGuestbookPayload(body);
    if (validated.error || !validated.data) {
      return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("guestbook_messages")
      .insert(validated.data)
      .select("id, nombre, mensaje, created_at")
      .single();

    if (error) {
      console.error("Guestbook insert error:", error);
      return NextResponse.json(
        { error: "No pudimos guardar tu deseo. Intenta de nuevo." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: data as PublicGuestbookMessage });
  } catch {
    return NextResponse.json(
      { error: "Error inesperado al enviar tu deseo." },
      { status: 500 },
    );
  }
}
