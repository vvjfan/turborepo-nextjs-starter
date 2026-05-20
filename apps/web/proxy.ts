import { proxy as i18nProxy } from "@repo/i18n/proxy";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return i18nProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
