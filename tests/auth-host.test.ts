import assert from "node:assert/strict";
import test from "node:test";
import { trustedAuthHost } from "../src/lib/auth-host";
test("OAuth origins reject lookalikes, arbitrary ports and production localhost", () => {
  assert.deepEqual(trustedAuthHost("APP.REKORDIS.COM"), {
    host: "app.rekordis.com",
    protocol: "https",
  });
  assert.equal(trustedAuthHost("localhost:3210"), null);
  assert.deepEqual(trustedAuthHost("localhost:3210", true), {
    host: "localhost:3210",
    protocol: "http",
  });
  for (const host of [
    "rekordis.com.evil.test",
    "app.rekordis.com:443",
    "rekordis.com@evil.test",
    "localhost:3000",
    "",
    "rekordis.com,evil.test",
  ])
    assert.equal(trustedAuthHost(host, true), null);
});
