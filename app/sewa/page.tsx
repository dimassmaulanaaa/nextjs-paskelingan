import type { Metadata } from "next";
import { getItems } from "@/lib/catalog";
import { ORG } from "@/lib/seo";
import { RentalForm } from "@/components/sewa/rental-form";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Sewa Bolopecah",
  description: `Sewa bolopecah (piring, gelas, mangkuk, termos, kursi, tikar) untuk hajatan di Ceper, Klaten. Harga terjangkau dari ${ORG.nama}.`,
};

export default async function SewaPage({
  searchParams,
}: {
  searchParams: Promise<{ tanggal?: string }>;
}) {
  const items = await getItems();
  const { tanggal } = await searchParams;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-6 pb-40 pt-32 relative">
        <div className="mb-12 text-center reveal">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Formulir Pengajuan
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Katalog Sewa Bolopecah
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Daftar peralatan hajatan yang disewakan {ORG.nama}, {ORG.alamat.desa}, Klaten.
            Isi tanggal acara dan jumlah barang, sistem otomatis menghitung subtotal.
          </p>
        </div>
        <RentalForm items={items} initialDate={tanggal} />
      </main>
      <div className="aurora-bg fixed inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none -z-10" />
    </>
  );
}
