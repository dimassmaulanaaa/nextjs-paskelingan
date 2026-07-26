"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ORG } from "@/lib/seo";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/#tentang", label: "Tentang" },
  { href: "/#kegiatan", label: "Kegiatan" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-4 inset-x-4 z-50 pointer-events-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 rounded-2xl pointer-events-auto shadow-sm border border-border/40 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/50">
        <Link
          href="/"
          className="font-heading text-lg font-bold text-foreground flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Image
            src="https://rxgs3mtqd5hkxooj.public.blob.vercel-storage.com/brand/paskelingan-logo-main.png"
            alt="Logo Karang Taruna Paskelingan"
            width={80}
            height={80}
            className="size-10"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <nav
            aria-label="Navigasi utama"
            className="hidden md:flex gap-6 text-sm font-medium"
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-border/50 pl-4 md:pl-6">
            <ModeToggle />
            <Button
              className="hidden sm:inline-flex rounded-xl font-semibold shadow-md shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
              nativeButton={false}
              render={<Link href="/sewa">Ajukan Sewa</Link>}
            />

            {/* Hamburger — mobile only */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden rounded-xl"
                    aria-label="Buka menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                }
              />
              <SheetContent
                side="right"
                className="w-72 bg-background/95 backdrop-blur-xl"
              >
                <SheetTitle className="px-6 pt-6 flex items-center gap-2 text-lg">
                  <Image
                    src="https://rxgs3mtqd5hkxooj.public.blob.vercel-storage.com/brand/paskelingan-logo-main.png"
                    alt=""
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  {ORG.nama}
                </SheetTitle>
                <nav
                  aria-label="Navigasi mobile"
                  className="flex flex-col gap-1 px-4 mt-6"
                >
                  {NAV_LINKS.map((l) => (
                    <SheetClose
                      key={l.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={l.href}
                          className="px-4 py-3 rounded-xl text-base font-medium text-foreground hover:bg-muted transition-colors"
                        >
                          {l.label}
                        </Link>
                      }
                    />
                  ))}
                </nav>
                <div className="px-4 mt-6">
                  <SheetClose
                    nativeButton={false}
                    render={
                      <Link
                        href="/sewa"
                        className="flex items-center justify-center w-full rounded-xl h-12 font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:bg-primary/90 transition-colors"
                      >
                        Ajukan Sewa
                      </Link>
                    }
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
