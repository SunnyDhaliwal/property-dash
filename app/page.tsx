import Link from "next/link";
import { createClient } from "@/lib/auth/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <main>
      <header className="container-page flex items-center justify-between py-6">
        <strong className="text-xl">Property Memory</strong>
        <Link href={user ? "/dashboard" : "/login"}>
          {user ? "Open dashboard" : "Sign in"}
        </Link>
      </header>
      <section className="container-page grid min-h-[70vh] place-content-center py-20">
        <div className="max-w-3xl">
          <p className="mb-4 font-semibold text-emerald-800">
            A reliable record for your portfolio
          </p>
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Every property. Every document. One clear history.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-700">
            Property Memory organises documents and activity around each
            property, giving landlords and property businesses one reliable
            place to understand what has happened and find what they need.
          </p>
          <Link
            className="button button-primary mt-8"
            href={user ? "/dashboard" : "/login"}
          >
            {user ? "Open dashboard" : "Sign in"}
          </Link>
        </div>
      </section>
    </main>
  );
}
