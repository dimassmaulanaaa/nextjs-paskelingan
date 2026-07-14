import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
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
      <header className="flex items-center justify-between border-b border-border pb-4">
        <span className="font-heading font-semibold">Dashboard Admin — {session.username}</span>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground hover:underline">
            Lihat Situs
          </Link>
          <form action={logout}>
            <button className="text-destructive hover:underline">Logout</button>
          </form>
        </div>
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
}
