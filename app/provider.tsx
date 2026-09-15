"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WatchlistProvider } from "@/components/watchlist/watchlist-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <WatchlistProvider>{children}</WatchlistProvider>
        </QueryClientProvider>
    );
}
