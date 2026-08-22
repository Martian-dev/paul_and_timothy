import assert from "node:assert/strict";
import fs from "node:fs";

const { authUrl, currentPath, sanitizeAuthRedirect } = await import("../src/lib/auth-redirect.ts");

assert.equal(sanitizeAuthRedirect("/register?event=alethia"), "/register?event=alethia");
assert.equal(sanitizeAuthRedirect("https://evil.example"), undefined);
assert.equal(sanitizeAuthRedirect("//evil.example"), undefined);
assert.equal(
  authUrl("/signup", "/register?event=alethia"),
  "/signup?redirect=%2Fregister%3Fevent%3Dalethia",
);
assert.equal(
  currentPath({ pathname: "/events/upcoming", search: { tab: "alethia" } }),
  "/events/upcoming?tab=alethia",
);

for (const file of [
  "src/routes/login.$.tsx",
  "src/routes/signup.$.tsx",
  "src/routes/sign-in.$.tsx",
  "src/routes/sign-up.$.tsx",
]) {
  const source = fs.readFileSync(file, "utf8");
  assert.doesNotMatch(source, /forceRedirectUrl="\//, `${file} must not hard-code home redirects`);
  assert.match(
    source,
    /forceRedirectUrl=\{destination\}/,
    `${file} must use the validated destination`,
  );
}

const coursesSource = fs.readFileSync("src/routes/courses.index.tsx", "utf8");
assert.match(
  coursesSource,
  /search=\{\{ course: undefined, redirect: "\/courses" \}\}/,
  "the course CTA must preserve the course route after authentication",
);

const rootSource = fs.readFileSync("src/routes/__root.tsx", "utf8");
assert.doesNotMatch(
  rootSource,
  /prefetchUI=\{false\}/,
  "prebuilt Clerk UI components must be loadable for UserButton and SignIn",
);
assert.match(
  rootSource,
  /<ClerkProvider[^>]*prefetchUI>/,
  "the Clerk UI bundle must be prefetched for prebuilt auth components",
);

const siteNavSource = fs.readFileSync("src/components/ui/SiteNav.tsx", "utf8");
assert.match(
  siteNavSource,
  /<Show when="signed-out" treatPendingAsSignedOut=\{false\}>/,
  "pending Clerk sessions must not render a misleading signed-out nav",
);
assert.match(
  siteNavSource,
  /<Show when="signed-in" treatPendingAsSignedOut=\{false\}>/,
  "pending Clerk sessions must not render signed-in controls prematurely",
);

const registerSource = fs.readFileSync("src/routes/register.tsx", "utf8");
assert.match(
  registerSource,
  /if \(!isUserLoaded\) \{\s*return <RegistrationAuthLoading \/>;\s*\}/,
  "registration must wait for the browser Clerk session before rendering form data",
);
assert.match(
  registerSource,
  /if \(!user\) \{[\s\S]*return <RegistrationAuthRequired returnTo=/,
  "registration must not render user-scoped data for a signed-out browser session",
);

console.log("auth redirect smoke: PASS");
