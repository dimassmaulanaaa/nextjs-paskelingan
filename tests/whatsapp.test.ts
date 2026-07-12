import { test } from "node:test";
import assert from "node:assert/strict";
import { buildWaMessage, buildWaUrl, WA_NUMBER, type RentalLine } from "../lib/whatsapp.ts";

// --- buildWaMessage ---

test("buildWaMessage format sesuai spec: tanggal, nama, qty, harga, subtotal, total", () => {
  const lines: RentalLine[] = [
    { name: "Piring", unitPrice: 200, qty: 100 },
    { name: "Gelas", unitPrice: 200, qty: 150 },
  ];
  const msg = buildWaMessage("2026-06-25", lines);
  assert.ok(msg.includes("Pengajuan sewa bolopecah"));
  assert.ok(msg.includes("25 Juni 2026"));
  assert.ok(msg.includes("Piring (100)"));
  assert.ok(msg.includes("Rp200 x 100 = Rp20.000"));
  assert.ok(msg.includes("Gelas (150)"));
  assert.ok(msg.includes("Rp200 x 150 = Rp30.000"));
  assert.ok(msg.includes("Total: Rp50.000"));
});

test("buildWaMessage saring item qty 0", () => {
  const lines: RentalLine[] = [
    { name: "Piring", unitPrice: 200, qty: 10 },
    { name: "Gelas", unitPrice: 200, qty: 0 },
  ];
  const msg = buildWaMessage("2026-06-25", lines);
  assert.ok(msg.includes("Piring"));
  assert.ok(!msg.includes("Gelas"));
  assert.ok(msg.includes("Total: Rp2.000"));
});

test("buildWaMessage satu item", () => {
  const lines: RentalLine[] = [
    { name: "Termos", unitPrice: 10000, qty: 2 },
  ];
  const msg = buildWaMessage("2026-12-31", lines);
  assert.ok(msg.includes("31 Desember 2026"));
  assert.ok(msg.includes("1. Termos (2)"));
  assert.ok(msg.includes("Rp10.000 x 2 = Rp20.000"));
  assert.ok(msg.includes("Total: Rp20.000"));
});

// --- buildWaUrl ---

test("buildWaUrl menggunakan nomor benar dan encode teks", () => {
  const url = buildWaUrl("halo dunia");
  assert.ok(url.startsWith("https://wa.me/6287889198491?text="));
  assert.ok(url.includes(encodeURIComponent("halo dunia")));
});

test("buildWaUrl encode newline", () => {
  const url = buildWaUrl("baris1\nbaris2");
  assert.ok(url.includes("%0A"));
  assert.ok(!url.includes("\n"));
});

// --- WA_NUMBER ---

test("WA_NUMBER sesuai spec", () => {
  assert.equal(WA_NUMBER, "6287889198491");
});
