import { NextResponse, type NextRequest } from "next/server";
import { trustedAuthHost } from "./lib/auth-host";
export function proxy(req: NextRequest) {
  const origin = trustedAuthHost(
    req.headers.get("host") || req.nextUrl.host,
    process.env.NODE_ENV !== "production",
  );
  if (!origin && /^\/api\/auth(?:\/|$)/.test(req.nextUrl.pathname))
    return new NextResponse("Unrecognized authentication host", {
      status: 400,
    });
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-forwarded-host", origin?.host || "app.rekordis.com");
  requestHeaders.set("x-forwarded-proto", origin?.protocol || "https");
  if (req.nextUrl.pathname.startsWith("/api/"))
    return NextResponse.next({ request: { headers: requestHeaders } });
  const host = (req.headers.get("host") || req.nextUrl.hostname)
    .toLowerCase()
    .split(":")[0]
    .replace(/(^|\.)spiderroute\.com$/, "$1rekordis.com");
  if (host === "www.rekordis.com")
    return NextResponse.redirect(
      new URL(
        req.nextUrl.pathname + req.nextUrl.search,
        "https://rekordis.com",
      ),
      308,
    );
  if (
    ["rekordis.com", "ru.rekordis.com"].includes(host) &&
    (req.nextUrl.pathname.startsWith("/workspace") ||
      req.nextUrl.pathname.startsWith("/s/") ||
      req.nextUrl.pathname.startsWith("/r/") ||
      req.nextUrl.pathname === "/settings" ||
      req.nextUrl.pathname === "/sets" ||
      req.nextUrl.pathname.startsWith("/sets/"))
  ) {
    const target = new URL(
      req.nextUrl.pathname + req.nextUrl.search,
      "https://app.rekordis.com",
    );
    if (host.startsWith("ru.")) target.searchParams.set("lang", "ru");
    return NextResponse.redirect(target, 307);
  }
  const legacyId =
    req.nextUrl.pathname === "/workspace"
      ? req.nextUrl.searchParams.get("route")
      : null;
  if (
    legacyId ||
    (req.nextUrl.pathname.startsWith("/r/") && req.nextUrl.search)
  ) {
    const target = req.nextUrl.clone();
    if (legacyId) target.pathname = `/r/${encodeURIComponent(legacyId)}`;
    target.search = "";
    return NextResponse.redirect(target, 307);
  }
  if (host === "app.rekordis.com" && req.nextUrl.pathname === "/workspace") {
    const target = req.nextUrl.clone();
    target.pathname = "/";
    return NextResponse.redirect(target, 307);
  }
  const sharedPathLocale = /^\/s\/[^/]+\/(en|ru)\/?$/.exec(
    req.nextUrl.pathname,
  )?.[1];
  requestHeaders.set(
    "x-spiderroute-locale",
    req.nextUrl.pathname.startsWith("/s/")
      ? (sharedPathLocale ?? req.nextUrl.searchParams.get("lang")) === "ru"
        ? "ru"
        : "en"
      : host.startsWith("ru.")
        ? "ru"
        : "en",
  );
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (
    req.nextUrl.pathname === "/settings" ||
    req.nextUrl.pathname === "/sets" ||
    req.nextUrl.pathname.startsWith("/sets/")
  ) {
    response.headers.set("Cache-Control", "private, no-store");
  }
  return response;
}
export const config = { matcher: ["/((?!_next|icon.svg).*)"] };
