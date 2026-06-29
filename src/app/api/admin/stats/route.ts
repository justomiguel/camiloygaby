import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/content/defaults";
import { buildAdminStats } from "@/lib/analytics/build-stats";
import { createAuthServerClient } from "@/lib/supabase/server";

async function requireAdmin() {
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

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const stats = await buildAdminStats();
    return NextResponse.json(stats);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al cargar estadísticas";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
