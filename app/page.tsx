import { ORG, ALAMAT_LENGKAP, jsonLdLocalBusiness } from "@/lib/seo";

// ponytail: placeholder beranda — section lengkap (Hero, Tentang, Kegiatan,
// Galeri, Struktur, Kontak, teaser katalog, FAQ) diisi di Task 7.
export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness()) }}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{ORG.nama}</h1>
      <p className="mt-4 text-zinc-600">
        {ALAMAT_LENGKAP}. Berdiri sejak {ORG.foundingDate}.
      </p>
    </main>
  );
}
