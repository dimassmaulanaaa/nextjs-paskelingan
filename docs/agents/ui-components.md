# UI Components

How to build UI in this repo so new components look and behave like the ones already here. Read this before writing any component, page section, or form.

## Stack (don't reach for anything else)

- **shadcn `base-nova` style** on **`@base-ui/react`** — not Radix. Primitives import from `@base-ui/react/*` (e.g. `@base-ui/react/button`), not `@radix-ui/*`.
- **Tailwind v4**, config lives in `app/globals.css` (no `tailwind.config.*`).
- **class-variance-authority (`cva`)** for components with `variant`/`size` props.
- **`cn()`** from `lib/utils.ts` (`clsx` + `tailwind-merge`) to merge classes — always last arg is the caller's `className`, so callers can override.
- **lucide-react** for icons only.
- `components.json` aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`.

Don't add another icon set, another primitives lib, or a second class-merge utility. Don't hand-roll a `tailwind.config.*` — tokens go in `app/globals.css`.

## Token layers

Defined in `app/globals.css`, three layers:

1. **Primitive** — raw hex in `:root` / `.dark` (e.g. `--primary: #0080FF`).
2. **Semantic** — same names re-exposed via `@theme inline` as `--color-*` (e.g. `--color-primary: var(--primary)`), which is what makes `bg-primary`, `text-muted-foreground`, `border-border`, etc. work as Tailwind classes.
3. **Component** — none globally defined yet; component-scoped vars only appear inline where needed (e.g. `Card` uses `px-(--card-spacing)`).

Semantic tokens available: `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `muted`, `muted-foreground`, `accent`, `accent-foreground`, `destructive`, `border`, `input`, `ring`, `chart-1..5`, `sidebar*`.

**Rule: never write a raw hex/rgb in a component.** Always use the semantic Tailwind class (`bg-primary`, `text-destructive`, `border-border/50`, etc.). Light/dark both derive from the same semantic name, so hardcoding a color breaks dark mode. The only hardcoded colors in the repo live in the two decorative gradients below, and even those are intentionally brand-independent.

Radius scale derives from one `--radius` var: `--radius-sm/md/lg/xl/2xl/3xl/4xl` are all `calc(var(--radius) * N)`. Prefer `rounded-*` scale classes over arbitrary `rounded-[...]`.

Fonts: `font-sans` (Work Sans, body default), `font-heading` (Outfit, auto-applied to `h1`–`h4` via `@layer base`), `font-mono` (Geist Mono).

## Component conventions (primitives in `components/ui/`)

Every primitive follows this shape — match it exactly for new ones:

- Function component, PascalCase, same name as the file's default export intent (`Button`, `Badge`, `Card`...).
- `data-slot="<name>"` attribute on the root element (styling hook + a11y/debugging convention already used everywhere).
- Props: `React.ComponentProps<"tag">` (or the base-ui primitive's `.Props`) spread with `{...props}` last.
- Class list built with `cn(...)`, caller's `className` merged in last.
- Variants (only when the component actually has visual variants) via `cva`, exported alongside the component: `export { Button, buttonVariants }`.
- No default exports. Named exports only.

Existing primitives — check here before writing a new one, most needs are already covered: `button`, `badge`, `card` (+ `CardHeader/Title/Description/Action/Content/Footer`), `input`, `label`, `avatar`, `accordion`, `dropdown-menu`, `separator`, `sheet`, `table` (+ `TableHeader/Body/Row/Head/Cell`).

### `cva` variant pattern (see `button.tsx`, `badge.tsx`)

```ts
const xVariants = cva("<base classes always applied>", {
  variants: {
    variant: { default: "...", outline: "...", ghost: "...", destructive: "...", secondary: "...", link: "..." },
    size: { default: "...", sm: "...", lg: "...", icon: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

If a new component needs visual variants, add a `variant`/`size` axis to its own `cva` call rather than sprinkling one-off conditional classNames. Keep the same variant *names* (`default`, `outline`, `ghost`, `destructive`, `secondary`, `link`) when the concept maps — don't invent new synonyms like `primary` or `danger`.

## Composition layer (`components/landing/*`, `components/sewa/*`, `components/admin/*`, `components/layout/*`)

These compose `components/ui/*` primitives with layout + copy. They are not primitives — no `cva`, no `data-slot`, plain `cn()`-free inline `className` is fine here. Patterns to keep consistent:

- **Cards/sections**: `rounded-2xl border border-border/50 shadow-sm` (sometimes `bg-card`, sometimes `bg-muted/30` for a subsection header strip).
- **Glassmorphism surfaces** (hero search card, sticky rental summary): use the `.glass-card` utility class (defined in `globals.css`, uses `color-mix` over `--card`/`--border` + `backdrop-filter`), not a hand-rolled `bg-white/10 backdrop-blur`.
- **Scroll-reveal**: wrap entrance-animated blocks in `className="reveal"` with an inline `style={{ animationDelay: "Nms" }}` staggered per sibling (see `hero.tsx`, `stats.tsx`). Respects `prefers-reduced-motion` automatically — don't add your own motion-reduce guard.
- **Decorative background**: `.aurora-bg` for the one hero gradient — don't reuse for other sections, don't create a second gradient utility.
- **Numeric/currency display**: always `tabular-nums`, currency via `formatRupiah()` from `lib/format.ts` — never format Rupiah inline.
- **Muted eyebrow/label text**: `text-xs font-medium text-muted-foreground uppercase tracking-wider`.
- **Inline error text**: `text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-md`, with `role="alert"` when it's a live validation error.
- **Empty states**: `role="status"` block, `rounded-2xl border border-border/50 py-16 text-center bg-muted/20`, bold headline + muted subtext (see `RentalForm`, `ItemList`).
- Larger touch targets on public-facing forms (`rental-form.tsx`, `hero.tsx`) override the primitive's default height/radius via `className`, e.g. `h-14 rounded-xl` on `Input`/`Button` — this is expected, the `ui/*` defaults are compact-by-default and screens opt into bigger.
- Icons from `lucide-react`, sized `w-4 h-4`/`w-5 h-5` or `size-*`, never a separate icon library.
- All UI copy is Indonesian — match existing tone (short, direct, e.g. "Belum ada barang tersedia", "Ajukan Sewa via WhatsApp").

## Before adding a new component

1. Check the primitives list above — most needs (button, input, card, table, badge...) already exist. Import and compose, don't recreate.
2. Need a new visual variant of an existing primitive? Add it to that primitive's `cva` config, don't fork the component.
3. Need a genuinely new primitive (not in the list)? Check if shadcn's `base-nova` registry has it before hand-building — this project installs shadcn components rather than authoring bespoke ones in `components/ui/`.
4. Never hardcode a color, never add a new class-merge/icon/primitives dependency, never format currency/dates inline.
