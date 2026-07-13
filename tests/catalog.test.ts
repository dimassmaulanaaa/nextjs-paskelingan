import { test } from "node:test";
import assert from "node:assert/strict";
import { groupItems, hargaTerendah, type Item } from "../lib/catalog-shared.ts";

const items: Item[] = [
  { id: 1, name: "Piring", unit_price: 200, group_name: "Peralatan Makan", sort_order: 1 },
  { id: 2, name: "Gelas", unit_price: 200, group_name: "Wadah & Minum", sort_order: 1 },
  { id: 3, name: "Lepek", unit_price: 100, group_name: "Peralatan Makan", sort_order: 2 },
  { id: 4, name: "Kursi", unit_price: 1000, group_name: "Perabot", sort_order: 1 },
];

test("groupItems kelompokkan per group_name, pertahankan urutan kemunculan grup", () => {
  const groups = groupItems(items);
  assert.deepEqual(
    groups.map((g) => g.name),
    ["Peralatan Makan", "Wadah & Minum", "Perabot"],
  );
});

test("groupItems isi tiap grup dengan item yang benar", () => {
  const groups = groupItems(items);
  const makan = groups.find((g) => g.name === "Peralatan Makan")!;
  assert.deepEqual(makan.items.map((i) => i.name), ["Piring", "Lepek"]);
  assert.equal(groups.find((g) => g.name === "Perabot")!.items.length, 1);
});

test("groupItems tangani list kosong", () => {
  assert.deepEqual(groupItems([]), []);
});

test("hargaTerendah ambil unit_price terkecil", () => {
  assert.equal(hargaTerendah(items), 100);
});

test("hargaTerendah list kosong = 0", () => {
  assert.equal(hargaTerendah([]), 0);
});
