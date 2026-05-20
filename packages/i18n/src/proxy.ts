import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language-parser";
import { locales, defaultLocale } from "./index";

const cookieName = "NEXT_LOCALE";

function getLocale(request: NextRequest): string {
  const cookie = request.cookies.get(cookieName)?.value;
  if (cookie && locales.includes(cookie as typeof locales[number])) {
    return cookie;
  }

  const header = request.headers.get("Accept-Language") || "";
  const parsed = acceptLanguage.parse(header);
  for (const lang of parsed) {
    if (locales.includes(lang.code as typeof locales[number])) {
      return lang.code;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathLocale = locales.find(
    (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
  );

  if (pathLocale) {
    const response = NextResponse.next();
    response.cookies.set(cookieName, pathLocale, {
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  }

  const locale = getLocale(request);
  const url = new URL(`/${locale}${pathname}`, request.url);
  url.search = request.nextUrl.search;
  return NextResponse.redirect(url, { status: 307 });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
