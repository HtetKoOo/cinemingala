import type { WatchProviderRegion } from "@/types/watch-provider";

export function selectWatchProviders(
  results: Record<string, WatchProviderRegion>,
  region: string,
): WatchProviderRegion | null {
  const regionCode = region.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(regionCode)) return null;

  return results[regionCode] ?? null;
}
