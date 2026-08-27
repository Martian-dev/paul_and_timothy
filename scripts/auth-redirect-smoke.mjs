import assert from "node:assert/strict";
import fs from "node:fs";

const {
  authUrl,
  clearPendingAuthRedirect,
  currentPath,
  getPendingAuthRedirect,
  rememberAuthRedirect,
  sanitizeAuthRedirect,
} = await import("../src/lib/auth-redirect.ts");

const storage = new Map();
globalThis.window = {
  sessionStorage: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key),
  },
};

rememberAuthRedirect("/register?event=alethia");
assert.equal(getPendingAuthRedirect(), "/register?event=alethia");
rememberAuthRedirect("https://evil.example");
assert.equal(getPendingAuthRedirect(), undefined);
rememberAuthRedirect("/register?event=alethia");
clearPendingAuthRedirect();
assert.equal(getPendingAuthRedirect(), undefined);
delete globalThis.window;

assert.equal(sanitizeAuthRedirect("/register?event=alethia"), "/register?event=alethia");
assert.equal(sanitizeAuthRedirect("https://evil.example"), undefined);
assert.equal(sanitizeAuthRedirect("//evil.example"), undefined);
assert.equal(
  authUrl("/signup", "/register?event=alethia"),
  "/signup?redirect=%2Fregister%3Fevent%3Dalethia",
);
assert.equal(
  authUrl("/sign-in", "/register?event=alethia"),
  "/sign-in?redirect=%2Fregister%3Fevent%3Dalethia",
);
assert.equal(
  authUrl("/sign-up", "/register?event=alethia"),
  "/sign-up?redirect=%2Fregister%3Fevent%3Dalethia",
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

for (const file of ["src/routes/login.$.tsx", "src/routes/sign-in.$.tsx"]) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(source, /signUpUrl=\{authUrl\("\/sign-up", destination\)\}/);
}
for (const file of ["src/routes/signup.$.tsx", "src/routes/sign-up.$.tsx"]) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(source, /signInUrl=\{authUrl\("\/sign-in", destination\)\}/);
}

for (const file of [
  "src/routes/login.$.tsx",
  "src/routes/sign-in.$.tsx",
  "src/routes/signup.$.tsx",
  "src/routes/sign-up.$.tsx",
]) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(
    source,
    /<AuthRedirectCapture destination=\{destination\} \/>/,
    `${file} must persist the return destination before Clerk starts`,
  );
}

const coursesSource = fs.readFileSync("src/routes/courses.index.tsx", "utf8");
assert.match(
  coursesSource,
  /search=\{\{ course: undefined, redirect: "\/courses" \}\}/,
  "the course CTA must preserve the course route after authentication",
);
assert.match(coursesSource, /to="\/sign-in\/\$"/);

const rootSource = fs.readFileSync("src/routes/__root.tsx", "utf8");
assert.match(
  rootSource,
  /getPendingAuthRedirect[\s\S]*window\.location\.replace/,
  "the app shell must recover a return destination if Clerk falls back home",
);
assert.match(rootSource, /<ClerkProvider[\s\S]*signInUrl="\/sign-in"/);
assert.match(rootSource, /<ClerkProvider[\s\S]*signUpUrl="\/sign-up"/);
assert.doesNotMatch(
  rootSource,
  /prefetchUI=\{false\}/,
  "prebuilt Clerk UI components must be loadable for UserButton and SignIn",
);
assert.match(
  rootSource,
  /<ClerkProvider[\s\S]*?prefetchUI\s*>/,
  "the Clerk UI bundle must be prefetched for prebuilt auth components",
);

const siteNavSource = fs.readFileSync("src/components/ui/SiteNav.tsx", "utf8");
assert.match(siteNavSource, /to="\/sign-in\/\$"/);
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
assert.match(registerSource, /to: "\/sign-in\/\$"/);
assert.match(registerSource, /to="\/sign-in\/\$"/);
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
