import { Bookmark, Clapperboard, MapPin, Search } from "lucide-react";
import Link from "next/link";

const features = [
    {
        title: "Discover",
        description: "Explore popular, top-rated, and upcoming movies and TV series.",
        icon: Clapperboard,
    },
    {
        title: "Search",
        description: "Find movies and TV series by title, with paginated results.",
        icon: Search,
    },
    {
        title: "Trailers",
        description: "Watch an available official trailer without leaving the details page.",
        icon: Clapperboard,
    },
    {
        title: "Watchlist",
        description: "Save titles in your browser and return to them whenever you want.",
        icon: Bookmark,
    },
    {
        title: "Where to Watch",
        description: "Check streaming, rental, and purchase availability by region.",
        icon: MapPin,
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen px-4 pb-12 pt-24">
            <section className="mx-auto max-w-5xl">
                <div className="rounded-3xl border border-white/10 bg-gray-500/10 p-6 sm:p-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        About the project
                    </p>
                    <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
                        Find your next movie night.
                    </h1>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-gray-400 sm:text-lg">
                        CineMingala is a movie and TV discovery app. Search for a title, watch its
                        trailer, save it to your watchlist, and see where it is available in your
                        region.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-black transition hover:bg-emerald-400"
                        >
                            Explore movies
                        </Link>
                        <Link
                            href="/watchlist"
                            className="rounded-full border border-gray-500 px-5 py-2.5 font-semibold transition hover:bg-gray-500/20"
                        >
                            Open watchlist
                        </Link>
                    </div>
                </div>

                <section className="mt-10" aria-labelledby="features-heading">
                    <h2 id="features-heading" className="text-2xl font-bold">
                        What you can do
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ title, description, icon: Icon }) => (
                            <article
                                key={title}
                                className="rounded-2xl border border-white/10 bg-gray-500/10 p-5"
                            >
                                <Icon className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                                <p className="mt-2 leading-6 text-gray-400">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-10 rounded-2xl border border-white/10 bg-gray-500/10 p-6">
                    <h2 className="text-2xl font-bold">Built with</h2>
                    <p className="mt-3 leading-7 text-gray-400">
                        Next.js, React, TypeScript, and Tailwind CSS power the interface. Movie,
                        TV, trailer, and watch-provider metadata comes from TMDB. Watch-provider
                        availability is supplied by JustWatch through TMDB.
                    </p>
                    <p className="mt-4 text-sm leading-6 text-gray-500">
                        This product uses the TMDB API but is not endorsed or certified by TMDB.
                        CineMingala does not host or stream movies.
                    </p>
                </section>
            </section>
        </main>
    );
}
