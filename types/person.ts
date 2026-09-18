interface KnownFor {
  id: number;
  title?: string;
  name?: string;
  media_type?: string;
}

export interface Person {
  id: number;
  name: string;
  original_name: string;
  known_for_department: string;
  profile_path: string | null;
  popularity: number;
  known_for?: KnownFor[] | null;
}

export interface PersonDetail {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  external_ids: PersonExternalIds;
}

export interface PersonExternalIds {
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

export interface PersonCast {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  character: string;
  media_type: "movie" | "tv";
  vote_average: number;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  credit_id: string;
}

export interface PersonCredits {
  cast: PersonCast[];
}
