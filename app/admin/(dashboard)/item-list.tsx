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
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <Label className="mb-1 text-xs font-medium text-muted-foreground">Nama Barang</Label>
          <Input name="name" defaultValue={item?.name ?? ""} required className="text-sm" />
        </div>
        <div>
          <Label className="mb-1 text-xs font-medium text-muted-foreground">Harga (Rp)</Label>
          <Input
            name="unit_price"
            type="number"
            min={0}
            defaultValue={item?.unit_price ?? ""}
            required
            className="text-sm tabular-nums"
          />
        </div>
        <div>
          <Label className="mb-1 text-xs font-medium text-muted-foreground">Grup</Label>
          <select
            name="group_name"
            defaultValue={item?.group_name ?? VALID_GROUPS[0]}
            className="w-full rounded-md border border-input bg-transparent px-2 py-1.5 text-sm"
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
    <div className="mb-8 rounded-lg border border-border bg-muted p-4">
      <h2 className="mb-3 text-sm font-semibold">Tambah Barang Baru</h2>
      <form
        action={(data) => {
          formAction(data);
          if (!state?.error) formRef.current?.reset();
        }}
        ref={formRef}
      >
        <FormFields />
        <div className="mt-3 flex items-center justify-between">
          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : state?.success ? (
            <p className="text-sm text-secondary">{state.message}</p>
          ) : <div />}
          <Button type="submit" size="sm" disabled={pending}>
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
    <div className="relative -mx-2 z-10 my-2 rounded-lg border-2 border-primary bg-card p-3 shadow-sm">
      <form action={formAction}>
        <input type="hidden" name="id" value={item.id} />
        <FormFields item={item} />
        <div className="mt-3 flex justify-end gap-2">
          {(state?.error || deleteState?.error) && (
            <span className="flex-1 self-center text-xs text-destructive">
              {state?.error || deleteState?.error}
            </span>
          )}
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
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
            className="text-destructive hover:text-destructive"
          >
            {deleting ? "..." : "Hapus"}
          </Button>
          <Button type="submit" size="sm" disabled={pending || deleting}>
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
        <div role="status" className="rounded-lg border border-border py-12 text-center">
          <p className="font-medium">Belum ada barang</p>
          <p className="mt-1 text-sm text-muted-foreground">Tambahkan barang lewat form di atas.</p>
        </div>
      ) : (
        <div className="overflow-hidden overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th scope="col" className="px-4 py-2 font-medium">Barang</th>
                <th scope="col" className="px-4 py-2 text-right font-medium">Harga</th>
                <th scope="col" className="px-4 py-2 font-medium">Grup</th>
                <th scope="col" className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
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
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-4 py-2 font-medium">{item.name}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-muted-foreground">
                      {formatRupiah(item.unit_price)}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">{item.group_name}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => setEditingId(item.id)}
                        className="text-primary hover:underline"
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
