import { getDictionary, hasLocale } from "./_dictionaries";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "2rem",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        {dict.welcome}
      </h1>
      <p style={{ fontSize: "1.125rem", color: "hsl(var(--muted-foreground))" }}>
        {dict.greeting}
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href={`/${locale}/auth/login`}>
          <Button variant="default">{dict.login}</Button>
        </Link>
        <Link href={`/${locale}/auth/register`}>
          <Button variant="outline">{dict.register}</Button>
        </Link>
      </div>
      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link
          href="/en"
          style={{
            color: locale === "en" ? "hsl(var(--primary))" : undefined,
          }}
        >
          English
        </Link>
        <span>/</span>
        <Link
          href="/zh-CN"
          style={{
            color: locale === "zh-CN" ? "hsl(var(--primary))" : undefined,
          }}
        >
          中文
        </Link>
      </div>
    </div>
  );
}
