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
      <h2>Access Denied</h2>
      <Link href="/en">Go home</Link>
    </div>
  );
}
