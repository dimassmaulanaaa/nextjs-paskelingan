"use client";

import { useState, useActionState, useRef } from "react";
import { type Item, VALID_GROUPS } from "@/lib/catalog-shared";
import { actionCreateItem, actionUpdateItem, actionDeleteItem } from "../actions";
import { formatRupiah } from "@/lib/format";

function FormFields({ item }: { item?: Item }) {
  return (
    <>
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-zinc-500 mb-1">Nama Barang</label>
          <input
            name="name"
            defaultValue={item?.name ?? ""}
            required
            className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1">Harga (Rp)</label>
          <input
            name="unit_price"
            type="number"
            min={0}
            defaultValue={item?.unit_price ?? ""}
            required
            className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm tabular-nums"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1">Grup</label>
          <select
            name="group_name"
            defaultValue={item?.group_name ?? VALID_GROUPS[0]}
            className="w-full rounded border border-zinc-300 px-2 py-1.5 text-sm"
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
    <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-8">
      <h2 className="text-sm font-semibold mb-3">Tambah Barang Baru</h2>
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
            <p className="text-sm text-red-600">{state.error}</p>
          ) : state?.success ? (
            <p className="text-sm text-green-600">{state.message}</p>
          ) : <div />}
          <button
            type="submit"
            disabled={pending}
            className="rounded bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Tambah"}
          </button>
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
    <div className="bg-white p-3 rounded-lg border-2 border-green-500 shadow-sm relative -mx-2 z-10 my-2">
      <form action={formAction}>
        <input type="hidden" name="id" value={item.id} />
        <FormFields item={item} />
        <div className="mt-3 flex gap-2 justify-end">
          {(state?.error || deleteState?.error) && (
            <span className="text-xs text-red-600 flex-1 self-center">
              {state?.error || deleteState?.error}
            </span>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="rounded px-3 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100"
          >
            Batal
          </button>
          <button
            formAction={deleteAction}
            disabled={pending || deleting}
            onClick={(e) => {
              if (!confirm(`Yakin hapus ${item.name}?`)) e.preventDefault();
            }}
            className="rounded px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "..." : "Hapus"}
          </button>
          <button
            type="submit"
            disabled={pending || deleting}
            className="rounded bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            {pending ? "Menyimpan..." : "Simpan"}
          </button>
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

      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-zinc-50 border-b border-zinc-200">
            <tr>
              <th className="px-4 py-2 font-medium">Barang</th>
              <th className="px-4 py-2 font-medium text-right">Harga</th>
              <th className="px-4 py-2 font-medium">Grup</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50">
                <td colSpan={4} className="p-0">
                  {editingId === item.id ? (
                    <div className="px-2">
                      <EditRow item={item} onCancel={() => setEditingId(null)} />
                    </div>
                  ) : (
                    <div className="flex px-4 py-2 items-center">
                      <div className="flex-1 font-medium">{item.name}</div>
                      <div className="w-32 text-right tabular-nums text-zinc-600 pr-6">
                        {formatRupiah(item.unit_price)}
                      </div>
                      <div className="w-48 text-zinc-500">{item.group_name}</div>
                      <div className="w-16 text-right">
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="text-green-600 hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
