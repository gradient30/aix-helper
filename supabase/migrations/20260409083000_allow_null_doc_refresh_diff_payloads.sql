ALTER TABLE public.doc_refresh_diff_items
  ALTER COLUMN baseline_payload DROP NOT NULL,
  ALTER COLUMN candidate_payload DROP NOT NULL;
