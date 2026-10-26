import { ConfirmationProvider } from "@/components/ConfirmationProvider";
import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import { THEME_KEY, resolveTheme } from "@/lib/theme";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { brandName, brandKeywords } from "@/lib/brand-metadata";
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const locale =
    h.get("x-spiderroute-locale") === "ru" || h.get("host")?.startsWith("ru.")
      ? "ru"
      : "en";
  return {
    title: {
      default:
        locale === "ru"
          ? "Рекордис — редактор веломаршрутов и поездок на самокате"
          : "Rekordis — Bike & scooter route editor",
      template: `%s · ${brandName(locale)}`,
    },
    keywords: brandKeywords(locale),
    description:
      locale === "ru"
        ? "Просматривайте, редактируйте и делитесь маршрутами для велосипедов, электровелосипедов и самокатов. Добавляйте заметки и экспортируйте GPS-треки."
        : "View, edit and share bike, e-bike and scooter routes. Add ride notes and export your GPS tracks.",
    metadataBase: new URL("https://rekordis.com"),
  };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const theme = resolveTheme((await cookies()).get(THEME_KEY)?.value);
  const locale =
    h.get("x-spiderroute-locale") === "ru" || h.get("host")?.startsWith("ru.")
      ? "ru"
      : "en";
  return (
    <html lang={locale} data-theme={theme}>
      <body>
        <Script src="/analytics.js" strategy="afterInteractive" />
        <ThemeProvider initialTheme={theme}>
          <ConfirmationProvider>{children}</ConfirmationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
