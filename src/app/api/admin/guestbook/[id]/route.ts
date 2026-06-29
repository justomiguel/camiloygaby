import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  createServerSupabaseClient,
  type GuestbookMessage,
} from "@/lib/supabase/server";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  let body: { is_private?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (typeof body.is_private !== "boolean") {
    return NextResponse.json(
      { error: "Indica si el mensaje es privado o público." },
      { status: 400 },
    );
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("guestbook_messages")
    .update({ is_private: body.is_private })
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Mensaje no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ message: data as GuestbookMessage });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await context.params;

  const supabase = createServerSupabaseClient();
  const { error, count } = await supabase
    .from("guestbook_messages")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!count) {
    return NextResponse.json({ error: "Mensaje no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
