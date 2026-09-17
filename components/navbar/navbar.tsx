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
import { usePathname, useRouter } from "next/navigation"
import { useWatchlist } from "@/components/watchlist/watchlist-provider"
import { cn } from "@/lib/utils"

export default function Navbar() {
    
    const [query, setQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();
    const { items, hydrated } = useWatchlist();
    const watchlistLabel = `Watchlist${hydrated && items.length > 0 ? ` (${items.length})` : ""}`;
    const navItems = [
        { href: "/movies", label: "Movies", width: "w-24" },
        { href: "/tv", label: "TV Series", width: "w-30" },
        { href: "/people", label: "People", width: "w-20" },
        { href: "/watchlist", label: watchlistLabel, width: "w-30" },
    ];
    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`) ||
        (href === "/movies" && pathname.startsWith("/movie/"));
    const currentLocation = (href: string) =>
        pathname === href ? "page" as const : isActive(href) ? "location" as const : undefined;

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
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label="Open menu"
                                className="size-11 touch-manipulation rounded-xl"
                            >
                                <Menu className="size-5" aria-hidden="true" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[min(16rem,85vw)] rounded-r-2xl p-4 pt-14">
                            <SheetTitle className="mb-3 text-lg">
                                <SheetClose asChild>
                                    <Link
                                        href="/"
                                        aria-current={pathname === "/" ? "page" : undefined}
                                        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Clapperboard className="size-5" aria-hidden="true" />
                                        CineMingala
                                    </Link>
                                </SheetClose>
                            </SheetTitle>
                            <nav className="grid gap-1 text-base font-medium" aria-label="Main navigation">
                                {navItems.map(({ href, label }) => (
                                    <SheetClose asChild key={href}>
                                        <Link
                                            href={href}
                                            aria-current={currentLocation(href)}
                                            className={cn(
                                                "rounded-lg px-3 py-3 transition-colors",
                                                isActive(href)
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-accent hover:text-accent-foreground",
                                            )}
                                        >
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
                        {navItems.map(({ href, label, width }) => (
                            <NavigationMenuItem key={href} className={width}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={href}
                                        aria-current={currentLocation(href)}
                                        className={cn(
                                            "text-center font-semibold",
                                            isActive(href)
                                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground",
                                        )}
                                    >
                                        {label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
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
