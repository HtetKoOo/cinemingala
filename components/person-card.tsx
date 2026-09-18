import { Person } from "@/types/person";
import Image from "next/image";
import { UserRound } from "lucide-react";

export default function PersonCard({ person }: { person: Person }) {
    const knownFor = Array.isArray(person.known_for) ? person.known_for : [];

    return (
        <div className="h-full overflow-hidden rounded-2xl border shadow transition-shadow hover:shadow-lg">
            <div className="relative aspect-4/5 w-full bg-muted">
                {person.profile_path ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 639px) 50vw, (max-width: 767px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 17vw, (max-width: 1535px) 13vw, 10vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground" aria-hidden="true">
                        <UserRound className="size-12 stroke-1" />
                    </div>
                )}
            </div>
            <div className="p-2">
                <h2 className="truncate text-sm font-semibold" title={person.name}>{person.name}</h2>
                <p className="text-xs text-muted-foreground">Popularity: {typeof person.popularity === "number" ? person.popularity.toFixed(1) : "N/A"}</p>
                {knownFor.length > 0 && (
                    <div className="mt-1">
                        <ul className="list-inside list-disc text-xs text-muted-foreground">
                            {knownFor.slice(0, 2).map((work) => (
                                <li key={work.id} className="truncate">
                                    {work.title || work.name}{work.media_type ? ` (${work.media_type.toUpperCase()})` : ""}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
