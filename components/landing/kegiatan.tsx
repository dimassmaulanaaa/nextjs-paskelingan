import { KEGIATAN } from "@/lib/landing-content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HeartHandshake, Flag, Tent } from "lucide-react";

export function Kegiatan() {
  const icons = [HeartHandshake, Flag, Tent];

  return (
    <section id="kegiatan" className="py-20 px-6 bg-muted/20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kegiatan & Program</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Berbagai aktivitas sosial dan layanan yang kami kelola untuk kemajuan Dukuh Keboan Pason.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {KEGIATAN.map((k, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Card
                key={k.judul}
                className="rounded-2xl border-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 reveal bg-background"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl">{k.judul}</CardTitle>
                  <CardDescription className="text-base mt-2">{k.desc}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
