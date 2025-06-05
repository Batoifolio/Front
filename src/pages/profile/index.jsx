import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import styles from './style.module.css';
import Link from 'next/link';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    document.title = 'Batoifolio - Perfil';
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={user.fotoPerfil || '/default-avatar.png'} alt="Avatar" />
        </div>
        <div className={styles.userInfo}>
          <h1><strong>Usuario:</strong> @{user.username}</h1>
          <h2><strong>Nombre:</strong> {user.nombre} {user.apellidos}</h2>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.cardSection}>
          <h3><strong>Datos Personales</strong></h3>
          <p><strong>Teléfono:</strong> {user.telefono || 'No hay teléfono de contacto.'}</p>
          <p><strong>Ciudad:</strong> {user.pueblo || 'No se ha especificado.'}</p>
          <p><strong>Miembro desde:</strong> {new Date(user.creadoEn).toLocaleDateString()}</p>
        </div>
        <div className={styles.cardSection}>
          <h3><strong>Información Académica</strong></h3>
          <p><strong>Familia:</strong> {user.ramaId || 'No se ha especificado.'}</p>
          <p><strong>FP Cursando:</strong> {user.grado?.nombre || 'No se ha especificado.'}</p>
        </div>
      </div>

      <div className={styles.description}>
        <h3><strong>Descripción</strong></h3>
        <p>{user.descripcion || 'No hay biografía disponible.'}</p>
      </div>

      <div className={styles.buttons}>
        <Link href="/logout" className={styles.logoutButton}>
          Cerrar Sesión
        </Link>
        <Link href="/profile/edit" className={styles.editButton}>
          Editar Perfil
        </Link>
      </div>
    </div>
  );
}

ProfilePage.auth = true;

export default ProfilePage;
