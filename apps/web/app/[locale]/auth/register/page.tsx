import { loadTranslations } from "@repo/i18n/server";
import { RegisterForm } from "./register-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const t = await loadTranslations(locale, "common");

  return <RegisterForm t={t} locale={locale} />;
}
