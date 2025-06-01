import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import styles from './style.module.css';

export default function AuthPage({ mode = 'login' }) {
    const router = useRouter();
    const isLogin = mode === 'login';

    return (
        <>
            <Head>
                <title>Batoifolio - {isLogin ? 'Log In' : 'Sign Up'}</title>
            </Head>

            <div className={styles.container}>
                {/* Lado izquierdo con el logo */}
                <div className={styles.side}>
                    <Image src="/batoifolio.png" alt="Logo Empresa" width={180} height={180} className={styles.image} />
                    <Image src="/batoifolio-icon.png" alt="Logo Empresa Icon" width={100} height={100} className={styles.image} />
                    <p>Bienvenido a la plataforma profesional de Batoifolio.</p>
                </div>

                {/* Formulario */}
                <div className={styles.formWrapper}>
                    <div className={styles.tabs}>
                        <button
                            onClick={() => router.push('/login')}
                            className={`${styles.tab} ${isLogin ? styles.tabActive : ''}`}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => router.push('/signup')}
                            className={`${styles.tab} ${!isLogin ? styles.tabActive : ''}`}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form className={styles.form}>
                        {!isLogin && (
                            <div className={styles.group}>
                                <label>Nombre completo</label>
                                <input type="text" placeholder="Tu nombre" required />
                            </div>
                        )}

                        <div className={styles.group}>
                            <label>Email</label>
                            <input type="email" placeholder="email@empresa.com" required />
                        </div>

                        <div className={styles.group}>
                            <label>Contraseña</label>
                            <input type="password" placeholder="********" required />
                        </div>

                        <button type="submit" className={styles.submit}>
                            {isLogin ? 'Entrar' : 'Crear cuenta'}
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
