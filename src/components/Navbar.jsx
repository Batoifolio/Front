// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="bg-blue-900 text-white">
            <h1 className="logo">Batoifolio</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="md:flex flex flex-col mt-4 bg-black/80 p-4 rounded-md absolute right-4 top-20 z-50">
                        <ul className="navList">

                            <li className="navItem">
                                <Link href="/" >
                                    Inici
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link href="/proyectos" >
                                    Proyectos
                                </Link>
                            </li>
                            <li className="navItem">
                                <Link href="/nosotros" >
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li className="navItem">
                                <div className="relative">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    >
                                        Más
                                        {!dropdownOpen && (
                                            <i class="bi bi-caret-down-fill"></i>
                                        )}
                                        {dropdownOpen && (
                                            <i class="bi bi-caret-up-fill"></i>
                                        )}
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
                            </li>
                        </ul>
                    </div>

                </div>

            </div>
        </nav>
    );
}
