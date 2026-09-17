import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import type { TvShow } from "@/types/tv-show";

const listingEndpoints = {
  "top-rated": TMDB_ENDPOINTS.topRatedTv,
  popular: TMDB_ENDPOINTS.popularTv,
  "air-today": TMDB_ENDPOINTS.airingTodayTv,
  "on-air": TMDB_ENDPOINTS.onAirTv,
} as const;

export type TvListingCategory = keyof typeof listingEndpoints;

export interface TvListing {
  results: TvShow[];
  total_pages: number;
}

export async function getTvListing(category: TvListingCategory, page: number): Promise<TvListing> {
  const res = await fetch(
    `${listingEndpoints[category]}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${category} TV shows: HTTP ${res.status}`);
  }

  const data: unknown = await res.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("results" in data) ||
    !Array.isArray(data.results) ||
    !("total_pages" in data) ||
    typeof data.total_pages !== "number" ||
    !Number.isFinite(data.total_pages)
  ) {
    throw new Error(`Invalid ${category} TV response`);
  }

  return { results: data.results as TvShow[], total_pages: data.total_pages };
}
