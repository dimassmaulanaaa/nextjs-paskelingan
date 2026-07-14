"use client";

import { useEffect, useState } from "react";
import { groupItems, type Item } from "@/lib/catalog-shared";
import { formatRupiah } from "@/lib/format";
import { hitungSubtotal, hitungTotal, validateRental } from "@/lib/rental";
import { buildWaMessage, buildWaUrl, type RentalLine } from "@/lib/whatsapp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div role="status" className="mt-10 rounded-lg border border-border py-12 text-center">
        <p className="font-medium">Belum ada barang tersedia</p>
        <p className="mt-1 text-sm text-muted-foreground">
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
        <Label htmlFor="tanggal-sewa" className="font-medium">
          Tanggal Sewa
        </Label>
        <Input
          id="tanggal-sewa"
          type="date"
          min={today}
          value={tanggal}
          onChange={(e) => {
            setTanggal(e.target.value);
            setError("");
          }}
          className="mt-1 w-auto"
        />
      </div>

      {/* Grup barang */}
      {groups.map((group) => (
        <section key={group.name} className="mt-10">
          <h2 className="font-heading text-xl font-semibold">Sewa {group.name}</h2>
          <div className="mt-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Barang</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="w-24 text-center">Jumlah</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.items.map((item) => {
                  const qty = qtys[item.id] ?? 0;
                  const sub = hitungSubtotal(item.unit_price, qty);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right tabular-nums text-muted-foreground">
                        {formatRupiah(item.unit_price)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min={0}
                          value={qty || ""}
                          placeholder="0"
                          onChange={(e) => setQty(item.id, e.target.value)}
                          aria-label={`Jumlah ${item.name}`}
                          className="w-20 text-center tabular-nums"
                        />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {sub > 0 ? formatRupiah(sub) : "—"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </section>
      ))}

      {/* Sticky summary */}
      <div className="sticky bottom-0 mt-10 border-t border-border bg-background py-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold" aria-live="polite">
            Total: <span className="tabular-nums">{formatRupiah(total)}</span>
          </p>
          <Button type="button" size="lg" onClick={handleSubmit}>
            Ajukan Sewa via WhatsApp
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
