import { AdminNewsEditor } from "@/components/admin/admin-news-editor";
import { requireAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  await requireAdminSession();

  return (
    <div className="shell py-10 md:py-14">
      <AdminNewsEditor />
    </div>
  );
}
