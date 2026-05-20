import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/auth",
    "@repo/db",
    "@repo/i18n",
    "@repo/trpc",
    "@repo/ui",
    "@repo/config-tailwind",
  ],
  serverExternalPackages: ["pg", "kysely"],
};

export default nextConfig;
