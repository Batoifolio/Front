'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header>
                <nav>
                    <h1 className="logo">Batoifolio</h1>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir/cerrar menú"
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>

                    <div className={`navList md:flex ${menuOpen ? 'flex flex-col mt-4 bg-black/80 p-4 rounded-md absolute right-4 top-20 z-50' : 'hidden'} md:static md:flex-row md:gap-8`}>
                        <li className="navItem">
                            <Link href="/#">Inici</Link>
                        </li>
                        <li className="navItem">
                            <Link href="/#">Proyectos</Link>
                        </li>
                        <li className="navItem">
                            <Link href="/#">Sobre Nosotros</Link>
                        </li>
                        <li className="navItem relative group">
                            <span className="cursor-pointer">Más ▾</span>
                            <ul className="absolute hidden group-hover:block bg-white text-black mt-2 rounded shadow-md w-40 z-50">
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link href="/#">Acción</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link href="/#">Otra acción</Link>
                                </li>
                                <li className="border-t my-1"></li>
                                <li className="px-4 py-2 hover:bg-gray-100">
                                    <Link href="/#">Algo más</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="navItem text-gray-400 cursor-not-allowed">
                            Link deshabilitado
                        </li>
                    </div>
                </nav>
            </header>

            <main className="container">
                {children}
            </main>

            <footer>
                © 2025 Batoifolio - Creado por Jordi Gisbert Ferriz
            </footer>
        </>
    );
}
