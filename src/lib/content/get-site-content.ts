import { DEFAULT_SITE_CONTENT } from "./defaults";
import type { SiteContent } from "./types";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function mergeContent(stored: Partial<SiteContent>): SiteContent {
  return {
    ...DEFAULT_SITE_CONTENT,
    ...stored,
    header: { ...DEFAULT_SITE_CONTENT.header, ...stored.header },
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...stored.hero },
    countdown: { ...DEFAULT_SITE_CONTENT.countdown, ...stored.countdown },
    story: { ...DEFAULT_SITE_CONTENT.story, ...stored.story },
    couple: { ...DEFAULT_SITE_CONTENT.couple, ...stored.couple },
    gallery: { ...DEFAULT_SITE_CONTENT.gallery, ...stored.gallery },
    details: { ...DEFAULT_SITE_CONTENT.details, ...stored.details },
    dressCode: { ...DEFAULT_SITE_CONTENT.dressCode, ...stored.dressCode },
    gift: { ...DEFAULT_SITE_CONTENT.gift, ...stored.gift },
    rsvp: { ...DEFAULT_SITE_CONTENT.rsvp, ...stored.rsvp },
    guestbook: { ...DEFAULT_SITE_CONTENT.guestbook, ...stored.guestbook },
    faq: { ...DEFAULT_SITE_CONTENT.faq, ...stored.faq },
    footer: { ...DEFAULT_SITE_CONTENT.footer, ...stored.footer },
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("content")
      .eq("id", "landing")
      .maybeSingle();

    if (error || !data?.content) {
      return DEFAULT_SITE_CONTENT;
    }

    return mergeContent(data.content as Partial<SiteContent>);
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}
