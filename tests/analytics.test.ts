import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";

const source = readFileSync("public/analytics.js", "utf8");
function browser(host = "app.spiderroute.com") {
  const location = { hostname: host, origin: `https://${host}`, pathname: "/" };
  const scripts: Record<string, unknown>[] = [];
  const events: Record<string, () => void> = {};
  const window = {
    addEventListener: (name: string, fn: () => void) => {
      events[name] = fn;
    },
  } as any;
  const context = {
    location,
    window,
    document: {
      referrer: "https://example.com/private?email=secret@example.com#token",
      createElement: () => ({}),
      head: {
        appendChild: (script: Record<string, unknown>) => scripts.push(script),
      },
    },
    history: Object.fromEntries(
      ["pushState", "replaceState"].map((name) => [
        name,
        (_state: unknown, _unused: string, path: string) => {
          location.pathname = new URL(path, location.origin).pathname;
        },
      ]),
    ),
    URL,
  };
  runInNewContext(source, context);
  return {
    ...context,
    scripts,
    events,
    views: () => (window.dataLayer || []).filter((a: any) => a[0] === "event"),
  };
}
test("analytics shares one tag across production hosts and skips local/preview hosts", () => {
  for (const host of [
    "spiderroute.com",
    "app.spiderroute.com",
    "ru.spiderroute.com",
    "www.spiderroute.com",
  ]) {
    const b = browser(host);
    assert.equal(b.scripts.length, 1);
    assert.equal(b.views().length, 1);
    assert.match(String(b.scripts[0].src), /G-D7QRC30XY4$/);
    runInNewContext(source, b);
    assert.equal(b.views().length, 1);
  }
  for (const host of [
    "localhost",
    "preview.example.com",
    "spiderroute.com.evil.test",
  ]) {
    assert.equal(browser(host).scripts.length, 0);
  }
});
test("SPA views redact private IDs, query, hash, referrer paths and avoid duplicate views", () => {
  const b = browser();
  b.history.pushState(
    null,
    "",
    "/r/secret-id?email=secret@example.com#place-private",
  );
  b.history.replaceState(null, "", "/r/secret-id?lang=ru");
  b.history.pushState(null, "", "/s/secret-token/en");
  b.history.pushState(null, "", "/sets/shared/private-token");
  b.history.pushState(null, "", "/api/auth/callback/google?code=secret");
  assert.equal(b.views().length, 4);
  assert.equal(
    b.views()[1][2].page_location,
    "https://app.spiderroute.com/r/route",
  );
  assert.equal(
    b.views()[2][2].page_location,
    "https://app.spiderroute.com/s/shared-route",
  );
  assert.equal(
    b.views()[3][2].page_location,
    "https://app.spiderroute.com/sets/shared/collection",
  );
  assert.equal(b.views()[0][2].page_referrer, "https://example.com/");
  assert.doesNotMatch(
    JSON.stringify(b.window.dataLayer),
    /secret|private-token|place-private/,
  );
  b.location.pathname = "/settings";
  b.events.popstate();
  assert.equal(b.views().length, 5);
});
