import { ClerkProvider, useAuth } from "@clerk/tanstack-react-start";
import { shadcn } from "@clerk/ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { FirstLoadConfetti } from "@/components/FirstLoadConfetti";
import { AuthRuntimeBoundary } from "@/components/AuthRuntimeBoundary";
import { syncCurrentUser } from "@/lib/user-sync";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Paul & Timothy Training Centre — Discover Your Calling" },
      {
        name: "description",
        content:
          "You were made for a purpose. Discover God's calling, take the assessment, receive mentorship and get equipped for ministry.",
      },
      { property: "og:title", content: "Paul & Timothy Training Centre" },
      {
        property: "og:description",
        content:
          "Equipping ordinary people for an extraordinary mission. Assessments, mentorship and training rooted in Scripture.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,400;8..144,500;8..144,600;8..144,700&family=Noto+Sans:wght@300;400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider appearance={{ theme: shadcn }} prefetchUI={false}>
          {children}
          <Scripts />
        </ClerkProvider>
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useRouter().state.location;

  // Pages with a dark hero keep the transparent-over-hero nav; all others get the solid nav.
  const transparentNavPaths = [
    "/",
    "/articles",
    "/faqs",
    "/partner",
    "/ministry-calling",
    "/spiritual-gifts",
    "/apest-assessment",
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <AuthRuntimeBoundary boundary="user_record_sync" fallback={null}>
        <UserRecordSync />
      </AuthRuntimeBoundary>
      <SiteNav alwaysSolid={!transparentNavPaths.includes(location.pathname)} />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
      {/* Removable: homepage confetti. Delete component + this line to remove. */}
      <FirstLoadConfetti />
    </QueryClientProvider>
  );
}

function UserRecordSync() {
  const { isLoaded, isSignedIn, userId } = useAuth();
  const syncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !userId || syncedUserId.current === userId) return;

    syncedUserId.current = userId;
    void syncCurrentUser().catch(() => {
      syncedUserId.current = null;
    });
  }, [isLoaded, isSignedIn, userId]);

  return null;
}
