import { auth } from "@repo/auth/server";
import { getDictionary, hasLocale } from "../_dictionaries";
import { headers } from "next/headers";
import { unauthorized, notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const [session, dict] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getDictionary(locale),
  ]);

  if (!session) {
    unauthorized();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{dict.dashboard}</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}
