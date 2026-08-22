import assert from "node:assert/strict";
import fs from "node:fs";

const {
  addAssessmentResumeToUrl,
  clearPendingAssessment,
  readAssessmentResumeFromUrl,
  readPendingAssessment,
  savePendingAssessment,
} = await import("../src/lib/assessment-state.ts");
const { authUrl } = await import("../src/lib/auth-redirect.ts");

const sessionValues = new Map();
const localValues = new Map();
let cookieValue = "";
const fakeStorage = (values) => ({
  getItem: (key) => values.get(key) ?? null,
  setItem: (key, value) => values.set(key, value),
  removeItem: (key) => values.delete(key),
});

globalThis.window = {
  sessionStorage: fakeStorage(sessionValues),
  localStorage: fakeStorage(localValues),
};
globalThis.document = {
  get cookie() {
    return cookieValue;
  },
  set cookie(value) {
    cookieValue = value;
  },
};
globalThis.window.history = {
  state: null,
  replaceState: (_state, _title, url) => {
    const parsed = new URL(url, "https://pttc.local");
    globalThis.window.location.pathname = parsed.pathname;
    globalThis.window.location.search = parsed.search;
    globalThis.window.location.hash = parsed.hash;
  },
};
globalThis.window.location = {
  pathname: "/ministry-calling",
  search: "",
  hash: "",
};

const pending = {
  version: 1,
  answers: { "children-0": 5, "children-1": 4 },
  submitted: true,
};

assert.equal(readPendingAssessment("ministry_calling"), null);
savePendingAssessment("ministry_calling", pending);
assert.deepEqual(readPendingAssessment("ministry_calling"), pending);

sessionValues.clear();
assert.deepEqual(readPendingAssessment("ministry_calling"), pending);

localValues.clear();
cookieValue = "";
savePendingAssessment("ministry_calling", pending);
sessionValues.clear();
localValues.clear();
assert.deepEqual(readPendingAssessment("ministry_calling"), pending);

clearPendingAssessment("ministry_calling");
assert.equal(readPendingAssessment("ministry_calling"), null);
assert.equal(localValues.size, 0);

const resumeUrl = addAssessmentResumeToUrl("/ministry-calling", "ministry_calling", pending);
const resumeUrlObject = new URL(resumeUrl, "https://pttc.local");
window.location.pathname = resumeUrlObject.pathname;
window.location.search = resumeUrlObject.search;
window.location.hash = resumeUrlObject.hash;
assert.deepEqual(readAssessmentResumeFromUrl("ministry_calling"), pending);
assert.equal(window.location.search, "");

const authDestination = addAssessmentResumeToUrl("/ministry-calling", "ministry_calling", pending);
const authRedirect = new URLSearchParams(authUrl("/login", authDestination).split("?")[1]).get(
  "redirect",
);
assert.equal(authRedirect, authDestination);

for (const [file, assessmentType] of [
  ["src/routes/ministry-calling.tsx", "ministry_calling"],
  ["src/routes/spiritual-gifts.tsx", "spiritual_gifts"],
  ["src/routes/apest-assessment.tsx", "apest"],
]) {
  const source = fs.readFileSync(file, "utf8");
  assert.match(source, new RegExp(`readPendingAssessment\\("${assessmentType}"\\)`));
  assert.match(source, new RegExp(`savePendingAssessment\\("${assessmentType}"`));
  assert.match(source, /onSaved=/);
  assert.match(source, new RegExp(`clearPendingAssessment\\("${assessmentType}"`));
  assert.match(source, /assessment-results/);
}

const gateSource = fs.readFileSync("src/components/AssessmentResultGate.tsx", "utf8");
assert.match(gateSource, /addAssessmentResumeToUrl\(destination, assessmentType, state\)/);

console.log("assessment state smoke: PASS");
