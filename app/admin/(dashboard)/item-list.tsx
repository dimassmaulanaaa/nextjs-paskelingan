"use client";

import { useState, useActionState, useRef } from "react";
import { type Item, VALID_GROUPS } from "@/lib/catalog-shared";
import { actionCreateItem, actionUpdateItem, actionDeleteItem } from "../actions";
import { formatRupiah } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function FormFields({ item }: { item?: Item }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <Label className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Nama Barang</Label>
          <Input name="name" defaultValue={item?.name ?? ""} required className="text-base h-11 rounded-xl bg-background" />
        </div>
        <div>
          <Label className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Harga (Rp)</Label>
          <Input
            name="unit_price"
            type="number"
            min={0}
            defaultValue={item?.unit_price ?? ""}
            required
            className="text-base tabular-nums h-11 rounded-xl bg-background"
          />
        </div>
        <div>
          <Label className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Grup</Label>
          <select
            name="group_name"
            defaultValue={item?.group_name ?? VALID_GROUPS[0]}
            className="w-full h-11 rounded-xl border border-input bg-background px-3 text-base focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {VALID_GROUPS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

function CreateRow() {
  const [state, formAction, pending] = useActionState(actionCreateItem, null);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="mb-10 rounded-2xl border border-border/50 bg-muted/20 p-6">
      <h2 className="mb-4 text-lg font-bold">Tambah Barang Baru</h2>
      <form
        action={(data) => {
          formAction(data);
          if (!state?.error) formRef.current?.reset();
        }}
        ref={formRef}
      >
        <FormFields />
        <div className="mt-6 flex items-center justify-between">
          {state?.error ? (
            <p className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md">{state.error}</p>
          ) : state?.success ? (
            <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-md">{state.message}</p>
          ) : <div />}
          <Button type="submit" size="sm" disabled={pending} className="rounded-xl px-6">
            {pending ? "Menyimpan..." : "Tambah"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function EditRow({ item, onCancel }: { item: Item; onCancel: () => void }) {
  const [state, formAction, pending] = useActionState(actionUpdateItem, null);
  const [deleteState, deleteAction, deleting] = useActionState(actionDeleteItem, null);

  // Jika sukses update, tutup mode edit
  if (state?.success && !pending) {
    setTimeout(onCancel, 0); // tutup form segera
  }

  return (
    <div className="relative -mx-2 z-10 my-2 rounded-2xl border-2 border-primary bg-card p-4 sm:p-5 shadow-lg">
      <form action={formAction}>
        <input type="hidden" name="id" value={item.id} />
        <FormFields item={item} />
        <div className="mt-5 flex justify-end gap-3">
          {(state?.error || deleteState?.error) && (
            <span className="flex-1 self-center text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md">
              {state?.error || deleteState?.error}
            </span>
          )}
          <Button type="button" variant="outline" size="sm" onClick={onCancel} className="rounded-xl">
            Batal
          </Button>
          <Button
            variant="ghost"
            size="sm"
            formAction={deleteAction}
            disabled={pending || deleting}
            onClick={(e) => {
              if (!confirm(`Yakin hapus ${item.name}?`)) e.preventDefault();
            }}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
          >
            {deleting ? "..." : "Hapus"}
          </Button>
          <Button type="submit" size="sm" disabled={pending || deleting} className="rounded-xl px-6">
            {pending ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ItemList({ items }: { items: Item[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <CreateRow />

      {items.length === 0 ? (
        <div role="status" className="rounded-2xl border border-border/50 py-16 text-center bg-muted/20">
          <p className="font-semibold text-lg">Belum ada barang</p>
          <p className="mt-2 text-muted-foreground">Tambahkan barang lewat form di atas.</p>
        </div>
      ) : (
        <div className="overflow-hidden overflow-x-auto rounded-2xl border border-border/50 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border/50 bg-muted/30">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Barang</th>
                <th scope="col" className="px-6 py-4 text-right font-semibold">Harga</th>
                <th scope="col" className="px-6 py-4 font-semibold">Grup</th>
                <th scope="col" className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {items.map((item) =>
                editingId === item.id ? (
                  <tr key={item.id}>
                    <td colSpan={4} className="p-0">
                      <div className="px-2">
                        <EditRow item={item} onCancel={() => setEditingId(null)} />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 font-medium text-base">{item.name}</td>
                    <td className="px-6 py-3 text-right tabular-nums text-muted-foreground">
                      {formatRupiah(item.unit_price)}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">
                      <span className="bg-primary/5 text-primary px-2 py-1 rounded-md text-xs font-medium border border-primary/10">
                        {item.group_name}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="text-primary font-medium hover:underline px-3 py-1 rounded-md hover:bg-primary/10 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
