import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sql } from "../lib/db.ts";

const dir = join(import.meta.dirname, "..", "lib", "db");
const schema = readFileSync(join(dir, "schema.sql"), "utf8");
const seed = readFileSync(join(dir, "seed.sql"), "utf8");

await sql.query(schema);
await sql.query(seed);

const [{ count }] = await sql.query("SELECT count(*)::int AS count FROM items");
console.log(`db:setup complete — ${count} items in the catalog.`);
