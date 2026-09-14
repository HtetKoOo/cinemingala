"use server";

import { selectTrailer } from "@/lib/select-trailer";
import type { MovieVideo, MovieVideosResponse } from "@/types/video";

export async function getTvShowTrailer(id: string): Promise<MovieVideo | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_TV_DETAILS_API_URL}/${encodeURIComponent(id)}/videos?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch TV videos: HTTP ${response.status}`);
  }

  const data: MovieVideosResponse = await response.json();
  return selectTrailer(data.results);
}
