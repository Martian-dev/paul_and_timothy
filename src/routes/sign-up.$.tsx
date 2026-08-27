import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { AuthRedirectCapture } from "@/components/AuthRedirectCapture";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/sign-up/$")({
  validateSearch: (search: Record<string, unknown>) => ({
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
      <SignUp
        signInUrl={authUrl("/sign-in", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
