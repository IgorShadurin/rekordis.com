// NextAuth may derive its callback origin only from these application hosts.
// Never pass client-supplied forwarded-host/proto headers through unchanged.
const authHosts = new Set(["app.spiderroute.com", "app.rekordis.com"]);
export function trustedAuthHost(host: string, development = false) {
  const normalized = host.toLowerCase();
  if (authHosts.has(normalized)) return { host: normalized, protocol: "https" };
  if (development && normalized === "localhost:3210")
    return { host: normalized, protocol: "http" };
  return null;
}
