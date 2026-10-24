/* Shared Google tag for the public website and web app. No route data or IDs. */
(() => {
  const hosts = [
    "spiderroute.com",
    "www.spiderroute.com",
    "ru.spiderroute.com",
    "app.spiderroute.com",
  ];
  if (!hosts.includes(location.hostname) || window.spiderRouteAnalytics) return;
  window.spiderRouteAnalytics = true;
  const measurementId = "G-D7QRC30XY4";
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  const gtag = window.gtag;
  const safePath = (pathname) => {
    if (/^\/r\//.test(pathname)) return "/r/route";
    if (/^\/s\//.test(pathname)) return "/s/shared-route";
    if (/^\/sets\/shared\//.test(pathname)) return "/sets/shared/collection";
    if (/^\/sets\//.test(pathname)) return "/sets/collection";
    return [
      "/",
      "/workspace",
      "/sets",
      "/settings",
      "/privacy",
      "/ios/privacy",
    ].includes(pathname)
      ? pathname
      : "/other";
  };
  let referrer = "";
  try {
    referrer = new URL(document.referrer).origin + "/";
  } catch {}
  let previousPath;
  const pageView = () => {
    const path = location.pathname;
    if (path === previousPath) return;
    previousPath = path;
    if (/^\/(api|auth)(\/|$)/.test(path)) return;
    const page = {
      page_location: location.origin + safePath(path),
      page_referrer: referrer,
      page_title: "SpiderRoute " + safePath(path),
    };
    // Set defaults too, so automatic engagement events use the same safe values.
    gtag("set", page);
    gtag("event", "page_view", { ...page, send_to: measurementId });
    referrer = page.page_location;
  };
  gtag("js", new Date());
  gtag("set", {
    page_location: location.origin + safePath(location.pathname),
    page_referrer: referrer,
    page_title: "SpiderRoute " + safePath(location.pathname),
  });
  gtag("config", measurementId, {
    send_page_view: false,
    cookie_domain: "spiderroute.com",
    cookie_flags: "SameSite=Lax;Secure",
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  pageView();
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (...args) {
      const result = original.apply(this, args);
      pageView();
      return result;
    };
  }
  window.addEventListener("popstate", pageView);
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + measurementId;
  document.head.appendChild(script);
})();
