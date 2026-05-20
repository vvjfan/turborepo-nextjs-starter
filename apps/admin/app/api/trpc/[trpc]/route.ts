import { auth } from "@repo/auth/server";
import { createContextInner } from "@repo/trpc/server/createContext";
import { appRouter } from "@repo/trpc/server/routers/_app";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { headers } from "next/headers";

const handler = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () =>
      createContextInner({
        session: session?.session ?? null,
        user: session?.user ?? null,
        locale: "en",
      }),
  });
};

export { handler as GET, handler as POST };
