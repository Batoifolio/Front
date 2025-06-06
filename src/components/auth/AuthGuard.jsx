// components/auth/AuthGuard.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AlertNoAutenticado from './AlertNoAutenticado';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AuthGuard({ children }) {
    const { user, token, updateToken, isValidToken, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !token) return;

        const interval = setInterval(async () => {
            const isValid = await isValidToken();
            if (isValid) {
                updateToken(token);
            } else {
                updateToken(null);
            }
        }, 4 * 60 * 1000); // 4 minutos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar o si cambia token
    }, [user, token]);

    if (loading) return <div>Cargando...</div>;
    if (!user || !token) return <AlertNoAutenticado />;

    // Clona el children y le pasa user como prop
    return React.cloneElement(children, { user });
}
