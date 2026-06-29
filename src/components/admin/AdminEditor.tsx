"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteContent } from "@/lib/content/types";
import { AdminField, AdminShell, AdminAlert } from "@/components/admin/AdminShell";

type SectionKey = keyof SiteContent;

const sections: { key: SectionKey; label: string }[] = [
  { key: "header", label: "Navegación" },
  { key: "hero", label: "Hero" },
  { key: "countdown", label: "Cuenta regresiva" },
  { key: "story", label: "Historia" },
  { key: "couple", label: "Protagonistas" },
  { key: "gallery", label: "Galería" },
  { key: "details", label: "Detalles del evento" },
  { key: "dressCode", label: "Dress code" },
  { key: "gift", label: "Regalo" },
  { key: "rsvp", label: "Confirmación" },
  { key: "guestbook", label: "Libro de deseos" },
  { key: "faq", label: "FAQ" },
  { key: "footer", label: "Footer" },
];

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeSection, setActiveSection] = useState<SectionKey>("hero");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateField = useCallback(
    (section: SectionKey, field: string, value: string) => {
      setContent((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as Record<string, unknown>),
          [field]: value,
        },
      }));
    },
    [],
  );

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "No se pudo guardar.");
      setSaving(false);
      return;
    }

    setMessage("Cambios guardados correctamente.");
    setSaving(false);
    router.refresh();
  }

  function renderSection() {
    switch (activeSection) {
      case "header":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField
              label="Logo izquierda"
              value={content.header.logoLeft}
              onChange={(v) => updateField("header", "logoLeft", v)}
            />
            <AdminField
              label="Logo derecha"
              value={content.header.logoRight}
              onChange={(v) => updateField("header", "logoRight", v)}
            />
            {content.header.links.map((link, i) => (
              <div key={i} className="admin-card-inset grid gap-3 p-4 sm:col-span-2 md:grid-cols-2">
                <AdminField
                  label={`Enlace ${i + 1} — texto`}
                  value={link.label}
                  onChange={(v) => {
                    const links = [...content.header.links];
                    links[i] = { ...links[i], label: v };
                    setContent((prev) => ({ ...prev, header: { ...prev.header, links } }));
                  }}
                />
                <AdminField
                  label={`Enlace ${i + 1} — destino`}
                  value={link.href}
                  onChange={(v) => {
                    const links = [...content.header.links];
                    links[i] = { ...links[i], href: v };
                    setContent((prev) => ({ ...prev, header: { ...prev.header, links } }));
                  }}
                />
              </div>
            ))}
          </div>
        );
      case "hero":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Fecha" value={content.hero.dateLine} onChange={(v) => updateField("hero", "dateLine", v)} />
            <AdminField label="Nombre 1" value={content.hero.name1} onChange={(v) => updateField("hero", "name1", v)} />
            <AdminField label="Nombre 2" value={content.hero.name2} onChange={(v) => updateField("hero", "name2", v)} />
            <AdminField label="Frase" value={content.hero.tagline} onChange={(v) => updateField("hero", "tagline", v)} />
            <AdminField label="Botón CTA" value={content.hero.ctaText} onChange={(v) => updateField("hero", "ctaText", v)} />
          </div>
        );
      case "countdown":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.countdown.label} onChange={(v) => updateField("countdown", "label", v)} />
            <AdminField
              label="Fecha del evento (ISO)"
              value={content.countdown.weddingDateIso}
              onChange={(v) => updateField("countdown", "weddingDateIso", v)}
            />
          </div>
        );
      case "story":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.story.eyebrow} onChange={(v) => updateField("story", "eyebrow", v)} />
            <AdminField label="Título" value={content.story.title} onChange={(v) => updateField("story", "title", v)} />
            <AdminField label="Párrafo 1" value={content.story.paragraph1} onChange={(v) => updateField("story", "paragraph1", v)} multiline />
            <AdminField label="Párrafo 2" value={content.story.paragraph2} onChange={(v) => updateField("story", "paragraph2", v)} multiline />
            <AdminField label="Cita" value={content.story.quote} onChange={(v) => updateField("story", "quote", v)} multiline />
            <AdminField label="Pie de foto" value={content.story.photoCaption} onChange={(v) => updateField("story", "photoCaption", v)} />
          </div>
        );
      case "couple":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.couple.eyebrow} onChange={(v) => updateField("couple", "eyebrow", v)} />
            <AdminField label="Título" value={content.couple.title} onChange={(v) => updateField("couple", "title", v)} />
            <AdminField label="Palabra destacada" value={content.couple.titleAccent} onChange={(v) => updateField("couple", "titleAccent", v)} />
            {content.couple.people.map((person, i) => (
              <div key={i} className="admin-card-inset space-y-3 p-4 sm:col-span-2">
                <p className="text-sm font-medium text-sage-dark">Persona {i + 1}</p>
                <AdminField label="Nombre" value={person.name} onChange={(v) => {
                  const people = [...content.couple.people];
                  people[i] = { ...people[i], name: v };
                  setContent((prev) => ({ ...prev, couple: { ...prev.couple, people } }));
                }} />
                <AdminField label="Descripción" value={person.description} onChange={(v) => {
                  const people = [...content.couple.people];
                  people[i] = { ...people[i], description: v };
                  setContent((prev) => ({ ...prev, couple: { ...prev.couple, people } }));
                }} multiline />
                <AdminField label="Acento" value={person.accent} onChange={(v) => {
                  const people = [...content.couple.people];
                  people[i] = { ...people[i], accent: v };
                  setContent((prev) => ({ ...prev, couple: { ...prev.couple, people } }));
                }} />
              </div>
            ))}
          </div>
        );
      case "gallery":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.gallery.eyebrow} onChange={(v) => updateField("gallery", "eyebrow", v)} />
            <AdminField label="Título" value={content.gallery.title} onChange={(v) => updateField("gallery", "title", v)} />
            <AdminField label="Palabra destacada" value={content.gallery.titleAccent} onChange={(v) => updateField("gallery", "titleAccent", v)} />
            <AdminField label="Descripción" value={content.gallery.description} onChange={(v) => updateField("gallery", "description", v)} multiline />
            {content.gallery.photos.map((photo, i) => (
              <div key={i} className="admin-card-inset space-y-3 p-4 sm:col-span-2">
                <p className="text-sm font-medium text-sage-dark">Foto {i + 1}</p>
                <AdminField label="Ruta imagen" value={photo.src} onChange={(v) => {
                  const photos = [...content.gallery.photos];
                  photos[i] = { ...photos[i], src: v };
                  setContent((prev) => ({ ...prev, gallery: { ...prev.gallery, photos } }));
                }} />
                <AdminField label="Alt" value={photo.alt} onChange={(v) => {
                  const photos = [...content.gallery.photos];
                  photos[i] = { ...photos[i], alt: v };
                  setContent((prev) => ({ ...prev, gallery: { ...prev.gallery, photos } }));
                }} />
                <AdminField label="Título" value={photo.caption} onChange={(v) => {
                  const photos = [...content.gallery.photos];
                  photos[i] = { ...photos[i], caption: v };
                  setContent((prev) => ({ ...prev, gallery: { ...prev.gallery, photos } }));
                }} />
                <AdminField label="Subtítulo" value={photo.subcaption} onChange={(v) => {
                  const photos = [...content.gallery.photos];
                  photos[i] = { ...photos[i], subcaption: v };
                  setContent((prev) => ({ ...prev, gallery: { ...prev.gallery, photos } }));
                }} multiline />
              </div>
            ))}
          </div>
        );
      case "details":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.details.eyebrow} onChange={(v) => updateField("details", "eyebrow", v)} />
            <AdminField label="Título" value={content.details.title} onChange={(v) => updateField("details", "title", v)} />
            <AdminField label="Palabra destacada" value={content.details.titleAccent} onChange={(v) => updateField("details", "titleAccent", v)} />
            <AdminField label="Descripción" value={content.details.description} onChange={(v) => updateField("details", "description", v)} multiline />
            {content.details.items.map((item, i) => (
              <div key={i} className="admin-card-inset grid gap-3 p-4 sm:col-span-2 md:grid-cols-3">
                <AdminField label="Etiqueta" value={item.label} onChange={(v) => {
                  const items = [...content.details.items];
                  items[i] = { ...items[i], label: v };
                  setContent((prev) => ({ ...prev, details: { ...prev.details, items } }));
                }} />
                <AdminField label="Valor" value={item.value} onChange={(v) => {
                  const items = [...content.details.items];
                  items[i] = { ...items[i], value: v };
                  setContent((prev) => ({ ...prev, details: { ...prev.details, items } }));
                }} />
                <AdminField label="Detalle" value={item.accent} onChange={(v) => {
                  const items = [...content.details.items];
                  items[i] = { ...items[i], accent: v };
                  setContent((prev) => ({ ...prev, details: { ...prev.details, items } }));
                }} />
              </div>
            ))}
          </div>
        );
      case "dressCode":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.dressCode.eyebrow} onChange={(v) => updateField("dressCode", "eyebrow", v)} />
            <AdminField label="Título" value={content.dressCode.title} onChange={(v) => updateField("dressCode", "title", v)} />
            <AdminField label="Palabra destacada" value={content.dressCode.titleAccent} onChange={(v) => updateField("dressCode", "titleAccent", v)} />
            <AdminField label="Descripción" value={content.dressCode.description} onChange={(v) => updateField("dressCode", "description", v)} multiline />
            <AdminField label="Título mujeres" value={content.dressCode.womenTitle} onChange={(v) => updateField("dressCode", "womenTitle", v)} />
            <AdminField label="Texto mujeres" value={content.dressCode.womenBody} onChange={(v) => updateField("dressCode", "womenBody", v)} multiline />
            <AdminField label="Título hombres" value={content.dressCode.menTitle} onChange={(v) => updateField("dressCode", "menTitle", v)} />
            <AdminField label="Texto hombres" value={content.dressCode.menBody} onChange={(v) => updateField("dressCode", "menBody", v)} multiline />
          </div>
        );
      case "gift":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.gift.eyebrow} onChange={(v) => updateField("gift", "eyebrow", v)} />
            <AdminField label="Título" value={content.gift.title} onChange={(v) => updateField("gift", "title", v)} />
            <AdminField label="Palabra destacada" value={content.gift.titleAccent} onChange={(v) => updateField("gift", "titleAccent", v)} />
            <AdminField label="Texto" value={content.gift.body} onChange={(v) => updateField("gift", "body", v)} multiline />
            <AdminField label="Texto botón" value={content.gift.buttonText} onChange={(v) => updateField("gift", "buttonText", v)} />
            <AdminField label="URL Mercado Pago" value={content.gift.mercadoPagoUrl} onChange={(v) => updateField("gift", "mercadoPagoUrl", v)} />
            <AdminField label="Etiqueta del link" value={content.gift.linkLabel} onChange={(v) => updateField("gift", "linkLabel", v)} />
          </div>
        );
      case "rsvp":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.rsvp.eyebrow} onChange={(v) => updateField("rsvp", "eyebrow", v)} />
            <AdminField label="Título" value={content.rsvp.title} onChange={(v) => updateField("rsvp", "title", v)} />
            <AdminField label="Palabra destacada" value={content.rsvp.titleAccent} onChange={(v) => updateField("rsvp", "titleAccent", v)} />
            <AdminField label="Descripción" value={content.rsvp.description} onChange={(v) => updateField("rsvp", "description", v)} multiline />
          </div>
        );
      case "guestbook":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.guestbook.eyebrow} onChange={(v) => updateField("guestbook", "eyebrow", v)} />
            <AdminField label="Título" value={content.guestbook.title} onChange={(v) => updateField("guestbook", "title", v)} />
            <AdminField label="Palabra destacada" value={content.guestbook.titleAccent} onChange={(v) => updateField("guestbook", "titleAccent", v)} />
            <AdminField label="Descripción" value={content.guestbook.description} onChange={(v) => updateField("guestbook", "description", v)} multiline />
            <AdminField label="Placeholder nombre" value={content.guestbook.namePlaceholder} onChange={(v) => updateField("guestbook", "namePlaceholder", v)} />
            <AdminField label="Placeholder mensaje" value={content.guestbook.messagePlaceholder} onChange={(v) => updateField("guestbook", "messagePlaceholder", v)} />
            <AdminField label="Texto botón" value={content.guestbook.buttonText} onChange={(v) => updateField("guestbook", "buttonText", v)} />
            <AdminField label="Título de agradecimiento" value={content.guestbook.successTitle} onChange={(v) => updateField("guestbook", "successTitle", v)} />
            <AdminField label="Texto de agradecimiento" value={content.guestbook.successBody} onChange={(v) => updateField("guestbook", "successBody", v)} multiline />
            <AdminField label="Texto cuando no hay deseos" value={content.guestbook.emptyText} onChange={(v) => updateField("guestbook", "emptyText", v)} multiline />
          </div>
        );
      case "faq":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Etiqueta" value={content.faq.eyebrow} onChange={(v) => updateField("faq", "eyebrow", v)} />
            <AdminField label="Título" value={content.faq.title} onChange={(v) => updateField("faq", "title", v)} />
            <AdminField label="Palabra destacada" value={content.faq.titleAccent} onChange={(v) => updateField("faq", "titleAccent", v)} />
            {content.faq.items.map((item, i) => (
              <div key={i} className="admin-card-inset space-y-3 p-4 sm:col-span-2">
                <AdminField label={`Pregunta ${i + 1}`} value={item.title} onChange={(v) => {
                  const items = [...content.faq.items];
                  items[i] = { ...items[i], title: v };
                  setContent((prev) => ({ ...prev, faq: { ...prev.faq, items } }));
                }} />
                <AdminField label="Respuesta" value={item.body} onChange={(v) => {
                  const items = [...content.faq.items];
                  items[i] = { ...items[i], body: v };
                  setContent((prev) => ({ ...prev, faq: { ...prev.faq, items } }));
                }} multiline />
              </div>
            ))}
            <AdminField label="Alojamiento — título" value={content.faq.lodgingTitle} onChange={(v) => updateField("faq", "lodgingTitle", v)} />
            <AdminField label="Alojamiento — texto" value={content.faq.lodgingBody} onChange={(v) => updateField("faq", "lodgingBody", v)} multiline />
            <AdminField label="Instagram Route G25" value={content.faq.lodgingInstagram} onChange={(v) => updateField("faq", "lodgingInstagram", v)} />
            <AdminField label="Teléfono Route G25" value={content.faq.lodgingPhone} onChange={(v) => updateField("faq", "lodgingPhone", v)} />
          </div>
        );
      case "footer":
        return (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Cita" value={content.footer.quote} onChange={(v) => updateField("footer", "quote", v)} multiline />
            <AdminField label="Palabra destacada en cita" value={content.footer.quoteAccent} onChange={(v) => updateField("footer", "quoteAccent", v)} />
            <AdminField label="Nombre 1" value={content.footer.name1} onChange={(v) => updateField("footer", "name1", v)} />
            <AdminField label="Nombre 2" value={content.footer.name2} onChange={(v) => updateField("footer", "name2", v)} />
            <AdminField label="Fecha" value={content.footer.dateLine} onChange={(v) => updateField("footer", "dateLine", v)} />
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <AdminShell
      title="Editar contenido"
      description="Modificá los textos de cada sección de la invitación. Los cambios se reflejan en el sitio al guardar."
      actions={
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="admin-btn admin-btn-primary px-6 py-2.5"
        >
          {saving ? "Guardando…" : "Guardar cambios"}
        </button>
      }
    >
      {(message || error) && (
        <div className="mb-6 space-y-3">
          {message && <AdminAlert variant="success">{message}</AdminAlert>}
          {error && <AdminAlert variant="error">{error}</AdminAlert>}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <nav className="admin-card h-max p-2 lg:sticky lg:top-6 lg:p-3">
          <p className="hidden px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-charcoal/40 lg:block">
            Secciones
          </p>
          <div className="flex flex-row gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {sections.map((section, i) => {
              const active = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => setActiveSection(section.key)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition lg:w-full ${
                    active ? "admin-section-link-active" : "admin-section-link"
                  }`}
                >
                  <span className="admin-section-num">{i + 1}</span>
                  {section.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="admin-card p-6 md:p-7">
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-sage/12 pb-4">
            <h2 className="admin-section-title">
              {sections.find((s) => s.key === activeSection)?.label}
            </h2>
            <span className="shrink-0 text-xs text-charcoal/45">
              Sección {sections.findIndex((s) => s.key === activeSection) + 1} de {sections.length}
            </span>
          </div>
          {renderSection()}
        </div>
      </div>
    </AdminShell>
  );
}