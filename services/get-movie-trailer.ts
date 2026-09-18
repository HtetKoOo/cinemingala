"use server";

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { selectTrailer } from "@/lib/select-trailer";
import type { MovieVideo, MovieVideosResponse } from "@/types/video";

export async function getMovieTrailer(id: string): Promise<MovieVideo | null> {
  const response = await fetch(
    `${TMDB_ENDPOINTS.movieDetails}/${encodeURIComponent(id)}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch movie videos: HTTP ${response.status}`);
  }

  const data: MovieVideosResponse = await response.json();
  return selectTrailer(data.results);
}
