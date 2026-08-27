import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { AuthRedirectCapture } from "@/components/AuthRedirectCapture";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/sign-in/$")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: Page,
});

function Page() {
  const { redirect } = Route.useSearch();
  const destination = authRedirectFromSearch(redirect);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthRedirectCapture destination={destination} />
      <SignIn
        signUpUrl={authUrl("/sign-up", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
