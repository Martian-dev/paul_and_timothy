import { createFileRoute } from "@tanstack/react-router";
import { LearnerAccessPage } from "./login";

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
  }),
  component: SignupPage,
});

function SignupPage() {
  const { course } = Route.useSearch();

  return <LearnerAccessPage mode="signup" course={course} />;
}
