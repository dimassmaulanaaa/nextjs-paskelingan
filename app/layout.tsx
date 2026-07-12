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

import { ORG, ALAMAT_LENGKAP, KEYWORDS } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: `${ORG.nama} — ${ORG.alamat.desa}, Klaten`,
    template: `%s — ${ORG.nama}`,
  },
  description: `${ORG.nama} di ${ALAMAT_LENGKAP}. Profil organisasi & sewa bolopecah (piring, gelas, mangkuk) untuk hajatan di Ceper, Klaten.`,
  keywords: [...KEYWORDS],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
