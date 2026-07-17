import { getItems, hargaTerendah } from "@/lib/catalog";
import { jsonLdLocalBusiness } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { Tentang } from "@/components/landing/tentang";
import { Kegiatan } from "@/components/landing/kegiatan";
import { Galeri } from "@/components/landing/galeri";
import { Teaser } from "@/components/landing/teaser";
import { Pengurus } from "@/components/landing/pengurus";
import { FaqSection } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

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

        <Hero />
        <Stats hargaTerendah={mulai} />
        <Tentang />
        <Kegiatan />
        <Galeri />
        <Teaser hargaTerendah={mulai} />
        <Pengurus />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
