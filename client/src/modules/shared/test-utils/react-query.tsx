import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export function ReactQueryTestWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  );
}

