import PersonCard from "@/components/person-card";
import { getPeople } from "@/services/get-people";
import Link from "next/link";

export default async function PeoplePage() {
    const people = await getPeople();
    return (
        <main className="min-h-screen px-6 py-20">
            <h1 className="text-3xl font-bold mb-6">Popular People</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {people.map((person) => (
                    <Link
                        key={person.id}
                        href={`/people/${person.id}`}
                    >
                        <PersonCard person={person} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
