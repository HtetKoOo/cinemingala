export interface WatchlistItem {
  id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string | null;
  vote_average: number;
}

export type WatchlistIdentity = Pick<WatchlistItem, "id" | "media_type">;