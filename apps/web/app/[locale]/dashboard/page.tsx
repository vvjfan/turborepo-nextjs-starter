import { auth } from "@repo/auth/server";
import { loadTranslations } from "@repo/i18n/server";
import { headers } from "next/headers";
import { unauthorized } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: Props) {
  const { locale } = await params;
  const t = await loadTranslations(locale, "common");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    unauthorized();
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{t.dashboard}</h1>
      <p>Welcome, {session.user.name}</p>
    </div>
  );
}
