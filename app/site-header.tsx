import Link from "next/link";
import { ORG } from "@/lib/seo";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-zinc-900">
          {ORG.nama}
        </Link>
        <nav aria-label="Navigasi utama" className="flex gap-6 text-sm font-medium">
          <Link href="/" className="text-zinc-600 hover:text-zinc-900">
            Beranda
          </Link>
          <Link href="/sewa" className="text-zinc-600 hover:text-zinc-900">
            Sewa Bolopecah
          </Link>
        </nav>
      </div>
    </header>
  );
}
