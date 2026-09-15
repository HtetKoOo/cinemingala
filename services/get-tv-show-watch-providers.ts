"use server";

import { selectWatchProviders } from "@/lib/select-watch-providers";
import type {
  WatchProviderRegion,
  WatchProvidersResponse,
} from "@/types/watch-provider";

export async function getTvShowWatchProviders(
  id: string,
  region: string,
): Promise<WatchProviderRegion | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TV_DETAILS_API_URL}/${encodeURIComponent(id)}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch TV watch providers: HTTP ${response.status}`,
    );
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("results" in data) ||
    typeof data.results !== "object" ||
    data.results === null
  ) {
    throw new Error("Invalid TV watch providers response");
  }

  return selectWatchProviders((data as WatchProvidersResponse).results, region);
}
