# Architecture

Property Memory is a Next.js App Router application. Public routes render independently; the authenticated route group is protected by middleware and a server layout that verifies the Supabase user. Server Components read tenant data directly through the user's Supabase session. Server Actions validate mutations with Zod and call narrow PostgreSQL functions that commit a property change and its timeline event atomically.

Business rules live in focused `lib/` modules and remain testable without Supabase. React components handle presentation and interaction only. Database-dependent functions are contained in `lib/database` and feature action modules, providing a natural boundary for future repository interfaces as complexity grows.

The future Google Drive integration must sit behind a dedicated service interface. No Drive API or document-content processing is present in this milestone.
