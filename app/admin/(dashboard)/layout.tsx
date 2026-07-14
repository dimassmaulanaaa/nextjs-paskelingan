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
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-4 inset-x-4 z-50 pointer-events-none mb-10">
        <div className="mx-auto flex max-w-5xl items-center justify-between glass-card px-6 py-3 rounded-2xl pointer-events-auto shadow-sm">
          <span className="font-heading font-bold text-foreground">Admin: {session.username}</span>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Ke Situs Publik
            </Link>
            <form action={logout}>
              <button className="text-destructive hover:text-destructive/80 transition-colors">Logout</button>
            </form>
          </div>
        </div>
      </header>
      <main id="main-content" className="mx-auto max-w-5xl px-6 pb-20 pt-20">
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-6 sm:p-8 reveal">
          {children}
        </div>
      </main>
    </div>
  );
}
