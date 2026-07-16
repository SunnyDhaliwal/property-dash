# Property Memory

Property Memory helps UK landlords and family property businesses organise documents and preserve a reliable chronological history for each property. This repository contains the first production foundation: authentication, multi-organisation data isolation, property management, document metadata, timelines and a responsive dashboard.

## Prerequisites

- Node.js 20 or later
- npm
- A Supabase project and Supabase CLI for database setup

## Local installation

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Without environment variables, public pages and automated checks work; authenticated routes show a useful setup redirect.

## Environment variables

| Variable                        | Purpose                                   |
| ------------------------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public/anon project key, protected by RLS |

Never put a service-role key in a `NEXT_PUBLIC_` variable or commit `.env.local`.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and enter the project URL and anon key.
3. Link the CLI: `supabase link --project-ref YOUR_PROJECT_REF`.
4. Apply the schema: `supabase db push`.
5. In Authentication settings, add `http://localhost:3000/auth/callback` as a redirect URL and configure email/password or magic-link delivery.
6. Create a user through Supabase Authentication. The database trigger creates their profile, default organisation, owner membership and six default categories.

## Commands

```sh
npm run dev           # development server
npm run build         # production build
npm start             # serve the production build
npm run format        # format files
npm run format:check  # verify formatting
npm run lint          # ESLint
npm run typecheck     # strict TypeScript
npm test              # unit/component tests
npm run test:watch    # tests in watch mode
npm run test:e2e      # Playwright smoke tests
```

## Current scope

- Password and magic-link authentication with secure SSR sessions
- Automatic organisation onboarding and tenant-scoped RLS
- Property search, filtering, creation, editing, details and archival
- Atomic property timeline events
- Dashboard counts, recent records and onboarding state
- Document metadata listing and filters
- Responsive, accessible navigation and forms

## Not implemented

Google Drive OAuth/API access, file upload, email forwarding, OCR, AI document reading, payments, compliance calculations and legal/compliance claims are intentionally excluded. Document buttons on the property page are visibly disabled future-action placeholders.

## Troubleshooting

- **Redirected to login with a setup message:** add both Supabase variables to `.env.local` and restart the development server.
- **Authentication callback fails:** ensure the exact callback URL is allowed in Supabase Authentication settings.
- **User has no organisation:** confirm the initial migration was applied before creating the user. For a pre-existing test user, delete and recreate it after applying the migration.
- **Permission denied:** inspect organisation membership and role. Do not bypass RLS with a service-role key in the application.
- **Playwright browser missing:** run `npx playwright install chromium` once locally.

See [architecture](docs/architecture.md), [security](docs/security.md) and [database](docs/database.md) for implementation details.
