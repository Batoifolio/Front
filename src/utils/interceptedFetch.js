// utils/interceptedFetch.ts
import { saveToken, gatTokenByHeaderRequest } from '@/utils/auth/token';
import Swal from 'sweetalert2';

export function patchGlobalFetch(token, updateToken) {
    const originalFetch = window.fetch;

    window.fetch = async (input, init = {}) => {
        const headers = new Headers(init.headers || {});
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `${token}`);
        }

        init.headers = headers;
        try {
            const response = await originalFetch(input, init);
            const newToken = gatTokenByHeaderRequest(response);
            if (newToken) {
                saveToken(newToken);
                updateToken(newToken);
            }
            return response;

        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar al servidor.',
                });
                return new Response(JSON.stringify({
                    message: 'No se pudo conectar al servidor. Por favor, inténtelo más tarde.'
                }), {
                    status: 503,
                    ok: false,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            } else {
                console.error('Fetch error:', error);
                throw error; // Re-throw the error to handle it later
            }
        }
    };
}
