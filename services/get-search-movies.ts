import { SearchResponse } from "@/types/search";

export async function getSearchMovies(query: string): Promise<SearchResponse> {

  const url = `${process.env.NEXT_PUBLIC_MOVIE_SEARCH_API_URL}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Search API error:", res.status, res.statusText);
    throw new Error("Failed to fetch search results");
  }

  const data: SearchResponse = await res.json();
  console.log("Search API response:", data);
  return data;
}
