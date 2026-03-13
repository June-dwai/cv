import { randomUUID } from "node:crypto";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/admin-auth";

export const runtime = "nodejs";

function sanitizeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^\p{L}\p{N}.-]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "업로드할 파일이 없습니다." }, { status: 400 });
  }

  const isVideo = file.type.startsWith("video/");
  const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024;

  if (file.size > maxSize) {
    return NextResponse.json(
      {
        error: isVideo
          ? "영상은 50MB 이하만 업로드할 수 있습니다."
          : "이미지는 10MB 이하만 업로드할 수 있습니다.",
      },
      { status: 400 },
    );
  }

  const pathname = `news/${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${sanitizeFileName(file.name)}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
    contentType: file.type,
  });
}
