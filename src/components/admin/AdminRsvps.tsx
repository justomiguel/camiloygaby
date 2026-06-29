"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AdminAlert,
  AdminField,
  AdminPagination,
  AdminShell,
  AdminStatCard,
} from "@/components/admin/AdminShell";

const PAGE_SIZE = 8;
import { IconRefresh } from "@/components/admin/AdminIcons";
import type { RsvpRecord } from "@/lib/supabase/server";

type EditForm = {
  nombre: string;
  acompanante: string;
  asiste: boolean;
  vegetariano: boolean;
  quiere_cantar: boolean;
  pista_cantar: string;
};

function toForm(rsvp: RsvpRecord): EditForm {
  return {
    nombre: rsvp.nombre,
    acompanante: rsvp.acompanante ?? "",
    asiste: rsvp.asiste,
    vegetariano: rsvp.vegetariano,
    quiere_cantar: rsvp.quiere_cantar,
    pista_cantar: rsvp.pista_cantar ?? "",
  };
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AdminRsvps() {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");
  const [page, setPage] = useState(1);

  const loadRsvps = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/rsvps");
      const data = (await response.json()) as { rsvps?: RsvpRecord[]; error?: string };
      if (!response.ok) throw new Error(data.error ?? "No se pudieron cargar las confirmaciones");
      setRsvps(data.rsvps ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRsvps();
  }, [loadRsvps]);

  const stats = useMemo(() => {
    const attending = rsvps.filter((r) => r.asiste).length;
    const guests = rsvps
      .filter((r) => r.asiste)
      .reduce((sum, r) => sum + 1 + (r.acompanante?.trim() ? 1 : 0), 0);
    return {
      total: rsvps.length,
      attending,
      notAttending: rsvps.length - attending,
      guests,
      singers: rsvps.filter((r) => r.quiere_cantar).length,
    };
  }, [rsvps]);

  const filtered = useMemo(() => {
    if (filter === "yes") return rsvps.filter((r) => r.asiste);
    if (filter === "no") return rsvps.filter((r) => !r.asiste);
    return rsvps;
  }, [rsvps, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  function startEdit(rsvp: RsvpRecord) {
    setEditingId(rsvp.id);
    setForm(toForm(rsvp));
    setMessage(null);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(null);
  }

  async function handleSave() {
    if (!editingId || !form) return;

    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/rsvps/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          acompanante: form.acompanante,
          asiste: form.asiste,
          vegetariano: form.vegetariano,
          quiere_cantar: form.quiere_cantar,
          pista_cantar: form.pista_cantar,
        }),
      });

      const data = (await response.json()) as { rsvp?: RsvpRecord; error?: string };
      if (!response.ok) throw new Error(data.error ?? "No se pudo guardar");

      setRsvps((prev) => prev.map((r) => (r.id === editingId ? (data.rsvp ?? r) : r)));
      setMessage("Confirmación actualizada.");
      cancelEdit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, nombre: string) {
    if (!window.confirm(`¿Eliminar la confirmación de ${nombre}?`)) return;

    setDeletingId(id);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/rsvps/${id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "No se pudo eliminar");

      setRsvps((prev) => prev.filter((r) => r.id !== id));
      if (editingId === id) cancelEdit();
      setMessage("Confirmación eliminada.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminShell
      title="Confirmaciones"
      description="Libro de asistencia con todas las respuestas del formulario RSVP."
      actions={
        <button
          type="button"
          onClick={loadRsvps}
          disabled={loading}
          className="admin-btn admin-btn-secondary"
        >
          <IconRefresh className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Actualizar
        </button>
      }
    >
      {(message || error) && (
        <div className="mb-6 space-y-3">
          {message && <AdminAlert variant="success">{message}</AdminAlert>}
          {error && <AdminAlert variant="error">{error}</AdminAlert>}
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <AdminStatCard label="Total respuestas" value={stats.total} />
        <AdminStatCard label="Asisten" value={stats.attending} />
        <AdminStatCard label="No asisten" value={stats.notAttending} />
        <AdminStatCard label="Personas (est.)" value={stats.guests} />
        <AdminStatCard label="Quieren cantar" value={stats.singers} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "Todas"],
            ["yes", "Asisten"],
            ["no", "No asisten"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`admin-btn px-4 py-2 text-sm ${
              filter === key ? "admin-pill-active" : "admin-pill"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="admin-card py-16 text-center">
          <p className="font-serif text-lg italic text-charcoal/50">Cargando confirmaciones…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card py-16 text-center">
          <p className="font-serif text-xl italic text-charcoal/60">
            {filter === "all"
              ? "Aún no hay confirmaciones registradas."
              : "No hay confirmaciones con este filtro."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paged.map((rsvp) => {
            const isEditing = editingId === rsvp.id;

            return (
              <article key={rsvp.id} className="admin-card p-5 md:p-6">
                {!isEditing ? (
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-serif text-xl text-charcoal">{rsvp.nombre}</h2>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                            rsvp.asiste
                              ? "bg-green-100 text-green-800"
                              : "bg-charcoal/8 text-charcoal/60"
                          }`}
                        >
                          {rsvp.asiste ? "Asiste" : "No asiste"}
                        </span>
                      </div>
                      {rsvp.acompanante && (
                        <p className="mt-1.5 text-sm text-charcoal/70">
                          Acompañante: <span className="font-medium">{rsvp.acompanante}</span>
                        </p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-charcoal/55">
                        {rsvp.vegetariano && (
                          <span className="rounded-full bg-sage/12 px-2.5 py-1 font-medium text-sage-dark">
                            Vegetariano/a
                          </span>
                        )}
                        {rsvp.quiere_cantar && (
                          <span className="rounded-full bg-gold/15 px-2.5 py-1 font-medium text-charcoal/75">
                            Quiere cantar: {rsvp.pista_cantar}
                          </span>
                        )}
                        <span>{formatDate(rsvp.created_at)}</span>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(rsvp)}
                        className="admin-btn admin-btn-secondary px-4 py-2"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(rsvp.id, rsvp.nombre)}
                        disabled={deletingId === rsvp.id}
                        className="admin-btn admin-btn-danger px-4 py-2"
                      >
                        {deletingId === rsvp.id ? "Eliminando…" : "Eliminar"}
                      </button>
                    </div>
                  </div>
                ) : (
                  form && (
                    <div className="space-y-5">
                      <h2 className="admin-section-title">Editar confirmación</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        <AdminField
                          label="Nombre *"
                          value={form.nombre}
                          onChange={(v) => setForm({ ...form, nombre: v })}
                        />
                        <AdminField
                          label="Acompañante"
                          value={form.acompanante}
                          onChange={(v) => setForm({ ...form, acompanante: v })}
                        />
                      </div>

                      <fieldset>
                        <legend className="admin-label mb-2">¿Asiste?</legend>
                        <div className="flex flex-wrap gap-4">
                          <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                              type="radio"
                              checked={form.asiste}
                              onChange={() => setForm({ ...form, asiste: true })}
                              className="accent-sage-dark"
                            />
                            Sí
                          </label>
                          <label className="flex cursor-pointer items-center gap-2 text-sm">
                            <input
                              type="radio"
                              checked={!form.asiste}
                              onChange={() => setForm({ ...form, asiste: false })}
                              className="accent-sage-dark"
                            />
                            No
                          </label>
                        </div>
                      </fieldset>

                      <div className="flex flex-wrap gap-5">
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={form.vegetariano}
                            onChange={(e) => setForm({ ...form, vegetariano: e.target.checked })}
                            className="accent-sage-dark"
                          />
                          Vegetariano/a
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={form.quiere_cantar}
                            onChange={(e) => setForm({ ...form, quiere_cantar: e.target.checked })}
                            className="accent-sage-dark"
                          />
                          Quiere cantar
                        </label>
                      </div>

                      {form.quiere_cantar && (
                        <AdminField
                          label="Pista *"
                          value={form.pista_cantar}
                          onChange={(v) => setForm({ ...form, pista_cantar: v })}
                        />
                      )}

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={saving}
                          className="admin-btn admin-btn-primary px-5 py-2"
                        >
                          {saving ? "Guardando…" : "Guardar"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="admin-btn admin-btn-ghost px-5 py-2"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )
                )}
              </article>
            );
          })}

          <AdminPagination
            page={currentPage}
            pageCount={pageCount}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            itemLabel="confirmaciones"
          />
        </div>
      )}
    </AdminShell>
  );
}
