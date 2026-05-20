"use client";

import { authClient } from "@repo/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  t,
  locale,
}: {
  t: Record<string, string>;
  locale: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error: err } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (err) {
      setError(err.message ?? t.sign_in_error);
      return;
    }

    router.push(`/${locale}/dashboard`);
    router.refresh();
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "1.5rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{t.login}</h1>
      {error && (
        <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "320px",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder={t.email}
          required
          style={{
            padding: "0.5rem",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder={t.password}
          required
          style={{
            padding: "0.5rem",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            border: "none",
            borderRadius: "var(--radius)",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? t.loading : t.sign_in}
        </button>
      </form>
      <p>{t.or_continue_with}</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link
          href={`/${locale}/auth/register`}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {t.register}
        </Link>
      </div>
    </div>
  );
}
