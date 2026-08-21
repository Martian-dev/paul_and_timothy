import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // No scrollRestoration: forward navigations always start at the top of the page.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
