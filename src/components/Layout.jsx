export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-[144px] bg-dark text-white flex items-center justify-center shadow-lg">
                <h1 className="text-4xl font-bold tracking-widest">Batoifolio</h1>
            </header>

            <main className="flex-1 p-4 bg-soft">{children}</main>

            <footer className="bg-dark text-white text-center py-4">
                &copy; {new Date().getFullYear()} Batoifolio - IES Batoi
            </footer>
        </div>
    )
}
