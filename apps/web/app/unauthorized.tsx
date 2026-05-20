import Link from "next/link";

export default function Unauthorized() {
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
      <h2 style={{ fontSize: "1.5rem" }}>Please log in</h2>
      <p>You need to be signed in to access this page</p>
      <Link
        href="/en/auth/login"
        style={{ color: "hsl(var(--primary))", textDecoration: "underline" }}
      >
        Log in
      </Link>
    </div>
  );
}
