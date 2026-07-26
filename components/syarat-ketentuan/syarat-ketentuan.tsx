import { ORG, ALAMAT_LENGKAP } from "@/lib/seo";
import { KETENTUAN } from "@/lib/syarat-ketentuan-content";
import { WA_NUMBER } from "@/lib/whatsapp";

export function SyaratKetentuan() {
  return (
    <>
      <div className="mb-12 text-center reveal">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Syarat & Ketentuan
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Aturan sewa bolopecah {ORG.nama}, {ORG.alamat.desa}.
        </p>
      </div>

      <div className="space-y-8">
        {KETENTUAN.map((k) => (
          <div key={k.judul}>
            <h2 className="font-heading text-xl font-semibold mb-2">
              {k.judul}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{k.isi}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-16 pt-8 border-t">
        Alamat: {ALAMAT_LENGKAP}.
        <br />
        Hubungi kami via{" "}
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
        >
          WhatsApp
        </a>{" "}
        untuk pertanyaan lebih lanjut.
      </p>
    </>
  );
}
