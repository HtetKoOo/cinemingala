import { Movie } from "@/types/movie";

export async function getNowPlayingMovies(page = 1): Promise<Movie[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NOW_PLAYING_API_URL}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch now playing movies: ${res.statusText}`);
  }

  const data = await res.json();
  return data.results as Movie[];
}
