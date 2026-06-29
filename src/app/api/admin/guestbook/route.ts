import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/require-admin";
import {
  createServerSupabaseClient,
  type GuestbookMessage,
} from "@/lib/supabase/server";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("guestbook_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: (data ?? []) as GuestbookMessage[] });
}
