import { sql } from "./db.ts";

export type Item = {
  id: number;
  name: string;
  unit_price: number;
  group_name: string;
  sort_order: number;
};

export type ItemGroup = { name: string; items: Item[] };

export async function getItems(): Promise<Item[]> {
  return (await sql`
    SELECT id, name, unit_price, group_name, sort_order
    FROM items
    ORDER BY group_name, sort_order
  `) as Item[];
}

// Logika murni: kelompokkan item per group_name, urutan grup mengikuti
// kemunculan pertama (getItems sudah mengurutkan agar grup berdampingan).
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
