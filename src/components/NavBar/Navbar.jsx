import NavItem from './NavItem';
import useMediaQuery from '../../hooks/useMediaQuery'; // asegúrate de la ruta
import { Menu, X } from 'lucide-react';
import React, { useState, useContext } from 'react';
import Link from 'next/link';

import ProfileMenu from '../ProfileMenu/ProfileMenu';

// esta registrado, si esta registrao, tiene que aparecer el boton para ir al perfil
// returnButonHeader retorna el boton correspondinte, en caso de no estar logeado, ternoa el boton de login
// function returnButonHeader() {
//     // const { user } = useContext(AuthContext);
//     // const user = null;
//     // if (user) {

//     // return (
//     //     <span className="btn-profile">
//     //         <NavItem path="/profile" label={<img src={user.fotoPerfil} alt={user.nombre} className="profile-pic" />} />
//     //     </span>
//     // );
//     // return
//     // }
//     return (
//         <span className="btn-header">
//             <NavItem path="/login" label="Log In" />
//         </span>
//     );
// }


const renderDesktop = () => {
    return (
        <div className="navList flex gap-4">
            <NavItem path="/" label={<i class="bi bi-house-fill"></i>} />
            <NavItem path="/about" label="Sobre Nosotros" />
            <NavItem path="/search" label="Buscar" />
            <NavItem path="/companies" label="Empresas" />
            <ProfileMenu />
        </div>
    );
}
const renderMobile = (menuOpen, setMenuOpen) => (
    <>
        <div className="navMenu flex gap-4">

            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white z-50 navItem btn">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <ProfileMenu />

        </div>

        {menuOpen && (
            <div className="navList drop-menu">
                <NavItem path="/" label={<i class="bi bi-house-fill"></i>} />
                <NavItem path="/about" label="Sobre Nosotros" />
                <NavItem path="/search" label="Buscar" />
                <NavItem path="/companies" label="Empresas" />
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
                <Link href="/">
                    <h1 className="logo text-white text-xl font-bold">Batoi<span className='accent'>Folio</span></h1>
                </Link>

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
