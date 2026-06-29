import type { VisitDeviceType } from "./types";

export function detectDeviceType(userAgent: string | null): VisitDeviceType {
  if (!userAgent) return "unknown";

  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

export function deviceLabel(device: VisitDeviceType): string {
  switch (device) {
    case "mobile":
      return "Móvil";
    case "tablet":
      return "Tablet";
    case "desktop":
      return "Escritorio";
    default:
      return "Desconocido";
  }
}
