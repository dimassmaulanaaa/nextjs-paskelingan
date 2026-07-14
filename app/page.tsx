import Link from "next/link";
import { Images } from "lucide-react";
import { getItems, hargaTerendah } from "@/lib/catalog";
import { formatRupiah } from "@/lib/format";
import { ORG, ALAMAT_LENGKAP, jsonLdLocalBusiness } from "@/lib/seo";
import { SiteHeader } from "./site-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ponytail: teks & foto placeholder pintar (memuat kata kunci lokasi).
// Pengurus mengganti konten asli ≤ H+30 sesuai spec.

const KEGIATAN = [
  { judul: "Kerja Bakti", desc: "Gotong royong warga Keboan Pason menjaga kebersihan dan kerukunan lingkungan." },
  { judul: "Peringatan HUT RI", desc: "Lomba dan malam tirakatan setiap Agustus di Dukuh Keboan Pason, Ceper." },
  { judul: "Sewa Bolopecah", desc: "Layanan sewa peralatan hajatan untuk warga Ceper dan sekitar Klaten." },
];

const PENGURUS = [
  { nama: "[Nama Ketua]", jabatan: "Ketua" },
  { nama: "[Nama Sekretaris]", jabatan: "Sekretaris" },
  { nama: "[Nama Bendahara]", jabatan: "Bendahara" },
];

const FAQ = [
  {
    q: "Bagaimana cara menyewa bolopecah di Paskelingan?",
    a: "Buka halaman Sewa, pilih tanggal dan jumlah barang, lalu tekan tombol untuk mengirim pengajuan via WhatsApp ke pengurus.",
  },
  {
    q: "Di mana lokasi Karang Taruna Paskelingan?",
    a: `Kami berada di ${ALAMAT_LENGKAP}.`,
  },
  {
    q: "Barang apa saja yang bisa disewa?",
    a: "Piring, gelas, mangkuk, lepek, baki, porong, ceret, termos, tikar, dan kursi untuk keperluan hajatan.",
  },
];

export default async function Home() {
  const items = await getItems();
  const mulai = hargaTerendah(items);

  return (
    <>
      <SiteHeader />
      <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness()) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-primary-foreground">
        <div className="lurik-motif pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-3xl">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {ORG.nama}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/85">
            Karang Taruna resmi {ORG.alamat.dukuh}, {ORG.alamat.desa},
            Kecamatan Ceper, Kabupaten Klaten, Jawa Tengah. Berdiri sejak{" "}
            {ORG.foundingDate}.
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg" variant="secondary" nativeButton={false} render={<Link href="/sewa">Sewa Bolopecah</Link>} />
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              nativeButton={false}
              render={<a href="#tentang">Tentang Kami</a>}
            />
          </div>
        </div>
      </section>

      <div className="lurik-divider" />

      {/* Tentang */}
      <Section id="tentang" judul="Tentang Paskelingan">
        <p className="text-muted-foreground">
          {ORG.nama} adalah organisasi kepemudaan di {ORG.alamat.dukuh},{" "}
          {ORG.alamat.desa}, Kecamatan Ceper, Kabupaten Klaten. Sejak{" "}
          {ORG.foundingDate}, kami menggerakkan kegiatan sosial, kepemudaan, dan
          gotong royong warga, serta melayani sewa bolopecah untuk hajatan di
          Ceper dan sekitar Klaten.
        </p>
      </Section>

      {/* Kegiatan */}
      <Section judul="Kegiatan & Program">
        <div className="grid gap-4 sm:grid-cols-3">
          {KEGIATAN.map((k) => (
            <Card key={k.judul} className="p-4">
              <h3 className="font-heading font-semibold">{k.judul}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{k.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Galeri (placeholder) */}
      <Section judul="Galeri">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border border-border bg-muted text-muted-foreground"
            >
              <Images className="size-6" aria-hidden />
              <span className="text-sm">Foto kegiatan {i + 1}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Teaser katalog */}
      <Section judul="Sewa Bolopecah">
        <p className="text-muted-foreground">
          Sewa peralatan hajatan mulai{" "}
          <strong className="text-primary">{formatRupiah(mulai)}</strong> per
          satuan — piring, gelas, mangkuk, termos, kursi, tikar, dan lainnya.
        </p>
        <Button className="mt-4" nativeButton={false} render={<Link href="/sewa">Lihat Katalog & Ajukan Sewa</Link>} />
      </Section>

      {/* Struktur Pengurus */}
      <Section judul="Struktur Pengurus">
        <div className="grid gap-4 sm:grid-cols-3">
          {PENGURUS.map((p) => (
            <Card key={p.jabatan} className="p-4 text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-muted" />
              <p className="font-semibold">{p.nama}</p>
              <p className="text-sm text-muted-foreground">{p.jabatan}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section judul="Pertanyaan Umum">
        <div className="space-y-4">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kontak */}
      <Section id="kontak" judul="Kontak">
        <p className="text-muted-foreground">{ALAMAT_LENGKAP}</p>
        <a
          href={`https://wa.me/${ORG.wa}`}
          className="mt-3 inline-block font-semibold text-primary hover:underline"
        >
          WhatsApp: {ORG.waDisplay}
        </a>
      </Section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © {ORG.foundingDate}–sekarang {ORG.nama}, {ORG.alamat.desa}, Klaten.
      </footer>
      </main>
    </>
  );
}

function Section({
  id,
  judul,
  children,
}: {
  id?: string;
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">{judul}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}
