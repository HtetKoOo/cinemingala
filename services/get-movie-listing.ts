import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import type { Movie } from "@/types/movie";

const listingEndpoints = {
  popular: TMDB_ENDPOINTS.popularMovies,
  "top-rated": TMDB_ENDPOINTS.topRatedMovies,
  "now-playing": TMDB_ENDPOINTS.nowPlayingMovies,
  upcoming: TMDB_ENDPOINTS.upcomingMovies,
} as const;

export type MovieListingCategory = keyof typeof listingEndpoints;

export interface MovieListing {
  results: Movie[];
  total_pages: number;
}

export async function getMovieListing(category: MovieListingCategory, page: number): Promise<MovieListing> {
  const res = await fetch(
    `${listingEndpoints[category]}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch ${category} movies: HTTP ${res.status}`);
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
    throw new Error(`Invalid ${category} movies response`);
  }

  return { results: data.results as Movie[], total_pages: data.total_pages };
}
