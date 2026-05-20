import { auth } from "@repo/auth/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "zh-CN"] as const;
const defaultLocale = "en";
const cookieName = "NEXT_LOCALE";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );

  if (!pathLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session && !pathname.startsWith(`/${pathLocale}/auth`)) {
    return NextResponse.redirect(
      new URL(`/${pathLocale}/auth/login`, request.url),
    );
  }

  const response = NextResponse.next();
  response.cookies.set(cookieName, pathLocale, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
