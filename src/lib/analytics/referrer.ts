export function normalizeReferrer(referrer: string | null): string {
  if (!referrer || referrer.trim() === "") return "Directo";

  try {
    const url = new URL(referrer);
    const host = url.hostname.replace(/^www\./, "");

    if (/instagram/i.test(host)) return "Instagram";
    if (/facebook|fb\./i.test(host)) return "Facebook";
    if (/whatsapp/i.test(host)) return "WhatsApp";
    if (/google/i.test(host)) return "Google";
    if (/t\.co|twitter|x\.com/i.test(host)) return "X / Twitter";
    if (/tiktok/i.test(host)) return "TikTok";
    if (/linkedin/i.test(host)) return "LinkedIn";
    if (/mail\.|outlook|gmail/i.test(host)) return "Email";

    return host;
  } catch {
    return "Directo";
  }
}
