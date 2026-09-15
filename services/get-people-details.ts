"use server"

import { PersonDetail } from "@/types/person";

export const getPeopleDetails = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PEOPLE_DETAILS_API_URL}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json() as PersonDetail;
  return data;
};
