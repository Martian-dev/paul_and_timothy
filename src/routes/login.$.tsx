import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login/$")({
  component: LoginCallbackPage,
});

function LoginCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6 py-24">
      <SignIn signUpUrl="/signup" forceRedirectUrl="/" />
    </div>
  );
}
