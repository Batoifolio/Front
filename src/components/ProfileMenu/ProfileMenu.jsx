import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import NavItem from '@/components/NavItem';
import styles from './style.module.css';
import Link from "next/link";

export default function ProfileMenu() {
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    if (!user) {
        return (
            <span className="btn-header">
                <NavItem path="/login" label="Log In" />
            </span>
        );
    }

    return (
        <div className={`btn-profile ${styles.profileContainer}`} ref={menuRef}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={styles.profileButton}
                aria-haspopup="true"
                aria-expanded={menuOpen}
            >
                <img
                    src={user.fotoPerfil || '/default-avatar.png'}
                    alt={user.nombre || 'Usuario'}
                    className={styles.profilePic}
                />
            </button>

            {menuOpen && (
                <div className={styles.profileDropdown}>
                    <Link href="/profile" className={styles.profileBtn} onClick={() => setMenuOpen(false)}>
                        <button>
                            Ver perfil
                        </button>
                    </Link>
                    <button
                        className={styles.logoutBtn}
                        onClick={() => {
                            router.push("/logout");
                            setMenuOpen(false);
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}