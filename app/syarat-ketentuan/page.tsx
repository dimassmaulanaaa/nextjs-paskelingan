import type { Metadata } from "next";
import { ORG } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/site-header";
import { SyaratKetentuan } from "@/components/syarat-ketentuan/syarat-ketentuan";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: `Aturan sewa bolopecah dari ${ORG.nama} — jaminan, tanggung jawab kerusakan, dan ketentuan lain.`,
};

export default function SyaratKetentuanPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-6 pb-40 pt-32">
        <SyaratKetentuan />
      </main>
    </>
  );
}
