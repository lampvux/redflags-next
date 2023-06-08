import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./next-i18next.config";
import { fallbackLng, languages } from "./app/i18n/settings";

function getLocale(request) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let language = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locales = i18n.locales;

  return matchLocale(language, locales, i18n.defaultLocale);
}

const cookieName = "lang";

export function middleware(req) {
  const pathname = req.nextUrl.pathname;

  let lng;
  // get current language from cookie first
  if (req.cookies.has(cookieName)) {
    lng = req.cookies.get(cookieName).value;
  }
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  // Check if there is any supported locale in the pathname
  if (!lng && !pathnameIsMissingLocale) {
    lng = getLocale(req);
  }
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => pathname.startsWith(`/${loc}`)) &&
    !pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(new URL(`/${lng}${pathname}`, req.url));
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
