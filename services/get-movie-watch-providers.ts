"use server";

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { selectWatchProviders } from "@/lib/select-watch-providers";
import type {
  WatchProviderRegion,
  WatchProvidersResponse,
} from "@/types/watch-provider";

export async function getMovieWatchProviders(
  id: string,
  region: string,
): Promise<WatchProviderRegion | null> {
  const response = await fetch(
    `${TMDB_ENDPOINTS.movieDetails}/${encodeURIComponent(id)}/watch/providers?api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movie watch providers: HTTP ${response.status}`,
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
    throw new Error("Invalid movie watch providers response");
  }

  return selectWatchProviders((data as WatchProvidersResponse).results, region);
}
