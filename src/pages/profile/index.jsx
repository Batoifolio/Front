import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import styles from './style.module.css';

function ProfilePage() {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={user.fotoPerfil || '/default-avatar.png'} alt="Avatar" />
        </div>
        <div className={styles.userInfo}>
          <h1>@{user.username}</h1>
          <h2>{user.nombre} {user.apellidos}</h2>
          <p>{user.email}</p>
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.cardSection}>
          <h3>Datos Personales</h3>
          <p><strong>Teléfono:</strong> {user.telefono || 'No hay teléfono de contacto.'}</p>
          <p><strong>Ciudad:</strong> {user.pueblo || 'No se ha especificado.'}</p>
          <p><strong>Miembro desde:</strong> {new Date(user.creadoEn).toLocaleDateString()}</p>
        </div>
        <div className={styles.cardSection}>
          <h3>Información Académica</h3>
          <p><strong>Familia:</strong> {user.ramaId || 'No se ha especificado.'}</p>
          <p><strong>PF Cursando:</strong> {user.gradoId || 'No se ha especificado.'}</p>
        </div>
      </div>

      <div className={styles.description}>
        <h3>Descripción</h3>
        <p>{user.descripcion || 'No hay biografía disponible.'}</p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.editButton}>Editar Perfil</button>
        <button className={styles.logoutButton}>Cerrar Sesión</button>
      </div>
    </div>
  );
}

ProfilePage.auth = true;

export default ProfilePage;
