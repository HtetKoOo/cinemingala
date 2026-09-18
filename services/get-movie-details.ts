"use server"

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { Movie } from "@/types/movie";

export const getMovieDetails = async (id: string) => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.movieDetails}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json() as Movie;
  return data;
};
