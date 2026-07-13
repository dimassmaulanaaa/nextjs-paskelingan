"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  verifyPassword,
  signSession,
  verifySession,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

import { revalidatePath } from "next/cache";
import { createItem, updateItem, deleteItem } from "@/lib/catalog";

async function requireAuth() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const secret = process.env.SESSION_SECRET;
  if (!token || !secret) throw new Error("Unauthorized");
  const session = verifySession(token, secret);
  if (!session) throw new Error("Unauthorized");
}

// (auth actions existing...)
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

function parseItemForm(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const unit_price = parseInt(String(formData.get("unit_price") ?? "0"), 10) || 0;
  const group_name = String(formData.get("group_name") ?? "");
  return { name, unit_price, group_name };
}

export async function actionCreateItem(_prev: unknown, formData: FormData) {
  try {
    await requireAuth();
    const { name, unit_price, group_name } = parseItemForm(formData);
    await createItem(name, unit_price, group_name);
    revalidatePath("/sewa");
    revalidatePath("/"); // Harga teaser mungkin berubah
    return { success: true, message: `Barang "${name}" ditambahkan.` };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Gagal menambah barang." };
  }
}

export async function actionUpdateItem(_prev: unknown, formData: FormData) {
  try {
    await requireAuth();
    const id = parseInt(String(formData.get("id") ?? "0"), 10);
    const { name, unit_price, group_name } = parseItemForm(formData);
    await updateItem(id, name, unit_price, group_name);
    revalidatePath("/sewa");
    revalidatePath("/");
    return { success: true, message: `Barang "${name}" diperbarui.` };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Gagal memperbarui barang." };
  }
}

export async function actionDeleteItem(_prev: unknown, formData: FormData) {
  try {
    await requireAuth();
    const id = parseInt(String(formData.get("id") ?? "0"), 10);
    await deleteItem(id);
    revalidatePath("/sewa");
    revalidatePath("/");
    return { success: true, message: "Barang dihapus." };
  } catch (err: unknown) {
    return { error: err instanceof Error ? err.message : "Gagal menghapus barang." };
  }
}
