"use server";

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
export interface SimilarMoviesResponse {
  page: number;
  results: SimilarMovie[];
  total_pages: number;
  total_results: number;
}

export interface SimilarMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getSimilarMovies = async (
  id: string
): Promise<SimilarMoviesResponse> => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.movieDetails}/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } } // optional caching (1 hour)
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const data = await response.json();
  return data as SimilarMoviesResponse;
};
