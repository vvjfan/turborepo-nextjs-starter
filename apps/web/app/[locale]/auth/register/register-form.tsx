"use client";

import { authClient } from "@repo/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { WebDictionary } from "../../_dictionaries";

export function RegisterForm({
  dict,
  locale,
}: {
  dict: WebDictionary;
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
    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error: err } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (err) {
      setError(err.message ?? dict.sign_up_error);
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
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{dict.register}</h1>
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
          type="text"
          name="name"
          placeholder={dict.name}
          required
          style={{
            padding: "0.5rem",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder={dict.email}
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
          placeholder={dict.password}
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
          {loading ? dict.loading : dict.sign_up}
        </button>
      </form>
      <Link
        href={`/${locale}/auth/login`}
        style={{
          color: "hsl(var(--primary))",
          textDecoration: "underline",
        }}
      >
        {dict.login}
      </Link>
    </div>
  );
}
