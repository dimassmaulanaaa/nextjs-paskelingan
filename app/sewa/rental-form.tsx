"use client";

import { useEffect, useState } from "react";
import { groupItems, type Item } from "@/lib/catalog-shared";
import { formatRupiah } from "@/lib/format";
import { hitungSubtotal, hitungTotal, validateRental } from "@/lib/rental";
import { buildWaMessage, buildWaUrl, type RentalLine } from "@/lib/whatsapp";

export function RentalForm({ items }: { items: Item[] }) {
  const [tanggal, setTanggal] = useState("");
  const [qtys, setQtys] = useState<Record<number, number>>({});
  const [error, setError] = useState("");

  // Hitung "hari ini" di client (waktu lokal, hindari UTC shift & hydration
  // mismatch — halaman ini prerender static).
  const [today, setToday] = useState("");
  useEffect(() => {
    const d = new Date();
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    // eslint-disable-next-line
    setToday(local.toISOString().split("T")[0]);
  }, []);

  const groups = groupItems(items);

  if (groups.length === 0) {
    return (
      <div role="status" className="mt-10 rounded-lg border border-zinc-200 py-12 text-center">
        <p className="font-medium">Belum ada barang tersedia</p>
        <p className="mt-1 text-sm text-zinc-500">
          Silakan hubungi pengurus untuk informasi ketersediaan.
        </p>
      </div>
    );
  }

  const lines: RentalLine[] = items.map((item) => ({
    name: item.name,
    unitPrice: item.unit_price,
    qty: qtys[item.id] ?? 0,
  }));

  const total = hitungTotal(lines);

  function setQty(id: number, value: string) {
    const n = Math.max(0, parseInt(value, 10) || 0);
    setQtys((prev) => ({ ...prev, [id]: n }));
    setError("");
  }

  function handleSubmit() {
    const result = validateRental(tanggal, lines);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    const msg = buildWaMessage(tanggal, lines);
    window.open(buildWaUrl(msg), "_blank");
  }

  return (
    <div>
      {/* Date picker */}
      <div className="mt-8">
        <label htmlFor="tanggal-sewa" className="block font-medium">
          Tanggal Sewa
        </label>
        <input
          id="tanggal-sewa"
          type="date"
          min={today}
          value={tanggal}
          onChange={(e) => {
            setTanggal(e.target.value);
            setError("");
          }}
          className="mt-1 rounded border border-zinc-300 px-3 py-2"
        />
      </div>

      {/* Grup barang */}
      {groups.map((group) => (
        <section key={group.name} className="mt-10">
          <h2 className="text-xl font-semibold">Sewa {group.name}</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-200 text-sm text-zinc-500">
                  <th scope="col" className="pb-2">Barang</th>
                  <th scope="col" className="pb-2 text-right">Harga</th>
                  <th scope="col" className="pb-2 text-center w-24">Jumlah</th>
                  <th scope="col" className="pb-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {group.items.map((item) => {
                  const qty = qtys[item.id] ?? 0;
                  const sub = hitungSubtotal(item.unit_price, qty);
                  return (
                    <tr key={item.id}>
                      <td className="py-2">{item.name}</td>
                      <td className="py-2 text-right tabular-nums text-zinc-600">
                        {formatRupiah(item.unit_price)}
                      </td>
                      <td className="py-2 text-center">
                        <input
                          type="number"
                          min={0}
                          value={qty || ""}
                          placeholder="0"
                          onChange={(e) => setQty(item.id, e.target.value)}
                          aria-label={`Jumlah ${item.name}`}
                          className="w-20 rounded border border-zinc-300 px-2 py-1 text-center tabular-nums"
                        />
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {sub > 0 ? formatRupiah(sub) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Sticky summary */}
      <div className="sticky bottom-0 mt-10 border-t border-zinc-200 bg-white py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold" aria-live="polite">
            Total: <span className="tabular-nums">{formatRupiah(total)}</span>
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 active:bg-green-800"
          >
            Ajukan Sewa via WhatsApp
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
