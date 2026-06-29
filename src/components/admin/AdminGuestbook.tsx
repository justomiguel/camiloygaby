"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AdminAlert,
  AdminPagination,
  AdminShell,
  AdminStatCard,
} from "@/components/admin/AdminShell";
import { IconEye, IconEyeOff, IconRefresh } from "@/components/admin/AdminIcons";
import type { GuestbookMessage } from "@/lib/supabase/server";

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

type Filter = "all" | "public" | "private";

export function AdminGuestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/guestbook");
      const data = (await response.json()) as {
        messages?: GuestbookMessage[];
        error?: string;
      };
      if (!response.ok) throw new Error(data.error ?? "No se pudieron cargar los mensajes");
      setMessages(data.messages ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const stats = useMemo(
    () => ({
      total: messages.length,
      visible: messages.filter((m) => !m.is_private).length,
      hidden: messages.filter((m) => m.is_private).length,
    }),
    [messages],
  );

  const filtered = useMemo(() => {
    if (filter === "public") return messages.filter((m) => !m.is_private);
    if (filter === "private") return messages.filter((m) => m.is_private);
    return messages;
  }, [messages, filter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  useEffect(() => {
    setPage(1);
  }, [filter]);

  async function togglePrivacy(item: GuestbookMessage) {
    setBusyId(item.id);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/guestbook/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_private: !item.is_private }),
      });
      const data = (await response.json()) as { message?: GuestbookMessage; error?: string };
      if (!response.ok || !data.message) throw new Error(data.error ?? "No se pudo actualizar");

      setMessages((prev) => prev.map((m) => (m.id === item.id ? data.message! : m)));
      setMessage(
        data.message.is_private
          ? "Mensaje ocultado del sitio público."
          : "Mensaje visible nuevamente en el sitio.",
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(item: GuestbookMessage) {
    if (!window.confirm(`¿Eliminar definitivamente el mensaje de ${item.nombre}?`)) return;

    setBusyId(item.id);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/guestbook/${item.id}`, { method: "DELETE" });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "No se pudo eliminar");

      setMessages((prev) => prev.filter((m) => m.id !== item.id));
      setMessage("Mensaje eliminado.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminShell
      title="Libro de deseos"
      description="Mensajes que dejan los invitados. Puedes ocultarlos del sitio público o eliminarlos."
      actions={
        <button
          type="button"
          onClick={load}
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

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <AdminStatCard label="Total mensajes" value={stats.total} />
        <AdminStatCard label="Visibles" value={stats.visible} />
        <AdminStatCard label="Ocultos" value={stats.hidden} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(
          [
            ["all", "Todos"],
            ["public", "Visibles"],
            ["private", "Ocultos"],
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
          <p className="font-serif text-lg italic text-charcoal/50">Cargando mensajes…</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card py-16 text-center">
          <p className="font-serif text-xl italic text-charcoal/60">
            {filter === "all"
              ? "Aún no hay mensajes en el libro de deseos."
              : "No hay mensajes con este filtro."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {paged.map((item) => (
            <article
              key={item.id}
              className={`admin-card p-5 md:p-6 ${item.is_private ? "opacity-70" : ""}`}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="font-serif text-xl text-charcoal">{item.nombre}</h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
                        item.is_private
                          ? "bg-charcoal/8 text-charcoal/60"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.is_private ? "Oculto" : "Visible"}
                    </span>
                  </div>
                  <blockquote className="mt-2 font-serif text-lg italic leading-relaxed text-charcoal/80">
                    &ldquo;{item.mensaje}&rdquo;
                  </blockquote>
                  <p className="mt-3 text-xs text-charcoal/55">{formatDate(item.created_at)}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => togglePrivacy(item)}
                    disabled={busyId === item.id}
                    className="admin-btn admin-btn-secondary px-4 py-2"
                  >
                    {item.is_private ? (
                      <>
                        <IconEye className="h-4 w-4" />
                        Mostrar
                      </>
                    ) : (
                      <>
                        <IconEyeOff className="h-4 w-4" />
                        Ocultar
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    disabled={busyId === item.id}
                    className="admin-btn admin-btn-danger px-4 py-2"
                  >
                    {busyId === item.id ? "…" : "Eliminar"}
                  </button>
                </div>
              </div>
            </article>
          ))}

          <AdminPagination
            page={currentPage}
            pageCount={pageCount}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
            itemLabel="mensajes"
          />
        </div>
      )}
    </AdminShell>
  );
}
