import { sql } from "./db.ts";
import type { Item } from "./catalog-shared.ts";

export type { Item, ItemGroup } from "./catalog-shared.ts";
export { groupItems } from "./catalog-shared.ts";

export async function getItems(): Promise<Item[]> {
  return (await sql`
    SELECT id, name, unit_price, group_name, sort_order
    FROM items
    ORDER BY group_name, sort_order
  `) as Item[];
}
