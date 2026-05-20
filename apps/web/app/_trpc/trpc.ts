"use client";

import type { AppRouter } from "@repo/trpc/server/routers/_app";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
