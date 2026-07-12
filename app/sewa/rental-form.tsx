"use client";

import { useState } from "react";
import { groupItems, type Item } from "@/lib/catalog-shared";
import { formatRupiah } from "@/lib/format";
import { hitungSubtotal, hitungTotal, validateRental } from "@/lib/rental";
import { buildWaMessage, buildWaUrl, type RentalLine } from "@/lib/whatsapp";

export function RentalForm({ items }: { items: Item[] }) {
  const [tanggal, setTanggal] = useState("");
  const [qtys, setQtys] = useState<Record<number, number>>({});
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const groups = groupItems(items);

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
          <table className="mt-3 w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 text-sm text-zinc-500">
                <th className="pb-2">Barang</th>
                <th className="pb-2 text-right">Harga</th>
                <th className="pb-2 text-center w-24">Jumlah</th>
                <th className="pb-2 text-right">Subtotal</th>
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
        </section>
      ))}

      {/* Sticky summary */}
      <div className="sticky bottom-0 mt-10 border-t border-zinc-200 bg-white py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">
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
