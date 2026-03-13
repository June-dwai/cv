import { notFound } from "next/navigation";

import { AdminNewsEditor } from "@/components/admin/admin-news-editor";
import { requireAdminSession } from "@/lib/admin-auth";
import { getNewsPostById } from "@/lib/news/db";

export const dynamic = "force-dynamic";

type AdminEditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPostPage({ params }: AdminEditPostPageProps) {
  await requireAdminSession();
  const { id } = await params;
  const post = await getNewsPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="shell py-10 md:py-14">
      <AdminNewsEditor post={post} />
    </div>
  );
}
