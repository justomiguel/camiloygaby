import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Faltan variables de entorno de Supabase");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type RsvpInsert = {
  nombre: string;
  acompanante?: string | null;
  asiste: boolean;
  vegetariano: boolean;
  quiere_cantar: boolean;
  pista_cantar?: string | null;
};
