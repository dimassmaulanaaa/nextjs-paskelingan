import { test } from "node:test";
import assert from "node:assert/strict";
import { formatRupiah, formatTanggal } from "../lib/format.ts";

test("formatRupiah pakai titik ribuan, prefix Rp, tanpa desimal/spasi", () => {
  assert.equal(formatRupiah(20000), "Rp20.000");
  assert.equal(formatRupiah(100), "Rp100");
  assert.equal(formatRupiah(0), "Rp0");
  assert.equal(formatRupiah(1000000), "Rp1.000.000");
});

test("formatTanggal render id-ID panjang dari ISO YYYY-MM-DD", () => {
  assert.equal(formatTanggal("2026-06-25"), "25 Juni 2026");
  assert.equal(formatTanggal("2026-01-01"), "1 Januari 2026");
});

test("formatTanggal tak tergeser timezone (tanggal tetap sama)", () => {
  assert.equal(formatTanggal("2026-12-31"), "31 Desember 2026");
});
