import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: { default: "TurboStarter", template: "%s | TurboStarter" },
  description: "Turborepo Next.js Starter Template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
