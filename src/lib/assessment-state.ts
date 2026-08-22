import type { AssessmentType } from "@/lib/assessment-results";

const STORAGE_PREFIX = "pttc:pending-assessment:";
const COOKIE_PREFIX = "pttc_pending_assessment_";
const RESUME_PARAM = "assessment_resume";
const STATE_VERSION = 1 as const;

export type PendingAssessmentState = {
  version: typeof STATE_VERSION;
  answers: Record<string, unknown>;
  submitted: true;
  q21?: string;
};

function storages(): Storage[] {
  if (typeof window === "undefined") return [];

  const available: Storage[] = [];
  for (const name of ["sessionStorage", "localStorage"] as const) {
    try {
      const candidate = window[name];
      if (candidate) available.push(candidate);
    } catch {
      // A browser may deny one storage area while allowing the other.
    }
  }
  return available;
}

function storageKey(assessmentType: AssessmentType): string {
  return `${STORAGE_PREFIX}${assessmentType}`;
}

function cookieKey(assessmentType: AssessmentType): string {
  return `${COOKIE_PREFIX}${assessmentType}`;
}

function parsePendingState(value: unknown): PendingAssessmentState | null {
  if (isPendingAssessmentState(value)) return value;
  return null;
}

/** Add the completed assessment to the auth return URL as a final fallback. */
export function addAssessmentResumeToUrl(
  destination: string,
  assessmentType: AssessmentType,
  state: PendingAssessmentState,
): string {
  const hashIndex = destination.indexOf("#");
  const beforeHash = hashIndex >= 0 ? destination.slice(0, hashIndex) : destination;
  const hash = hashIndex >= 0 ? destination.slice(hashIndex) : "";
  const queryIndex = beforeHash.indexOf("?");
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;
  const params = new URLSearchParams(queryIndex >= 0 ? beforeHash.slice(queryIndex + 1) : "");
  params.set(RESUME_PARAM, JSON.stringify({ assessmentType, state }));
  return `${pathname}?${params.toString()}${hash}`;
}

/** Read and remove the URL resume payload after returning from authentication. */
export function readAssessmentResumeFromUrl(
  assessmentType: AssessmentType,
): PendingAssessmentState | null {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get(RESUME_PARAM);
  if (!raw) return null;

  let pending: PendingAssessmentState | null = null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const candidate = parsed as { assessmentType?: unknown; state?: unknown };
      if (candidate.assessmentType === assessmentType) {
        pending = parsePendingState(candidate.state);
      }
    }
  } catch {
    pending = null;
  }

  params.delete(RESUME_PARAM);
  const query = params.toString();
  window.history.replaceState(
    window.history.state,
    "",
    `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
  );
  return pending;
}

/** Keep a completed, not-yet-revealed assessment across an auth redirect. */
export function savePendingAssessment(
  assessmentType: AssessmentType,
  state: PendingAssessmentState,
): void {
  const key = storageKey(assessmentType);
  const serialized = JSON.stringify(state);
  for (const target of storages()) {
    try {
      target.setItem(key, serialized);
    } catch {
      // Try the other storage area if this one is unavailable.
    }
  }

  if (typeof document !== "undefined") {
    try {
      document.cookie = `${cookieKey(assessmentType)}=${encodeURIComponent(serialized)}; Max-Age=1800; Path=/; SameSite=Lax`;
    } catch {
      // Storage remains the primary path when cookies are unavailable.
    }
  }
}

export function readPendingAssessment(
  assessmentType: AssessmentType,
): PendingAssessmentState | null {
  const key = storageKey(assessmentType);
  for (const source of storages()) {
    let raw: string | null;
    try {
      raw = source.getItem(key);
    } catch {
      continue;
    }
    if (!raw) continue;

    try {
      const parsed: unknown = JSON.parse(raw);
      if (isPendingAssessmentState(parsed)) return parsed;
    } catch {
      // Ignore malformed data and check the fallback storage area.
    }
  }

  if (typeof document !== "undefined") {
    try {
      const encoded = document.cookie
        .split("; ")
        .find((entry) => entry.startsWith(`${cookieKey(assessmentType)}=`))
        ?.slice(cookieKey(assessmentType).length + 1);
      if (encoded) {
        const parsed: unknown = JSON.parse(decodeURIComponent(encoded));
        if (isPendingAssessmentState(parsed)) return parsed;
      }
    } catch {
      // Ignore malformed or inaccessible cookie data.
    }
  }
  return null;
}

export function clearPendingAssessment(assessmentType: AssessmentType): void {
  const key = storageKey(assessmentType);
  for (const target of storages()) {
    try {
      target.removeItem(key);
    } catch {
      // Ignore unavailable storage; the other area can still be cleaned up.
    }
  }
  if (typeof document !== "undefined") {
    try {
      document.cookie = `${cookieKey(assessmentType)}=; Max-Age=0; Path=/; SameSite=Lax`;
    } catch {
      // Ignore unavailable cookies.
    }
  }
}

function isPendingAssessmentState(value: unknown): value is PendingAssessmentState {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<PendingAssessmentState>;
  return (
    candidate.version === STATE_VERSION &&
    candidate.submitted === true &&
    !!candidate.answers &&
    typeof candidate.answers === "object" &&
    !Array.isArray(candidate.answers) &&
    (candidate.q21 === undefined || typeof candidate.q21 === "string")
  );
}
