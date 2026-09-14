import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <section className="grid gap-6 px-6 py-20">
      <p role="status">Searching for movies...</p>
      <div
        aria-hidden="true"
        className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10"
      >
        {Array.from({ length: 20 }, (_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border">
            <Skeleton className="aspect-2/3 w-full rounded-none" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
