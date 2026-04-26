import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '../i18nConfig';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = i18nConfig.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18nConfig.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
