import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

type LayoutProps = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh-CN" }];
}

export const metadata: Metadata = {
  title: { default: "TurboStarter", template: "%s | TurboStarter" },
  description: "Turborepo Next.js Starter Template",
};

export default async function RootLayout({ children, params }: LayoutProps) {
  return (
    <html lang={(await params).locale} suppressHydrationWarning>
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
