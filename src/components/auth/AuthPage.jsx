import Swal from 'sweetalert2';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';
import { saveToken, getToken, isRegistered, clearToken } from '@/utils/auth/token';
import { saveUser, getUser } from '@/utils/auth/user';
import { AuthContext } from '@/context/AuthContext';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AuthPage({ mode = 'login' }) {
    const router = useRouter();
    const { login: setAuthUser } = useContext(AuthContext);
    const isLogin = mode === 'login' || mode === 'logout';

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

            const res = await response.json();
            if (!response.ok) throw new Error(res.message || 'Error en la autenticación');

            // Obtener token de headers o del body
            const token = response.headers.get('Authorization') || res.token;
            if (!token) throw new Error('Token no recibido');

            // Guardar token en localStorage
            saveToken(token);

            // Si el backend te devuelve los datos del usuario directamente
            if (res) {
                saveUser(res.data); // opcional si también quieres guardar localmente
                setAuthUser(token, res.data); // actualiza el contexto global
            } else {
                // Si solo recibes el token, el contexto login() debe hacer fetchUser() internamente
                setAuthUser(token); // el contexto se encarga de traer los datos
            }
            window.location.reload(); // Recargar para actualizar el estado global
            setTimeout(() => {
            }, 2000); // 2000 milliseconds = 2 seconds
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


    const { user } = useContext(AuthContext);

    if (mode === 'logout') {
        useEffect(() => {
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
                        clearToken(); // Clear the token
                        setAuthUser(null, null); // Clear the context
                        Swal.close(); // Close the Swal instance
                        router.push('/login'); // Redirect to login page
                    }
                });

            } else {
                Swal.fire({
                    title: 'No hay sesión activa',
                    text: 'Tienes que tener una sestión par aqu es pueda cerrar.',
                    icon: 'info',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    router.push('/login'); // Redirect to login page
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
                    <p>Bienvenido a la plataforma profesional de Batoifolio.</p>

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
                                ¿No tienes cuenta?{' '}
                                <Link href="/signup">
                                    Regístrate
                                </Link>
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
