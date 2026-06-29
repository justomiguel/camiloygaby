"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import {
  IconBook,
  IconChart,
  IconChevronLeft,
  IconChevronRight,
  IconEdit,
  IconExternal,
  IconLogout,
  IconUsers,
} from "./AdminIcons";

const navItems = [
  {
    href: "/admin",
    label: "Contenido",
    description: "Textos de la invitación",
    match: (path: string) => path === "/admin",
    Icon: IconEdit,
  },
  {
    href: "/admin/rsvps",
    label: "Confirmaciones",
    description: "Libro de asistencia",
    match: (path: string) => path.startsWith("/admin/rsvps"),
    Icon: IconUsers,
  },
  {
    href: "/admin/guestbook",
    label: "Libro de deseos",
    description: "Mensajes de invitados",
    match: (path: string) => path.startsWith("/admin/guestbook"),
    Icon: IconBook,
  },
  {
    href: "/admin/stats",
    label: "Estadísticas",
    description: "Visitas y métricas",
    match: (path: string) => path.startsWith("/admin/stats"),
    Icon: IconChart,
  },
];

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-bg paper-texture flex min-h-screen">
      {/* Sidebar — desktop */}
      <aside className="relative hidden w-64 shrink-0 flex-col border-r border-white/10 bg-charcoal-soft lg:flex">
        <div className="border-b border-white/8 px-6 py-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-charcoal font-serif text-lg italic text-gold-light">
              G
            </div>
            <div>
              <p className="font-script text-2xl leading-none text-cream">&amp;</p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-cream/45">Admin</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-charcoal font-serif text-lg italic text-gold-light">
              JC
            </div>
          </div>
          <p className="mt-4 font-serif text-sm italic leading-relaxed text-cream/55">
            Gabriela & Juan Camilo
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {navItems.map(({ href, label, description: desc, match, Icon }) => {
            const active = match(pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-start gap-3 rounded-xl px-3 py-3 text-sm ${
                  active ? "admin-nav-active" : "admin-nav-item"
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-gold-light" : ""}`} />
                <span>
                  <span className="block font-medium">{label}</span>
                  <span className={`mt-0.5 block text-xs ${active ? "text-cream/60" : "text-cream/40"}`}>
                    {desc}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-white/8 p-3">
          <Link
            href="/"
            target="_blank"
            className="admin-nav-item flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
          >
            <IconExternal className="h-4 w-4" />
            Ver sitio público
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="admin-nav-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
          >
            <IconLogout className="h-4 w-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="border-b border-sage/15 bg-cream/80 px-4 py-4 backdrop-blur-md lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-script text-xl text-sage-dark">G & JC</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/45">Admin</p>
            </div>
            <div className="flex gap-2">
              <Link href="/" target="_blank" className="admin-btn admin-btn-ghost px-3 py-2">
                <IconExternal className="h-4 w-4" />
              </Link>
              <button type="button" onClick={handleLogout} className="admin-btn admin-btn-ghost px-3 py-2">
                <IconLogout className="h-4 w-4" />
              </button>
            </div>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map(({ href, label, match }) => (
              <Link
                key={href}
                href={href}
                className={`admin-btn shrink-0 px-4 py-2 text-xs ${
                  match(pathname) ? "admin-pill-active" : "admin-pill"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Page header */}
        <div className="border-b border-sage/12 bg-cream/50 px-5 py-6 backdrop-blur-sm md:px-8 md:py-7">
          <div className="mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4">
            <div>
              <div className="decorative-line mb-4 max-w-[6rem]" />
              <h1 className="font-serif text-3xl italic tracking-tight text-charcoal md:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal/60">{description}</p>
              )}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

export function AdminField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
  wide = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
  wide?: boolean;
}) {
  const span = wide || multiline ? "sm:col-span-2" : "";
  return (
    <label className={`admin-label ${span}`}>
      {label}
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input resize-y"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input"
        />
      )}
    </label>
  );
}

export function AdminCard({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`admin-card p-6 md:p-7 ${className}`}>
      {title && <h2 className="admin-section-title">{title}</h2>}
      {description && <p className="mt-1.5 text-sm text-charcoal/55">{description}</p>}
      <div className={title || description ? "mt-5" : ""}>{children}</div>
    </section>
  );
}

export function AdminStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="admin-stat">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-charcoal/45">{label}</p>
      <p className="mt-2 font-serif text-3xl italic text-charcoal">{value}</p>
      {hint && <p className="mt-1.5 text-xs text-charcoal/50">{hint}</p>}
    </div>
  );
}

export function AdminAlert({
  variant,
  children,
}: {
  variant: "success" | "error";
  children: React.ReactNode;
}) {
  return (
    <p
      className={variant === "success" ? "admin-alert-success" : "admin-alert-error"}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </p>
  );
}

export function AdminPagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = "registros",
}: {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
}) {
  if (totalItems === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  const pages: (number | "…")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-sage/12 pt-4 sm:flex-row">
      <p className="text-xs text-charcoal/55">
        Mostrando <span className="font-medium text-charcoal/75">{from}–{to}</span> de{" "}
        <span className="font-medium text-charcoal/75">{totalItems}</span> {itemLabel}
      </p>
      {pageCount > 1 && (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="Página anterior"
            className="admin-page-btn"
          >
            <IconChevronLeft className="h-4 w-4" />
          </button>
          {pages.map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} className="px-1.5 text-sm text-charcoal/40">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
                className={`admin-page-btn ${p === page ? "admin-page-btn-active" : ""}`}
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
            aria-label="Página siguiente"
            className="admin-page-btn"
          >
            <IconChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
