import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AlertNoAutenticado() {
    const router = useRouter();

    useEffect(() => {
        Swal.fire({
            title: 'No tienes sesión Activa',
            text: 'Debes iniciar sesión para continuar.',
            icon: 'warning',
            confirmButtonText: 'Ir al login',
        }).then((result) => {
            // Redirigir al login si se confirma o se cancela
            router.push('/login');
        });
    }, [router]);

    return null; // No renderiza nada en pantalla
}
