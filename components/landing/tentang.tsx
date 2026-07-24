import { ALAMAT_LENGKAP } from "@/lib/seo";

export function Tentang() {
  return (
    <section id="tentang" className="py-20 px-6">
      <div className="mx-auto max-w-3xl text-center reveal">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang Kami</h2>
        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
          <p>
            Karang Taruna Paskelingan adalah wadah pemuda dan warga yang
            berfokus pada kerukunan serta pelayanan masyarakat. Berdiri sejak
            tahun 2016, kami terus berupaya memberikan manfaat langsung bagi
            lingkungan sekitar.
          </p>
          <p>
            Berpusat di {ALAMAT_LENGKAP}, kami mengelola berbagai kegiatan
            sosial dan menyediakan layanan sewa bolopecah (peralatan hajatan)
            yang tepercaya, terjangkau, dan mudah diakses oleh seluruh warga
            Ceper, Klaten, dan sekitarnya.
          </p>
        </div>
      </div>
    </section>
  );
}
