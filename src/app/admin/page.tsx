import { AdminEditor } from "@/components/admin/AdminEditor";
import { ADMIN_EMAIL } from "@/lib/content/defaults";
import { getSiteContent } from "@/lib/content/get-site-content";
import { createAuthServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createAuthServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    redirect("/admin/login?error=auth");
  }

  const content = await getSiteContent();

  return <AdminEditor initialContent={content} />;
}
