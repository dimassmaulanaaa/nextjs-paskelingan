"use client";

import { useActionState } from "react";
import { login } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main id="main-content" className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="aurora-bg absolute inset-0 opacity-10" />
      <div className="w-full max-w-md glass-card p-8 rounded-2xl shadow-xl relative z-10 reveal">
        <h1 className="font-heading text-3xl font-bold mb-2">Login Admin</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Dashboard pengurus Karang Taruna Paskelingan.
        </p>
        <form action={formAction} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              required
              autoComplete="username"
              className="h-12 rounded-xl bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-12 rounded-xl bg-background/50"
            />
          </div>
          {state?.error && (
            <p className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-2 rounded-md" role="alert">
              {state.error}
            </p>
          )}
          <Button type="submit" size="lg" disabled={pending} className="w-full h-12 rounded-xl text-md mt-4">
            {pending ? "Masuk…" : "Masuk"}
          </Button>
        </form>
      </div>
    </main>
  );
}
