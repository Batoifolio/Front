// components/UnauthorizedRequiredLogin.jsx
export default function UnauthorizedRequiredLogin() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Acceso no autorizado</h1>
            <p style={styles.subtitle}>Debes iniciar sesión para acceder a esta página.</p>
            <a href="/login" style={styles.link}>Iniciar sesión</a>
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
        fontSize: '2rem',
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
