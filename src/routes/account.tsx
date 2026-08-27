import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@clerk/tanstack-react-start/server";

const requireAccountAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { isAuthenticated } = await auth();
  if (!isAuthenticated) {
    throw redirect({
      to: "/sign-in/$",
      params: { _splat: "" },
      search: { course: undefined, redirect: "/account" },
    });
  }
});

export const Route = createFileRoute("/account")({
  staleTime: 0,
  preloadStaleTime: 0,
  beforeLoad: async () => {
    await requireAccountAuth();
  },
  component: AccountLayout,
});

function AccountLayout() {
  return <Outlet />;
}
