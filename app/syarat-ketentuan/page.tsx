import type { Metadata } from "next";
import { ORG, ALAMAT_LENGKAP } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: `Aturan sewa bolopecah dari ${ORG.nama} — jaminan, tanggung jawab kerusakan, dan ketentuan lain.`,
};

const KETENTUAN = [
  {
    judul: "1. Cara Pemesanan",
    isi: `Pemesanan dilakukan melalui halaman Sewa: pilih tanggal dan jumlah barang, lalu kirim pengajuan via WhatsApp ke pengurus. Pesanan dikonfirmasi langsung di chat.`,
  },
  {
    judul: "2. Tanggung Jawab Barang Pecah / Hilang",
    isi: `Barang yang pecah, rusak, atau hilang selama masa sewa menjadi tanggung jawab penyewa. Biaya penggantian sesuai harga barang yang berlaku.`,
  },
  {
    judul: "3. Kondisi Pengembalian",
    isi: `Barang wajib dikembalikan dalam keadaan bersih dicuci dan tersusun rapi.`,
  },
  {
    judul: "4. Area Layanan",
    isi: `Layanan sewa mencakup area ${ORG.areaLayanan.join(", ")}.`,
  },
];

export default function SyaratKetentuanPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-6 pb-40 pt-32">
        <div className="mb-12 text-center reveal">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Aturan sewa bolopecah {ORG.nama}, {ORG.alamat.desa}.
          </p>
        </div>

        <div className="space-y-8">
          {KETENTUAN.map((k) => (
            <div key={k.judul}>
              <h2 className="font-heading text-xl font-semibold mb-2">
                {k.judul}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{k.isi}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mt-16 pt-8 border-t">
          Alamat: {ALAMAT_LENGKAP}.
          <br />
          Hubungi kami via{" "}
          <a
            href="https://wa.me/6287889198491"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
          >
            WhatsApp
          </a>{" "}
          untuk pertanyaan lebih lanjut.
        </p>
      </main>
    </>
  );
}
