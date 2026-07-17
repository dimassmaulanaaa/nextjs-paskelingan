"use client";

import { useState } from "react";
import { groupItems, type Item } from "@/lib/catalog-shared";
import { formatRupiah } from "@/lib/format";
import { hitungSubtotal, hitungTotal, validateRental } from "@/lib/rental";
import { buildWaMessage, buildWaUrl, type RentalLine } from "@/lib/whatsapp";
import { useTodayISO } from "@/lib/use-today";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function RentalForm({ items, initialDate }: { items: Item[]; initialDate?: string }) {
  const [tanggal, setTanggal] = useState(initialDate || "");
  const [qtys, setQtys] = useState<Record<number, number>>({});
  const [error, setError] = useState("");
  const today = useTodayISO();

  const groups = groupItems(items);

  if (groups.length === 0) {
    return (
      <div role="status" className="mt-10 rounded-2xl border border-border/50 py-16 text-center bg-muted/20">
        <p className="font-semibold text-lg">Belum ada barang tersedia</p>
        <p className="mt-2 text-muted-foreground">
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
    <div className="reveal" style={{ animationDelay: "100ms" }}>
      {/* Date picker */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-12 shadow-sm">
        <div className="max-w-md">
          <Label htmlFor="tanggal-sewa" className="font-semibold text-base mb-3 block">
            Pilih Tanggal Acara
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
            className="h-14 rounded-xl text-lg bg-background"
          />
        </div>
      </div>

      {/* Grup barang */}
      <div className="space-y-10 mb-10">
        {groups.map((group) => (
          <section key={group.name} className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
            <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
              <h2 className="font-heading text-xl font-semibold">Sewa {group.name}</h2>
            </div>
            <div className="p-0 sm:p-2">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold px-4">Barang</TableHead>
                    <TableHead className="text-right font-semibold">Harga</TableHead>
                    <TableHead className="w-28 text-center font-semibold">Jumlah</TableHead>
                    <TableHead className="text-right font-semibold px-4">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((item) => {
                    const qty = qtys[item.id] ?? 0;
                    const sub = hitungSubtotal(item.unit_price, qty);
                    return (
                      <TableRow key={item.id} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="font-medium px-4">{item.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {formatRupiah(item.unit_price)}
                        </TableCell>
                        <TableCell className="text-center p-2">
                          <Input
                            type="number"
                            min={0}
                            value={qty || ""}
                            placeholder="0"
                            onChange={(e) => setQty(item.id, e.target.value)}
                            aria-label={`Jumlah ${item.name}`}
                            className="w-20 mx-auto text-center tabular-nums h-10 rounded-lg"
                          />
                        </TableCell>
                        <TableCell className="text-right tabular-nums font-semibold text-primary px-4">
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
      </div>

      {/* Sticky summary */}
      <div className="sticky bottom-6 z-40 mt-10">
        <div className="glass-card p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border-primary/20 dark:border-primary/30">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Total Estimasi</p>
            <p className="text-3xl font-bold text-foreground" aria-live="polite">
              <span className="tabular-nums">{formatRupiah(total)}</span>
            </p>
          </div>
          <div className="w-full sm:w-auto flex flex-col items-end">
            <Button
              type="button"
              size="lg"
              onClick={handleSubmit}
              className="w-full sm:w-auto h-14 rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground text-lg shadow-xl shadow-accent/20 hover:-translate-y-1 transition-all px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Ajukan Sewa via WhatsApp
            </Button>
            {error && (
              <p className="mt-2 text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md" role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
