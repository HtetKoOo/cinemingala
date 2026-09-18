import { Skeleton } from "@/components/ui/skeleton";

export default function SearchLoading() {
  return (
    <section className="grid gap-6 py-6">
      <p role="status">Searching...</p>
      <div
        aria-hidden="true"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10"
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
