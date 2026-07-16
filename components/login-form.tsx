"use client";
import { useState } from "react";
import { createClient } from "@/lib/auth/browser";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function signIn(formData: FormData) {
    setPending(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (error) {
      setMessage(error.message);
      setPending(false);
      return;
    }
    window.location.assign("/dashboard");
  }
  async function magicLink(formData: FormData) {
    setPending(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: String(formData.get("email")),
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setMessage(
      error ? error.message : "Check your email for a secure sign-in link.",
    );
    setPending(false);
  }
  return (
    <form action={signIn} className="card grid gap-5">
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      {message && <p role="status">{message}</p>}
      <button className="button button-primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <button
        className="button button-secondary"
        formAction={magicLink}
        disabled={pending}
      >
        Email me a magic link
      </button>
    </form>
  );
}
