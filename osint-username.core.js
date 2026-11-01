/** Browser + Node: normalize profile URLs to usernames (OSINT search). */
function normalizeUsername(raw) {
  let s = String(raw || "").trim();
  if (!s) return "";
  s = s.replace(/^@+/, "");
  const tryUrl = (href) => {
    try {
      const u = new URL(href);
      const host = u.hostname.replace(/^www\./i, "").toLowerCase();
      const parts = u.pathname
        .split("/")
        .filter(Boolean)
        .map((p) => decodeURIComponent(p.split("?")[0]));
      if (host === "github.com" && parts[0]) return parts[0].replace(/\.git$/i, "");
      if (host === "gitlab.com" && parts[0]) return parts[0];
      if (host === "linkedin.com" && parts[0] === "in" && parts[1]) return parts[1];
      if (
        (host === "twitter.com" || host === "x.com") &&
        parts[0] &&
        parts[0] !== "i" &&
        parts[0] !== "intent"
      )
        return parts[0];
      if (host === "reddit.com" && parts[0] === "user" && parts[1]) return parts[1];
      if (host === "news.ycombinator.com") {
        const id = u.searchParams.get("id");
        if (id) return id;
      }
      if (host === "keybase.io" && parts[0]) return parts[0];
      if (parts.length) return parts[parts.length - 1];
    } catch (_) {}
    return "";
  };
  if (/^https?:\/\//i.test(s)) s = tryUrl(s) || s;
  else if (/^[a-z0-9.-]+\//i.test(s)) s = tryUrl("https://" + s) || s;
  else s = s.replace(/^@+/, "").split("/").filter(Boolean).pop() || s;
  s = s.split("?")[0].split("#")[0].replace(/^@+/, "").trim();
  return s;
}

function pathUser(u) {
  return encodeURIComponent(u).replace(/[!'()*]/g, (c) =>
    "%" + c.charCodeAt(0).toString(16).toUpperCase(),
  );
}
