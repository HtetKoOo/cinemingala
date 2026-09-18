import { Clapperboard, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const exploreLinks = [
    { label: "Movies", href: "/movies" },
    { label: "TV Series", href: "/tv" },
    { label: "People", href: "/people" },
    { label: "Watchlist", href: "/watchlist" },
];

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-border bg-muted/30">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
                <section className="sm:col-span-2 lg:col-span-1" aria-labelledby="footer-brand">
                    <Link
                        href="/"
                        id="footer-brand"
                        className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
                    >
                        <Clapperboard className="h-6 w-6 text-emerald-400" aria-hidden="true" />
                        CineMingala
                    </Link>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                        Discover movies and TV shows, watch trailers, build your watchlist, and
                        find where to watch.
                    </p>
                </section>

                <nav aria-labelledby="footer-explore">
                    <h2 id="footer-explore" className="font-semibold">Explore</h2>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        {exploreLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="transition hover:text-emerald-400">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <nav aria-labelledby="footer-project">
                    <h2 id="footer-project" className="font-semibold">Project</h2>
                    <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                        <li>
                            <Link href="/about" className="transition hover:text-emerald-400">
                                About CineMingala
                            </Link>
                        </li>
                        <li>
                            <a
                                href="https://www.themoviedb.org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 transition hover:text-emerald-400"
                            >
                                TMDB <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/HtetKoOo/movie-house"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 transition hover:text-emerald-400"
                            >
                                Source code <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                        </li>
                    </ul>
                </nav>

                <section aria-labelledby="footer-developer">
                    <h2 id="footer-developer" className="font-semibold">Developer</h2>
                    <p className="mt-4 text-sm font-medium">Htet Ko Oo</p>
                    <div className="mt-3 flex items-center gap-4 text-muted-foreground">
                        <a
                            href="https://github.com/HtetKoOo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Htet Ko Oo on GitHub"
                            className="transition hover:text-emerald-400"
                        >
                            <FaGithub className="h-5 w-5" />
                        </a>
                        <a
                            href="mailto:htetkooo2532@gmail.com"
                            aria-label="Email Htet Ko Oo"
                            className="transition hover:text-emerald-400"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </section>
            </div>

            <div className="border-t border-border px-6 py-5 text-center text-xs leading-5 text-muted-foreground">
                <p>© {new Date().getFullYear()} CineMingala. Built by Htet Ko Oo.</p>
                <p className="mt-1">
                    This product uses the TMDB API but is not endorsed or certified by TMDB.
                    Watch-provider data is supplied by JustWatch through TMDB.
                </p>
            </div>
        </footer>
    );
}
