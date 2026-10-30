import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, isValidLocale } from "./i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const localeSegment = pathname.split("/")[1];
    const currentLocale = isValidLocale(localeSegment) ? localeSegment : DEFAULT_LOCALE;
    const response = NextResponse.next();
    response.headers.set("x-fitkarma-locale", currentLocale);
    return response;
  }

  // Rewrite / redirect to default locale for root or non-locale routes
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - auth (Auth callbacks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - brand (brand SVGs/PNGs)
     * - icons (icon assets)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!api|auth|_next/static|_next/image|brand|icons|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

