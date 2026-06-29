import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import { validateRsvpPayload } from "@/lib/rsvp/validate";
import { createServerSupabaseClient, type RsvpInsert } from "@/lib/supabase/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  let body: Partial<RsvpInsert>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const validated = validateRsvpPayload(body);
  if (validated.error || !validated.data) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("rsvps")
    .update(validated.data)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Confirmación no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ rsvp: data });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  const supabase = createServerSupabaseClient();
  const { error, count } = await supabase
    .from("rsvps")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!count) {
    return NextResponse.json({ error: "Confirmación no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
