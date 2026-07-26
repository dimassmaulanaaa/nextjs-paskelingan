"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { ORG } from "@/lib/seo";
import { HERO_FOTO } from "@/lib/landing-content";
import { useTodayISO } from "@/lib/use-today";

const [foto1, foto2, foto3, foto4] = HERO_FOTO;

export function Hero() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const today = useTodayISO();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (date) {
      router.push(`/sewa?tanggal=${date}`);
    } else {
      router.push("/sewa");
    }
  };

  return (
    <section className="relative min-h-screen pt-24 pb-12 px-6 overflow-hidden flex items-center">
      <div className="aurora-bg absolute inset-0 opacity-10 dark:opacity-20" />

      <div className="mx-auto w-full max-w-6xl relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div
          className="flex flex-col gap-6 reveal"
          style={{ animationDelay: "0ms" }}
        >
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
              Berdiri sejak {ORG.foundingDate}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Sewa Bolopecah <br className="hidden sm:block" />
              <span className="text-primary">Mudah & Cepat</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Layanan sewa peralatan hajatan resmi dari Karang Taruna
              Paskelingan untuk warga Keboan Pason, Ceper, Klaten, dan
              sekitarnya.
            </p>
          </div>

          <Card className="glass-card p-4 sm:p-6 rounded-2xl shadow-lg border-white/20 dark:border-white/10 max-w-md">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-4 items-end"
            >
              <div className="flex-1 w-full space-y-2">
                <Label htmlFor="tanggal-hero" className="font-semibold ml-1">
                  Tanggal Acara
                </Label>
                <Input
                  id="tanggal-hero"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background/50 h-12 rounded-xl"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto h-12 rounded-xl px-8 shadow-primary/20 hover:shadow-primary/40 shadow-lg transition-all hover:-translate-y-1"
              >
                <Search className="w-4 h-4 mr-2" />
                Cari
              </Button>
            </form>
          </Card>
        </div>

        <div
          className="grid grid-cols-2 gap-4 reveal"
          style={{ animationDelay: "150ms" }}
        >
          <div className="space-y-4 pt-8">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Image
                src={foto1.src}
                alt={foto1.alt}
                fill
                preload
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-muted shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Image
                src={foto2.src}
                alt={foto2.alt}
                fill
                preload
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-4/5 bg-muted shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Image
                src={foto3.src}
                alt={foto3.alt}
                fill
                preload
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-muted shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Image
                src={foto4.src}
                alt={foto4.alt}
                fill
                preload
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
