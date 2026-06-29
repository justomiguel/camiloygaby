-- Libro de deseos: mensajes que dejan los invitados
CREATE TABLE IF NOT EXISTS public.guestbook_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  is_private BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS guestbook_messages_created_at_idx
  ON public.guestbook_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS guestbook_messages_public_idx
  ON public.guestbook_messages (is_private, created_at DESC);

ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede dejar un deseo desde la web
CREATE POLICY "Inserción pública de deseos"
  ON public.guestbook_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Lectura pública solo de los deseos que no fueron marcados como privados
CREATE POLICY "Lectura pública de deseos visibles"
  ON public.guestbook_messages
  FOR SELECT
  TO anon, authenticated
  USING (is_private = false);
