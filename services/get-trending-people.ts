import { TMDB_ENDPOINTS } from "@/lib/tmdb-endpoints";
import type { Person } from "@/types/person";

export async function getTrendingPeople(window: "day" | "week"): Promise<Person[]> {
  const endpoint = window === "day"
    ? TMDB_ENDPOINTS.trendingPeopleToday
    : TMDB_ENDPOINTS.trendingPeopleWeek;
  const res = await fetch(
    `${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch trending people: HTTP ${res.status}`);
  }

  const data: unknown = await res.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("results" in data) ||
    !Array.isArray(data.results)
  ) {
    throw new Error("Invalid trending people response");
  }

  return data.results as Person[];
}
