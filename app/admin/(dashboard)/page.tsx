import { getItems } from "@/lib/catalog";
import { ItemList } from "./item-list";

export default async function AdminDashboard() {
  const items = await getItems();

  return (
    <div className="mt-6">
      <h1 className="font-heading text-2xl font-semibold">Katalog Bolopecah</h1>
      <p className="mt-2 text-muted-foreground mb-8">
        Kelola barang dan harga. Perubahan langsung tercermin di halaman sewa publik.
      </p>

      <ItemList items={items} />
    </div>
  );
}
