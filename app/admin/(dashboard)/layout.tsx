import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import { logout } from "../actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const secret = process.env.SESSION_SECRET ?? "";
  const session = token ? verifySession(token, secret) : null;

  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="flex items-center justify-between border-b border-zinc-200 pb-4">
        <span className="font-semibold">Dashboard Admin — {session.username}</span>
        <form action={logout}>
          <button className="text-sm text-red-600 hover:underline">Logout</button>
        </form>
      </header>
      {children}
    </div>
  );
}
