import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/signup")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
    redirect:
      typeof search.redirect === "string" &&
      search.redirect.startsWith("/") &&
      !search.redirect.startsWith("//")
        ? search.redirect
        : undefined,
  }),
  component: SignupPage,
});

function SignupPage() {
  const { redirect } = Route.useSearch();
  const destination = authRedirectFromSearch(redirect);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <SignUp
        signInUrl={authUrl("/login", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
