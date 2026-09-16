import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { Movie } from "@/types/movie";

export async function getUpcomingMovies(page = 1): Promise<Movie[]> {
  const res = await fetch(
    `${TMDB_ENDPOINTS.upcomingMovies}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch upcoming movies: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results as Movie[];
}
