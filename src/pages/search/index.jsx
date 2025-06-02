import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function AboutPage() {
    const { user } = useContext(AuthContext);

    if (!user) return <p>No estás autenticado</p>;

    return (
        <div>
            <h1>About</h1>
            <p>Hola, {user.name}</p>
        </div>
    );
}
