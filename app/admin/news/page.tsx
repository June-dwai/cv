import Link from "next/link";

import { requireAdminSession } from "@/lib/admin-auth";
import { isNewsStorageConfigured, listAdminNews } from "@/lib/news/db";

export const dynamic = "force-dynamic";

function formatAdminDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AdminNewsIndexPage() {
  await requireAdminSession();
  const posts = await listAdminNews();
  const configured = isNewsStorageConfigured();

  return (
    <div className="shell py-10 md:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-label">ADMIN</p>
          <h1 className="section-title">소식 관리</h1>
          <p className="section-copy">글을 작성하고 게시 상태를 관리합니다.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/ko/news" className="btn-secondary">
            공개 페이지 보기
          </Link>
          <Link href="/admin/news/new" className="btn-primary">
            새 글 작성
          </Link>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="btn-secondary">
              로그아웃
            </button>
          </form>
        </div>
      </div>

      {!configured ? (
        <div className="editorial-card mt-8">
          <p className="text-sm font-semibold text-foreground">
            `DATABASE_URL`이 아직 설정되지 않았습니다.
          </p>
          <p className="mt-2 text-sm text-muted">
            `.env.local` 또는 Vercel 환경변수에 `DATABASE_URL`, `SESSION_SECRET`,
            `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`을 넣으면 바로 사용할 수 있습니다.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/news/${post.id}`}
              className="editorial-card transition-colors hover:border-accent/30 hover:bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-foreground">{post.title}</p>
                  <p className="mt-2 text-sm text-muted">
                    {post.locale.toUpperCase()} · {post.status === "published" ? "게시됨" : "임시저장"}
                  </p>
                </div>
                <p className="text-sm text-muted">{formatAdminDate(post.updatedAt)}</p>
              </div>
              {post.excerpt ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
              ) : null}
            </Link>
          ))
        ) : (
          <div className="editorial-card">
            <p className="text-sm font-semibold text-foreground">작성된 소식이 없습니다.</p>
            <p className="mt-2 text-sm text-muted">
              첫 게시물을 만들어 공개 페이지에 바로 띄울 수 있습니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
