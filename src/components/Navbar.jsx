import NavItem from './NavItem';
import useMediaQuery from '../hooks/useMediaQuery'; // asegúrate de la ruta
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';
const renderDesktop = () => {
    return (
        <div className="navList flex gap-4">
            <NavItem path="/about" label="Sobre Nosotros" />
            <NavItem path="/search" label="Buscar" />
            <NavItem path="/companies" label="Empresas" />
            <span className="btn-header">
                <NavItem path="/signin" label="Sign In" />
            </span>
        </div>
    );
}
const renderMobile = (menuOpen, setMenuOpen) => (
    <>
        <div className="navMenu flex gap-4">

            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white z-50 navItem btn">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>


        </div>

        {menuOpen && (
            <div className="navList drop-menu">
                <NavItem path="/about" label="Sobre Nosotros" />
                <NavItem path="/search" label="Buscar" />
                <NavItem path="/companies" label="Empresas" />
                <span className="btn-header">
                    <NavItem path="/signin" label="Sign In" />
                </span>
            </div>
        )}
    </>
);




const Navbar = () => {
    const isMobile = useMediaQuery('(max-width: 767px)'); // Tailwind: md = 768px
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <div className="w-full h-20 bg-emerald-800 sticky top-0">
            <div className="container mx-auto px-4 h-full header-container flex items-center justify-between">
                <h1 className="logo text-white text-xl font-bold">Batoifolio</h1>

                {!isMobile && (
                    renderDesktop()
                )}
                {isMobile && (
                    renderMobile(menuOpen, setMenuOpen)
                )}
            </div>
        </div>
    );
};

export default Navbar;
