import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
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

export async function createAuthServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Faltan variables de entorno de Supabase");
  }

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // setAll puede fallar en Server Components de solo lectura
        }
      },
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

export type RsvpRecord = RsvpInsert & {
  id: string;
  created_at: string;
};

export type GuestbookInsert = {
  nombre: string;
  mensaje: string;
};

export type GuestbookMessage = GuestbookInsert & {
  id: string;
  is_private: boolean;
  created_at: string;
};

export type PublicGuestbookMessage = {
  id: string;
  nombre: string;
  mensaje: string;
  created_at: string;
};
