import { PENGURUS } from "@/lib/landing-content";

export function Pengurus() {
  return (
    <section id="struktur" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Struktur Pengurus</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Motor penggerak kegiatan Karang Taruna Paskelingan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {PENGURUS.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center reveal"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-border flex items-center justify-center text-muted-foreground mb-6 shadow-sm border-4 border-background">
                <span className="text-xs uppercase tracking-wider opacity-60">Foto</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{p.nama}</h3>
              <p className="text-primary font-medium">{p.jabatan}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
