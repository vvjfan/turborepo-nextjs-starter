"use client";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        Something went wrong!
      </h2>
      <p style={{ marginBottom: "1rem", color: "hsl(var(--muted-foreground))" }}>
        {error.message}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Try again
      </button>
    </div>
  );
}
