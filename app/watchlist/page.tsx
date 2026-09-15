import { WatchlistGrid } from "@/components/watchlist/watchlist-grid";

export default function WatchlistPage() {
  return (
    <main className="min-h-screen px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      <WatchlistGrid />
    </main>
  );
}
