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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Clapperboard, Menu, Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWatchlist } from "@/components/watchlist/watchlist-provider"

export default function Navbar() {
    
    const [query, setQuery] = useState("");
    const router = useRouter();
    const { items, hydrated } = useWatchlist();
    const watchlistLabel = `Watchlist${hydrated && items.length > 0 ? ` (${items.length})` : ""}`;

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    };

    return (
    <header className="flex fixed top-0 z-50 w-full bg-gray-200/20 border-b rounded-b-2xl backdrop-blur-sm">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                {/* Left side for small screens — Dropdown Menu */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-64 p-4 rounded-r-2xl backdrop-blur-sm">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link href="/" className="hover:text-foreground">
                                    Movies
                                </Link>
                                <Link href="/tv" className="hover:text-foreground">
                                    TV Series
                                </Link>
                                <Link href="/people" className="hover:text-foreground">
                                    People
                                </Link>
                                <Link href="/watchlist" className="hover:text-foreground">
                                    {watchlistLabel}
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Left side for medium and larger screens — Logo */}
                <Link href="/" className="hidden md:flex text-2xl font-semibold tracking-tight px-3 items-center">
                    <Clapperboard className="mr-1"/><span> Movie House</span>
                </Link>

                {/* Center — Navigation links for medium and larger screens */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="flex space-x-3">
                        <NavigationMenuItem className="w-30">
                            <NavigationMenuLink asChild>
                                <Link href="/tv" className="bg-gray-200/40 font-semibold text-center">TV Series</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="w-20">
                            <NavigationMenuLink asChild>
                                <Link href="/people" className="bg-gray-200/40 font-semibold text-center">People</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="w-30">
                            <NavigationMenuLink asChild>
                                <Link href="/watchlist" className="bg-gray-200/40 font-semibold text-center">{watchlistLabel}</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Center — Search for all screen sizes */}
                <form onSubmit={handleSearch} className="flex-1 flex justify-center px-4">
                    <div className="relative w-full max-w-md">
                        <Input
                            type="search"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-8 pr-10 placeholder:text-black"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-300/20"
                        >
                            <Search className="h-5 w-5 text-black" />
                        </Button>
                    </div>
                </form>

                {/* Right side — Theme Toggle and User Menu */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    )
}
