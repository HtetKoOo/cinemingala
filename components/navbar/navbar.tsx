"use client"

import Link from "next/link"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "../user-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Clapperboard, Menu, Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWatchlist } from "@/components/watchlist/watchlist-provider"

export default function Navbar() {
    
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const { items, hydrated } = useWatchlist();
    const watchlistLabel = `Watchlist${hydrated && items.length > 0 ? ` (${items.length})` : ""}`;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    };

    return (
        <header className="fixed top-0 z-50 w-full rounded-b-2xl border-b bg-background/90 backdrop-blur-sm">
            <div className="flex h-16 w-full items-center gap-2 px-3 sm:px-4 lg:px-6">
                {/* Left side for small screens — Dropdown Menu */}
                <div className="shrink-0 lg:hidden">
                    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Open menu">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[min(16rem,85vw)] rounded-r-2xl p-4 pt-14">
                            <SheetTitle className="mb-2 text-lg">Explore</SheetTitle>
                            <nav className="grid gap-1 text-base font-medium" aria-label="Main navigation">
                                {[
                                    { href: "/", label: "Movies" },
                                    { href: "/tv", label: "TV Series" },
                                    { href: "/people", label: "People" },
                                    { href: "/watchlist", label: watchlistLabel },
                                ].map(({ href, label }) => (
                                    <SheetClose asChild key={href}>
                                        <Link href={href} className="rounded-lg px-3 py-3 transition-colors hover:bg-accent hover:text-accent-foreground">
                                            {label}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Left side for medium and larger screens — Logo */}
                <Link href="/" className="hidden shrink-0 items-center px-3 text-2xl font-semibold tracking-tight lg:flex">
                    <Clapperboard className="mr-1"/><span>CineMingala</span>
                </Link>

                {/* Center — Navigation links for medium and larger screens */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="flex space-x-3">
                        <NavigationMenuItem className="w-30">
                            <NavigationMenuLink asChild>
                                <Link href="/tv" className="bg-secondary text-secondary-foreground font-semibold text-center">TV Series</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="w-20">
                            <NavigationMenuLink asChild>
                                <Link href="/people" className="bg-secondary text-secondary-foreground font-semibold text-center">People</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="w-30">
                            <NavigationMenuLink asChild>
                                <Link href="/watchlist" className="bg-secondary text-secondary-foreground font-semibold text-center">{watchlistLabel}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Center — Search for all screen sizes */}
                <form onSubmit={handleSearch} role="search" className="flex min-w-0 flex-1 justify-center px-1 sm:px-4">
                    <div className="relative w-full max-w-md min-w-0">
                        <Input
                            type="search"
                            aria-label="Search movies and TV shows"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full min-w-0 pl-3 pr-10"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            aria-label="Search"
                            className="absolute right-1 top-1/2 -translate-y-1/2"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </form>

                {/* Right side — Theme Toggle and User Menu */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                    <ThemeToggle />
                    <div className="hidden sm:block">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}
