import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';
import { useState } from 'react';
import { saveToken, getToken, isRegistered, clearToken } from '@/utils/auth/token';
import { saveUser, getUser } from '@/utils/auth/user';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AuthPage({ mode = 'login' }) {
    const router = useRouter();
    const isLogin = mode === 'login';

    // Estado del formulario
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${apiUrl}${isLogin ? 'login' : 'register'}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: name,
                    apellidos: apellidos,
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error en la autenticación');

            // Obtener token de headers o data
            const token = response.headers.get('Authorization') || data.token; // depende de la API

            saveToken(token);
            saveUser(data);

            // Redirigir o hacer algo más
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };



    const signupTab = () => {
        return (
            <>
                <div className={styles.group}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Apellidos:</label>
                    <input
                        type="text"
                        placeholder="Tus apellidos"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Tu Nombre de Usuario:</label>
                    <input
                        type="text"
                        placeholder="userName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Contraseña: </label>
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.group}>
                    <label>Confirmar Contraseña: </label>
                    <input
                        type="password"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            </>
        );
    }
    const logInTab = () => {
        // if (isRegistered()) {
        //     const user = getUser();
        //     setEmail(user?.email || '');
        //     setUsername(user?.username || '');
        // }
        return (
            <>
                <div className={styles.group}>
                    <label>UserName / Email: </label>
                    <input
                        type="text"
                        placeholder="username / email@empresa.com"
                        value={username || email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setUsername(e.target.value)
                        }}
                        required
                    />
                </div>

                <div className={styles.group}>
                    <label>Contraseña: </label>
                    <input
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Batoifolio - {isLogin ? 'Login' : 'Registro'}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.side}>
                    <Image src="/batoifolio-icon.png" alt="Logo Empresa" width={180} height={180} className={styles.image} />
                    <Image src="/batoifolio.png" alt="Texto Empresa" width={180} height={180} className={styles.image} />
                    <p>Bienvenido a la plataforma profesional de Batoifolio.</p>
                </div>

                <div className={styles.formWrapper}>
                    <div className={styles.tabs}>
                        <button onClick={() => router.push('/login')} className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}>
                            Iniciar Sesión
                        </button>
                        <button onClick={() => router.push('/signup')} className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}>
                            Registrarse
                        </button>
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {isLogin ? logInTab() : signupTab()}

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.submit} disabled={loading}>
                            {loading ? 'Enviando...' : isLogin ? 'Entrar' : 'Crear cuenta'}
                        </button>

                        {isLogin && (
                            <p className={styles.footer}>
                                ¿No tienes cuenta?{' '}
                                <span className={styles.switch} onClick={() => router.push('/signup')}>
                                    Regístrate
                                </span>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
