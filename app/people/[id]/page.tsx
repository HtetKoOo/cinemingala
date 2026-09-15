import { getPeopleCredits } from "@/services/get-people-credits";
import { getPeopleDetails } from "@/services/get-people-details";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
    FaFacebook,
    FaImdb,
    FaInstagram,
    FaTiktok,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export default async function PersonPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const person = await getPeopleDetails(id);
    const credits = await getPeopleCredits(id);

    // Sort by popularity (descending)
    const sortedCredits = credits.cast.sort((a, b) => b.popularity - a.popularity).slice(0, 12);

    return (
        <main className="min-h-screen flex flex-col sm:flex-row items-center sm:items-start pt-14 sm:px-4 sm:pt-16 gap-2">
            {/* LEFT */}
            <div className="flex flex-col w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-4">
                <Image
                    src={
                        person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "/images/image-placeholder.png"
                    }
                    alt={person.name}
                    width={300}
                    height={450}
                    className="rounded-2xl w-1/3 mx-auto sm:w-full object-cover"
                />
                <div className="mt-2 flex flex-col items-center sm:items-start justify-center gap-1">
                    <h3 className="font-semibold text-xl ">{person.name}</h3>
                    <p className=" ">
                        <strong>Known for - </strong>{person.known_for_department}
                    </p>
                    <div className="flex flex-wrap gap-3 py-1">
                        {person.homepage && (
                            <a href={person.homepage} target="_blank" rel="noopener noreferrer" aria-label={`${person.name}'s website`}>
                                <Globe className="h-6 w-6 hover:text-green-400" />
                            </a>
                        )}
                        {person.imdb_id && (
                            <a href={`https://www.imdb.com/name/${person.imdb_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on IMDb`}>
                                <FaImdb className="h-6 w-6 hover:text-yellow-400" />
                            </a>
                        )}
                        {person.external_ids.instagram_id && (
                            <a href={`https://www.instagram.com/${person.external_ids.instagram_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on Instagram`}>
                                <FaInstagram className="h-6 w-6 hover:text-pink-500" />
                            </a>
                        )}
                        {person.external_ids.twitter_id && (
                            <a href={`https://x.com/${person.external_ids.twitter_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on X`}>
                                <FaXTwitter className="h-6 w-6 hover:text-gray-400" />
                            </a>
                        )}
                        {person.external_ids.facebook_id && (
                            <a href={`https://www.facebook.com/${person.external_ids.facebook_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on Facebook`}>
                                <FaFacebook className="h-6 w-6 hover:text-blue-500" />
                            </a>
                        )}
                        {person.external_ids.tiktok_id && (
                            <a href={`https://www.tiktok.com/@${person.external_ids.tiktok_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on TikTok`}>
                                <FaTiktok className="h-6 w-6 hover:text-pink-400" />
                            </a>
                        )}
                        {person.external_ids.youtube_id && (
                            <a href={`https://www.youtube.com/${person.external_ids.youtube_id}`} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on YouTube`}>
                                <FaYoutube className="h-6 w-6 hover:text-red-500" />
                            </a>
                        )}
                    </div>
                    <p><strong>Gender - </strong>{person.gender === 1 ? "Female" : "Male"}</p>
                    <p><strong>Birthday - </strong>{person.birthday}</p>
                    <p><strong>Place of Birth - </strong>{person.place_of_birth}</p>

                    {person.also_known_as && person.also_known_as.length > 0 && (
                        <div className="mt-2">
                            <strong>Also Known As:</strong>
                            <ul className="list-disc list-inside text-sm text-gray-400 mt-1 space-y-1">
                                {person.also_known_as.slice(0, 5).map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            {/* RIGHT */}
            <div className="w-full sm:w-2/3 md:w-3/4 lg:w-4/5 sm:mt-4 p-4">
                <h4 className="text-xl font-semibold mb-2">Biography</h4>
                <p>{person.biography}</p>

                <div className="mt-8">
                    <h4 className="text-xl font-semibold mb-4">Known For</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {sortedCredits.map((credit) => (
                            <Link
                                key={credit.credit_id}
                                href={`/${credit.media_type === "movie" ? "movie" : "tv"}/${credit.id}`}
                                className="group"
                            >
                                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-200 mb-2">
                                    <Image
                                        src={
                                            credit.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${credit.poster_path}`
                                                : "/images/image-placeholder.png" // Ensure this placeholder exists or use a fallback
                                        }
                                        alt={credit.title || credit.name || "Untitled"}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                                <p className="text-sm font-medium line-clamp-1">
                                    {credit.title || credit.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </main >
    );
}
