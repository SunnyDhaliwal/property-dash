# Security model

Supabase Auth supplies signed sessions through HTTP-only cookies managed by `@supabase/ssr`. Middleware refreshes sessions and protected layouts verify the user with `getUser()`. Only the public anon key enters browser code; no service-role credential is used.

RLS is enabled on every public table. Tenant policies call small `security definer` membership helpers with an empty search path. Reads require organisation membership. Property/document/timeline writes require owner, admin or member; viewers are read-only. Organisation configuration is limited to owners/admins, and membership role changes are owner-only, cannot target the caller, and cannot create a new owner through client policy. Browser-provided organisation IDs never confer access.

Property mutation RPCs run as the caller (`security invoker`), so table RLS remains the final boundary. They group record and timeline writes in one transaction. Signup provisioning is the only privileged trigger: it creates a profile, one collision-resistant default organisation, owner membership and idempotent system categories.

OAuth tokens must never be stored in plaintext. The Drive foundation table intentionally has no token columns. Authentication tokens and sensitive user data must not be logged.
