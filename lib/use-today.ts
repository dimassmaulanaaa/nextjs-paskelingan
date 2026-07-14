"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  const d = new Date();
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}

// Server renders "" (no min), client hydrates to local today — hydration-safe, no effect.
export function useTodayISO(): string {
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}
