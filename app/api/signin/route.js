import { NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/data";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/session";

function safeRedirectPath(value) {
  // Accept only local absolute paths. Reject //evil.example, schemes, backslashes,
  // and any value that does not begin with exactly one slash.
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  try {
    const parsed = new URL(value, "http://local.invalid");
    if (parsed.origin !== "http://local.invalid") return "/";
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return "/";
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const user = findUserByEmail(email);

  // Demo only: production must compare a password hash, never plain text.
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = await createSessionToken(user);
  const response = NextResponse.json({ redirectTo: safeRedirectPath(body.next) });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}
