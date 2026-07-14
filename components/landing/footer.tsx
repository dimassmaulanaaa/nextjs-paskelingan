import { ALAMAT_LENGKAP } from "@/lib/seo";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer id="kontak" className="bg-slate-900 text-slate-100 pt-20 pb-10 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Karang Taruna Paskelingan</h2>
            <p className="text-slate-300 leading-relaxed mb-8 max-w-md">
              Membangun kerukunan dan melayani masyarakat Dukuh Keboan Pason, Ceper, Klaten sejak tahun 2016.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <span className="sr-only">Facebook</span>
                <div className="w-4 h-4 bg-current opacity-50" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <span className="sr-only">Instagram</span>
                <div className="w-4 h-4 bg-current opacity-50" />
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-xl font-semibold text-white">Kontak & Lokasi</h3>
            <div className="flex gap-4 text-slate-300">
              <MapPin className="w-6 h-6 shrink-0 text-accent" />
              <p className="leading-relaxed">{ALAMAT_LENGKAP}</p>
            </div>
            <div className="flex gap-4 items-center text-slate-300">
              <Phone className="w-6 h-6 shrink-0 text-accent" />
              <p>+62 878-8919-8491</p>
            </div>
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white border-none mt-4"
              nativeButton={false}
              render={
                <a href="https://wa.me/6287889198491" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hubungi via WhatsApp
                </a>
              }
            />
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm opacity-60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2016–{new Date().getFullYear()} Karang Taruna Paskelingan.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
