# camiloygaby

Landing page de invitación al matrimonio de Gabriela y Juan Camilo. 19 de diciembre de 2026, Route G25, San José de Maipo.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) para animaciones
- [Supabase](https://supabase.com/) para confirmaciones de asistencia (RSVP)
- [Sharp](https://sharp.pixelplumbing.com/) para generar la imagen Open Graph
- Deploy en [Vercel](https://vercel.com/)

## Estructura de la página

| Sección | Componente | Foto destacada |
|---------|-----------|----------------|
| Hero con parallax | `Hero.tsx` | `pareja-arbol.jpg` |
| Cuenta regresiva animada | `Countdown.tsx` | — |
| Nuestra historia | `Story.tsx` | `mendoza.jpg` |
| Los protagonistas | `Couple.tsx` | `gabriela-retrato.jpg` + `juancamilo-retrato.png` |
| Galería de momentos | `Gallery.tsx` | `infancia.jpg`, `mendoza.jpg`, `20220730_115536.jpg`, `20220806_115518.jpg`, `20220919_135242.jpg`, `IMG_20221023_131056_285.jpg`, `viaje-palmeras.jpg`, `pareja-arbol.jpg` |
| Lugar y horario | `Details.tsx` | — |
| Mapa Google Maps | `MapSection.tsx` | — |
| Dress Code | `DressCode.tsx` | — |
| Regalo (Mercado Pago) | `Gift.tsx` | — |
| Confirmación (RSVP) | `RsvpSection.tsx` + `RsvpForm.tsx` | — |
| FAQ | `Faq.tsx` | — |
| Footer | `Footer.tsx` | — |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Imagen Open Graph (WhatsApp / Twitter / Telegram)

La imagen `public/og-image.jpg` (1200×630) se usa para previews al compartir el link.
Está construida en build-time desde `public/fotos/pareja-arbol.jpg` con Sharp.

Si cambias la foto principal, regenera con:

```bash
npm run og:generate
```

El template se edita en `scripts/generate-og.mjs`.

## Favicons

Los íconos viven en `public/favicon/` y se referencian desde `metadata.icons` en `src/app/layout.tsx`. El manifest PWA está en `public/favicon/site.webmanifest`.

## Base de datos (Supabase)

Ejecuta la migración una sola vez en el SQL Editor de Supabase:

```
supabase/migrations/001_rsvps.sql
```

Crea la tabla `rsvps` con los campos del formulario:

| Campo | Tipo |
|-------|------|
| `nombre` | texto (obligatorio) |
| `acompanante` | texto opcional |
| `asiste` | boolean |
| `vegetariano` | boolean |
| `quiere_cantar` | boolean |
| `pista_cantar` | texto opcional |

Verifica con:

```bash
npm run db:check
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | Proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Cliente Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Inserciones desde el server (API route) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Mapa embebido |
| `NEXT_PUBLIC_APP_URL` | URL pública (importante para OG/WhatsApp) |

## Deploy en Vercel

1. Conecta el repositorio
2. Agrega las mismas variables de entorno
3. **Importante**: configura `NEXT_PUBLIC_APP_URL` con la URL final de producción para que las imágenes Open Graph se sirvan en absoluto
4. Deploy automático en cada push a `main`
