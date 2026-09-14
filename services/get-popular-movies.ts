import type { Movie } from "@/types/movie";

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_POPULAR_API_URL}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies: HTTP ${res.status}`);
  }

  const data: unknown = await res.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("results" in data) ||
    !Array.isArray(data.results)
  ) {
    throw new Error("Invalid popular movies response: expected a results array");
  }

  return data.results as Movie[];
}
