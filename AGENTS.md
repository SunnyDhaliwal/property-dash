# Property Memory repository guidance

Property Memory is a UK SaaS product for organising property documents and preserving a chronological property history.

## Engineering conventions

- Use the Next.js App Router, strict TypeScript, React, Tailwind CSS, Supabase, Zod, Vitest and Playwright.
- Keep server/database logic in `lib/` modules and UI in small, accessible components. Use kebab-case file names and PascalCase React component names.
- Validate every mutation on the server with Zod. Treat browser-supplied organisation and record IDs as untrusted.
- Add forward-only, timestamped SQL migrations. Never edit a migration that has been applied. Use UUID keys, constraints, indexes, timestamps and explicit cascading behaviour.
- Enable and test RLS for every tenant-owned table. RLS is the final access boundary; never expose a service-role key to browser code.
- Write business-logic unit tests and service-independent smoke tests. Run formatting, linting, type checking, unit tests and the production build before completing work.
- Use semantic HTML, explicit form labels, visible focus states, keyboard-friendly controls, useful loading/error/empty states and accessible colour contrast.
- Use UK English in user-facing copy.
- Never commit secrets or log tokens or sensitive user data. Do not modify `main` directly.
- Keep any future Google Drive implementation isolated behind a service interface. Never store OAuth tokens in plaintext.
- Do not make legal or compliance claims without an approved, versioned rules system.
- Prefer focused modules over generic frameworks or speculative abstractions.
