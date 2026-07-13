"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyPassword,
  signSession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

export async function login(_prev: unknown, formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const envUser = process.env.ADMIN_USERNAME;
  const envHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.SESSION_SECRET;
  if (!envUser || !envHash || !secret) {
    return { error: "Auth belum dikonfigurasi. Set env admin." };
  }

  if (username !== envUser || !verifyPassword(password, envHash)) {
    return { error: "Username atau password salah." };
  }

  const token = signSession(username, secret, SESSION_MAX_AGE);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}
