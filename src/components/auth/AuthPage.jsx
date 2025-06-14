import Swal from 'sweetalert2';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';
import { AuthContext } from '@/context/AuthContext';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { gatTokenByHeaderRequest } from '@/utils/auth/token';

export default function AuthPage({ mode = 'login' }) {
    const router = useRouter();
    const { user, login: setAuthUser, logout } = useContext(AuthContext);
    const isLogin = mode === 'login' || mode === 'logout';

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

            const res = await response.json();
            if (!response.ok) throw new Error(res.message || 'Error en la autenticación');

            const token = gatTokenByHeaderRequest(response)
            if (!token) throw new Error('Token no recibido');

            setAuthUser(token, res.data);

            router.push('/'); // Redirigir tras login
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const signupTab = () => (
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

    const logInTab = () => (
        <>
            <div className={styles.group}>
                <label>UserName / Email: </label>
                <input
                    type="text"
                    placeholder="username / email@empresa.com"
                    value={username || email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setUsername(e.target.value);
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

    if (mode === 'logout') {
        useEffect(() => {
            document.title = 'Batoifolio - Cerrar Sesión';
            if (user && user !== null) {
                Swal.fire({
                    title: 'Cerrar sesión',
                    text: '¿Estás seguro de que deseas cerrar sesión?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, cerrar sesión',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        logout(); // usa el método del contexto
                        Swal.close();
                        router.push('/login');
                    } else {
                        router.push('/');
                    }
                });
            } else {
                Swal.fire({
                    title: 'No hay sesión activa',
                    text: 'Tienes que tener una sesión para que se pueda cerrar.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    router.push('/login');
                });
            }
        }, [user]);
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
                    <p className={styles.bienvenido}>Bienvenido a la plataforma profesional de Batoifolio.</p>
                    {user && <h1>Hola, {user.nombre}!</h1>}
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
                                ¿No tienes cuenta? <Link href="/signup">Regístrate</Link>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
