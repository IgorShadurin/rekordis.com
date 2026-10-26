import { publicSetsForSitemap } from "@/server/item-sets";
export const dynamic = "force-dynamic";
import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "https://rekordis.com",
    "https://ru.rekordis.com",
  ].flatMap((origin) =>
    ["", "/privacy"].map((path) => ({
      url: origin + path,
      alternates: {
        languages: {
          en: "https://rekordis.com" + path,
          ru: "https://ru.rekordis.com" + path,
          "x-default": "https://rekordis.com" + path,
        },
      },
    })),
  );
  return [
    ...pages,
    ...publicSetsForSitemap().map((set) => ({
      url: new URL(
        `/sets/shared/${set.token}`,
        process.env.NEXTAUTH_URL || "https://app.rekordis.com",
      ).href,
      lastModified: set.updated_at,
    })),
  ];
}
