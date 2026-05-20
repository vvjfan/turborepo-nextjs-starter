import { auth } from "@repo/auth/server";
import { hasLocale } from "./_dictionaries";
import { headers } from "next/headers";
import { unauthorized, notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    unauthorized();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Admin Dashboard
      </h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}
