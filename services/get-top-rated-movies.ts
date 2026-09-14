import { Movie } from "@/types/movie";

export async function getTopRatedMovies(page = 1): Promise<Movie[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_TOP_RATED_API_URL}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch top rated movies: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results as Movie[];
}
