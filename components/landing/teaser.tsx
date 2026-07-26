import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/lib/format";
import { ArrowRight } from "lucide-react";

export function Teaser({ lowestPrice }: { lowestPrice: number }) {
  return (
    <section className="py-20 px-6 relative overflow-hidden bg-primary text-primary-foreground">
      <div className="aurora-bg absolute inset-0 opacity-20" />
      <div className="mx-auto max-w-4xl text-center relative z-10 reveal">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6">
          Katalog Lengkap
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Sewa Bolopecah untuk Segala Kebutuhan Hajatan
        </h2>
        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          Dari piring, gelas, hingga tikar dan kursi. Harga terjangkau mulai
          dari{" "}
          <strong className="text-white bg-accent px-2 py-1 rounded-md">
            {lowestPrice ? formatRupiah(lowestPrice) : "Rp100"}
          </strong>{" "}
          per biji.
        </p>
        <Button
          size="lg"
          className="h-14 px-8 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground text-lg shadow-xl shadow-accent/30 hover:-translate-y-1 transition-all"
          nativeButton={false}
          render={
            <Link href="/sewa">
              Lihat Katalog & Sewa Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          }
        />
      </div>
    </section>
  );
}
