import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMovieReviews } from "@/services/get-movie-reviews";
import { getMovieDetails } from "@/services/get-movie-details";
import { getSimilarMovies } from "@/services/get-similar-movies";
import { getMovieTrailer } from "@/services/get-movie-trailer";
import { TrailerDialog } from "@/components/movie/trailer-dialog";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function MovieDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [movie, movieReview, similarMovies, trailer] = await Promise.all([
        getMovieDetails(id),
        getMovieReviews(id),
        getSimilarMovies(id),
        getMovieTrailer(id).catch(() => null),
    ]);

    console.log("review", movieReview);

    return (
        <main className="min-h-screen">

            {/* TITLE SECTION WITH BACKGROUND */}
            <section
                className="relative text-white w-full bg-cover bg-center pt-18 sm:pt-20 rounded-b-2xl overflow-hidden mb-8"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col justify-between p-2">
                    <div className=" flex flex-col sm:flex-row justify-between p-2">
                        {/* LEFT */}
                        <div className="relative z-10 w-full sm:w-35 lg:w-55 aspect-2/3 mb-4">
                            <Image
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                                        : "/images/image-placeholder.png"
                                }
                                alt={movie.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 700px"
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>

                        {/* CENTER */}
                        <div className="flex flex-col flex-1 sm:mx-6 justify-between">
                            <div>
                                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                                <div className="flex items-center mb-4 gap-2">
                                    {movie.genres?.map((genre) => (
                                        <Badge key={genre.id} className="bg-white/20 text-white">
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <p className="flex items-center mb-2">
                                        <Star className="w-4 h-4 fill-yellow-400 " />
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
                                <div className="flex gap-3 lg:hidden mb-4">
                                    {movie.homepage && (
                                        <Link href={movie.homepage}>
                                            <Button className="cursor-pointer bg-green-400">
                                                Watch Now
                                            </Button>
                                        </Link>
                                    )}
                                    <TrailerDialog trailer={trailer} />
                                    <Link href="" >
                                        <Button className="cursor-pointer bg-cyan-400">Add to List</Button>
                                    </Link>
                                </div>
                                <p className="mb-4 sm:hidden lg:block">
                                    <strong>Overview -</strong> {movie.overview}
                                </p>
                            </div>

                            {/* BUTTONS BASELINE */}
                            <div>
                                <div className="space-x-3 hidden lg:block mb-4">
                                    {movie.homepage && (
                                        <Link href={movie.homepage}>
                                            <Button className="cursor-pointer bg-green-400">
                                                Watch Now
                                            </Button>
                                        </Link>
                                    )}
                                    <TrailerDialog trailer={trailer} />
                                    <Link href="" >
                                        <Button className="cursor-pointer bg-cyan-400">Add to List</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="flex flex-col w-full sm:w-1/4 md:w-1/6">
                            <h2 className="text-2xl font-bold mb-4">Production Companies</h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.production_companies?.map((company) => (
                                    <Badge
                                        key={company.id}
                                        className="bg-white/20 text-white text-sm wrap-break-word whitespace-normal max-w-full"
                                    >
                                        {company.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* OVERVIEW BELOW (for smaller screens) */}
                    <p className="mb-4 hidden sm:block lg:hidden text-white">
                        <strong>Overview -</strong> {movie.overview}
                    </p>
                </div>
            </section>

            <div className="flex flex-col md:flex-row">

                {/* --- REVIEWS SECTION --- */}
                <section className="flex flex-col w-full md:w-2/3 px-2 sm:px-4 mb-16">
                    <h2 className="text-3xl font-bold mb-6">User Reviews</h2>

                    {movieReview.results.length > 0 ? (
                        <div className="space-y-2">
                            {movieReview.results.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-2xl p-4 border border-gray-200 shadow-md "
                                >
                                    <div className="flex items-center gap-3 mb-1">
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
                                            <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white text-sm">
                                                {review.author[0].toUpperCase()}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-semibold">{review.author}</p>
                                            {review.author_details.rating && (
                                                <p className="text-yellow-400 text-sm flex items-center gap-1">
                                                    <Star className="w-3 h-3 fill-yellow-400" />
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
                                        className="text-blue-400 text-sm hover:underline mt-2 inline-block"
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
                <section className="w-full md:w-1/3 px-2 sm:px-4">
                    <h2 className="text-3xl font-bold mb-6">Similar</h2>

                    {similarMovies.results.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {similarMovies.results.map((sim) => (
                                <Link
                                    key={sim.id}
                                    href={`/movie/${sim.id}`}
                                    className="rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:scale-102 transition-transform duration-200"
                                >
                                    <div className="relative w-full aspect-3/4 overflow-hidden">
                                        <Image
                                            src={
                                                sim.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${sim.poster_path}`
                                                    : "/images/image-placeholder.png"
                                            }
                                            alt={sim.title}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
                                            className="object-cover rounded-t-2xl"
                                        />
                                    </div>
                                    <div className="p-2 text-center">
                                        <p className="text-sm font-medium line-clamp-2">{sim.title}</p>
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
