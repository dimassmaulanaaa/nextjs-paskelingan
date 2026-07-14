"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main id="main-content" className="mx-auto max-w-sm px-6 py-24">
      <h1 className="font-heading text-2xl font-semibold">Login Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dashboard pengurus Karang Taruna Paskelingan.
      </p>
      <form action={formAction} className="mt-6 space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            required
            autoComplete="username"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="password" className="block text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1"
          />
        </div>
        {state?.error && (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        )}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Masuk…" : "Masuk"}
        </Button>
      </form>
    </main>
  );
}
