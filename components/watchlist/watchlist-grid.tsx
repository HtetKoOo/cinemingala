"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useWatchlist } from "./watchlist-provider";

export function WatchlistGrid() {
  const { items, hydrated, toggleItem } = useWatchlist();

  if (!hydrated) {
    return (
      <div aria-label="Loading watchlist" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="w-full aspect-2/3 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border p-8 text-center">
        <p className="mb-4 text-muted-foreground">Your watchlist is empty.</p>
        <Button asChild>
          <Link href="/">Discover movies</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <article key={`${item.media_type}-${item.id}`} className="overflow-hidden rounded-2xl border shadow-sm">
          <Link href={`/${item.media_type}/${item.id}`} className="group block">
            <div className="relative w-full aspect-2/3 bg-muted">
              <Image
                src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "/images/image-placeholder.png"}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 17vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h2 className="font-semibold truncate">{item.title}</h2>
              <p className="text-sm text-muted-foreground">⭐ {item.vote_average.toFixed(1)}</p>
            </div>
          </Link>
          <div className="px-3 pb-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => toggleItem(item)}
              aria-label={`Remove ${item.title} from watchlist`}
            >
              <Trash2 /> Remove
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
