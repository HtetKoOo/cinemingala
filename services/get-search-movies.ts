import { SearchResponse } from "@/types/search";

export async function getSearchMovies(query: string, page = 1): Promise<SearchResponse> {

  const url = `${process.env.NEXT_PUBLIC_MOVIE_SEARCH_API_URL}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=${page}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Search API error:", res.status, res.statusText);
    throw new Error("Failed to fetch search results");
  }

  const data: SearchResponse = await res.json();
  return data;
}
