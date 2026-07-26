import type { Metadata } from "next";
import { ORG, ALAMAT_LENGKAP } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: `Aturan sewa bolopecah dari ${ORG.nama} — jaminan, tanggung jawab kerusakan, dan ketentuan lain.`,
  // TODO: hapus baris robots di bawah saat konten S&K sudah final (bukan placeholder lagi).
  robots: { index: false, follow: false },
};

const KETENTUAN = [
  {
    judul: "1. Cara Pemesanan",
    isi: `Pemesanan dilakukan melalui halaman Sewa: pilih tanggal dan jumlah barang, lalu kirim pengajuan via WhatsApp ke pengurus. Pesanan dikonfirmasi langsung di chat.`,
  },
  {
    judul: "2. Jaminan / Deposit",
    isi: `Penyewa wajib menyerahkan jaminan sebesar [Rp ___] atau berupa [KTP/identitas lain] saat pengambilan barang. Jaminan dikembalikan setelah barang diperiksa lengkap dan tidak rusak.`,
  },
  {
    judul: "3. Tanggung Jawab Barang Pecah / Hilang",
    isi: `Barang yang pecah, rusak, atau hilang selama masa sewa menjadi tanggung jawab penyewa. Biaya penggantian sesuai harga barang yang berlaku, dipotong dari jaminan; kekurangan ditagih terpisah bila biaya melebihi jaminan.`,
  },
  {
    judul: "4. Durasi Sewa & Denda Keterlambatan",
    isi: `Masa sewa berlangsung selama [X hari] sejak tanggal pengambilan. Keterlambatan pengembalian dikenakan denda sebesar [Rp ___] per hari keterlambatan.`,
  },
  {
    judul: "5. Kondisi Pengembalian",
    isi: `Barang wajib dikembalikan dalam keadaan bersih (dicuci) dan tersusun rapi. Barang yang dikembalikan kotor dikenakan biaya pembersihan sebesar [Rp ___].`,
  },
  {
    judul: "6. Pembatalan Pesanan",
    isi: `Pembatalan pesanan paling lambat [X hari] sebelum tanggal acara. Pembatalan mendadak dapat dikenakan biaya sebesar [Rp ___].`,
  },
  {
    judul: "7. Area Layanan",
    isi: `Layanan sewa mencakup area ${ORG.areaLayanan.join(" & sekitar ")}.`,
  },
];

export default function SyaratKetentuanPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-6 pb-40 pt-32">
        <div className="mb-12 text-center reveal">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Draf Placeholder
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Syarat & Ketentuan
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Aturan sewa bolopecah {ORG.nama}, {ORG.alamat.desa}. Nominal dan
            durasi di bawah masih berupa placeholder dan akan diperbarui oleh
            pengurus.
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
          Alamat: {ALAMAT_LENGKAP}. Hubungi kami via WhatsApp untuk pertanyaan
          lebih lanjut.
        </p>
      </main>
    </>
  );
}
