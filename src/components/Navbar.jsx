// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-blue-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <span className="font-bold text-xl">Batoifolio</span>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/" className="hover:bg-blue-700 px-3 py-2 rounded">
                            Inici
                        </Link>
                        <Link href="/proyectos" className="hover:bg-blue-700 px-3 py-2 rounded">
                            Proyectos
                        </Link>
                        <Link href="/nosotros" className="hover:bg-blue-700 px-3 py-2 rounded">
                            Sobre Nosotros
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
                            >
                                Más
                                <svg
                                    className="ml-1 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Acción</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Otra acción</Link>
                                    <Link href="#" className="block px-4 py-2 hover:bg-gray-200">Algo más</Link>
                                    <span className="block px-4 py-2 text-gray-400 cursor-not-allowed">Deshabilitado</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {menuOpen && (
                    <div className="md:hidden space-y-1 mt-2">
                        <Link href="/" className="block hover:bg-blue-700 px-3 py-2 rounded">Inici</Link>
                        <Link href="/proyectos" className="block hover:bg-blue-700 px-3 py-2 rounded">Proyectos</Link>
                        <Link href="/nosotros" className="block hover:bg-blue-700 px-3 py-2 rounded">Sobre Nosotros</Link>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded"
                        >
                            Más
                        </button>
                        {dropdownOpen && (
                            <div className="space-y-1 px-3">
                                <Link href="#" className="block hover:bg-blue-700 px-3 py-2 rounded">Acción</Link>
                                <Link href="#" className="block hover:bg-blue-700 px-3 py-2 rounded">Otra acción</Link>
                                <Link href="#" className="block hover:bg-blue-700 px-3 py-2 rounded">Algo más</Link>
                                <span className="block px-3 py-2 text-gray-400">Deshabilitado</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
