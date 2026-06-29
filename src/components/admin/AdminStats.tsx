"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminStats as AdminStatsData } from "@/lib/analytics/types";
import { deviceLabel } from "@/lib/analytics/device";
import {
  AdminAlert,
  AdminCard,
  AdminPagination,
  AdminShell,
  AdminStatCard,
} from "@/components/admin/AdminShell";

const VISITS_PAGE_SIZE = 10;
import { IconRefresh } from "@/components/admin/AdminIcons";
import { WorldMapChart } from "@/components/admin/WorldMapChart";

function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(iso));
}

function formatDayLabel(date: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T12:00:00`));
}

export function AdminStats() {
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visitsPage, setVisitsPage] = useState(1);

  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/stats");
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "No se pudieron cargar las estadísticas.");
      setLoading(false);
      return;
    }
    const data = (await response.json()) as AdminStatsData;
    setStats(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 60_000);
    return () => clearInterval(interval);
  }, [loadStats]);

  const maxDayVisits = stats?.byDay.reduce((max, d) => Math.max(max, d.visits), 0) ?? 0;
  const maxHourVisits = stats?.byHour.reduce((max, h) => Math.max(max, h.visits), 0) ?? 0;

  const recentVisits = stats?.recentVisits ?? [];
  const visitsPageCount = Math.max(1, Math.ceil(recentVisits.length / VISITS_PAGE_SIZE));
  const currentVisitsPage = Math.min(visitsPage, visitsPageCount);
  const pagedVisits = recentVisits.slice(
    (currentVisitsPage - 1) * VISITS_PAGE_SIZE,
    currentVisitsPage * VISITS_PAGE_SIZE,
  );

  return (
    <AdminShell
      title="Estadísticas"
      description="Visitas, países y comportamiento de quienes entran a la invitación."
      actions={
        <button
          type="button"
          onClick={loadStats}
          disabled={loading}
          className="admin-btn admin-btn-secondary"
        >
          <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Actualizando…" : "Actualizar"}
        </button>
      }
    >
      {error && (
        <div className="mb-6">
          <AdminAlert variant="error">{error}</AdminAlert>
        </div>
      )}

      {loading && !stats ? (
        <div className="admin-card flex items-center justify-center py-20">
          <p className="font-serif text-lg italic text-charcoal/50">Cargando estadísticas…</p>
        </div>
      ) : stats ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AdminStatCard
              label="Visitas (7 días)"
              value={stats.totals.visits}
              hint={`${stats.totals.uniqueSessions} visitantes únicos`}
            />
            <AdminStatCard
              label="Hoy"
              value={stats.totals.today}
              hint={`Ayer: ${stats.totals.yesterday}`}
            />
            <AdminStatCard
              label="Países"
              value={stats.totals.countries}
              hint="Con al menos una visita"
            />
            <AdminStatCard
              label="Desde móvil"
              value={`${stats.totals.mobileShare}%`}
              hint="Del total de visitas"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr]">
            <AdminCard
              title="Mapa de visitantes"
              description="Los países se van coloreando a medida que ingresan invitados."
            >
              <WorldMapChart countries={stats.byCountry} />
            </AdminCard>

            <AdminCard title="Top países">
              <ul className="space-y-4">
                {stats.byCountry.slice(0, 8).map((country) => {
                  const max = stats.byCountry[0]?.visits ?? 1;
                  const width = Math.max(8, Math.round((country.visits / max) * 100));
                  return (
                    <li key={country.code}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-charcoal">{country.name}</span>
                        <span className="tabular-nums text-charcoal/55">{country.visits}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-soft">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark transition-all duration-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
                {stats.byCountry.length === 0 && (
                  <li className="text-sm text-charcoal/50">Sin datos aún.</li>
                )}
              </ul>
            </AdminCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <AdminCard title="Visitas por día">
              <div className="flex items-end gap-2 pt-2" style={{ minHeight: 130 }}>
                {stats.byDay.map((day) => {
                  const height =
                    maxDayVisits > 0 ? Math.max(6, (day.visits / maxDayVisits) * 100) : 6;
                  return (
                    <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                      <span className="text-[10px] tabular-nums text-charcoal/45">{day.visits}</span>
                      <div
                        className="w-full max-w-[2.5rem] rounded-t-lg bg-gradient-to-t from-sage-dark to-sage/70 transition-all"
                        style={{ height: `${height}px` }}
                        title={`${day.visits} visitas`}
                      />
                      <span className="text-center text-[10px] leading-tight text-charcoal/55">
                        {formatDayLabel(day.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </AdminCard>

            <AdminCard
              title="Horarios de mayor tráfico"
              description="Distribución por hora del día (0–23 h)."
            >
              <div className="grid grid-cols-12 gap-1 pt-2">
                {stats.byHour.map((slot) => {
                  const intensity = maxHourVisits > 0 ? slot.visits / maxHourVisits : 0;
                  return (
                    <div
                      key={slot.hour}
                      className="aspect-square rounded-[3px] transition-colors"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--color-sage) ${Math.round(intensity * 80 + 8)}%, var(--color-cream))`,
                      }}
                      title={`${slot.hour}:00 — ${slot.visits} visitas`}
                    />
                  );
                })}
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-charcoal/45">
                <span>0 h</span>
                <span>12 h</span>
                <span>23 h</span>
              </div>
            </AdminCard>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <AdminCard title="Dispositivos">
              <ul className="space-y-2">
                {stats.byDevice.map((item) => (
                  <li
                    key={item.device}
                    className="admin-card-inset flex items-center justify-between px-3.5 py-2.5 text-sm"
                  >
                    <span>{deviceLabel(item.device)}</span>
                    <span className="font-semibold tabular-nums text-sage-dark">{item.count}</span>
                  </li>
                ))}
              </ul>
            </AdminCard>

            <AdminCard title="Origen del tráfico">
              <ul className="space-y-2">
                {stats.topReferrers.map((item) => (
                  <li
                    key={item.source}
                    className="admin-card-inset flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm"
                  >
                    <span className="truncate">{item.source}</span>
                    <span className="shrink-0 font-semibold tabular-nums text-sage-dark">
                      {item.count}
                    </span>
                  </li>
                ))}
              </ul>
            </AdminCard>

            <AdminCard title="Confirmaciones RSVP">
              <ul className="space-y-2 text-sm">
                {[
                  ["Total respuestas", stats.rsvp.total],
                  ["Asisten", stats.rsvp.attending],
                  ["No asisten", stats.rsvp.notAttending],
                  ["Menú vegetariano", stats.rsvp.vegetarian],
                  ["Quieren cantar", stats.rsvp.wantsToSing],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="admin-card-inset flex justify-between px-3.5 py-2.5"
                  >
                    <span>{label}</span>
                    <span className="font-semibold tabular-nums text-sage-dark">{value}</span>
                  </li>
                ))}
              </ul>
            </AdminCard>
          </div>

          <AdminCard
            title="Visitas recientes"
            description="Últimas entradas al sitio (últimos 7 días)."
          >
            <div className="overflow-x-auto -mx-1">
              <table className="admin-table w-full min-w-[640px]">
                <thead>
                  <tr>
                    <th>Cuándo</th>
                    <th>País</th>
                    <th>Ciudad</th>
                    <th>Dispositivo</th>
                    <th>Origen</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedVisits.map((visit) => (
                    <tr key={visit.id}>
                      <td className="text-charcoal/75">{formatDateTime(visit.created_at)}</td>
                      <td className="font-medium text-charcoal">{visit.country_name ?? "—"}</td>
                      <td className="text-charcoal/75">{visit.city ?? "—"}</td>
                      <td className="text-charcoal/75">
                        {deviceLabel(visit.device_type ?? "unknown")}
                      </td>
                      <td className="text-charcoal/75">{visit.referrer ?? "Directo"}</td>
                    </tr>
                  ))}
                  {recentVisits.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-charcoal/45">
                        Todavía no hay visitas registradas.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <AdminPagination
              page={currentVisitsPage}
              pageCount={visitsPageCount}
              totalItems={recentVisits.length}
              pageSize={VISITS_PAGE_SIZE}
              onPageChange={setVisitsPage}
              itemLabel="visitas"
            />
          </AdminCard>
        </div>
      ) : null}
    </AdminShell>
  );
}
