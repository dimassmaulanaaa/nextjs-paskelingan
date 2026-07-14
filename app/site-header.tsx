import Link from "next/link";
import { ORG } from "@/lib/seo";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-foreground">
          {ORG.nama}
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Navigasi utama" className="flex gap-6 text-sm font-medium">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Beranda
            </Link>
            <Link href="/sewa" className="text-muted-foreground hover:text-foreground">
              Sewa Bolopecah
            </Link>
          </nav>
          <ModeToggle />
        </div>
      </div>
      <div className="lurik-divider" />
    </header>
  );
}
