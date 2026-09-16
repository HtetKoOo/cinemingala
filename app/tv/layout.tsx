export default function TvLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen px-3 pt-20 sm:px-4">
            {children}
        </main>
    )
}
