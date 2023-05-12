import { QueryClient } from "@tanstack/react-query";

export const GLOBAL_STALE_TIME = 1000 * 60 * 60;

export const GLOBAL_CACHE_TIME = 1000 * 60 * 60 * 1.5;

export const AVERAGE_DASHBOARD_STALE_TIME = 1000 * 60 * 60;

export const AVERAGE_CLUSTER_STALE_TIME = 1000 * 60 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: GLOBAL_STALE_TIME,
      cacheTime: GLOBAL_CACHE_TIME,
      useErrorBoundary: true,
    },
  },
});
