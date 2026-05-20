import { auth } from "@repo/auth/server";
import { locales, defaultLocale, hasLocale } from "@repo/i18n";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const cookieName = "NEXT_LOCALE";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );

  if (!pathLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  if (!hasLocale(pathLocale)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
