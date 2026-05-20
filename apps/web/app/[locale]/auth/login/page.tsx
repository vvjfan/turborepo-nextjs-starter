import { loadTranslations } from "@repo/i18n/server";
import { LoginForm } from "./login-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  const t = await loadTranslations(locale, "common");

  return <LoginForm t={t} locale={locale} />;
}
