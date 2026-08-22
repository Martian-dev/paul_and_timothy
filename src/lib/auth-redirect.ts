const FALLBACK_REDIRECT = "/";

/**
 * Only allow same-origin, relative application paths as auth destinations.
 * Reject protocol-relative URLs, backslash tricks, and control characters so
 * redirect state cannot become an open redirect.
 */
export function sanitizeAuthRedirect(value: unknown): string | undefined {
  if (typeof value !== "string" || value.length === 0 || value.length > 2048) {
    return undefined;
  }

  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    Array.from(value).some((character) => {
      const code = character.charCodeAt(0);
      return code <= 31 || code === 127;
    })
  ) {
    return undefined;
  }

  try {
    const url = new URL(value, "https://pttc.local");
    if (url.origin !== "https://pttc.local") return undefined;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return undefined;
  }
}

export function authRedirectFromSearch(value: unknown): string {
  return sanitizeAuthRedirect(value) ?? FALLBACK_REDIRECT;
}

export function authUrl(path: "/login" | "/signup", redirect?: string): string {
  const safeRedirect = sanitizeAuthRedirect(redirect);
  if (!safeRedirect) return path;

  const search = new URLSearchParams({ redirect: safeRedirect });
  return `${path}?${search.toString()}`;
}

export function currentPath(location: {
  pathname: string;
  search?: string | Record<string, unknown>;
  hash?: string;
}): string {
  const search =
    typeof location.search === "string"
      ? location.search
      : location.search
        ? `?${new URLSearchParams(
            Object.entries(location.search).reduce<Record<string, string>>(
              (params, [key, value]) => {
                if (
                  typeof value === "string" ||
                  typeof value === "number" ||
                  typeof value === "boolean"
                ) {
                  params[key] = String(value);
                }
                return params;
              },
              {},
            ),
          ).toString()}`
        : "";

  return (
    sanitizeAuthRedirect(`${location.pathname}${search}${location.hash ?? ""}`) ?? FALLBACK_REDIRECT
  );
}
