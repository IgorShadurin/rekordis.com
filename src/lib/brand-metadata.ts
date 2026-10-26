import type { Locale } from "./types";

export const brandName = (locale: Locale) =>
  locale === "ru" ? "Рекордис" : "Rekordis";

export const brandKeywords = (locale: Locale) =>
  locale === "ru"
    ? [
        "Рекордис",
        "Rekordis",
        "веломаршруты",
        "редактор GPX",
        "маршруты на самокате",
      ]
    : ["Rekordis", "cycling routes", "GPX editor", "scooter routes"];
