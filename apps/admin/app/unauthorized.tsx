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
      <h2>Please log in</h2>
      <Link href="/en/auth/login">Log in</Link>
    </div>
  );
}
