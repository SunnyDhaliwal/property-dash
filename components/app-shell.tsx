import Link from "next/link";
import { signOut } from "@/app/actions";

const links = [
  ["Dashboard", "/dashboard"],
  ["Properties", "/properties"],
  ["Documents", "/documents"],
  ["Settings", "/settings"],
];
export function AppShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string;
}) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[240px_1fr]">
      <aside className="bg-[#173c2d] p-5 text-white">
        <Link className="text-xl font-bold" href="/dashboard">
          Property Memory
        </Link>
        <nav
          aria-label="Main navigation"
          className="mt-7 flex gap-2 overflow-auto md:flex-col"
        >
          {links.map(([label, href]) => (
            <Link
              className="rounded-md px-3 py-2 hover:bg-white/10"
              href={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-white/20 pt-4 text-sm">
          <p className="truncate">{email}</p>
          <form action={signOut}>
            <button className="mt-2 underline">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="p-5 md:p-10">{children}</main>
    </div>
  );
}
