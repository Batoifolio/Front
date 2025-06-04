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

function gatTokenByHeaderRequest(request) {
    if (!request || !request.headers) return null;
    const token = request.headers.get('Authorization')
    return token ? token : null;
}

export { saveToken, getToken, isRegistered, clearToken, gatTokenByHeaderRequest };
