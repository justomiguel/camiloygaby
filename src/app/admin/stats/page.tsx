import { AdminStats } from "@/components/admin/AdminStats";
import { ADMIN_EMAIL } from "@/lib/content/defaults";
import { createAuthServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminStatsPage() {
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

  return <AdminStats />;
}
