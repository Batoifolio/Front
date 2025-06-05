import { getToken, saveToken, gatTokenByHeaderRequest, clearToken } from '@/utils/auth/token';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


export function patchGlobalFetch() {
    const originalFetch = window.fetch;
    console.log('No se pudo obtener el usuario actual. Por favor, inicia sesión nuevamente.');

    window.fetch = async (input, init = {}) => {
        // Obtener token actual
        const token = getToken();

        // Preparar headers con token si existe
        const headers = new Headers(init.headers || {});
        if (token && !headers.has('Authorization')) {
            headers.set('Authorization', `${token}`);
        }

        init.headers = headers;

        // Realizar la petición
        const response = await originalFetch(input, init);
        // Revisar si la respuesta trae un nuevo token
        const newToken = gatTokenByHeaderRequest(response);
        if (newToken) {
            saveToken(newToken);
        } else {
            // si el mensaje es "Token inválido" hacer un alert
            // try {
            //     const responseJson = await response.json()
            //     if (responseJson.message && responseJson.message.includes('Token inválido')) {
            //         clearToken();
            //         Swal.fire({
            //             title: 'Sesión Expirada',
            //             text: 'Lo sentimos, pero paso mucho tiempo incativo, inicie sesion de nuevo.',
            //             icon: 'warning',
            //             confirmButtonText: 'Ir al login',
            //         }).then((result) => {
            //             // Redirigir al login si se confirma o se cancela
            //             const router = useRouter();
            //             // router.push('/login');
            //         });
            //     }
            // } catch (error) {
            //     // console.log('Error al procesar la respuesta:', error);
            // }
        }

        return response;
    };
}
