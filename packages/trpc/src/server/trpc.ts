import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import type { createContextInner } from "./createContext";

const t = initTRPC.context<typeof createContextInner>().create({
  transformer: superjson,
});

export const trpc = t;
export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
