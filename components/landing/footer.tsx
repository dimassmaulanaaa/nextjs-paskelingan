import { ALAMAT_LENGKAP } from "@/lib/seo";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      id="kontak"
      className="bg-slate-900 text-slate-100 pt-20 pb-10 px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">
              Karang Taruna Paskelingan
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-md">
              Membangun kerukunan dan melayani masyarakat Dukuh Keboan Pason,
              Ceper, Klaten sejak tahun 2016.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/paskelingan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.15-.55.55-.9 1.11-1.15 1.77-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47.66-.26 1.22-.6 1.77-1.15.55-.55.9-1.11 1.15-1.77.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43-.26-.66-.6-1.22-1.15-1.77-.55-.55-1.11-.9-1.77-1.15-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.34.47.18.8.4 1.15.75.35.35.57.68.75 1.15.13.36.3.88.34 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.34 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.13-.88.3-1.86.34-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.34-.47-.18-.8-.4-1.15-.75-.35-.35-.57-.68-.75-1.15-.13-.36-.3-.88-.34-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.34-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.13.88-.3 1.86-.34C9.01 3.81 9.33 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@karangtarunapaskelingan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                >
                  <path d="M16.6 2h-3.2v13.6a3.1 3.1 0 1 1-2.2-2.97v-3.28a6.3 6.3 0 1 0 5.4 6.25V8.6c1.24.9 2.76 1.43 4.4 1.43V6.83c-1.86 0-3.4-1.16-4.06-2.84A5.3 5.3 0 0 1 16.6 2Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">
              Kontak & Lokasi
            </h3>
            <a
              href="https://maps.app.goo.gl/Y2fidoeckYYkESR27"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 text-slate-300 hover:text-white transition-colors"
            >
              <MapPin className="w-6 h-6 shrink-0 text-accent" />
              <p className="leading-relaxed">{ALAMAT_LENGKAP}</p>
            </a>
            <a
              href="https://wa.me/6285848108242"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-6 h-6 shrink-0 text-accent" />
              <p>+62 858-4810-8242 (Mas Depa Admin Paskelingan)</p>
            </a>
            <a
              href="https://wa.me/6287889198491"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-6 h-6 shrink-0 text-accent" />
              <p>+62 878-8919-8491 (Mas Dimas Admin Bolopecah)</p>
            </a>
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white border-none mt-4"
              nativeButton={false}
              render={
                <a
                  href="https://wa.me/6285848108242"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hubungi via WhatsApp
                </a>
              }
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm opacity-60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            &copy; 2016–{new Date().getFullYear()} Karang Taruna Paskelingan.
          </p>
          <div className="flex gap-6">
            <Link
              href="/syarat-ketentuan"
              className="hover:text-white transition-colors"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
