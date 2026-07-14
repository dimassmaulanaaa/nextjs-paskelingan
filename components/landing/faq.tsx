import { FAQ } from "@/lib/landing-content";

export function FaqSection() {
  return (
    <section className="py-20 px-6">
      <div className="mx-auto max-w-3xl reveal">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-6">
          {FAQ.map((f, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-foreground mb-3">{f.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
