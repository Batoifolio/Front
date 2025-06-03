import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AlertNoAutenticado from '@/components/auth/AlertNoAutenticado.jsx';

export default function AboutPage() {
  const { user } = useContext(AuthContext);

  if (!user) return <AlertNoAutenticado />;

  return (
    <div>
      <h1>About</h1>
      <p>Hola, {user.name}</p>
    </div>
  );
}
