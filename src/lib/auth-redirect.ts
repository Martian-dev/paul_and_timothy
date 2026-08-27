import { defaultStringifySearch } from "@tanstack/react-router";

const FALLBACK_REDIRECT = "/";
const AUTH_REDIRECT_STORAGE_KEY = "pttc.auth.redirect";

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

/**
 * Keep a return destination in the current tab while Clerk completes its
 * sign-in flow. This is a defensive handoff for providers or verification
 * steps that ignore the mounted component's redirect props and land on the
 * configured home URL first.
 */
export function rememberAuthRedirect(value: unknown): void {
  if (typeof window === "undefined") return;

  const safeRedirect = sanitizeAuthRedirect(value);
  try {
    if (!safeRedirect || safeRedirect === FALLBACK_REDIRECT) {
      window.sessionStorage.removeItem(AUTH_REDIRECT_STORAGE_KEY);
      return;
    }
    window.sessionStorage.setItem(AUTH_REDIRECT_STORAGE_KEY, safeRedirect);
  } catch {
    // Storage can be disabled by privacy settings; Clerk's own redirect still
    // remains the primary path in that case.
  }
}

export function getPendingAuthRedirect(): string | undefined {
  if (typeof window === "undefined") return undefined;

  try {
    return sanitizeAuthRedirect(window.sessionStorage.getItem(AUTH_REDIRECT_STORAGE_KEY));
  } catch {
    return undefined;
  }
}

export function clearPendingAuthRedirect(): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.removeItem(AUTH_REDIRECT_STORAGE_KEY);
  } catch {
    // Ignore storage failures; there is nothing else to clean up.
  }
}

export function authUrl(
  path: "/login" | "/signup" | "/sign-in" | "/sign-up",
  redirect?: string,
): string {
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
        ? defaultStringifySearch(location.search)
        : "";

  return (
    sanitizeAuthRedirect(`${location.pathname}${search}${location.hash ?? ""}`) ?? FALLBACK_REDIRECT
  );
}
