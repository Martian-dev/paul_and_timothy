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
  "src/routes/login.tsx",
  "src/routes/signup.tsx",
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

console.log("auth redirect smoke: PASS");
