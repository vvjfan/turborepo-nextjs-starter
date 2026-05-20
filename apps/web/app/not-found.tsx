import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        gap: "1rem",
      }}
    >
      <h2 style={{ fontSize: "1.5rem" }}>Page not found</h2>
      <p>Could not find the requested resource</p>
      <Link
        href="/en"
        style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
      >
        Go home
      </Link>
    </div>
  );
}
