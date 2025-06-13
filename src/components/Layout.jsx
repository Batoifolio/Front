import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Navbar from './NavBar/Navbar';

export default function Layout({ children }) {
    return (
        <>
            <header>
                <Navbar></Navbar>
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
