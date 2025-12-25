"use client"; // 1. Mark this as a Client Component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    // 2. Create a client inside useState so it persists across re-renders
    //    but is unique per request during SSR
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    }));

    return (
        <QueryClientProvider client= { queryClient } >
        { children }
        </QueryClientProvider>
  );
}