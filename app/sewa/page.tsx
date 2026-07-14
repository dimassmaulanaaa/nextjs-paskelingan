import type { Metadata } from "next";
import { getItems } from "@/lib/catalog";
import { ORG } from "@/lib/seo";
import { RentalForm } from "./rental-form";
import { SiteHeader } from "../site-header";

export const metadata: Metadata = {
  title: "Sewa Bolopecah",
  description: `Sewa bolopecah (piring, gelas, mangkuk, termos, kursi, tikar) untuk hajatan di Ceper, Klaten. Harga terjangkau dari ${ORG.nama}.`,
};

export default async function SewaPage() {
  const items = await getItems();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Sewa Bolopecah</h1>
        <p className="mt-4 text-muted-foreground">
          Daftar peralatan hajatan yang disewakan {ORG.nama}, {ORG.alamat.desa},
          Klaten. Pilih jumlah, lalu ajukan sewa via WhatsApp.
        </p>
        <RentalForm items={items} />
      </main>
    </>
  );
}
