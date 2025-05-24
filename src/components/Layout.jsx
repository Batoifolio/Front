import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <header style={headerStyle}>
                <nav style={navStyle}>
                    <h1 style={logoStyle}>Batoifolio</h1>
                    <ul style={navListStyle}>
                        <li style={navItemStyle}>Inicio</li>
                        <li style={navItemStyle}>Proyectos</li>
                        <li style={navItemStyle}>Sobre mí</li>
                        <li style={navItemStyle}>Contacto</li>
                    </ul>
                </nav>
            </header>

            <main style={mainStyle}>
                {children}
            </main>

            <footer style={footerStyle}>
                © 2025 Batoifolio - Creado por Jordi Gisbert Ferriz
            </footer>
        </>
    );
}

const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    background: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 0',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

const navStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
};

const navItemStyle = {
    cursor: 'pointer',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
};

const mainStyle = {
    marginTop: '80px',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '2rem',
    color: '#222',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background:
        'linear-gradient(135deg, #8e2de2, #4a00e0)', // degradado morado
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(74,0,224,0.4)',
    minHeight: '80vh',
};

const footerStyle = {
    marginTop: '3rem',
    padding: '1rem',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.9rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};
