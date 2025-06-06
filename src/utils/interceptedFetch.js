// utils/interceptedFetch.ts
import { saveToken, gatTokenByHeaderRequest } from '@/utils/auth/token';

export function patchGlobalFetch(token, updateToken) {
    const originalFetch = window.fetch;

    window.fetch = async (input, init = {}) => {
        const headers = new Headers(init.headers || {});
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `${token}`);
        }

        init.headers = headers;

        const response = await originalFetch(input, init);

        const newToken = gatTokenByHeaderRequest(response);
        if (newToken) {
            saveToken(newToken);
            updateToken(newToken); // <--- actualiza el contexto
        }

        return response;
    };
}
