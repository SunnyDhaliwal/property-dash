import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="container-page grid min-h-screen place-content-center py-12">
      <div className="w-full max-w-md">
        <Link href="/">← Home</Link>
        <h1 className="mt-8 text-4xl font-bold">Sign in</h1>
        <p className="mb-6 mt-2 text-slate-600">
          Access your organisation’s property memory.
        </p>
        {error === "setup" && (
          <p className="mb-4 rounded-md bg-amber-100 p-3">
            Supabase is not configured. Add the environment variables described
            in the README.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
