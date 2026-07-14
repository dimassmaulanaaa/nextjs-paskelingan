import { Images } from "lucide-react";

export function Galeri() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-10 reveal">
          <h2 className="text-3xl font-bold">Galeri Keboan Pason</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-muted rounded-2xl flex flex-col items-center justify-center text-muted-foreground/40 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 reveal overflow-hidden"
              style={{ animationDelay: `${(i % 3) * 100}ms` }}
            >
              <Images className="w-10 h-10 mb-2 opacity-50" />
              <span className="text-sm font-medium">Foto Kegiatan {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
