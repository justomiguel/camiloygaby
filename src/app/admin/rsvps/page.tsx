import { AdminRsvps } from "@/components/admin/AdminRsvps";
import { ADMIN_EMAIL } from "@/lib/content/defaults";
import { createAuthServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminRsvpsPage() {
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

  return <AdminRsvps />;
}
