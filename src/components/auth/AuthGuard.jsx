// components/auth/AuthGuard.jsx
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AlertNoAutenticado from './AlertNoAutenticado';

export default function AuthGuard({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Cargando...</div>;
    if (!user) return <AlertNoAutenticado />;

    // Clona el children y le pasa user como prop
    return React.cloneElement(children, { user });
}
