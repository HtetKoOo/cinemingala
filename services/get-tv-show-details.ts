"use server"

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { TvShow } from "@/types/tv-show";

export const getTvShowDetails = async (id: string) => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.tvDetails}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data as TvShow;
};
