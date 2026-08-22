import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signup/$")({
  component: SignupCallbackPage,
});

function SignupCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <SignUp signInUrl="/login" forceRedirectUrl="/" />
    </div>
  );
}
