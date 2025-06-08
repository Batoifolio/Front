'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // Puedes usar otro ícono o SVG

export default function BackArrow({ href = null, label = 'Volver' }) {
    const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );
}
