import { test } from "node:test";
import assert from "node:assert/strict";
import { validateItemInput } from "../lib/catalog-shared.ts";

test("validateItemInput valid: nama, harga ≥ 0, grup valid", () => {
  const r = validateItemInput("Piring Baru", 500, "Peralatan Makan");
  assert.equal(r.valid, true);
});

test("validateItemInput tolak nama kosong", () => {
  const r = validateItemInput("", 200, "Peralatan Makan");
  assert.equal(r.valid, false);
  if (!r.valid) assert.ok(r.error.includes("Nama"));
});

test("validateItemInput tolak harga negatif", () => {
  const r = validateItemInput("X", -1, "Peralatan Makan");
  assert.equal(r.valid, false);
  if (!r.valid) assert.ok(r.error.includes("Harga"));
});

test("validateItemInput tolak harga bukan bilangan bulat", () => {
  const r = validateItemInput("X", 99.5, "Peralatan Makan");
  assert.equal(r.valid, false);
});

test("validateItemInput tolak grup tak dikenal", () => {
  const r = validateItemInput("X", 200, "Grup Asal");
  assert.equal(r.valid, false);
  if (!r.valid) assert.ok(r.error.includes("grup"));
});

test("validateItemInput harga 0 valid", () => {
  const r = validateItemInput("Gratis", 0, "Perabot");
  assert.equal(r.valid, true);
});
