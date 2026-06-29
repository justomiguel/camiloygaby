import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import {
  cityFromHeaders,
  countryCodeFromHeaders,
  countryNameFromCode,
  regionFromHeaders,
} from "@/lib/analytics/geo";
import { detectDeviceType } from "@/lib/analytics/device";
import { normalizeReferrer } from "@/lib/analytics/referrer";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const SESSION_COOKIE = "vg_sid";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 h

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return /bot|crawl|spider|slurp|facebookexternalhit|preview|wget|curl|python-requests/i.test(
    userAgent,
  );
}

export async function POST(request: Request) {
  const userAgent = request.headers.get("user-agent");
  if (isBot(userAgent)) {
    return NextResponse.json({ ok: true, skipped: "bot" });
  }

  let body: { path?: string } = {};
  try {
    body = await request.json();
  } catch {
    // body opcional
  }

  const path = typeof body.path === "string" ? body.path : "/";
  const cookieStore = await cookies();
  let sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  const response = NextResponse.json({ ok: true });

  if (!sessionId) {
    sessionId = randomUUID();
    response.cookies.set(SESSION_COOKIE, sessionId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
  }

  const countryCode = countryCodeFromHeaders(request.headers);
  const referrerHeader = request.headers.get("referer");

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from("site_visits").insert({
    session_id: sessionId,
    country_code: countryCode,
    country_name: countryNameFromCode(countryCode),
    city: cityFromHeaders(request.headers),
    region: regionFromHeaders(request.headers),
    referrer: normalizeReferrer(referrerHeader),
    path,
    user_agent: userAgent,
    device_type: detectDeviceType(userAgent),
  });

  if (error) {
    const missingTable =
      error.code === "PGRST205" ||
      /site_visits|schema cache/i.test(error.message);

    if (missingTable) {
      console.warn("[track] Tabla site_visits no existe. Ejecuta: npm run db:migrate");
      return response;
    }

    console.error("[track]", error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return response;
}
