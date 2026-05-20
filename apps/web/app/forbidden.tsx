import Link from "next/link";

export default function Forbidden() {
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
      <h2 style={{ fontSize: "1.5rem" }}>Access Denied</h2>
      <p>You don&apos;t have permission to access this resource</p>
      <Link
        href="/en"
        style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
      >
        Go home
      </Link>
    </div>
  );
}
