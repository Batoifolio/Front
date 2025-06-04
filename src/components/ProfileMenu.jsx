import { useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import NavItem from './NavItem';

export default function ProfileMenu() {
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    if (!user) {
        return (
            <span className="btn-header">
                <NavItem path="/login" label="Log In" />
            </span>
        );
    }

    return (
        <div className="btn-profile" style={{ position: "relative" }}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="profile-button"
                aria-haspopup="true"
                aria-expanded={menuOpen}
            >
                <img
                    src={user.fotoPerfil}
                    alt={user.nombre}
                    className="profile-pic"
                    style={{ borderRadius: "50%", width: "32px", height: "32px" }}
                />
            </button>

            {menuOpen && (
                <div
                    className="profile-dropdown"
                    style={{
                        position: "absolute",
                        top: "40px",
                        right: 0,
                        background: "white",
                        borderRadius: "6px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        zIndex: 100,
                        width: "150px",
                    }}
                >
                    <NavItem path="/profile" label="Ver perfil" onClick={() => setMenuOpen(false)} />
                    <button
                        className="logout-btn"
                        onClick={() => {
                            router.push("/logout");
                        }}
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                            color: "#333",
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}
