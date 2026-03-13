import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE_NAME = "cv_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 14;

type SessionPayload = {
  exp: number;
  role: "admin";
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return secret;
}

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is not configured.");
  }

  return password;
}

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

function createSessionToken(payload: SessionPayload) {
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

function readSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [encoded, providedSignature] = token.split(".");

  if (!encoded || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encoded);
  const provided = Buffer.from(providedSignature, "utf8");
  const expected = Buffer.from(expectedSignature, "utf8");

  if (provided.length !== expected.length) {
    return null;
  }

  if (!timingSafeEqual(provided, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encoded)) as SessionPayload;

    if (payload.role !== "admin" || payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function validateAdminPassword(password: string) {
  const expected = Buffer.from(getAdminPassword(), "utf8");
  const provided = Buffer.from(password, "utf8");

  if (expected.length !== provided.length) {
    return false;
  }

  return timingSafeEqual(expected, provided);
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  const payload: SessionPayload = {
    role: "admin",
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };

  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();

  return Boolean(readSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value));
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
