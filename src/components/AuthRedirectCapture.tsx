import { useEffect } from "react";
import { rememberAuthRedirect } from "@/lib/auth-redirect";

/** Persist a validated return path before the prebuilt Clerk UI starts. */
export function AuthRedirectCapture({ destination }: { destination: string }) {
  useEffect(() => {
    rememberAuthRedirect(destination);
  }, [destination]);

  return null;
}
