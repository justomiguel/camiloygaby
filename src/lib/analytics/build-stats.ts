import type {
  AdminStats,
  CountryStat,
  DayStat,
  DeviceStat,
  HourStat,
  ReferrerStat,
  SiteVisitRow,
  VisitDeviceType,
} from "@/lib/analytics/types";
import { countryNameFromCode } from "@/lib/analytics/geo";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysAgo(n: number): Date {
  const d = startOfDay(new Date());
  d.setDate(d.getDate() - n);
  return d;
}

function dateKey(iso: string): string {
  return iso.slice(0, 10);
}

export async function buildAdminStats(): Promise<AdminStats> {
  const supabase = createServerSupabaseClient();

  const weekAgo = daysAgo(6).toISOString();
  const [{ data: visits, error: visitsError }, { data: rsvps, error: rsvpsError }] =
    await Promise.all([
      supabase
        .from("site_visits")
        .select("*")
        .gte("created_at", weekAgo)
        .order("created_at", { ascending: false }),
      supabase.from("rsvps").select("asiste, vegetariano, quiere_cantar"),
    ]);

  if (visitsError) throw new Error(visitsError.message);
  if (rsvpsError) throw new Error(rsvpsError.message);

  const rows = (visits ?? []) as SiteVisitRow[];
  const todayKey = dateKey(new Date().toISOString());
  const yesterdayKey = dateKey(daysAgo(1).toISOString());

  const sessionSet = new Set<string>();
  const countrySet = new Set<string>();
  const countryMap = new Map<string, { visits: number; sessions: Set<string> }>();
  const dayMap = new Map<string, { visits: number; sessions: Set<string> }>();
  const hourMap = new Map<number, number>();
  const deviceMap = new Map<VisitDeviceType, number>();
  const referrerMap = new Map<string, number>();

  let todayCount = 0;
  let yesterdayCount = 0;
  let mobileCount = 0;

  for (const row of rows) {
    sessionSet.add(row.session_id);
    if (row.country_code) countrySet.add(row.country_code);

    if (dateKey(row.created_at) === todayKey) todayCount++;
    if (dateKey(row.created_at) === yesterdayKey) yesterdayCount++;

    const code = row.country_code ?? "??";
    if (!countryMap.has(code)) {
      countryMap.set(code, { visits: 0, sessions: new Set() });
    }
    const countryEntry = countryMap.get(code)!;
    countryEntry.visits++;
    countryEntry.sessions.add(row.session_id);

    const day = dateKey(row.created_at);
    if (!dayMap.has(day)) {
      dayMap.set(day, { visits: 0, sessions: new Set() });
    }
    const dayEntry = dayMap.get(day)!;
    dayEntry.visits++;
    dayEntry.sessions.add(row.session_id);

    const hour = new Date(row.created_at).getHours();
    hourMap.set(hour, (hourMap.get(hour) ?? 0) + 1);

    const device = (row.device_type ?? "unknown") as VisitDeviceType;
    deviceMap.set(device, (deviceMap.get(device) ?? 0) + 1);
    if (device === "mobile") mobileCount++;

    const ref = row.referrer ?? "Directo";
    referrerMap.set(ref, (referrerMap.get(ref) ?? 0) + 1);
  }

  const byCountry: CountryStat[] = Array.from(countryMap.entries())
    .map(([code, data]) => ({
      code,
      name:
        code === "??"
          ? "Desconocido"
          : (countryNameFromCode(code) ?? code),
      visits: data.visits,
      sessions: data.sessions.size,
    }))
    .sort((a, b) => b.visits - a.visits);

  const byDay: DayStat[] = Array.from({ length: 7 }, (_, i) => {
    const d = daysAgo(6 - i);
    const key = dateKey(d.toISOString());
    const entry = dayMap.get(key);
    return {
      date: key,
      visits: entry?.visits ?? 0,
      sessions: entry?.sessions.size ?? 0,
    };
  });

  const byHour: HourStat[] = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    visits: hourMap.get(hour) ?? 0,
  }));

  const byDevice: DeviceStat[] = Array.from(deviceMap.entries())
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  const topReferrers: ReferrerStat[] = Array.from(referrerMap.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const rsvpRows = rsvps ?? [];
  const attending = rsvpRows.filter((r) => r.asiste).length;
  const notAttending = rsvpRows.filter((r) => !r.asiste).length;

  return {
    totals: {
      visits: rows.length,
      uniqueSessions: sessionSet.size,
      countries: countrySet.size,
      today: todayCount,
      yesterday: yesterdayCount,
      thisWeek: rows.length,
      mobileShare: rows.length ? Math.round((mobileCount / rows.length) * 100) : 0,
    },
    byCountry,
    byDay,
    byHour,
    byDevice,
    topReferrers,
    recentVisits: rows.slice(0, 25),
    rsvp: {
      total: rsvpRows.length,
      attending,
      notAttending,
      vegetarian: rsvpRows.filter((r) => r.vegetariano).length,
      wantsToSing: rsvpRows.filter((r) => r.quiere_cantar).length,
    },
  };
}
