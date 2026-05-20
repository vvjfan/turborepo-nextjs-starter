import type { Metadata } from "next";
import { Providers } from "../providers";

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "zh-CN" ? "管理后台 - TurboStarter" : "Admin - TurboStarter",
  };
}

export default async function LocaleLayout({ params, children }: Props) {
  const { locale } = await params;

  return (
    <div lang={locale}>
      <Providers>{children}</Providers>
    </div>
  );
}
