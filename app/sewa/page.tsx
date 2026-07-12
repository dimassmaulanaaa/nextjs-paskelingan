import type { Metadata } from "next";
import { getItems, groupItems } from "@/lib/catalog";
import { formatRupiah } from "@/lib/format";
import { ORG } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sewa Bolopecah",
  description: `Sewa bolopecah (piring, gelas, mangkuk, termos, kursi, tikar) untuk hajatan di Ceper, Klaten. Harga terjangkau dari ${ORG.nama}.`,
};

// ponytail: form input jumlah + total + tombol WA ditambah di Task 5.
export default async function SewaPage() {
  const groups = groupItems(await getItems());

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sewa Bolopecah</h1>
      <p className="mt-4 text-zinc-600">
        Daftar peralatan hajatan yang disewakan {ORG.nama}, {ORG.alamat.desa},
        Klaten. Harga per satuan.
      </p>

      {groups.map((group) => (
        <section key={group.name} className="mt-10">
          <h2 className="text-xl font-semibold">Sewa {group.name}</h2>
          <ul className="mt-3 divide-y divide-zinc-100">
            {group.items.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span className="tabular-nums text-zinc-600">
                  {formatRupiah(item.unit_price)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
