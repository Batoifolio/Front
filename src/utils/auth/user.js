import { getToken } from "./token";
// import { useState } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

async function fetchUser() {
    try {
        // const [user, setUser] = useState(null);
        const token = getToken();
        const res = await fetch(apiUrl + '/user', {
            headers: { Authorization: `${token}` }
        });

        const userData = await res.json();
        if (!userData.success) throw new Error('Token inválido');

        saveUser(userData.data);  // Guardar usuario en localStorage
        return userData;
    } catch (error) {
        return null;  // Si token inválido, retornar null
    }
    // Aquí podrías hacer una llamada a la API para obtener datos adicionales del usuario si es necesario
}

function clearUser() {
    localStorage.removeItem('user');
}

export { saveUser, getUser, fetchUser, clearUser };