import React, { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken } from '@/utils/auth/token';
import { fetchUser, saveUser, getUser, clearUser } from '@/utils/auth/user';

export const AuthContext = createContext();

export function isRegistered() {
    return getUser() !== null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        const storedUser = getUser();

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        if (storedUser) {
            setUser(storedUser);
            setLoading(false);
        } else {
            fetchUser()
                .then(res => {
                    if (!res.success) throw new Error('Token inválido');
                    setUser(res.data);
                    saveUser(res.data);
                })
                .catch(() => {
                    clearToken();
                    clearUser();
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    function login(token, userData) {
        saveToken(token);
        saveUser(userData);
        setUser(userData);
    }

    function logout() {
        clearToken();
        clearUser();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
