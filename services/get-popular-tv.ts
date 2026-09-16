import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { TvShow } from "@/types/tv-show";

export async function getPopularTvShows(page = 1): Promise<TvShow[]> {
  const res = await fetch(
    `${TMDB_ENDPOINTS.popularTv}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch top rated TV shows: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results as TvShow[];
}
