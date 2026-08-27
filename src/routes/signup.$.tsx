import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { AuthRedirectCapture } from "@/components/AuthRedirectCapture";
import { authRedirectFromSearch, authUrl } from "@/lib/auth-redirect";

export const Route = createFileRoute("/signup/$")({
  validateSearch: (search: Record<string, unknown>) => ({
    course: typeof search.course === "string" ? search.course : undefined,
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  component: SignupCallbackPage,
});

function SignupCallbackPage() {
  const { redirect } = Route.useSearch();
  const destination = authRedirectFromSearch(redirect);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <AuthRedirectCapture destination={destination} />
      <SignUp
        signInUrl={authUrl("/sign-in", destination)}
        forceRedirectUrl={destination}
        fallbackRedirectUrl={destination}
      />
    </div>
  );
}
