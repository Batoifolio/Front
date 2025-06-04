// pages/profile.jsx
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

function AboutPage() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Perfil</h1>
      <p>Hola, {user.nombre}</p>
    </div>
  );
}

AboutPage.auth = true;

export default AboutPage;
