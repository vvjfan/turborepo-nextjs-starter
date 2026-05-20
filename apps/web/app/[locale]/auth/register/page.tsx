import { getDictionary, hasLocale } from "../../_dictionaries";
import { RegisterForm } from "./register-form";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return <RegisterForm dict={dict} locale={locale} />;
}
