-- Registro de visitas a la landing
CREATE TABLE IF NOT EXISTS public.site_visits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  country_code TEXT,
  country_name TEXT,
  city TEXT,
  region TEXT,
  referrer TEXT,
  path TEXT NOT NULL DEFAULT '/',
  user_agent TEXT,
  device_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS site_visits_created_at_idx ON public.site_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS site_visits_country_code_idx ON public.site_visits (country_code);
CREATE INDEX IF NOT EXISTS site_visits_session_id_idx ON public.site_visits (session_id);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Lectura solo para usuarios autenticados (admin vía API con service role omite RLS)
CREATE POLICY "Lectura autenticada de visitas"
  ON public.site_visits
  FOR SELECT
  TO authenticated
  USING (true);
