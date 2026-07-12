import { formatRupiah, formatTanggal } from "./format.ts";

export type RentalLine = { name: string; unitPrice: number; qty: number };

export const WA_NUMBER = "6287889198491";

export function buildWaMessage(tanggalISO: string, lines: RentalLine[]): string {
  const dipilih = lines.filter((l) => l.qty >= 1);
  const baris = dipilih.map((l, i) => {
    const subtotal = l.unitPrice * l.qty;
    return `${i + 1}. ${l.name} (${l.qty}) — ${formatRupiah(l.unitPrice)} x ${l.qty} = ${formatRupiah(subtotal)}`;
  });
  const total = dipilih.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  return [
    "Pengajuan sewa bolopecah",
    `Tanggal sewa: ${formatTanggal(tanggalISO)}`,
    "",
    ...baris,
    "",
    `Total: ${formatRupiah(total)}`,
  ].join("\n");
}

export function buildWaUrl(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}
