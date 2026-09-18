"use server"

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { PersonCredits } from "@/types/person";

export const getPeopleCredits = async (id: string) => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.peopleDetails}/${id}/combined_credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json() as PersonCredits;
  return data;
};
