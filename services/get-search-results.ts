import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import type { Movie } from "@/types/movie";
import type { Person } from "@/types/person";
import type { TvShow } from "@/types/tv-show";

export type SearchCategory = "movie" | "tv" | "person";

type SearchItems = { movie: Movie; tv: TvShow; person: Person };

export interface SearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

const endpoints = {
  movie: TMDB_ENDPOINTS.movieSearch,
  tv: TMDB_ENDPOINTS.tvSearch,
  person: TMDB_ENDPOINTS.personSearch,
};

export async function getSearchResults<C extends SearchCategory>(
  category: C,
  query: string,
  page: number,
): Promise<SearchResponse<SearchItems[C]>> {
  const params = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY ?? "",
    query,
    language: "en-US",
    page: String(page),
  });
  const response = await fetch(`${endpoints[category]}?${params}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to search ${category}: HTTP ${response.status}`);
  }

  return (await response.json()) as SearchResponse<SearchItems[C]>;
}
