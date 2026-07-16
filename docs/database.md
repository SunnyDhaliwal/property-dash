# Database

The initial migration creates `profiles`, `organisations`, `organisation_members`, `properties`, `document_categories`, `documents`, `timeline_events` and `google_drive_connections`. UUID primary keys, foreign keys, tenant/status lookup indexes, uniqueness constraints and timestamp columns support the first product milestone.

Properties are archived using `status` and `archived_at`; UI deletion is not supported. Documents are metadata-only. Timeline event types are constrained. Organisation/category uniqueness makes signup retries safe. The `handle_new_user` trigger provisions new users, while `seed_default_categories` uses `ON CONFLICT DO NOTHING` for idempotency.

Apply migrations with the Supabase CLI using `supabase db push` after linking a project. Never rewrite an applied migration; add a new timestamped migration.
