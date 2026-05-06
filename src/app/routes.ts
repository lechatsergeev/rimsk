export type AppRoute = "/" | "/delivery" | "/certificates" | "/contacts";

const BASE_URL = import.meta.env.BASE_URL || "/";

function normalizeBase(base: string) {
  if (!base.startsWith("/")) return `/${base}`;
  return base.endsWith("/") ? base : `${base}/`;
}

export function normalizeRoutePath(rawPath: string) {
  const base = normalizeBase(BASE_URL);
  let path = rawPath || "/";

  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (base !== "/" && path.startsWith(base)) {
    const trimmed = path.slice(base.length - 1);
    path = trimmed || "/";
  }

  path = path.replace(/\/+$/, "") || "/";

  if (path === "/delivery") return "/delivery";
  if (path === "/certificates") return "/certificates";
  if (path === "/contacts") return "/contacts";
  return "/";
}

export function getRouteHref(path: AppRoute) {
  const base = normalizeBase(BASE_URL);

  if (path === "/") {
    return base;
  }

  return `${base}${path.slice(1)}`;
}
