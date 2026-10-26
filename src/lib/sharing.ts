import { brandKeywords, brandName } from "./brand-metadata";
import type { Metadata } from "next";
import type { Locale } from "./types";
import { routePageTitle } from "./route-details";

export function shareLocale(
  value: string | string[] | undefined,
  host?: string,
): Locale {
  if (value === "ru" || value === "en") return value;
  return ["ru.rekordis.com", "ru.spiderroute.com"].includes(
    host?.toLowerCase().split(":")[0] || "",
  )
    ? "ru"
    : "en";
}

export function sharePath(token: string, locale: Locale): string {
  return `/s/${encodeURIComponent(token)}/${locale}`;
}

export function shareUrl(token: string, locale: Locale): string {
  const host = locale === "ru" ? "ru.rekordis.com" : "rekordis.com";
  return `https://${host}/${encodeURIComponent(token)}`;
}
export function safeShareReturn(value: string | null): string | undefined {
  if (!value) return;
  return /^\/s\/(?:[A-Za-z0-9_-]{16}|[A-Za-z0-9_-]{32})(?:\/(?:en|ru)|\?lang=(?:en|ru))?$/.test(
    value,
  )
    ? value
    : undefined;
}

export function sharedMetadata(
  token: string,
  locale: Locale,
  name?: string,
): Metadata {
  const ru = locale === "ru";
  const title = routePageTitle(
    name?.trim() || (ru ? "Маршрут" : "Route"),
    locale,
  );
  const routeName = title.slice(0, title.lastIndexOf(" · "));
  const description = ru
    ? `Веломаршрут «${routeName}»: карта, заметки и GPS-трек. Посмотрите маршрут, скачайте трек или сохраните копию.`
    : `Cycling route “${routeName}”: map, ride notes and GPS track. Explore the route, download the track or save a copy.`;
  const url = shareUrl(token, locale);
  const image = {
    url: "https://rekordis.com/icon.png",
    width: 512,
    height: 512,
    alt: ru ? "Логотип Rekordis" : "Rekordis logo",
  };
  return {
    title: { absolute: title },
    keywords: brandKeywords(locale),
    description,
    robots: { index: false, follow: false },
    referrer: "strict-origin-when-cross-origin",
    alternates: {
      canonical: url,
      languages: {
        en: shareUrl(token, "en"),
        ru: shareUrl(token, "ru"),
        "x-default": shareUrl(token, "en"),
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      siteName: brandName(locale),
      locale: ru ? "ru_RU" : "en_US",
      alternateLocale: ru ? "en_US" : "ru_RU",
      images: [image],
    },
    twitter: { card: "summary", title, description, images: [image] },
  };
}
