import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

// Optimistic check (Next 16 proxy, ex-middleware): redirect ke login bila
// cookie sesi absen. Verifikasi otoritatif tetap di admin (dashboard)/layout.
export function proxy(request: NextRequest) {
  const hasCookie = request.cookies.has(SESSION_COOKIE);
  if (!hasCookie) {
    const url = new URL("/admin/login", request.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
