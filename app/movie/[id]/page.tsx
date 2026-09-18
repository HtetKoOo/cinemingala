import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMovieReviews } from "@/services/get-movie-reviews";
import { getMovieDetails } from "@/services/get-movie-details";
import { getSimilarMovies } from "@/services/get-similar-movies";
import { getMovieTrailer } from "@/services/get-movie-trailer";
import { TrailerDialog } from "@/components/movie/trailer-dialog";
import { WatchlistButton } from "@/components/watchlist/watchlist-button";
import { WatchProviderSection } from "@/components/watch-provider/watch-provider-section";
import { getMovieWatchProviders } from "@/services/get-movie-watch-providers";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MovieDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ region?: string | string[] }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const requestedRegion =
    typeof query.region === "string" ? query.region.trim().toUpperCase() : "";
  const region = /^[A-Z]{2}$/.test(requestedRegion) ? requestedRegion : "US";

  const [movie, movieReview, similarMovies, trailer, watchProviders] =
    await Promise.all([
      getMovieDetails(id),
      getMovieReviews(id),
      getSimilarMovies(id),
      getMovieTrailer(id).catch(() => null),
      getMovieWatchProviders(id, region).catch(() => null),
    ]);

  return (
    <main className="min-h-screen">
      {/* TITLE SECTION WITH BACKGROUND */}
      <section
        className="relative mb-8 w-full overflow-hidden rounded-b-2xl bg-cover bg-center pt-18 text-white sm:pt-20"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col justify-between p-2">
          <div className="flex flex-col justify-between p-2 sm:flex-row">
            {/* LEFT */}
            <div className="relative z-10 mb-4 aspect-2/3 w-full sm:w-35 lg:w-55">
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "/images/image-placeholder.png"
                }
                alt={movie.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* CENTER */}
            <div className="flex flex-1 flex-col justify-between sm:mx-6">
              <div>
                <h1 className="mb-4 text-4xl font-bold">{movie.title}</h1>
                <div className="mb-4 flex items-center gap-2">
                  {movie.genres?.map((genre) => (
                    <Badge key={genre.id} className="bg-white/20 text-white">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <p className="mb-2 flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400" />
                    <strong>{movie.vote_average}/</strong>10
                  </p>
                  <span>|</span>
                  <p>{movie.origin_country}</p>
                  <span>|</span>
                  <p>{movie.original_language}</p>
                  <span>|</span>
                  <p>{movie.runtime} min</p>
                </div>
                <p className="mb-2">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <div className="mb-4 flex gap-3 lg:hidden">
                  {movie.homepage && (
                    <Link href={movie.homepage}>
                      <Button className="cursor-pointer bg-green-400 text-black hover:bg-green-300">
                        Watch Now
                      </Button>
                    </Link>
                  )}
                  <TrailerDialog trailer={trailer} />
                  <WatchlistButton
                    item={{
                      id: movie.id,
                      media_type: "movie",
                      title: movie.title,
                      poster_path: movie.poster_path,
                      vote_average: movie.vote_average,
                    }}
                  />
                </div>
                <p className="mb-4 sm:hidden lg:block">
                  <strong>Overview -</strong> {movie.overview}
                </p>
              </div>

              {/* BUTTONS BASELINE */}
              <div>
                <div className="mb-4 hidden space-x-3 lg:block">
                  {movie.homepage && (
                    <Link href={movie.homepage}>
                      <Button className="cursor-pointer bg-green-400 text-black hover:bg-green-300">
                        Watch Now
                      </Button>
                    </Link>
                  )}
                  <TrailerDialog trailer={trailer} />
                  <WatchlistButton
                    item={{
                      id: movie.id,
                      media_type: "movie",
                      title: movie.title,
                      poster_path: movie.poster_path,
                      vote_average: movie.vote_average,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex w-full flex-col sm:w-1/4 md:w-1/6">
              <h2 className="mb-4 text-2xl font-bold">Production Companies</h2>
              <div className="flex flex-wrap gap-2">
                {movie.production_companies?.map((company) => (
                  <Badge
                    key={company.id}
                    className="max-w-full bg-white/20 text-sm wrap-break-word whitespace-normal text-white"
                  >
                    {company.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* OVERVIEW BELOW (for smaller screens) */}
          <p className="mb-4 hidden text-white sm:block lg:hidden">
            <strong>Overview -</strong> {movie.overview}
          </p>
        </div>
      </section>

      <WatchProviderSection availability={watchProviders} region={region} />

      <div className="flex flex-col md:flex-row">
        {/* --- REVIEWS SECTION --- */}
        <section className="mb-16 flex w-full flex-col px-2 sm:px-4 md:w-2/3">
          <h2 className="mb-6 text-3xl font-bold">User Reviews</h2>

          {movieReview.results.length > 0 ? (
            <div className="space-y-2">
              {movieReview.results.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-border p-4 shadow-md"
                >
                  <div className="mb-1 flex items-center gap-3">
                    {review.author_details.avatar_path ? (
                      <Image
                        src={
                          review.author_details.avatar_path.startsWith("/https")
                            ? review.author_details.avatar_path.slice(1)
                            : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                        }
                        alt={review.author}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-sm text-white">
                        {review.author[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      {review.author_details.rating && (
                        <p className="flex items-center gap-1 text-sm text-yellow-400">
                          <Star className="h-3 w-3 fill-yellow-400" />
                          {review.author_details.rating}/10
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="whitespace-pre-line">
                    {review.content.slice(0, 400)}
                    {review.content.length > 400 && "..."}
                  </p>

                  <Link
                    href={review.url}
                    target="_blank"
                    className="mt-2 inline-block text-sm text-blue-400 hover:underline"
                  >
                    Read full review →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews available.</p>
          )}
        </section>

        {/* --- SIMILAR SECTION --- */}
        <section className="w-full px-2 sm:px-4 md:w-1/3">
          <h2 className="mb-6 text-3xl font-bold">Similar</h2>

          {similarMovies.results.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {similarMovies.results.map((sim) => (
                <Link
                  key={sim.id}
                  href={`/movie/${sim.id}`}
                  className="overflow-hidden rounded-2xl border border-border shadow-md transition-transform duration-200 hover:scale-102"
                >
                  <div className="relative aspect-3/4 w-full overflow-hidden">
                    <Image
                      src={
                        sim.poster_path
                          ? `https://image.tmdb.org/t/p/w500${sim.poster_path}`
                          : "/images/image-placeholder.png"
                      }
                      alt={sim.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                      className="rounded-t-2xl object-cover"
                    />
                  </div>
                  <div className="p-2 text-center">
                    <p className="line-clamp-2 text-sm font-medium">
                      {sim.title}
                    </p>
                    <p className="text-xs">⭐ {sim.vote_average.toFixed(1)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No similar movies found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
