import MovieCard from "./movie-card";
import Link from "next/link";
import type { Movie } from "@/types/movie";

export default function UpcomingMovie({ upcomingMovies }: { upcomingMovies: Movie[] }) {
    return (
        <section className="w-full mt-8">
            <h3 className="text-2xl font-semibold mb-4 mx-2 md:mx-6">Upcoming Movies</h3>
            <div
                className="flex mx-2 md:mx-6 space-x-3 overflow-x-auto rounded-2xl scrollbar-rounded"
            >
                {upcomingMovies.map((movie) => (
                    <Link key={movie.id} href={`/movie/${movie.id}`}>
                        <MovieCard key={movie.id} movie={movie} />
                    </Link>
                ))}
            </div>
        </section>
    )
}
