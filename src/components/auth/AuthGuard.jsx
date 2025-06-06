// components/auth/AuthGuard.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AlertNoAutenticado from './AlertNoAutenticado';

export default function AuthGuard({ children }) {
    const { user, token, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!user || !token) return;
    }, [user, token]);

    if (loading) return <div>Cargando...</div>;
    if (!user || !token) return <AlertNoAutenticado />;

    // Clona el children y le pasa user como prop
    return React.cloneElement(children, { user });
}
