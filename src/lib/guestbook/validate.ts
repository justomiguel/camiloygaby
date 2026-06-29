import type { GuestbookInsert } from "@/lib/supabase/server";

export const GUESTBOOK_NAME_MAX = 60;
export const GUESTBOOK_MESSAGE_MAX = 400;

export function validateGuestbookPayload(body: Partial<GuestbookInsert>): {
  data?: GuestbookInsert;
  error?: string;
} {
  const nombre = body.nombre?.trim();
  if (!nombre || nombre.length < 2) {
    return { error: "Cuéntanos quién firma con tu nombre." };
  }
  if (nombre.length > GUESTBOOK_NAME_MAX) {
    return { error: `El nombre no puede superar ${GUESTBOOK_NAME_MAX} caracteres.` };
  }

  const mensaje = body.mensaje?.trim();
  if (!mensaje || mensaje.length < 3) {
    return { error: "Escribe un pequeño deseo para los novios." };
  }
  if (mensaje.length > GUESTBOOK_MESSAGE_MAX) {
    return { error: `El mensaje no puede superar ${GUESTBOOK_MESSAGE_MAX} caracteres.` };
  }

  return { data: { nombre, mensaje } };
}
