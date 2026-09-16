"use server"

import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { PersonDetail } from "@/types/person";

export const getPeopleDetails = async (id: string) => {
  const response = await fetch(
    `${TMDB_ENDPOINTS.peopleDetails}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US&append_to_response=external_ids`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json() as PersonDetail;
  return data;
};
