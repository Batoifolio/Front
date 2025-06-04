// pages/search.jsx
import React, { useEffect } from 'react';

function SearchPage() {
    useEffect(() => {
        document.title = 'Batoifolio - Buscar Alumnos';
    }, []);
    return (
        <div>
            <h1>Buscar</h1>
            <p>Buscar Alumnos</p>
        </div>
    );
}

SearchPage.auth = true; // ← Protege esta página

export default SearchPage;
