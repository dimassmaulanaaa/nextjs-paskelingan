import { sql } from "./db.ts";
import { validateItemInput, type Item } from "./catalog-shared.ts";

export type { Item, ItemGroup } from "./catalog-shared.ts";
export { groupItems, hargaTerendah, VALID_GROUPS } from "./catalog-shared.ts";

export async function getItems(): Promise<Item[]> {
  return (await sql`
    SELECT id, name, unit_price, group_name, sort_order
    FROM items
    ORDER BY group_name, sort_order
  `) as Item[];
}

export async function createItem(
  name: string,
  unit_price: number,
  group_name: string,
) {
  const v = validateItemInput(name, unit_price, group_name);
  if (!v.valid) throw new Error(v.error);

  const res = await sql`
    SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order
    FROM items WHERE group_name = ${group_name}
  `;
  const sort_order = res[0].next_order;

  return await sql`
    INSERT INTO items (name, unit_price, group_name, sort_order)
    VALUES (${name}, ${unit_price}, ${group_name}, ${sort_order})
    RETURNING id
  `;
}

export async function updateItem(
  id: number,
  name: string,
  unit_price: number,
  group_name: string,
) {
  const v = validateItemInput(name, unit_price, group_name);
  if (!v.valid) throw new Error(v.error);

  return await sql`
    UPDATE items
    SET name = ${name}, unit_price = ${unit_price}, group_name = ${group_name}, updated_at = now()
    WHERE id = ${id}
  `;
}

export async function deleteItem(id: number) {
  return await sql`DELETE FROM items WHERE id = ${id}`;
}
