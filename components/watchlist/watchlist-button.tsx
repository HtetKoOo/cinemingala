"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isInWatchlist } from "@/lib/watchlist";
import type { WatchlistItem } from "@/types/watchlist";
import { useWatchlist } from "./watchlist-provider";

export function WatchlistButton({ item }: { item: WatchlistItem }) {
  const { items, hydrated, toggleItem } = useWatchlist();
  const saved = hydrated && isInWatchlist(items, item);

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!hydrated}
      aria-pressed={saved}
      onClick={() => toggleItem(item)}
    >
      {saved ? <BookmarkCheck /> : <Bookmark />}
      {!hydrated ? "Loading..." : saved ? "In Watchlist" : "Add to Watchlist"}
    </Button>
  );
}
