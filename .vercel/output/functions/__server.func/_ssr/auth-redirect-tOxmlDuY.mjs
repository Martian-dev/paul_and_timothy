//#region node_modules/.nitro/vite/services/ssr/assets/auth-redirect-tOxmlDuY.js
var FALLBACK_REDIRECT = "/";
/**
* Only allow same-origin, relative application paths as auth destinations.
* Reject protocol-relative URLs, backslash tricks, and control characters so
* redirect state cannot become an open redirect.
*/
function sanitizeAuthRedirect(value) {
	if (typeof value !== "string" || value.length === 0 || value.length > 2048) return;
	if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\") || Array.from(value).some((character) => {
		const code = character.charCodeAt(0);
		return code <= 31 || code === 127;
	})) return;
	try {
		const url = new URL(value, "https://pttc.local");
		if (url.origin !== "https://pttc.local") return void 0;
		return `${url.pathname}${url.search}${url.hash}`;
	} catch {
		return;
	}
}
function authRedirectFromSearch(value) {
	return sanitizeAuthRedirect(value) ?? FALLBACK_REDIRECT;
}
function authUrl(path, redirect) {
	const safeRedirect = sanitizeAuthRedirect(redirect);
	if (!safeRedirect) return path;
	return `${path}?${new URLSearchParams({ redirect: safeRedirect }).toString()}`;
}
function currentPath(location) {
	const search = typeof location.search === "string" ? location.search : location.search ? `?${new URLSearchParams(Object.entries(location.search).reduce((params, [key, value]) => {
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") params[key] = String(value);
		return params;
	}, {})).toString()}` : "";
	return sanitizeAuthRedirect(`${location.pathname}${search}${location.hash ?? ""}`) ?? FALLBACK_REDIRECT;
}
//#endregion
export { authUrl as n, currentPath as r, authRedirectFromSearch as t };
