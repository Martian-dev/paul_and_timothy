import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/sign-in/$")({
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
      <SignIn
        signUpUrl={authUrl("/signup", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
