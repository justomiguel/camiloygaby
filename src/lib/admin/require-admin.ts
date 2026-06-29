import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/content/defaults";
import { createAuthServerClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createAuthServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return { error: NextResponse.json({ error: "No autorizado" }, { status: 401 }) };
  }

  if (user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return { error: NextResponse.json({ error: "Acceso denegado" }, { status: 403 }) };
  }

  return { user };
}
