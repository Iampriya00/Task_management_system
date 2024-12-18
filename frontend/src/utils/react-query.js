import { QueryClient } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Disable retries for failed queries
      cacheTime: Infinity, // Keep the data in the cache forever
      refetchOnMount: false, // Don't refetch on mount
      refetchOnReconnect: false, // Don't refetch when reconnecting
      refetchOnWindowFocus: false, // Don't refetch when window gains focus
    },
  },
});

export default queryClient;
