"use server";

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
export interface SimilarTvShowResponse {
  page: number;
  results: SimilarTvShow[];
  total_pages: number;
  total_results: number;
}

export interface SimilarTvShow {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  name: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getSimilarTvShows = async (id: string): Promise<SimilarTvShowResponse> => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.tvDetails}/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }, // optional caching (1 hour)
  );

  if (!response.ok) {
    throw new Error("Failed to fetch similar movies");
  }

  const data = await response.json();
  return data as SimilarTvShowResponse;
};
