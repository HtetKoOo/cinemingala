import { Person } from "@/types/person";
import Image from "next/image";

export default function PersonCard({ person }: { person: Person }) {
    return (
        <div className="border rounded-2xl shadow hover:shadow-lg transition">
            <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden bg-muted">
                <Image
                    src={
                        person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "/images/image-placeholder.png"
                    }
                    alt={person.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
            <div className="p-2">
                <h2 className="font-semibold text-lg">{person.name}</h2>
                <p className="text-sm">Popularity: {person.popularity.toFixed(1)}</p>
                <div className="mt-1">
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {person.known_for.map((work) => (
                            <li key={work.id}>
                                {work.title || work.name} ({work.media_type.toUpperCase()})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
