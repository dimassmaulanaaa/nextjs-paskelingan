import { getItems } from "@/lib/catalog";
import { ItemList } from "./item-list";

export default async function AdminDashboard() {
  const items = await getItems();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold">Katalog Bolopecah</h1>
        <p className="mt-2 text-muted-foreground">
          Kelola barang dan harga. Perubahan langsung tercermin di halaman sewa publik.
        </p>
      </div>

      <ItemList items={items} />
    </div>
  );
}
