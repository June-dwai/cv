"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    startTransition(async () => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        setError(payload?.error ?? "로그인에 실패했습니다.");
        return;
      }

      router.push("/admin/news");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <label className="block">
        <span className="section-label">PASSWORD</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent"
          placeholder="관리자 비밀번호"
          autoComplete="current-password"
        />
      </label>
      {error ? <p className="text-sm text-[#9b3c3c]">{error}</p> : null}
      <button type="submit" className="btn-primary w-full" disabled={isPending}>
        {isPending ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
