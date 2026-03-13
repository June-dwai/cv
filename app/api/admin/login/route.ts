import { NextResponse } from "next/server";
import { z } from "zod";

import { createAdminSession, validateAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

const schema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "비밀번호를 입력해주세요." }, { status: 400 });
  }

  if (!validateAdminPassword(parsed.data.password)) {
    return NextResponse.json({ error: "비밀번호가 올바르지 않습니다." }, { status: 401 });
  }

  await createAdminSession();

  return NextResponse.json({ ok: true });
}
