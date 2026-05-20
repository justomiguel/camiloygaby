-- Tabla de confirmaciones de asistencia
CREATE TABLE IF NOT EXISTS public.rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  acompanante TEXT,
  asiste BOOLEAN NOT NULL DEFAULT true,
  vegetariano BOOLEAN NOT NULL DEFAULT false,
  quiere_cantar BOOLEAN NOT NULL DEFAULT false,
  pista_cantar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON public.rsvps (created_at DESC);

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

-- Solo inserciones anónimas desde la web (lectura restringida al service role)
CREATE POLICY "Permitir insert público de RSVPs"
  ON public.rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
