import { test } from "node:test";
import assert from "node:assert/strict";
import { hitungSubtotal, hitungTotal, validateRental, type RentalLine } from "../lib/rental.ts";

// --- hitungSubtotal ---

test("hitungSubtotal = harga × jumlah", () => {
  assert.equal(hitungSubtotal(200, 100), 20000);
});

test("hitungSubtotal qty 0 = 0", () => {
  assert.equal(hitungSubtotal(200, 0), 0);
});

test("hitungSubtotal harga tinggi", () => {
  assert.equal(hitungSubtotal(10000, 5), 50000);
});

// --- hitungTotal ---

test("hitungTotal jumlahkan subtotal item ber-qty ≥ 1 saja", () => {
  const lines: RentalLine[] = [
    { name: "Piring", unitPrice: 200, qty: 100 },
    { name: "Gelas", unitPrice: 200, qty: 0 },
    { name: "Termos", unitPrice: 10000, qty: 2 },
  ];
  // 200*100 + 10000*2 = 40000
  assert.equal(hitungTotal(lines), 40000);
});

test("hitungTotal semua qty 0 = 0", () => {
  const lines: RentalLine[] = [
    { name: "Piring", unitPrice: 200, qty: 0 },
  ];
  assert.equal(hitungTotal(lines), 0);
});

test("hitungTotal list kosong = 0", () => {
  assert.equal(hitungTotal([]), 0);
});

// --- validateRental ---

test("validateRental valid: tanggal ada + min 1 item qty≥1", () => {
  const result = validateRental("2026-06-25", [
    { name: "Piring", unitPrice: 200, qty: 10 },
  ]);
  assert.equal(result.valid, true);
});

test("validateRental gagal: tanggal kosong", () => {
  const result = validateRental("", [
    { name: "Piring", unitPrice: 200, qty: 10 },
  ]);
  assert.equal(result.valid, false);
  assert.ok(result.error?.includes("tanggal"));
});

test("validateRental gagal: tanpa item qty≥1", () => {
  const result = validateRental("2026-06-25", [
    { name: "Piring", unitPrice: 200, qty: 0 },
  ]);
  assert.equal(result.valid, false);
  assert.ok(result.error?.includes("barang"));
});

test("validateRental gagal: list kosong", () => {
  const result = validateRental("2026-06-25", []);
  assert.equal(result.valid, false);
});
