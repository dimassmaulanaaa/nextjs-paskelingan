import Image from "next/image";
import { GALERI } from "@/lib/landing-content";

export function Galeri() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-10 reveal">
          <h2 className="text-3xl font-bold">Galeri Keboan Pason</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {GALERI.map((foto, i) => (
            <div
              key={foto.src}
              className="relative aspect-square bg-muted rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 reveal overflow-hidden"
              style={{ animationDelay: `${(i % 3) * 100}ms` }}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
