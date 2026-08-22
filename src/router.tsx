import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Avoid refetching loaders repeatedly while a user is deciding whether to
    // follow an intent-preloaded link. Individual loaders can opt into a
    // shorter freshness window when their data is more volatile.
    defaultPreloadStaleTime: 30_000,
  });

  return router;
};
