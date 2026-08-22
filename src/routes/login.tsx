import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect } = Route.useSearch();
  const destination = authRedirectFromSearch(redirect);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <SignIn
        signUpUrl={authUrl("/signup", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
