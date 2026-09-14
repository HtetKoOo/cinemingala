"use server";

export interface MovieReviewResponse {
  id: number;
  page: number;
  results: MovieReview[];
  total_pages: number;
  total_results: number;
}

export interface MovieReview {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export const getMovieReviews = async (
  id: string
): Promise<MovieReviewResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MOVIE_DETAILS_API_URL}/${id}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 3600 } } // optional: cache for 1h in Next.js
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie reviews");
  }

  const data = await response.json();
  return data as MovieReviewResponse;
};
