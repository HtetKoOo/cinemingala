"use server"

import { Movie } from "@/types/movie";

export const getMovieDetails = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_DETAILS_API_URL}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json() as Movie;
  console.log("movie detail", data)
  console.log("homepage",data.homepage)
  return data;
};
