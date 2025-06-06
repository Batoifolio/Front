import React, { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, clearToken, gatTokenByHeaderRequest } from '@/utils/auth/token';
import { fetchUser, saveUser, getUser, clearUser } from '@/utils/auth/user';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedtoken = getToken();
        const storedUser = getUser();

        if (storedUser && storedtoken) {
            setUser(storedUser);
            setToken(storedtoken);
            setLoading(false);
        } else {
            fetchUser()
                .then(res => {
                    if (!res.success) throw new Error('Token inválido');
                    setUser(res.data);
                    saveUser(res.data);
                    setToken(gatTokenByHeaderRequest(res));
                    saveToken(gatTokenByHeaderRequest(res));
                })
                .catch(() => {
                    setToken(null);
                    clearToken();
                    setUser(null);
                    clearUser();
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    function login(token, userData) {
        setToken(token);
        saveToken(token);
        setUser(userData);
        saveUser(userData);
    }

    function logout() {
        setToken(null);
        clearToken();
        setUser(null);
        clearUser();
    }

    const updateToken = (newToken) => {
        setToken(newToken);
        saveToken(newToken);
    };

    const isValidToken = async () => {
        return await fetch(apiUrl + 'user', {
            method: 'GET',
        }).then(res => {
            if (!res.ok) {
                return false;
            }
            return gatTokenByHeaderRequest(res);
        });
    }

    return (
        <AuthContext.Provider value={{ user, token, updateToken, loading, login, logout, isValidToken }}>
            {children}
        </AuthContext.Provider>
    );
}
