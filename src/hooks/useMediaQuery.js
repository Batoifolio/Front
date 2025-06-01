// hooks/useMediaQuery.js
import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const handler = () => setMatches(media.matches);

        handler(); // inicial
        media.addEventListener('change', handler);
        return () => media.removeEventListener('change', handler);
    }, [query]);

    return matches;
};

export default useMediaQuery;
