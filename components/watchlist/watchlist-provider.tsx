"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useSyncExternalStore,
} from "react";
import {
  parseWatchlist,
  toggleWatchlistItem,
  WATCHLIST_STORAGE_KEY,
} from "@/lib/watchlist";
import type { WatchlistItem } from "@/types/watchlist";

interface WatchlistContextValue {
  items: WatchlistItem[];
  hydrated: boolean;
  toggleItem: (item: WatchlistItem) => void;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);
const watchlistChangedEvent = "watchlist-changed";
const emptyWatchlist: WatchlistItem[] = [];
let cachedValue: string | null | undefined;
let cachedItems: WatchlistItem[] = emptyWatchlist;

function subscribeToWatchlist(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(watchlistChangedEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(watchlistChangedEvent, onStoreChange);
  };
}

function getWatchlistSnapshot(): WatchlistItem[] {
  const value = window.localStorage.getItem(WATCHLIST_STORAGE_KEY);

  if (value !== cachedValue) {
    cachedValue = value;
    cachedItems = parseWatchlist(value);
  }

  return cachedItems;
}

function getServerWatchlistSnapshot(): WatchlistItem[] {
  return emptyWatchlist;
}

function subscribeToHydration(): () => void {
  return () => undefined;
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToWatchlist,
    getWatchlistSnapshot,
    getServerWatchlistSnapshot,
  );
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  const toggleItem = (target: WatchlistItem) => {
    const nextItems = toggleWatchlistItem(getWatchlistSnapshot(), target);
    window.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(nextItems));
    window.dispatchEvent(new Event(watchlistChangedEvent));
  };

  return (
    <WatchlistContext.Provider value={{ items, hydrated, toggleItem }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist(): WatchlistContextValue {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error("useWatchlist must be used inside WatchlistProvider");
  }

  return context;
}
