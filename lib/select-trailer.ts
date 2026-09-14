import type { MovieVideo } from "@/types/video";

export function selectTrailer(videos: MovieVideo[]): MovieVideo | null {
  const trailers = videos.filter(
    (video) => video.site === "YouTube" && video.type === "Trailer" && video.key.trim() !== "",
  );

  return trailers.find((video) => video.official) ?? trailers[0] ?? null;
}
