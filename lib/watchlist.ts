import type { WatchlistIdentity, WatchlistItem } from "@/types/watchlist";

export const WATCHLIST_STORAGE_KEY = "cinemingala-watchlist";
export const LEGACY_WATCHLIST_STORAGE_KEY = "movie-house-watchlist";

function isWatchlistItem(value: unknown): value is WatchlistItem {
  if (typeof value !== "object" || value === null) return false;

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    (item.media_type === "movie" || item.media_type === "tv") &&
    typeof item.title === "string" &&
    (typeof item.poster_path === "string" || item.poster_path === null) &&
    typeof item.vote_average === "number"
  );
}

export function parseWatchlist(value: string | null): WatchlistItem[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter(isWatchlistItem) : [];
  } catch {
    return [];
  }
}

export function isInWatchlist(
  items: WatchlistItem[],
  target: WatchlistIdentity,
): boolean {
  return items.some(
    (item) => item.id === target.id && item.media_type === target.media_type,
  );
}

export function toggleWatchlistItem(
  items: WatchlistItem[],
  target: WatchlistItem,
): WatchlistItem[] {
  if (isInWatchlist(items, target)) {
    return items.filter(
      (item) =>
        !(item.id === target.id && item.media_type === target.media_type),
    );
  }

  return [...items, target];
}
