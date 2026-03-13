import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/news");
  }

  return (
    <div className="shell flex min-h-screen items-center justify-center py-16">
      <div className="w-full max-w-md rounded-[1.5rem] border border-border bg-surface-strong p-6 shadow-sm">
        <p className="section-label">ADMIN</p>
        <h1 className="section-title">소식 작성 로그인</h1>
        <p className="section-copy">
          관리자 비밀번호를 입력하면 글 작성, 이미지 업로드, 게시 상태 변경을 할 수 있습니다.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
