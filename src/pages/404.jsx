// pages/404.jsx
import React, { useEffect } from 'react';

export default function Custom404() {
    useEffect(() => {
        document.title = 'Batoifolio - Página No Encontrada';
    }, []);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404</h1>
            <p style={styles.subtitle}>Ups... esta página no existe.</p>
            <a href="/" style={styles.link}>Volver al inicio</a>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f5f5f5',
        textAlign: 'center',
        fontFamily: 'sans-serif',
    },
    title: {
        fontSize: '6rem',
        marginBottom: '1rem',
        color: '#ff4d4f',
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '2rem',
        color: '#333',
    },
    link: {
        fontSize: '1rem',
        color: '#0070f3',
        textDecoration: 'underline',
    },
};
