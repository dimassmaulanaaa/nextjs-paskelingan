// Tipe & logika murni katalog — aman untuk client bundle (nol import DB).

export type Item = {
  id: number;
  name: string;
  unit_price: number;
  group_name: string;
  sort_order: number;
};

export type ItemGroup = { name: string; items: Item[] };

export const VALID_GROUPS = [
  "Peralatan Makan",
  "Wadah & Minum",
  "Perabot",
] as const;

export type ValidationResult =
  | { valid: true }
  | { valid: false; error: string };

export function validateItemInput(
  name: string,
  price: number,
  group: string,
): ValidationResult {
  if (!name.trim())
    return { valid: false, error: "Nama barang tidak boleh kosong." };
  if (!Number.isInteger(price) || price < 0)
    return { valid: false, error: "Harga harus berupa bilangan bulat ≥ 0." };
  if (!VALID_GROUPS.includes(group as (typeof VALID_GROUPS)[number]))
    return { valid: false, error: "Pilih grup barang yang valid." };
  return { valid: true };
}

// Harga satuan terendah di katalog (untuk teaser "mulai RpX"). 0 bila kosong.
export function lowestPrice(items: Item[]): number {
  if (items.length === 0) return 0;
  return Math.min(...items.map((i) => i.unit_price));
}

// Kelompokkan item per group_name, urutan grup mengikuti kemunculan pertama.
export function groupItems(items: Item[]): ItemGroup[] {
  const groups: ItemGroup[] = [];
  const byName = new Map<string, ItemGroup>();
  for (const item of items) {
    let g = byName.get(item.group_name);
    if (!g) {
      g = { name: item.group_name, items: [] };
      byName.set(item.group_name, g);
      groups.push(g);
    }
    g.items.push(item);
  }
  return groups;
}
