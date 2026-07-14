import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ORG, ALAMAT_LENGKAP, KEYWORDS, SITE_URL } from "@/lib/seo";

const judul = `${ORG.nama} — ${ORG.alamat.desa}, Klaten`;
const deskripsi = `${ORG.nama} di ${ALAMAT_LENGKAP}. Profil organisasi & sewa bolopecah (piring, gelas, mangkuk) untuk hajatan di Ceper, Klaten.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: judul,
    template: `%s — ${ORG.nama}`,
  },
  description: deskripsi,
  keywords: [...KEYWORDS],
  openGraph: {
    title: judul,
    description: deskripsi,
    url: SITE_URL,
    siteName: ORG.nama,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-green-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Lompat ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
