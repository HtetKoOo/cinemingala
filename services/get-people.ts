import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import { PeopleResponse } from "@/types/person-response";

export async function getPeople(page = 1): Promise<PeopleResponse> {
  const res = await fetch(
    `${TMDB_ENDPOINTS.popularPeople}?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch popular people: ${res.statusText}`);
  }

  const data = (await res.json()) as PeopleResponse;
  return data;
}
