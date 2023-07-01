import { QueryClient } from "@tanstack/react-query";

export const GLOBAL_STALE_TIME = 300; // 5 minutes

export const GLOBAL_CACHE_TIME = 480; // 8 minutes

export const AVERAGE_DASHBOARD_STALE_TIME = 1000 * 60 * 60;

export const AVERAGE_CLUSTER_STALE_TIME = 1000 * 60 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: GLOBAL_CACHE_TIME,
      staleTime: GLOBAL_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});
