import React, { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '@/utils/auth/token';
import { fetchUser } from '@/utils/auth/user';

// 1. Crear el contexto
export const AuthContext = createContext();

// 2. Crear el proveedor del contexto
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);  // Estado donde guardaremos al usuario


    // 3. Cuando el componente se monta, buscamos el token y validamos
    useEffect(() => {
        async function loadUser() {
            const token = getToken(); // Leer token guardado en localStorage o cookie
            if (!token) {
                setUser(null);  // No hay token → no hay usuario
                return;
            }


            // Aquí llamamos a nuestra API para validar el token y obtener datos del usuario
            try {
                const res = await fetchUser();

                if (!res.success) throw new Error('Token inválido');

                setUser(res.data);  // Guardar usuario en estado global
            } catch (error) {
                clearToken();  // Si token inválido, borrarlo
                setUser(null);
            }
        }

        loadUser();
    }, []);

    // Función para hacer login (guardar token y usuario)
    function login(token, userData) {
        saveToken(token);
        setUser(userData);
    }

    // Función para logout (borrar token y usuario)
    function logout() {
        clearToken();
        setUser(null);
    }

    // 4. Proveemos el contexto con los datos y funciones para usar en la app
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
