import { auth } from "@repo/auth/server";
import type { Session, User } from "better-auth";

export interface CreateContextOptions {
  session: Session | null;
  user: User | null;
  locale: string;
}

export async function createContextInner(opts: CreateContextOptions) {
  return {
    session: opts.session,
    user: opts.user,
    locale: opts.locale,
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContextInner>>;
