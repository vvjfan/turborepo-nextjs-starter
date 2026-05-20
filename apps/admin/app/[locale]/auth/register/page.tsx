"use client";

import { authClient } from "@repo/auth/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function AdminRegisterPage() {
  const params = useParams();
  const locale = (params.locale as string) ?? "en";
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
      setError(err.message ?? "Registration failed");
      return;
    }

    router.push(`/${locale}`);
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
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Register</h1>
      {error && <p style={{ color: "red", fontSize: "0.875rem" }}>{error}</p>}
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
          placeholder="Name"
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
          placeholder="Email"
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
          placeholder="Password"
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
          }}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>
      <Link
        href={`/${locale}/auth/login`}
        style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
      >
        Already have an account?
      </Link>
    </div>
  );
}
