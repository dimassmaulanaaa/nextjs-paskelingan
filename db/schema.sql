CREATE TABLE IF NOT EXISTS items (
  id          serial PRIMARY KEY,
  name        text NOT NULL UNIQUE,
  unit_price  integer NOT NULL CHECK (unit_price >= 0),
  group_name  text NOT NULL DEFAULT 'Peralatan Makan',
  sort_order  integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
