import Link from "next/link";
import { getItems, hargaTerendah } from "@/lib/catalog";
import { formatRupiah } from "@/lib/format";
import { ORG, ALAMAT_LENGKAP, jsonLdLocalBusiness } from "@/lib/seo";
import { SiteHeader } from "./site-header";

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
      <section className="bg-green-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {ORG.nama}
          </h1>
          <p className="mt-4 text-lg text-green-50">
            Karang Taruna resmi {ORG.alamat.dukuh}, {ORG.alamat.desa},
            Kecamatan Ceper, Kabupaten Klaten, Jawa Tengah. Berdiri sejak{" "}
            {ORG.foundingDate}.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/sewa"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
            >
              Sewa Bolopecah
            </Link>
            <a
              href="#tentang"
              className="rounded-lg border border-white/40 px-5 py-3 font-semibold hover:bg-white/10"
            >
              Tentang Kami
            </a>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <Section id="tentang" judul="Tentang Paskelingan">
        <p className="text-zinc-600">
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
            <div key={k.judul} className="rounded-lg border border-zinc-200 p-4">
              <h3 className="font-semibold">{k.judul}</h3>
              <p className="mt-1 text-sm text-zinc-600">{k.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Galeri (placeholder) */}
      <Section judul="Galeri">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-zinc-100 text-sm text-zinc-400"
            >
              Foto kegiatan {i + 1}
            </div>
          ))}
        </div>
      </Section>

      {/* Teaser katalog */}
      <Section judul="Sewa Bolopecah">
        <p className="text-zinc-600">
          Sewa peralatan hajatan mulai{" "}
          <strong className="text-green-700">{formatRupiah(mulai)}</strong> per
          satuan — piring, gelas, mangkuk, termos, kursi, tikar, dan lainnya.
        </p>
        <Link
          href="/sewa"
          className="mt-4 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          Lihat Katalog & Ajukan Sewa
        </Link>
      </Section>

      {/* Struktur Pengurus */}
      <Section judul="Struktur Pengurus">
        <div className="grid gap-4 sm:grid-cols-3">
          {PENGURUS.map((p) => (
            <div key={p.jabatan} className="rounded-lg border border-zinc-200 p-4 text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-zinc-100" />
              <p className="font-semibold">{p.nama}</p>
              <p className="text-sm text-zinc-500">{p.jabatan}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section judul="Pertanyaan Umum">
        <div className="space-y-4">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Kontak */}
      <Section id="kontak" judul="Kontak">
        <p className="text-zinc-600">{ALAMAT_LENGKAP}</p>
        <a
          href={`https://wa.me/${ORG.wa}`}
          className="mt-3 inline-block font-semibold text-green-700 hover:underline"
        >
          WhatsApp: {ORG.waDisplay}
        </a>
      </Section>

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500">
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
        <h2 className="text-2xl font-semibold tracking-tight">{judul}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </section>
  );
}
