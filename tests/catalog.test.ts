import { test } from "node:test";
import assert from "node:assert/strict";
import { groupItems, hargaTerendah, type Item } from "../lib/catalog-shared.ts";
import { getItems, createItem, updateItem, deleteItem } from "../lib/catalog.ts";

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

// --- Test Integrasi DB ---

test("CRUD katalog integrasi DB", async (t) => {
  if (!process.env.DATABASE_URL) {
    t.skip("DATABASE_URL absen, skip test integrasi DB");
    return;
  }

  const name = `Test Item ${Date.now()}`;

  const created = await createItem(name, 500, "Perabot");
  assert.ok(created[0].id > 0);
  const id = created[0].id;

  const all = await getItems();
  const found = all.find((i) => i.id === id);
  assert.equal(found?.name, name);
  assert.equal(found?.unit_price, 500);

  await updateItem(id, name, 750, "Perabot");
  const allAfterUpdate = await getItems();
  const foundUpdated = allAfterUpdate.find((i) => i.id === id);
  assert.equal(foundUpdated?.unit_price, 750);

  await deleteItem(id);
  const allAfterDelete = await getItems();
  const foundDeleted = allAfterDelete.find((i) => i.id === id);
  assert.equal(foundDeleted, undefined);
});
