// utils/auth/token.js
import Cookies from 'js-cookie';
function saveToken(token) {
    if (typeof window !== 'undefined' && token) {
        localStorage.setItem('authToken', token);
        Cookies.set('token', token, { path: '/', expires: 7 });
    }
}

function getToken() {
    if (typeof window === 'undefined') return null;
    return Cookies.get('token') || localStorage.getItem('authToken');
}

function isRegistered() {
    return !!getToken();
}

function clearToken() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        Cookies.remove('token');
    }
}

function createHeaderToken() {
    const token = getToken();
    if (!token) return null;
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };
}

export { saveToken, getToken, isRegistered, clearToken, createHeaderToken };
