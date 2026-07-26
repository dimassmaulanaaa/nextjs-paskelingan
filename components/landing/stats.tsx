import { formatRupiah } from "@/lib/format";

export function Stats({ lowestPrice }: { lowestPrice: number }) {
  return (
    <section className="border-y border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
          <div className="reveal" style={{ animationDelay: "0ms" }}>
            <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">2016</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tahun Berdiri</p>
          </div>
          <div className="reveal" style={{ animationDelay: "100ms" }}>
            <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">15+</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Jenis Barang</p>
          </div>
          <div className="reveal hidden md:block" style={{ animationDelay: "200ms" }}>
            <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">Ceper</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Area Layanan</p>
          </div>
          <div className="reveal hidden md:block" style={{ animationDelay: "300ms" }}>
            <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{lowestPrice ? formatRupiah(lowestPrice) : "Rp100"}</p>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Harga Mulai</p>
          </div>
        </div>
      </div>
    </section>
  );
}
