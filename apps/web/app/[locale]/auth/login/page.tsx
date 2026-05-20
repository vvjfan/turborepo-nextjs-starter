import { getDictionary, hasLocale } from "../../_dictionaries";
import { LoginForm } from "./login-form";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return <LoginForm dict={dict} locale={locale} />;
}
