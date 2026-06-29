import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="admin-login-bg paper-texture flex min-h-screen">
      {/* Panel decorativo — desktop */}
      <div className="relative hidden w-[44%] flex-col justify-between overflow-hidden p-12 lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(184,146,79,0.15),transparent_55%)]" />
        <div className="relative">
          <p className="text-[11px] font-medium uppercase tracking-[0.45em] text-cream/40">
            Invitación digital
          </p>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 font-serif text-2xl italic text-gold-light">
              G
            </span>
            <span className="font-script text-4xl text-gold-light">&amp;</span>
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 font-serif text-2xl italic text-gold-light">
              JC
            </span>
          </div>
          <h1 className="mt-10 max-w-sm font-serif text-4xl italic leading-tight text-cream">
            Gabriela & Juan Camilo
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
            Panel privado para editar la invitación, revisar confirmaciones y ver quién visita el
            sitio.
          </p>
        </div>
        <div className="relative">
          <div className="decorative-line max-w-xs opacity-60" />
          <p className="mt-6 font-serif text-lg italic text-cream/45">
            19 · Diciembre · 2026
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="admin-card p-8 md:p-10">
            <div className="mb-8 text-center lg:text-left">
              <p className="font-script text-3xl text-sage-dark lg:hidden">G & JC</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.4em] text-sage-dark/80">
                Administración
              </p>
              <h2 className="mt-2 font-serif text-2xl italic text-charcoal md:text-3xl">
                Bienvenidos
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                Ingresá con tu cuenta para continuar.
              </p>
            </div>

            {params.error === "auth" && (
              <p className="admin-alert-error mb-6" role="alert">
                No se pudo completar el inicio de sesión. Intentá de nuevo.
              </p>
            )}

            <AdminLoginForm />

            <p className="mt-8 text-center text-sm text-charcoal/50">
              <Link
                href="/"
                className="underline decoration-sage/30 underline-offset-4 transition hover:text-charcoal/70"
              >
                ← Volver al sitio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
