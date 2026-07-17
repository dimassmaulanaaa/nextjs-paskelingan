INSERT INTO items (name, unit_price, group_name, sort_order) VALUES
  ('Piring',                200, 'Peralatan Makan', 1),
  ('Piring + Sendok',       200, 'Peralatan Makan', 2),
  ('Mangkuk Sup',           200, 'Peralatan Makan', 3),
  ('Mangkuk Sup + Sendok',  200, 'Peralatan Makan', 4),
  ('Mangkuk Es',            200, 'Peralatan Makan', 5),
  ('Mangkuk Es + Sendok',   200, 'Peralatan Makan', 6),
  ('Lepek',                 100, 'Peralatan Makan', 7),
  ('Gelas',                 200, 'Wadah & Minum',   1),
  ('Gelas + Tutup',         200, 'Wadah & Minum',   2),
  ('Baki',                 1000, 'Wadah & Minum',   3),
  ('Porong',               2000, 'Wadah & Minum',   4),
  ('Ceret',                3000, 'Wadah & Minum',   5),
  ('Termos',              10000, 'Wadah & Minum',   6),
  ('Tikar',                5000, 'Perabot',         1),
  ('Kursi',                1000, 'Perabot',         2)
ON CONFLICT (name) DO NOTHING;
